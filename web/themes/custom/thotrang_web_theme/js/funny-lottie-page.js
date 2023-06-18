/**
 * @file
 * ThoTrang Web Theme behaviors.
 */
(function (Drupal, $, drupalSettings) {

  'use strict';


  var isTyping = false;

  function loadLottie(elementId, lottieURL) {
    var svgContainer = document.getElementById(elementId);
    $(svgContainer).empty();
    var animItem = bodymovin.loadAnimation({
      wrapper: svgContainer,
      animType: 'svg',
      loop: true,
      path: lottieURL
    });
  }

  function loadDescription(elementId, description) {
    var container = document.getElementById(elementId);
    $(container).empty();
    isTyping = true;
    $('#next-btn').css('opacity', '0.6');
    var part,
      offset = 0,
      speed = 70;
    var typing = setInterval(function () {
      part = description.substr(0, offset);
      console.log(part);
      offset++;
      if (part === description) {
        isTyping = false;
        $('#next-btn').css('opacity', '1');
        clearInterval(typing);
      }
      $('#' + elementId).text(part);
    }, speed);
  }

  function shuffle(array) {
    return array.sort(() => Math.random() - 0.5)
  }

  Drupal.behaviors.funnyLottiePage = {
    attach: function (context, settings) {
      if (context !== document) {
        return;
      }
      loadLottie('funnyPage-lottie', settings.path.baseUrl + 'themes/custom/thotrang_web_theme/lotties/pgql-elephant-loading.json')
      $.ajax({
        url: window.location.origin + '/load-funny',
        type: 'GET',
        success: function (data) {
          const loadedItems = shuffle(data);
          const length = data.length;
          loadLottie('funnyPage-lottie', loadedItems[0].field_lottie_json[0].url);
          loadDescription('lottie-description', loadedItems[0].field_lottie_text[0].value);
          loadLottie('next-btn', settings.path.baseUrl + 'themes/custom/thotrang_web_theme/lotties/next-button.json')
          var i = 0;
          $('#next-btn').click(function () {
            if (!isTyping) {
              i++;
              if (i <= length - 1) {
                loadLottie('funnyPage-lottie', loadedItems[i].field_lottie_json[0].url);
                loadDescription('lottie-description', loadedItems[i].field_lottie_text[0].value);
              }
              if (i === length - 1) {
                $(this).css('opacity', '0.6');
                $(this).css('cursor', 'default');
              }
              if (i > length - 1) {
                loadLottie('funnyPage-lottie', settings.path.baseUrl + 'themes/custom/thotrang_web_theme/lotties/robot-says-hi.json');
                loadLottie('next-btn', settings.path.baseUrl + 'themes/custom/thotrang_web_theme/lotties/homeicon.json')
                loadDescription('lottie-description', 'Hết rồi, bye bye');
                $(this).click(function () {
                  window.location = window.location.origin
                })
              }
            }
          })

        },
      })
    }
  };

} (Drupal, jQuery, drupalSettings));