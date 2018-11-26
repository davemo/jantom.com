/*
 * ------------------------------------
 * FINANCING.JS
 * ------------------------------------
 */

require(['gemini'], function ($) {


  /**
   * ACTIVATOR
   *
   * Activate form sections based on select dropdown values.
   * These are features that could be built into Gemini.Activator one day.
   */

  // True false, eg. "do you have a trade in"
  var Activator = function(settings) {
    return {
      $select: $(settings.select),

      $section: $(settings.section),

      check: function() {
        if (this.$select.val()=='Yes') {
          this.$section.addClass('is-active');
        } else {
          this.$section.removeClass('is-active');
        }

        return this;
      },

      init: function() {
        var that = this;
        this.check();
        this.$select.change(function() {
          that.check();
        });

        return this;
      }
    };
  };

  // Time based, for housing and employment times of less than 2 years
  var ActivatorTime = function(settings) {
    return {
      $number: $(settings.number),

      $section: $(settings.section),

      check: function() {
        if (this.$number.val()<2) {
          this.$section.addClass('is-active');
        } else {
          this.$section.removeClass('is-active');
        }

        return this;
      },

      init: function() {
        var that = this;
        this.check();
        this.$number.change(function() {
          that.check();
        });

        return this;
      }
    };
  };


  // Very specific home ownership questions
  var ActivatorHome = function(settings) {
    return {
      $select: $(settings.select),

      check: function() {
        if (this.$select.val()=='OwnWithMortgage') {
          $('#js-own-section').addClass('is-active');
          $('#js-rent-section').removeClass('is-active');
        }
        if (this.$select.val()=='Rent') {
          $('#js-own-section').removeClass('is-active');
          $('#js-rent-section').addClass('is-active');
        }
        if (this.$select.val()=='OwnFreeClear') {
          $('#js-own-section').removeClass('is-active');
          $('#js-rent-section').removeClass('is-active');
        }
        if (this.$select.val()=='LivesWithParents') {
          $('#js-own-section').removeClass('is-active');
          $('#js-rent-section').removeClass('is-active');
        }

        return this;
      },

      init: function() {
        var that = this;
        this.check();
        this.$select.change(function() {
          that.check();
        });

        return this;
      }
    };
  };

  /**
   * Home Type
   */
  var home = new ActivatorHome({
    select: '#js-address-type-select'
  }).init();


  /**
   * Co-signer
   */
  var cosign = new Activator({
    select: '#js-cosign-select',
    section: '#js-cosign-section'
  }).init();

  /**
   * Trade-in
   */
  var tradein = new Activator({
    select: '#js-tradein-select',
    section: '#js-tradein-section'
  }).init();

  /**
   * Address
   */
  var address = new ActivatorTime({
    number: '#js-address-years',
    section: '#js-prevaddress-section'
  }).init();

  /**
   * Employment
   */
  var employment = new ActivatorTime({
    number: '#js-employment-years',
    section: '#js-prevemployment-section'
  }).init();

});

define("js/pages/financing", function(){});

