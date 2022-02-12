const mongoose = require("mongoose");

// Schema
const MentorSchema = new mongoose.Schema({
  uuid: { type: String, required: true },
  firstName: {
    type: String,
    required: true,
  },
  lastName: String, //required
  currentCountry: {
    type: String,
    required: true,
  },
  engagements: {
    type: [String],
    required: true,
  }, //NOTE array of strings
  menteeCount: {
    type: Number,
    default: 0,
  },
  postgradDegNum: Number,
  postgradUniPrev: String, //supposed to have required
  postgradFieldPrev: String, // broad field categories, supposed to have required
  postgradTypePrev: String, // Masters/PhD, supposed to have required
  postgradProgramTitlePrev: String,
  postgradUni: String,
  postgradField: String, // broad field categories
  postgradType: String, // Masters/PhD
  postgradProgramTitle: String,
  undergradCountry: String,
  undergradField: String,
  undergradUni: String,
  undergradProgramTitle: String,
  email: { type: String, required: true },
  linkedIn: String,
  hearAboutUs: {
    type: [String],
  }, //NOTE array of strings
  extraInfo: [],
  matchedApplicants: {
    type: [{ uuid: String, score: String }],
    _id: false,
  }, //array of {uuid of matched applicant, score of matching}
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  creator: { type: String, default: "System" },
  updater: { type: String, default: "System" },
  status: { type: String, default: "active" },
});

// Model
const mentorDetails = mongoose.model("mentor", MentorSchema); // mongoose auto looks for collection in db (mentors) that is plural lowercased version of model name (mentor)

async function findMentor(query, callback = undefined, res = undefined) {
  if (callback !== undefined) {
    mentorDetails.find(query, callback);
    return;
  }
  return await mentorDetails.find(query).exec();
}

module.exports = { Mentor: mentorDetails, findMentor: findMentor };
