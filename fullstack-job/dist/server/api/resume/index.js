'use strict';

var express = require('express');
var controller = require('./resume.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.post('/', auth.hasRole(['admin', 'candidate']), controller.create);
router.get('/', controller.index);
router.get('/:id', controller.show);
router.put('/:id', auth.hasRole(['admin', 'candidate']), controller.update);
router.delete('/:id', auth.hasRole(['admin', 'candidate']), controller.destroy);
/*
router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);
*/

module.exports = router;