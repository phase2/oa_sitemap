/**
 * @file
 * Javascript for the OA wizards.
 */

(function ($) {

  Drupal.behaviors.oaSitemap = {
    attach: function(context, settings) {

      var $topID = settings.oa_sitemap.topID;

      function applyCarousel (target, newActiveIndex) {
        var $carouselItems = $(target).children('.oa_space_wrapper');
        // remove old carousel
        $('.carousel-inner').removeClass('carousel-inner').children().removeClass('active');
        $('.carousel-prev').remove();
        $('.carousel-next').remove();
        // add new carousel
        $(target).addClass('carousel-inner');
        $carouselItems.eq(newActiveIndex).addClass('active');

        // Affix navigation
        $.each($carouselItems, function(index, carouselItem) {
          var prevTitle = index > 0 ? $carouselItems.eq(index - 1).children('.oa_space_title').find('span').text() : false;
              nextTitle = $carouselItems.eq(index + 1).children('.oa_space_title').text();
              $currentTitle = $(carouselItem).children('.oa_space_title');


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

        $(target).carousel({
          interval: false
        })
      }

      function makeActive(position) {
        var $newActive = $("[data-index='" + position + "']"),
            $newActiveParent = $newActive.parent("div"),
            $newActiveGroup = $newActiveParent.children();
            newActiveIndex = $newActiveParent.children(".oa_space_wrapper").index($newActive);

        $('.oa_space_wrapper').attr('data-state', 'closed');
        $newActiveGroup.attr('data-state', 'active');
        $newActiveParent.parents(".oa_space_wrapper").attr('data-state', 'breadcrumb');

        applyCarousel($newActiveParent, newActiveIndex);
      }

      $(".oa_space_title a").on("click", function(e) {
        e.preventDefault();
        $this = $(this);
        var index = $this.closest(".oa_space_wrapper").attr('data-index');
        makeActive(index);
      });
      makeActive(1);

    }
  }

}(jQuery));
