'use strict';

angular.module('iframeScaffolder')
  .config(function ($stateProvider) {
    $stateProvider.state('fork', {
      url: '/fork?urls&layout&theme&active&sharing&autoplay',
      controller: 'ForkCtrl'
    });
  });
