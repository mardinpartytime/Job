'use strict';

var express = require('express');
var controller = require('./job.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.post('/', auth.hasRole(['admin', 'employer']), controller.create);
router.get('/', controller.index);
router.get('/:id', controller.show);
router.put('/:id', auth.hasRole(['admin', 'employer']), controller.update);
router.delete('/:id', auth.hasRole(['admin', 'employer']), controller.destroy);
router.get('/:id/collect', auth.hasRole(['candidate']), controller.collect);
router.get('/:id/recollect', auth.hasRole(['candidate']), controller.recollect);



/*
router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);
*/

module.exports = router;