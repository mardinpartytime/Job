'use strict';

angular.module('fullstackJobApp')
	.factory('Candidate', ['$resource', function ($resource) {
		return $resource('/api/candidates/:id', {
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