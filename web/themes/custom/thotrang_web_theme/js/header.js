(function (Drupal, $) {

    'use strict';

    Drupal.behaviors.thotrangHeader = {
        attach: function (context, settings) {

            $('#block-thotrang-web-theme-account-menu .menu-account .half').mouseout(function () {
                console.log('out');
            });

        }
    };

} (Drupal, jQuery));