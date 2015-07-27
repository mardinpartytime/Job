'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var JobSchema = new Schema({
  jobtype: String,
  jobname: String,
  vacancynum: Number,
  education: String,
  experienceyear: String,
  wage: String,
  description: String,
  _benefits:[{type:String}],
  companyname: String,
  lon: Number,
  lat: Number,
  address: String,
  contact: String,
  phone: String,
  email: String,
  gender: String, 
  workinghour: String,
  weight: Number,
  createtime: Date,
  _employer:{type: String, ref: 'Employer'}
});

module.exports = mongoose.model('Job', JobSchema);