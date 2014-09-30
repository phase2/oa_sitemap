


/**
 * @file
 * Javascript for the OA sitemap.
 */

(function ($) {

  var app = angular.module("oaSitemap", ['ngSanitize']);

  app.controller("oaSitemapController", function($scope, $timeout, $location, $http) {

    var currentID = 0;
    var topID = 0;
    var allSpaces = {};
    var breadcrumbs = [];


    function loadSpace(id) {
      currentID = id;
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
      allSpaces[id].editorEnabled = false;

      // need to call CTools to get it to re-attach the modal popup behavior
      // to links *after* our space has been updated
      $timeout( function() {
        $location.hash('oa-sitemap-top');
        $scope.$broadcast('oaSitemapRefresh', id);
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
          return parseInt(i);
        }
      }
      return -1;
    }

    function returnDropDownSelects(active, top) {
      var dropDownSelects = [allSpaces[top]];
      var index = 0;

      function returnChildren(id, active, depth) {
        var subspaces = allSpaces[id].subspaces;
        for (var i in subspaces) {
          var spaceID = subspaces[i]
          allSpaces[spaceID].prefix = Array(depth+1).join("- ");
          allSpaces[spaceID].classes = spaceID == active ? 'active' : '';
          dropDownSelects.push(allSpaces[spaceID]);
          if (allSpaces[spaceID].subspaces.length > 1) {
            var child = returnChildren(allSpaces[spaceID].nid, active, depth+1);
            if (child) {
              return child;
            }
          };
        }
      }
      returnChildren(top, active, 1);
      return dropDownSelects;
    }

    $scope.$on('oaSitemapRefresh', function(event, e) {
      Drupal.attachBehaviors(document);
    });

    topID = Drupal.settings.oa_sitemap.topID;
    allSpaces = Drupal.settings.oa_sitemap.spaces;

    $scope.allSpaces = allSpaces;
    $scope.spaces = loadSpace(topID);
    $scope.topDropdown = (0 in allSpaces) ? 0 : topID;
    $scope.dropDownSelects = returnDropDownSelects(topID, $scope.topDropdown);
    $scope.editableTitle = {};

    $scope.breadcrumbs = loadBreadCrumbs(topID);
    $scope.icons = Drupal.settings.oa_sitemap.icons;
    $scope.currentSlide = returnSpacePosition($scope.spaces, topID);

    $scope.exploreSpace = function(spaceID) {
      breadcrumbs = [];
      $scope.breadcrumbs = loadBreadCrumbs(spaceID);
      $scope.spaces = loadSpace(spaceID);
      $scope.currentSlide = returnSpacePosition($scope.spaces, spaceID);
      $scope.dropDownSelects = returnDropDownSelects(topID, $scope.topDropdown);
    };

    $scope.slide = function(slide) {
      $scope.currentSlide = parseInt(slide);
    };

    $scope.spaceClass = function(spaceID) {
      var className = '';
      if (allSpaces[spaceID].status != 0) {
        className = (allSpaces[spaceID].visibility == 0) ? 'oa-icon-green' : 'oa-icon-red';
      }
      return className;
    };

    $scope.newSpaceTitle = function(spaceID) {
      return (allSpaces[spaceID].parent_id >= 0) ? Drupal.t('New Subspace') : Drupal.t('New Space');
    };

    $scope.newSpaceClass = function(spaceID) {
      return 'oa-subspace-link ctools-use-modal ctools-modal-oa-sitemap-space';
    };

    $scope.newSpaceURL = function(spaceID) {
      var url = Drupal.settings.basePath + 'wizard/nojs/add/oa-space';
      if (spaceID > 0) {
        url = url + '?oa_parent_space=' + spaceID;
      }
      return url;
    };

    $scope.newSectionTitle = function(spaceID) {
      return Drupal.t('New Section');
    };

    $scope.newSectionClass = function(spaceID) {
      return 'oa-section-link ctools-use-modal ctools-modal-oa-sitemap-section';
    };

    $scope.newSectionURL = function(spaceID) {
      var url = Drupal.settings.basePath + 'wizard/nojs/add/oa-section';
      if (spaceID > 0) {
        url = url + '?og_group_ref=' + spaceID;
      }
      return url;
    };

    $scope.deleteSubspace = function(space, nid) {
      if (confirm('Are you sure you wish to delete "' + allSpaces[nid].title + '" ?')) {
        //TODO: drupal ajax callback to delete a node
        var index = space.subspaces.indexOf(nid);
        if (index > -1) {
          space.subspaces.splice(index, 1);
        }
        delete allSpaces.nid;
      }
    }

    $scope.enableEditor = function(spaceID) {
      $scope.editableTitle[spaceID] = allSpaces[spaceID].title;
      allSpaces[spaceID].editorEnabled = true;
    };

    $scope.disableEditor = function(spaceID) {
      allSpaces[spaceID].editorEnabled = false;
    };

    $scope.saveTitle = function(spaceID) {
      allSpaces[spaceID].title = $scope.editableTitle[spaceID];
      $scope.disableEditor(spaceID);
    };

    $scope.editSpaceURL = function(spaceID) {
      return allSpaces[spaceID].url_edit + '?destination=' + document.URL;
    }

    $(document).on('oaWizardNew', function(event, node) {
      // respond to event message from submitting oa_wizard form
      switch (node.type) {
        case 'oa_section':
          var parentID = node.og_group_ref.und[0].target_id;
          if (allSpaces[parentID]) {
            allSpaces[parentID].sections.push({
              'title': node.title,
              'url': Drupal.settings.basePath + 'node/' + node.nid,
              'icon_id': node.field_oa_section.und[0].tid
            });
            console.log(node);
            $scope.spaces = loadSpace(currentID);
            $scope.$apply();
          }
          break;
        case 'oa_space':
          console.log(node);
          var parentID = node.oa_parent_space.und[Object.keys(node.oa_parent_space.und)[0]].target_id;
          allSpaces[node.nid] = {
            'nid': node.nid,
            'parent_id': parentID,
            'title': node.title,
            'status': node.status,
            'visibility': node.group_access.und[0].value,
            'admin': allSpaces[parentID].admin,
            'url': Drupal.settings.basePath + 'node/' + node.nid,
            'url_edit': Drupal.settings.basePath + 'node/' + node.nid + '/edit',
            'new_space': allSpaces[parentID].new_space,
            'new_section': allSpaces[parentID].new_section,
            'sections': [],
            'subspaces': []
          };
          allSpaces[parentID].subspaces.push(node.nid);
          console.log(allSpaces[node.nid]);
          $scope.exploreSpace(currentID);
          $scope.$apply();
          break;
      }
    });

  });

  Drupal.behaviors.oaSitemap = {
    attach: function(context, settings) {

    }
  }

}(jQuery));
