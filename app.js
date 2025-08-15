// AI/ML Academic Portfolio Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle Functionality
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('.theme-toggle__icon');
    const body = document.body;
    
    // BROWSER THEME DETECTION - NEW CODE
function detectSystemTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    }
    return 'light';
}

// Get system theme and apply it
const systemTheme = detectSystemTheme();
const savedTheme = localStorage.getItem('portfolio-theme') || systemTheme;

console.log('🎨 System theme detected:', systemTheme);
console.log('✅ Using theme:', savedTheme);

body.setAttribute('data-color-scheme', savedTheme);
updateThemeIcon(savedTheme);

// Listen for system theme changes
if (window.matchMedia) {
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    darkModeQuery.addEventListener('change', function(e) {
        if (!localStorage.getItem('portfolio-theme')) {
            const newTheme = e.matches ? 'dark' : 'light';
            console.log('🔄 System theme changed to:', newTheme);
            body.setAttribute('data-color-scheme', newTheme);
            updateThemeIcon(newTheme);
        }
    });
}

    
    function updateThemeIcon(theme) {
        themeIcon.textContent = theme === 'light' ? '🌙' : '☀️';
    }

    // Mobile Navigation Toggle
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function(e) {
            e.preventDefault();
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a nav link
        const navLinks = document.querySelectorAll('.nav__link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Smooth Scrolling and Active Nav Link
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav__link');
        
        let current = 'home';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Smooth scrolling for anchor links
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Typing Animation for Hero Name
    const typedName = document.getElementById('typedName');
    if (typedName) {
        const name = 'Jai Aakaash J S';
        let i = 0;
        
        // Clear initial content
        typedName.textContent = '';
        
        function typeWriter() {
            if (i < name.length) {
                typedName.textContent = name.substring(0, i + 1);
                i++;
                setTimeout(typeWriter, 120);
            }
        }
        
        // Start typing animation after a short delay
        setTimeout(typeWriter, 1000);
    }

    // Skills Animation on Scroll
    function animateSkills() {
        const skills = document.querySelectorAll('.skill');
        const triggerBottom = window.innerHeight / 5 * 4;
        
        skills.forEach(skill => {
            const skillTop = skill.getBoundingClientRect().top;
            
            if (skillTop < triggerBottom && !skill.classList.contains('animate')) {
                skill.classList.add('animate');
                const progressBar = skill.querySelector('.skill__progress');
                const targetWidth = progressBar.getAttribute('data-width');
                if (targetWidth) {
                    progressBar.style.setProperty('--progress-width', targetWidth + '%');
                    progressBar.style.width = targetWidth + '%';
                }
            }
        });
    }
    
    window.addEventListener('scroll', animateSkills);

    // Research Cards Hover Effect
    const researchCards = document.querySelectorAll('.research__card');
    researchCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Get form data
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const affiliation = document.getElementById('affiliation').value.trim();
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value.trim();
            
            // Basic validation
            if (!name || !email || !message) {
                showNotification('Please fill in all required fields (Name, Email, Message).', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            if (!subject) {
                showNotification('Please select a subject for your inquiry.', 'error');
                return;
            }
            
            // Simulate form submission
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            setTimeout(() => {
                showNotification('Thank you for your academic inquiry! I will respond within 24-48 hours.', 'success');
                contactForm.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showNotification(message, type) {
        // Remove any existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notif => notif.remove());
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.textContent = message;
        
        // Get theme-appropriate colors
        const isDark = document.body.getAttribute('data-color-scheme') === 'dark';
        const successColor = isDark ? '#32b8c8' : '#218291';
        const errorColor = isDark ? '#ff5459' : '#c0152f';
        const textColor = isDark ? '#f5f5f5' : '#ffffff';
        
        // Style the notification
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? successColor : errorColor};
            color: ${textColor};
            padding: 16px 24px;
            border-radius: 8px;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
            z-index: 10000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            max-width: 350px;
            word-wrap: break-word;
            font-weight: 500;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 5000);
    }

    // Scroll Animations for Sections
    function animateOnScroll() {
        const elements = document.querySelectorAll('.fade-in:not(.animate)');
        const triggerBottom = window.innerHeight / 5 * 4;
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < triggerBottom) {
                element.classList.add('animate');
            }
        });
    }
    
    // Add fade-in class to sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('fade-in');
    });
    
    window.addEventListener('scroll', animateOnScroll);

    // Header Background on Scroll
    const header = document.querySelector('.header');
    
    function updateHeaderBackground() {
        const isDark = document.body.getAttribute('data-color-scheme') === 'dark';
        
        if (window.scrollY > 100) {
            header.style.background = isDark ? 
                'rgba(38, 40, 40, 0.98)' : 'rgba(19, 52, 59, 0.98)';
        } else {
            header.style.background = isDark ?
                'rgba(38, 40, 40, 0.95)' : 'rgba(19, 52, 59, 0.95)';
        }
    }
    
    window.addEventListener('scroll', updateHeaderBackground);
    
    // Logo click to scroll to top
    const logo = document.querySelector('.nav__brand h2');
    if (logo) {
        logo.style.cursor = 'pointer';
        logo.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // CTA Button Smooth Scrolling
    const ctaButtons = document.querySelectorAll('.hero__actions .btn');
    ctaButtons.forEach(button => {
        if (button.getAttribute('href') && button.getAttribute('href').startsWith('#')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetSection.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        }
    });

    // Parallax effect for hero background
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const heroBackground = document.querySelector('.hero__bg');
        
        if (heroBackground && scrolled <= window.innerHeight) {
            heroBackground.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    }
    
    window.addEventListener('scroll', updateParallax);

    // Publication Cards Animation
    const publicationCards = document.querySelectorAll('.publication__card');
    function animatePublications() {
        const triggerBottom = window.innerHeight / 5 * 4;
        
        publicationCards.forEach((card, index) => {
            const cardTop = card.getBoundingClientRect().top;
            
            if (cardTop < triggerBottom && !card.classList.contains('animate')) {
                setTimeout(() => {
                    card.classList.add('animate');
                    card.style.transform = 'translateX(0)';
                    card.style.opacity = '1';
                }, index * 200);
            }
        });
    }
    
    // Initialize publication cards with animation preparation
    publicationCards.forEach(card => {
        card.style.transform = 'translateX(-30px)';
        card.style.opacity = '0';
        card.style.transition = 'all 0.6s ease';
    });
    
    window.addEventListener('scroll', animatePublications);

    // Course Cards Animation
    const courseCards = document.querySelectorAll('.course__card');
    function animateCourses() {
        const triggerBottom = window.innerHeight / 5 * 4;
        
        courseCards.forEach((card, index) => {
            const cardTop = card.getBoundingClientRect().top;
            
            if (cardTop < triggerBottom && !card.classList.contains('animate')) {
                setTimeout(() => {
                    card.classList.add('animate');
                    card.style.transform = 'translateY(0)';
                    card.style.opacity = '1';
                }, index * 100);
            }
        });
    }
    
    // Initialize course cards with animation preparation
    courseCards.forEach(card => {
        card.style.transform = 'translateY(20px)';
        card.style.opacity = '0';
        card.style.transition = 'all 0.5s ease';
    });
    
    window.addEventListener('scroll', animateCourses);

    // Project Cards Animation
    const projectCards = document.querySelectorAll('.project-card');
    function animateProjects() {
        const triggerBottom = window.innerHeight / 5 * 4;
        
        projectCards.forEach((card, index) => {
            const cardTop = card.getBoundingClientRect().top;
            
            if (cardTop < triggerBottom && !card.classList.contains('animate')) {
                setTimeout(() => {
                    card.classList.add('animate');
                    card.style.transform = 'translateY(0) scale(1)';
                    card.style.opacity = '1';
                }, index * 150);
            }
        });
    }
    
    // Initialize project cards with animation preparation
    projectCards.forEach(card => {
        card.style.transform = 'translateY(30px) scale(0.95)';
        card.style.opacity = '0';
        card.style.transition = 'all 0.6s ease';
    });
    
    window.addEventListener('scroll', animateProjects);

    // Academic Links Hover Effects
    const academicLinks = document.querySelectorAll('.academic-link');
    academicLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Language Cards Animation
    const languageCards = document.querySelectorAll('.language__card');
    function animateLanguages() {
        const triggerBottom = window.innerHeight / 5 * 4;
        
        languageCards.forEach((card, index) => {
            const cardTop = card.getBoundingClientRect().top;
            
            if (cardTop < triggerBottom && !card.classList.contains('animate')) {
                setTimeout(() => {
                    card.classList.add('animate');
                    card.style.transform = 'translateY(0)';
                    card.style.opacity = '1';
                }, index * 100);
            }
        });
    }
    
    // Initialize language cards with animation preparation
    languageCards.forEach(card => {
        card.style.transform = 'translateY(20px)';
        card.style.opacity = '0';
        card.style.transition = 'all 0.6s ease';
    });
    
    window.addEventListener('scroll', animateLanguages);

    // Initialize all functionality
    setTimeout(() => {
        updateActiveNavLink();
        animateOnScroll();
        animateSkills();
        animatePublications();
        animateCourses();
        animateProjects();
        animateLanguages();
        updateHeaderBackground();
        
        // Initialize theme
        const currentTheme = body.getAttribute('data-color-scheme') || 'light';
        updateThemeIcon(currentTheme);
    }, 100);

 // WORKING CONTACT BUTTONS - NEW CODE
function fixContactButtons() {
    console.log('🔧 Fixing contact buttons...');
    
    setTimeout(() => {
        const allLinks = document.querySelectorAll('.academic-link, a');
        let fixedCount = 0;
        
        allLinks.forEach(link => {
            const linkText = link.textContent.toLowerCase().trim();
            
            // Gmail Button
            if (linkText.includes('gmail') || linkText.includes('📧')) {
                console.log('📧 Fixing Gmail button...');
                link.href = 'mailto:jaiaakaash06@gmail.com?subject=Research%20Collaboration%20Inquiry&body=Dear%20Jai%20Aakaash%2C%0A%0AI%20am%20interested%20in%20discussing%20research%20opportunities...';
                link.onclick = function() {
                    console.log('✅ Gmail clicked!');
                    showNotification('Opening email client...', 'success');
                    return true;
                };
                fixedCount++;
            }
            
            // GitHub Button  
            else if (linkText.includes('github') || linkText.includes('🐙')) {
                console.log('🐙 Fixing GitHub button...');
                link.href = 'https://github.com/JaiAakaash';
                link.target = '_blank';
                link.rel = 'noopener noreferrer';
                link.onclick = function() {
                    console.log('✅ GitHub clicked! Opening:', this.href);
                    showNotification('Opening GitHub profile...', 'success');
                    return true;
                };
                fixedCount++;
            }
            
            // LinkedIn Button
            else if (linkText.includes('linkedin') || linkText.includes('💼')) {
                console.log('💼 Fixing LinkedIn button...');
                link.href = 'https://www.linkedin.com/in/jai-aakaash-119834274/';
                link.target = '_blank'; 
                link.rel = 'noopener noreferrer';
                link.onclick = function() {
                    console.log('✅ LinkedIn clicked! Opening:', this.href);
                    showNotification('Opening LinkedIn profile...', 'success');
                    return true;
                };
                fixedCount++;
            }
        });
        
        console.log(`✅ Contact buttons fixed! (${fixedCount} buttons updated)`);
    }, 1000);
}

// Call the fix function
fixContactButtons();

// Backup fix on window load
window.addEventListener('load', fixContactButtons);


    // Handle info notifications
    function showInfoNotification(message) {
        const notification = document.createElement('div');
        notification.textContent = message;
        
        const isDark = document.body.getAttribute('data-color-scheme') === 'dark';
        const infoColor = isDark ? '#a7a9a9' : '#626c71';
        const textColor = isDark ? '#f5f5f5' : '#ffffff';
        
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${infoColor};
            color: ${textColor};
            padding: 16px 24px;
            border-radius: 8px;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
            z-index: 10000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            max-width: 300px;
            word-wrap: break-word;
            font-weight: 500;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // Global click handler to close mobile menu
    document.addEventListener('click', function(e) {
        if (navMenu && navToggle) {
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        }
    });
    
    console.log('AI/ML Academic Portfolio loaded successfully! 🎓🤖');
});
