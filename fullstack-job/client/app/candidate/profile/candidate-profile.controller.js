'use strict';

angular.module('fullstackJobApp')
	.controller('CandidateProfileCtrl', ['$scope', '$stateParams', '$location', '$state', 'User', 'Candidate', 'Resume',
		function ($scope, $stateParams, $location, $state, User, Candidate, Resume) {
			var self = this;
			
			/*
			self.page = $stateParams.page || 1;
			self.itemsPerPage = $stateParams.itemsPerPage || 2;

			self.pagination = {
				page: 1,
				itemsPerPage: 2,
				maxSize: 5,
				numPages: null,
				totalItems: null
			};*/


			var init = function () {
				User.get(function (data) {
					self.user = data;
					self.candidateId = self.user._candidateProfile._id;
					self.collectjobs = self.user._candidateProfile._collectjobs;
				});
			};
			
			self.update = function (form) {
				if (form.$valid) {
					Candidate.update({id: self.user._candidateProfile._id}, self.user._candidateProfile, function () {
						$state.go('home');
					});
				}
				
			};


			init();
		}]);