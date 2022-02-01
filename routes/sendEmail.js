var express = require("express");
var router = express.Router();
var Email = require("../models/email");
var { Mentor, findMentor } = require("../models/mentor-details");
var { handleSuccess, handleError } = require("./apiRoutes");
var { Mentee, findMentee } = require("../models/mentee-details");
const { messageMentees } = require("../models/email");

router.post("/", async function (req, res, next) {
  let { subject, option } = req.body;

  //Subject determines whether the email is being sent to mentor or mentee
  //Option determines the template of the email that is being sent

  //Multiple emails to each mentor, depending on number of mentees he has
  if (subject === "mentor-individual") {
    console.log("Send mentor separate emails about each mentee");
    let query = { matchedApplicants: { $exists: true, $not: { $size: 0 } } };

    try {
      let mentors = await findMentor(query);
      res.send(await Email.messageMentors(option, mentors, subject));
    } catch (err) {
      console.log(err);
    }

    //One email for each Mentor
  } else if (subject === "mentor-bulk") {
    console.log("Send matched mentors ONE email each");
    let query = { matchedApplicants: { $exists: true, $not: { $size: 0 } } };

    try {
      let mentors = await findMentor(query);
      res.send(await Email.messageMentors(option, mentors, subject));
    } catch (err) {
      console.log(err);
    }

    //Email to each mentee
  } else if (subject === "mentee") {
    console.log("Send email to each matched Mentee");
    let query = { matchedAdvisor: { $exists: true, $not: { $size: 0 } } };

    try {
      let mentees = await findMentee(query);
      res.send(await Email.messageMentees(option, mentees));
    } catch (err) {
      console.log(err);
    }

    //Test Email
  } else if (subject === "test") {
    console.log("This is a test email API");
    try {
      let query = { firstName: "Kane" };
      let callback = async function (err, mentors) {
        if (err) return handleError(err, res);
        await new Promise((resolve, reject) => setTimeout(resolve, 10000));
        const message = await Email.messageMentors(option, mentors[0]);

        return message;
        // Email.messageMentors(option, mentors[5]);
      };
      const successMessage = await findMentor(query, callback);
      res.send(successMessage);
    } catch (err) {
      console.log(err);
    }
  }
});

module.exports = router;
