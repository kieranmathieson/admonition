<?php
/**
 * Created by PhpStorm.
 * User: kieran
 * Date: 8/6/16
 * Time: 10:22 AM
 */

namespace Drupal\admonition\Plugin\CKEditorPlugin;

use Drupal\ckeditor\CKEditorPluginBase;
use Drupal\editor\Entity\Editor;

/**
 * Defines the plugin.
 *
 * @CKEditorPlugin(
 *   id = "admonition",
 *   label = @Translation("Admonition")
 * )
 */
class Admonition extends CKEditorPluginBase {

  /**
   * Returns buttons that this plugin provides in the input format admin area,
   * along with metadata.
   *
   * The metadata is used by the CKEditor module to generate a visual CKEditor
   * toolbar builder UI.
   *
   * @return array
   *   An array of buttons that are provided by this plugin. This will
   *   only be used in the administrative section for assembling the toolbar.
   *   Each button should by keyed by its CKEditor button name, and should
   *   contain an array of button properties, including:
   *   - label: A human-readable, translated button name.
   *   - image: An image for the button to be used in the toolbar.
   *   - image_rtl: If the image needs to have a right-to-left version, specify
   *     an alternative file that will be used in RTL editors.
   *   - image_alternative: If this button does not render as an image, specify
   *     an HTML string representing the contents of this button.
   *   - image_alternative_rtl: Similar to image_alternative, but a
   *     right-to-left version.
   *   - attributes: An array of HTML attributes which should be added to this
   *     button when rendering the button in the administrative section for
   *     assembling the toolbar.
   *   - multiple: Boolean value indicating if this button may be added multiple
   *     times to the toolbar. This typically is only applicable for dividers
   *     and group indicators.
   */
  public function getButtons() {
    return array(
      'admonition' => array(
        'label' => t('Admonition'),
        'image' => drupal_get_path('module', 'admonition')
          . '/js/plugins/admonition/icons/admonition.png',
      ),
    );
  }

  /**
   * Returns the Drupal root-relative file path to the plugin JavaScript file.
   *
   * Note: this does not use a Drupal library because this uses CKEditor's API,
   * see http://docs.cksource.com/ckeditor_api/symbols/CKEDITOR.resourceManager.html#addExternal.
   *
   * @return string|FALSE
   *   The Drupal root-relative path to the file, FALSE if an internal plugin.
   */
  public function getFile() {
    return drupal_get_path('module', 'admonition')
      . '/js/plugins/admonition/plugin.js';
  }

  /**
   * {@inheritdoc}
   */
  public function getConfig(Editor $editor) {
    $path = drupal_get_path('module', 'admonition') . '/templates/admonition-template.html';
    $template = file_get_contents($path);
    if ( $template === FALSE ) {
      $template = $this->t('Failed to read admonition template.');
    }
    return [ 'admonition_template' => $template ];
  }
}