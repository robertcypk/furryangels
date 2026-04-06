/**
 * JavaScript functionality
 */

(function() {
    'use strict';

    // Smooth scrolling for anchor links
    document.addEventListener('DOMContentLoaded', function() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(function(link) {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                if (href !== '#') {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });
    });

    // Mobile menu toggle
    var menuToggle = document.getElementById('menu-toggle');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            var nav = document.getElementById('site-navigation');
            nav.classList.toggle('toggled');
        });
    }

    // Add active class to current menu item
    var currentLocation = location.href;
    var menuItems = document.querySelectorAll('.main-navigation a');
    
    menuItems.forEach(function(menuItem) {
        if (menuItem.href === currentLocation) {
            menuItem.classList.add('current');
        }
    });

    // Form validation
    var forms = document.querySelectorAll('.contact-form form');
    
    forms.forEach(function(form) {
        form.addEventListener('submit', function(e) {
            var inputs = form.querySelectorAll('input[required], textarea[required]');
            var isValid = true;
            
            inputs.forEach(function(input) {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#ff0000';
                } else {
                    input.style.borderColor = '';
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                alert('Please fill in all required fields.');
            }
        });
    });

    // Scroll effect for header
    var header = document.querySelector('.site-header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

})();
