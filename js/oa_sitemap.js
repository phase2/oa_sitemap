/**
 * @file
 * Javascript for the OA wizards.
 */

(function ($) {

  Drupal.behaviors.oaSitemap = {
    attach: function(context, settings) {

      // function changeSection(index, state) {
      //   state = (state == open ? "open" : "close" );
      //   $("[data-index='" + index + "']").children('.oa_section_wrapper').attr('data-state', state);
      // }
      // function changeSubspace(index, state) {
      //   state = (state == open ? "open" : "close" );
      //   $("[data-index='" + index + "']").children('.oa_subspace_wrapper').attr('data-state', state);
      // }

      // function changeBoth(index, state) {
      //   changeSection(index, state);
      //   changeSubspace(index, state);
      // }

      // // Open Root Section
      // changeBoth(1, open);


      function applyCarousel (target, newActiveIndex) {
        // remove old carousel
        $('.carousel-inner').removeClass('carousel-inner').children().removeClass('active');
        $('.carousel-prev').remove();
        $('.carousel-next').remove();
        // add new
        $(target).addClass('carousel-inner').children('.oa_space_wrapper').eq(newActiveIndex).addClass('active');
        $("<a/>", {
          href: "#",
          class: "carousel-prev",
          text: "prev",
          click: function(e) {
            e.preventDefault;
            target.carousel("prev");
          }
        }).prependTo(".carousel-inner > .item > h3");
        $("<a/>", {
          href: "#",
          class: "carousel-next",
          text: "next",
          click: function(e) {
            e.preventDefault;
            target.carousel("next");
          }
        }).appendTo(".carousel-inner > .item > h3");
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
