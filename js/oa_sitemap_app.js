


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

        for(var i in spaces) {
          if (spaces[i].parent_id == parentId && spaces[i].nid != 0) {
            var tempSpace = spaces[i];
            var tempArray = [];
            for(var t in spaces) {
              if (spaces[t].parent_id == spaces[i].nid) {
                tempArray.push(spaces[t]);
              }
            }
            spaces[i].subspaces = tempArray;
            currentSpaces.push(tempSpace);
          };
        }
        return currentSpaces;
      }

      function loadBreadCrumbs(id) {
          var parentId = spaces[id].parent_id;
          var breadcrumb = spaces[parentId];

          if (spaces[parentId].nid != 0) {
            breadcrumbs.push(breadcrumb);
            loadBreadCrumbs(parentId);
          }

          return breadcrumbs;
      }



      var app = angular.module("oaSitemap", ['ui.bootstrap','ngSanitize']);

      app.controller("oaSitemapController", function($scope, $http) {
        $scope.spaces = loadSpace(613);
        $scope.breadcrumbs = loadBreadCrumbs(613);
        $scope.icons = icons;
        $scope.explore = function(index) {
          breadcrumbs = [];
          $scope.breadcrumbs = loadBreadCrumbs(index);
          $scope.spaces = loadSpace(index);
        };
        console.log(breadcrumbs);
        console.log(spaces);
      });


       console.log(icons);


    }
  }

}(jQuery));
