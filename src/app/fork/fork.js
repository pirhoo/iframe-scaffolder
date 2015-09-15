'use strict';

angular.module('iframeScaffolder')
  .config(function ($stateProvider, SCAFFOLDER) {
    $stateProvider.state('fork', {
      url: '/fork?' + Object.keys(SCAFFOLDER.state.params).join('&'),
      controller: 'ForkCtrl',
      params: SCAFFOLDER.state.params
    });
  });
