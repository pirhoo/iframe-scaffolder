'use strict';

angular.module('iframeScaffolder').service('Scaffolder', function() {
  function Scaffolder(urls, layout, active) {
    angular.extend(this, {
      urls  : urls   || [],
      layout: layout || 'menu'
    });
    // Activate the right url
    this.activate(active || 0)
    return this;
  }

  Scaffolder.prototype.url = function(index, getter) {
    var url = this.urls[index];
    // Return an URL only for visible iframes in order to avoid
    // bug when an iframe is loaded in background.
    if(this.isVisible(index) || getter) {
      // This url is prefixed by a label
      if( this.hasLabel(index) ) {
        // Returns the second part
        return url.split("|")[1]
      } else {
        return url
      }
    }
  };

  Scaffolder.prototype.isActive = function(index) {
    return index == this.active
  };

  Scaffolder.prototype.activate = function(index) {
    return this.active = index < this.urls.length ? index : 0;
  };

  Scaffolder.prototype.isVisible = function(index) {
    return !this.hasMenu() || this.isActive(index)
  };

  Scaffolder.prototype.hasLabel = function(index) {
    return this.urls[index].indexOf("|http") > -1
  };

  Scaffolder.prototype.label = function(index, replacement) {
    var url = this.urls[index];
    // This url is prefixed by a label
    if( this.hasLabel(index) ) {
      // Returns the first part
      return url.split("|")[0]
    // A replacement value is given
    } else if (typeof replacement !== "undefined" && replacement !== null) {
      return replacement;
    // Return the url as label
    } else {
      return url;
    }
  };

  Scaffolder.prototype.hasMenu = function() {
    return ['menu', 'tabs'].indexOf(this.layout) > -1
  };

  return Scaffolder;
});
