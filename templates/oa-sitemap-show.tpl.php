<?php
/**
 * @file
 * Default template for Open Atrium sitemap.
 * This template is used for one row of the sitemap
 * $node - space node
 * $index - index id of this row
 * $depth - depth of this row within the sitemap
 * $subspaces - subspaces
 * $sections - sections
 */
?>
<div class="oa_space_wrapper" data-depth="<?php print $depth; ?>" data-index="<?php print $index; ?>">
  <h3 <?php print !empty($class) ? 'class = "' . $class . '"' : ''; ?>><?php print !empty($icon) ? $icon : ''; ?><?php print $link; ?></h3>
  <div class="oa_section_wrapper">
  <?php foreach ($sections as $section): ?>
    <div class="oa_section"><h4 class="oa_section_title"><?php print !empty($section['icon']) ? $section['icon'] : ''; ?><?php print $section['link']; ?></h4></div>
  <?php endforeach; ?>
  </div>
  <div class="oa_subspace_wrapper">
    <?php foreach ($subspaces as $subspace): ?>
      <?php print $subspace; ?>
    <?php endforeach; ?>
  </div>
</div>
