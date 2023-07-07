<?php
if ( ! function_exists( 'mt_theme_support' ) ) {
	function mt_theme_support() {
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
	}
	add_action( 'after_setup_theme', 'mt_theme_support' );

	// Disable Block Directory: https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/filters/editor-filters.md#block-directory
	// remove_action( 'enqueue_block_editor_assets', 'wp_enqueue_editor_block_directory_assets' );
	// remove_action( 'enqueue_block_editor_assets', 'gutenberg_enqueue_block_editor_assets_block_directory' );
}

if ( ! function_exists( 'mt_load_scripts' ) ) {
	/**
	 * Enqueue CSS Stylesheets and Javascript files.
	 *
	 * @return void
	 */
	function mt_load_scripts() {
		$theme_version = wp_get_theme()->get( 'Version' );

		// 1. Styles.
		wp_enqueue_style( 'style', get_stylesheet_uri(), array(), $theme_version );
		wp_enqueue_style( 'main', get_theme_file_uri( 'assets/dist/main.css' ), array(), $theme_version, 'all' ); // main.scss: Compiled custom styles.

		// 2. Scripts.
		wp_enqueue_script( 'mainjs', get_theme_file_uri( 'assets/dist/main.bundle.js' ), array(), $theme_version, true );
	}
	add_action( 'wp_enqueue_scripts', 'mt_load_scripts' );
}
