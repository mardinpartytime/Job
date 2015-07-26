'use strict';

angular.module('fullstackJobApp')
  .directive('inputMatch', [function () {
    return {
      require: 'ngModel',
      link: function (scope, el, attrs, c) {

        scope.$watch('[' + attrs.ngModel + ', ' + attrs.inputMatch + ']', function (arr) {
          var orig = arr[0];
          var copy = arr[1];

          c.$setValidity('match', orig === copy);
        }, true);
      }
    };
  }]);
