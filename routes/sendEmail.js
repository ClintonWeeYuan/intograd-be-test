var express = require("express");
var router = express.Router();
var Email = require("../models/email");
var { Mentor, findMentor } = require("../models/mentor-details");
var { handleSuccess, handleError } = require("./apiRoutes");

router.post("/", async function (req, res, next) {
  let { subject, option } = req.body;

  //Subject determines whether the email is being sent to mentor or mentee
  //Option determines the template of the email that is being sent

  if (subject === "mentor-individual") {
    console.log("Send mentor separate emails about each mentee");
    // let query = { matchedApplicants: { $exists: true, $not: { $size: 0 } } };

    let query = { menteeCount: { $gt: 0 } };
    let callback = function (err, mentors) {
      console.log(mentors);
      if (err) return handleError(err, res);

      mentors.forEach((mentor) => {
        console.log(mentor.firstName);
        mentor.matchedApplicants.forEach((mentee) => {
          console.log(
            `Email between ${mentor.firstName} ${mentor.lastName} and ${mentee}`
          );
          Email.messageMentors(option, mentor, mentee);
        });
      });
      res.send("Success Sending Email to Each Mentor");
    };
    findMentor({}, callback);
  } else if (subject === "mentor-bulk") {
    console.log("Send mentor ONE email");
    let query = { matchedApplicants: { $exists: true, $not: { $size: 0 } } };

    // let query = { menteeCount: { $gt: 0 } };
    let callback = function (err, mentors) {
      if (err) return handleError(err, res);
      mentors.forEach((mentor) => {
        Email.messageMentors(option, mentor);
      });
      res.send("Success");
    };
    findMentor(query, callback);
  } else if (subject === "mentee") {
    let query = { matchedAdvisor: { $exists: true, $not: { $size: 0 } } };
    let callback = function (err, mentees) {
      if (err) return handleError(err, res);
      mentees.forEach((mentee) => {
        console.log(mentee.firstName);
        Email.messageMentees(option, mentee);
      });
      res.send("Success");
    };
    findMentee(query, callback);
  }
});

module.exports = router;
