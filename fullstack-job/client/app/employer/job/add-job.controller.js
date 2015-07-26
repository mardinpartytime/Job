'use strict';

angular.module('fullstackJobApp')
	.controller('EmployerAddJobCtrl', ['$state', '$scope', 'Job',
		function ($state, $scope, Job) {

			var self = this;

			self.maxStep = 1;

			var init = function () {
				if (!$state.is('employer-add-job.step-1')) {
					$state.go('employer-add-job.step-1', {}, {location: 'replace'});
				}
			};

			self.job = {
				// step 1
				jobtype: '',

				// step 2
				jobname: '',
				vacancynum: '',
				education: '',
				experienceyear: '',
				wage: '',
				description: '',
				_benefits: [],
				companyname: '',
				lon: '',
				lat: '',
				address: '',
				contact: '',
				phone: '',
				email: '',
				gender: '',
				workinghour: '',
				weight: '',
				createtime: '',
				city: '',
				district: '',
				applylink: ''
			};

			self.commitStep1 = function (form) {
				if (form.$valid) {
					$state.go('employer-add-job.step-2');
					self.maxStep = self.maxStep >=2 ? self.maxStep : 2;
				}
			};

			self.save = function (form) {
				if (form.$valid) {
					Job.create(self.job, function () {
						$state.go('view-jobs');
					});
				}
			};

			init();
		}]);