'use strict';

angular.module('fullstackJobApp')
	.factory('Employer', ['$resource', function ($resource) {
		return $resource('/api/employers/:id', {
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