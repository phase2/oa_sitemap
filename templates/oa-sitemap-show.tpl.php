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
<div <?php print !empty($class) ? 'class = "' . $class . '"' : ''; ?> data-depth="<?php print $depth; ?>" data-index="<?php print $index; ?>" data-id="<?php print $nid; ?>">
  <h3 <?php print !empty($title_class) ? 'class = "' . $title_class . '"' : ''; ?>>
    <?php if (!empty($icon)): ?><div class="oa-icon-wrapper"><?php print $icon; ?></div><?php endif; ?>
    <div class="oa-space-link"><?php print $link; ?></div>
    <div class="oa-icon-footer">
      <?php if (!empty($head_icon)): ?><div class="oa-icon-left"><?php print $head_icon; ?></div><?php endif; ?>
      <?php if (!empty($gear_icon)): ?><div class="oa-icon-middle"><?php print $gear_icon; ?></div><?php endif; ?>
      <?php if (!empty($view_icon)): ?><div class="oa-icon-right"><?php print $view_icon; ?></div><?php endif; ?>
    </div>
  </h3>
  <div class="oa-section-wrapper">
  <?php foreach ($sections as $section): ?>
    <div <?php print !empty($section['class']) ? 'class = "' . $section['class'] . '"' : ''; ?>>
      <h4 <?php print !empty($section['title_class']) ? 'class = "' . $section['title_class'] . '"' : ''; ?>>
        <?php if (!empty($section['icon'])): ?><div class="oa-icon-wrapper"><?php print $section['icon']; ?></div><?php endif; ?>
        <?php print $section['link']; ?>
      </h4>
    </div>
  <?php endforeach; ?>
  </div>
  <div class="oa-subspace-wrapper">
    <?php foreach ($subspaces as $subspace): ?>
      <?php print $subspace; ?>
    <?php endforeach; ?>
  </div>
</div>
