document.addEventListener('DOMContentLoaded', function() {
    // Side menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const sideMenu = document.querySelector('.side-menu');
    const mainContent = document.querySelector('.main-content');
    const menuItems = document.querySelectorAll('.side-menu a');

    if (menuToggle && sideMenu && mainContent) {
        menuToggle.addEventListener('click', function() {
            sideMenu.classList.toggle('collapsed');
            mainContent.classList.toggle('expanded');
            const icon = this.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-chevron-left');
                icon.classList.toggle('fa-chevron-right');
            }
        });
    }

    // Close menu when a link is clicked on mobile
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            if (window.innerWidth <= 768 && sideMenu && mainContent) {
                sideMenu.classList.add('collapsed');
                mainContent.classList.add('expanded');
            }
        });
    });

    // Smooth scrolling for all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active menu item highlight
    const sections = document.querySelectorAll('section');
    
    function setActiveMenuItem() {
        let index = sections.length;

        while(--index && window.scrollY + 50 < sections[index].offsetTop) {}
        
        menuItems.forEach((item) => item.classList.remove('active'));
        if (menuItems[index]) {
            menuItems[index].classList.add('active');
        }
    }

    window.addEventListener('scroll', setActiveMenuItem);

    // Hero section background slideshow
    const hero = document.querySelector('.hero');
    const heroImages = [
        'images/bernd19.jpg',
        'images/bernd18.jpg',
        'images/bernd15.jpg'
    ];
    let currentHeroIndex = 0;

    function changeHeroBackground() {
        if (hero) {
            hero.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${heroImages[currentHeroIndex]}')`;
        }
    }

    function nextHeroImage() {
        currentHeroIndex = (currentHeroIndex + 1) % heroImages.length;
        changeHeroBackground();
    }

    changeHeroBackground(); // Set initial background
    setInterval(nextHeroImage, 5000); // Change every 5 seconds

    // Service cards hover effect
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseover', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';
        });
        
        card.addEventListener('mouseout', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
        });
    });

    // Testimonials slider
    const testimonialsContainer = document.querySelector('.testimonials-container');
    const testimonials = document.querySelectorAll('.testimonial');
    const leftArrow = document.querySelector('.testimonial-arrows .left');
    const rightArrow = document.querySelector('.testimonial-arrows .right');
    let currentIndex = 0;

    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.style.display = i === index ? 'block' : 'none';
        });
    }

    function nextTestimonial() {
        currentIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(currentIndex);
    }

    function prevTestimonial() {
        currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentIndex);
    }

    if (leftArrow && rightArrow) {
        leftArrow.addEventListener('click', prevTestimonial);
        rightArrow.addEventListener('click', nextTestimonial);
    }

    // Initialize testimonials
    showTestimonial(currentIndex);

    // Auto-rotate testimonials
    setInterval(nextTestimonial, 5000);

    // FAQ accordion functionality
    const faqItems = document.querySelectorAll('.faq-item h3');
    
    faqItems.forEach(item => {
        item.addEventListener('click', () => {
            item.classList.toggle('active');
            const answer = item.nextElementSibling;
            if (answer) {
                answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
            }
        });
    });

    document.addEventListener('DOMContentLoaded', function() {
        // Initialize EmailJS
        (function() {
            emailjs.init("SZCe1C7cxwfC4R-bD"); // Replace with your actual EmailJS user ID
        })();
    
        // Handle form submission
        const contactForm = document.getElementById('contact-form');
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
    
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
    
            // Prepare template parameters
            const templateParams = {
                name: name,
                email: email,
                subject: subject,
                message: message
            };
    
            // Send email using EmailJS
            emailjs.send('contact_service', 'contact_form', templateParams)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    showFormMessage('Message sent successfully!', 'success');
                    contactForm.reset();
                }, function(error) {
                    console.log('FAILED...', error);
                    showFormMessage('Failed to send message. Please try again.', 'error');
                });
        });
    
        // Function to show form submission message
        function showFormMessage(message, type) {
            const formMessage = document.createElement('div');
            formMessage.id = 'form-message';
            formMessage.className = type;
            formMessage.textContent = message;
            
            const existingMessage = document.getElementById('form-message');
            if (existingMessage) {
                existingMessage.remove();
            }
            
            contactForm.appendChild(formMessage);
            
            // Remove the message after 5 seconds
            setTimeout(() => {
                formMessage.remove();
            }, 5000);
        }
    });
    
            
    // Footer section toggles for mobile view
    const footerTitles = document.querySelectorAll('.footer-section h3');
    
    footerTitles.forEach(title => {
        title.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                const content = title.nextElementSibling;
                if (content) {
                    title.classList.toggle('active');
                    if (content.style.maxHeight) {
                        content.style.maxHeight = null;
                    } else {
                        content.style.maxHeight = content.scrollHeight + "px";
                    }
                }
            }
        });
    });

    // Back to top button
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '&uarr;';
    backToTopButton.className = 'back-to-top';
    document.body.appendChild(backToTopButton);

    window.addEventListener('scroll', () => {
        backToTopButton.style.display = window.pageYOffset > 300 ? 'block' : 'none';
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Live chat functionality (placeholder)
    const liveChatButton = document.createElement('button');
    liveChatButton.innerHTML = 'Chat Now';
    liveChatButton.className = 'live-chat-button';
    const liveChatContainer = document.querySelector('.live-chat');
    if (liveChatContainer) {
        liveChatContainer.appendChild(liveChatButton);
    }

    liveChatButton.addEventListener('click', () => {
        alert('Live chat feature coming soon!');
    });

    // WhatsApp Button
    const whatsappButton = document.createElement('a');
    whatsappButton.innerHTML = '<i class="fab fa-whatsapp"></i>';
    whatsappButton.className = 'whatsapp-button';
    whatsappButton.href = 'https://wa.me/2341234567890'; // Replace with your WhatsApp number
    whatsappButton.target = '_blank';
    whatsappButton.rel = 'noopener noreferrer';
    whatsappButton.setAttribute('aria-label', 'Chat on WhatsApp');
    document.body.appendChild(whatsappButton);
});