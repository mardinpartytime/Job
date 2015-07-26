'use strict';

angular.module('fullstackJobApp')
	.config(function ($stateProvider) {
		$stateProvider
			.state('home', {
				url: '/',
				template: '',
				authenticate: false,
				controller: 'HomeCtrl'
			})
			.state('view-jobs', {
				url: '/view-jobs',
				templateUrl: 'app/common/jobs/view-jobs.html',
				controller: 'ViewJobsCtrl',
				controllerAs: 'viewJobsCtrl'
			})
			.state('jobdetail', {
				url: '/jobs/:jobId',
				templateUrl: 'app/common/jobs/jobdetail.html',
				controller: 'JobDetailCtrl',
				controllerAs: 'jobDetailCtrl'
			})
			.state('view-resumes', {
				url: '/view-resumes',
				templateUrl: 'app/common/resume/view-resumes.html',
				controller: 'ViewResumesCtrl',
				controllerAs: 'viewResumesCtrl'
			})
			.state('view-achievements', {
				url: '/view-achievements',
				templateUrl: 'app/common/achievement/view-achievements.html',
				controller: 'ViewAchievementsCtrl',
				controllerAs: 'viewAchievementsCtrl'
			});
	});