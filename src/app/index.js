'use strict';

angular.module('iframeScaffolder')
  .config(function($urlRouterProvider, $sceProvider, $tooltipProvider, uiZeroclipConfigProvider) {
    $urlRouterProvider.otherwise('/');
    $sceProvider.enabled(false);
    // config ui-bootstrap
    $tooltipProvider.options({ appendToBody: true });
    // config ZeroClipboard
    uiZeroclipConfigProvider.setZcConf({
      swfPath: 'bower_components/zeroclipboard/dist/ZeroClipboard.swf'
    });
  });
