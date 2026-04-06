<?php
/**
 * The main template file
 */

if (!defined('ABSPATH')) {
    exit;
}

get_header();

$front_page_content = '';

if (is_front_page() && have_posts()) {
    the_post();
    $front_page_content = trim(get_the_content());
    rewind_posts();
}
?>

<main id="main" class="site-main">
    <?php if (is_front_page()) : ?>

    <section class="hero">
        <div class="container">
            <h1><?php bloginfo('name'); ?></h1>
            <p><?php bloginfo('description'); ?></p>
            <a href="#services" class="btn"><?php esc_html_e('Our Services', 'furryangels'); ?></a>
        </div>
    </section>

    <?php if (!empty($front_page_content)) : ?>
        <?php
        while (have_posts()) :
            the_post();
            the_content();
        endwhile;
        rewind_posts();
        ?>
    <?php else : ?>
    <?php echo do_blocks('<!-- wp:furryangels/services-section /-->'); ?>
    <?php endif; ?>

    <section class="section section-gray">
        <div class="container">
            <div class="about-content">
                <div class="about-text">
                    <h2><?php esc_html_e('About Furry Angels', 'furryangels'); ?></h2>
                    <p><?php esc_html_e('Welcome to Furry Angels, your trusted partner in pet care. We are passionate about providing the best care for your furry friends. Our team of experienced professionals is dedicated to ensuring your pets live happy, healthy lives.', 'furryangels'); ?></p>
                    <p><?php esc_html_e('From routine check-ups to specialized treatments, we offer comprehensive veterinary services. Our grooming services will keep your pets looking adorable, while our training programs help build the bond between you and your pet.', 'furryangels'); ?></p>
                    <p><?php esc_html_e('We believe every pet deserves love, care, and attention. That is why we go above and beyond to create a warm and welcoming environment for all our furry visitors.', 'furryangels'); ?></p>
                </div>
                <div class="about-image">
                    <img src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=500" alt="<?php esc_attr_e('Happy dog', 'furryangels'); ?>">
                </div>
            </div>
        </div>
    </section>

    <section class="section section-dark">
        <div class="container">
            <h2 class="section-title"><?php esc_html_e('Pet Care Tips', 'furryangels'); ?></h2>
            <div class="services-grid">
                <div class="service-card">
                    <h3><?php esc_html_e('Regular Exercise', 'furryangels'); ?></h3>
                    <p><?php esc_html_e('Keep your dog active with daily walks and playtime. Different breeds have different exercise needs.', 'furryangels'); ?></p>
                </div>
                <div class="service-card">
                    <h3><?php esc_html_e('Balanced Diet', 'furryangels'); ?></h3>
                    <p><?php esc_html_e('Feed your pet high-quality food appropriate for their age, size, and health condition.', 'furryangels'); ?></p>
                </div>
                <div class="service-card">
                    <h3><?php esc_html_e('Regular Vet Visits', 'furryangels'); ?></h3>
                    <p><?php esc_html_e('Schedule annual check-ups to catch any health issues early and keep vaccinations up to date.', 'furryangels'); ?></p>
                </div>
                <div class="service-card">
                    <h3><?php esc_html_e('Dental Care', 'furryangels'); ?></h3>
                    <p><?php esc_html_e('Dental health is crucial. Brush teeth regularly and provide dental treats.', 'furryangels'); ?></p>
                </div>
            </div>
        </div>
    </section>

    <?php endif; ?>

    <section id="blog" class="section section-gray">
        <div class="container">
            <h2 class="section-title"><?php esc_html_e('Latest Articles', 'furryangels'); ?></h2>
            <?php
            $latest_posts = new WP_Query(array(
                'post_type'           => 'post',
                'post_status'         => 'publish',
                'posts_per_page'      => 6,
                'ignore_sticky_posts' => true,
            ));
            ?>
            <?php if ($latest_posts->have_posts()) : ?>
                <div class="posts-grid">
                    <?php while ($latest_posts->have_posts()) : $latest_posts->the_post(); ?>
                        <article id="post-<?php the_ID(); ?>" <?php post_class('post-card'); ?>>
                            <div class="post-thumbnail">
                                <?php if (has_post_thumbnail()) : ?>
                                    <?php the_post_thumbnail(); ?>
                                <?php else : ?>
                                    <span style="font-size: 4rem;">Dog</span>
                                <?php endif; ?>
                            </div>
                            <div class="post-content">
                                <h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
                                <div class="post-meta">
                                    <span><?php echo esc_html(get_the_date()); ?></span> |
                                    <span><?php the_author(); ?></span>
                                </div>
                                <?php the_excerpt(); ?>
                                <a href="<?php the_permalink(); ?>" class="btn" style="padding: 10px 25px; font-size: 1rem;"><?php esc_html_e('Read More', 'furryangels'); ?></a>
                            </div>
                        </article>
                    <?php endwhile; ?>
                    <?php wp_reset_postdata(); ?>
                </div>
            <?php else : ?>
                <p style="text-align: center;"><?php esc_html_e('No posts found. Start writing your first article!', 'furryangels'); ?></p>
            <?php endif; ?>
        </div>
    </section>

    <section id="contact" class="section section-dark">
        <div class="container">
            <h2 class="section-title"><?php esc_html_e('Contact Us', 'furryangels'); ?></h2>
            <div class="contact-form">
                <form action="#" method="post">
                    <div class="form-group">
                        <label for="name"><?php esc_html_e('Your Name', 'furryangels'); ?></label>
                        <input type="text" id="name" name="name" required>
                    </div>
                    <div class="form-group">
                        <label for="email"><?php esc_html_e('Your Email', 'furryangels'); ?></label>
                        <input type="email" id="email" name="email" required>
                    </div>
                    <div class="form-group">
                        <label for="message"><?php esc_html_e('Your Message', 'furryangels'); ?></label>
                        <textarea id="message" name="message" required></textarea>
                    </div>
                    <button type="submit" class="btn" style="width: 100%; border-color: var(--magenta); background: var(--magenta); color: var(--white);"><?php esc_html_e('Send Message', 'furryangels'); ?></button>
                </form>
            </div>
        </div>
    </section>
</main>

<?php get_footer(); ?>
