<?php

/**
 * Do not print a block's content if a user role is restricted
 */
function ubv_hide_block( $block_content, $block ) {

	if ( ! isset( $block['attrs']['ubvUserRestriction'] ) ) {
		return $block_content;
	}

	foreach ( $block['attrs']['ubvUserRestriction'] as $user ) {

		if ( 'ubv-not-logged-in' === $user && ! is_user_logged_in() ) {
			return;
		}

		if ( 'ubv-logged-in' === $user && is_user_logged_in() ) {
			return;
		}

		if ( current_user_can( $user ) ) {
			return;
		}
	}

	return $block_content;

}

add_filter( 'render_block', 'ubv_hide_block', 10, 2 );
