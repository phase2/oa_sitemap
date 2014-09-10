<?php
/**
 * @file oa_sitemap.inc
 */

$plugin = array(
  'title' => t('Site Map'),
  'description' => t('Displays the site map of a space.'),
  'single' => TRUE,
  'category' => array(t('Open Atrium'), -9),
  'edit form' => 'oa_sitemap_settings_form',
  'render callback' => 'oa_sitemap_render',
  'required context' => new ctools_context_optional(t('Node'), 'node'),
);

/**
 * Run-time rendering of the body of the pane.
 *
 * @see ctools_plugin_examples for more advanced info
 */
function oa_sitemap_render($subtype, $conf, $args, $context) {
  $node = NULL;
  if (isset($context->data)) {
    $node = $context->data;
  }
  $space_id = isset($node) ? $node->nid : 0;
  $title = isset($node) ? t('Site Map for @space', array('@space' => $node->title)) : t('Site Map');

  $base = drupal_get_path('module', 'oa_sitemap');
  drupal_add_js($base . '/js/oa_sitemap.js');
  drupal_add_css($base . '/css/oa_sitemap.css');

  ctools_include('modal');
  ctools_modal_add_js();

  drupal_set_title($title);

  $terms = oa_sections_get_icons();
  $icons = array();
  $icons[0] = '<div class="icon-wrapper"><i class="icon-plus"></i></div>';
  foreach ($terms as $id => $term) {
    if (!empty($term->field_icon_class_value)) {
      $icon = '<i class="' . check_plain($term->field_icon_class_value) . '"></i>';
    }
    elseif (!empty($term->field_icon_image_fid)) {
      $file = file_load($term->field_icon_image_fid);
      $content = array(
        'file' => array(
          '#theme' => 'image_style',
          '#style_name' => 'panopoly_thumbnail',
          '#path' => $file->uri,
        ),
      );
      $icon = drupal_render($content);
    }
    else {
      $icon = '<i class="icon-th-large"></i>';
    }
    $icons[$id] = '<div class="icon-wrapper">' . $icon . '</div>';
  }

  $map = oa_sitemap_space_map($space_id, $icons);

  $block = new stdClass();
  $block->title = '';
  $block->content = $map;
  return $block;
}

/**
 * Empty config form
 */
function oa_sitemap_settings_form($form, &$form_state) {
  return $form;
}

/**
 * Saves changes to the widget.
 */
function oa_sitemap_settings_form_submit($form, &$form_state) {
  foreach (array_keys($form_state['values']) as $key) {
    if (isset($form_state['values'][$key])) {
      $form_state['conf'][$key] = $form_state['values'][$key];
    }
  }
}
