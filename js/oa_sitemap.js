/**
 * @file
 * Javascript for the OA wizards.
 */

(function ($) {

  Drupal.behaviors.oaSitemap = {
    attach: function(context, settings) {

      var topID = settings.oa_sitemap.topID;

      function applyCarousel (target, newActiveIndex) {
        var $carouselItems = $(target).children('.oa-space-wrapper');
        // remove old carousel
        $('.carousel-inner').removeClass('carousel-inner').children().removeClass('active');
        $('.carousel-prev').remove();
        $('.carousel-next').remove();
        // add new carousel
        $(target).addClass('carousel-inner');
        $carouselItems.eq(newActiveIndex).addClass('active');

        // Affix navigation
        $.each($carouselItems, function(index, carouselItem) {
          var prevTitle = index > 0 ? $carouselItems.eq(index - 1).children('.oa-space-title').find('span').text() : false;
              nextTitle = $carouselItems.eq(index + 1).children('.oa-space-title').text();
              $currentTitle = $(carouselItem).children('.oa-space-title');


          if (prevTitle) {
            $("<a/>", {
              href: "#",
              class: "carousel-prev",
              text: prevTitle,
              click: function(e) {
                e.preventDefault;
                target.carousel("prev");
              }
            }).prependTo($currentTitle);
          };

          if (nextTitle) {
            $("<a/>", {
              href: "#",
              class: "carousel-next",
              text: nextTitle,
              click: function(e) {
                e.preventDefault;
                target.carousel("next");
              }
            }).prependTo($currentTitle);
          };

        });
        console.log(topID);

        $(target).carousel({
          interval: false
        })
      }

      // set classes to open up sitemap at that level
      function makeActive(position) {
        var $newActive = $("[data-id='" + position + "']"),
            $newActiveParent = $newActive.parent("div"),
            $newActiveGroup = $newActiveParent.children();
            newActiveIndex = $newActiveParent.children(".oa-space-wrapper").index($newActive);

        $('.oa-space-wrapper').attr('data-state', 'closed');
        $newActiveGroup.attr('data-state', 'active');
        $newActiveParent.parents(".oa-space-wrapper").attr('data-state', 'breadcrumb');

        applyCarousel($newActiveParent, newActiveIndex);
      }

      $(".oa-space-link a").on("click", function(e) {
        e.preventDefault();
        $this = $(this);
        var index = $this.closest(".oa-space-wrapper").attr('data-id');
        makeActive(index);
      });

      $('.oa_sitemap_search form-select').change(function() {
        console.log("hi");
      })


      makeActive(topID);

    }
  }

}(jQuery));
