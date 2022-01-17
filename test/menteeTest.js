const mochaTestSuite = require("./testSuite");
const mongoose = require("mongoose");
const expect = require("chai").expect;
const request = require("supertest");
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../app");
let { Mentee, findMentee } = require("../models/mentee-details");

chai.use(chaiHttp);

mochaTestSuite("mentees", () => {
  //Create a sample mentee for each test

  let sample_mentee = {
    firstName: "Jonathan",
    lastName: "Chow",
    currentCountry: "CountryA",
    postgradUni: "PgUA",
    postgradField: "PgfieldA",
    postgradType: "PhD",
    postgradProgramTitle: "PgProgA",
    undergradCountry: "UgCountryA",
    undergradField: "UgfieldA",
    undergradUni: "UgUA",
    undergradProgramTitle: "UgProgA",
    email: "noreply@intograd.org",
    linkedIn: "linkedin_link",
    hearAboutUs: ["first source", "2nd source"],
  };

  //Get All Mentees
  describe("GET mentees", () => {
    it("it should GET all mentees", (done) => {
      chai
        .request(server)
        .get("/api/mentee")
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.success).to.equal(true);
          expect(res.body.data).to.be.an("array").that.is.empty;
          done();
        });
    });
  });

  //Get Specific Mentee by Id
  describe("GET specific mentee", () => {
    it("it should get a specific mentee by id", (done) => {
      let mentee = new Mentee(sample_mentee);
      mentee.save((err, mentee) => {
        chai
          .request(server)
          .get("/api/mentee/" + mentee.id)
          .send(mentee)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.success).to.equal(true);
            expect(res.body.data.firstName).to.equal("Jonathan");
            done();
          });
      });
    });
  });

  //Post a mentee

  describe("POST mentee", () => {
    //There seems to be a problem with this one. The status is correct, but the handleError function doesn't return a res.body.success nor a res.body.error which its supposed to

    it("it should not POST a mentee without the firstName field", (done) => {
      let incomplete_mentee = {
        lastName: "Chow",
        currentCountry: "United Kingdom",
        engagements: ["Party", "Fun", "Badminton"],
        menteeCount: 5,
        postgradDegNum: 10,
        postgradUniPrev: "ABC",
        postgradFieldPrev: "Science",
        postgradTypePrev: "Masters",
        email: "123@gmail.com",
      };

      chai
        .request(server)
        .post("/api/mentee/create")
        .send(incomplete_mentee)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.success).to.equal(false);
          expect(res.body.error).to.equal(err.errors);
          done();
        });
    });

    it("it should POST a mentee", (done) => {
      chai
        .request(server)
        .post("/api/mentee/create")
        .send(sample_mentee)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.success).to.equal(true);
          expect(res.body.data.firstName).to.equal("Jonathan");
          done();
        });
    });
  });

  describe("PUT mentee", () => {
    it("it should update a mentee given the id", (done) => {
      //Initial mentee's first name will be Jonathan, as per the sample_mentee above

      //The updated mentee's first name will be Sabrina

      let updated_mentee = {
        firstName: "Sabrina",
        lastName: "Chow",
        currentCountry: "CountryA",
        postgradUni: "PgUA",
        postgradField: "PgfieldA", // broad field categories
        postgradType: "PhD", // Masters/PhD
        postgradProgramTitle: "PgProgA",
        undergradCountry: "UgCountryA",
        undergradField: "UgfieldA",
        undergradUni: "UgUA",
        undergradProgramTitle: "UgProgA",
        email: "123@email.org",
        linkedIn: "linkedin_link1",
        hearAboutUs: ["first source", "2nd source"],
      };

      let mentee = new Mentee(sample_mentee);
      mentee.save((err, mentee) => {
        chai
          .request(server)
          .put("/api/mentee/" + mentee.id)
          .send(updated_mentee)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.success).to.equal(true);
            expect(res.body.data.firstName).to.equal("Sabrina");
            done();
          });
      });
    });
  });

  //Delete mentee
  describe("DELETE mentee", () => {
    it("it should DELETE a mentee given the id", (done) => {
      let mentee = new Mentee(sample_mentee);

      mentee.save((err, mentee) => {
        chai
          .request(server)
          .delete("/api/mentee/" + mentee.id)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.success).to.equal(true);
            expect(res.body.data).to.equal(null);
            done();
          });
      });
    });
  });
});
