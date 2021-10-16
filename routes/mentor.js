var express = require('express');
var router = express.Router();
var { Mentor, findMentor } = require('../models/mentor-details');
var { handleSuccess, handleError } = require('./apiRoutes');

// Get mentors
router.get('/', function(req, res, next) {
    let query = null;
    if (req.available) {
        query = {
            menteeCount : { $gt : 0 }
        }
    }
    let callback = function(err, mentor) {
        if (err) return handleError(err, res);
        handleSuccess(mentor, res);
    }
    findMentor(query, callback);
});

router.get("/:id", async function(req, res, next) {
    let mentor = await Mentor.findById(req.params.id).exec();
    handleSuccess(mentor, res);
})

router.put('/:id', function(req, res, next) {
    if (req.body.matchedApplicants == ""){
        req.body.matchedApplicants = [];
    }
    Mentor.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, mentor){
        if (err) return handleError(err, res);
        handleSuccess(mentor, res);
    });
})

/* create mentor. */
router.post('/create', function(req, res, next) {
    Mentor.create(req.body, function (err,mentor) {
        if (err) return handleError(err, res);
        handleSuccess(mentor, res);
    });
});

router.delete('/:id', function (req, res) {
    Mentor.findOneAndDelete(req.body, function(err, deleted) {
        if (err) return handleError(err, res);
        handleSuccess(null, res);
    })
})

router.post('/debug', function(req, res) {
    let advisor = {
        firstName           	: "AdvisorZzz",
        lastName            	: "Yyy",
        currentCountry      	: "CountryZ",
        engagements         	: ["engagements1", "engagements2"],
        menteeCount         	: 2,
        postgradDegNum      	: 2,
        postgradUni         	: "PgUZ",
        postgradField       	: "PgfieldZ", // broad field categories
        postgradType        	: "PhD", // Masters/PhD
        postgradProgramTitle    : "PgProgZ",
        postgradUniPrev        	: "PgUZ",
        postgradFieldPrev       : "PgfieldZ", // broad field categories
        postgradTypePrev        : "Master's", // Masters/PhD
        postgradProgramTitlePrev: "PgProgZ",
        undergradCountry    	: "UgCountryZ",
        undergradField      	: "UgfieldZ",
        undergradUni        	: "UgUZ",
        undergradProgramTitle   : "UgProgZ",
        email                   : "noreply@intograd.org",
        linkedIn                : "linkedin_link",
        hearAboutUs             : ["first source", "2nd source"]
        ,extraInfo               : "some extra info"
    };

    Mentor.create(advisor, function (err,mentor) {
        if (err) return handleError(err, res);
        handleSuccess(mentor, res);
    });
})

module.exports = router;
