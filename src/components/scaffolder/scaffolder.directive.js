'use strict';

angular.module('iframeScaffolder').directive('scaffolder', function() {
  return {
    restrict: 'E',
    controller: 'ScaffolderCtrl',
    templateUrl: 'components/scaffolder/scaffolder.html',
    scope: {
      urls: '=',
      layout: '='
    }
  };
});
