


/**
 * @file
 * Javascript for the OA sitemap.
 */

(function ($) {

  Drupal.behaviors.oaSitemap = {
    attach: function(context, settings) {

      var topID = settings.oa_sitemap.topID;
      var icons = settings.oa_sitemap.icons;
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

          if ((parentId != -1) && (parentId in spaces)) {
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

      function returnDropDownSelects(active, top) {
        var dropDownSelects = [spaces[top]];
        var index = 0;


        function returnChildren(id, active) {
          var subspaces = spaces[id].subspaces;
          for(var i in subspaces) {
            var spaceID = subspaces[i]
            spaces[spaceID].prefix = Array(spaces[spaceID].depth  + 1 ).join("- ");
            spaces[spaceID].classes = spaceID == active ? 'active' : '';
            dropDownSelects.push(spaces[spaceID]);
            if (spaces[spaceID].subspaces.length > 1) {
              var child = returnChildren(spaces[spaceID].nid, active);
              if (child) {
                return child;
              }
            };
          }
        }
        returnChildren(top, active);
        return dropDownSelects;
      }


      var app = angular.module("oaSitemap", ['ngSanitize']);

      app.controller("oaSitemapController", function($scope, $http) {
        $scope.allSpaces = spaces;
        $scope.spaces = loadSpace(topID);
        $scope.topDropdown = (0 in spaces) ? 0 : topID;
        $scope.dropDownSelects = returnDropDownSelects(topID, $scope.topDropdown);

        $scope.breadcrumbs = loadBreadCrumbs(topID);
        $scope.icons = icons;
        $scope.currentSlide = returnSpacePosition($scope.spaces, topID);

        $scope.exploreSpace = function(spaceID) {
          breadcrumbs = [];
          $scope.breadcrumbs = loadBreadCrumbs(spaceID);
          $scope.spaces = loadSpace(spaceID);
          $scope.currentSlide = returnSpacePosition($scope.spaces, spaceID);
          $scope.dropDownSelects = returnDropDownSelects(topID, $scope.topDropdown);
        };

        $scope.slide = function(slide) {
          $scope.currentSlide = slide;
        }

      });
    }
  }

}(jQuery));
