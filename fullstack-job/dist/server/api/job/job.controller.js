/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /job              ->  index
 * POST    /job              ->  create
 * GET     /job/:id          ->  show
 * PUT     /job/:id          ->  update
 * DELETE  /job/:id          ->  destroy
 */

 'use strict';

var _ = require('lodash');
var Job = require('./job.model');
var Employer = require('../employer/employer.model');

var validationError = function(res, err) {
  return res.json(422, err);
};

var handleError = function (res, err) {
  return res.send(500, err);
}

// Creates a new job in the DB.
exports.create = function(req, res) {
	if(req.body._id) { delete req.body._id; }
	var user = req.user;
	var userId = user._id;
	var role = user.role;

	var employerId;

	if (role === 'employer') {
		employerId = userId;
	} else {
		employerId = req.body._employer;
	}

	if (!employerId) {
		return res.send(400, {error: {msg: 'employerId is required'}});
	}

	console.log('creating new job');

	Job.create(_.merge(req.body, {_employer: employerId}), function (err, job) {
		if(err) { return handleError(res, err); }
    	console.log('created new job');
    	return res.json(201, job);
	});

};


