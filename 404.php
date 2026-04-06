<?php
/**
 * The template for displaying 404 pages
 */

get_header();
?>

<main id="main" class="site-main">
    <section class="hero" style="min-height: 60vh;">
        <div class="container">
            <h1 style="font-size: 5rem;">404</h1>
            <h2>Oops! Page Not Found</h2>
            <p>The page you're looking for doesn't exist or has been moved.</p>
            <a href="<?php echo esc_url(home_url('/')); ?>" class="btn">Go Back Home</a>
        </div>
    </section>
</main>

<?php get_footer(); ?>
