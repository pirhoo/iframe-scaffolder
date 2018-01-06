'use strict';

angular.module('iframeScaffolder').controller('MainCtrl', function ($scope, $state, $stateParams, $http, Scaffolder, SCAFFOLDER) {

  // Regex code is obtained from angular https://github.com/angular/angular.js/blob/master/src/ng/directive/input.js
  var URL_REGEXP = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/;

  // Mosaic options
  $scope.options = {
    'title': $stateParams.title,
    'description': $stateParams.description,
    'active': parseInt($stateParams.active),
    'sharing': parseInt($stateParams.sharing),
    'autoplay': parseInt($stateParams.autoplay),
    'loop': parseInt($stateParams.loop),
    'layout': $stateParams.layout,
    'gap': $stateParams.gap,
    'theme': $stateParams.theme,
    'urls': !$stateParams.urls || $stateParams.urls === '' ? [] : $stateParams.urls.split(','),
    'enforceProtocol': parseInt($stateParams.enforceProtocol)
  };
  // Default Scaffolder instance
  $scope.scaffolder = new Scaffolder($scope.options);
  $scope.width      = SCAFFOLDER.width;
  $scope.height     = SCAFFOLDER.height;
  $scope.gaps       = SCAFFOLDER.gaps;
  $scope.themes     = SCAFFOLDER.themes;
  $scope.examples   = [];

  // Get sample datasets
  $http.get('assets/examples.json').then(function(res) {
    $scope.examples = res.data;
  });

  $scope.getGap = function(slug) {
    var gap = null;
    angular.forEach(SCAFFOLDER.gaps, function(one) {
      if( one.slug === slug ) {
        gap = one;
      }
    });
    return gap;
  };

  $scope.getTheme = function(slug) {
    var theme = null;
    angular.forEach(SCAFFOLDER.themes, function(one) {
      if( one.slug === slug ) {
        theme = one;
      }
    });
    return theme;
  };

  $scope.isUrlValid = function(value) {
    return $scope.extractUrl(value) !== null;
  };

  $scope.extractUrl = function(value) {
    var url = null;
    // The given value can be an URL
    if( URL_REGEXP.test(value) ) { return value; }
    // Or an iframe...
    try {
      // We parse the code to extract the src value
      url = $(value).attr('src');
      // Some iframe use the // syntax which is not considered as a good value
      if( url.indexOf('//') === 0) { url = 'http:' + url; }
    } catch(e) {
      // We couldnt't parse the value, there is nothing to do
      return null;
    }
    // The url extracted must also be valid
    return url !== undefined && URL_REGEXP.test(url) ? url : null;
  };

  $scope.addUrl = function() {
    var url = $scope.extractUrl($scope.newUrl);
    // Avoid adding null value
    if(url === null) { return; }
    // Add the url to the list
    $scope.options.urls.push(url.replace(/,/g, '%2C'));
    // Reset form value
    $scope.newUrl = null;
  };

  $scope.removeUrl = function(index) {
    $scope.options.urls.splice(index, 1);
  };

  $scope.getViewUrl = function() {
    return $scope.scaffolder.viewUrl($scope.scaffolder.firstIframe);
  };

  $scope.getViewIframe = function() {
    var url = $scope.getViewUrl(),
      width = $scope.useFluid ? '100%' : $scope.width || SCAFFOLDER.width,
     height = $scope.height || SCAFFOLDER.height;
    return '<iframe src="' + url + '" width="' + width + '" height="' + height + '" frameborder="0" allowfullscreen></iframe>';
  };

  $scope.pickExample = function() {
    var example = $scope.examples[Math.floor(Math.random() * $scope.examples.length)];
    angular.extend($scope.options, angular.copy(example));
  };

  $scope.editLabel = function(index) {
    $scope.labels = {};
    $scope.labels[index] = $scope.scaffolder.label(index, '');
  };

  $scope.saveLabel = function(index) {
    // Get the label and remove unauthorized pipes
    var label = ($scope.labels[index] || '').replace(/\||,/gi, ' ');
    $scope.labels = {};
    // Create a new URL with the label as prefix
    if(label !== '') {
      $scope.options.urls[index] = label + '|' + $scope.scaffolder.url(index, true);
    // Create a new URL without prefix
    } else {
      $scope.options.urls[index] = $scope.scaffolder.url(index, true);
    }
  };

  $scope.$watch('options', function() {
    // New instance of the scaffolder class
    $scope.scaffolder = new Scaffolder($scope.options);
  }, true);

});
