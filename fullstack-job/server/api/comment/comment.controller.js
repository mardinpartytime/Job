/**
* Using Rails-like standard naming convention for endpoints.
* POST	/comments		-> create
*/

'use strict';

var _ = require('lodash');
var Comment = require('./comment.model');
var Candidate = require('../candidate/candidate.model');
var Achievement = require('../achievement/achievement.model');

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
	var _achievement = req.body._achievement;

	var candidateId;
	var now = new Date();

	if (role === 'candidate') {
		candidateId = userId;
	} 

	if (!candidateId) {
		return res.send(400, {error: {msg: 'candidateId is required'}});
	}

	console.log('creating new comments');

	Comment.create(_.merge(req.body, {_user: candidateId, createtime: now}), function (err, comment) {
		if(err) { return handleError(res, err); }
    	console.log('created new comment');

    	Achievement.findById(_achievement, function (err, achievement) {

    		if (achievement.comments.indexOf(comment._id) <= -1) {
    			achievement.comments.push(comment._id);

    			achievement.save(function (err) {
    				if (err) { return handleError(res, err); }

          			console.log('create comment with id ' + comment._id);
    			});
    		}
    	});
    	return res.json(201, comment);
	});
};