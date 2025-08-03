// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const contactForm = document.getElementById('contactForm');

    // Mobile menu toggle
    mobileMenu.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Active navigation link highlighting
    function updateActiveLink() {
        const sections = document.querySelectorAll('section');
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll animations
    function animateOnScroll() {
        const animatedElements = document.querySelectorAll('.scroll-animation');
        
        animatedElements.forEach(element => {
            const elementTop = element.offsetTop;
            const elementHeight = element.offsetHeight;
            const viewportHeight = window.innerHeight;
            const scrollTop = window.scrollY;

            if (scrollTop > (elementTop + elementHeight / 3) - viewportHeight) {
                element.classList.add('show');
            }
        });
    }

    // Add scroll animation class to elements
    function initScrollAnimations() {
        const elementsToAnimate = [
            '.hero-content',
            '.about-content',
            '.skill-category',
            '.project-card',
            '.timeline-item',
            '.achievement-card',
            '.contact-content'
        ];

        elementsToAnimate.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                element.classList.add('scroll-animation');
            });
        });
    }

    initScrollAnimations();
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initial check

    // Contact form handling
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');

            // Basic validation
            if (!name || !email || !subject || !message) {
                showMessage('Please fill in all fields.', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                showMessage('Please enter a valid email address.', 'error');
                return;
            }

            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.classList.add('loading');

            // Simulate form submission (replace with actual form handling)
            setTimeout(() => {
                showMessage('Thank you for your message! I\'ll get back to you soon.', 'success');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.classList.remove('loading');
            }, 2000);
        });
    }

    // Utility functions
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showMessage(text, type) {
        // Remove existing messages
        const existingMessages = document.querySelectorAll('.message');
        existingMessages.forEach(msg => msg.remove());

        // Create new message
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        messageDiv.textContent = text;

        // Insert after form
        const form = document.getElementById('contactForm');
        form.parentNode.insertBefore(messageDiv, form.nextSibling);

        // Auto remove after 5 seconds
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }

    // Typing animation for hero text
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // Initialize typing animation for hero subtitle
    const heroDescription = document.querySelector('.hero-description');
    if (heroDescription) {
        const originalText = heroDescription.textContent;
        setTimeout(() => {
            typeWriter(heroDescription, originalText, 50);
        }, 1000);
    }

    // Project card hover effects
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Skill tag hover effects
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });

        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add parallax effect to hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            const rate = scrolled * -0.5;
            heroSection.style.transform = `translateY(${rate}px)`;
        }
    });

    // Add loading animation to page
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Trigger initial animations
        setTimeout(() => {
            const heroElements = document.querySelectorAll('.hero-content > *');
            heroElements.forEach((element, index) => {
                setTimeout(() => {
                    element.classList.add('fade-in');
                }, index * 200);
            });
        }, 500);
    });

    // Stats counter animation
    function animateStats() {
        const stats = document.querySelectorAll('.stat-item h3');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const finalValue = parseInt(target.textContent);
                    animateValue(target, 0, finalValue, 2000);
                    observer.unobserve(target);
                }
            });
        });

        stats.forEach(stat => {
            observer.observe(stat);
        });
    }

    function animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const currentValue = Math.floor(progress * (end - start) + start);
            element.textContent = currentValue + '+';
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // Initialize stats animation
    animateStats();

    // Add tilt effect to cards
    function addTiltEffect() {
        const cards = document.querySelectorAll('.project-card, .skill-category, .achievement-card');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
            });
        });
    }

    // Initialize tilt effect
    addTiltEffect();

    // Add theme toggle functionality
    function initThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle-navbar');
        
        if (!themeToggle) {
            console.error('Theme toggle button not found');
            return;
        }

        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            themeToggle.setAttribute('title', 'Switch to light mode');
            // Update about section colors for dark mode on page load
            updateAboutSectionColors(true);
        }

        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-theme');
            const isDark = document.body.classList.contains('dark-theme');
            
            // Update button icon
            this.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
            
            // Save theme preference
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            
            // Update button title
            this.setAttribute('title', isDark ? 'Switch to light mode' : 'Switch to dark mode');
            
            // Update about section colors for dark mode
            updateAboutSectionColors(isDark);
            
            // Add smooth transition effect
            document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
            setTimeout(() => {
                document.body.style.transition = '';
            }, 300);
        });
    }

    // Initialize theme toggle
    initThemeToggle();

    // Function to update about section colors for dark mode
    function updateAboutSectionColors(isDark) {
        const aboutTextParagraphs = document.querySelectorAll('.about-text p[style*="color"]');
        const aboutStrongElements = document.querySelectorAll('.about-text p strong[style*="color"]');
        
        if (isDark) {
            // Dark mode colors
            aboutTextParagraphs.forEach(p => {
                if (p.style.color === 'rgb(51, 51, 51)' || p.style.color === '#333') {
                    p.style.color = '#cbd5e1';
                }
            });
            
            aboutStrongElements.forEach(strong => {
                const currentColor = strong.style.color;
                switch (currentColor) {
                    case 'rgb(0, 188, 212)':
                    case '#00BCD4':
                        strong.style.color = '#67e8f9';
                        break;
                    case 'rgb(230, 126, 34)':
                    case '#E67E22':
                        strong.style.color = '#fdba74';
                        break;
                    case 'rgb(52, 152, 219)':
                    case '#3498DB':
                        strong.style.color = '#60a5fa';
                        break;
                    case 'rgb(22, 160, 133)':
                    case '#16A085':
                        strong.style.color = '#5eead4';
                        break;
                    case 'rgb(39, 174, 96)':
                    case '#27AE60':
                        strong.style.color = '#6ee7b7';
                        break;
                    case 'rgb(155, 89, 182)':
                    case '#9B59B6':
                        strong.style.color = '#c084fc';
                        break;
                    case 'rgb(231, 76, 60)':
                    case '#E74C3C':
                        strong.style.color = '#f87171';
                        break;
                    case 'rgb(243, 156, 18)':
                    case '#F39C12':
                        strong.style.color = '#fbbf24';
                        break;
                }
            });
        } else {
            // Light mode colors (restore original)
            aboutTextParagraphs.forEach(p => {
                if (p.style.color === 'rgb(203, 213, 225)' || p.style.color === '#cbd5e1') {
                    p.style.color = '#333';
                }
            });
            
            aboutStrongElements.forEach(strong => {
                const currentColor = strong.style.color;
                switch (currentColor) {
                    case 'rgb(103, 232, 249)':
                    case '#67e8f9':
                        strong.style.color = '#00BCD4';
                        break;
                    case 'rgb(253, 186, 116)':
                    case '#fdba74':
                        strong.style.color = '#E67E22';
                        break;
                    case 'rgb(96, 165, 250)':
                    case '#60a5fa':
                        strong.style.color = '#3498DB';
                        break;
                    case 'rgb(94, 234, 212)':
                    case '#5eead4':
                        strong.style.color = '#16A085';
                        break;
                    case 'rgb(110, 231, 183)':
                    case '#6ee7b7':
                        strong.style.color = '#27AE60';
                        break;
                    case 'rgb(192, 132, 252)':
                    case '#c084fc':
                        strong.style.color = '#9B59B6';
                        break;
                    case 'rgb(248, 113, 113)':
                    case '#f87171':
                        strong.style.color = '#E74C3C';
                        break;
                    case 'rgb(251, 191, 36)':
                    case '#fbbf24':
                        strong.style.color = '#F39C12';
                        break;
                }
            });
        }
    }

    // Add scroll to top button
    function initScrollToTop() {
        const scrollToTopBtn = document.createElement('button');
        scrollToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
        scrollToTopBtn.className = 'scroll-to-top';
        scrollToTopBtn.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #2563eb;
            color: white;
            border: none;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 1001;
            transition: all 0.3s ease;
            opacity: 0;
            visibility: hidden;
            transform: translateY(100px);
        `;

        document.body.appendChild(scrollToTopBtn);

        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                scrollToTopBtn.style.opacity = '1';
                scrollToTopBtn.style.visibility = 'visible';
                scrollToTopBtn.style.transform = 'translateY(0)';
            } else {
                scrollToTopBtn.style.opacity = '0';
                scrollToTopBtn.style.visibility = 'hidden';
                scrollToTopBtn.style.transform = 'translateY(100px)';
            }
        });

        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Initialize scroll to top button
    initScrollToTop();

    // Add cursor trail effect (optional)
    function initCursorTrail() {
        const cursor = document.createElement('div');
        cursor.className = 'cursor-trail';
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, rgba(37,99,235,0.8) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.1s ease;
        `;
        document.body.appendChild(cursor);

        document.addEventListener('mousemove', function(e) {
            cursor.style.left = e.clientX - 10 + 'px';
            cursor.style.top = e.clientY - 10 + 'px';
        });
    }

    // Uncomment to enable cursor trail
    // initCursorTrail();

    console.log('Portfolio website loaded successfully!');
});