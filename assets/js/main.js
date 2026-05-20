/**
 * Biks - Premium Portfolio Website
 * JS Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    
    // Check for saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        html.setAttribute('data-theme', savedTheme);
    }

    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // 2. Custom Cursor
    const cursorDot = document.querySelector('[data-cursor-dot]');
    const cursorOutline = document.querySelector('[data-cursor-outline]');

    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        // Dot follows exactly
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        // Outline has slight delay
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

    // Hover effect on interactive elements
    const interactables = document.querySelectorAll('a, button, input, textarea, select, .selector-label');
    interactables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.style.width = '60px';
            cursorOutline.style.height = '60px';
            cursorOutline.style.backgroundColor = 'rgba(0, 240, 255, 0.1)';
        });
        el.addEventListener('mouseleave', () => {
            cursorOutline.style.width = '40px';
            cursorOutline.style.height = '40px';
            cursorOutline.style.backgroundColor = 'transparent';
        });
    });

    // 3. Sticky Navbar
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 4. Scroll Animations (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in-up');
    fadeElements.forEach(el => {
        observer.observe(el);
    });

    // 5. Portfolio Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add to current
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.9)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // 6. Direct WhatsApp Integration Form Submission
    const form = document.getElementById('project-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Opening WhatsApp...';
            
            // Collect form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const projectType = document.querySelector('input[name="project_type"]:checked') ? document.querySelector('input[name="project_type"]:checked').value : 'Not Specified';
            const budget = document.getElementById('budget').value;
            const message = document.getElementById('message').value;

            // Format WhatsApp message with bold text
            const waText = encodeURIComponent(`*New Project Inquiry!*\n\n*Name:* ${name}\n*Email:* ${email}\n*Project Type:* ${projectType}\n*Budget:* ${budget}\n\n*Message:*\n${message}`);
            
            // Construct direct WhatsApp link to the user's number
            const waUrl = `https://wa.me/919330284675?text=${waText}`;

            // Open WhatsApp securely in a new tab
            setTimeout(() => {
                window.open(waUrl, '_blank');
                
                // Show success on UI
                btn.innerHTML = '<i class="fa-brands fa-whatsapp"></i> Sent to WhatsApp!';
                btn.style.backgroundColor = '#25D366'; // WhatsApp Green
                btn.style.color = '#fff';
                form.reset();

                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.backgroundColor = '';
                    btn.style.color = '';
                }, 3000);
            }, 800);
        });
    }
    // 7. Interactive 3D Mockup Tilt Effect
    const mockupWrapper = document.querySelector('.interactive-mockup');
    
    if (mockupWrapper) {
        // Set initial 3D look
        mockupWrapper.style.transform = `perspective(2000px) rotateX(15deg) rotateY(-15deg) rotateZ(2deg) scale3d(0.95, 0.95, 0.95)`;
        mockupWrapper.style.transition = `transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)`;

        mockupWrapper.addEventListener('mousemove', (e) => {
            const rect = mockupWrapper.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Calculate tilt angle based on mouse position
            const tiltX = ((y - centerY) / centerY) * -10 + 15; // Base 15deg
            const tiltY = ((x - centerX) / centerX) * 10 - 15; // Base -15deg
            
            mockupWrapper.style.transition = `transform 0.1s ease-out`;
            mockupWrapper.style.transform = `perspective(2000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) rotateZ(2deg) scale3d(0.98, 0.98, 0.98)`;
        });
        
        mockupWrapper.addEventListener('mouseleave', () => {
            mockupWrapper.style.transition = `transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)`;
            mockupWrapper.style.transform = `perspective(2000px) rotateX(15deg) rotateY(-15deg) rotateZ(2deg) scale3d(0.95, 0.95, 0.95)`;
        });
    }
});
