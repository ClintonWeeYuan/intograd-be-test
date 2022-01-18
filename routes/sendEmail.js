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
      res.send("Success Sending Email to Mentors about each Separate Mentee");
    };
  } else if (subject === "mentor-bulk") {
    console.log("Send matched mentors ONE email each");
    // let query = { matchedApplicants: { $exists: true, $not: { $size: 0 } } };

    let query = { menteeCount: { $gt: 0 } };
    let callback = function (err, mentors) {
      if (err) return handleError(err, res);
      mentors.forEach((mentor) => {
        Email.messageMentors(option, mentor);
      });
      // Email.messageMentors(option, mentors[5]);
      res.send("Success Sending Email to Mentors");
    };

    try {
      findMentor(query, callback);
    } catch (err) {
      console.log(err);
    }
  } else if (subject === "mentee") {
    console.log("Send email to each matched Mentee");
    let query = { matchedAdvisor: { $exists: true, $not: { $size: 0 } } };
    let callback = function (err, mentees) {
      if (err) return handleError(err, res);
      mentees.forEach((mentee) => {
        Email.messageMentees(option, mentee);
      });
      res.send("Success Sending Email to Mentees");
    };
    findMentee(query, callback);
  }
});

module.exports = router;
