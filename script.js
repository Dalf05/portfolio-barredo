// Loading screen functionality
window.addEventListener('load', () => {
    const loadingScreen = document.querySelector('.loading-screen');
    const progress = document.querySelector('.loading-progress');
    const miniCam = document.querySelector('.mini-camera');
    const flash = document.querySelector('.flash-overlay');
    progress?.addEventListener('animationend', () => {
        miniCam?.classList.add('fire');
        flash?.classList.add('flash-fire');
        setTimeout(() => {
            loadingScreen.classList.add('fade-out');
            setTimeout(() => loadingScreen.remove(), 1600);
        }, 600);
    }, { once: true });
});

// Enhanced counter animation with staggered effect
function animateCounters() {
    // Remove counter animation as profile card is removed
}

// Enhanced progress bar animation with staggered effect
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    progressBars.forEach((bar, index) => {
        const progress = bar.getAttribute('data-progress');
        setTimeout(() => {
            bar.style.width = progress + '%';
        }, 800 + (index * 300));
    });
}

// Parallax effect for particles
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const particles = document.querySelectorAll('.particle');
    
    particles.forEach((particle, index) => {
        const speed = 0.5 + (index * 0.1);
        particle.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Enhanced Creative Interactions - Simplified
document.addEventListener('DOMContentLoaded', () => {
    // Check if device is mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
    
    // Mobile notice logic: show a styled notice informing users the site is best on desktop
    const mobileNotice = document.getElementById('mobileNotice');
    const proceedBtn = document.getElementById('mobileNoticeProceed');
    if (isMobile && mobileNotice) {
        mobileNotice.setAttribute('aria-hidden', 'false');
        mobileNotice.classList.add('is-open');
        // Prevent background scroll until user accepts
        document.body.style.overflow = 'hidden';
    }

    function hideMobileNotice() {
        if (!mobileNotice) return;
        mobileNotice.classList.remove('is-open');
        mobileNotice.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    proceedBtn?.addEventListener('click', () => {
        // allow user to continue to current mobile-optimized site (with disclaimer already shown)
        hideMobileNotice();
    });

    // Also allow escape key to close the notice
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') hideMobileNotice(); });
    
    if (isMobile) {
        // Add mobile-specific class
        document.body.classList.add('mobile-device');
        document.querySelector('.flash-overlay')?.remove();
        
        // Optimize animations for mobile
        const style = document.createElement('style');
        style.textContent = `
            .mobile-device * {
                -webkit-transform: translateZ(0);
                transform: translateZ(0);
                -webkit-backface-visibility: hidden;
                backface-visibility: hidden;
            }
            
            .mobile-device .particle,
            .mobile-device .creative-particle {
                animation-duration: 25s !important;
            }
            
            .mobile-device .hero::before {
                animation: none;
            }
        `;
        document.head.appendChild(style);
        
        // Touch feedback for interactive elements
        const touchElements = document.querySelectorAll('.feature-item, .skill-item, .project-card, .contact-link, .timeline-content');
        
        touchElements.forEach(element => {
            element.addEventListener('touchstart', () => {
                element.style.transform = 'scale(0.98)';
            });
            
            element.addEventListener('touchend', () => {
                setTimeout(() => {
                    element.style.transform = '';
                }, 150);
            });
        });
        
        // Improved scroll performance
        let ticking = false;
        function updateScrollEffects() {
            const scrolled = window.pageYOffset;
            const particles = document.querySelectorAll('.particle');
            
            particles.forEach((particle, index) => {
                if (index < 3) { // Only animate first 3 particles on mobile
                    const speed = 0.3 + (index * 0.1);
                    particle.style.transform = `translateY(${scrolled * speed}px)`;
                }
            });
            
            ticking = false;
        }
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollEffects);
                ticking = true;
            }
        });
    }
    
    // Viewport height fix for mobile browsers
    function setViewportHeight() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    setViewportHeight();
    window.addEventListener('resize', setViewportHeight);
    window.addEventListener('orientationchange', () => {
        setTimeout(setViewportHeight, 500);
    });
    
    // Simplified magnetic cursor effect
    const interactiveElements = document.querySelectorAll('.contact-link, .feature-item, .project-card, .skill-item');
    if (!isMobile) {
        interactiveElements.forEach(element => {
            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                element.style.transform = `translate(${x * 0.05}px, ${y * 0.05}px)`;
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = '';
            });
        });
    }

    // Creative particle system
    function createFloatingParticles() {
        const particleContainer = document.querySelector('.about-particles');
        
        for (let i = 0; i < 8; i++) {
            const particle = document.createElement('div');
            particle.className = 'creative-particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 60 + 20}px;
                height: ${Math.random() * 60 + 20}px;
                background: radial-gradient(circle, rgba(0,0,0,0.1), transparent);
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: creativeFloat ${8 + Math.random() * 10}s ease-in-out infinite;
                animation-delay: ${Math.random() * 5}s;
                transform-style: preserve-3d;
                filter: blur(${Math.random() * 2}px);
            `;
            particleContainer.appendChild(particle);
        }
    }
    
    createFloatingParticles();

    // Cinematic text reveal animation
    function animateTextReveal() {
        const textElements = document.querySelectorAll('h1, h2, h3, p');
        
        textElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(50px) rotateX(-15deg)';
            element.style.transition = 'all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0) rotateX(0)';
            }, index * 100);
        });
    }

    // Simplified scroll-triggered animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                if (entry.target.classList.contains('project-card')) {
                    const cards = document.querySelectorAll('.project-card');
                    const index = Array.from(cards).indexOf(entry.target);
                    entry.target.style.animationDelay = `${index * 0.2}s`;
                }
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });

    // Simplified observation
    document.querySelectorAll('.skill-item, .project-card, .timeline-item, .feature-item, .equipment-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });

    // Dynamic background color shifting
    let colorShift = 0;
    if (!isMobile) {
        setInterval(() => {
            colorShift += 0.5;
            document.documentElement.style.setProperty('--dynamic-hue', `hsl(${colorShift % 360}, 10%, 98%)`);
        }, 100);
    }

    // Simplified hero title animation
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const spans = heroTitle.querySelectorAll('span');
        spans.forEach((span, index) => {
            span.style.opacity = '0';
            span.style.transform = 'translateY(30px)';
            span.style.transition = 'all 0.8s ease';
            
            setTimeout(() => {
                span.style.opacity = '1';
                span.style.transform = 'translateY(0)';
            }, index * 300 + 1000);
        });
    }

    const videoModal = document.getElementById('videoModal');
    const videoFrame = document.getElementById('videoFrame');
    const closeBtn = videoModal?.querySelector('.video-modal__close');

    function openVideo(url) {
        if (!videoModal || !videoFrame) return;
        videoFrame.src = url;
        videoModal.setAttribute('aria-hidden', 'false');
        videoModal.classList.add('is-open');
        document.body.style.overflow = 'hidden';
    }

    function closeVideo() {
        if (!videoModal || !videoFrame) return;
        videoModal.classList.remove('is-open');
        videoModal.setAttribute('aria-hidden', 'true');
        videoFrame.src = '';
        document.body.style.overflow = '';
    }

    document.querySelectorAll('.project-card[data-video]').forEach(card => {
        card.style.cursor = 'pointer';
        const url = card.getAttribute('data-video');
        card.addEventListener('click', () => openVideo(url));
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openVideo(url); }
        });
    });

    videoModal?.addEventListener('click', (e) => {
        if (e.target.dataset.close === 'true') closeVideo();
    });
    closeBtn?.addEventListener('click', closeVideo);
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeVideo(); });

    // Copy-to-clipboard for email with toast
    document.querySelectorAll('.copy-email').forEach(el => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            const email = el.dataset.email;
            if (!email) return;
            navigator.clipboard?.writeText(email).then(() => {
                showToast('Correo copiado: ' + email);
            }).catch(() => {
                // fallback: select and copy
                const input = document.createElement('input');
                input.value = email;
                document.body.appendChild(input);
                input.select();
                document.execCommand('copy');
                input.remove();
                showToast('Correo copiado: ' + email);
            });
        });
    });

    function showToast(msg) {
        let toast = document.querySelector('.copy-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.className = 'copy-toast';
            toast.style.cssText = 'position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:#ffffff;color:#000;padding:12px 18px;border-radius:10px;box-shadow:0 10px 30px rgba(0,0,0,0.2);z-index:10002;font-weight:600;';
            document.body.appendChild(toast);
        }
        toast.textContent = msg;
        toast.style.opacity = '1';
        clearTimeout(toast._timeout);
        toast._timeout = setTimeout(() => {
            toast.style.transition = 'opacity 300ms';
            toast.style.opacity = '0';
        }, 1800);
    }
});

// Enhanced intersection observer with multiple animation types
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            
            // Remove counter and progress bar triggers for about section
            if (entry.target.classList.contains('about')) {
                setTimeout(animateProgressBars, 1000);
            }
            
            // Staggered animation for project cards
            if (entry.target.classList.contains('project-card')) {
                const cards = document.querySelectorAll('.project-card');
                const index = Array.from(cards).indexOf(entry.target);
                entry.target.style.animationDelay = `${index * 0.2}s`;
            }
        }
    });
}, observerOptions);

// Enhanced observation including equipment container
document.querySelectorAll('.timeline-item, .project-card, .skill-item, .about, .feature-item, .equipment-item').forEach((el, index) => {
    if (!el.classList.contains('about')) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    }
    observer.observe(el);
});

// Simplified animation styles
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    .feature-item.animate-in {
        animation: fadeInUp 0.6s ease forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .project-card.animate-in {
        animation: fadeInScale 0.6s ease forwards;
    }
    
    @keyframes fadeInScale {
        from {
            opacity: 0;
            transform: scale(0.95) translateY(20px);
        }
        to {
            opacity: 1;
            transform: scale(1) translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Removed overly complex enhanced style
const enhancedStyle = document.createElement('style');
enhancedStyle.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(enhancedStyle);

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Close drawer when clicking overlay
const navMenu = document.querySelector('.nav-menu');
const body = document.body;

// Create overlay
const overlay = document.createElement('div');
overlay.className = 'nav-overlay';
body.appendChild(overlay);

// Close drawer when clicking overlay
overlay.addEventListener('click', () => {
    if (navMenu) { navMenu.classList.remove('active'); }
    overlay.classList.remove('active');
    body.style.overflow = '';
});

// Close drawer when clicking nav links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu) { navMenu.classList.remove('active'); }
        overlay.classList.remove('active');
        body.style.overflow = '';
    });
});