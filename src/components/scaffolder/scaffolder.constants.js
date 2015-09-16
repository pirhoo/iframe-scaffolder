'use strict';

angular
  .module('iframeScaffolder')
    .constant('SCAFFOLDER', {
      state: {
        params: {
          urls: { value: ''},
          active: { value: '0'},
          sharing: { value: '1'},
          autoplay: { value: '0'},
          loop: { value: '1'},
          layout: { value: 'menu'},
          theme: { value: 'default'}
        }
      },
      layouts: {
        vertical: ['menu'],
        horizontal: ['tabs', 'narrative'],
        splitted: ['horizontal', 'head', 'tail'],
        togglable: ['menu', 'tabs', 'narrative']
      },
      shortenerInterface: '//white-shortener.herokuapp.com',
      shortenerProvider: 'goo.gl',
      width: 600,
      height: 450,
      themes: [
        { slug: 'default', label: 'Default' },
        { slug: 'ebony-clay', label: 'Ebony clay' },
        { slug: 'picton-blue', label: 'Picton blue' },
        { slug: 'silver-tree', label: 'Silver tree' },
        { slug: 'eucalyptus', label: 'Eucalyptus' },
        { slug: 'sunset-orange', label: 'Sunset orange' },
        { slug: 'monza-red', label: 'Monza red' }
      ]
    });
