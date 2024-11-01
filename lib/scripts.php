<?php

/**
 * Register this plugin's sidebar script
 */
function ubv_register_scripts() {

	wp_register_script(
		'ubv-sidebar-js',
		USER_BLOCK_VISIBILITY_JS . 'block-visibility.js',
		array( 'wp-plugins', 'wp-edit-post', 'wp-element', 'wp-i18n', ),
		USER_BLOCK_VISIBILITY_VERSION,
		true
	);

	wp_register_style(
		'ubv-sidebar-css',
		USER_BLOCK_VISIBILITY_CSS . 'style.css',
		array(),
		USER_BLOCK_VISIBILITY_VERSION,
		'all'
	);

	global $wp_roles;

	/**
	 * Localize user roles to the sidebar script
	 */
	wp_localize_script(
		'ubv-sidebar-js',
		'UBV_USER_ROLE_VISIBILITY',
		array(
			'roles' => $wp_roles->role_names,
		)
	);

}

add_action( 'init', 'ubv_register_scripts' );


/**
 * Enqueue the scripts for the block editor
 */
function ubv_enqueue_block_scripts() {

	wp_enqueue_script( 'ubv-sidebar-js' );
	wp_enqueue_style( 'ubv-sidebar-css' );

}

add_action( 'enqueue_block_editor_assets', 'ubv_enqueue_block_scripts' );
