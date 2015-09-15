'use strict';

angular.module('iframeScaffolder').directive('iframeIndicator', function() {
  return {
    restrict: 'A',
    link: function (scope, element) {
      // Find the only iframe in the element
      var iframe = element.find('iframe');
      // Fired when the iframe is loaded
      iframe.on('load', function() {
        // Remove the loading iframe
        element.removeClass('iframe-indicator--loading');
      });

      // Watch for change on the iframe URL
      scope.$watch(function() { return iframe.attr('src'); }, function() {
        // Add a class to notice that it is loading
        element.addClass('iframe-indicator--loading');
      }, true);
    }
  };
});
