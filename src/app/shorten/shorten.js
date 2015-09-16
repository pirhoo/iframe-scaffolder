'use strict';

angular.module('iframeScaffolder')
  .config(function ($stateProvider) {
    $stateProvider.state('shorten', {
      url: '/s/:id',
      controller: 'ShortenCtrl'
    });
  });
