'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var EmployerSchema = new Schema({
  companyname: String,
  lon: Number,
  lat: Number,
  address: String,
  contact: String,
  level: Number,
  size: String,
  type: String, //goverment, charity
  revenue: String,
  founded: Date,
  website: String
});

module.exports = mongoose.model('Employer', EmployerSchema);