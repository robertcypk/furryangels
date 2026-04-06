<?php
/**
 * Functions for displaying entry footer
 */

if (!defined('ABSPATH')) {
    exit;
}

if (!function_exists('furryangels_entry_footer')) :
    function furryangels_entry_footer() {
        $categories = get_the_category();
        $tags = get_the_tags();

        if (!empty($categories)) {
            echo '<div class="cat-links">';
            echo '<span>' . esc_html__('Categories:', 'furryangels') . '</span> ';
            echo get_the_category_list(', ');
            echo '</div>';
        }

        if (!empty($tags)) {
            echo '<div class="tags-links">';
            echo '<span>' . esc_html__('Tags:', 'furryangels') . '</span> ';
            echo get_the_tag_list('', ', ');
            echo '</div>';
        }
    }
endif;
