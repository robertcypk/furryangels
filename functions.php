<?php
/**
 * Theme functions and definitions
 */

if (!defined('ABSPATH')) {
    exit;
}

// Theme setup
function furryangels_setup() {
    // Make theme available for translation
    load_theme_textdomain('furryangels', get_template_directory() . '/languages');

    // Add default posts and comments RSS feed links to head
    add_theme_support('automatic-feed-links');

    // Let WordPress manage the document title
    add_theme_support('title-tag');

    // Enable support for Post Thumbnails on posts and pages
    add_theme_support('post-thumbnails');

    // Switch default core markup to output valid HTML5
    add_theme_support('html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
        'style',
        'script',
    ));

    // Add support for custom logo
    add_theme_support('custom-logo', array(
        'height'      => 100,
        'width'       => 400,
        'flex-height' => true,
        'flex-width'  => true,
    ));

    // Register navigation menus
    register_nav_menus(array(
        'menu-1' => esc_html__('Primary Menu', 'furryangels'),
        'menu-2' => esc_html__('Footer Menu', 'furryangels'),
    ));

    // Gutenberg support
    add_theme_support('align-wide');
    add_theme_support('editor-styles');
}
add_action('after_setup_theme', 'furryangels_setup');

// Set up the content width
function furryangels_content_width() {
    $GLOBALS['content_width'] = apply_filters('furryangels_content_width', 1200);
}
add_action('after_setup_theme', 'furryangels_content_width', 0);

// Register widget areas
function furryangels_widgets_init() {
    register_sidebar(array(
        'name'          => esc_html__('Sidebar', 'furryangels'),
        'id'            => 'sidebar-1',
        'description'   => esc_html__('Add widgets here.', 'furryangels'),
        'before_widget' => '<section id="%1$s" class="widget %2$s">',
        'after_widget'  => '</section>',
        'before_title'  => '<h2 class="widget-title">',
        'after_title'   => '</h2>',
    ));

    register_sidebar(array(
        'name'          => esc_html__('Footer', 'furryangels'),
        'id'            => 'footer-1',
        'description'   => esc_html__('Add widgets to the footer.', 'furryangels'),
        'before_widget' => '<div id="%1$s" class="widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h3 class="widget-title">',
        'after_title'   => '</h3>',
    ));
}
add_action('widgets_init', 'furryangels_widgets_init');

// Enqueue scripts and styles
function furryangels_scripts() {
    wp_enqueue_style('furryangels-style', get_stylesheet_uri(), array(), '1.0.0');
    
    wp_enqueue_script('furryangels-navigation', get_template_directory_uri() . '/js/navigation.js', array(), '1.0.0', true);
    
    if (is_singular() && comments_open() && get_option('thread_comments')) {
        wp_enqueue_script('comment-reply');
    }
}
add_action('wp_enqueue_scripts', 'furryangels_scripts');

// Register Gutenberg blocks
function furryangels_register_blocks() {
    wp_register_script(
        'furryangels-hero-banner-block',
        get_template_directory_uri() . '/js/hero-banner-block.js',
        array('wp-blocks', 'wp-element', 'wp-block-editor', 'wp-i18n', 'wp-components'),
        '1.0.0',
        true
    );
    
    wp_register_script(
        'furryangels-services-block',
        get_template_directory_uri() . '/js/services-block.js',
        array('wp-blocks', 'wp-element', 'wp-block-editor', 'wp-i18n'),
        '1.0.0',
        true
    );

    register_block_type('furryangels/hero-banner', array(
        'api_version'   => 2,
        'editor_script' => 'furryangels-hero-banner-block',
    ));

    register_block_type('furryangels/services-section', array(
        'api_version'   => 2,
        'editor_script' => 'furryangels-hero-banner-block',
    ));
    
    register_block_type('furryangels/services-block', array(
        'api_version'   => 2,
        'editor_script' => 'furryangels-services-block',
    ));
}
add_action('init', 'furryangels_register_blocks');

// Custom excerpt length
function furryangels_excerpt_length($length) {
    return 25;
}
add_filter('excerpt_length', 'furryangels_excerpt_length');

// Custom excerpt more
function furryangels_excerpt_more($more) {
    return '...';
}
add_filter('excerpt_more', 'furryangels_excerpt_more');

// Add custom body classes
function furryangels_body_classes($classes) {
    if (is_singular()) {
        $classes[] = 'singular';
    }
    return $classes;
}
add_filter('body_class', 'furryangels_body_classes');

// FurryChat initialization
function furrychat_init() {
    wp_enqueue_style('furrychat-style', get_template_directory_uri() . '/css/chat.css', array(), '1.0.0');
    wp_enqueue_script('furrychat-script', get_template_directory_uri() . '/js/chat.js', array('jquery'), '1.0.0', true);
    wp_localize_script('furrychat-script', 'furrychatData', array(
        'ajaxUrl' => admin_url('admin-ajax.php'),
        'nonce'  => wp_create_nonce('furrychat_nonce'),
    ));
}
add_action('wp_enqueue_scripts', 'furrychat_init');
