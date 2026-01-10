// ===================================
// MOBILE NAVIGATION
// ===================================
class MobileNav {
    constructor() {
        this.navToggle = document.querySelector('.nav-toggle');
        this.navMenu = document.querySelector('.nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.navbar = document.querySelector('.navbar');

        this.init();
    }

    init() {
        if (!this.navToggle) return;

        // Toggle menu
        this.navToggle.addEventListener('click', () => {
            this.toggleMenu();
        });

        // Close menu when clicking on links
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMenu();
            });
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.navMenu.classList.contains('active')) {
                this.closeMenu();
            }
        });

        // Scroll effect on navbar
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }
        });
    }

    toggleMenu() {
        this.navToggle.classList.toggle('active');
        this.navMenu.classList.toggle('active');
        document.body.style.overflow = this.navMenu.classList.contains('active') ? 'hidden' : '';
    }

    closeMenu() {
        this.navToggle.classList.remove('active');
        this.navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Initialize mobile navigation
document.addEventListener('DOMContentLoaded', () => {
    new MobileNav();
});

// ===================================
// FADE-IN ANIMATION ON SCROLL
// ===================================
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => fadeInObserver.observe(el));
});

// ===================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    const scrollLinks = document.querySelectorAll('.scroll-link, a[href^="#"]');

    scrollLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Skip if it's just "#" or external link
            if (href === '#' || !href.startsWith('#')) return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();

                // Calculate offset (for fixed headers if needed)
                const offsetTop = target.offsetTop;

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// ===================================
// DIRECTION CARDS - MODAL FUNCTIONALITY
// ===================================
class DirectionModal {
    constructor() {
        this.modalSection = document.querySelector('.direction-details');
        this.cards = document.querySelectorAll('.direction-card');
        this.closeButtons = document.querySelectorAll('.close-detail');

        this.init();
    }

    init() {
        if (!this.modalSection) return;

        // Add click listeners to direction cards
        this.cards.forEach(card => {
            const btn = card.querySelector('.direction-btn');
            const direction = card.getAttribute('data-direction');

            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.openModal(direction);
            });

            // Also allow clicking on the card itself
            card.addEventListener('click', () => {
                this.openModal(direction);
            });
        });

        // Add click listeners to close buttons
        this.closeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                this.closeModal();
            });
        });

        // Close on overlay click
        this.modalSection.addEventListener('click', (e) => {
            if (e.target === this.modalSection) {
                this.closeModal();
            }
        });

        // Prevent modal close when clicking on buttons inside modal
        document.querySelectorAll('.detail-content .btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.closeModal();
            });
        });

        // Close on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modalSection.classList.contains('active')) {
                this.closeModal();
            }
        });
    }

    openModal(direction) {
        const detailContent = document.querySelector(`#detail-${direction}`);

        if (detailContent) {
            // Calculate scrollbar width to prevent jump
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
            
            // Show modal section
            this.modalSection.classList.add('active');

            // Hide all detail contents
            document.querySelectorAll('.detail-content').forEach(content => {
                content.classList.remove('active');
            });

            // Show selected content
            detailContent.classList.add('active');

            // Prevent body scroll and compensate for scrollbar
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = `${scrollbarWidth}px`;
            document.documentElement.style.setProperty('--scrollbar-compensation', `${scrollbarWidth}px`);
            
            // Fix WhatsApp button position
            const whatsappBtn = document.querySelector('.whatsapp-float');
            if (whatsappBtn) {
                whatsappBtn.style.right = `${25 + scrollbarWidth}px`;
            }

            // Track event
            this.trackEvent('Direction Modal', 'open', direction);
        }
    }

    closeModal() {
        this.modalSection.classList.remove('active');

        document.querySelectorAll('.detail-content').forEach(content => {
            content.classList.remove('active');
        });

        // Restore body scroll and padding
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
        document.documentElement.style.setProperty('--scrollbar-compensation', '0px');
        
        // Restore WhatsApp button position
        const whatsappBtn = document.querySelector('.whatsapp-float');
        if (whatsappBtn) {
            whatsappBtn.style.right = '';
        }
    }

    trackEvent(category, action, label) {
        if (typeof gtag !== 'undefined') {
            gtag('event', action, {
                'event_category': category,
                'event_label': label
            });
        }
        console.log(`Event: ${category} - ${action} - ${label}`);
    }
}

// Initialize direction modal
document.addEventListener('DOMContentLoaded', () => {
    new DirectionModal();
});

// ===================================
// SUCCESS STORIES SLIDER (NO AUTOPLAY)
// ===================================
class StoriesSlider {
    constructor() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.story-card');
        this.dotsContainer = document.querySelector('.slider-dots-stories');

        this.init();
    }

    init() {
        if (this.slides.length === 0) return;
    
        this.createDots();
        this.initTouchEvents();
    
        this.prevBtn = document.querySelector('.slider-arrow-prev-stories');
        this.nextBtn = document.querySelector('.slider-arrow-next-stories');
        
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => {
                this.prevSlide();
            });
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => {
                this.nextSlide();
            });
        }
    
        this.showSlide(0);
    }

    createDots() {
        this.dotsContainer.innerHTML = '';
        this.slides.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('dot-story');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                this.goToSlide(index);
            });
            this.dotsContainer.appendChild(dot);
        });
        this.dots = document.querySelectorAll('.dot-story');
    }

    showSlide(index) {
        this.slides.forEach(slide => {
            slide.classList.remove('active');
        });

        this.currentSlide = index;
        this.slides[this.currentSlide].classList.add('active');

        this.dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    nextSlide() {
        const next = (this.currentSlide + 1) % this.slides.length;
        this.showSlide(next);
    }

    prevSlide() {
        const prev = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.showSlide(prev);
    }

    goToSlide(index) {
        this.showSlide(index);
    }

    initTouchEvents() {
        let touchStartX = 0;
        let touchEndX = 0;
        const slider = document.querySelector('.stories-slider');

        if (!slider) return;

        slider.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        slider.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe();
        }, { passive: true });

        const handleSwipe = () => {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    this.nextSlide();
                } else {
                    this.prevSlide();
                }
            }
        };

        this.handleSwipe = handleSwipe;
    }
}

// Initialize stories slider - ONLY ONCE
document.addEventListener('DOMContentLoaded', () => {
    new StoriesSlider();
});

// ===================================
// CREDENTIALS SLIDER (WITH AUTOPLAY)
// ===================================
class CredentialsSlider {
    constructor() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.credential-card');
        this.dotsContainer = document.querySelector('.slider-dots-credentials');
        this.autoplayInterval = null;
        this.autoplayDelay = 5000;

        this.init();
    }

    init() {
        if (this.slides.length === 0) return;

        this.createDots();
        this.initTouchEvents();
        
        this.prevBtn = document.querySelector('.slider-arrow-prev');
        this.nextBtn = document.querySelector('.slider-arrow-next');
        
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => {
                this.prevSlide();
                this.resetAutoplay();
            });
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => {
                this.nextSlide();
                this.resetAutoplay();
            });
        }

        this.startAutoplay();
        this.showSlide(0);
    }

    createDots() {
        this.dotsContainer.innerHTML = '';
        this.slides.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('dot-credential');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                this.goToSlide(index);
                this.resetAutoplay();
            });
            this.dotsContainer.appendChild(dot);
        });
        this.dots = document.querySelectorAll('.dot-credential');
    }

    showSlide(index) {
        this.slides.forEach(slide => {
            slide.classList.remove('active');
        });

        this.currentSlide = index;
        this.slides[this.currentSlide].classList.add('active');

        this.dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    nextSlide() {
        const next = (this.currentSlide + 1) % this.slides.length;
        this.showSlide(next);
    }

    prevSlide() {
        const prev = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.showSlide(prev);
    }

    goToSlide(index) {
        this.showSlide(index);
        this.resetAutoplay();
    }

    startAutoplay() {
        this.autoplayInterval = setInterval(() => {
            this.nextSlide();
        }, this.autoplayDelay);
    }

    stopAutoplay() {
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
        }
    }

    resetAutoplay() {
        this.stopAutoplay();
        this.startAutoplay();
    }

    initTouchEvents() {
        let touchStartX = 0;
        let touchEndX = 0;
        const slider = document.querySelector('.credentials-slider');

        if (!slider) return;

        slider.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        slider.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe();
        }, { passive: true });

        const handleSwipe = () => {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    this.nextSlide();
                    this.resetAutoplay();
                } else {
                    this.prevSlide();
                    this.resetAutoplay();
                }
            }
        };

        this.handleSwipe = handleSwipe;
    }
}

// ===================================
// FAQ ACCORDION
// ===================================
class FAQAccordion {
    constructor() {
        this.faqItems = document.querySelectorAll('.faq-item');
        this.init();
    }

    init() {
        this.faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');

            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');

                this.faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });

                item.classList.toggle('active');

                if (!isActive) {
                    const questionText = question.querySelector('span').textContent;
                    this.trackEvent('FAQ', 'expand', questionText);
                }
            });
        });
    }

    trackEvent(category, action, label) {
        if (typeof gtag !== 'undefined') {
            gtag('event', action, {
                'event_category': category,
                'event_label': label
            });
        }
        console.log(`Event: ${category} - ${action} - ${label}`);
    }
}

// Initialize FAQ accordion
document.addEventListener('DOMContentLoaded', () => {
    new FAQAccordion();
});

// ===================================
// TRACK CTA BUTTON CLICKS
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    const ctaButtons = document.querySelectorAll('.btn, .whatsapp-float');

    ctaButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const btnText = e.currentTarget.textContent.trim() || 'WhatsApp Float';
            const btnHref = e.currentTarget.getAttribute('href');

            if (typeof gtag !== 'undefined') {
                gtag('event', 'click', {
                    'event_category': 'CTA',
                    'event_label': `${btnText} - ${btnHref}`
                });
            }

            console.log(`CTA Click: ${btnText} - ${btnHref}`);
        });
    });
});

// ===================================
// HANDLE VISIBILITY CHANGE
// ===================================
let credentialsSliderInstance;

document.addEventListener('DOMContentLoaded', () => {
    const credSlider = new CredentialsSlider();
    credentialsSliderInstance = credSlider;
});

document.addEventListener('visibilitychange', () => {
    if (credentialsSliderInstance) {
        if (document.hidden) {
            credentialsSliderInstance.stopAutoplay();
        } else {
            credentialsSliderInstance.startAutoplay();
        }
    }
});

// ===================================
// PERFORMANCE MONITORING
// ===================================
window.addEventListener('load', () => {
    if (window.performance) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;

        console.log(`Page load time: ${pageLoadTime}ms`);

        if (pageLoadTime > 2000) {
            console.warn('Page load time exceeds 2 seconds. Consider optimization.');
        } else {
            console.log('✓ Page load time under 2 seconds - Great!');
        }

        if (typeof gtag !== 'undefined') {
            gtag('event', 'timing_complete', {
                'name': 'load',
                'value': pageLoadTime,
                'event_category': 'Performance'
            });
        }
    }
});

// ===================================
// LAZY LOAD IMAGES
// ===================================
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        if (img.dataset.src) {
            img.src = img.dataset.src;
        }
    });
} else {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// ===================================
// ACCESSIBLE KEYBOARD NAVIGATION
// ===================================
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        if (e.target.classList.contains('faq-question')) {
            e.preventDefault();
            e.target.click();
        }
    }

    // Credentials slider keyboard navigation
    if (credentialsSliderInstance) {
        const credSliderElement = document.querySelector('.credentials-slider');
        if (credSliderElement && credSliderElement.contains(document.activeElement)) {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                credentialsSliderInstance.prevSlide();
                credentialsSliderInstance.resetAutoplay();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                credentialsSliderInstance.nextSlide();
                credentialsSliderInstance.resetAutoplay();
            }
        }
    }
});

// ===================================
// VIEW CREDENTIAL MODAL
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.view-credential').forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const img = this.closest('.credential-card').querySelector('.credential-image img');
            const imgSrc = img.src;
            
            const modal = document.createElement('div');
            modal.className = 'credential-modal';
            modal.innerHTML = `
                <div class="credential-modal-content">
                    <button class="credential-modal-close" aria-label="Закрыть">&times;</button>
                    <img src="${imgSrc}" alt="Диплом">
                </div>
            `;
            
            document.body.appendChild(modal);
            
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = `${scrollbarWidth}px`;
            
            if (!document.getElementById('credential-modal-styles')) {
                const style = document.createElement('style');
                style.id = 'credential-modal-styles';
                style.textContent = `
                    .credential-modal {
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background: rgba(0, 0, 0, 0.9);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        z-index: 10000;
                        padding: 20px;
                        animation: fadeIn 0.3s ease;
                    }
                    @keyframes fadeIn {
                        from { opacity: 0; }
                        to { opacity: 1; }
                    }
                    .credential-modal-content {
                        position: relative;
                        max-width: 90%;
                        max-height: 90%;
                    }
                    .credential-modal img {
                        max-width: 100%;
                        max-height: 90vh;
                        object-fit: contain;
                        border-radius: 8px;
                    }
                    .credential-modal-close {
                        position: absolute;
                        top: -40px;
                        right: -40px;
                        width: 40px;
                        height: 40px;
                        background: white;
                        border: none;
                        border-radius: 50%;
                        font-size: 24px;
                        cursor: pointer;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        transition: transform 0.2s;
                        color: #4A4A4A;
                        font-weight: bold;
                    }
                    .credential-modal-close:hover {
                        transform: scale(1.1) rotate(90deg);
                        background: #5B9AA9;
                        color: white;
                    }
                    @media (max-width: 768px) {
                        .credential-modal-close {
                            top: 10px;
                            right: 10px;
                        }
                    }
                `;
                document.head.appendChild(style);
            }
            
            modal.addEventListener('click', function(e) {
                if (e.target === modal || e.target.classList.contains('credential-modal-close')) {
                    modal.remove();
                    document.body.style.overflow = '';
                    document.body.style.paddingRight = '';
                }
            });
            
            const handleEscape = (e) => {
                if (e.key === 'Escape') {
                    modal.remove();
                    document.body.style.overflow = '';
                    document.body.style.paddingRight = '';
                    document.removeEventListener('keydown', handleEscape);
                }
            };
            document.addEventListener('keydown', handleEscape);
        });
    });
});

// ===================================
// STORY READ MORE TOGGLE
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.story-read-more').forEach(button => {
        button.addEventListener('click', function() {
            const storyContent = this.previousElementSibling;
            
            if (storyContent.classList.contains('collapsed')) {
                storyContent.classList.remove('collapsed');
                storyContent.classList.add('expanded');
                this.textContent = 'Скрыть';
            } else {
                storyContent.classList.add('collapsed');
                storyContent.classList.remove('expanded');
                this.textContent = 'Читать далее';
                this.closest('.story-card').scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    });
});

// ===================================
// CONSOLE WELCOME MESSAGE
// ===================================
console.log('%c👋 Добро пожаловать!', 'font-size: 20px; font-weight: bold; color: #5B9AA9;');
console.log('%cНиколай Николаевич Абаза - Психолог-аддиктолог', 'font-size: 14px; color: #4A4A4A;');
console.log('%cПервый шаг к свободе от зависимости', 'font-size: 12px; color: #6A6A6A;');
console.log('%c📞 +7 771 103 12 32', 'font-size: 12px; color: #5B9AA9;');
