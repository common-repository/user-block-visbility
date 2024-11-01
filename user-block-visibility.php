<?php

/*
Plugin Name: User Block Visibility
Description: Allows admins to restrict access to blocks by user roles
Author: Nate Conley
Author URI: http://nateconley.com
Version: 0.9
License: GPL2
Text Domain: user-block-visibility
 */

define( 'USER_BLOCK_VISIBILITY_JS', plugin_dir_url( __FILE__ ) . 'dist/js/' );
define( 'USER_BLOCK_VISIBILITY_CSS', plugin_dir_url( __FILE__ ) . 'dist/css/' );
define( 'USER_BLOCK_VISIBILITY_LIB', plugin_dir_path( __FILE__ ) . 'lib/' );
define( 'USER_BLOCK_VISIBILITY_VERSION', '0.9' );

require_once( USER_BLOCK_VISIBILITY_LIB . 'hide.php' );
require_once( USER_BLOCK_VISIBILITY_LIB . 'scripts.php' );
