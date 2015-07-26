'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CommentSchema = new Schema({
	_user:{type: String, ref: 'User'},
	createtime: Date,
	content: String,
	_achievement:{type: String, ref: 'Achievement'}
});

module.exports = mongoose.model('Comment', CommentSchema);