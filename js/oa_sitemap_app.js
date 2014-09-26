


/**
 * @file
 * Javascript for the OA sitemap.
 */

(function ($) {

  Drupal.behaviors.oaSitemap = {
    attach: function(context, settings) {

      var topID = settings.oa_sitemap.topID;
      var icons = settings.oa_sitemap.icons;
      var allSpaces = settings.oa_sitemap.spaces;
      var breadcrumbs = [];

      // Respond to CTools detach behaviors event.
      $(document).bind('CToolsDetachBehaviors', function(event, context) {
        //console.log('dialog closed');
        //console.log(event);
        //console.log(context);
      });

      function loadSpace(id) {
        var parentId = allSpaces[id].parent_id;
        var currentSpaces = [];
        var parentSpace = "";

        // if ID has a valid parent space
        if (parentSpace = allSpaces[parentId]) {
          for(var i in parentSpace.subspaces) {
            var childSpace = allSpaces[parentSpace.subspaces[i]];
            currentSpaces.push(childSpace);
          }
        }
        // if ID does not have a valid parent i.e. is top level space
        else {
          currentSpaces.push(allSpaces[id]);
        }

        // need to call CTools to get it to re-attach the modal popup behavior
        // to links *after* our space has been updated
        setTimeout(function() {
          Drupal.behaviors.ZZCToolsModal.attach(document);
        }, 10);

        return currentSpaces;
      }

      function loadBreadCrumbs(id) {
          var parentId = allSpaces[id].parent_id;

          if ((parentId != -1) && (parentId in allSpaces)) {
            breadcrumbs.push(allSpaces[parentId]);
            loadBreadCrumbs(parentId);
          }

          return breadcrumbs;
      }

      function returnSpacePosition (spaces, index) {
        for (var i in spaces) {
          if (spaces[i].nid == index) {
            return i;
          }
        }
      }

      function returnDropDownSelects(active, top) {
        var dropDownSelects = [allSpaces[top]];
        var index = 0;

        function returnChildren(id, active) {
          var subspaces = allSpaces[id].subspaces;
          for (var i in subspaces) {
            var spaceID = subspaces[i]
            allSpaces[spaceID].prefix = Array(allSpaces[spaceID].depth  + 1 ).join("- ");
            allSpaces[spaceID].classes = spaceID == active ? 'active' : '';
            dropDownSelects.push(allSpaces[spaceID]);
            if (allSpaces[spaceID].subspaces.length > 1) {
              var child = returnChildren(allSpaces[spaceID].nid, active);
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
        $scope.allSpaces = allSpaces;
        $scope.spaces = loadSpace(topID);
        $scope.topDropdown = (0 in allSpaces) ? 0 : topID;
        $scope.dropDownSelects = returnDropDownSelects(topID, $scope.topDropdown);

        $scope.breadcrumbs = loadBreadCrumbs(topID);
        $scope.icons = icons;
        $scope.currentSlide = parseInt(returnSpacePosition($scope.spaces, topID));

        $scope.exploreSpace = function(spaceID) {
          breadcrumbs = [];
          $scope.breadcrumbs = loadBreadCrumbs(spaceID);
          $scope.spaces = loadSpace(spaceID);
          $scope.currentSlide = parseInt(returnSpacePosition($scope.spaces, spaceID));
          $scope.dropDownSelects = returnDropDownSelects(topID, $scope.topDropdown);
        };

        $scope.slide = function(slide) {
          $scope.currentSlide = parseInt(slide);
        }

      });
    }
  }

}(jQuery));
