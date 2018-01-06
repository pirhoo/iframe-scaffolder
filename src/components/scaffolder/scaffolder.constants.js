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
          theme: { value: 'default'},
          gap: { value: null},
          title: { value: null},
          description: { value: null},
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
      gaps: [
        { slug: null, label: 'None' },
        { slug: 'xs', label: 'Extra-Small' },
        { slug: 'sm', label: 'Small' },
        { slug: 'md', label: 'Medium' },
        { slug: 'lg', label: 'Large' },
        { slug: 'xl', label: 'Extra-Large' },
      ],
      themes: [
        { slug: 'default', label: 'Default' },
        { slug: 'ebony-clay', label: 'Ebony clay' },
        { slug: 'picton-blue', label: 'Picton blue' },
        { slug: 'silver-tree', label: 'Silver tree' },
        { slug: 'eucalyptus', label: 'Eucalyptus' },
        { slug: 'amarantha', label: 'Amarantha' },
        { slug: 'sunset-orange', label: 'Sunset orange' },
        { slug: 'monza-red', label: 'Monza red' },
        { slug: 'buddha-gold', label: 'Buddha gold' },
        { slug: 'ebony-clay-filled', label: 'Filled Ebony clay' },
        { slug: 'picton-blue-filled', label: 'Filled Picton blue' },
        { slug: 'silver-tree-filled', label: 'Filled Silver tree' },
        { slug: 'eucalyptus-filled', label:  'Filled Eucalyptus' },
        { slug: 'amarantha-filled', label: 'Filled Amarantha' },
        { slug: 'sunset-orange-filled', label: 'Filled Sunset orange' },
        { slug: 'monza-red-filled', label: 'Filled Monza red' },
        { slug: 'buddha-gold-filled', label: 'Filled Buddha gold' },
        { slug: 'gorse', label: 'Filled Gorse' },
      ]
    });
