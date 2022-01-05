var express = require("express");
var router = express.Router();
var Email = require("../models/email");
var { Mentor, findMentor } = require("../models/mentor-details");
var { handleSuccess, handleError } = require("./apiRoutes");

router.post("/", async function (req, res, next) {
  let query = null;

  let { option } = req.body;
  console.log(option);

  let callback = function (err, mentors) {
    if (err) return handleError(err, res);
    mentors.forEach((mentor) => {
      console.log(mentor.firstName);
      Email.messageMentors(option, mentor);
    });
    res.send("Success");
  };
  findMentor(query, callback);
});

module.exports = router;
