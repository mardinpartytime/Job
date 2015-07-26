/**
* Using Rails-like standard naming convention for endpoints.
* POST	/resumes		-> create
*/

'use strict';

var _ = require('lodash');
var Resume = require('./resume.model');
var Candidate = require('../candidate/candidate.model');

var validationError = function(res, err) {
  return res.json(422, err);
};

var handleError = function (res, err) {
  return res.send(500, err);
};


exports.create = function(req, res) {
	if(req.body._id) { delete req.body._id; }
	var user = req.user;
	var userId = user._id;
	var role = user.role;

	var candidateId;
	if (role === 'candidate') {
		candidateId = userId;
	} else {
		candidateId = req.body._candidate;
	}

	if (!candidateId) {
		return res.send(400, {error: {msg: 'candidateId is required'}});
	}

	console.log('creating new resume');

	Resume.create(_.merge(req.body, {_candidate: candidateId}), function (err, resume) {
		if(err) { return handleError(res, err); }
    	console.log('created new resume');
    	return res.json(201, resume);
	});

};

// Get list of jobs
exports.index = function(req, res) {
	var page = req.query.page || 1,
    itemsPerPage = req.query.itemsPerPage || 30;

  	var condition = {};
  	var count = 0;
  	var candidateId = req.query.candidateId;

  if (candidateId) {
    condition = {
      _candidate: candidateId
    };
  }

  	Resume.find(condition).count(function (err, c) {
  		if(err) { return handleError(res, err); }
    	count = c;
  	});

  	Resume.find(condition, {}, {
  		skip: (page - 1) * itemsPerPage,
  		limit: itemsPerPage
  	}).exec(function (err, resumes) {
  		if(err) { return handleError(res, err); }

      	//console.log(jobs);

      	return res.json(200, {
        	resumes: resumes,
        	count: count,
        	page: page
      	});
  	});
};

// Get a single resume
exports.show = function(req, res) {
  Resume.findById(req.params.id).exec(function (err, resume) {
    if(err) { return handleError(res, err); }
    if(!resume) { return res.send(404); }
    return res.json(resume);
  });
};

//update a resume
exports.update = function(req,res) {
	if (req.body._id) { delete req.body._id; }

	var user = req.user;
	var userId = user._id;
	var role = user.role;
	var resumeId = req.params.id;
	var resumeDetails = req.body;

	var condition = {_id: resumeId};

	if (role = 'candidate') {
		condition = _.merge(condition, {_candidate: userId});
	}

	console.log('got update resume request from userId ' + userId + ' for resumeId ' + resumeId);

	Resume.findOne(condition).exec(function (err, resume) {
	 	if(err) { return handleError(res, err); }
    	if(!resume) { return res.send(404); }

    	var updated = _.assign(resume, resumeDetails);
    	console.log('updating resume with id ' + resumeId);

    	updated.save(function (err) {
	      	if (err) { return handleError(res, err); }

	      	console.log('updated resume with id ' + resumeId);

	      	return res.json(200, resume);
    	});
	});
}


//destroy a resume
exports.destroy = function(req, res) {
  var user = req.user;
  var userId = user._id;
  var role = user.role;
  var resumeId = req.params.id;

  var condition = {_id: resumeId};

  if (role === 'candidate') {
    condition = _.merge(condition, {_candidate: userId});
  }

  console.log('got delete resume request with id ' + userId);

  Resume.findOneAndRemove(condition, function (err) {
    if (err) { return handleError(res, err); }
    return res.send(204);
  });
};