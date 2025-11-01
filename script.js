// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth Scrolling
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

// Navbar Background on Scroll with enhanced effects
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 14, 39, 0.95)';
        navbar.style.boxShadow = '0 10px 40px rgba(0, 255, 136, 0.2)';
    } else {
        navbar.style.background = 'rgba(10, 14, 39, 0.7)';
        navbar.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
    }
});

// Animate elements on scroll with stagger effect
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('fade-in');
            }, index * 100);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.expertise-card, .service-card, .stat-item').forEach(el => {
    observer.observe(el);
});

// Particle animation for hero section
function createParticles() {
    const matrixBg = document.querySelector('.matrix-bg');
    if (!matrixBg) return;

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 3 + 1 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = `rgba(0, 255, ${Math.random() * 100 + 136}, ${Math.random() * 0.5 + 0.3})`;
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.boxShadow = `0 0 ${Math.random() * 20 + 10}px rgba(0, 255, 136, 0.5)`;
        particle.style.animation = `float ${Math.random() * 10 + 10}s ease-in-out infinite`;
        particle.style.animationDelay = Math.random() * 5 + 's';
        matrixBg.appendChild(particle);
    }
}

// Initialize particles after page load
window.addEventListener('load', () => {
    createParticles();
    setTimeout(typeWriter, 500);
});

// Contact Form Handling with enhanced feedback
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const button = this.querySelector('button');
    const originalText = button.textContent;
    
    // Button animation
    button.textContent = 'Sending...';
    button.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
        button.textContent = '✓ Message Sent!';
        button.style.background = 'linear-gradient(135deg, #00ff88 0%, #00d4ff 100%)';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.transform = 'scale(1)';
            button.style.background = '';
            this.reset();
        }, 2000);
    }, 1000);
    
    // Show success message
    alert('Thank you for your message! I will get back to you soon.');
});

// Add typing effect to hero subtitle
const subtitle = document.querySelector('.hero-subtitle');
if (subtitle) {
    const text = subtitle.textContent;
    subtitle.textContent = '';
    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            subtitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    }
}

// Counter animation for stats with easing
function animateCounter(element, target) {
    let current = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
}

// Observe stats section for counter animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-item h3');
            statNumbers.forEach((stat, index) => {
                setTimeout(() => {
                    const target = parseInt(stat.textContent);
                    animateCounter(stat, target);
                }, index * 200);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Add active class to navigation based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-menu a').forEach(link => {
                link.classList.remove('active');
            });
            navLink?.classList.add('active');
        }
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-content');
    parallaxElements.forEach(el => {
        const speed = 0.5;
        el.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Card tilt effect on mouse move
document.querySelectorAll('.expertise-card, .service-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px) scale(1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
    });
});

// Smooth reveal for sections
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    revealObserver.observe(section);
});

// Cursor trail effect (optional - can be disabled for performance)
let cursorTrail = [];
document.addEventListener('mousemove', (e) => {
    if (window.innerWidth > 768) { // Only on desktop
        const trail = document.createElement('div');
        trail.style.position = 'fixed';
        trail.style.width = '5px';
        trail.style.height = '5px';
        trail.style.borderRadius = '50%';
        trail.style.background = 'rgba(0, 255, 136, 0.5)';
        trail.style.pointerEvents = 'none';
        trail.style.left = e.clientX + 'px';
        trail.style.top = e.clientY + 'px';
        trail.style.zIndex = '9999';
        trail.style.transition = 'all 0.3s ease';
        document.body.appendChild(trail);
        
        setTimeout(() => {
            trail.style.opacity = '0';
            trail.style.transform = 'scale(2)';
            setTimeout(() => trail.remove(), 300);
        }, 50);
    }
});

// Gallery Filter Functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        galleryItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.classList.remove('hidden');
                setTimeout(() => {
                    item.style.display = 'block';
                }, 10);
            } else {
                item.classList.add('hidden');
                setTimeout(() => {
                    if (item.classList.contains('hidden')) {
                        item.style.display = 'none';
                    }
                }, 500);
            }
        });
    });
});

// Profile Picture Upload Preview (optional)
const profileImage = document.getElementById('profileImage');
if (profileImage) {
    profileImage.addEventListener('error', function() {
        // Fallback to a default avatar if image not found
        this.src = 'https://via.placeholder.com/200/0a0e27/00ff88?text=NT+Sanath';
        this.style.objectFit = 'contain';
    });
}

console.log('🔐 Enhanced Cybersecurity Portfolio Loaded Successfully!');
console.log('✨ Stunning visuals activated!');
console.log('🎨 Glassmorphism and animations ready!');
console.log('🖼️ Gallery system loaded!');
