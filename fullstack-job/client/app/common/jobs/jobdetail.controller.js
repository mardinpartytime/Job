'use strict';

angular.module('fullstackJobApp')
	.controller('JobDetailCtrl', ['$stateParams', '$state', '$scope', '$location', '$window', 'Job' ,
		function ($stateParams, $state, $scope, $location, $window, Job) {
			var self = this;

			var jobId = $stateParams.jobId;

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
				district: '',
				city: '',
				applylink: '',
				_employer: ''
			};

			var loadJob = function () {
				Job.show({id: jobId}, function (job) {
					self.job = _.pick(job, 'jobtype', 'jobname', 'vacancynum', 'education', 'experienceyear',
						'wage', 'description', '_benefits', 'companyname', 'lon', 'lat', 'address',
						'contact', 'phone', 'email', 'gender', 'workinghour', 'createtime', 'district', 'city', 'applylink', '_employer');
				});
			};

			var init = function () {
				loadJob();
			};

			self.collect = function () {
				Job.collect({id: jobId}, function () {
					//$scope.$broadcast('collect','job');
					$state.go('home');
				});
			};

			init();

		}]).filter('nl2br', function () {
		return function (text) {
			return text ? text.replace(/\n/g, '<br>'): '';
		}
	});
