


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

      function searchObj( obj , id ){

          for( var i = 0; i < obj.subspaces.length; i++ ) {
            if (obj.subspaces[i].index == id) {
              return obj.subspaces[i].subspaces;
            }
            if (obj.subspaces[i].subspaces.length > 1) {
              return searchObj(obj.subspaces[i], id);
            };
          }
      }


      var app = angular.module("oaSitemap", ['ui.bootstrap']);

      app.controller("oaSitemapController", function($scope, $http) {
        $scope.spaces = data.subspaces;
        $scope.breadcrumbs = [
        {'title': 'North',
         'link' : '/sitemap_app/2'},
        {'title': 'North West',
         'link' : '/sitemap_app/3'}
         ];
        $scope.explore = function(index) {

          $scope.spaces = searchObj(data,index);

        };
        console.log(data);
      });



      // console.log(icons);


    }
  }

}(jQuery));
