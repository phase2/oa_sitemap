


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

      function loadSpace(id) {
        var parentId = spaces[id].parent_id;
        var currentSpaces = [];
        var parentSpace = "";

        // if ID has a valid parent space
        if (parentSpace = spaces[parentId]) {
          for(var i in parentSpace.subspaces) {
            var childSpace = spaces[parentSpace.subspaces[i]];
            currentSpaces.push(childSpace);
          }
        }
        // if ID does not have a valid parent i.e. is top level space
        else {
          currentSpaces.push(spaces[id]);
        }

        return currentSpaces;
      }

      function loadBreadCrumbs(id) {
          var parentId = spaces[id].parent_id;

          if (parentId != -1) {
            breadcrumbs.push(spaces[parentId]);
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

        console.log($scope.spaces);
        $scope.explore = function(index) {
          breadcrumbs = [];
          $scope.breadcrumbs = loadBreadCrumbs(index);
          $scope.spaces = loadSpace(index);
          $scope.currentSlide = returnSpacePosition($scope.spaces, index);
          console.log($scope.spaces);
        };

        $scope.slide = function(slide) {
          $scope.currentSlide = slide;
        }

      });
    }
  }

}(jQuery));
