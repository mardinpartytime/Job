'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ResumeSchema = new Schema({
  jobtype: String,
  name: String,
  gender: String,
  salary: String, //range
  education: String, 
  experience: String,
  phone: String,
  autodeliveration: Boolean,
  weight: Number,
  createtime: Date,
  _candidate:{type: String, ref: 'Candidate'}
});

module.exports = mongoose.model('Resume', ResumeSchema);