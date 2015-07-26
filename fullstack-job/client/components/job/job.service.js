'use strict';

angular.module('fullstackJobApp')
	.factory('Job', ['$resource', function ($resource) {
		return $resource('/api/jobs/:id/:controller', {
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
			},
			collect: {
				method: 'GET',
				params: {
					controller:'collect'
				}
			}
		});
	}]);