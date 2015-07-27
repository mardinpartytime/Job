'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CandidateSchema = new Schema({
  name: String,
  gender: String, 
  education: String,
  experience: String
});

module.exports = mongoose.model('Candidate', CandidateSchema);