'use strict';

angular.module('fullstackJobApp')
	.config(function ($stateProvider) {
		$stateProvider
		.state('employer-add-job', {
			url: '/employer/add-job',
			templateUrl: 'app/employer/job/add-job.html',
			controller: 'EmployerAddJobCtrl',
			controllerAs: 'employerAddJobCtrl',
			abstract: true
		})
		.state('employer-add-job.step-1', {
			url: '/step-1',
			templateUrl: 'app/employer/job/add-job-step-1.html'
		})
		.state('employer-add-job.step-2', {
			url: '/step-2',
			templateUrl: 'app/employer/job/add-job-step-2.html'
		})
		.state('employer-profile', {
			url: '/employer/profile',
			templateUrl: 'app/employer/profile/employer-profile.html',
			controller: 'EmployerProfileCtrl',
			controllerAs: 'employerProfileCtrl'
		});
	});