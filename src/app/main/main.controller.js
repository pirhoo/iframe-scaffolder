'use strict';

angular.module('iframeScaffolder').controller('MainCtrl', function ($scope, $state, $stateParams, $http, Scaffolder) {

  $scope.scaffolder = new Scaffolder();
  $scope.layout     = $stateParams.layout || 'menu';
  $scope.urls       = $stateParams.urls === '' ? [] : $stateParams.urls.split(',');
  $scope.width      = 600;
  $scope.height     = 450;
  $scope.examples   = [];

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

  $scope.editLabel = function(index) {
    $scope.labels = {};
    $scope.labels[index] = $scope.scaffolder.label(index, '');
  };

  $scope.saveLabel = function(index) {
    // Get the label
    var label = $scope.labels[index] || '';
    $scope.labels = {};
    // Create a new URL with the label as prefix
    if(label !== '') {
      $scope.urls[index] = label + '|' + $scope.scaffolder.url(index, true);
    // Create a new URL without prefix
    } else {
      $scope.urls[index] = $scope.scaffolder.url(index, true);
    }
  };

  $scope.$watch('urls + layout', function() {
    // New instance of the scaffolder class
    $scope.scaffolder = new Scaffolder($scope.urls, $scope.layout);
  }, true);

});
