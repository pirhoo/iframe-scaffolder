'use strict';

angular
  .module('iframeScaffolder')
    .constant('SCAFFOLDER', {
      state: {
        params: {
          urls: { value: ''},
          active: { value: 0},
          sharing: { value: 1},
          autoplay: { value: 0},
          layout: { value: 'menu'},
          theme: { value: 'default'}
        }
      },
      layouts: {
        vertical: ['menu'],
        horizontal: ['tabs', 'narrative'],
        splitted: ['horizontal', 'head', 'tail']
      },
      shortener: '//white-shortener.herokuapp.com'
    });
