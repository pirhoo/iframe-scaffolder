'use strict';

angular.module('iframeScaffolder')
  .config(function ($stateProvider) {
    $stateProvider.state('home', {
      url: '/',
      params: {
        urls: { value: ''},
        active: { value: 0},
        sharing: { value: 1},
        autoplay: { value: 0},
        layout: { value: 'menu'},
        theme: { value: 'default'}
      },
      templateUrl: 'app/main/main.html',
      controller: 'MainCtrl'
    });
  });
