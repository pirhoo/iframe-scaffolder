'use strict';

angular.module('iframeScaffolder')
  .config(function ($stateProvider, $urlRouterProvider, $sceProvider, $tooltipProvider, uiZeroclipConfigProvider) {
    $stateProvider
      .state('home', {
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
      })
      .state('view', {
        url: '/view?urls&layout&theme&active&sharing&autoplay',
        templateUrl: 'app/view/view.html',
        controller: 'ViewCtrl',
      })
      .state('fork', {
        url: '/fork?urls&layout&theme&active&sharing&autoplay',
        controller: 'ForkCtrl'
      });

    $urlRouterProvider.otherwise('/');
    $sceProvider.enabled(false);
    // config ui-bootstrap
    $tooltipProvider.options({ appendToBody: true });
    // config ZeroClipboard
    uiZeroclipConfigProvider.setZcConf({
      swfPath: 'bower_components/zeroclipboard/dist/ZeroClipboard.swf'
    });
  });
