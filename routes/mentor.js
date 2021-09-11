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

router.put('/:id', function(req, res, next) {
    Mentor.findOneAndReplace({_id: req.params.id}, function(err, mentor){
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

module.exports = router;
