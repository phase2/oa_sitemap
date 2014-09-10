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
  <?php if (!empty($node)): ?>
    <h3 class="oa_space_title"><?php print l($node->title, 'node/' . $node->nid); ?></h3>
  <?php else: ?>
    <h3 class="oa_space_title"><?php print l(t('Home'), '<front>'); ?></h3>
  <?php endif; ?>
  <div class="oa_section_wrapper">
  <?php foreach ($sections as $section): ?>
    <div class="oa_section"><h4 class="oa_section_title"><?php print $section->icon; ?><?php print l($section->title, 'node/' . $section->nid); ?></h4></div>
  <?php endforeach; ?>
  </div>
  <div class="oa_subspace_wrapper">
    <?php foreach ($subspaces as $subspace): ?>
      <?php print $subspace; ?>
    <?php endforeach; ?>
  </div>
</div>
