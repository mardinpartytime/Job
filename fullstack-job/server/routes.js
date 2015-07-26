/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/things', require('./api/thing'));
  app.use('/api/users', require('./api/user'));

  app.use('/api/candidates', require('./api/candidate'));
  app.use('/api/employers', require('./api/employer'));
  app.use('/api/jobs', require('./api/job'));
  app.use('/api/resumes', require('./api/resume'));
  app.use('/api/achievements', require('./api/achievement'));
  app.use('/api/comments', require('./api/comment'));

  app.use('/auth', require('./auth'));
  
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};