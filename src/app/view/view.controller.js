'use strict';

angular.module('iframeScaffolder').controller('ViewCtrl', function ($scope, $stateParams) {
  $scope.layout = $stateParams.layout;
  $scope.urls = $stateParams.urls.split(',');
});
