'use strict';

angular.module('iframeScaffolder').controller('ScaffolderCtrl', function ($scope, Scaffolder) {

  $scope.scaffolder = new Scaffolder();

  $scope.iframeWidth = function() {
    switch($scope.iframeLayout) {
      case 'horizontal':
        return (100/$scope.urls.length) + '%';
      case 'tail', 'head':
        return '50%';
      case 'menu':
        return '75%';
      case 'tabs':
        return '100%';
      case 'narrative':
        return '100%';
    }
  };

  $scope.iframeHeight = function(index, first, last) {
    if ($scope.iframeLayout === 'horizontal'    ||
        $scope.iframeLayout === 'menu'          ||
        $scope.iframeLayout === 'head' && first ||
        $scope.iframeLayout === 'tail' && last) {
      return '100%';
    } else if ($scope.iframeLayout === 'tabs'   ||
               $scope.iframeLayout === 'narrative') {
      return 'auto';
    } else {
      return (100/($scope.urls.length-1)) + '%';
    }
  };

  $scope.menuLinkClasses = function(index) {

    var scaffolder  = $scope.scaffolder,
        isNarrative = $scope.iframeLayout === 'narrative';

    return {
      'active'    : scaffolder.isActive(index),
      'pull-left' : isNarrative && scaffolder.isPrevious(index),
      'pull-right': isNarrative && scaffolder.isNext(index),
      'hidden'    : isNarrative && !scaffolder.isNext(index) && !scaffolder.isPrevious(index)
    };
  };

  $scope.$watch('urls + iframeLayout', function() {
    // New instance of the scaffolder class
    $scope.scaffolder = new Scaffolder($scope.urls, $scope.iframeLayout);
  }, true);

});
