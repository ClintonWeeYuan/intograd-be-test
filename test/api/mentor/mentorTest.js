const mochaTestSuite = require("../testSuite/testSuite");
const mongoose = require("mongoose");
const expect = require("chai").expect;
const request = require("supertest");
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../../app");
let { Mentor, findMentor } = require("../../../models/mentor-details");

chai.use(chaiHttp);

mochaTestSuite("Mentors", () => {
  //Create a sample mentor for each test

  let sample_mentor = {
    firstName: "Jonathan",
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

  //Get All Mentors
  describe("GET mentors", () => {
    it("it should GET all mentors", (done) => {
      chai
        .request(server)
        .get("/api/mentor")
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.success).to.equal(true);
          expect(res.body.data).to.be.an("array").that.is.empty;
          done();
        });
    });
  });

  //Get Specific Mentor by Id
  describe("GET specific mentor", () => {
    it("it should get a specific mentor by id", (done) => {
      let mentor = new Mentor(sample_mentor);
      mentor.save((err, mentor) => {
        chai
          .request(server)
          .get("/api/mentor/" + mentor.id)
          .send(mentor)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.success).to.equal(true);
            expect(res.body.data.firstName).to.equal("Jonathan");
            done();
          });
      });
    });
  });

  //Post a Mentor

  describe("POST mentor", () => {
    //There seems to be a problem with this one. The status is correct, but the handleError function doesn't return a res.body.success nor a res.body.error which its supposed to

    it("it should not POST a mentor without the firstName field", (done) => {
      let incomplete_mentor = {
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
        .post("/api/mentor/create")
        .send(incomplete_mentor)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.success).to.equal(false);
          expect(res.body.error).to.equal(err.errors);
          done();
        });
    });

    it("it should POST a mentor", (done) => {
      chai
        .request(server)
        .post("/api/mentor/create")
        .send(sample_mentor)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.success).to.equal(true);
          expect(res.body.data.firstName).to.equal("Jonathan");
          done();
        });
    });
  });

  describe("PUT Mentor", () => {
    it("it should update a mentor given the id", (done) => {
      //Initial mentor's first name will be Jonathan, as per the sample_mentor above

      //The updated mentor's first name will be Sabrina

      let updated_mentor = {
        firstName: "Sabrina",
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

      let mentor = new Mentor(sample_mentor);
      mentor.save((err, mentor) => {
        chai
          .request(server)
          .put("/api/mentor/" + mentor.id)
          .send(updated_mentor)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.success).to.equal(true);
            expect(res.body.data.firstName).to.equal("Sabrina");
            done();
          });
      });
    });
  });

  //Delete Mentor
  describe("DELETE mentor", () => {
    it("it should DELETE a mentor given the id", (done) => {
      let mentor = new Mentor(sample_mentor);

      mentor.save((err, mentor) => {
        chai
          .request(server)
          .delete("/api/mentor/" + mentor.id)
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
