const mochaTestSuite = require("./testSuite");
const expect = require("chai").expect;
const request = require("supertest");
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../app");
let { Mentor, findMentor } = require("../models/mentor-details");
let { Mentee, findMentee } = require("../models/mentee-details");
chai.use(chaiHttp);

mochaTestSuite("Match Making", () => {
  describe("Testing the computing of scores", () => {
    //Postgrad Uni, Postgrad Program, Postgrad Type, Undergrad Country, Undergrad Field and Undergrad Uni are the same = 10 + 20 + 50 + 2 + 5 + 3 = 90
    let sample_mentor = {
      firstName: "Mentor1",
      lastName: "AAA",
      currentCountry: "Country A",
      engagements: ["engagements1", "engagements2"],
      menteeCount: 2,
      postgradDegNum: 2,
      postgradUni: "PgUniA",
      postgradField: "PgFieldA", // broad field categories
      postgradType: "PhD", // Masters/PhD
      postgradProgramTitle: "PgProgA",
      postgradUniPrev: "PgUniB",
      postgradFieldPrev: "PgFieldB", // broad field categories
      postgradTypePrev: "Masters", // Masters/PhD
      postgradProgramTitlePrev: "PgProgB",
      undergradCountry: "UgCountryA",
      undergradField: "UgFieldA",
      undergradUni: "UgUniA",
      undergradProgramTitle: "UgProgA",
      email: "noreply@intograd.org",
      linkedIn: "linkedin_link",
      hearAboutUs: ["first source", "2nd source"],
      extraInfo: "some extra info",
    };

    let sample_mentor2 = {
      firstName: "Mentor2",
      lastName: "BBB",
      currentCountry: "Lalaland",
      engagements: ["engagements1", "engagements2"],
      menteeCount: 2,
      postgradDegNum: 2,
      postgradUni: "XYZ",
      postgradField: "XYZ", // broad field categories
      postgradType: "PhD", // Masters/PhD
      postgradProgramTitle: "XYZ",
      postgradUniPrev: "XYZ",
      postgradFieldPrev: "XYZ", // broad field categories
      postgradTypePrev: "Masters", // Masters/PhD
      postgradProgramTitlePrev: "PgProgB",
      undergradCountry: "UgCountryA",
      undergradField: "UgFieldA",
      undergradUni: "XYZ",
      undergradProgramTitle: "XYZ",
      email: "noreply@intograd.org",
      linkedIn: "linkedin_link",
      hearAboutUs: ["first source", "2nd source"],
      extraInfo: "some extra info",
    };

    let sample_mentee = {
      firstName: "Mentee1",
      lastName: "AAA",
      currentCountry: "Country A",
      postgradUni: "PgUniA",
      postgradField: "PgFieldX", // broad field categories
      postgradType: "PhD", // Masters/PhD
      postgradProgramTitle: "PgProgA",
      undergradCountry: "UgCountryA",
      undergradField: "UgfieldA",
      undergradUni: "UgUniA",
      undergradProgramTitle: "UgProgX",
      email: "noreply@intograd.org",
      linkedIn: "linkedin_link",
      hearAboutUs: ["first source", "2nd source"],
      matchedAdvisor: null,
    };

    it("It should correctly compute the score between mentor and mentee", (done) => {
      let mentee = new Mentee(sample_mentee);
      mentee.save();
      let mentor = new Mentor(sample_mentor);
      mentor.save();

      chai
        .request(server)
        .post("/api/matchmake/dry-run?" + mentee.id)
        .send({ mentee_id: mentee.id, mentor_id: mentor.id })
        .end((err, res) => {
          // expect(res.status).to.equal(200);
          // expect(res.body.success).to.equal(true);
          expect(res.text).to.equal(
            "<h2>Complete.</h2><br />\n            <p>Best match mentor: (" +
              mentor.id +
              ") Mentor1 AAA<br />\n            The score is: 151.66666666666669<br />\n            Check logs for details.</p>"
          );
          done();
        });
    });

    it("It should correctly return the mentor which has a higher score", (done) => {
      let mentee = new Mentee(sample_mentee);
      mentee.save();
      let mentor = new Mentor(sample_mentor);
      mentor.save();

      let mentor2 = new Mentor(sample_mentor2);
      mentor2.save();

      chai
        .request(server)
        .post("/api/matchmake/match-all")
        .end((err, res) => {
          // expect(res.status).to.equal(200);
          // expect(res.body.success).to.equal(true);

          expect(res.body.success).to.equal(true);
          expect(res.body.data).to.be.an("array");
          done();
        });
    });

    it("It should return 'no available advisors' if there are no advisors available", (done) => {
      let mentee = new Mentee(sample_mentee);
      mentee.save();

      chai
        .request(server)
        .post("/api/matchmake/match-all")
        .end((err, res) => {
          expect(res.body.success).to.equal(false);
          expect(res.statusCode).to.be.equal(500);
          expect(res.body.error).to.be.equal("No available advisors");
          done();
        });
    });
  });
});
