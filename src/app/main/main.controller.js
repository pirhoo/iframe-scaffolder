'use strict';

angular.module('iframeScaffolder').controller('MainCtrl', function ($scope, $state, $http) {

  $scope.layout   = 'head';
  $scope.urls     = [];
  $scope.width    = 600;
  $scope.height   = 450;
  $scope.examples = [];
  // Get sample datasets
  $http.get('assets/examples.json').success(function(data) {
    $scope.examples = data;
  });

  $scope.addUrl = function() {
    // Avoid adding null value
    if(!$scope.newUrl) { return; }
    // Add the url to the list
    $scope.urls.push($scope.newUrl);
    // Reset form value
    $scope.newUrl = null;
  };

  $scope.removeUrl = function(index) {
    $scope.urls.splice(index, 1);
  };

  $scope.getViewUrl = function() {
    var params = {
      urls: $scope.urls.join(','),
      layout: $scope.layout
    };
    return $state.href('view', params, {absolute: true});
  };

  $scope.getViewIframe = function() {
    var url = $scope.getViewUrl(),
      width = $scope.width || 600,
     height = $scope.height || 450;
    return '<iframe src=' + url + ' width="' + width + '" height="' + height + '" frameborder="0" allowfullscreen></iframe>';
  };

  $scope.pickExample = function() {
    var example = $scope.examples[Math.floor(Math.random() * $scope.examples.length)];
    angular.extend($scope, angular.copy(example));
  };

});
