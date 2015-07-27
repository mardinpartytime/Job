'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CandidateSchema = new Schema({
  name: String,
  gender: String, 
  education: String,
  experience: String,
  _collectjobs: [{type:String, ref: 'Job'}]
});

module.exports = mongoose.model('Candidate', CandidateSchema);