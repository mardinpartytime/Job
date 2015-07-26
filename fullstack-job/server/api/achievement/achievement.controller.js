/**
* Using Rails-like standard naming convention for endpoints.
* POST	/achievements		-> create
* GET	/achievements		-> index
*/

'use strict';

var _ = require('lodash');
var Achievement = require('./achievement.model');
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
	var now = new Date();

	if (role === 'candidate') {
		candidateId = userId;
	} else {
		candidateId = req.body._user;
	}

	if (!candidateId) {
		return res.send(400, {error: {msg: 'candidateId is required'}});
	}

	console.log('creating new achievement');
	Achievement.create(_.merge(req.body, {_user: candidateId, createtime: now}), function (err, achievement) {
		if(err) { return handleError(res, err); }
    	console.log('created new achievement');
    	return res.json(201, achievement);
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

  	Achievement.find(condition).count(function (err, c) {
  		if(err) { return handleError(res, err); }
    	count = c;
  	});

  	Achievement.find(condition, {}, {
  		skip: (page - 1) * itemsPerPage,
  		limit: itemsPerPage,
      sort: {
        createtime: -1
      }
  	})
    .populate({
      path: '_user',
      select: 'name'
    })
    .exec(function (err, achievements) {
  		if(err) { return handleError(res, err); }

      	//console.log(jobs);

      	return res.json(200, {
        	achievements: achievements,
        	count: count,
        	page: page
      	});
  	});
};


// Get a single resume
exports.show = function(req, res) {
  Achievement.findById(req.params.id).exec(function (err, achievement) {
    if(err) { return handleError(res, err); }
    if(!achievement) { return res.send(404); }
    return res.json(achievement);
  });
};

//destroy a resume
exports.destroy = function(req, res) {
  var user = req.user;
  var userId = user._id;
  var role = user.role;
  var achievementId = req.params.id;

  var condition = {_id: achievementId};

  if (role === 'candidate') {
    condition = _.merge(condition, {_user: userId});
  }

  console.log('got delete achievement request with id ' + userId);

  Achievement.findOneAndRemove(condition, function (err) {
    if (err) { return handleError(res, err); }
    return res.send(204);
  });
};