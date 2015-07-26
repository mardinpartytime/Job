/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /jobs              ->  index
 * POST    /jobs              ->  create
 * GET     /jobs/:id          ->  show
 * PUT     /jobs/:id          ->  update
 * DELETE  /jobs/:id          ->  destroy
 * GET     /jobs/:id/collect  ->  collect
 */

 'use strict';

var _ = require('lodash');
var Job = require('./job.model');
var Employer = require('../employer/employer.model');
var Candidate = require('../candidate/candidate.model');

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
  var now = new Date();

	if (role === 'employer') {
		employerId = userId;
	} else {
		employerId = req.body._employer;
	}

	if (!employerId) {
		return res.send(400, {error: {msg: 'employerId is required'}});
	}

	console.log('creating new job');

	Job.create(_.merge(req.body, {_employer: employerId, createtime: now}), function (err, job) {
		if(err) { return handleError(res, err); }
    	console.log('created new job');
    	return res.json(201, job);
	});

};

// Get list of jobs
exports.index = function(req, res) {
  var page = req.query.page || 1,
    itemsPerPage = req.query.itemsPerPage || 30;

  var condition = {};
  var count = 0;
  var employerId = req.query.employerId;

  if (employerId) {
    condition = {
      _employer: employerId
    };
  }

  Job.find(condition).count(function (err, c) {
  	if(err) { return handleError(res, err); }
    count = c;
  });

  Job.find(condition, {}, {
  	skip: (page - 1) * itemsPerPage,
  	limit: itemsPerPage,
    sort: {
      createtime: -1
    }
  }).exec(function (err, jobs) {
  	if(err) { return handleError(res, err); }

      //console.log(jobs);

      return res.json(200, {
        jobs: jobs,
        count: count,
        page: page
      });
  });
};

// Get a single job
exports.show = function(req, res) {
  Job.findById(req.params.id)
  .populate({
    path: '_employer',
    select: '_employerProfile'
  })
  .exec(function (err, job) {
    if(err) { return handleError(res, err); }
    if(!job) { return res.send(404); }

    Job.populate(job, {
      path: '_employer._employerProfile',
      select: 'companyname lon lat address size type revenue founded website',
      model: 'Employer'
    }, function (err, resultjob) {
      if(err) { return handleError(res, err); }
      return res.json(resultjob);
    });

    
  });
};

//update a job
exports.update = function(req,res) {
	if (req.body._id) { delete req.body._id; }

	var user = req.user;
	var userId = user._id;
	var role = user.role;
	var jobId = req.params.id;
	var jobDetails = req.body;

	var condition = {_id: jobId};

	if (role = 'employer') {
		condition = _.merge(condition, {_employer: userId});
	}

	 console.log('got update job request from userId ' + userId + ' for productId ' + jobId);

	 Job.findOne(condition).exec(function (err, job) {
	 	if(err) { return handleError(res, err); }
    	if(!job) { return res.send(404); }

    	var updated = _.assign(job, jobDetails);
    	console.log('updating job with id ' + jobId);

    	updated.save(function (err) {
      	if (err) { return handleError(res, err); }

      	console.log('updated job with id ' + jobId);

      	return res.json(200, job);
    });
	 });

};

exports.destroy = function(req, res) {
  var user = req.user;
  var userId = user._id;
  var role = user.role;
  var jobId = req.params.id;

  var condition = {_id: jobId};

  if (role === 'employer') {
    condition = _.merge(condition, {_employer: userId});
  }

  console.log('got delete job request with id ' + userId);

  Job.findOneAndRemove(condition, function (err) {
    if (err) { return handleError(res, err); }
    return res.send(204);
  });
};

exports.collect = function (req, res) {
  var user = req.user;
  var userId = user._id;
  var role = user.role;
  var jobId = req.params.id;

  if (role == 'candidate') {
    var candidateId = user._candidateProfile;
    Candidate.findById(candidateId, function (err, candidate) {

      if ( candidate._collectjobs !== null &&candidate._collectjobs.indexOf(jobId) <= -1) {
        candidate._collectjobs.push(jobId);

        candidate.save(function (err) {
          if (err) { return handleError(res, err); }

          console.log('collect job with id ' + jobId);

          //return res.send(200);
        });
      }
      //return res.send(204);
      return res.json(200, {
        result: "success"
      });
      
    });
  }else {
    return res.send(204);
  }
};

exports.recollect = function (req, res) {
  var user = req.user;
  var userId = user._id;
  var role = user.role;
  var jobId = req.params.id;

  if (role == 'candidate') {
    var candidateId = user._candidateProfile;
    Candidate.findById(candidateId, function(err, candidate) {
      if ( candidate._collectjobs !== null &&candidate._collectjobs.indexOf(jobId) > -1) {
        var index_l = candidate._collectjobs.indexOf(jobId);
        candidate._collectjobs.splice(index_l, 1);

        // console.log('index:' + index_l);
        // console.log('collected:' + candidate._collectjobs);

        candidate.save(function (err) {
          if (err) { return handleError(res, err); }

          console.log('remove collected job with id ' + jobId);

          //return res.send(200);
        });
      }
      //return res.send(204);
      return res.json(200, {
        result: "success"
      });
    });
  }else {
    return res.send(204);
  }

};


