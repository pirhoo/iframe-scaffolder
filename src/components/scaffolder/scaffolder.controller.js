'use strict';

angular.module('iframeScaffolder').controller('ScaffolderCtrl', function ($scope, $state, $http, Scaffolder, SCAFFOLDER) {

  var options = $scope.options;
  $scope.scaffolder = new Scaffolder(options);
  $scope.shouldDisplaySharingPopup = false;

  $scope.toggleSharingPopup = function() {
    // Toggle popup state
    $scope.shouldDisplaySharingPopup = !$scope.shouldDisplaySharingPopup;
    // Stop here if we are closing the popup
    if( !$scope.shouldDisplaySharingPopup ) { return; }
    // Stop the autoplay (if any)
    $scope.scaffolder.stop();
    // Url to share
    var url = $scope.sharingUrl = $scope.scaffolder.viewUrl( $scope.scaffolder.active );
    // Build request config
    var config = { params: { url: url }, cache: true };
    // The popup is display, we should load the shorten URL
    $http
      // We use an external service that received the view URL as param
      .get(SCAFFOLDER.shortenerInterface, config)
      .then(function(res) {
        if( res.data.id ) {
          // Extract the id from the result
          var sep = SCAFFOLDER.shortenerProvider + '/',
               id = res.data.id.split(sep)[1];
          // Generate the sharing URL from a local endpoint
          $scope.sharingUrl = $state.href('shorten', { id: id }, { absolute: true });
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
      return undefined;
    } else {
      return (100/(options.urls.length-1)) + '%';
    }
  };

  $scope.iframeClasses = function(index, first, last) {
    // Is the given iframe active?
    var active = index === $scope.active;
    // Is the given iframe the last active one? Or is it a first-degree neighbor?
    var edge = $scope.previous === index || Math.abs($scope.active - index) <= 1;
    // Returns a large set of classes...
    return {
      'scaffolder__container__iframe--last'      : last,
      'scaffolder__container__iframe--first'     : first,
      'scaffolder__container__iframe--active'    : active,
      // Gap arround each iframe
      'scaffolder__container__iframe--gap-xs'    : options.gap === 'xs',
      'scaffolder__container__iframe--gap-sm'    : options.gap === 'sm',
      'scaffolder__container__iframe--gap-md'    : options.gap === 'md',
      'scaffolder__container__iframe--gap-lg'    : options.gap === 'lg',
      'scaffolder__container__iframe--gap-xl'    : options.gap === 'xl',
      // The iframe was before the last active one and is now active
      'scaffolder__container__iframe--was-before': active && index < $scope.previous,
      // The iframe was after the last active one and is now active
      'scaffolder__container__iframe--was-after' : active && index > $scope.previous,
      // The iframe is now before the current active one
      'scaffolder__container__iframe--before'    : edge   && index < $scope.active,
      // The iframe is now after the current active one
      'scaffolder__container__iframe--after'     : edge   && index > $scope.active,
      // Animation is not the same for every layout
      'scaffolder__container__iframe--anim-vertical'  : SCAFFOLDER.layouts.vertical.indexOf(options.layout) > -1,
      'scaffolder__container__iframe--anim-horizontal': SCAFFOLDER.layouts.horizontal.indexOf(options.layout) > -1
    };
  };

  $scope.iframeStyle = function(index, first, last) {
    return {
      width: $scope.iframeWidth(index, first, last),
      height: $scope.iframeHeight(index, first, last)
    };
  };

  $scope.getViewIframe = function() {
    var url = $scope.sharingUrl || $scope.scaffolder.viewUrl(),
      width = '100%',
     height = $scope.height || SCAFFOLDER.height;
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
    $scope.previous = previous;
    $scope.active = current;
  });

  $scope.$watch('options', function() {
    // New instance of the scaffolder class
    $scope.scaffolder = new Scaffolder(options);
  }, true);

});
