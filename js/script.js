/* ===================================
   Marian Angeles - Main JavaScript
   Author: Marian Angeles
   Version: 1.0
   =================================== */

(function() {
    'use strict';

    // ===================================
    // GLOBAL VARIABLES
    // ===================================
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modal = document.getElementById('galleryModal');
    const modalImage = document.getElementById('modalImage');
    const modalClose = document.getElementById('modalClose');
    const modalPrev = document.getElementById('modalPrev');
    const modalNext = document.getElementById('modalNext');
    const contactForm = document.getElementById('contactForm');
    
    let currentImageIndex = 0;
    let galleryImages = [];

    // ===================================
    // NAVBAR SCROLL EFFECT
    // ===================================
    function handleNavbarScroll() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // ===================================
    // MOBILE MENU TOGGLE
    // ===================================
    function toggleMobileMenu() {
        navMenu.classList.toggle('active');
        
        // Animate hamburger icon
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = navMenu.classList.contains('active') 
            ? 'rotate(45deg) translate(5px, 5px)' 
            : 'none';
        spans[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
        spans[2].style.transform = navMenu.classList.contains('active') 
            ? 'rotate(-45deg) translate(7px, -6px)' 
            : 'none';
    }

    // ===================================
    // SMOOTH SCROLL FOR NAVIGATION
    // ===================================
    function smoothScroll(e) {
        const href = this.getAttribute('href');
        
        if (href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navMenu.classList.contains('active')) {
                    toggleMobileMenu();
                }
            }
        }
    }

    // ===================================
    // LAZY LOAD IMAGES
    // ===================================
    function lazyLoadImages() {
        const lazyImages = document.querySelectorAll('img.lazy-load');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');
                    
                    if (src) {
                        img.src = src;
                        img.classList.remove('lazy-load');
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                }
            });
        }, {
            rootMargin: '50px'
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // ===================================
    // GALLERY MODAL
    // ===================================
    function initGallery() {
        // Collect all gallery images
        galleryImages = Array.from(galleryItems).map(item => {
            const img = item.querySelector('img');
            return {
                src: img.getAttribute('data-src') || img.src,
                alt: img.alt
            };
        });

        // Add click event to gallery items
        galleryItems.forEach((item, index) => {
            item.addEventListener('click', () => openModal(index));
        });
    }

    function openModal(index) {
        currentImageIndex = index;
        const imageData = galleryImages[currentImageIndex];
        
        modalImage.src = imageData.src;
        modalImage.alt = imageData.alt;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    function showPreviousImage() {
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        const imageData = galleryImages[currentImageIndex];
        modalImage.src = imageData.src;
        modalImage.alt = imageData.alt;
    }

    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        const imageData = galleryImages[currentImageIndex];
        modalImage.src = imageData.src;
        modalImage.alt = imageData.alt;
    }

    // ===================================
    // SCROLL ANIMATIONS (AOS Alternative)
    // ===================================
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll('[data-aos]');
        
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('aos-animate');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        animatedElements.forEach(element => {
            animationObserver.observe(element);
        });
    }

    // ===================================
    // CONTACT FORM HANDLER
    // ===================================
    function handleFormSubmit(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            service: document.getElementById('service').value,
            message: document.getElementById('message').value
        };
        
        // Validate form
        if (!formData.name || !formData.email || !formData.phone || !formData.service || !formData.message) {
            showNotification('Por favor completa todos los campos', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            showNotification('Por favor ingresa un email válido', 'error');
            return;
        }
        
        // Phone validation
        const phoneRegex = /^[0-9]{10}$/;
        const cleanPhone = formData.phone.replace(/\D/g, '');
        if (!phoneRegex.test(cleanPhone)) {
            showNotification('Por favor ingresa un teléfono válido (10 dígitos)', 'error');
            return;
        }
        
        // Simulate form submission (replace with actual backend API)
        showNotification('Enviando mensaje...', 'info');
        
        setTimeout(() => {
            // Success simulation
            showNotification('¡Mensaje enviado con éxito! Te contactaremos pronto.', 'success');
            contactForm.reset();
            
            // Optional: Send to WhatsApp
            const whatsappMessage = encodeURIComponent(
                `Hola! Mi nombre es ${formData.name}.\n` +
                `Email: ${formData.email}\n` +
                `Teléfono: ${formData.phone}\n` +
                `Servicio: ${formData.service}\n` +
                `Mensaje: ${formData.message}`
            );
            
            // Uncomment to auto-redirect to WhatsApp
            // window.open(`https://wa.me/525661430855?text=${whatsappMessage}`, '_blank');
        }, 1500);
    }

    // ===================================
    // NOTIFICATION SYSTEM
    // ===================================
    function showNotification(message, type = 'info') {
        // Remove existing notification
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 1rem 1.5rem;
            background-color: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
            color: white;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            animation: slideInRight 0.3s ease;
            max-width: 300px;
            font-size: 0.95rem;
        `;
        
        document.body.appendChild(notification);
        
        // Auto-remove after 4 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    }

    // ===================================
    // KEYBOARD NAVIGATION FOR MODAL
    // ===================================
    function handleKeyPress(e) {
        if (!modal.classList.contains('active')) return;
        
        switch(e.key) {
            case 'Escape':
                closeModal();
                break;
            case 'ArrowLeft':
                showPreviousImage();
                break;
            case 'ArrowRight':
                showNextImage();
                break;
        }
    }

    // ===================================
    // SCROLL TO TOP BUTTON (Optional)
    // ===================================
    function createScrollToTop() {
        const scrollBtn = document.createElement('button');
        scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        scrollBtn.className = 'scroll-to-top';
        scrollBtn.setAttribute('aria-label', 'Scroll to top');
        
        scrollBtn.style.cssText = `
            position: fixed;
            bottom: 6rem;
            right: 2rem;
            width: 50px;
            height: 50px;
            background-color: var(--color-gold);
            border: none;
            border-radius: 50%;
            color: white;
            font-size: 1.25rem;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 998;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        `;
        
        document.body.appendChild(scrollBtn);
        
        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                scrollBtn.style.opacity = '1';
                scrollBtn.style.visibility = 'visible';
            } else {
                scrollBtn.style.opacity = '0';
                scrollBtn.style.visibility = 'hidden';
            }
        });
        
        // Scroll to top on click
        scrollBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ===================================
    // ADD ANIMATION STYLES
    // ===================================
    function addAnimationStyles() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(400px);
                    opacity: 0;
                }
            }
            
            .scroll-to-top:hover {
                background-color: var(--color-primary) !important;
                transform: translateY(-3px);
            }
            
            @media (max-width: 768px) {
                .scroll-to-top {
                    bottom: 5rem;
                    right: 1.5rem;
                    width: 45px;
                    height: 45px;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // ===================================
    // INITIALIZE ALL FUNCTIONS
    // ===================================
    function init() {
        // Add animation styles
        addAnimationStyles();
        
        // Navbar scroll effect
        window.addEventListener('scroll', handleNavbarScroll);
        
        // Mobile menu toggle
        if (navToggle) {
            navToggle.addEventListener('click', toggleMobileMenu);
        }
        
        // Smooth scroll for navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', smoothScroll);
        });
        
        // Initialize lazy loading
        lazyLoadImages();
        
        // Initialize gallery
        initGallery();
        
        // Modal controls
        if (modalClose) {
            modalClose.addEventListener('click', closeModal);
        }
        
        if (modalPrev) {
            modalPrev.addEventListener('click', showPreviousImage);
        }
        
        if (modalNext) {
            modalNext.addEventListener('click', showNextImage);
        }
        
        // Close modal on background click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', handleKeyPress);
        
        // Initialize scroll animations
        initScrollAnimations();
        
        // Contact form handler
        if (contactForm) {
            contactForm.addEventListener('submit', handleFormSubmit);
        }
        
        // Create scroll to top button
        createScrollToTop();
        
        // Set initial navbar state
        handleNavbarScroll();
    }

    // ===================================
    // RUN ON DOM READY
    // ===================================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
