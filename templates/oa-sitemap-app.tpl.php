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
  <ul class="oa-sitemap-breadcrumbs">
    <li class="oa-sitemap-breadcrumb" ng-repeat="breadcrumb in breadcrumbs.slice().reverse()"><a ng-click='explore(breadcrumb.nid)'>{{breadcrumb.title}}</a></li>
  </ul>

  <h3 class="oa-space-title">
    <button ng-show="spaces[currentSlide - 1]" ng-click="currentSlide = currentSlide -1">{{spaces[currentSlide - 1].title}}</button>
    {{spaces[currentSlide].title}} - {{currentSlide}}
    <button ng-show="spaces[currentSlide + 1]" ng-click="currentSlide = currentSlide +1">{{spaces[currentSlide + 1].title}}</button>
  </h3>
  <div class="oa-spaces" ng-class="{active: $index == currentSlide}" ng-repeat="space in spaces">
    <section class="oa-sections">
      <div class="oa-section" ng-repeat="section in space.sections">
        <h4 class="oa-section-title"><div class="oa-section-icon" ng-bind-html="icons[section.icon_id]"></div><a href="{{section.url}}" class="oa-section-link {{section.class}}">{{section.title}}</a></h4>
      </div>
    </section>

    <section class="oa-subspaces">
      <div class="oa-subspace" ng-repeat="subspace in space.subspaces">
        <h4 class="oa-subspace-title"><a ng-click='explore(subspace.nid)' class="oa-subspace-link"><span>{{subspace.title}}</span></a></h4>
      </div>
    </section>

  </div>

</div>
