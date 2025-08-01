document.addEventListener('DOMContentLoaded', initializeApp);

function initializeApp() {
    initializeMobileMenu();
    initializeSkillTags();
    initializeScrollToTop();
    initializeTimeline();
    initializeCertificates();
    initializeNavigation();
    initializeScrollIndicator();
    initializeFadeEffects();
    initializeModals();
    initializeContactForm();
}

// Mobile Menu Functionality
function initializeMobileMenu() {
    const mobileMenuButton = document.querySelector('.mobile-menu');
    const nav = document.querySelector('nav');

    if (!mobileMenuButton || !nav) return;

    mobileMenuButton.addEventListener('click', () => {
        nav.classList.toggle('active');
        mobileMenuButton.classList.toggle('active');
    });

    // Close mobile menu when clicking links
    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            mobileMenuButton.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) &&
            !mobileMenuButton.contains(e.target) &&
            nav.classList.contains('active')) {
            nav.classList.remove('active');
            mobileMenuButton.classList.remove('active');
        }
    });
}

// Skill Tags Animation
function initializeSkillTags() {
    document.querySelectorAll('.skill-tag').forEach(tag => {
        tag.addEventListener('mouseover', () => tag.style.transform = 'scale(1.1)');
        tag.addEventListener('mouseout', () => tag.style.transform = 'scale(1)');
    });
}

// Scroll to Top Button
function initializeScrollToTop() {
    const scrollBtn = document.createElement('button');
    scrollBtn.textContent = 'Top';
    scrollBtn.className = 'scroll-top-btn';
    scrollBtn.style.display = 'none';
    document.body.appendChild(scrollBtn);

    window.addEventListener('scroll', () => {
        scrollBtn.style.display = window.pageYOffset > 300 ? 'block' : 'none';
    });

    scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Contact Form Functionality
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    // Form submission is handled by the DOMContentLoaded listener below
    // This function is kept for compatibility but doesn't add event listeners
}

function showContactSuccess() {
    // Create success message element
    const successMessage = document.createElement('div');
    successMessage.className = 'contact-success';
    successMessage.innerHTML = `
        <div class="success-content">
            <i class="fas fa-check-circle"></i>
            <h4>Message Sent Successfully!</h4>
            <p>Thank you for reaching out. I'll get back to you soon!</p>
        </div>
    `;
    
    // Add styles
    successMessage.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #00C6FF 0%, #0072FF 100%);
        color: white;
        padding: 1.5rem;
        border-radius: 12px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    successMessage.querySelector('.success-content').style.cssText = `
        text-align: center;
    `;
    
    successMessage.querySelector('i').style.cssText = `
        font-size: 2rem;
        margin-bottom: 0.5rem;
        display: block;
    `;
    
    successMessage.querySelector('h4').style.cssText = `
        margin: 0 0 0.5rem 0;
        font-size: 1.1rem;
    `;
    
    successMessage.querySelector('p').style.cssText = `
        margin: 0;
        font-size: 0.9rem;
        opacity: 0.9;
    `;
    
    // Add to page
    document.body.appendChild(successMessage);
    
    // Animate in
    setTimeout(() => {
        successMessage.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        successMessage.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(successMessage);
        }, 300);
    }, 5000);
}

// Enhanced Email Copy Functionality for Contact Section
function copyEmail() {
    const email = 'saisannidhs@gmail.com';
    const buttons = document.querySelectorAll('.copy-button, .copy-email-btn');

    navigator.clipboard.writeText(email).then(() => {
        buttons.forEach(button => {
            if (!button) return;

            const originalText = button.innerHTML;
            button.innerHTML = '<i class="fas fa-check"></i> Email Copied!';
            button.style.background = 'var(--accent-color)';
            button.style.color = 'white';

            setTimeout(() => {
                button.innerHTML = originalText;
                button.style.background = '';
                button.style.color = '';
            }, 2000);
        });
    }).catch(err => {
        console.error('Failed to copy email:', err);
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = email;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        
        // Show success message
        buttons.forEach(button => {
            if (!button) return;
            const originalText = button.innerHTML;
            button.innerHTML = '<i class="fas fa-check"></i> Email Copied!';
            setTimeout(() => {
                button.innerHTML = originalText;
            }, 2000);
        });
    });
}

// Timeline Animation
function initializeTimeline() {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }
            });
        },
        { threshold: 0.5 }
    );

    document.querySelectorAll('.timeline-item').forEach(item => {
        observer.observe(item);
    });
}

// Certificates Section
function initializeCertificates() {
    const loadMoreBtn = document.getElementById('load-more');
    if (!loadMoreBtn) return;

    loadMoreBtn.addEventListener('click', () => {
        document.getElementById('more-certificates')?.classList.toggle('hidden');
        loadMoreBtn.style.display = 'none';
    });
}

// Email Copy Functionality (removed duplicate - using the enhanced version above)

// Navigation Highlighting
function initializeNavigation() {
    const sections = document.querySelectorAll('main section');
    const navLinks = document.querySelectorAll('nav a');
    const header = document.querySelector('header');

    if (!header) return;

    function updateActiveSection() {
        const scrollPosition = window.scrollY + header.offsetHeight + 50;

        sections.forEach(section => {
            const id = section.getAttribute('id');
            if (!id) return;

            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                navLinks.forEach(link => link.classList.remove('active'));
                const activeLink = document.querySelector(`nav a[href="#${id}"]`);
                activeLink?.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveSection);
    updateActiveSection(); // Initial check
}

// Scroll Indicator
function initializeScrollIndicator() {
    const scrollIndicator = document.getElementById('scrollIndicator');
    if (!scrollIndicator) return;

    window.addEventListener('scroll', () => {
        scrollIndicator.classList.toggle('hidden', window.scrollY > 100);
    });
}

// Fade-in Effects
function initializeFadeEffects() {
    const fadeObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    fadeObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1 }
    );

    document.querySelectorAll('.fade-in').forEach(element => {
        fadeObserver.observe(element);
    });
}

// Modal Functionality
function initializeModals() {
    const modals = document.querySelectorAll('.modal');
    const readMoreBtns = document.querySelectorAll('.read-more-btn');
    const closeBtns = document.querySelectorAll('.close');

    function openModal(modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        positionModal(modal);
    }

    function closeModal(modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    function closeAllModals() {
        modals.forEach(closeModal);
    }

    function positionModal(modal) {
        const modalContent = modal.querySelector('.modal-content');
        if (!modalContent) return;

        const windowHeight = window.innerHeight;
        const modalHeight = modalContent.offsetHeight;

        if (modalHeight > windowHeight) {
            modal.style.alignItems = 'flex-start';
            modalContent.style.marginTop = '20px';
            modalContent.style.marginBottom = '20px';
        } else {
            modal.style.alignItems = 'center';
            modalContent.style.margin = '0';
        }
    }

    readMoreBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const projectCard = btn.closest('.project-card');
            const projectId = projectCard?.dataset.project;
            const modal = projectId ? document.getElementById(`modal-${projectId}`) : null;
            if (modal) openModal(modal);
        });
    });

    closeBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const modal = btn.closest('.modal');
            if (modal) closeModal(modal);
        });
    });

    document.addEventListener('click', (event) => {
        if (!event.target.closest('.modal-content') &&
            !event.target.closest('.read-more-btn')) {
            closeAllModals();
        }
    });

    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal(modal);
        });
    });

    window.addEventListener('resize', () => {
        modals.forEach(modal => {
            if (modal.classList.contains('active')) {
                positionModal(modal);
            }
        });
    });
}



document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    if (!form) return;

    // Add loading state to submit button
    const submitBtn = form.querySelector('.submit-btn');
    const originalBtnText = submitBtn.innerHTML;

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        const formData = new FormData(form);

        fetch('https://formsubmit.co/ajax/2cb9bef7ee110c6765f59788afbf3db5', {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success === 'true') {
                // ✅ Show your success popup here
                showContactSuccess();

                // Reset the form
                form.reset();
            } else {
                showContactError('Something went wrong. Please try again.');
            }
        })
        .catch(error => {
            showContactError('Unable to send message. Please check your connection and try again.');
            console.error(error);
        })
        .finally(() => {
            // Reset button state
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        });
    });
});

// Add error notification function
function showContactError(message) {
    const errorMessage = document.createElement('div');
    errorMessage.className = 'contact-error';
    errorMessage.innerHTML = `
        <div class="error-content">
            <i class="fas fa-exclamation-circle"></i>
            <h4>Error</h4>
            <p>${message}</p>
        </div>
    `;
    
    // Add styles
    errorMessage.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%);
        color: white;
        padding: 1.5rem;
        border-radius: 12px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    errorMessage.querySelector('.error-content').style.cssText = `
        text-align: center;
    `;
    
    errorMessage.querySelector('i').style.cssText = `
        font-size: 2rem;
        margin-bottom: 0.5rem;
        display: block;
    `;
    
    errorMessage.querySelector('h4').style.cssText = `
        margin: 0 0 0.5rem 0;
        font-size: 1.1rem;
    `;
    
    errorMessage.querySelector('p').style.cssText = `
        margin: 0;
        font-size: 0.9rem;
        opacity: 0.9;
    `;
    
    // Add to page
    document.body.appendChild(errorMessage);
    
    // Animate in
    setTimeout(() => {
        errorMessage.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        errorMessage.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(errorMessage);
        }, 300);
    }, 5000);
}
