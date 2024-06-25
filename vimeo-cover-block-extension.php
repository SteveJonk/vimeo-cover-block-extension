<?php

/**
 * Plugin Name:       Vimeo Cover Block Extension
 * Description:       A plugin that adds a vimeo link to the cover block. Use a link like (especially the background param is important) 'https://player.vimeo.com/video/[VIMEO ID]?h=032ba40fd1&autoplay=1&loop=1&title=0&byline=0&portrait=0&background=1'
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Steve Jonk
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       vimeo-cover-block-extension
 *
 * @package           SteveJonk
 */

namespace vimeo_cover_block_extension;

if (!defined('ABSPATH')) {
	exit; // Exit if accessed directly.
}

/**
 * Enqueue specific modifications for the block editor.
 *
 * @return void
 */

function enqueue_editor_modifications()
{
	$asset_file = include plugin_dir_path(__FILE__) . 'build/index.asset.php';
	wp_enqueue_script('vimeo-cover-block-extension', plugin_dir_url(__FILE__) . 'build/index.js', $asset_file['dependencies'], $asset_file['version'], true);
}
add_action('enqueue_block_editor_assets', __NAMESPACE__ . '\enqueue_editor_modifications');

function enqueue_styles()
{
	$asset_file = include plugin_dir_path(__FILE__) . 'build/index.asset.php';
	wp_enqueue_style('vimeo-cover-block-extension', plugin_dir_url(__FILE__) . 'build/style-scripts.css', [], $asset_file['version']);
}

add_action('enqueue_block_assets', __NAMESPACE__ . '\enqueue_styles');