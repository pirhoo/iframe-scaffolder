'use strict';

angular.module('iframeScaffolder', ['ngSanitize', 'ui.router', 'zeroclipboard', 'ui.bootstrap'])
  .config(function ($stateProvider, $urlRouterProvider, $sceProvider, uiZeroclipConfigProvider) {
    $stateProvider
      .state('home', {
        url: '/?urls&layout',
        params: {
          urls: { value: ''},
          layout: { value: 'menu'}
        },
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      })
      .state('view', {
        url: '/view?urls&layout',
        templateUrl: 'app/view/view.html',
        controller: 'ViewCtrl',
      });

    $urlRouterProvider.otherwise('/');
    $sceProvider.enabled(false);
    // config ZeroClipboard
    uiZeroclipConfigProvider.setZcConf({
      swfPath: 'bower_components/zeroclipboard/dist/ZeroClipboard.swf'
    });
  })
;
