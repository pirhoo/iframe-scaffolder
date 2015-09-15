'use strict';

angular.module('iframeScaffolder')
  .config(function ($stateProvider, SCAFFOLDER) {
    $stateProvider.state('view', {
      url: '/view?' + Object.keys(SCAFFOLDER.state.params).join('&'),
      templateUrl: 'app/view/view.html',
      controller: 'ViewCtrl',
      params: SCAFFOLDER.state.params
    });
  });
