/*global jQuery */
/*!
* FitText.js 1.2
*
* Copyright 2011, Dave Rupert http://daverupert.com
* Released under the WTFPL license
* http://sam.zoy.org/wtfpl/
*
* Date: Thu May 05 14:23:00 2011 -0600
*/

(function( $ ){

  $.fn.fitText = function(options ) {

    var settings = $.extend({
         maximum   : 9999,
         minimum   : 1,
         maxFont   : 9999,
         minFont   : 1,
         fontRatio : 35
      }, options),

      resizer = function (el) {
        var $el = $(el),
            elw = $el.width(),
            width = elw > settings.maximum ? settings.maximum : elw < settings.minimum ? settings.minimum : elw,
            fontBase = width / settings.fontRatio,
            fontSize = fontBase > settings.maxFont ? settings.maxFont : fontBase < settings.minFont ? settings.minFont : fontBase;
         $el.css('font-size', fontSize + 'px');
      };

    return this.each(function(){
      // Store the object
      var that = this;
      // Call on resize. Opera debounces their resize by default.
      $(window).on('load resize orientationchange', function(){resizer(that);});
      // Call once to set.
      resizer(this);
    });

  };

  $(window).on('load resize orientationchange', function(){
    $('[data-fit-ratio]').each(function(index){
      $this = $(this);
      $this.fitText({maxFont: $this.attr('data-fit-max-font'), minFont: $this.attr('data-fit-min-font'), fontRatio: $this.attr('data-fit-ratio')});
    });
  });
})( jQuery );

