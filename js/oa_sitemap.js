/**
 * @file
 * Javascript for the OA wizards.
 */

(function ($) {

  Drupal.behaviors.oaSitemap = {
    attach: function(context, settings) {

      var topID = settings.oa_sitemap.topID;

      function applyCarousel (target, newActiveIndex) {
        var $carouselItems = $(target).children('.item');

        // remove old carousel
        $('.carousel-inner').removeClass('carousel-inner').children().removeClass('active');
        $('.carousel-prev').remove();
        $('.carousel-next').remove();
        $('.carousel-jump').remove();
        // add new carousel classes
        $(target).addClass('carousel-inner');
        $carouselItems.eq(newActiveIndex).addClass('active');

        // Affix navigation
        $.each($carouselItems, function(index, carouselItem) {
          var prevTitle = index > 0 ? $carouselItems.eq(index - 1).children('.oa-space-title').find('span').text() : false,
              nextTitle = $carouselItems.eq(index + 1).children('.oa-space-title').text(),
              $currentTitle = $(carouselItem).children('.oa-space-title'),
              $currentLinkWrapper = $currentTitle.children('.oa-space-link'),
              $currentLink = $currentLinkWrapper.children('a').first(),

              $carouselJump = $("<ul/>", {
                                  class: "carousel-jump",
                                  html: ""
                                });

          // if not first element in carousel
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
          // if not last element in carousel
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

          // Build Coursel Jump
          $.each($carouselItems, function(subIndex, subCarouselItem) {
            $jumpItem = $('<li/>', {
                        html: $('<a/>', {
                                href: "#",
                                text: $(subCarouselItem).children('.oa-space-title').find('.oa-space-link').find('span').text(),
                                click: function(e) {
                                  e.preventDefault;
                                  target.carousel(subIndex);
                                }
                              })
                      });
            if (subIndex == index) {
              $jumpItem.addClass('current');
            };
            $jumpItem.appendTo($carouselJump);
          });

          // Attach carousel jump
          if ($carouselItems.length > 1) {
            $currentLinkWrapper.append($carouselJump);
          };



        });
        // END Affix Navigation

        $(target).carousel({
          interval: false
        });

        // change dropdown when carousel advances
        $(target).on('slid.bs.carousel', function() {
          $(".oa-space-link[data-state='open']").attr('data-state', '');
          var activeSlideId = $('.oa-space-wrapper.active').attr('data-id');
          updateDropdown(activeSlideId);
        });

      }

      // set classes to open up sitemap at that level
      function makeActive(position) {
        var $newActive = $("[data-id='" + position + "']"),
            $newActiveParent = $newActive.parent("div"),
            $newActiveGroup = $newActiveParent.children();
            newActiveIndex = $newActiveParent.children(".oa-space-wrapper").index($newActive);

        $(".oa-space-link[data-state='open']").attr('data-state', '');
        $('.oa-space-wrapper').attr('data-state', 'closed');
        $newActiveGroup.attr('data-state', 'active');
        $newActiveParent.parents(".oa-space-wrapper").attr('data-state', 'breadcrumb');

        applyCarousel($newActiveParent, newActiveIndex);
      }
      function updateDropdown(id) {
        $('.oa_sitemap_search .form-select').val(id);
      }

      // oa-space-link click function

      $(".oa-space-link a").on("click", function(e) {
        e.preventDefault();
        $this = $(this);
        if ($this.closest('.oa-subspace-wrapper').hasClass('carousel-inner')) {
          $currentLinkWrapper = $this.closest('.oa-space-link');
          $currentLinkWrapper.attr('data-state', $currentLinkWrapper.attr('data-state') == 'open' ? '' : 'open');
        }
        else {
          var index = $this.closest(".oa-space-wrapper").attr('data-id');
          makeActive(index);
          updateDropdown(index);
        };

      });

      $('.oa_sitemap_search .form-select').change(function() {
        value = $(this).attr('value');
        makeActive(value);
      })


      makeActive(topID);

    }
  }

}(jQuery));
