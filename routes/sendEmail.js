var express = require("express");
var router = express.Router();
var Email = require("../models/email");
var { Mentor, findMentor } = require("../models/mentor-details");
var { handleSuccess, handleError } = require("./apiRoutes");
var { Mentee, findMentee } = require("../models/mentee-details");

router.post("/", async function (req, res, next) {
  let { subject, option } = req.body;

  //Subject determines whether the email is being sent to mentor or mentee
  //Option determines the template of the email that is being sent

  if (subject === "mentor-individual") {
    console.log("Send mentor separate emails about each mentee");
    let query = { matchedApplicants: { $exists: true, $not: { $size: 0 } } };

    // let query = { menteeCount: { $gt: 0 } };
    let callback = async function (err, mentors) {
      if (err) return handleError(err, res);

      for (let index = 0; index < mentors.length; index++) {
        console.log(mentors[index].firstName);
        for (let index = 0; index < mentor.matchedApplicants.length; index++) {
          await new Promise((resolve, reject) => setTimeout(resolve, 4000));
          console.log(
            `Email between to ${mentor.firstName} ${mentor.lastName}`
          );
          await Email.messageMentors(option, mentor, mentee);
        }
      }
    };
    await findMentor(query, callback);
    res.send("Success Sending Email to Mentors about each Separate Mentee");
  } else if (subject === "mentor-bulk") {
    console.log("Send matched mentors ONE email each");
    let query = { matchedApplicants: { $exists: true, $not: { $size: 0 } } };

    try {
      // let query = { menteeCount: { $gt: 0 } };

      let callback = async function (err, mentors) {
        if (err) return handleError(err, res);
        console.log(mentors.length);
        for (let index = 0; index < mentors.length; index++) {
          await new Promise((resolve, reject) => setTimeout(resolve, 200));
          await Email.messageMentors(option, mentors[index]);
        }
      };
      await findMentor(query, callback);
    } catch (err) {
      console.log(err);
    }
  } else if (subject === "mentee") {
    console.log("Send email to each matched Mentee");
    let query = { matchedAdvisor: { $exists: true, $not: { $size: 0 } } };
    let callback = async function (err, mentees) {
      if (err) return handleError(err, res);
      console.log(`Number of mentees: ${mentees.length}`);
      for (let index = 0; index < mentees.length; index++) {
        await new Promise((resolve, reject) => setTimeout(resolve, 4000));
        Email.messageMentees(option, mentees[index]);
      }
      res.send("Success Sending Email to Mentees");
    };
    findMentee(query, callback);
  } else if (subject === "test") {
    console.log("This is a test");
    try {
      let query = { menteeCount: { $gt: 0 } };
      let callback = async function (err, mentors) {
        if (err) return handleError(err, res);
        await new Promise((resolve, reject) => setTimeout(resolve, 10000));
        const message = await Email.messageMentors(option, mentors[0]);

        return message;
        // Email.messageMentors(option, mentors[5]);
      };
      const successMessage = await findMentor(query, callback);
      res.send("Success");
    } catch (err) {
      console.log(err);
    }
  }
});

module.exports = router;
