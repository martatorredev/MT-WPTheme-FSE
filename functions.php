<?php
if ( ! function_exists( 'mtdev_theme_support' ) ) {
	function mtdev_theme_support() {
		// Add support for Post thumbnails.
		add_theme_support( 'post-thumbnails' );
		// Add support for responsive embedded content.
		add_theme_support( 'responsive-embeds' );
		// Add support for Block Styles.
		add_theme_support( 'wp-block-styles' );

		// Add support for Editor Styles.
		add_theme_support( 'editor-styles' );
		// Enqueue Editor Styles.
		add_editor_style( 'style-editor.css' );

		// Enable media library infinite scrolling.
		add_filter( 'media_library_infinite_scrolling', '__return_true' );
	}
	add_action( 'after_setup_theme', 'mtdev_theme_support' );

	// Disable Block Directory: https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/filters/editor-filters.md#block-directory
	// remove_action( 'enqueue_block_editor_assets', 'wp_enqueue_editor_block_directory_assets' );
	// remove_action( 'enqueue_block_editor_assets', 'gutenberg_enqueue_block_editor_assets_block_directory' );
}

if ( ! function_exists( 'mtdev_load_scripts' ) ) {
	/**
	 * Enqueue CSS Stylesheets and Javascript files.
	 *
	 * @return void
	 */
	function mtdev_load_scripts() {
		$theme_version = wp_get_theme()->get( 'Version' );

		// 1. Styles.
		wp_enqueue_style( 'style', get_stylesheet_uri(), array(), $theme_version );
		wp_enqueue_style( 'main', get_theme_file_uri( 'assets/dist/main.css' ), array(), $theme_version, 'all' ); // main.scss: Compiled custom styles.

		// 2. Scripts.
		wp_enqueue_script( 'mainjs', get_theme_file_uri( 'assets/dist/main.bundle.js' ), array(), $theme_version, true );
	}
	add_action( 'wp_enqueue_scripts', 'mtdev_load_scripts' );
}

if ( ! function_exists( 'mtdev_load_editor_scripts' ) ) {
	/**
	 * Enqueue CSS Stylesheets and Javascript files for the editor.
	 *
	 * @return void
	 */
	function mtdev_load_editor_scripts() {
		$theme_version = wp_get_theme()->get( 'Version' );

		wp_enqueue_style( 'editor', get_theme_file_uri( 'assets/dist/editor.css' ), array(), $theme_version, 'all' );
	}

	add_action( 'enqueue_block_editor_assets', 'mtdev_load_editor_scripts' );
}

function mtdev_comments( $fields ) {
	// Remove fields
	unset( $fields['url'] );
	unset( $fields['cookies'] );

	return $fields;
}
	
add_filter( 'comment_form_fields', 'mtdev_comments');

function mtdev_add_template_class($classes) {
	$template = get_page_template_slug();

	if ($template) {
		$class = preg_replace('/\.php$/', '', $template);
		$classes .= ' page-template-' . sanitize_html_class($class);
	}
	return $classes;
}

add_filter('admin_body_class', 'mtdev_add_template_class');
