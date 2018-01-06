'use strict';

angular.module('iframeScaffolder')
  .config(function($urlRouterProvider, $sceProvider, $tooltipProvider, $locationProvider, uiZeroclipConfigProvider) {
    $urlRouterProvider.otherwise('/');
    $locationProvider.hashPrefix('');
    $sceProvider.enabled(false);
    // config ui-bootstrap
    $tooltipProvider.options({ appendToBody: true });
    // config ZeroClipboard
    uiZeroclipConfigProvider.setZcConf({
      swfPath: 'bower_components/zeroclipboard/dist/ZeroClipboard.swf'
    });
  });
