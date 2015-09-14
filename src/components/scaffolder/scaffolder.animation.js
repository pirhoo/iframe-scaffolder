'use strict';

console.log("ha");

angular
  .module('iframeScaffolder')
    .animation('.scaffolder-slide-horizontal', function() {
      return {
        addClass: function (element, className, done) {
          if (className === 'ng-hide') {
            jQuery(element).stop().velocity({
              translateX: '100%'
            }, { duration: 'slow' });
          } else { done(); }
        },
        removeClass: function (element, className, done) {
          if (className === 'ng-hide') {
            jQuery(element).stop().velocity({
              translateX: '0%'
            }, { duration: 'slow' });
          } else { done(); }
        }
      };
    });
