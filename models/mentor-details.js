const mongoose = require('mongoose');

// Schema
const MentorSchema = new mongoose.Schema({
    uuid                    : String,
    firstName               : {
        type: String,
        required: true
    },
    lastName                : {
        type: String,
        required: true
    },
    currentCountry          : {
        type: String,
        required: true
    },
    engagements             : {
        type: [String],
        required: true
    }, //NOTE array of strings
    menteeCount             : {
        type: Number,
        default: 0
    },
    postgradDegNum          : Number,
    postgradUniPrev         : { type: String, required: true },
    postgradFieldPrev       : { type: String, required: true }, // broad field categories
    postgradTypePrev        : { type: String, required: true }, // Masters/PhD
    postgradProgramTitlePrev: String,
    postgradUni             : String,
    postgradField           : String, // broad field categories
    postgradType            : String, // Masters/PhD
    postgradProgramTitle    : String,
    undergradCountry        : String,
    undergradField          : String,
    undergradUni            : String,
    undergradProgramTitle   : String,
    email                   : {type: String, required: true},
    linkedIn                : String,
    hearAboutUs             : {
        type: [String]
    }, //NOTE array of strings
    extraInfo               : String,
    matchedApplicant        : {
        type: [String]
    }, //array of {uuid of matched applicant, score of matching}
    createdAt               : { type : Date, default : Date.now },
    updatedAt               : { type : Date, default : Date.now },
    creator                 : { type : String, default : 'System' },
    updater                 : { type : String, default : 'System' },
    status                  : { type : String, default : 'active' }
});

// Model
const mentorDetails = mongoose.model('mentor', MentorSchema); // mongoose auto looks for collection in db (mentors) that is plural lowercased version of model name (mentor)

async function findMentor(query, callback = undefined, res = undefined) {
    if (callback !== undefined) {
        mentorDetails.find(query, callback);
        return;
    }
    return await this.find(query).exec();
}

module.exports = { Mentor: mentorDetails, findMentor: findMentor };