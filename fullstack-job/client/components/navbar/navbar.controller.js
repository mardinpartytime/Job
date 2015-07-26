'use strict';

angular.module('fullstackJobApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {
    /*
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    }];*/

    $scope.menu = [{
      title: 'Job',
      state: 'view-jobs'
    }
    // , {
      
    //   title: 'Resume',
    //   state: 'view-resumes'
      
    //   title: 'Achievement',
    //   state: 'view-achievements'
    // }
     ];



    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });