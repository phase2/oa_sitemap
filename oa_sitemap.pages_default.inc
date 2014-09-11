<?php
/**
 * @file
 * oa_sitemap.pages_default.inc
 */

/**
 * Implements hook_default_page_manager_pages().
 */
function oa_sitemap_default_page_manager_pages() {
  $page = new stdClass();
  $page->disabled = FALSE; /* Edit this to true to make a default page disabled initially */
  $page->api_version = 1;
  $page->name = 'sitemap';
  $page->task = 'page';
  $page->admin_title = 'SItemap';
  $page->admin_description = '';
  $page->path = 'sitemap/!node';
  $page->access = array();
  $page->menu = array();
  $page->arguments = array(
    'node' => array(
      'id' => 1,
      'identifier' => 'Node: ID',
      'name' => 'entity_id:node',
      'settings' => array(),
    ),
  );
  $page->conf = array(
    'admin_paths' => FALSE,
  );
  $page->default_handlers = array();
  $handler = new stdClass();
  $handler->disabled = FALSE; /* Edit this to true to make a default handler disabled initially */
  $handler->api_version = 1;
  $handler->name = 'page_sitemap_panel_context';
  $handler->task = 'page';
  $handler->subtask = 'sitemap';
  $handler->handler = 'panel_context';
  $handler->weight = 0;
  $handler->conf = array(
    'title' => 'Panel',
    'no_blocks' => 0,
    'pipeline' => 'standard',
    'body_classes_to_remove' => '',
    'body_classes_to_add' => '',
    'css_id' => '',
    'css' => '',
    'contexts' => array(),
    'relationships' => array(),
  );
  $display = new panels_display();
  $display->layout = 'boxton';
  $display->layout_settings = array();
  $display->panel_settings = array(
    'style_settings' => array(
      'default' => NULL,
      'contentmain' => NULL,
    ),
  );
  $display->cache = array();
  $display->title = '';
  $display->uuid = '0d552761-2392-407c-9918-cb953342a696';
  $display->content = array();
  $display->panels = array();
    $pane = new stdClass();
    $pane->pid = 'new-e0a2cb14-ca89-48ac-9bdd-73b4b6fe6222';
    $pane->panel = 'contentmain';
    $pane->type = 'oa_sitemap';
    $pane->subtype = 'oa_sitemap';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array(
      'return' => 'Finish',
      'cancel' => 'Cancel',
      'context' => 'argument_entity_id:node_1',
      'override_title' => 0,
      'override_title_text' => '',
      'form_build_id' => 'form-xh8zo_G4hHry7wKPdaYcfyE7s_CgJzCsV2YuH0qc1FI',
      'form_token' => 'O7ZA79McLp02oU-WMIO5r6irrHNcxJV2aeuW1tsQHrk',
      'form_id' => 'oa_sitemap_settings_form',
      'op' => 'Finish',
      'oa_sitemap_parent' => 1,
    );
    $pane->cache = array();
    $pane->style = array(
      'settings' => NULL,
    );
    $pane->css = array();
    $pane->extras = array();
    $pane->position = 0;
    $pane->locks = array();
    $pane->uuid = 'e0a2cb14-ca89-48ac-9bdd-73b4b6fe6222';
    $display->content['new-e0a2cb14-ca89-48ac-9bdd-73b4b6fe6222'] = $pane;
    $display->panels['contentmain'][0] = 'new-e0a2cb14-ca89-48ac-9bdd-73b4b6fe6222';
  $display->hide_title = PANELS_TITLE_FIXED;
  $display->title_pane = 'new-e0a2cb14-ca89-48ac-9bdd-73b4b6fe6222';
  $handler->conf['display'] = $display;
  $page->default_handlers[$handler->name] = $handler;
  $pages['sitemap'] = $page;

  $page = new stdClass();
  $page->disabled = FALSE; /* Edit this to true to make a default page disabled initially */
  $page->api_version = 1;
  $page->name = 'space_sitemap';
  $page->task = 'page';
  $page->admin_title = 'Space Sitemap';
  $page->admin_description = 'Sitemap of a space';
  $page->path = 'node/%node/map';
  $page->access = array(
    'plugins' => array(
      0 => array(
        'name' => 'node_type',
        'settings' => array(
          'type' => array(
            'oa_space' => 'oa_space',
          ),
        ),
        'context' => 'argument_entity_id:node_1',
        'not' => FALSE,
      ),
      1 => array(
        'name' => 'node_access',
        'settings' => array(
          'type' => 'view',
        ),
        'context' => array(
          0 => 'logged-in-user',
          1 => 'argument_entity_id:node_1',
        ),
        'not' => FALSE,
      ),
    ),
    'logic' => 'and',
  );
  $page->menu = array(
    'type' => 'tab',
    'title' => 'Map',
    'name' => 'navigation',
    'weight' => '0',
    'parent' => array(
      'type' => 'none',
      'title' => '',
      'name' => 'navigation',
      'weight' => '0',
    ),
  );
  $page->arguments = array(
    'node' => array(
      'id' => 1,
      'identifier' => 'Node: ID',
      'name' => 'entity_id:node',
      'settings' => array(),
    ),
  );
  $page->conf = array(
    'admin_paths' => FALSE,
  );
  $page->default_handlers = array();
  $handler = new stdClass();
  $handler->disabled = FALSE; /* Edit this to true to make a default handler disabled initially */
  $handler->api_version = 1;
  $handler->name = 'page_space_sitemap_panel_context';
  $handler->task = 'page';
  $handler->subtask = 'space_sitemap';
  $handler->handler = 'panel_context';
  $handler->weight = 0;
  $handler->conf = array(
    'title' => 'Panel',
    'no_blocks' => 0,
    'pipeline' => 'standard',
    'body_classes_to_remove' => '',
    'body_classes_to_add' => '',
    'css_id' => '',
    'css' => '',
    'contexts' => array(),
    'relationships' => array(),
  );
  $display = new panels_display();
  $display->layout = 'boxton';
  $display->layout_settings = array();
  $display->panel_settings = array(
    'style_settings' => array(
      'default' => NULL,
      'contentmain' => NULL,
    ),
  );
  $display->cache = array();
  $display->title = '';
  $display->uuid = 'e21142c5-1147-4b9b-a6c1-a810a78621c0';
  $display->content = array();
  $display->panels = array();
    $pane = new stdClass();
    $pane->pid = 'new-7d20344c-87f6-4ccf-9b5f-d049ea2f79ac';
    $pane->panel = 'contentmain';
    $pane->type = 'oa_sitemap';
    $pane->subtype = 'oa_sitemap';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array(
      'return' => 'Finish',
      'cancel' => 'Cancel',
      'context' => 'argument_entity_id:node_1',
      'override_title' => 0,
      'override_title_text' => '',
      'form_build_id' => 'form-3EH_ZpaKXtkhiI0rbGUagSlXsdtqnWrkBWHk9xgd-qo',
      'form_token' => 'O7ZA79McLp02oU-WMIO5r6irrHNcxJV2aeuW1tsQHrk',
      'form_id' => 'oa_sitemap_settings_form',
      'op' => 'Finish',
    );
    $pane->cache = array();
    $pane->style = array(
      'settings' => NULL,
    );
    $pane->css = array();
    $pane->extras = array();
    $pane->position = 0;
    $pane->locks = array();
    $pane->uuid = '7d20344c-87f6-4ccf-9b5f-d049ea2f79ac';
    $display->content['new-7d20344c-87f6-4ccf-9b5f-d049ea2f79ac'] = $pane;
    $display->panels['contentmain'][0] = 'new-7d20344c-87f6-4ccf-9b5f-d049ea2f79ac';
  $display->hide_title = PANELS_TITLE_FIXED;
  $display->title_pane = 'new-7d20344c-87f6-4ccf-9b5f-d049ea2f79ac';
  $handler->conf['display'] = $display;
  $page->default_handlers[$handler->name] = $handler;
  $pages['space_sitemap'] = $page;

  return $pages;

}
