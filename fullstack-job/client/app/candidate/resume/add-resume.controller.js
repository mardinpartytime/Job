'use strict';

angular.module('fullstackJobApp')
	.controller('AddResumeCtrl', ['$state', '$scope', 'Resume',
		function ($state, $scope, Resume) {
			var self = this;

			self.resume = {
				jobtype: '',
				name: '',
				gender: '',
				salary: '',
				education: '',
				experience: '',
				phone: '',
				autodeliveration: '',
				createtime: ''
			};

			self.save = function (form) {
				if (form.$valid) {
					Resume.create(self.resume, function () {
						$state.go('view-resumes');
					});
				}
			};


		}]);