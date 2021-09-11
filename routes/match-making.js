var express = require('express');
var router = express.Router();
var { Mentor, findMentor } = require('../models/mentor-details')
var { Mentee, findMentee } = require('../models/mentee-details')
const stringSimilarity = require("string-similarity");

router.post('/dry-run', function(req, res, next) {
    let bestAdvisor;
        let applicant;
        try {
            let { query }=req;
            log.info("QUERY:", query);
            
            // find desired applicant by UUID
            // call mdl functions to perform db operations
            applicant = await Mentee.findById(query.uuid).exec();
            log.info("FOUND APPLICANT BY UUID:", applicant);
            
            let advisors = await findMentor({});
            
            if (Array.isArray(advisors) && advisors.length>0) {
                bestAdvisor = bestMatch(applicant,advisors); //note bestAdvisor = {advisor:{the advisor document returned}, score: bestScore returned}
                // if bestMatch() does not return best matched advisor, bestAdvisor.advisor = undefined, and bestAdvisor.score = 0, don't run the code inside
                if (typeof(bestAdvisor.advisor)!= "undefined" && bestAdvisor.score > 0) {
                    //let applicant = answers;
                    applicant.matchedAdvisor = {uuid:bestAdvisor.advisor.uuid, score:bestAdvisor.score} ; //note answers.matchedAdvisor stores object {uuid:xxx, score:xxx}
                    log.info("MATCHEDADVISOR: ", applicant.matchedAdvisor);
                    
                    log.info("BEST MENTOR IS: ", bestAdvisor.advisor);
                    log.info("BEST SCORE IS ", bestAdvisor.score);
                    
                } else {
                    log.info("No good matching mentor.");
                }
            } else {
                log.info("No available mentor.");
            }
            
        }
        catch (error) {
            log.error("THE ERROR:::", error);
        }
        finally {
            //res.send("OK. Done, check logs.");
            res.send(
                `<h2>Complete.</h2><br />
                <p>Best match mentor: (${applicant.matchedAdvisor.uuid}) ${bestAdvisor.advisor.firstName} ${bestAdvisor.advisor.lastName}<br />
                The score is: ${bestAdvisor.score}<br />
                Check logs for details.</p>
                `
            );
        }
})

//TODO: REWRITE THIS
function bestMatch(applicant, advisors) {
    let bestAdvisor = new Object();
    	bestAdvisor.score = 0;
    	//let bestScore = 0;
    	for (let i=0; i<advisors.length; i++) {
    	    log.info("Mentor is "+advisors[i].uuid);
    		let score = computeScore(applicant,advisors[i]);
    		if (score > bestAdvisor.score) {
    		//if (score > bestScore) {
    			//bestScore = score;
    			bestAdvisor.advisor = advisors[i];
    			bestAdvisor.score = score;
    		}
    	}
    	// DEBUG ONLY
    	log.info("Best advisor score is: ", bestAdvisor.score);
    	
    	return (bestAdvisor);
}

function computeScore(applicant, advisor) {
    let totalScore = 0;
    //matching criteria used to score points to determine goodness of match, can be expanded
    let criteria = {
        postgradUni				:10,
        postgradField			:30,
        postgradType			:20,
        postgradProgramTitle	:50,
        postgradUniPrev			:10,
        postgradFieldPrev		:30,
        postgradTypePrev		:20,
        postgradProgramTitlePrev:50,
        undergradCountry		:2,
        undergradField			:5,
        undergradUni			:3,
        undergradProgramTitle	:30
    };
    for (let x in criteria) {
        log.info("Current criteria is: "+x);
        if (x=="postgradProgramTitlePrev") {
            log.info("Mentee's record use: "+applicant["postgradProgramTitle"]);
        } else if (x=="postgradUniPrev") {
            log.info("Mentee's record use: "+applicant["postgradUni"]);
        } else if (x=="postgradFieldPrev") {
            log.info("Mentee's record use: "+applicant["postgradField"]);
        } else if (x=="postgradTypePrev") {
            log.info("Mentee's record use: "+applicant["postgradType"]);
        } else {
            log.info("Mentee's record has: "+applicant[x]);
        }
        log.info("Mentor's record has: "+advisor[x]);
        if (x=="postgradProgramTitle" || x=="undergradProgramTitle") {
            let similarity = stringSimilarity.compareTwoStrings(applicant[x],advisor[x]);
            totalScore += similarity*criteria[x];
            log.info("Criteria is: "+x+", similarity is: "+similarity+" & score is: "+similarity*criteria[x]);
        } else if (x=="postgradProgramTitlePrev" && advisor[x]) {
            let similarity = stringSimilarity.compareTwoStrings(applicant["postgradProgramTitle"],advisor[x]);
            totalScore += similarity*criteria[x];
            log.info("Criteria is: "+x+", similarity is: "+similarity+" & score is: "+similarity*criteria[x]);
        } else if (applicant[x] && advisor[x] && applicant[x]==advisor[x]) {
            totalScore += criteria[x];
            log.info("Criteria is: "+x+" & score is: "+criteria[x]); //DEBUG ONLY
        } else if (x=="postgradUniPrev" && advisor[x] && applicant["postgradUni"]==advisor[x]) {
            totalScore += criteria[x];
            log.info("Criteria is: "+x+" & score is: "+criteria[x]); //DEBUG ONLY
        } else if (x=="postgradFieldPrev" && advisor[x] && applicant["postgradField"]==advisor[x]) {
            totalScore += criteria[x];
            log.info("Criteria is: "+x+" & score is: "+criteria[x]); //DEBUG ONLY
        } else if (x=="postgradTypePrev" && advisor[x] && applicant["postgradType"]==advisor[x]) {
            totalScore += criteria[x];
            log.info("Criteria is: "+x+" & score is: "+criteria[x]); //DEBUG ONLY
        } /*else if (x=="postgradProgramTitlePrev" && advisor[x] && applicant["postgradProgramTitle"]==advisor[x]) {
            totalScore += criteria[x];
            log.info("Criteria is: "+x+" & score is: "+criteria[x]); //DEBUG ONLY
        }*/
    }
    
    
    log.info("Total score is: ",totalScore); //DEBUG ONLY
    return (totalScore);
} //end static computeScore()

module.exports = router;
