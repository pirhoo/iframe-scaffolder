'use strict';

angular.module('iframeScaffolder')
  .config(function ($stateProvider, SCAFFOLDER) {
    $stateProvider.state('json', {
      url: '/json?' + Object.keys(SCAFFOLDER.state.params).join('&'),
      templateUrl: 'app/json/json.html',
      controller: 'JsonCtrl',
      params: SCAFFOLDER.state.params
    });
  });
