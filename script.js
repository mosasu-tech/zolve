// ============================================
// ZOLVE - EDUCATION LOAN LANDING PAGE
// JavaScript for Interactivity & Functionality
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // NAVBAR SCROLL EFFECT
    // ============================================
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('shadow-sm');
        } else {
            navbar.classList.remove('shadow-sm');
        }
    });

    // ============================================
    // SMOOTH SCROLLING FOR NAVIGATION LINKS
    // ============================================
    const navLinks = document.querySelectorAll('.navbar-nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Get the target section
            const targetId = this.getAttribute('href');
            
            // Only prevent default if it's a valid section link
            if (targetId.startsWith('#') && targetId !== '#') {
                e.preventDefault();
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerHeight = document.querySelector('.navbar').offsetHeight;
                    const elementPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: elementPosition,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    if (navbarCollapse.classList.contains('show')) {
                        const toggleButton = document.querySelector('.navbar-toggler');
                        toggleButton.click();
                    }
                }
            }
        });
    });

    // ============================================
    // ELIGIBILITY FORM HANDLING
    // ============================================
    const eligibilityForm = document.getElementById('eligibilityForm');
    
    if (eligibilityForm) {
        eligibilityForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const country = document.getElementById('country').value;
            const loanAmount = document.getElementById('loanAmount').value;
            
            // Validation
            if (!name || !email || !phone || !country || !loanAmount) {
                showAlert('Please fill in all fields', 'warning');
                return;
            }
            
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showAlert('Please enter a valid email address', 'warning');
                return;
            }
            
            // Validate phone number (basic validation)
            if (phone.replace(/\D/g, '').length < 10) {
                showAlert('Please enter a valid phone number', 'warning');
                return;
            }
            
            // Simulate API call
            const submitButton = eligibilityForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.disabled = true;
            submitButton.textContent = 'Checking Eligibility...';
            
            setTimeout(() => {
                // Simulate eligibility calculation
                const loanAmountNum = parseInt(loanAmount);
                let eligibilityScore = Math.random() * 100;
                
                // Adjust score based on loan amount
                if (loanAmountNum > 1500000) {
                    eligibilityScore -= 10;
                }
                
                // Show result
                const modal = bootstrap.Modal.getInstance(document.getElementById('eligibilityModal'));
                modal.hide();
                
                showEligibilityResult(name, eligibilityScore, country, loanAmount);
                
                // Reset form
                eligibilityForm.reset();
                submitButton.disabled = false;
                submitButton.textContent = originalText;
            }, 2000);
        });
    }

    // ============================================
    // HERO LEAD FORM HANDLING
    // ============================================
    const heroLeadForm = document.getElementById('heroLeadForm');
    if (heroLeadForm) {
        heroLeadForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('heroName').value;
            const email = document.getElementById('heroEmail').value;
            const phone = document.getElementById('heroPhone').value;
            const country = document.getElementById('heroCountry').value;
            const loanAmount = document.getElementById('heroLoanAmount').value;

            if (!name || !email || !phone || !country || !loanAmount) {
                showAlert('Please fill all fields in the form', 'warning');
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showAlert('Please enter a valid email address', 'warning');
                return;
            }

            if (phone.replace(/\D/g, '').length < 10) {
                showAlert('Please enter a valid phone number', 'warning');
                return;
            }

            const submitBtn = heroLeadForm.querySelector('button[type="submit"]');
            const orig = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Checking...';

            setTimeout(() => {
                const loanAmountNum = parseInt(loanAmount);
                let eligibilityScore = Math.random() * 100;
                if (loanAmountNum > 1500000) eligibilityScore -= 10;

                showEligibilityResult(name, eligibilityScore, country, loanAmount);

                heroLeadForm.reset();
                submitBtn.disabled = false;
                submitBtn.textContent = orig;
            }, 1500);
        });
    }

    // ============================================
    // ALERT SYSTEM
    // ============================================
    function showAlert(message, type = 'info') {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
        alertDiv.style.cssText = 'top: 80px; right: 20px; z-index: 9999; min-width: 300px;';
        alertDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        document.body.appendChild(alertDiv);
        
        // Auto-dismiss after 4 seconds
        setTimeout(() => {
            alertDiv.remove();
        }, 4000);
    }

    // ============================================
    // ELIGIBILITY RESULT DISPLAY
    // ============================================
    function showEligibilityResult(name, score, country, amount) {
        // Create modal for result
        const resultHTML = `
            <div class="modal fade" id="resultModal" tabindex="-1">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header border-0 bg-success-light">
                            <h5 class="modal-title">Your Eligibility Result</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body text-center py-5">
                            <h6 class="mb-3">Hi <strong>${name}</strong>,</h6>
                            <div class="mb-4">
                                <div style="width: 150px; height: 150px; border-radius: 50%; background: linear-gradient(135deg, #00D084 0%, #00B870 100%); margin: 0 auto; display: flex; align-items: center; justify-content: center;">
                                    <span style="font-size: 2.5rem; color: white; font-weight: 700;">${Math.round(score)}%</span>
                                </div>
                            </div>
                            <h4 class="mb-3">You're ${score > 70 ? 'Highly' : score > 50 ? 'Moderately' : 'Potentially'} Eligible!</h4>
                            <div class="alert alert-info">
                                <strong>Destination:</strong> ${capitalizeCountry(country)}<br>
                                <strong>Loan Amount:</strong> ₹${parseInt(amount).toLocaleString('en-IN')}
                            </div>
                            <p class="text-muted">Our loan experts will contact you shortly to discuss personalized loan options and help you get the best rates.</p>
                        </div>
                        <div class="modal-footer border-0">
                            <button type="button" class="btn btn-success w-100" data-bs-dismiss="modal">Proceed to Application</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Remove existing modal if any
        const existingModal = document.getElementById('resultModal');
        if (existingModal) {
            existingModal.remove();
        }
        
        // Add new modal to body
        document.body.insertAdjacentHTML('beforeend', resultHTML);
        
        // Show modal
        const resultModal = new bootstrap.Modal(document.getElementById('resultModal'));
        resultModal.show();
        
        // Remove modal from DOM when hidden
        document.getElementById('resultModal').addEventListener('hidden.bs.modal', function() {
            this.remove();
        });
    }

    // ============================================
    // UTILITY FUNCTIONS
    // ============================================
    function capitalizeCountry(code) {
        const countries = {
            'usa': 'United States',
            'uk': 'United Kingdom',
            'canada': 'Canada',
            'australia': 'Australia',
            'germany': 'Germany'
        };
        return countries[code] || code;
    }

    // ============================================
    // ANIMATED COUNTERS
    // ============================================
    function animateCounters() {
        const counterElements = document.querySelectorAll('.stat-number');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const finalValue = element.textContent;
                    
                    // Extract number and suffix
                    const match = finalValue.match(/^([\d.]+)(.*)/);
                    if (match) {
                        const number = parseFloat(match[1]);
                        const suffix = match[2];
                        
                        let currentValue = 0;
                        const increment = number / 30;
                        
                        const interval = setInterval(() => {
                            currentValue += increment;
                            if (currentValue >= number) {
                                element.textContent = finalValue;
                                clearInterval(interval);
                            } else {
                                element.textContent = currentValue.toFixed(0) + suffix;
                            }
                        }, 30);
                    }
                    
                    observer.unobserve(element);
                }
            });
        }, { threshold: 0.5 });
        
        counterElements.forEach(element => {
            observer.observe(element);
        });
    }

    // ============================================
    // INTERSECTION OBSERVER FOR ANIMATIONS
    // ============================================
    function observeElements() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        document.querySelectorAll('.feature-card, .loan-card, .testimonial-card, .benefit-item').forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(element);
        });
    }

    // Observe infographic steps and add 'visible' class when in view
    function observeInfographic() {
        const steps = document.querySelectorAll('.infographic-step, .process-step');
        if (!steps.length) return;

        const obs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.45 });

        steps.forEach(step => {
            obs.observe(step);
        });
    }

    // ============================================
    // FORM VALIDATION
    // ============================================
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const inputs = form.querySelectorAll('input[required], select[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value) {
                    input.classList.add('is-invalid');
                    isValid = false;
                } else {
                    input.classList.remove('is-invalid');
                }
            });
            
            if (!isValid) {
                e.preventDefault();
            }
        });
    });

    // ============================================
    // BUTTON HOVER EFFECTS
    // ============================================
    const buttons = document.querySelectorAll('button.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // ============================================
    // INITIALIZE FUNCTIONS
    // ============================================
    animateCounters();
    observeElements();
    observeInfographic();

    // ============================================
    // MODAL BUTTON CLICK HANDLERS
    // ============================================
    const applyButtons = document.querySelectorAll('[data-bs-toggle="modal"]');
    applyButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Optional: Add tracking or analytics here
            console.log('User initiated eligibility check');
        });
    });

    // ============================================
    // LEARN MORE BUTTON
    // ============================================
    const learnMoreButton = document.querySelector('.btn-outline-primary');
    if (learnMoreButton) {
        learnMoreButton.addEventListener('click', function() {
            // Smooth scroll to why section
            const whySection = document.getElementById('why');
            if (whySection) {
                const headerHeight = document.querySelector('.navbar').offsetHeight;
                const elementPosition = whySection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: elementPosition,
                    behavior: 'smooth'
                });
            }
        });
    }

    // ============================================
    // KEYBOARD NAVIGATION
    // ============================================
    document.addEventListener('keydown', function(e) {
        // Close modal on Escape
        if (e.key === 'Escape') {
            const modals = document.querySelectorAll('.modal.show');
            modals.forEach(modal => {
                bootstrap.Modal.getInstance(modal)?.hide();
            });
        }
    });

    // ============================================
    // PERFORMANCE: LAZY LOAD IMAGES
    // ============================================
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // ============================================
    // ANALYTICS TRACKING (Optional)
    // ============================================
    function trackEvent(eventName, eventData = {}) {
        // Replace with your analytics service
        console.log(`Event: ${eventName}`, eventData);
    }

    // Track section views
    const sections = document.querySelectorAll('section[id]');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                trackEvent('section_view', { section: entry.target.id });
            }
        });
    }, { threshold: 0.3 });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // ============================================
    // CONSOLE LOG FOR DEBUGGING
    // ============================================
    console.log('Zolve Education Loan Landing Page - Loaded Successfully');
});

// ============================================
// UTILITY: Add active class to nav items based on scroll
// ============================================
window.addEventListener('scroll', function() {
    const navLinks = document.querySelectorAll('.navbar-nav a[href^="#"]');
    
    navLinks.forEach(link => {
        const targetId = link.getAttribute('href');
        if (targetId.startsWith('#') && targetId !== '#') {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const rect = targetElement.getBoundingClientRect();
                const navHeight = document.querySelector('.navbar').offsetHeight;
                
                if (rect.top <= navHeight && rect.bottom >= navHeight) {
                    navLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                }
            }
        }
    });
});
