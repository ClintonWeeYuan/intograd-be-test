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
    let callback = function(err, mentor) {
        if (err) return handleError(err, res);
        handleSuccess(mentor, res);
    }
    findMentee(query, callback);
});

router.put('/:id', function(req, res, next) {
    Mentee.findOneAndReplace({_id: req.params.id}, function(err, mentor){
        if (err) return handleError(err, res);
        handleSuccess(mentor, res);
    });
})

/* create mentor. */
router.post('/create', function(req, res, next) {
    Mentee.create(req.body, function (err,mentor) {
        if (err) return handleError(err, res);
        handleSuccess(mentor, res);
    });
});

router.delete('/:id', function (req, res) {
    Mentee.findOneAndDelete(req.body, function(err, deleted) {
        if (err) return handleError(err, res);
        handleSuccess(null, res);
    })
})

module.exports = router;
