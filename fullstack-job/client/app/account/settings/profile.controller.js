'use strict';

angular.module('fullstackJobApp')
  .controller('ProfileCtrl', ['$state', 'User',
    function ($state, User) {
    var init = function () {
      User.get(function (data) {
        var role = data.role;

        if (role === 'candidate') {
          $state.go('candidate-profile');
        } else if (role == 'employer') {
          $state.go('employer-profile');
        } 
      });
    };

    init();
  }]);