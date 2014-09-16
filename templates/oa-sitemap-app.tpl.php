<?php
/**
 * @file
 * Template for Open Atrium sitemap App.
 * $link - link for full sitemap
 * $search - search dropdown list
 * $data - JSON data
 */
?>
<div class="oa-sitemap" ng-app="oaSitemap" ng-controller="oaSitemapController">
  <div class="oa-sitemap-header clearfix">
    <div class="oa-sitemap-search pull-right"><?php print $search; ?></div>
    <div class="oa-sitemap-full pull-left"><?php print $link; ?></div>
  </div>
  <ul class="oa-breadcrumbs" ng-repeat="breadcrumb in breadcrumbs">
    <li class="oa-breadcrumb"><a href="{{breadcrumb.link}}">{{breadcrumb.title}}</a></li>
  </ul>
  <carousel>
    <slide class="oa-spaces" ng-repeat="space in spaces">

      <h2 class="oa-space-title">{{space.title}}</h2>

      <section class="oa-sections">
        <div class="oa-section" ng-repeat="section in space.sections">
          <h3 class="oa-section-title"><a href="{{section.url}}" class="oa-section-link">{{section.title}}</a></h3>
        </div>
      </section>

      <section class="oa-subspaces">
        <div class="oa-subspace" ng-repeat="subspace in space.subspaces">
          <h3 class="oa-subspace-title"><a ng-click='explore(subspace.index)' class="oa-subspace-link">{{subspace.title}}</a></h3>
        </div>
      </section>

    </slide>
  </carousel>

</div>
