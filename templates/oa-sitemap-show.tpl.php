<?php
/**
 * @file
 * Default template for Open Atrium sitemap.
 * This template is used for one row of the sitemap
 * $node - space node
 * $index - index id of this row
 * $depth - depth of this row within the sitemap
 * $children - subspaces
 * $sections - sections
 */
?>
<div class="oa_space_wrapper" data-depth="<?php print $depth; ?>" data-index="<?php print $index; ?>">
  <h3><?php print $node->title; ?></h3>
  <div class="oa_section_wrapper">
  <?php foreach ($sections as $section): ?>
    <div class="oa_section"><h4><?php print $section->icon; ?><?php print $section->title; ?></h4></div>
  <?php endforeach; ?>
  </div>
  <div class="oa_subspace_wrapper">
    <?php foreach ($children as $subspace): ?>
    <div class="oa_subspace"><h4><?php print $subspace->title; ?></h4></div>
    <?php endforeach; ?>
  </div>
</div>
