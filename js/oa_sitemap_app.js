


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
      var spaces = settings.oa_sitemap.spaces;
      var breadcrumbs = [];

      console.log(topID);
      console.log(spaces);

      function loadSpace(id) {
        var parentId = spaces[id].parent_id;
        var currentSpaces = [];
        var parentSpace = "";
        if (parentSpace = spaces[parentId]) {
          for(var i in parentSpace.subspaces) {
            var childSpaceId = parentSpace.subspaces[i];
            currentSpaces.push(spaces[childSpaceId]);
          }
        }
        else {
          currentSpaces.push(spaces[id]);
        }

        return currentSpaces;
      }

      function loadBreadCrumbs(id) {
          var parentId = spaces[id].parent_id;
          var breadcrumb = spaces[parentId];

          if (spaces[id].nid != 0) {
            breadcrumbs.push(breadcrumb);
            loadBreadCrumbs(parentId);
          }

          return breadcrumbs;
      }

      function returnSpacePosition (spaces, index) {
        for(var i in spaces) {
          if (spaces[i].nid == index) {
            return i;
          }
        }
      }


      var app = angular.module("oaSitemap", ['ngSanitize']);

      app.controller("oaSitemapController", function($scope, $http) {
        $scope.allSpaces = spaces;
        $scope.spaces = loadSpace(topID);
        $scope.breadcrumbs = loadBreadCrumbs(topID);
        $scope.icons = icons;
        $scope.currentSlide = 0;

        $scope.explore = function(index) {
          breadcrumbs = [];
          $scope.breadcrumbs = loadBreadCrumbs(index);
          $scope.spaces = loadSpace(index);
          $scope.currentSlide = returnSpacePosition($scope.spaces, index);
        };

        $scope.slide = function(slide) {
          $scope.currentSlide = slide;
        }

      });
    }
  }

}(jQuery));
