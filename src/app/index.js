'use strict';

angular.module('iframeScaffolder', ['ngSanitize', 'ui.router', 'zeroclipboard'])
  .config(function ($stateProvider, $urlRouterProvider, $sceProvider, uiZeroclipConfigProvider) {
    $stateProvider
      .state('home', {
        url: '/',
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
