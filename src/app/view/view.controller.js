'use strict';

angular.module('iframeScaffolder').controller('ViewCtrl', function ($scope, $stateParams) {
  // Set scaffolder options
  $scope.options = {
    layout  : $stateParams.layout,
    theme   : $stateParams.theme || 'default',
    urls    : decodeURIComponent($stateParams.urls).split(','),
    active  : parseInt($stateParams.active),
    sharing : parseInt($stateParams.sharing),
    autoplay: parseInt($stateParams.autoplay),
    loop    : parseInt($stateParams.loop),
  };
});
