'use strict';

angular.module('fullstackJobApp')
	.controller('HomeCtrl', ['$scope', '$state', 'Auth', '$location',
		function ($scope, $state, Auth, $location) {
			/*
			$scope.$on('loggedIn', funtion () {
				$location.path('common/jobs/view-jobs');
			});
			*/
			$location.path('common/jobs/view-jobs');
			$state.go('view-jobs');


		}]);