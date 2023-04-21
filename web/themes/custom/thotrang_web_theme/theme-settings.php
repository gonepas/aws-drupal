<?php

/**
 * @file
 * Theme settings form for ThoTrang Web Theme theme.
 */

/**
 * Implements hook_form_system_theme_settings_alter().
 */
function thotrang_web_theme_form_system_theme_settings_alter(&$form, &$form_state) {

  $form['thotrang_web_theme'] = [
    '#type' => 'details',
    '#title' => t('ThoTrang Web Theme'),
    '#open' => TRUE,
  ];

  $form['thotrang_web_theme']['font_size'] = [
    '#type' => 'number',
    '#title' => t('Font size'),
    '#min' => 12,
    '#max' => 18,
    '#default_value' => theme_get_setting('font_size'),
  ];

}
