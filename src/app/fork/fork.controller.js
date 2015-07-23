'use strict';

angular
  .module('iframeScaffolder')
    .controller('ForkCtrl', function ($state, $stateParams) {
      $state.go('home', $stateParams);
    });
