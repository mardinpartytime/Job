'use strict';

angular.module('fullstackJobApp')
	.controller('ViewResumesCtrl', ['$stateParams', '$state', '$scope', '$location', 'Resume' ,
		function ($stateParams, $state, $scope, $location, Resume) {
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
				loadResumes();
			};

			var loadResumes = function () {
				var page = self.page;
				var itemsPerPage = self.itemsPerPage;

				
				Resume.index({
					page: page,
					itemsPerPage: itemsPerPage
				}, function (data) {
					var totalItems = data.count;
					self.resumes = data.resumes;
					console.log(self.resumes);

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
      			loadResumes();
    		};

			init();

		}]);