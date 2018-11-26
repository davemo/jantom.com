define('gemini.carousel.templates',['handlebars'], function(Handlebars) {

this["JST"] = this["JST"] || {};

this["JST"]["nav"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<ol class=\"carousel__nav pagination pagination--carousel\">\n\n   <li class=\"pagination__prev\"><a href=\"#\" data-goto=\"--\">Previous</a></li>\n\n <li class=\"pagination__item\">\n   <span class=\"carousel__current-page-count\">1</span>\n   /\n   <span class=\"carousel__page-count\">";
  if (helper = helpers.pageCount) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.pageCount); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span>\n  </li>\n\n <li class=\"pagination__next\"><a href=\"#\" data-goto=\"++\">Next</a></li>\n\n</ol>\n";
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

/*
 * ------------------------------------
 * INDEX.JS
 * ------------------------------------
 */

require(['gemini', 'gemini.carousel'], function ($) {
  G('#js-carousel').carousel({
    scrollSpeed: 125
  });

});

define("js/pages/index", function(){});

