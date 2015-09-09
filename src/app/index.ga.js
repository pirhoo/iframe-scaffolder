'use strict';

angular.module('iframeScaffolder')
  .run(['$rootScope', '$location', '$window', function($rootScope, $location, $window){
    $rootScope.$on('$stateChangeSuccess', function(){
      if (!$window.ga) { return; }
      $window.ga('send', 'pageview', { page: $location.url() });
    });
  }]);
