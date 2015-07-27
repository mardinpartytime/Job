/*
POST	/employer	-> create
*/

'use strict';

var _ = require('lodash');
var Employer = require('./employer.model');
var User = require('../user/user.model');


var validationError = function(res, err) {
  return res.json(422, err);
};

var handleError = function(res, err) {
  return res.send(500, err);
};

var createUser = function (user, cb) {
  var newUser = new User(user);
  newUser.provider = 'local';
  newUser.role = 'employer';
  newUser.save(cb);
};


//Create a new employer in the DB.
exports.create = function(req, res) {
	if(req.body._id) { delete req.body._id; }
	console.log('got create employer request');

	User.find({email: req.body.email}, function (err, results) {
		if (results.length > 0) {
			console.log('faled to create employer: email already in use');

      		return res.json(409, {'error': {'msg': 'email already in use'}});
		}

		console.log('creating new employer');
		Employer.create(req.body, function (err, employer){
			if(err) { return handleError(res, err); }

			var employerId = employer._id;
			console.log('created new employer with id ' + employerId);

			createUser(_.merge(req.body, {_employerProfile: employerId}, {phone: req.body.phone}), function (err, user) {
				if(err) {
		          console.log('failed to create employer, rolling back');
		          Employer.findByIdAndRemove(employerId);
		          return validationError(res, err);
		        }

        var userId = user._id;

        console.log('created new user with id ' + userId);

        return res.json(201, user);
			});
		});
	});
}