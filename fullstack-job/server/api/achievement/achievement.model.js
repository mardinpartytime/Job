'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AchievementSchema = new Schema({
	pics:[String],
	_user:{type: String, ref: 'User'},
	createtime: Date,
	description: String,
	likes:[{type: String, ref: 'User'}],
	comments: [{type: String, ref: 'Comment'}],
	skills: [{name: String, learntime:String, link: String}]
});


module.exports = mongoose.model('Achievement', AchievementSchema);