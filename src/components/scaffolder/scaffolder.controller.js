'use strict';

angular.module('iframeScaffolder').controller('ScaffolderCtrl', function ($scope, Scaffolder) {

  var options = $scope.options;
  $scope.scaffolder = new Scaffolder(options);

  $scope.iframeWidth = function() {
    switch(options.layout) {
      case 'horizontal':
        return (100/options.urls.length) + '%';
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
    if (options.layout === 'horizontal'    ||
        options.layout === 'menu'          ||
        options.layout === 'head' && first ||
        options.layout === 'tail' && last) {
      return '100%';
    } else if (options.layout === 'tabs'   ||
               options.layout === 'narrative') {
      return 'auto';
    } else {
      return (100/(options.urls.length-1)) + '%';
    }
  };

  $scope.menuLinkClasses = function(index) {

    var scaffolder  = $scope.scaffolder,
        isNarrative = options.layout === 'narrative';

    return {
      'active'    : scaffolder.isActive(index),
      'pull-left' : isNarrative && scaffolder.isPrevious(index),
      'pull-right': isNarrative && scaffolder.isNext(index),
      'hidden'    : isNarrative && !scaffolder.isNext(index) && !scaffolder.isPrevious(index)
    };
  };

  $scope.$watch('options', function() {
    // New instance of the scaffolder class
    $scope.scaffolder = new Scaffolder(options);
  }, true);

});
