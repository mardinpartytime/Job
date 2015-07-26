'use strict';

angular.module('fullstackJobApp')
	.config(function ($stateProvider) {
		$stateProvider
		.state('add-resume', {
			url: 'candidate/add-resume',
			templateUrl: 'app/candidate/resume/add-resume.html',
			controller: 'AddResumeCtrl',
			controllerAs: 'addResumeCtrl'
		})
		.state('candidate-profile', {
			url: 'candidate/profile',
			templateUrl: 'app/candidate/profile/candidate-profile.html',
			controller: 'CandidateProfileCtrl',
			controllerAs: 'candidateProfileCtrl',
			authenticate: true
		})
		.state('add-achievement', {
			url: 'candidate/add-achievement',
			templateUrl: 'app/candidate/achievement/add-achievement.html',
			controller: 'AddAchievementCtrl',
			controllerAs: 'addAchievementCtrl'
		});
	});