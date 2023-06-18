/**
 * @file
 * ThoTrang Web Theme behaviors.
 */
(function (Drupal, $, drupalSettings) {

  'use strict';

  Drupal.behaviors.helloMePage = {
    attach: function (context, settings) {
      if (context !== document) {
        return;
      }
      var svgContainer = document.getElementById('helloPage-lottie');
      var animItem = bodymovin.loadAnimation({
        wrapper: svgContainer,
        animType: 'svg',
        loop: true,
        path: settings.path.baseUrl + 'themes/custom/thotrang_web_theme/lotties/test-lottie.json'
      });
    }
  };

} (Drupal, jQuery, drupalSettings));