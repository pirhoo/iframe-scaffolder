'use strict';

angular.module('iframeScaffolder', ['ngSanitize', 'ui.router', 'ui.bootstrap', 'ui.validate', 'ui.sortable', 'zeroclipboard', 'ngMaterial', '720kb.socialshare'])
  .config(function ($stateProvider, $urlRouterProvider, $sceProvider, $tooltipProvider, uiZeroclipConfigProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        params: {
          urls: { value: ''},
          layout: { value: 'menu'},
          theme: { value: 'default'}
        },
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      })
      .state('view', {
        url: '/view?urls&layout&theme&active',
        templateUrl: 'app/view/view.html',
        controller: 'ViewCtrl',
      })
      .state('fork', {
        url: '/fork?urls&layout&theme',
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
  })
  .run(['$rootScope', '$location', '$window', function($rootScope, $location, $window){
    $rootScope
      .$on('$stateChangeSuccess', function(){
        if (!$window.ga) { return; }
        $window.ga('send', 'pageview', { page: $location.url() });
      });
  }])
;
