'use strict';

var express = require('express');
var controller = require('./achievement.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.post('/', auth.hasRole(['admin', 'candidate']), controller.create);
router.get('/', controller.index);
router.get('/:id', controller.show);
router.delete('/:id', auth.hasRole(['admin', 'candidate']), controller.destroy);

module.exports = router;