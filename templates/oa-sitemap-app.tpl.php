<?php
/**
 * @file
 * Template for Open Atrium sitemap App.
 * $link - link for full sitemap
 * $search - search dropdown list
 * $data - JSON data
 */
?>
<div class="oa-sitemap" ng-cloak ng-app="oaSitemap" ng-controller="oaSitemapController">
  <div class="oa-sitemap-header clearfix">
    <div class="oa-sitemap-search pull-right btn-group">
      <button class="oa-sitemap-search-toggle btn btn-default dropdown-toggle" data-toggle="dropdown" href="#">{{spaces[currentSlide].title}} <span class="caret"></span></button>
      <ul class="dropdown-menu" role="menu">
        <li ng-repeat="dropDownSelect in dropDownSelects">
          <a ng-class="dropDownSelect.classes" class="oa-sitemap-search-link" ng-click="exploreSpace(dropDownSelect.nid)">{{dropDownSelect.prefix}}{{dropDownSelect.title}}</a>
        </li>
      </ul>
    </div>
    <div class="oa-sitemap-full pull-left">
      <?php print $link; ?>
    </div>
  </div>
  <ul class="oa-sitemap-breadcrumbs">
    <li class="oa-sitemap-breadcrumb" ng-repeat="breadcrumb in breadcrumbs.slice().reverse()">
      <a ng-click='exploreSpace(breadcrumb.nid)'>{{breadcrumb.title}}</a>
    </li>
  </ul>
  <div class="oa-carousel-container">
    <div class="oa-space-header">
      <button class="prev" ng-show="spaces[currentSlide - 1]" ng-click="currentSlide = currentSlide -1">{{spaces[currentSlide - 1].title}}</button>
      <div class="dropdown">
        <a class="oa-space-title" data-toggle="dropdown" href="#">{{spaces[currentSlide].title}}</a>
        <ul class="dropdown-menu" role="menu">
          <li ng-repeat="space in spaces"><a ng-click="slide($index)">{{space.title}}</a></li>
        </ul>
      </div>
      <button class="next" ng-show="spaces[currentSlide + 1]" ng-click="currentSlide = currentSlide +1">{{spaces[currentSlide + 1].title}}</button>
    </div>

    <div class="oa-spaces" ng-class="{active: $index == currentSlide}" ng-repeat="space in spaces">

      <section class="oa-sections">
        <div class="oa-section" ng-repeat="section in space.sections">
          <h4 class="oa-section-title">
            <div class="oa-section-icon" ng-bind-html="icons[section.icon_id]"></div>
            <a href="{{section.url}}" class="oa-section-link {{section.class}}">{{section.title}}</a>
          </h4>
        </div>
        <div class="oa-section newsection">
          <h4 class="oa-section-title">
            <div class="oa-section-icon"><i class="icon-plus"></i></div>
            <a href="{{space.new_section.url}}" class="oa-section-link {{space.new_section.class}}" title="{{space.new_section.title}}">{{space.new_section.title}}</a>
          </h4>
        </div>
      </section>

      <section class="oa-subspaces">
        <div class="oa-subspace" ng-repeat="index in space.subspaces">
          <div class="oa-subspace-icons">
            <div ng-repeat="icon in $parent.$parent.allSpaces[index].icons" ng-class="[icon.class, 'oa-subspace-icon-' + icon.position ]">
              <a ng-href="{{icon.url}}">
                <i ng-class="[icon.icon, icon.class]"></i>
              </a>
            </div>
          </div>
          <h4 class="oa-subspace-title">
            <a ng-click='exploreSpace($parent.allSpaces[index].nid)' class="oa-subspace-link">
              <span>{{$parent.allSpaces[index].title}}</span>
            </a>
          </h4>
        </div>
        <div class="oa-subspace oa-new-space">
          <h4 class="oa-subspace-title">
            <a href="{{space.new_space.url}}" class="oa-subspace-link {{space.new_space.class}}" title="{{space.new_space.title}}">
              <span><i class="icon-plus"></i>{{space.new_space.title}}</span>
            </a>
          </h4>
        </div>
      </section>

    </div>
  </div>

</div>
