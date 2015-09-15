'use strict';

var SCAFFOLDER_IFRAME_CLS = 'scaffolder__container__iframe';
// True if the given class is in the given class names
var hasClass = function(names, cls) {
  return names.indexOf(SCAFFOLDER_IFRAME_CLS + '--' + cls) > -1;
};

angular
  .module('iframeScaffolder')
    .animation('.' + SCAFFOLDER_IFRAME_CLS + '--anim-horizontal', function() {
      return {
        addClass: function (element, className, done) {
          // Reset position
          $(element).velocity('stop').velocity({ translateY: '0%' }, 0);

          if ( hasClass(className, 'was-before') ) {
            $(element).velocity({ translateX: '-100%' }, 0)
                      .velocity({ translateX:'0%' }, 600, done);
          } else if ( hasClass(className, 'was-after') ) {
            $(element).velocity({ translateX: '100%' }, 0)
                      .velocity({ translateX:'0%' }, 600, done);
          } else if ( hasClass(className, 'before') ) {
            $(element).velocity({ translateX: '0%' }, 0)
                      .velocity({ translateX:'-100%' }, 600, done);
          } else if ( hasClass(className, 'after') ) {
            $(element).velocity({ translateX: '0%' }, 0)
                      .velocity({ translateX:'100%' }, 600, done);
          } else { done(); }
        }
      };
    })
    .animation('.' + SCAFFOLDER_IFRAME_CLS + '--anim-vertical', function() {
      return {
        addClass: function (element, className, done) {
          // Reset position
          $(element).velocity('stop').velocity({ translateX: '0%' }, 0);

          if ( hasClass(className, 'was-before') ) {
            $(element).velocity({ translateY: '-100%' }, 0)
                      .velocity({ translateY:'0%' }, 600, done);
          } else if ( hasClass(className, 'was-after') ) {
            $(element).velocity({ translateY: '100%' }, 0)
                      .velocity({ translateY:'0%' }, 600, done);
          } else if ( hasClass(className, 'before') ) {
            $(element).velocity({ translateY: '0%' }, 0)
                      .velocity({ translateY:'-100%' }, 600, done);
          } else if ( hasClass(className, 'after') ) {
            $(element).velocity({ translateY: '0%' }, 0)
                      .velocity({ translateY:'100%' }, 600, done);
          } else {  done(); }
        }
      };
    });
