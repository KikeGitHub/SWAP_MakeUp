/* =====================================================================
   Marian Angeles — PRO Experience Engine
   Revelados al scroll, cortinas, parallax, contadores, filtros de galería.
   Independiente de script.min.js: NO toca GA4, píxeles ni WhatsApp.
   ===================================================================== */
(function () {
    'use strict';

    var doc = document.documentElement;
    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var hasIO = 'IntersectionObserver' in window;

    function $all(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }

    function track(eventName, params) {
        try {
            if (typeof window.gtag === 'function') {
                params = params || {};
                params.page_location = location.pathname;
                window.gtag('event', eventName, params);
            }
        } catch (e) { /* no-op */ }
    }

    // -----------------------------------------------------------------
    // 1. Intro (cortina de apertura) — solo la primera vez por sesión
    // -----------------------------------------------------------------
    function initIntro() {
        var intro = document.querySelector('.pro-intro');
        if (!intro) return;
        if (doc.classList.contains('pro-intro-seen') || reduceMotion) {
            intro.parentNode.removeChild(intro);
            return;
        }
        try { sessionStorage.setItem('ma_intro_seen', '1'); } catch (e) { /* no-op */ }
        setTimeout(function () {
            if (intro.parentNode) intro.parentNode.removeChild(intro);
        }, 2000);
    }

    // -----------------------------------------------------------------
    // 2. Slideshow del arco del hero
    // -----------------------------------------------------------------
    function initHeroSlides() {
        var slides = $all('.hero-arch__slide');
        if (slides.length < 2 || reduceMotion) return;

        function loadRest() {
            slides.forEach(function (s) {
                var img = s.querySelector('img[data-src]');
                if (img) {
                    img.src = img.getAttribute('data-src');
                    img.removeAttribute('data-src');
                }
            });
        }

        if (document.readyState === 'complete') loadRest();
        else window.addEventListener('load', loadRest);

        var i = 0;
        setInterval(function () {
            if (document.hidden) return;
            var next = (i + 1) % slides.length;
            var nextImg = slides[next].querySelector('img');
            if (!nextImg || !nextImg.complete || !nextImg.naturalWidth) return;
            slides[i].classList.remove('is-active');
            slides[next].classList.add('is-active');
            // reiniciar Ken Burns
            nextImg.style.animation = 'none';
            void nextImg.offsetWidth;
            nextImg.style.animation = '';
            i = next;
        }, 5200);
    }

    // -----------------------------------------------------------------
    // 3. Barra de progreso + progreso del hero + parallax (1 solo rAF)
    // -----------------------------------------------------------------
    function initScrollFx() {
        var bar = document.createElement('div');
        bar.className = 'pro-progress';
        bar.setAttribute('aria-hidden', 'true');
        document.body.appendChild(bar);

        var hero = document.querySelector('.hero--pro');
        var parallax = reduceMotion ? [] : $all('[data-parallax]');
        var ticking = false;

        function update() {
            ticking = false;
            var y = window.pageYOffset || doc.scrollTop;
            var vh = window.innerHeight;
            var max = doc.scrollHeight - vh;
            bar.style.setProperty('--progress', max > 0 ? (y / max).toFixed(4) : 0);

            if (hero && !reduceMotion) {
                var h = hero.offsetHeight || vh;
                var p = Math.min(Math.max(y / h, 0), 1);
                hero.style.setProperty('--hero-p', p.toFixed(3));
            }

            for (var k = 0; k < parallax.length; k++) {
                var el = parallax[k];
                var r = el.getBoundingClientRect();
                if (r.bottom < -150 || r.top > vh + 150) continue;
                var speed = parseFloat(el.getAttribute('data-parallax')) || 0.08;
                var offset = (r.top + r.height / 2 - vh / 2) * -speed;
                el.style.setProperty('--py', offset.toFixed(1) + 'px');
            }
        }

        function onScroll() {
            if (!ticking) {
                ticking = true;
                window.requestAnimationFrame(update);
            }
        }

        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll, { passive: true });
        update();
    }

    // -----------------------------------------------------------------
    // 4. Títulos con revelado palabra por palabra
    // -----------------------------------------------------------------
    function splitTitles() {
        $all('.section-title').forEach(function (title) {
            if (title.children.length || title.closest('.hero')) return;
            var text = title.textContent.trim().replace(/\s+/g, ' ');
            if (!text) return;
            var words = text.split(' ');
            title.textContent = '';
            words.forEach(function (w, idx) {
                var outer = document.createElement('span');
                outer.className = 'pro-word';
                var inner = document.createElement('span');
                inner.style.setProperty('--i', idx);
                inner.textContent = w;
                outer.appendChild(inner);
                title.appendChild(outer);
                if (idx < words.length - 1) title.appendChild(document.createTextNode(' '));
            });
            title.classList.add('pro-split');
        });
    }

    // -----------------------------------------------------------------
    // 5. Sistema de revelado por sección (efectos distintos en cada una)
    // -----------------------------------------------------------------
    var REVEALS = [
        // [selector, efecto, paso de retraso (ms), módulo para escalonar]
        ['.about-image', 'wipe-up', 0, 1],
        ['.about-content > *', 'fade-up', 90, 8],
        ['.about-stats .stat-item', 'flip-up', 130, 3],
        ['.about-wrapper > div[style]', 'fade-up', 0, 1],

        ['.bridal-experience .section-header > *', 'fade-up', 110, 3],
        ['.bridal-step', 'rise', 170, 3],
        ['.bridal-cta', 'fade-up', 0, 1],

        ['.seo-content h2', 'fade-up', 0, 1],
        ['.seo-content p', 'slide-from-left', 120, 5],

        ['.video-spotlight-media', 'tilt-rise', 0, 1],
        ['.video-spotlight-content > *', 'fade-up', 100, 6],

        ['.gallery .section-header > *', 'fade-up', 100, 3],
        ['.gallery-filters', 'fade-up', 0, 1],
        ['.gallery-item', 'zoom-blur', 80, 4],

        ['.services .section-header > *', 'fade-up', 100, 3],
        ['.service-card', 'flip-up', 140, 4],

        ['.faq-section .section-header > *', 'fade-up', 100, 3],
        ['.faq-item', 'alternate', 70, 7],

        ['.contact .section-header > *', 'fade-up', 100, 3],
        ['.contact-info', 'slide-from-left', 0, 1],
        ['.contact-form', 'slide-from-right', 150, 1],

        ['.map-section .section-header > *', 'fade-up', 100, 3],
        ['.map-wrapper', 'wipe-right', 0, 1],

        ['.service-areas-header > *', 'fade-up', 100, 4],
        ['.service-area-card', 'rise', 90, 3],

        ['.footer-content > *', 'fade-up', 110, 4]
    ];

    var CLIP_EFFECTS = { 'wipe-up': 1, 'wipe-right': 1 };

    function initReveals() {
        if (!hasIO || reduceMotion) return;

        var assigned = [];

        REVEALS.forEach(function (cfg) {
            $all(cfg[0]).forEach(function (el, idx) {
                if (el.classList.contains('pro-reveal') || el.classList.contains('section-title')) return;
                var effect = cfg[1];
                if (effect === 'alternate') effect = idx % 2 ? 'slide-from-right' : 'slide-from-left';

                // Desactiva la animación AOS previa para evitar dobles efectos
                el.removeAttribute('data-aos');
                var anc = el.parentElement && el.parentElement.closest('[data-aos]');
                if (anc) anc.removeAttribute('data-aos');

                el.classList.add('pro-reveal');
                el.setAttribute('data-reveal', effect);
                el.style.setProperty('--d', ((idx % cfg[3]) * cfg[2]) + 'ms');
                assigned.push(el);
            });
        });

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                var el = entry.target;
                observer.unobserve(el);
                el.classList.add('is-in');

                // Limpieza: devuelve el elemento a sus estilos/hover originales
                var effect = el.getAttribute('data-reveal');
                if (!effect) return;
                var delay = parseInt(el.style.getPropertyValue('--d'), 10) || 0;
                setTimeout(function () {
                    el.classList.remove('pro-reveal', 'is-in');
                    el.removeAttribute('data-reveal');
                    el.style.removeProperty('--d');
                }, delay + (CLIP_EFFECTS[effect] ? 1500 : 1300));
            });
        }, { threshold: 0, rootMargin: '0px 0px -12% 0px' });

        assigned.forEach(function (el) { observer.observe(el); });

        // Títulos divididos
        var titleObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('is-in');
                titleObserver.unobserve(entry.target);
            });
        }, { threshold: 0, rootMargin: '0px 0px -10% 0px' });

        $all('.pro-split').forEach(function (t) {
            t.removeAttribute('data-aos');
            titleObserver.observe(t);
        });
    }

    // -----------------------------------------------------------------
    // 6. Cortinas de sección
    // -----------------------------------------------------------------
    var CURTAINS = [
        ['.bridal-experience', 'split'],
        ['.gallery', 'lift'],
        ['.services', 'wipe'],
        ['.contact', 'split']
    ];

    function initCurtains() {
        if (!hasIO || reduceMotion) return;

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                var section = entry.target;
                observer.unobserve(section);
                section.classList.add('is-open');
                setTimeout(function () {
                    var panels = section.querySelector('.pro-curtain__panels');
                    if (panels) panels.parentNode.removeChild(panels);
                }, 1600);
            });
        }, { threshold: 0, rootMargin: '0px 0px -18% 0px' });

        CURTAINS.forEach(function (cfg) {
            var section = document.querySelector(cfg[0]);
            if (!section) return;
            var panels = document.createElement('div');
            panels.className = 'pro-curtain__panels';
            panels.setAttribute('aria-hidden', 'true');
            panels.appendChild(document.createElement('span'));
            panels.appendChild(document.createElement('span'));
            section.insertBefore(panels, section.firstChild);
            section.classList.add('pro-curtain', 'pro-curtain--' + cfg[1]);
            observer.observe(section);
        });
    }

    // -----------------------------------------------------------------
    // 7. Contadores animados (500+, 10+, 100%)
    // -----------------------------------------------------------------
    function initCounters() {
        if (!hasIO || reduceMotion) return;
        var nums = $all('.stat-number');
        if (!nums.length) return;

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                var el = entry.target;
                observer.unobserve(el);
                var original = el.textContent.trim();
                var match = original.match(/^(\d+)(.*)$/);
                if (!match) return;
                var target = parseInt(match[1], 10);
                var suffix = match[2];
                var start = null;
                var duration = 1800;

                function step(ts) {
                    if (!start) start = ts;
                    var t = Math.min((ts - start) / duration, 1);
                    var eased = 1 - Math.pow(1 - t, 3);
                    el.textContent = Math.round(target * eased) + suffix;
                    if (t < 1) window.requestAnimationFrame(step);
                    else el.textContent = original;
                }
                window.requestAnimationFrame(step);
            });
        }, { threshold: 0.6 });

        nums.forEach(function (n) { observer.observe(n); });
    }

    // -----------------------------------------------------------------
    // 8. Luz que sigue el cursor en tarjetas
    // -----------------------------------------------------------------
    function initCardGlow() {
        if (!window.matchMedia('(hover: hover)').matches) return;
        $all('.services .service-card, .service-area-card').forEach(function (card) {
            card.addEventListener('pointermove', function (e) {
                var r = card.getBoundingClientRect();
                card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
                card.style.setProperty('--my', (e.clientY - r.top) + 'px');
            });
        });
    }

    // -----------------------------------------------------------------
    // 9. Galería: filtros, captions, "ver más"
    // -----------------------------------------------------------------
    function initGallery() {
        var grid = document.getElementById('galleryGrid');
        if (!grid) return;
        var items = $all('.gallery-item', grid);
        if (!items.length) return;

        var CATS = [
            { id: 'all', label: 'Todo' },
            { id: 'novias', label: 'Novias', re: /novia|nupcial|boda|dama/ },
            { id: 'peinados', label: 'Peinados', re: /peinado/ },
            { id: 'xv-grad', label: 'XV & Graduación', re: /quincea|graduaci|xv/ },
            { id: 'social', label: 'Social & Glam', re: /social|glam|tendencia/ },
            { id: 'transformaciones', label: 'Transformaciones', re: /transforma|tranforma|resultado|madura|correctiv/ }
        ];

        var counts = {};
        items.forEach(function (item) {
            var img = item.querySelector('img');
            if (!img) return;
            var key = ((img.getAttribute('alt') || '') + ' ' + (img.getAttribute('src') || '')).toLowerCase();
            var tags = [];
            CATS.forEach(function (c) {
                if (c.re && c.re.test(key)) {
                    tags.push(c.id);
                    counts[c.id] = (counts[c.id] || 0) + 1;
                }
            });
            item.setAttribute('data-cats', tags.join(' '));

            var overlay = item.querySelector('.gallery-overlay');
            var alt = img.getAttribute('alt') || '';
            if (overlay && alt && !/\.(jpg|png)|_[a-z0-9]{6}$/i.test(alt)) {
                var cap = document.createElement('span');
                cap.className = 'gallery-caption';
                cap.textContent = alt;
                overlay.appendChild(cap);
            }
        });
        counts.all = items.length;

        // Barra de filtros
        var bar = document.createElement('div');
        bar.className = 'gallery-filters';
        bar.setAttribute('role', 'toolbar');
        bar.setAttribute('aria-label', 'Filtrar portafolio');
        CATS.forEach(function (c) {
            if (!counts[c.id]) return;
            var b = document.createElement('button');
            b.type = 'button';
            b.className = 'gallery-filter';
            b.id = 'galleryFilter-' + c.id;
            b.setAttribute('data-filter', c.id);
            b.setAttribute('aria-pressed', c.id === 'all' ? 'true' : 'false');
            b.appendChild(document.createTextNode(c.label));
            var small = document.createElement('small');
            small.textContent = counts[c.id];
            b.appendChild(small);
            bar.appendChild(b);
        });
        grid.parentNode.insertBefore(bar, grid);

        // Botón "ver más"
        var limit = window.innerWidth < 769 ? 8 : 12;
        var expanded = false;
        var current = 'all';
        var moreWrap = document.createElement('div');
        moreWrap.className = 'gallery-more';
        var moreBtn = document.createElement('button');
        moreBtn.type = 'button';
        moreBtn.id = 'galleryMoreBtn';
        moreBtn.className = 'btn';
        moreWrap.appendChild(moreBtn);
        grid.parentNode.insertBefore(moreWrap, grid.nextSibling);

        function apply(animate) {
            var visible = [];
            items.forEach(function (item) {
                var tags = item.getAttribute('data-cats') || '';
                var match = current === 'all' || (' ' + tags + ' ').indexOf(' ' + current + ' ') > -1;
                item.classList.toggle('is-hidden', !match);
                item.classList.remove('is-collapsed', 'is-feature', 'pro-pop');
                if (match) visible.push(item);
            });

            var collapsible = current === 'all' && !expanded && visible.length > limit;
            visible.forEach(function (item, idx) {
                if (collapsible && idx >= limit) item.classList.add('is-collapsed');
            });

            if (visible[0] && window.innerWidth > 768) visible[0].classList.add('is-feature');

            if (animate && !reduceMotion) {
                visible.forEach(function (item, idx) {
                    if (item.classList.contains('is-collapsed')) return;
                    item.classList.remove('pro-reveal', 'is-in');
                    item.removeAttribute('data-reveal');
                    item.style.setProperty('--d', (Math.min(idx, 12) * 45) + 'ms');
                    void item.offsetWidth;
                    item.classList.add('pro-pop');
                });
            }

            moreWrap.style.display = collapsible ? '' : 'none';
            moreBtn.textContent = 'Ver portafolio completo (' + visible.length + ')';
        }

        bar.addEventListener('click', function (e) {
            var btn = e.target.closest('.gallery-filter');
            if (!btn) return;
            current = btn.getAttribute('data-filter');
            $all('.gallery-filter', bar).forEach(function (b) {
                b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
            });
            apply(true);
            track('select_content', { content_type: 'gallery_filter', content_id: current });
        });

        moreBtn.addEventListener('click', function () {
            expanded = true;
            apply(true);
            track('select_content', { content_type: 'gallery_expand', content_id: 'gallery_ver_completo' });
        });

        apply(false);
    }

    // -----------------------------------------------------------------
    // INIT
    // -----------------------------------------------------------------
    function init() {
        initIntro();
        initHeroSlides();
        initGallery();
        splitTitles();
        initReveals();
        initCurtains();
        initCounters();
        initCardGlow();
        initScrollFx();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
