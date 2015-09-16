'use strict';

angular
  .module('iframeScaffolder')
    .controller('ShortenCtrl', function ($stateParams, $window) {
      // Build the shortUrl
      var shortUrl = $window.location.protocol + '//goo.gl/' + $stateParams.id;
      // Redirect to the shortener
      $window.location = shortUrl;
    });
