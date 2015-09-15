'use strict';

angular.module('iframeScaffolder').controller('ViewCtrl', function ($scope, $stateParams) {
  // Set scaffolder options
  $scope.options = {
    layout  : $stateParams.layout,
    theme   : $stateParams.theme || 'default',
    urls    : $stateParams.urls.split(','),
    active  : parseInt($stateParams.active),
    sharing : parseInt($stateParams.sharing),
    autoplay: parseInt($stateParams.autoplay),
  };
});
