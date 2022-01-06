const Nodemailer = require("nodemailer");

const Email = {
  genEmail: function (option, applicant, advisor) {
    let email = Object();
    switch (option) {
      case 1:
        email = {
          from: "noreply@intograd.org",
          to: `${applicant.email}, admin@intograd.org, noreply@intograd.org`,
          subject: "Matching Mentor Found!",
          html: `<h1><b>Congratulations! We have found a mentor who we think is suitable for you!</b></h1><br />
                    <body><p>Below are the details and contact for the mentor:<br />
                    First name: ${advisor.firstName}<br />
                    Last name: ${advisor.lastName}<br />
                    currentCountry: ${advisor.currentCountry}<br />
                    postgradUniPrev: ${advisor.postgradUniPrev}<br />
                    postgradFieldPrev: ${advisor.postgradFieldPrev}<br />
                    postgradTypePrev: ${advisor.postgradTypePrev}<br />
                    postgradProgramTitlePrev: ${advisor.postgradProgramTitlePrev}<br />
                    postgradUni: ${advisor.postgradUni}<br />
                    postgradField: ${advisor.postgradField}<br />
                    postgradType: ${advisor.postgradType}<br />
                    postgradProgramTitle: ${advisor.postgradProgramTitle}<br />
                    undergradCountry: ${advisor.undergradCountry}<br />
                    undergradField: ${advisor.undergradField}<br />
                    undergradUni: ${advisor.undergradUni}<br />
                    undergradProgramTitle: ${advisor.undergradProgramTitle}<br />
                    email: ${advisor.email}<br />
                    linkedIn: ${advisor.linkedIn}<br /></p><br />
                    <p>We highly encourage you to contact your assigned mentor as soon as possible. Good luck!</p><br />
                    <p>Best wishes,<br />IntoGrad Team.</p></body>`,
        };
        break;

      case 2:
        email = {
          from: "noreply@intograd.org", // sender address
          to: `${advisor.email}, admin@intograd.org, noreply@intograd.org`, // list of receivers
          subject: "A Mentee is Matched to You!", // Subject line
          //text: "Hello world?", // plain text body
          html: `<h1><b>Congratulations! We have found a mentee who we think is suitable for you!</b></h1><br />
                    <body><p>Below are the details and contact for the mentee:<br />
                    First name: ${applicant.firstName}<br />
                    Last name: ${applicant.lastName}<br />
                    currentCountry: ${applicant.currentCountry}<br />
                    postgradUni: ${applicant.postgradUni}<br />
                    postgradField: ${applicant.postgradField}<br />
                    postgradType: ${applicant.postgradType}<br />
                    postgradProgramTitle: ${applicant.postgradProgramTitle}<br />
                    undergradCountry: ${applicant.undergradCountry}<br />
                    undergradField: ${applicant.undergradField}<br />
                    undergradUni: ${applicant.undergradUni}<br />
                    undergradProgramTitle: ${applicant.undergradProgramTitle}<br />
                    email: ${applicant.email}<br />
                    linkedIn: ${applicant.linkedIn}<br /></p><br />
                    <p>We highly encourage you to contact your assigned mentee as soon as possible. We are grateful for your help!</p><br />
                    <p>Best wishes,<br />IntoGrad Team.</p></body>`,
        };
        break;

      case 3:
        email = {
          from: "noreply@intograd.org",
          to: `${applicant.email}, admin@intograd.org, noreply@intograd.org`,
          subject: "Sorry - No Good Matching Mentor",
          html: `<h1><b>Please accept our sincerest apologies - it seems like we do not currently have any good matching mentor for you!</b></h1><br />
                    <body><p>We endeavor to match you to a mentor as soon as one becomes available. Please bear with us!<br />
                    We will contact you once we found a matching mentor for you.<br />
                    Do contact us at admin@intograd.org if you have any questions.</p><br />
                    <p>Best wishes,<br />IntoGrad Team.</p></body>`,
        };
        break;

      case 4:
        email = {
          from: "noreply@intograd.org",
          to: `${applicant.email}, admin@intograd.org, noreply@intograd.org`,
          subject: "Sorry - No Available Mentor",
          html: `<h1><b>Please accept our sincerest apologies - it seems like we do not currently have any available mentor!</b></h1><br />
                    <body><p>We endeavor to match you to a mentor as soon as one becomes available. Please bear with us!<br />
                    We will contact you once we found a matching mentor for you.<br />
                    Do contact us at admin@intograd.org if you have any questions.</p><br />
                    <p>Best wishes,<br />IntoGrad Team.</p></body>`,
        };
        break;

      case 5:
        email = {
          from: "noreply@intograd.org", // sender address
          to: `admin@intograd.org, noreply@intograd.org`, // list of receivers
          subject: "New Applicant Signed Up", // Subject line
          html: `<h1><b>Notification: A new applicant has just signed up!</b></h1><br />
                    <body><p>Below are the details and contact of the applicant:<br />
                    First name: ${applicant.firstName}<br />
                    Last name: ${applicant.lastName}<br />
                    currentCountry: ${applicant.currentCountry}<br />
                    postgradUni: ${applicant.postgradUni}<br />
                    postgradField: ${applicant.postgradField}<br />
                    postgradType: ${applicant.postgradType}<br />
                    postgradProgramTitle: ${applicant.postgradProgramTitle}<br />
                    undergradCountry: ${applicant.undergradCountry}<br />
                    undergradField: ${applicant.undergradField}<br />
                    undergradUni: ${applicant.undergradUni}<br />
                    undergradProgramTitle: ${applicant.undergradProgramTitle}<br />
                    email: ${applicant.email}<br />
                    linkedIn: ${applicant.linkedIn}<br /></p><br />
                    <p>This is an automated notification generated by IntoGrad tech backend.</p></body>`,
        };
        break;

      case 6:
        email = {
          from: "noreply@intograd.org",
          to: `admin@intograd.org, noreply@intograd.org`,
          subject: "New Mentor Signed Up",
          html: `<h1><b>Notification: A new mentor has just signed up!</b></h1><br />
                    <body><p>Below are the details and contact for the mentor:<br />
                    First name: ${advisor.firstName}<br />
                    Last name: ${advisor.lastName}<br />
                    currentCountry: ${advisor.currentCountry}<br />
                    postgradUniPrev: ${advisor.postgradUniPrev}<br />
                    postgradFieldPrev: ${advisor.postgradFieldPrev}<br />
                    postgradTypePrev: ${advisor.postgradTypePrev}<br />
                    postgradProgramTitlePrev: ${advisor.postgradProgramTitlePrev}<br />
                    postgradUni: ${advisor.postgradUni}<br />
                    postgradField: ${advisor.postgradField}<br />
                    postgradType: ${advisor.postgradType}<br />
                    postgradProgramTitle: ${advisor.postgradProgramTitle}<br />
                    undergradCountry: ${advisor.undergradCountry}<br />
                    undergradField: ${advisor.undergradField}<br />
                    undergradUni: ${advisor.undergradUni}<br />
                    undergradProgramTitle: ${advisor.undergradProgramTitle}<br />
                    email: ${advisor.email}<br />
                    linkedIn: ${advisor.linkedIn}<br /></p><br />
                    <p>This is an automated notification generated by IntoGrad tech backend.</p></body>`,
        };
        break;

      default:
        email = {
          from: "noreply@intograd.org",
          to: `noreply@intograd.org`,
          subject: "DEFAULT CLAUSE EXECUTED",
          html: `<body><p>Please debug event-processor.js of REST API!</p></body>`,
        };
    } //end switch

    return email;
  },

  emailNotify: async function (option, applicant, advisor) {
    try {
      // create reusable transporter object using the default SMTP transport
      let transporter = Nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: "noreply@intograd.org",
          serviceClient: properties.secrets.client_id,
          privateKey: properties.secrets.private_key,
        },
      });

      // verify SMTP connection to Gmail is OK (correct credentials, host, port etc.)
      let verifyResults = await transporter.verify();
      log.info("Email account verification: ", verifyResults);

      log.info("genEmail() returns: ", genEmail(option, applicant, advisor));
      let info = await transporter.sendMail(
        EventProcessor.genEmail(option, applicant, advisor)
      );
      switch (option) {
        case 1:
        case 3:
        case 4:
          log.info("Message sent to applicant: %s", info);
          break;
        case 2:
          log.info("Message sent to advisor: %s", info);
          break;
        case 5:
        case 6:
          log.info("Notification sent to ourselves: %s", info);
          break;
        default:
          log.info("DEFAULT CLAUSE EXECUTED!");
      }
    } catch (error) {
      log.error("THE ERROR:::", error);
    } finally {
    }
  },
  genMentorEmail: function (option, mentor) {
    let email = Object();
    switch (option) {
      case 1:
        email = {
          from: "noreply@intograd.org",
          to: `${this.messageMentors.email}, noreply@intograd.org`,
          subject: "Merry Christmas",
          html: `<h1><b>Congratulations on surviving another year!</b></h1><br />
                    <body><p>Merry Christmas and Happy New Year to you ${mentor.firstName}</p><br />
                    <p>Best wishes,<br />IntoGrad Team.</p></body>`,
        };
        break;

      case 2:
        email = {
          from: "noreply@intograd.org", // sender address
          to: `${mentor.email}, noreply@intograd.org`, // list of receivers
          subject: "Invitation to Event", // Subject line
          //text: "Hello world?", // plain text body
          html: `<h1><b>Are you ready for the time of your life?</b></h1><br />
          <body><p>Come join us for some ${mentor.engagements[0]} and ${mentor.engagements[1]} this coming Saturday!</p><br />
          <p>Best wishes,<br />IntoGrad Team.</p></body>`,
        };
        break;

      case 3:
        email = {
          from: "noreply@intograd.org",
          to: `${mentor.email}, noreply@intograd.org`,
          subject: "Happy New Year",
          html: `<h1><b>Please collect your angpao at the nearest train station in ${mentor.currentCountry}</b></h1><br />
          <body><p>Merry Christmas and Happy New Year to you ${mentor.firstName}</p><br />
          <p>Best wishes,<br />IntoGrad Team.</p></body>`,
        };
        break;

      case 4:
        email = {
          from: "noreply@intograd.org",
          to: `${mentor.email}, noreply@intograd.org`,
          subject: "Sorry - You have been fired",
          html: `<h1><b>Please pack up your bags and leave.</b></h1><br />
          <body><p>However, do not fret! The world is full of opportunities for somehow with a ${mentor.postgradTypePrev} in ${mentor.postgradField.Prev}</p><br />
          <p>Best wishes,<br />IntoGrad Team.</p></body>`,
        };
        break;

      default:
        email = {
          from: "noreply@intograd.org",
          to: `noreply@intograd.org`,
          subject: "DEFAULT CLAUSE EXECUTED",
          html: `<body><p>Please debug event-processor.js of REST API!</p></body>`,
        };
    } //end switch

    return email;
  },
  messageMentors: async function (option, mentor) {
    try {
      let transporter = Nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          type: "OAuth2",
          user: "noreply@intograd.org",
          serviceClient: properties.secrets.client_id,
          privateKey: properties.secrets.private_key,
        },
      });

      let verifyResults = await transporter.verify();
      console.log("Email account verification: ", verifyResults);

      transporter.sendMail(this.genMentorEmail(option, mentor));
    } catch (err) {
      console.log(err);
    }
  },
};

module.exports = Email;
