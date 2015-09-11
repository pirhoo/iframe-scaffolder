'use strict';

// @src http://stackoverflow.com/a/14996261
angular.module('iframeScaffolder').directive('selectOnClick', ['$window', function ($window) {
  return {
    restrict: 'A',
    link: function (scope, element) {
      element.on('click', function () {
        if (!$window.getSelection().toString()) {
          // Required for mobile Safari
          this.setSelectionRange(0, this.value.length);
        }
      });
    }
  };
}]);
