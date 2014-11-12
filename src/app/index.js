'use strict';

angular.module('iframeScaffolder', ['ngSanitize', 'ui.router', 'ui.bootstrap', 'ui.validate', 'zeroclipboard'])
  .config(function ($stateProvider, $urlRouterProvider, $sceProvider, $tooltipProvider, uiZeroclipConfigProvider) {
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
    // config ui-bootstrap
    $tooltipProvider.options({ appendToBody: true });
    // config ZeroClipboard
    uiZeroclipConfigProvider.setZcConf({
      swfPath: 'bower_components/zeroclipboard/dist/ZeroClipboard.swf'
    });
  })
  .run(['$rootScope', '$location', '$window', function($rootScope, $location, $window){
    $rootScope
      .$on('$stateChangeSuccess', function(){
        if (!$window.ga) { return; }
        $window.ga('send', 'pageview', { page: $location.url() });
      });
  }])
;
