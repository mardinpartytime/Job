'use strict';

angular.module('fullstackJobApp')
	.factory('Resume', ['$resource', function ($resource) {
		return $resource('/api/resumes/:id', {
			id: '@_id'
		},
		{
			index: {
				method: 'GET'
			},
			show: {
				method: 'GET'
			},
			create: {
				method: 'POST'
			},
			update: {
				method: 'PUT'
			}
		});
	}]);