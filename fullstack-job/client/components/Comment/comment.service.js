'use strict';

angular.module('fullstackJobApp')
	.factory('Comment', ['$resource', function ($resource) {
		return $resource('/api/comments/:id', {
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