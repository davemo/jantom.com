define('gemini.carousel.templates',['handlebars'], function(Handlebars) {

this["JST"] = this["JST"] || {};

this["JST"]["nav"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<ol class=\"carousel__nav pagination pagination--carousel\">\n\n 	<li class=\"pagination__prev\"><a href=\"#\" data-goto=\"--\">Previous</a></li>\n\n	<li class=\"pagination__item\">\n		<span class=\"carousel__current-page-count\">1</span>\n		/\n		<span class=\"carousel__page-count\">";
  if (helper = helpers.pageCount) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.pageCount); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span>\n	</li>\n\n	<li class=\"pagination__next\"><a href=\"#\" data-goto=\"++\">Next</a></li>\n\n</ol>\n";
  return buffer;
  });

return this["JST"];

});
/**
 * @fileoverview

Gemini helpers when dealing with the fold of the window, or an individual
element. Simply put, it tells you whether an element is on the screen.

 *
 * @namespace gemini.fold
 * @copyright Carpages.ca 2014
 * @author Matt Rose <matt@mattrose.ca>
 *
 * @requires gemini
 *
 * @example
  G.belowthefold('#js-some-item');
 */
define('gemini.fold',['gemini'], function($){

  /**
   * Check it the element is below the fold
   *
   * @method
   * @name gemini.fold#belowthefold
   * @param {element} element The dom element that you're inquiring
   * @param {object} options
   * @param {element} options.container The container element that the viewport applies to
   * @param {integer} options.threshhold The pixel threshold beyond the fold
   * @return {boolean} Returns whether the element is below the fold or not
  **/
  $.belowthefold = function(element, options) {
    var fold;
    var settings = $.extend({}, {container:window, threshold: 0}, options);

    if (settings.container === undefined || settings.container === window) {
      fold = $(window).height() + $(window).scrollTop();
    } else {
      fold = $(settings.container).offset().top + $(settings.container).height();
    }

    return fold <= $(element).offset().top - settings.threshold;
  };

  /**
   * Check it the element is right of the fold
   *
   * @method
   * @name gemini.fold#rightoffold
   * @param {element} element The dom element that you're inquiring
   * @param {object} options
   * @param {element} options.container The container element that the viewport applies to
   * @param {integer} options.threshhold The pixel threshold beyond the fold
   * @return {boolean} Returns whether the element is to the right of the fold or not
  **/
  $.rightoffold = function(element, options) {
    var fold;
    var settings = $.extend({}, {container:window, threshold: 0}, options);

    if (settings.container === undefined || settings.container === window) {
      fold = $(window).width() + $(window).scrollLeft();
    } else {
      fold = $(settings.container).offset().left + $(settings.container).width();
    }

    return fold <= $(element).offset().left - settings.threshold;
  };

  /**
   * Check it the element is above the top
   *
   * @method
   * @name gemini.fold#abovethetop
   * @param {element} element The dom element that you're inquiring
   * @param {object} options
   * @param {element} options.container The container element that the viewport applies to
   * @param {integer} options.threshhold The pixel threshold beyond the top
   * @return {boolean} Returns whether the element is above of the top or not
  **/
  $.abovethetop = function(element, options) {
    var fold;
    var settings = $.extend({}, {container:window, threshold: 0}, options);

    if (settings.container === undefined || settings.container === window) {
      fold = $(window).scrollTop();
    } else {
      fold = $(settings.container).offset().top;
    }

    return fold >= $(element).offset().top + settings.threshold  + $(element).height();
  };

  /**
   * Check it the element is left of the begininning
   *
   * @method
   * @name gemini.fold#leftofbegin
   * @param {element} element The dom element that you're inquiring
   * @param {object} options
   * @param {element} options.container The container element that the viewport applies to
   * @param {integer} options.threshhold The pixel threshold beyond the beginning
   * @return {boolean} Returns whether the element is to the left of the beginning or not
  **/
  $.leftofbegin = function(element, options) {
    var fold;
    var settings = $.extend({}, {container:window, threshold: 0}, options);

    if (settings.container === undefined || settings.container === window) {
      fold = $(window).scrollLeft();
    } else {
      fold = $(settings.container).offset().left;
    }

    return fold >= $(element).offset().left + settings.threshold + $(element).width();
  };

  /**
   * Check it the element is in the viewport
   *
   * @method
   * @name gemini.fold#inviewport
   * @param {element} element The dom element that you're inquiring
   * @param {object} options
   * @param {element} options.container The container element that the viewport applies to
   * @param {integer} options.threshhold The pixel threshold of the viewport
   * @return {boolean} Returns whether the element is in the viewport
  **/
  $.inviewport = function(element, settings) {
    return !$.rightoffold(element, settings) && !$.leftofbegin(element, settings) &&
        !$.belowthefold(element, settings) && !$.abovethetop(element, settings);
  };

  // Custom selectors for your convenience.
  // Use as $("img:below-the-fold").something() or
  // $("img").filter(":below-the-fold").something() which is faster
  /*
  $.extend($.expr[':'], {
    "below-the-fold" : function(a) { return $.belowthefold(a, {threshold : 0}); },
    "above-the-top"  : function(a) { return !$.belowthefold(a, {threshold : 0}); },
    "right-of-screen": function(a) { return $.rightoffold(a, {threshold : 0}); },
    "left-of-screen" : function(a) { return !$.rightoffold(a, {threshold : 0}); },
    "in-viewport"    : function(a) { return $.inviewport(a, {threshold : 0}); },
    "above-the-fold" : function(a) { return !$.belowthefold(a, {threshold : 0}); },
    "right-of-fold"  : function(a) { return $.rightoffold(a, {threshold : 0}); },
    "left-of-fold"   : function(a) { return !$.rightoffold(a, {threshold : 0}); }
  });
  */

  return $;
});

/**
 * @fileoverview

A Gemini plugin that allows you to listen to when the user has changed the
screen size.

### Notes
- Here's a note

### Features
- Bind events to when the screen is resized
- Only triggers the event when the resize is complete
- You have access to the current screen size according to Gemini standards
(``small``, ``medium``, ``large``, ``xlarge``)

 *
 * @namespace gemini.respond
 * @copyright Carpages.ca 2014
 * @author Matt Rose <matt@mattrose.ca>
 *
 * @requires gemini
 *
 * @example
  G.respond.bind('resize', function(e, screen, windowWidth){

    console.log('Screen: ' + screen);
    console.log('Window Width: ' + windowWidth + 'px');

  });
 */

define('gemini.respond',['gemini'], function($){

  var _ = $._;

  // Private settings
  var _settings = {
    delay: 500, //Delay before events are triggered
    minChange: 20 //Minimum difference in width for event to trigger
  };

  // Object to bind and trigger listeners to
  var LISTENER = $({});

  // Public object
  var plugin = {};

  // Object that specifies breakboints
  // Should sync with SASS breakpoints
  // {project}/sass/settings.scss
  // {framewrok}/variables/defaults.scss
  plugin.breakpoints = {
    'small': 0,
    'medium': 600,
    'large': 1024,
    'xlarge': 1280
  };

  /**
   * Get a list of sorted breakpoints by screen size
   *
   * @method
   * @name gemini.respond#sortedBreakpoints
   * @return {array} Array of sorted breakpoints by screen size
  **/
  plugin.sortedBreakpoints = function(){
    return _.sortBy(
      _.map(plugin.breakpoints, function(size, screen){
        return {
          size: size,
          screen: screen
        };
      }),
      function(bp){return bp.size;}
    );
  };


  /**
   * Get the screen size based on Gemini naming conventions
   *
   * @method
   * @name gemini.respond#getScreen
   * @return {string} Screen size
  **/
  plugin.getScreen = function(){
    var returnScreen,
        width = $window.width();

    _.each(plugin.sortedBreakpoints(), function(bp){
      if(bp.size < width){
        returnScreen = bp.screen;
      }
    });

    return returnScreen;
  };

  /**
   * Check for a certain screen size or higher
   *
   * @method
   * @name gemini.respond#isScreen
   * @param {string} screen Screen size
   * @return {boolean} Whether the screen is that size or larger
  **/
  plugin.isScreen = function(screen){
    return $window.width() >= plugin.breakpoints[screen];
  };

  // Cache of the last registered width
  var _width = $window.width();

  // Add a listener to run on resize after a set delay
  $window.resize(_.debounce(function(){

    var windowWidth = $window.width();

    //Check if the window was resized enough to trigger a change
    if(Math.abs(_width - windowWidth) > _settings.minChange){
      _width = windowWidth;
      _resize(windowWidth);
    }

  }, _settings.delay));

  // Function to run when the screen is resized
  var _resize = function(windowWidth){

    //Triggers the resize event
    plugin.trigger('resize', [plugin.getScreen(), _width]);

  };

  /**
   * Bind an event
   *
   * @method
   * @name gemini.respond#bind
   * @param {string} event The event name
   * @param {function} callback The callback fuction for the event
  **/
  plugin.bind = function(){
    LISTENER.bind.apply(LISTENER, arguments);
  };
  plugin.trigger = function(){
    LISTENER.trigger.apply(LISTENER, arguments);
  };

  $.respond = plugin;

});

/**
 * @fileoverview

A Gemini plugin to build dynamic carousel's. The plugin works
mostly with CSS, meaning the markup is quite manipulatable.

### Notes
- Requires an include to ``carousel.scss`` in your Gemini build

### Features
- You can set the number of items per page in the markup's list. This is set
using the CSS extension ``carousel__list--{number}``.
- You can add custom navigation buttons within the carousel using the
``data-goto`` attribute. The value set will take you to the corresponding page.
You can see this in the example

 *
 * @namespace gemini.carousel
 * @copyright Carpages.ca 2014
 * @author Matt Rose <matt@mattrose.ca>

 * @requires gemini
 * @requires gemini.fold
 * @requires gemini.respond
 * @requires gemini.touch
 * @requires gemini.support

 * @prop {boolean} pagination {@link gemini.carousel#pagination}
 * @prop {boolean} incrementByOne {@link gemini.carousel#incrementByOne}
 * @prop {boolean} loop {@link gemini.carousel#loop}
 * @prop {boolean} animate {@link gemini.carousel#animate}
 * @prop {string} container {@link gemini.carousel#container}
 * @prop {integer} indexList {@link gemini.carousel#indexList}
 * @prop {integer} scrollSpeed {@link gemini.carousel#scrollSpeed}
 * @prop {boolean} thumbs {@link gemini.carousel#thumbs}
 * @prop {function} onChange {@link gemini.carousel#onChange}
 * @prop {object} templates {@link gemini.carousel#templates}

 * @example
  <html>
    <div id="js-carousel-example" class="carousel">
      <ul class="carousel__list carousel__list--3">
        <li>Content for item 1</li>
        <li>Content for item 2</li>
        <li>Content for item 3</li>
        <li>Content for item 4</li>
      </ul>
      <!-- Can be added automatically using the pagination setting -->
      <button class="button" data-goto="--">Previous Page</button>
      <button class="button" data-goto="2">Page 2</button>
      <button class="button" data-goto="++">Next Page</button>
    </div>
  </html>

 * @example
  G('#js-carousel-example').carousel();
 */

define('gemini.carousel',[
  'gemini',
  'gemini.carousel.templates',
  'gemini.fold',
  'gemini.respond',
  'gemini.support'
], function( $, T ) {
  var _ = $._;

  $.boiler( 'carousel', {
    defaults: {
      /**
       * Whether to append pagination to the the carousel.
       * @name gemini.carousel#pagination
       * @type Boolean
       * @default false
       */
      pagination: false,

      /**
       * Set to true to increment by one item regardless of how many are visible.
       * @name gemini.carousel#incrementByOne
       * @type Boolean
       * @default false
       */
      incrementByOne: false,

      /**
       * Whether to do a scroll animation when clicked
       * @name gemini.carousel#animate
       * @type Boolean
       * @default false
       */
      animate: true,

      /**
       * Whether you want the carousel to loop.
       * @name gemini.carousel#loop
       * @type Boolean
       * @default false
       */
      loop: false,

      /**
       * Selector for the carousel's container. If false, carousel is $el.
       * @name gemini.carousel#container
       * @type String
       * @default false
       */
      container: false,

      /**
       * Specify which iteration of the .carousel__list you'd like to index for
       * the carousel.
       * @name gemini.carousel#indexList
       * @type Interger
       * @default 0
       */
      indexList: 0,

      /**
       * The speed that the carousel scrolls at in milliseconds.
       * @name gemini.carousel#scrollSpeed
       * @type Integer
       * @default 500
       */
      scrollSpeed: 350,

      /**
       * Whether to map a list of thumbnails to the corresponding pages. Default
       * class expected is ``carousel__thumbs``.
       * @name gemini.carousel#thumbs
       * @type Boolean
       * @default false
       */
      thumbs: false,

      /**
       * Callback function to run when the item changes
       * @name gemini.carousel#onChange
       * @type function
       * @default false
       */
      onChange: false,

      /**
       * Precompiled Handlebar templates to replace default. Expecting 'nav' for
       * default navigation.
       * @name gemini.carousel#templates
       * @type Object
       * @default {}
       */
      templates: {}
    },

    // Event listeners
    events: {
      'click [data-goto]': '_handleClick'
    },

    // Initiate the plugin
    init: function() {
      var P = this;

      // Extend the templates
      P.T = $.extend( T, P.settings.templates );

      // Init variables
      P.currentItem = P.currentPage = 1;

      // Cache jQuery objects
      P.$carousel = P.settings.container
        ? P.$el.find( P.settings.container )
        : P.$el;
      P.$carouselLists = P.$el.find( '.carousel__list' );
      P.carouselList = P.$carouselLists[P.settings.indexList];
      P.$carouselList = $( P.carouselList );
      P.$currentPage = P.$el.find( '[data-goto="1"]' );
      P.$next = P.$el.find( '[data-goto="next"],[data-goto="++"]' );
      P.$previous = P.$el.find(
        '[data-goto="prev"],[data-goto="previous"],[data-goto="--"]'
      );

      // Change next/prev button active states
      if ( !P._isNext()) {
        P.$next.addClass( 'is-inactive' );
      } else {
        P.$next.removeClass( 'is-inactive' );
      }
      if ( !P._isPrevious()) {
        P.$previous.addClass( 'is-inactive' );
      } else {
        P.$previous.removeClass( 'is-inactive' );
      }

      // Update
      P._update();

      // Update on resize
      $.respond.bind( 'resize', function( e, scrn ) {
        P._update();
        P.gotoPage( P.currentPage, false );
      });

      // Setup thumbnails
      if ( P.settings.thumbs ) {
        P.$thumbs = P.$el.find( '.carousel__thumbs' );
        P.$thumbs.find( 'a' ).each( function( i ) {
          $( this ).click( function( e ) {
            e.preventDefault();
            P.gotoPage( i + 1 );
          });
        });
      }

      // Touch Support
      if ( $.support.touch ) {
        P.settings.animate = true;
        P._initTouch();
      }
    },

    /**
     * Update the carousel's cached values and render and templates
     * @name gemini.carousel#_update
     * @private
     * @function
     */
    _update: function() {
      var P = this;

      // Update Cache
      P.pageWidth = P.$carouselList.width();
      P.itemWidth = P.$carouselList.children( 'li:first-child' ).width();

      P._itemsPerPage = Math.floor( P.pageWidth / P.itemWidth ) - 1;
      P.itemsPerPage = P.settings.incrementByOne ? 1 : P._itemsPerPage + 1;

      P.itemCount = P.$carouselList.children( 'li' ).length;
      P.pageCount = Math.ceil( P.itemCount / P.itemsPerPage );

      // Template the pagination
      if ( P.settings.pagination ) {
        P._paginate();
      }
    },

    /**
     * Render the pagination
     * @name gemini.carousel#_paginate
     * @private
     * @function
     */
    _paginate: function() {
      var P = this;

      // Template
      P.pagination = P.T.nav({
        pageCount: P.pageCount
      });

      // Render
      if ( !P.$pagination ) {
        // First load
        P.$pagination = $( '<span/>' ).append( P.pagination );
        P.$el.append( P.$pagination );
      } else {
        // Replace exisiting
        P.$pagination.html( P.pagination );
      }

      // Cache
      P.$currentPageCount = P.$pagination.find( '.carousel__current-page-count' );
    },

    /**
     * Callback when a user clicks the carousel
     * @name gemini.carousel#_handleClick
     * @private
     * @function
     * @param {event#object} e Click event object
     * @param {element} target The targeted element
     */
    _handleClick: function( e, target ) {
      var P = this;
      var goTo = $( target ).data( 'goto' );

      if ( !goTo ) return;

      e.preventDefault();
      // Next
      if ( goTo == 'next' || goTo == '++' ) P.next();
      // Previous
      else if ( goTo == 'prev' || goTo == 'previous' || goTo == '--' ) {
        P.previous();
      }
      // Go to page
      else P.gotoPage( goTo );
    },

    /**
     * Check if there is a next page
     * @name gemini.carousel#_isNext
     * @private
     * @function
     * @return {boolean} Weather the next page exists
     */
    _isNext: function() {
      var P = this;

      if ( P.settings.loop ) return true;

      if ( P.allItemsShown ) {
        return P.currentPage <= P.pageCount - P._itemsPerPage;
      }

      return P.currentPage !== P.pageCount;
    },

    /**
     * Check if there is a previous page
     * @name gemini.carousel#_isPrevious
     * @private
     * @function
     * @return {boolean} Weather the previous page exists
     */
    _isPrevious: function() {
      return this.settings.loop || this.currentPage != 1;
    },

    /**
     * Go to the next page on the carousel
     * @name gemini.carousel#next
     * @function
     */
    next: function() {
      var P = this;
      if ( P._isNext()) P.gotoPage( P.currentPage + 1 );
    },

    /**
     * Go to the previous page on the carousel
     * @name gemini.carousel#previous
     * @function
     */
    previous: function() {
      var P = this;
      if ( P._isPrevious()) P.gotoPage( P.currentPage - 1 );
    },

    /**
     * Go to a specific item in the carousel
     * @name gemini.carousel#_gotoItem
     * @private
     * @function
     */
    _gotoItem: function( item, animate ) {
      if ( animate === undefined ) animate = true;

      var P = this;
      if ( item > P.itemCount ) return;

      // Calculate the x offset in pixels
      var $item = P.$carouselList.children( 'li:nth-child(' + item + ')' ),
        xOffset =
          $item.offset().left -
          P.$carouselList.offset().left +
          P.carouselList.scrollLeft;

      // Whether there are more items to scroll to
      var isMoreItems = $.rightoffold( P.$carouselList.find( 'li' ).last(), {
        container: P.$carouselList,
        threshold: -P.itemWidth - 20
      });

      // Make sure there's something to scroll to
      if (( item > P.currentItem && !isMoreItems ) || xOffset < 0 ) return;

      // Change the item
      P.currentItem = item;
      P.allItemsShown = P.currentItem - 1 === P.itemCount - P._itemsPerPage;

      if ( animate ) {
        P.$carouselLists.animate(
          {
            scrollLeft: xOffset
          },
          P.settings.scrollSpeed
        );
      } else {
        P.$carouselLists.scrollLeft( xOffset );
      }

      setTimeout(
        _.bind( function() {
          $( this ).trigger( 'scroll' );
          if ( P.settings.onChange ) P.settings.onChange.call( P );
        }, P.$carousel ),
        animate ? P.settings.scrollSpeed : 0
      );
    },

    /**
     * Go to a specific page in the carousel
     * @name gemini.carousel#gotoPage
     * @function
     * @param {Integer} page The desired page
     */
    gotoPage: function( page, animate ) {
      var P = this;

      if ( animate === undefined ) animate = P.settings.animate;

      if (( P.allItemsShown && P.settings.loop ) || page > P.pageCount ) {
        if ( P.settings.loop ) {
          P.allItemsShown = false;
          P.gotoPage( 1 );
        }

        return;
      } else if ( page < 1 ) {
        if ( P.settings.loop ) P.gotoPage( P.pageCount );
        return;
      }

      var item = P.itemsPerPage * ( page - 1 ) + 1;

      P._gotoItem( item, animate );

      // Change active page
      P.currentPage = page;
      P.$currentPage.removeClass( 'is-active' );
      P.$currentPage = P.$el.find( '[data-goto="' + P.currentPage + '"]' );
      P.$currentPage.addClass( 'is-active' );
      if ( P.$currentPageCount ) P.$currentPageCount.html( page );

      // Change next/prev button active states
      if ( !P._isNext()) {
        P.$next.addClass( 'is-inactive' );
      } else {
        P.$next.removeClass( 'is-inactive' );
      }
      if ( !P._isPrevious()) {
        P.$previous.addClass( 'is-inactive' );
      } else {
        P.$previous.removeClass( 'is-inactive' );
      }
    },

    /**
     * Initiate the touch support for carousel's
     * @name gemini.carousel#_initTouch
     * @private
     * @function
     */
    _initTouch: function() {
      var P = this;

      require([ 'gemini.touch' ], function() {
        // Add touch events
        P.$carouselList
          .hammer({
            dragBlockHorizontal: true,
            dragLockToAxis: true,
            dragLockMinDistance: 20,
            hold: false,
            tap: false
          })
          .on( 'release dragleft dragright', function( ev ) {
            switch ( ev.type ) {
              case 'dragright':
              case 'dragleft':
                // stick to the finger
                var pageOffset = ( P.currentPage - 1 ) * P.pageWidth;
                var dragOffset = -ev.gesture.deltaX;

                // slow down at the first and last pane
                if (
                  ( P.currentPage == 1 && ev.gesture.direction == 'right' ) ||
                  ( P.currentPage == P.pageCount &&
                    ev.gesture.direction == 'left' )
                ) {
                  dragOffset *= 0.4;
                }

                P.$carouselLists.scrollLeft( pageOffset + dragOffset );
                break;

              case 'release':
                // check if their finger is moving fast
                if ( ev.gesture.velocityX > 0.05 ) {
                  if ( ev.gesture.interimDirection == 'left' ) {
                    P.next();
                  } else if ( ev.gesture.interimDirection == 'right' ) {
                    P.previous();
                  }
                  // snap carousel base on positioning of page
                } else {
                  // more then 50% moved, navigate
                  if ( Math.abs( ev.gesture.deltaX ) > P.pageWidth / 2 ) {
                    if ( ev.gesture.direction == 'right' ) {
                      P.previous();
                    } else {
                      P.next();
                    }
                  } else {
                    P.gotoPage( P.currentPage );
                  }
                }
                break;
            }
          });
      });
    }
  });

  // Return the jquery object
  // This way you don't need to require both jquery and the plugin
  return $;
});

define('gemini.gallery.templates',['handlebars'], function(Handlebars) {

this["Templates"] = this["Templates"] || {};
this["Templates"]["Gallery"] = this["Templates"]["Gallery"] || {};

this["Templates"]["Gallery"]["gallery"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n    <li>\n\n      <div class=\"fit\">\n        <img class=\"lazy clickable\"\n          data-original=\"";
  if (helper = helpers.src) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.src); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\"\n          ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.screens), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n          >\n      </div>\n\n    </li>\n  ";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n            data-";
  if (helper = helpers.screen) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.screen); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "=\"";
  if (helper = helpers.src) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.src); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\"\n          ";
  return buffer;
  }

  buffer += "<div class=\"js-gallery-carousel carousel\">\n  <ul class=\"carousel__list\">\n\n  ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.imgs), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n  </ul>\n</div>\n";
  return buffer;
  });

this["Templates"]["Gallery"]["modal"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div id=\"js-modal\" class=\"modal\">\n  <div id=\"js-modal__content\" class=\"modal__content full\"></div>\n  <div id=\"js-modal__close\" class=\"modal__close\"></div>\n</div>\n";
  });

return this["Templates"]["Gallery"];

});
define('gemini.modal.templates',['handlebars'], function(Handlebars) {

this["Templates"] = this["Templates"] || {};
this["Templates"]["Modal"] = this["Templates"]["Modal"] || {};

this["Templates"]["Modal"]["modal"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div id=\"js-modal\" class=\"modal\">\n  <div id=\"js-modal__content\" class=\"modal__content\"></div>\n  <div id=\"js-modal__close\" class=\"modal__close\"></div>\n</div>\n";
  });

return this["Templates"]["Modal"];

});
/**
 * @fileoverview

A Gemini plugin to to easily pop content up in a modal.

### Notes
- Requires an include to ``accordian.scss`` in your Gemini build

### Features
- You can call ``$el.modal()`` to put the content of $el into a modal. To avoid
rendering the same content twice, you can put it in a ``<script>`` tag.

 *
 * @namespace gemini.modal
 * @copyright Carpages.ca 2014
 * @author Matt Rose <matt@mattrose.ca>
 *
 * @requires gemini
 *
 * @prop {string} content {@link gemini.modal#content}
 * @prop {function} onOpen {@link gemini.modal#onOpen}
 * @prop {function} onClose {@link gemini.modal#onClose}
 * @prop {integer} fadeIn {@link gemini.modal#fadeIn}
 * @prop {integer} fadeOut {@link gemini.modal#fadeOut}
 * @prop {boolean} closeable {@link gemini.modal#closeable}
 * @prop {boolean} fixed {@link gemini.modal#fixed}
 * @prop {boolean} stopPropagation {@link gemini.modal#stopPropagation}
 * @prop {object} templates {@link gemini.modal#templates}
 *
 * @example
  var modal = G.Modal({
    content: '<h1>Hello World!</h1>'
  });

  modal.open();
 */

define('gemini.modal',['gemini', 'gemini.modal.templates'], function($, T){

  var _ = $._;

  //Make an object to be used by both $.modal and $.fn.modal
  $.Modal = function(options){

    var plugin = {
      settings: $.extend({}, {
        /**
         * The HTML content to put in the modal
         *
         * @name gemini.modal#content
         * @type string
         * @default ''
         */
        content: '',
        /**
         * Callback function to run when the modal opens
         *
         * @name gemini.modal#onOpen
         * @type function
         * @default false
         */
        onOpen: false,
        /**
         * Callback function to run when the modal closes
         *
         * @name gemini.modal#onClose
         * @type function
         * @default false
         */
        onClose: false,
        /**
         * The speed that the modal fades in at in milliseconds
         *
         * @name gemini.modal#fadeIn
         * @type integer
         * @default 250
         */
        fadeIn: 250,
        /**
         * The speed that the modal fades out at in milliseconds
         *
         * @name gemini.modal#fadeOut
         * @type integer
         * @default 250
         */
        fadeOut: 250,
        /**
         * Weather or not the user can manually close the modal
         *
         * @name gemini.modal#closeable
         * @type boolean
         * @default true
         */
        closeable: true,
        /**
         * Whether to position the modal wrapper as fixed or not. This setting
         * will cut off content in the screen is small than the containing
         * content
         *
         * @name gemini.modal#fixed
         * @type boolean
         * @default false
         */
        fixed: false,
        /**
         * A selector describing the content of the modal. Anything clicked
         * outside of these items will close the modal.
         *
         * @name gemini.modal#stopPropagation
         * @type string
         * @default '#js-modal__content'
         */
        stopPropagation: '#js-modal__content',
        /**
         * Precompiled Handlebar templates to replace default. Expecting 'modal'
         * @name jquery.gallery#templates
         * @type object
         * @default {}
         */
        templates: {},
      }, options),

      init: function(){
        var plugin = this;

        //Extend the templates
        plugin.T = $.extend(T, plugin.settings.templates);

        //Cache wrapper, modal, and exit
        plugin.$modal = $(plugin.T.modal())._hide();
        plugin.$content = plugin.$modal.find('#js-modal__content');
        plugin.$exit = plugin.$modal.find('#js-modal__close');

        //Add content
        plugin.$content.html(plugin.settings.content);

        //Append modal to body
        $('body').append(plugin.$modal);

        if (plugin.settings.closeable) {
          plugin._closeListeners();
        }

      },

      /**
       * Open the modal
       *
       * @method
       * @name gemini.modal#open
      **/
      open: function(){
        var plugin = this;

        //Calculate top if not fixed
        if(plugin.settings.fixed){
          plugin.$modal.addClass('modal--fixed');
        }else{
          var top = ($(window).height() - plugin.$content.height()) / 2;
          top = Math.max(top, 0);
          plugin.$content.css('top', $(window).scrollTop() + top);
        }


        plugin.$modal.addClass('is-active')._fadeIn(plugin.settings.fadeIn);
        if (plugin.settings.closeable) {
          plugin.$exit.fadeIn(plugin.settings.fadeIn);
        }

        if(plugin.settings.onOpen) plugin.settings.onOpen.call(plugin);
      },

      /**
       * Close the modal
       *
       * @method
       * @name gemini.modal#close
      **/
      close: function(){
        var plugin = this;

        plugin.$modal.removeClass('is-active')._fadeOut(plugin.settings.fadeOut);
        if (plugin.settings.closeable) {
          plugin.$exit.fadeOut(plugin.settings.fadeOut);
        }

        if(plugin.settings.onClose) plugin.settings.onClose.call(plugin);
      },

      /**
       * Update the content inside of the modal
       *
       * @method
       * @name gemini.modal#update
       * @param {string} content The HTML content to put inside of the modal
      **/
      update: function(content){
        plugin.$content.html(content);
      },

      _closeListeners: function() {
        var plugin = this;

        //Close event on wrapper click and exit click
        var $stop = plugin.$modal.find(
          _.filter([
            '.js-modal__clickable',
            plugin.settings.stopPropagation
          ], Boolean).join(', ')
        );

        var stop = false;
        plugin.$modal.click(function(){
          if(stop){
            stop = false;
          } else {
            plugin.close();
          }
        });
        $stop.click(function(e){
          stop = true;
        });
        plugin.$exit.click(function(){
          plugin.close();
        });
      }
    };

    plugin.init();

    return plugin;
  };

  $.boiler('modal', {
    defaults: {},

    init: function(){
      var plugin = this;

      plugin.modal = new $.Modal({
        content: plugin.$el.html()
      });
    },

    open: function(){
      this.modal.open();
    },

    close: function(){
      this.modal.close();
    }
  });

  // Return the jquery object
  // This way you don't need to require both jquery and the plugin
  return $;

});

/**
 * @fileoverview

Works the same as http://www.appelsiini.net/projects/lazyload v1.8.4
The only different is you bind it to the containers, and send the images
selector as an option.

 *
 * @namespace gemini.lazyload
 * @copyright Carpages.ca 2014
 * @author Matt Rose <matt@mattrose.ca>
 *
 * @requires gemini
 * @requires gemini.fold
 *
 * @example
  G('#js-container').lazyload({images:'img.lazy'});
 */

define('gemini.lazyload',['gemini', 'gemini.fold'], function($){

  $.boiler('lazyload', {

    // plugin's default options
    defaults: {
      threshold       : 0,
      failure_limit   : 0,
      event           : "scroll",
      effect          : "show",
      images          : 'img.lazy',
      data_attribute  : "original",
      skip_invisible  : true,
      appear          : null,
      load            : null,
      placeholder     : "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==",
      bindWindow      : false
    },

    // the method that initiates DOM listeners and manipulation
    init: function(){
      var plugin = this;

      //Cache
      plugin.$window = $(window);
      plugin.$imgs = plugin.$el.find(plugin.settings.images);
      plugin.elToBind = plugin.settings.bindWindow ? window : plugin.el;
      plugin.$elToBind = $(plugin.elToBind);

      // Bind the (scroll?) event to the container
      // Fire one scroll event per scroll. Not one scroll event per image.
      if (0 === plugin.settings.event.indexOf("scroll")) {
        // only trigger on intervals of 250ms
        // http://ejohn.org/blog/learning-from-twitter/
        var scrollTriggered = false;

        plugin.$elToBind.bind(plugin.settings.event, function(event) {
          scrollTriggered = true;
        });

        setInterval(function(){
          if(scrollTriggered){
            plugin.update();
            scrollTriggered = false;
          }
        }, 250);
      }

      plugin.$imgs.each(function(){
        var img = this;
        var $img = $(this);

        img.loaded = false;

        /* If no src attribute given use data:uri. */
        if ($img.attr("src") === undefined || $img.attr("src") === false || $img.attr("src") === '') {
          $img.attr("src", plugin.settings.placeholder);
        }

        /* When appear is triggered load original image. */
        $img.one("appear", function() {
          if (!this.loaded) {
            var imgUrl = plugin.getImgUrl(img);

            if (plugin.settings.appear) {
              var elements_left = plugin.$imgs.length;
              plugin.settings.appear.call(img, elements_left, plugin.settings);
            }
            $("<img />")
              .bind("load", function() {
                $img
                  .hide()
                  .attr("src", imgUrl)
                  [plugin.settings.effect](plugin.settings.effect_speed);
                img.loaded = true;

                /* Remove image from array so it is not looped next time. */
                var temp = $.grep(plugin.$imgs, function(img) {
                  return !img.loaded;
                });
                plugin.$imgs = $(temp);

                if (plugin.settings.load) {
                  var elements_left = plugin.$imgs.length;
                  plugin.settings.load.call(img, elements_left, plugin.settings);
                }
              })
              .attr("src", imgUrl);
          }
        });

        // If not scroll event, bind the img with the event
        if (0 !== plugin.settings.event.indexOf("scroll")) {
          $img.bind(plugin.settings.event, function(event) {
            $img.trigger("appear");
          });
        }
      });

      /* Check if something appears when window is resized. */
      $(window).bind("resize", function(event) {
        plugin.update();
      });

      /* With IOS5 force loading images when navigating with back button. */
      /* Non optimal workaround. */
      if ((/iphone|ipod|ipad.*os 5/gi).test(navigator.appVersion)) {
        plugin.$window.bind("pageshow", function(event) {
          if (event.originalEvent.persisted) {
            plugin.$imgs.each(function() {
              $(this).trigger("appear");
            });
          }
        });
      }

      /* Force initial check if images should appear. */
      plugin.update();

      /* Load all images on print */
      $(document).on('print', function(){
        plugin.$imgs.each(function(){
          $(this).trigger('appear');
        });
      });

    },

    getImgUrl: function(img) {
      var plugin = this,
          $img = $(img),
          width = $window.width(),
          url = $img.data(plugin.settings.data_attribute);

      _.each($.respond.sortedBreakpoints(), function(bp){
        if(width > bp.size) {
          var isUrl = $img.data(bp.screen);
          url = !!isUrl ? isUrl : url;
        }
      });

      return url;
    },

    update: function(){
      var plugin = this;
      var counter = 0;

      plugin.$imgs.each(function() {
        var $this = $(this);
        if (plugin.settings.skip_invisible && !$this.is(":visible")) {
          return;
        }
        if ($.abovethetop(this, {container: plugin.elToBind, threshold: plugin.settings.threshold}) ||
          $.leftofbegin(this, {container: plugin.elToBind, threshold: plugin.settings.threshold})) {
            /* Nothing. */
        } else if (!$.belowthefold(this, {container: plugin.elToBind, threshold: plugin.settings.threshold}) &&
          !$.rightoffold(this, {container: plugin.elToBind, threshold: plugin.settings.threshold})) {
            $this.trigger("appear");
            /* if we found an image we'll load, reset the counter */
            counter = 0;
        } else {
          if (++counter > plugin.settings.failure_limit) {
            return false;
          }
        }
      });
    }

  });

  return $;

});

/**
 * @fileoverview

A Gemini plugin to quickly build galleries using a modal and carousel.

### Notes
- The gallery is built using a list of images. See example.

 *
 * @namespace gemini.gallery
 * @copyright Carpages.ca 2014
 * @author Matt Rose <matt@mattrose.ca>
 *
 * @requires gemini
 * @requires gemini.modal
 * @requires gemini.carousel
 * @requires gemini.lazyload
 * @requires gemini.respond
 *
 * @prop {integer} scrollSpeed {@link gemini.carousel#scrollSpeed}
 * @prop {array} screens {@link gemini.carousel#screens}
 * @prop {object} templates {@link gemini.gallery#templates}
 *
 * @example
  <html>
    <ul id="js-gallery">
      <li>
        <a href="http://www.placetim.com/200/200/">
          <img src="http://www.placetim.com/200/200/">
        </a>
      </li>
      <li>
        <a href="http://www.placetim.com/250/250/">
          <img src="http://www.placetim.com/250/250/">
        </a>
      </li>
    </ul>
  </html>
 *
 * @example
  G('#js-gallery').gallery();
 */

define('gemini.gallery',[
  'gemini',
  'gemini.gallery.templates',
  'gemini.modal',
  'gemini.carousel',
  'gemini.lazyload',
  'gemini.respond'
], function($, T){

  var _ = $._;

  $.boiler('gallery', {
    defaults: {
      /**
       * The speed that the carousel scrolls at in milliseconds.
       * @name gemini.carousel#scrollSpeed
       * @type Integer
       * @default 500
       */
      scrollSpeed: 500,

      /**
       * An array of screens to look for in the anchors data attributes to use
       * when lazy loading the images
       * @name gemini.carousel#screens
       * @type Array
       * @default []
       */
      screens: [],

      /**
       * Precompiled Handlebar templates to replace default. Expecting 'gallery'
       * and 'modal'
       * @name gemini.gallery#templates
       * @type object
       * @default {}
       */
      templates: {}
    },

    data: ['title', 'description'],

    init: function(){
      var plugin = this;

      //Extend the templates
      plugin.T = $.extend(T, plugin.settings.templates);

      //Grab images
      plugin.imgs = _.map(plugin.$el.find('> li > a'), function(anchor, i){
        var $anchor = $(anchor);

        $anchor.click(function(e){
          e.preventDefault();
          plugin.open.call(plugin, i+1);
        });

        var screens = [];
        _.each(plugin.settings.screens, function(scn){
          if(!!$anchor.data(scn)) {
            screens.push({
              screen: scn,
              src: $anchor.data(scn)
            });
          }
        });

        return {
          src: $anchor.attr('href'),
          screens: screens
        };
      });

      //Create the modal
      plugin.modal = new $.Modal({
        templates: plugin.T,
        fixed: true,
        stopPropagation: 'img, .js-gallery-nav',
        content: plugin.T.gallery({
          title: plugin.settings.title,
          description: plugin.settings.description,
          imgs: plugin.imgs
        })
      });

      //Activate Carousel
      plugin.$carousel = plugin.modal.$content.find('.js-gallery-carousel');
      plugin.$carousel
        .carousel({scrollSpeed: plugin.settings.scrollSpeed, loop:true})
        .lazyload({
          images:'img.lazy',
          effect:'fadeIn',
          threshold: window.$window.width() * 0.8
        });

      //Key press
      window.$window.on('keydown', function(e){

        if( !plugin.modal.$modal.hasClass('is-active') ) return;

        if(e.keyCode==37){//left

          plugin.$carousel.carousel('previous');

        } else if(e.keyCode==39){//right

          plugin.$carousel.carousel('next');

        } else if(e.keyCode==27){//esc

          plugin.modal.close();

        }
      });

      //Go to next when you click on one of the images
      plugin.$carousel.on('click', 'img', function(){
        plugin.$carousel.carousel('next');
      });

      //Fit images according to the size of the screen
      plugin.$carousel.find('.fit')._fit();

      $.respond.bind('resize', function(e, scrn){
        plugin.$carousel.find('.fit')._fit();
      });

    },

    /**
     * Open the gallery to a specific item
     *
     * @method
     * @name gemini.gallery#open
     * @param {integer} page The page to open up the gallery to
    **/
    open: function(page){
      var plugin = this;

      plugin.modal.open();
      plugin.$carousel
        .carousel('gotoPage', page, false)
        .lazyload('update');
    },

    /**
     * Close the gallery
     *
     * @method
     * @name gemini.gallery#close
    **/
    close: function(){
      this.modal.close();
    }
  });

  // Return the jquery object
  // This way you don't need to require both jquery and the plugin
  return $;

});

/**
 * @fileoverview

A Gemini plugin for tabs.

 *
 * @namespace gemini.tabs
 * @copyright Carpages.ca 2014
 * @author Matt Rose <matt@mattrose.ca>
 *
 * @requires gemini
 * @requires gemini.respond
 *
 * @prop {boolean} hash {@link gemini.tabs#hash}
 * @prop {function} onChange {@link gemini.tabs#onChange}
 * @prop {string} tabState {@link gemini.tabs#tabState}
 * @prop {string} targetState {@link gemini.tabs#targetState}
 * @prop {boolean} responsive {@link gemini.tabs#responsive}
 *
 * @example
  <html>
    <div id="js-tabs">
      <a href="#tab-1">Tab 1</a>
      <a href="#tab-2">Tab 2</a>
    </div>
    <div id="tab-1" class="tab">
      This is Tab 1!
    </div>
    <div id="tab-2" class="tab">
      This is Tab 2!
    </div>
  </html>
 *
 * @example
  G('#js-tabs').tabs();
 */
define('gemini.tabs',['gemini', 'gemini.respond'], function($){

  var _ = $._;

  $.boiler('tabs', {
    defaults: {
      /**
       * Whether to use hash's in the url to control the tab
       *
       * @name gemini.tabs#hash
       * @type boolean
       * @default false
       */
      hash: false,
      /**
       * The callback to run when the tab changes
       *
       * @name gemini.tabs#onChange
       * @type function
       * @default false
       */
      onChange: false,
      /**
       * The state to add to the active tab link
       *
       * @name gemini.tabs#tabState
       * @type string
       * @default 'is-active'
       */
      tabState: 'is-active',
      /**
       * The state to add to the active tab
       *
       * @name gemini.tabs#targetState
       * @type string
       * @default 'is-active'
       */
      targetState: 'is-active',
      /**
       * Whether to change to a select dropdown on small screens
       *
       * *Note:* This adds ``select.select--tab`` to the select container
       *
       * @name gemini.tabs#responsive
       * @type boolean
       * @default false
       */
      responsive: false
    },

    /*
     * This will store all of the tabs
     * {'#target': {
     *  $tab: $Object,
     *  $target: $Object
     * }}
     */
    tabs: {},

    active: '',

    init: function(){
      var plugin = this;

      //Cache anchors
      plugin.$anchors = plugin.$el.find('a');

      //Cache tabs
      plugin.$anchors.each(function(){

        var $this = $(this),
          target = $this.attr('href');

        plugin.tabs[target] = {
          $tab: $this,
          $target: $(target)
        };
      });

      //Initiate responsiveness
      if(plugin.settings.responsive) plugin._responsiveInit();

      //Bind click events
      plugin.$el.on('click', 'a', function(e){
        e.preventDefault();

        var target = $(this).attr('href');
        plugin.open(target);
      });

      //Find the currently active anchor based on markup
      var active = $(
        plugin.$anchors.filter('.' + plugin.settings.tabState)[0] ||
        plugin.$anchors[0]
      ).attr('href');

      //Activate hashed tab
      if(_.has(plugin.tabs, window.location.hash)){
        plugin._deactivate(active);
        active = window.location.hash;
      }

      //Activate the current item and the content
      plugin.open(active);
    },

    /**
     * Builds a select box out of the list of anchors
     *
     * @private
     * @method
     * @name gemini.tabs#_getSelect
     * @return {element} Returns a jQuery element
    **/
    _getSelect: function(){
      var plugin = this;

      var $select = $('<select/>');

      _.each(plugin.tabs, function(tab, target){
        //Create text (remove a11y)
        var text = tab.$tab.clone().find('.a11y').remove().end().text();

        $select.append(
          $('<option />')
            .val(target)
            .text(text)
            .prop('selected', tab.$tab.hasClass(plugin.settings.tabState))
        );
      });

      return $select.wrap('<div class="select select--tab"/>')
                    .parent()
                    .wrap('<div class="w-select--tab"/>')
                    .parent();
    },

    /**
     * Initiates the responsiveness
     *
     * @private
     * @method
     * @name gemini.tabs#_responsiveInit
    **/
    _responsiveInit: function(){
      var plugin = this;

      // Build fallback select
      plugin.$select = plugin._getSelect();

      // Add wrapper
      plugin.$wrapper = plugin.$el.wrap('<span/>').parent();

      // Add select box
      plugin.$wrapper.append(plugin.$select);

      // Add event to change tabs
      plugin.$select.find('select').on('change', function(){
        plugin.open($(this).val());
      });

      var adjustTabs = function(screen){
        if(screen == 'small'){
          plugin.$select.show();
          plugin.$el.hide();
        }else{
          plugin.$el.show();
          plugin.$select.hide();
        }
      };

      // Init
      adjustTabs($.respond.getScreen());

      // Add listener
      $.respond.bind('resize', function(e, screen){
        adjustTabs(screen);
      });
    },

    /**
     * Open a tab
     *
     * @method
     * @name gemini.tabs#open
     * @param {string} target The id of the tab (``#example``)
    **/
    open: function(target){
      var plugin = this;

      if(target!=plugin.active && _.has(plugin.tabs, target)){
        plugin._deactivate(plugin.active);
        plugin._activate(target);
      }
    },

    /**
     * Activate a tab
     *
     * @private
     * @method
     * @name gemini.tabs#_activate
     * @param {string} target The id of the tab
    **/
    _activate: function(target){
      var plugin = this;

      if(_.has(plugin.tabs, target)){
        var tab = plugin.tabs[target];

        tab.$tab.addClass(plugin.settings.tabState);
        tab.$target.addClass(plugin.settings.targetState);
        tab.$target.show();
        plugin.active = target;

        if (plugin.settings.hash) {
          // Ensure that the browser doesn't scroll to the hash
          tab.$target.attr('id', '');
          window.location.hash = target;
          tab.$target.attr('id', target.substring(1));
        }

        if(plugin.settings.responsive) {
          plugin.$select.find('select').val(target);
        }

        if(plugin.settings.onChange) {
          plugin.settings.onChange.call(plugin);
        }
      }
    },

    /**
     * Deactivate a tab
     *
     * @private
     * @method
     * @name gemini.tabs#_deactivate
     * @param {string} target The id of the tab
    **/
    _deactivate: function(target){
      var plugin = this;

      if(_.has(plugin.tabs, target)){
        plugin.tabs[target].$tab.removeClass(plugin.settings.tabState);
        plugin.tabs[target].$target.removeClass(plugin.settings.targetState);
        plugin.tabs[target].$target.hide();
      }
    }
  });

  // Return the jquery object
  // This way you don't need to require both jquery and the plugin
  return $;

});

/**
 * @fileoverview

Helpers to calculate and format various values

 *
 * @namespace gemini.calculator
 * @copyright Carpages.ca 2014
 * @author Matt Rose <matt@mattrose.ca>
 *
 * @requires gemini
 *
 * @prop {boolean} member {@link gemini.calculator#member}
 *
 * @example
  G.calculator.formatPrice(200345.33232);
  //returns $200,345.33
 */
define('gemini.calculator',['gemini'], function(G){

  var _ = G._;

  var module = {};

  /**
   * Get the cost of a monthly loan
   *
   * @method
   * @name gemini.calculator#monthlyFinance
   * @param {float} price The price of the item
   * @param {interger} term The payment term in months
   * @param {float} interest The annual interest percentage
   * @return {float} The monthly loan payments
  **/
  module.monthlyFinance = function(price, term, interest) {
    if (interest <=0) {
      return (price/term);
    } else {
      var monthlyinterest = interest/1200;
      return (price*Math.pow(monthlyinterest+1,term)*monthlyinterest)/(Math.pow(monthlyinterest+1,term) - 1);
    }
  };

  /**
   * Get the cost of a monthly lease
   *
   * @method
   * @name gemini.calculator#monthlyLease
   * @param {float} price The price of the item
   * @param {float} tax The sales tax percentage
   * @param {interger} term The payment term in months
   * @param {float} interest The annual interest percentage
   * @param {float} residual The estimated residual
   * @return {float} The monthly lease payments
  **/
  module.monthlyLease = function(price, tax, term, interest, residual) {

    if (interest < 0) {
      return 0;
    }
    var monthlyInterest = interest / 2400;
    return (((price+residual) * monthlyInterest) + ((price-residual) / term) ) * (1 + tax / 100);

  };

  /**
   * Get the current load balance
   *
   * @method
   * @name gemini.calculator#financeBalance
   * @param {float} price The price of the item
   * @param {float} tradein The price of the tradein
   * @param {float} tax The sales tax percentage
   * @param {float} down The down payment
   * @return {float} The financeBalance
  **/
  module.financeBalance = function(price, tradein, tax, down){
    var r = (price - tradein) * (1 + tax / 100) - down;
    return r;
  };

  /**
   * Get the current lease balance
   *
   * @method
   * @name gemini.calculator#leaseBalance
   * @param {float} price The price of the item
   * @param {float} tradein The price of the tradein
   * @param {float} down The down payment
   * @return {type} Returned item
  **/
  module.leaseBalance = function(price, tradein, down){
    var r = (price - tradein) - down;
    return r;
  };

  module.format = {
    /**
     * Format a value into an integer
     *
     * @method
     * @name gemini.calculator#format.integer
     * @param {string|float|integer} value The value to format
     * @return {integer} The proper integer
    **/
    integer: function(value) {
      var format = this;

      value = parseInt(format.number(value), 10);

      return isNaN(value) ? 0 : value;

    },

    /**
     * Format a value into a calculation friendly number. This includes removing
     * commas and replacing k's for 000's
     *
     * @method
     * @name gemini.calculator#format.number
     * @param {string|float|integer} num The value to format
     * @return {float} The proper number
    **/
    number: function(value) {
      value += "";

      value = value.replace(/,/g, "");
      value = value.replace(/[kK]+/, 'k');
      value = value.replace(/[kK]/, "000");

      return parseFloat(value) || 0;

    },

    /**
     * Format a number to include commas
     *
     * @method
     * @name gemini.calculator#format.commas
     * @param {string|float} num The number to format
     * @return {string} The formatted number
    **/
    commas: function(num) {
      var parts = num.toString().split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return parts.join(".");
    },

    /**
     * Format a number to look like a price
     *
     * @private
     * @method
     * @name gemini.calculator#format.price
     * @param {float} price The price that you want to format
     * @return {string} The formatted price
    **/
    price: function(price) {
      var pre = '$';

      if (price < 0) {
        pre = '-' + pre;
      }
      return pre + module.format.commas(Math.abs(price).toFixed(2));
    }
  };

  G.calculator = module;
  return G.calculator;

});

define('gemini.payments',['gemini', 'gemini.calculator'], function(G){

  /**
   * Add a couple functions to calculator
   * These should really be baked in
   */

  G.boiler('payments', {
    defaults: {
      pre: '#js-calc-',
      finance: {},
      lease: {},
      vehicle: {}
    },

    events: {},

    init: function(){
      var plugin = this;
      var $el = plugin.$el;
      var pre = plugin.settings.pre;

      if (plugin.settings.vehicle) plugin.vehicle = plugin.Vehicle();

      if (plugin.settings.finance) plugin.finance = plugin.Finance();

      if (plugin.settings.lease) plugin.lease = plugin.Lease();

      //Update Events
      $el.submit(function(e){
        e.preventDefault();
        plugin.update();
      });
      $el.find('input[type=text]').change(function(){
        plugin.update();
      });

      //Initiate
      plugin.update();
    },

    Vehicle: function() {
      var plugin = this;
      var $el = plugin.$el;
      var pre = plugin.settings.pre;


      var defaults = {
        price: 0,
        tradein: 0,
        tax: 13
      };

      var vehicle = {
        cache: {
          $price: $el.find(pre + 'price'),
          $tradein: $el.find(pre + 'tradein'),
          $tax: $el.find(pre + 'tax')
        }
      };

      var getValue = function(name) {
        if (plugin.settings.vehicle[name]) {
          return plugin.settings.vehicle[name];
        } else {
          return !!vehicle.cache["$" + name].length ?
                   vehicle.cache["$" + name].val() :
                   defaults[name];
        }
      };

      vehicle.getPrice = function() {
        return G.calculator.format.number(getValue("price"));
      };

      vehicle.getTradein = function() {
        return G.calculator.format.number(getValue("tradein"));
      };

      vehicle.getTax = function() {
        return G.calculator.format.number(getValue("tax"));
      };

      return vehicle;
    },

    Finance: function() {
      var plugin = this;
      var $el = plugin.$el;
      var pre = plugin.settings.pre;

      var defaults = {
        down: 0,
        term: 48,
        rate: 5
      };

      var finance = {
        cache: {
          $down:    $el.find(pre + 'finance-down'),
          $term:    $el.find(pre + 'finance-term'),
          $rate:    $el.find(pre + 'finance-rate'),
          $balance: $el.find(pre + 'finance-balance'),
          $payment: $el.find(pre + 'finance-payment')
        }
      };

      var getValue = function(name) {
        if (plugin.settings.finance[name]) {
          return plugin.settings.finance[name];
        } else {
          return !!finance.cache["$" + name].length ?
                   finance.cache["$" + name].val() :
                   defaults[name];
        }
      };

      finance.getDown = function() {
        return G.calculator.format.number(getValue("down"));
      };

      finance.getTerm = function() {
        return G.calculator.format.integer(getValue("term"));
      };

      finance.getRate = function() {
        return G.calculator.format.number(getValue("rate"));
      };

      finance.update = function() {
        var financeBalance = G.calculator.financeBalance(
          plugin.vehicle.getPrice(),
          plugin.vehicle.getTradein(),
          plugin.vehicle.getTax(),
          finance.getDown()
        );
        var financePayment = G.calculator.monthlyFinance(
          financeBalance,
          finance.getTerm(),
          finance.getRate()
        );

        finance.cache.$balance.html(
          G.calculator.format.price( financeBalance )
        );

        finance.cache.$payment.html(
          G.calculator.format.price( financePayment )
        );
      };

      return finance;
    },

    Lease: function() {
      var plugin = this;
      var $el = plugin.$el;
      var pre = plugin.settings.pre;

      var defaults = {
        down: 0,
        term: 72,
        rate: 5,
        end: 0
      };

      var lease = {
        cache: {
          $down:    $el.find(pre + 'lease-down'),
          $term:    $el.find(pre + 'lease-term'),
          $rate:    $el.find(pre + 'lease-rate'),
          $end:     $el.find(pre + 'lease-end'),
          $balance: $el.find(pre + 'lease-balance'),
          $payment: $el.find(pre + 'lease-payment')
        }
      };

      var getValue = function(name) {
        if (plugin.settings.lease[name]) {
          return plugin.settings.lease[name];
        } else {
          return !!lease.cache["$" + name].length ?
                   lease.cache["$" + name].val() :
                   defaults[name];
        }
      };

      lease.getDown = function() {
        return G.calculator.format.number(getValue("down"));
      };

      lease.getTerm = function() {
        return G.calculator.format.integer(getValue("term"));
      };

      lease.getRate = function() {
        return G.calculator.format.number(getValue("rate"));
      };

      lease.getEnd = function() {
        return G.calculator.format.number(getValue("end"));
      };

      lease.update = function() {
        var leaseBalance = G.calculator.leaseBalance(
          plugin.vehicle.getPrice(),
          plugin.vehicle.getTradein(),
          lease.getDown()
        );

        var leasePayment = G.calculator.monthlyLease(
          leaseBalance,
          plugin.vehicle.getTax(),
          lease.getTerm(),
          lease.getRate(),
          lease.getEnd()
        );

        lease.cache.$balance.html(
          G.calculator.format.price( leaseBalance )
        );

        lease.cache.$payment.html(
          G.calculator.format.price( leasePayment )
        );
      };

      return lease;

    },

    update: function(){
      var plugin = this;

      if (plugin.finance) plugin.finance.update();

      if (plugin.lease) plugin.lease.update();
    }
  });

  // Return the jquery object
  // This way you don't need to require both jquery and the plugin
  return G;

});

/*
 * ------------------------------------
 * INDEX.JS
 * ------------------------------------
 */

require(['gemini', 'gemini.carousel', 'gemini.gallery', 'gemini.tabs', 'gemini.payments', 'templates.custom'], function ($) {

  G('#js-carousel-vehicle').carousel({
    scrollSpeed: 125
  });
  // G('#js-carousel-related').carousel({
  //   scrollSpeed: 125
  // });
  G('#js-gallery').gallery({
    templates: {
      gallery: window.Templates.Custom.gallery
    }
  });
  G('#js-tabs').tabs();
  G('.js-open-tab').click(function(){
    G('#js-tabs').tabs("open", $(this).data('tab'));
  });
  G('#js-calc-form').payments();

});



define("js/pages/vehicle-view", function(){});

