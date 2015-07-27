/*
POST	/candidates	        -> create
PUT   /candidates/:id      -> update 
*/

'use strict';

var _ = require('lodash');
var Candidate = require('./candidate.model');
var User = require('../user/user.model');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');


var validationError = function(res, err) {
  return res.json(422, err);
};

var handleError = function(res, err) {
  return res.send(500, err);
};

var createUser = function (user, cb) {
  var newUser = new User(user);
  newUser.provider = 'local';
  newUser.role = 'candidate';
  newUser.save(cb);
};


// Create a new candidate in the DB.
exports.create = function(req, res) {
	if(req.body._id) { delete req.body._id; }

	console.log('got create candidate request');
	User.find({email: req.body.email}, function (err, results) {
		if (results.length > 0) {
      		console.log('faled to create candidate: email already in use');
      		return res.json(409, {'error': {'msg': 'email already in use'}});
    	}

    	console.log('creating new candidate');

    	Candidate.create(req.body, function (err, candidate) {
    		if(err) { return handleError(res, err); }

      		var candidateId = candidate._id;

      		console.log('created new candidate with id ' + candidateId);

      		createUser(_.merge(req.body, {
      			_candidateProfile: candidateId
      		}), function (err, user) {
      			if(err) {
          			console.log('failed to create candidate, rolling back');
          			Candidate.findByIdAndRemove(candidateId);
          			return validationError(res, err);
        		}

        		var userId = user._id;

        		console.log('created new user with id ' + userId);
        		//return res.json(201, user);
            var token = jwt.sign({_id: user._id }, config.secrets.session, { expiresInMinutes: 60*5 });
            console.log('token: '+ token);
            res.json({ token: token });
      		});
    	});
	});
};

//update candidate 
exports.update = function (req, res) {
  if (req.body._id) { delete req.body._id; }

  var user = req.user;
  var userId = user._id;
  var candidateId = req.params.id;
  var condition = {};

  console.log('got update candidate request from userId ' + userId + ' for candidateId ' + candidateId);

  if (user.role === 'admin') {
    candidateId = req.params.id;
  } else {
     User.findById(userId, function (err, user) {
      if (err) { return handleError(res, err); }
      candidateId = user._candidateProfile;
     });
  }

  condition = {
    _candidateProfile : candidateId
  };

  User.find(condition).exec(function (err, users){
    if(err) { return handleError(res, err); }
    if(users.length == 0)
      return res.send(404); 
    user = users[0];
    var updated = _.assign(user, req.body);
    updated.save(function (err) {
        if (err) { return handleError(res, err); }

        console.log('updated user with id ' + user._id);
      });

  });

    Candidate.findById(candidateId, function (err, candidate) {
      if (err) { return handleError(res, err); }
      if(!candidate) { return res.send(404); }

      var updated = _.assign(candidate, req.body);

      console.log('updating candidate with id ' + candidateId);

      updated.save(function (err) {
        if (err) { return handleError(res, err); }

        console.log('updated candidate with id ' + candidateId);

        return res.json(200, candidate);
      });
    });

};
