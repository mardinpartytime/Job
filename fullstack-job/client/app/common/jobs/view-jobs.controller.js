'use strict';

angular.module('fullstackJobApp')
	.controller('ViewJobsCtrl', ['$stateParams', '$state', '$scope', '$location', 'Job' ,
		function ($stateParams, $state, $scope, $location, Job) {
			var self = this;

			self.page = $stateParams.page || 1;
			self.itemsPerPage = $stateParams.itemsPerPage || 2;

			self.pagination = {
				page: 1,
				itemsPerPage: 2,
				maxSize: 5,
				numPages: null,
				totalItems: null
			};

			var init = function () {
				loadJobs();
			};

			var loadJobs = function () {
				var page = self.page;
				var itemsPerPage = self.itemsPerPage;

				
				Job.index({
					page: page,
					itemsPerPage: itemsPerPage
				}, function (data) {
					var totalItems = data.count;
					self.jobs = data.jobs;
					console.log(self.jobs);

					self.pagination.totalItems = totalItems;
					self.pagination.numPages = totalItems / itemsPerPage;
					self.pagination.page = self.page;
					self.pagination.itemsPerPage = self.itemsPerPage;

				});
			};

			self.pageChanged = function () {
      			var pagination = self.pagination;
     	 		self.page = self.pagination.page;
      			self.itemsPerPage = self.pagination.itemsPerPage;
      			$location
        		.search('page', pagination.page)
        		.search('itemsPerPage', pagination.itemsPerPage);
      			loadJobs();
    		};

			$scope.createjob = function () {
				$location.path('employer/job/add-job');
				$state.go('employer-add-job');
			};

			init();

	}]);