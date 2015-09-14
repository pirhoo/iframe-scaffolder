'use strict';

angular.module('iframeScaffolder').controller('ScaffolderCtrl', function ($scope, $http, Scaffolder) {

  var options = $scope.options;
  $scope.scaffolder = new Scaffolder(options);
  $scope.shouldDisplaySharingPopup = false;

  $scope.toggleSharingPopup = function() {
    // Toggle popup state
    $scope.shouldDisplaySharingPopup = !$scope.shouldDisplaySharingPopup;
    // Stop here if we are closing the popup
    if( !$scope.shouldDisplaySharingPopup ) { return; }
    // Url to share
    var url = $scope.sharingUrl = $scope.scaffolder.viewUrl( $scope.scaffolder.active );
    // Build request config
    var config = { params: { url: url }, cache: true };
    // The popup is display, we should load the shorten URL
    $http
      // We use an external service that received the view URL as param
      .get('//white-shortener.herokuapp.com', config)
      .then(function(res) {
        if( res.data.id ) {
          $scope.sharingUrl = res.data.id;
        }
      });
  };

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

  $scope.getViewIframe = function() {
    var url = $scope.scaffolder.viewUrl(),
      width = '100%',
     height = $scope.height || 450;
    return '<iframe src="' + url + '" width="' + width + '" height="' + height + '" frameborder="0" allowfullscreen></iframe>';
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

  // New active slide
  $scope.$watch('scaffolder.active', function(current, previous) {
    // Save the last-active slide for directional transition
    $scope.previousIndex = previous;
  });

  $scope.$watch('options', function() {
    // New instance of the scaffolder class
    $scope.scaffolder = new Scaffolder(options);
  }, true);

});
