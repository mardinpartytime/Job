'use strict';

angular.module('fullstackJobApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/account/login/login.html',
        controller: 'LoginCtrl'
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'app/account/signup/signup.html',
        controller: 'SignupCtrl'
      })
      .state('employersignup', {
        url: '/employersignup',
        templateUrl: 'app/account/signup/employersignup.html',
        controller: 'EmployersignupCtrl'
      })
      .state('settings', {
        url: '/settings',
        templateUrl: 'app/account/settings/settings.html',
        controller: 'SettingsCtrl',
        authenticate: true
      })
      .state('profile', {
        url:'/profile',
        template: '',
        controller: 'ProfileCtrl',
        controllerAs: 'profileCtrl',
        authenticate: true,
      });
  });