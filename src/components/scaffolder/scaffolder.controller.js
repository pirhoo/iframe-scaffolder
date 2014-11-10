'use strict';

angular.module('iframeScaffolder').controller('ScaffolderCtrl', function ($scope, Scaffolder) {

  $scope.scaffolder = new Scaffolder();

  $scope.iframeWidth = function() {
    switch($scope.layout) {
      case 'horizontal':
        return (100/$scope.urls.length) + '%';
      case 'tail':
        return '50%';
      case 'head':
        return '50%';
      case 'menu':
        return '75%';
      case 'tabs':
        return '100%';
    }
  };

  $scope.iframeHeight = function(index, first, last) {
    if ($scope.layout === 'horizontal'    ||
        $scope.layout === 'menu'          ||
        $scope.layout === 'head' && first ||
        $scope.layout === 'tail' && last) {
      return '100%';
    } else if ($scope.layout === 'tabs') {
      return 'auto';
    } else {
      return (100/($scope.urls.length-1)) + '%';
    }
  };

  $scope.$watch('urls + layout', function() {
    // New instance of the scaffolder class
    $scope.scaffolder = new Scaffolder($scope.urls, $scope.layout);
  }, true);

});
