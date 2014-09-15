/**
 * @file
 * Javascript for the OA sitemap.
 */

(function ($) {

  Drupal.behaviors.oaSitemap = {
    attach: function(context, settings) {

      var topID = settings.oa_sitemap.topID;
      var icons = settings.oa_sitemap.icons;
      var data = settings.oa_sitemap.data;

      console.log(icons);
      console.log(data);

    }
  }

}(jQuery));
