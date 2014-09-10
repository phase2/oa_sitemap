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
<div <?php print !empty($class) ? 'class = "' . $class . '"' : ''; ?> data-depth="<?php print $depth; ?>" data-index="<?php print $index; ?>">
  <h3 <?php print !empty($title_class) ? 'class = "' . $title_class . '"' : ''; ?>><?php print !empty($icon) ? $icon : ''; ?><?php print $link; ?></h3>
  <div class="oa_section_wrapper">
  <?php foreach ($sections as $section): ?>
    <div <?php print !empty($section['class']) ? 'class = "' . $section['class'] . '"' : ''; ?>>
      <h4 <?php print !empty($section['title_class']) ? 'class = "' . $section['title_class'] . '"' : ''; ?>><?php print !empty($section['icon']) ? $section['icon'] : ''; ?><?php print $section['link']; ?></h4>
    </div>
  <?php endforeach; ?>
  </div>
  <div class="oa_subspace_wrapper">
    <?php foreach ($subspaces as $subspace): ?>
      <?php print $subspace; ?>
    <?php endforeach; ?>
  </div>
</div>
