/* ===================================
   Marian Angeles - Main JavaScript
   Author: Marian Angeles
   Version: 1.0
   =================================== */

(function() {
    'use strict';

    // ===================================
    // GA4 EVENT TRACKING SYSTEM
    // Rastreo profesional de eventos de conversión y engagement
    // ===================================
    
    function sendGtagEvent(eventName, params = {}) {
        try {
            if (typeof gtag === 'function') {
                gtag('event', eventName, params);
            } else if (window.dataLayer && Array.isArray(window.dataLayer)) {
                window.dataLayer.push({ event: eventName, ...params });
            }
        } catch (e) {
            console.debug('GA4 event not sent:', eventName);
        }
    }

    // ===================================
    // FACEBOOK PIXEL TRACKING SYSTEM
    // Rastreo complementario para conversiones en Facebook
    // ===================================

    function sendFacebookEvent(eventName, data = {}) {
        try {
            if (typeof fbq === 'function') {
                fbq('track', eventName, data);
            }
        } catch (e) {
            console.debug('Facebook event not sent:', eventName);
        }
    }

    // ===================================
    // TIKTOK PIXEL TRACKING SYSTEM
    // Rastreo complementario para conversiones en TikTok
    // ===================================

    function sendTikTokEvent(eventName, data = {}) {
        try {
            if (typeof ttq === 'object' && ttq.track) {
                ttq.track(eventName, data);
            }
        } catch (e) {
            console.debug('TikTok event not sent:', eventName);
        }
    }

    // ===================================
    // PINTEREST PIXEL TRACKING SYSTEM
    // Rastreo complementario para conversiones en Pinterest
    // ===================================

    function sendPinterestEvent(eventName, data = {}) {
        try {
            if (typeof pintrk === 'function') {
                pintrk('track', eventName, data);
            }
        } catch (e) {
            console.debug('Pinterest event not sent:', eventName);
        }
    }

    // ===================================
    // UNIFIED TRACKING FUNCTION
    // Envía eventos a GA4, Facebook y TikTok simultáneamente
    function sendTrackingEvent(eventType, method, label, value = null) {
        // GA4 parameters
        const gaParams = {
            method: method,
            content_type: 'cta',
            content_id: label,
            page_location: location.pathname
        };
        if (value !== null) gaParams.value = value;

        // Mapeo de eventos para Facebook Pixel
        const facebookEventMap = {
            'generate_lead': {
                name: 'Lead',
                data: {
                    content_name: label,
                    content_type: 'lead'
                }
            },
            'share': {
                name: 'Contact',
                data: {
                    content_name: label,
                    content_type: 'social_engagement'
                }
            },
            'select_content': {
                name: 'FindLocation',
                data: {
                    content_name: label,
                    content_type: 'location'
                }
            }
        };

        // Mapeo de eventos para TikTok Pixel
        const tikTokEventMap = {
            'generate_lead': {
                name: 'Contact',
                data: {
                    content_name: label,
                    content_type: 'lead'
                }
            },
            'share': {
                name: 'Contact',
                data: {
                    content_name: label,
                    content_type: 'social'
                }
            },
            'select_content': {
                name: 'ViewContent',
                data: {
                    content_name: label,
                    content_type: 'location'
                }
            }
        };

        // Mapeo de eventos para Pinterest Pixel
        const pinterestEventMap = {
            'generate_lead': {
                name: 'checkout',
                data: {
                    value: value || 0,
                    currency: 'MXN',
                    content_name: label,
                    content_type: 'product'
                }
            },
            'share': {
                name: 'pin',
                data: {
                    content_name: label,
                    content_type: 'social'
                }
            },
            'select_content': {
                name: 'viewcategory',
                data: {
                    content_name: label,
                    content_type: 'category'
                }
            }
        };

        // Enviar a GA4
        sendGtagEvent(eventType, gaParams);

        // Enviar a Facebook Pixel
        if (facebookEventMap[eventType]) {
            const fbEvent = facebookEventMap[eventType];
            sendFacebookEvent(fbEvent.name, fbEvent.data);
        }

        // Enviar a TikTok Pixel
        if (tikTokEventMap[eventType]) {
            const ttEvent = tikTokEventMap[eventType];
            sendTikTokEvent(ttEvent.name, ttEvent.data);
        }

        // Enviar a Pinterest Pixel
        if (pinterestEventMap[eventType]) {
            const pEvent = pinterestEventMap[eventType];
            sendPinterestEvent(pEvent.name, pEvent.data);
        }
    }

    // ===================================
    // RASTREO DE ELEMENTOS CON DATA-GTAG-*
    // Sistema genérico que funciona para WhatsApp, redes sociales, CTAs, etc.
    // Envía eventos a GA4, Facebook, TikTok y Pinterest simultáneamente
    function initGtagTracking() {
        document.addEventListener('click', function (e) {
            const el = e.target.closest && e.target.closest('[data-gtag-event]');
            if (!el) return;

            const eventName = el.dataset.gtagEvent;
            const method = el.dataset.gtagMethod || 'link';
            const label = el.dataset.gtagLabel || (el.textContent || '').trim().slice(0, 100);
            const value = el.dataset.gtagValue ? Number(el.dataset.gtagValue) : undefined;

            // Enviar evento a GA4 y Facebook Pixel
            sendTrackingEvent(eventName, method, label, value);

            // Para links externos (no _blank), permitir navegación después del evento
            // Si es _blank, el evento se envía y se abre sin esperar
            if (el.href && el.target !== '_blank') {
                e.preventDefault();
                setTimeout(function () {
                    window.location = el.href;
                }, 100);
            }
        }, false);
    }

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
        const isActive = navMenu.classList.toggle('active');
        
        // Update aria-expanded attribute
        navToggle.setAttribute('aria-expanded', isActive);
        
        // Animate hamburger icon
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = isActive 
            ? 'rotate(45deg) translate(5px, 5px)' 
            : 'none';
        spans[1].style.opacity = isActive ? '0' : '1';
        spans[2].style.transform = isActive 
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
                // Use scrollIntoView to avoid forced synchronous layouts
                // and remove the need to read layout properties like offsetTop.
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
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
        
        // Set focus to modal for accessibility
        modal.setAttribute('tabindex', '-1');
        modal.focus();
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
        modal.removeAttribute('tabindex');
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
            fecha: document.getElementById('fecha').value,
            zona: document.getElementById('zona').value,
            personas: document.getElementById('personas').value
        };
        
        // Validate form
        if (!formData.name || !formData.email || !formData.phone || !formData.service || !formData.fecha || !formData.zona || !formData.personas) {
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
        
        // Format date for better display
        const dateFormatted = new Date(formData.fecha).toLocaleDateString('es-MX', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        // Get service name from select option text
        const serviceSelect = document.getElementById('service');
        const serviceName = serviceSelect.options[serviceSelect.selectedIndex].text;
        
        // Get zone name from select option text
        const zonaSelect = document.getElementById('zona');
        const zonaName = zonaSelect.options[zonaSelect.selectedIndex].text;
        
        // Prepare WhatsApp message (plain labels to avoid encoding issues)
        const whatsappText =
            'Hola! Me gustaría agendar un servicio:\n' +
            'Nombre: ' + formData.name + '\n' +
            'Email: ' + formData.email + '\n' +
            'Teléfono: ' + cleanPhone + '\n' +
            'Servicio: ' + serviceName + '\n' +
            'Fecha: ' + dateFormatted + '\n' +
            'Zona: ' + zonaName + '\n' +
            'Personas: ' + formData.personas + '\n\n' +
            'Quedo atenta a tu respuesta. Gracias!';

        const whatsappMessage = encodeURIComponent(whatsappText);
        
        // Show success message
        showNotification('Redirigiendo a WhatsApp...', 'success');
        
        // Send conversion event to Facebook Pixel
        sendFacebookEvent('Lead', {
            content_name: serviceName,
            content_type: 'service_booking',
            value: 100, // estimated value
            currency: 'MXN'
        });
        
        // Redirect to WhatsApp
        setTimeout(() => {
            window.open(`https://wa.me/525661430855?text=${whatsappMessage}`, '_blank', 'noopener,noreferrer');
            contactForm.reset();
        }, 800);
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
        
        // Initialize GA4 and Facebook Pixel event tracking system
        initGtagTracking();
        
        // Track gallery opens for Facebook Pixel
        if (galleryItems && galleryItems.length > 0) {
            galleryItems.forEach((item, index) => {
                item.addEventListener('click', () => {
                    sendFacebookEvent('ViewContent', {
                        content_name: 'gallery_item_' + (index + 1),
                        content_type: 'gallery'
                    });
                });
            });
        }
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
