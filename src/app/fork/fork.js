'use strict';

angular.module('iframeScaffolder')
  .config(function ($stateProvider, SCAFFOLDER) {
    $stateProvider.state('fork', {
      url: '/fork?urls&layout&theme&active&sharing&autoplay',
      controller: 'ForkCtrl',
      params: SCAFFOLDER.state.params
    });
  });
