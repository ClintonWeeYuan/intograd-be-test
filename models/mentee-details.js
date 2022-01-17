const mongoose = require("mongoose");

// Schema
const MenteeSchema = new mongoose.Schema({
  uuid: String,
  firstName: String,
  lastName: String,
  currentCountry: String,
  postgradUni: String,
  postgradField: String, // broad field categories
  postgradType: String, // Masters/PhD
  postgradProgramTitle: String,
  undergradCountry: String,
  undergradField: String,
  undergradUni: String,
  undergradProgramTitle: String,
  email: String,
  linkedIn: String,
  hearAboutUs: Array, //NOTE array of strings
  matchedAdvisor: { uuid: String, score: Number }, //uuid of matched advisor, score of matching
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  creator: { type: String, default: "System" },
  updater: { type: String, default: "System" },
  status: { type: String, default: "active" },
});

// Model
const menteeDetails = mongoose.model("mentee", MenteeSchema); // mongoose auto looks for collection in db (mentees) that is plural lowercased version of model name (mentees)

async function findMentee(query, callback = undefined, res = undefined) {
  if (callback !== undefined) {
    menteeDetails.find(query, callback);
    return;
  }
  return await menteeDetails.find(query).exec();
}

module.exports = { Mentee: menteeDetails, findMentee: findMentee };
