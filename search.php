<?php
/**
 * The template for displaying search results
 */

get_header();
?>

<main id="main" class="site-main">
    <section class="section section-dark">
        <div class="container">
            <h1 class="section-title">
                <?php
                printf(
                    esc_html__('Search Results for: %s', 'furryangels'),
                    '<span>' . get_search_query() . '</span>'
                );
                ?>
            </h1>

            <?php if (have_posts()) : ?>
                <div class="posts-grid">
                    <?php while (have_posts()) : the_post(); ?>
                        <article id="post-<?php the_ID(); ?>" <?php post_class('post-card'); ?>>
                            <div class="post-thumbnail">
                                <?php if (has_post_thumbnail()) : ?>
                                    <?php the_post_thumbnail(); ?>
                                <?php else : ?>
                                    <span style="font-size: 4rem;">🐕</span>
                                <?php endif; ?>
                            </div>
                            <div class="post-content">
                                <h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
                                <div class="post-meta">
                                    <span><?php echo get_the_date(); ?></span>
                                </div>
                                <?php the_excerpt(); ?>
                                <a href="<?php the_permalink(); ?>" class="btn" style="padding: 10px 25px; font-size: 1rem;">Read More</a>
                            </div>
                        </article>
                    <?php endwhile; ?>
                </div>

                <?php the_posts_pagination(); ?>

            <?php else : ?>
                <p style="text-align: center;">No results found. Try a different search term.</p>
            <?php endif; ?>
        </div>
    </section>
</main>

<?php get_footer(); ?>
