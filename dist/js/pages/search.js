/**
 * @fileoverview

A jQuery plugin to build accordion's. The plugin works mostly with CSS,
meaning the markup is quite manipulatable.

### Notes
- Requires an include to ``accordion.scss`` in your Gemini build

### Features
- You can activate an accordion on load by adding the CSS class ``is-active``
- You can make something an accordion *only on small devices* using the class
``accordion--small``

 *
 * @namespace gemini.accordion
 * @copyright Carpages.ca 2014
 * @author Matt Rose <matt@mattrose.ca>
 *
 * @requires gemini
 *
 * @prop {string} anchor {@link gemini.accordion#anchor}
 *
 * @example
  <html>
    <!-- Normal Accordion -->
    <div class="js-accordion accordion">
      <h6 class="accordion__title">Click Here</h6>
      <div class="accordion__content">
        The content inside of the accordion.
      </div>
    </div>

    <!-- Active Accordion -->
    <div class="js-accordion accordion is-active">
      <h6 class="accordion__title">Click Here</h6>
      <div class="accordion__content">
        The content inside of the accordion.
      </div>
    </div>

    <!-- Only accordion on small devices -->
    <div class="js-accordion accordion accordion--small">
      <h6 class="accordion__title">Click Here</h6>
      <div class="accordion__content">
        The content inside of the accordion.
      </div>
    </div>
  </html>
 *
 * @example
  $('.js-accordion').accordion();
 */
define('gemini.accordion',['gemini'], function($){
  $.boiler('accordion', {
    defaults: {
      /**
       * The selector that works as an anchor to open and close the accordion
       *
       * @name gemini.accordion#anchor
       * @type string
       * @default '.accordion__title'
       */
      anchor: '.accordion__title'
    },

    init: function(){
      var plugin = this;

      //event
      var $anchor = plugin.$el.find(plugin.settings.anchor);

      $anchor.on('click', function(e){
        e.preventDefault();
        plugin.toggle.call(plugin);
      });
    },

    /**
     * Toggle the opened or closed state of the accordion
     *
     * @method
     * @name gemini.accordion#toggle
    **/
    toggle: function(e){
      var plugin = this;

      if(!plugin.$el.hasClass('is-inactive')){
        plugin.$el.toggleClass('is-active');
      }
    }
  });

  // Return the jquery object
  // This way you don't need to require both jquery and the plugin
  return $;

});

/**
 * @fileoverview

A Gemini plugin to reset forms to their default values.

### Notes
- The plugin uses ``data-reset`` attributes to find default values

### Features
- Here's a feature

 *
 * @namespace gemini.resetform
 * @copyright Carpages.ca 2014
 * @author Matt Rose <matt@mattrose.ca>
 *
 * @requires gemini
 *
 * @example
  <html>
    <form id="js-form" action="#">
      <select name="make" data-reset="dodge">
        <option value="dodge" selected>Dodge</option>
        <option value="ford">Ford</option>
      </select>

      <label>
        <input type="radio" value="auto" name="transmission" data-reset="this" checked>
        Automatic
      </label>
      <label>
        <input type="radio" value="manual" name="transmission">
        Manual
      </label>

      <label>
        <input type="checkbox" value="bluetooth" name="features" data-reset="this" checked>
        Bluetooth
      </label>
      <label>
        <input type="checkbox" value="air" name="features">
        Air-conditioning
      </label>

      <button data-reset="trigger">
        Reset
      </button>
    </form>
  </html>
 *
 * @example
  G('#js-hook').resetform();
 */
define('gemini.resetform',['gemini'], function($){

  $.boiler('resetform', {

    init: function(){
      var plugin = this;

      //Bind reset form
      plugin.$el.bind('reset', function(){
        plugin.reset();
      });

      //Bind click event
      plugin.$el.find('[data-reset="trigger"]').click(function(e){
        e.preventDefault();
        plugin.$el.trigger('reset');
      });
    },

    /**
     * Reset the form to its defaults
     *
     * @method
     * @name gemini.resetform#reset
    **/
    reset: function(){
      var plugin = this;

      //Select boxes
      plugin.selectReset();

      //Checkboxes
      plugin.checkboxReset();

      //Radio Buttons
      plugin.radioReset();
    },

    /**
     * Reset all of the select dropdowns
     *
     * @method
     * @name gemini.resetform#seletReset
    **/
    selectReset: function(){
      var plugin = this;

      var $select = plugin.$el.find('select[data-reset]');

      $select.each(function(){
        var $this = $(this),
            $toSelect = $this.find('[value=' + $this.data('reset') + ']');

        if ($toSelect.length <= 0) $toSelect = $this.find('option:first');

        //Deselect
        $this.find('option:selected').prop('selected', false);
        //Select
        $toSelect.prop('selected', true);
      });
    },

    /**
     * Reset all of the checkboxes
     *
     * @method
     * @name gemini.resetform#checkboxReset
    **/
    checkboxReset: function(){
      var plugin = this;

      var $checkbox = plugin.$el.find('[type="checkbox"]');

      // Uncheck them all
      $checkbox.prop('checked', false);

      // Check the default items
      $checkbox.filter('[data-reset="this"]').prop('checked', true);
    },

    /**
     * Reset all of the radio buttons
     *
     * @method
     * @name gemini.resetform#radioReset
    **/
    radioReset: function(){
      var plugin = this;

      var $radio = plugin.$el.find('[type="radio"]');

      // Uncheck them all
      $radio.prop('checked', false);

      // Check the default items
      $radio.filter('[data-reset="this"]').prop('checked', true);
    }
  });

  // Return the jquery object
  // This way you don't need to require both jquery and the plugin
  return $;

});

/*
 * ------------------------------------
 * SEARCH.JS
 * ------------------------------------
 */

require(['gemini', 'gemini.popdrop', 'gemini.accordion', 'gemini.resetform'], function (G) {

  G('#model_name').popdrop({
    url: '/_lookup/models/',
    bind: '#make_name',
    mapping: function(data) {
      return G._.map(data.data, function(option) {
        return {
          value: option.id,
          display: option.name + ' (' + option.amount + ')'
        };
      });
    },
    reset: true
  });
  G('.js-accordion').accordion();

   G('#js-filters-form').resetform();

  /**
   * SORT BY FILTER
   * -----------------
   * Update filters when Sort By Select is changed
   */
  var $sortSelect = $('#js-sort-select');
  var $filtersForm = $('#js-filters-form');

  // Grab the hidden sort and direction input to the form
  var $sortInput = $('#js-sort-input');
  var $directionInput = $('#js-direction-input');

  // Update input and submit form onChange
  $sortSelect.change(function(){
    $sortInput.val($sortSelect.find(":selected").data('sort'));
    $directionInput.val($sortSelect.find(":selected").data('direction'));
    $filtersForm.submit();
  });
});

define("js/pages/search", function(){});

