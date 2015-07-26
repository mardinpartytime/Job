'use strict';

angular.module('fullstackJobApp')
	.factory('Achievement', ['$resource', function ($resource) {
		return $resource('/api/achievements/:id', {
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