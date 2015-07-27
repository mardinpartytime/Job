'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var EmployerSchema = new Schema({
  companyname: String,
  lon: Number,
  lat: Number,
  address: String,
  contact: String,
  level: Number

});

module.exports = mongoose.model('Employer', EmployerSchema);