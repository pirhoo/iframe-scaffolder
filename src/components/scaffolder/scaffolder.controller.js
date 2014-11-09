'use strict';

angular.module('iframeScaffolder').controller('ScaffolderCtrl', function ($scope) {

  $scope.iframeWidth = function() {
    switch($scope.layout) {
      case 'horizontal':
        return (100/$scope.urls.length) + '%';
      case 'tail':
        return '50%';
      case 'head':
        return '50%';
    }
  };

  $scope.iframeHeight = function(index, first, last) {
    if ($scope.layout === 'horizontal' ||
        $scope.layout === 'head' && first ||
        $scope.layout === 'tail' && last) {
      return '100%';
    } else {
      return (100/($scope.urls.length-1)) + '%';
    }
  };

});
