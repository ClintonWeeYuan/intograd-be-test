var express = require('express');
var router = express.Router();
var { Mentee, findMentee } = require('../models/mentee-details');
var { handleSuccess, handleError } = require('./apiRoutes');
// Get mentors
router.get('/', function(req, res, next) {
    let query = null;
    if (req.available) {
        query = {
            menteeCount : { $gt : 0 }
        }
    }
    let callback = function(err, mentee) {
        if (err) return handleError(err, res);
        handleSuccess(mentee, res);
    }
    findMentee(query, callback);
});

router.get("/:id", async function(req, res, next) {
    let mentee = await Mentee.findById(req.params.id).exec();
    handleSuccess(mentee, res);
})

router.put('/:id', function(req, res, next) {
    if (req.body.matchedAdvisor == ""){
        req.body.matchedAdvisor = null;
    }
    Mentee.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, mentee){
        if (err) return handleError(err, res);
        handleSuccess(mentee, res);
    });
})

/* create mentor. */
router.post('/create', function(req, res, next) {
    Mentee.create(req.body, function (err,mentee) {
        if (err) return handleError(err, res);
        handleSuccess(mentee, res);
    });
});

router.delete('/:id', function (req, res) {
    Mentee.findOneAndDelete(req.body, function(err, deleted) {
        if (err) return handleError(err, res);
        handleSuccess(null, res);
    })
})

router.post('/debug', function(req, res) {
    let applicant = {
        firstName           	: "Aaa",
        lastName            	: "Zzz",
        currentCountry      	: "CountryA",
        postgradUni         	: "PgUA",
        postgradField       	: "PgfieldA", // broad field categories
        postgradType        	: "PhD", // Masters/PhD
        postgradProgramTitle    : "PgProgA",
        undergradCountry    	: "UgCountryA",
        undergradField      	: "UgfieldA",
        undergradUni        	: "UgUA",
        undergradProgramTitle   : "UgProgA",
        email                   : "noreply@intograd.org",
        linkedIn                : "linkedin_link",
        hearAboutUs             : ["first source", "2nd source"]
    };
    
    Mentee.create(applicant, function (err,mentee) {
        if (err) return handleError(err, res);
        handleSuccess(mentee, res);
    });
})

module.exports = router;
