<?php
/**
 * The template for displaying the footer
 */

if (!defined('ABSPATH')) {
    exit;
}
?>
</div>

<footer id="colophon" class="site-footer">
    <div class="container">
        <div class="widget-area">
            <aside class="widget">
                <h3>About Us</h3>
                <p>Furry Angels provides comprehensive pet care services. Your pet's health and happiness are our top priority.</p>
            </aside>
            <aside class="widget">
                <h3>Quick Links</h3>
                <ul>
                    <li><a href="#home">Home</a></li>
                    <li><a href="#services">Services</a></li>
                    <li><a href="#blog">Blog</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
            </aside>
            <aside class="widget">
                <h3>Contact Info</h3>
                <ul>
                    <li>📍 123 Pet Street, Dog City</li>
                    <li>📞 (555) 123-4567</li>
                    <li>✉️ info@furryangels.com</li>
                </ul>
            </aside>
        </div>
        
        <div class="footer-bottom">
            <p>&copy; <?php echo date('Y'); ?> <?php bloginfo('name'); ?>. All rights reserved.</p>
            <p>Made with ❤️ for our furry friends</p>
        </div>
    </div>
</footer>

<?php wp_footer(); ?>
</body>
</html>
