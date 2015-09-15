'use strict';

angular.module('iframeScaffolder')
  .config(function ($stateProvider, SCAFFOLDER) {
    $stateProvider.state('home', {
      url: '/',
      params: SCAFFOLDER.state.params,
      templateUrl: 'app/main/main.html',
      controller: 'MainCtrl'
    });
  });
