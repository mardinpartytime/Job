'use strict';

angular.module('fullstackJobApp')
	.controller('ViewAchievementsCtrl',['$stateParams', '$state', '$scope', '$location', 'Achievement',
		function ($stateParams, $state, $scope, $location, Achievement) {
			var self = this;

			self.page = $stateParams.page || 1;
			self.itemsPerPage = $stateParams.itemsPerPage || 20;
			self.achievements = [];

			self.pagination = {
				page: 1,
				itemsPerPage: 20,
				maxSize: 5,
				numPages: null,
				totalItems: null
			};

			var loadAchievements = function () {

				var page = self.page;
				var itemsPerPage = self.itemsPerPage;

				Achievement.index({
					page: page,
					itemsPerPage: itemsPerPage
				}, function (data){
					var totalItems = data.count;
					self.achievements = data.achievements;

					console.log(self.achievements);
					self.pagination.totalItems = totalItems;
					self.pagination.numPages = totalItems / itemsPerPage;
					self.pagination.page = self.page;
					self.pagination.itemsPerPage = self.itemsPerPage;
				});
			};

			var init = function () {
				loadAchievements();
			}

			self.pageChanged = function () {
      			var pagination = self.pagination;
     	 		self.page = self.pagination.page;
      			self.itemsPerPage = self.pagination.itemsPerPage;
      			$location
        		.search('page', pagination.page)
        		.search('itemsPerPage', pagination.itemsPerPage);
      			loadAchievements();
    		};

    		init();

		}]);