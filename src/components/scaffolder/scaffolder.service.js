'use strict';

angular.module('iframeScaffolder').service('Scaffolder', function($state) {
  // Defauult scaffolder options
  var DEFAULTS_OPTIONS = {
    urls  : [],
    active: 0,
    sharing: 1,
    autoplay: 0,
    theme: 'default',
    layout: 'menu'
  };

  function Scaffolder(options) {
    // Extend the given options with the default one
    options = angular.extend( angular.copy(DEFAULTS_OPTIONS), options);
    angular.extend(this, options);
    // Activate the right url
    this.activate( parseInt(options.active || 0) );
    return this;
  }

  Scaffolder.prototype.serialized = function(active) {
    // Exclude unserializable attributes
    var options = angular.fromJson( angular.toJson(this) );
    // Override URLs list for better serialization
    options.urls = options.urls.join(',');
    // Override active iframe
    options.active = active || options.active || 0;
    // Returns the copy of the object
    return options;
  };

  Scaffolder.prototype.viewUrl = function(active) {
    return $state.href('view', this.serialized(active), {absolute: true});
  };

  Scaffolder.prototype.url = function(index, getter) {
    var url = this.urls[index];
    // Return an URL only for visible iframes in order to avoid
    // bug when an iframe is loaded in background.
    if(this.isVisible(index) || getter) {
      // This url is prefixed by a label
      if( this.hasLabel(index) ) {
        // Returns the second part
        return url.split('|')[1];
      } else {
        return url;
      }
    }
  };

  Scaffolder.prototype.isActive = function(index) {
    return index === this.active;
  };

  Scaffolder.prototype.activate = function(index) {
    this.active = index < this.urls.length ? index : 0;
  };

  Scaffolder.prototype.getActive = function(replacement) {
    return {
      label: this.label(this.active, replacement),
      url: this.url(this.active)
    };
  };

  Scaffolder.prototype.isVisible = function(index) {
    return !this.hasMenu() || this.isActive(index);
  };

  Scaffolder.prototype.isEdge = function(index) {
    return Math.abs(this.active - index) <= 1;
  };

  Scaffolder.prototype.isPrevious = function(index) {
    return index === this.active - 1;
  };

  Scaffolder.prototype.isNext = function(index) {
    return index === this.active + 1;
  };

  Scaffolder.prototype.hasLabel = function(index) {
    return this.urls[index] && this.urls[index].indexOf('|http') > -1;
  };

  Scaffolder.prototype.label = function(index, replacement) {
    var url = this.urls[index];
    // This url is prefixed by a label
    if( this.hasLabel(index) ) {
      // Returns the first part
      return url.split('|')[0];
    // A replacement value is given
    } else if (typeof replacement !== 'undefined' && replacement !== null) {
      return replacement;
    // Return the url as label
    } else {
      return url;
    }
  };

  Scaffolder.prototype.hasMenu = function() {
    return ['menu', 'tabs', 'narrative'].indexOf(this.layout) > -1;
  };

  return Scaffolder;
});
