<?php

namespace Drupal\custom_mod;

use Drupal\Console\Bootstrap\Drupal;
use Drupal\Core\Template\TwigExtension;
use Drupal\file\Entity\File;
use Drupal\user\Entity\User;
use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;

/**
 * Class CustomModTwigExtension.
 */
class CustomModTwigExtension extends AbstractExtension {

  /**
   * {@inheritdoc}
   * Let Drupal know the name of your extension
   * must be unique name, string
   */
  public function getName() {
    return 'custom_mod.customModTwigExtension';
  }


  /**
   * {@inheritdoc}
   * Return your custom twig function to Drupal
   */
  public function getFunctions() {
    return [
      new TwigFunction('get_url_param', [$this, 'get_url_param']),
      new TwigFunction('get_current_user_img', [$this, 'get_current_user_img']),
    ];
  }


  /**
   * Returns $_GET query parameter
   *
   * @param string $name
   *   name of the query parameter
   *
   * @return string
   *   value of the query parameter name
   */
  public function get_url_param($name) {
    return \Drupal::request()->query->get($name);
  }

  /**
   * Returns $_GET query parameter
   *
   * @return string
   *   value of the query parameter name
   */
  public function get_current_user_img() {
    $user = User::load(\Drupal::currentUser()->id());
    $user_img = $user->get('user_picture')->getValue();
    if (count($user_img) > 0) {
      $uri = File::load($user_img[0]['target_id'])->getFileUri();
      return  \Drupal::service('file_url_generator')->generateAbsoluteString($uri);
    } else {
      return NULL;
    }
  }

}
