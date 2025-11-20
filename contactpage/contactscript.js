// contactscript.js
document.addEventListener('DOMContentLoaded', function() {
    console.log('UGFit Contact page loaded');
    initContactPage();
});

function initContactPage() {
    console.log('Initializing contact page functionality...');
    
    // Add dynamic styles
    addDynamicStyles();
    
    // Initialize form validation
    initFormValidation();
    
    // Add character counter to message field
    addCharacterCounter();
    
    // Initialize free trial button
    initFreeTrialButton();
    
    console.log('Contact page initialized successfully');
}

function initFormValidation() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) {
        console.error('Contact form not found!');
        return;
    }
    
    console.log('Form validation initialized');
    
    // Real-time validation for inputs
    const inputs = contactForm.querySelectorAll('.form-control');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            clearFieldStatus(this);
            if (this.id === 'message') {
                updateCharacterCounter(this);
            }
        });
    });
    
    // Form submission handler
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log('Form submission started');
        
        if (validateForm()) {
            submitContactForm();
        } else {
            console.log('Form validation failed');
            // Shake invalid fields
            const invalidFields = contactForm.querySelectorAll('.form-control.error');
            invalidFields.forEach(field => {
                field.style.animation = 'shake 0.5s ease-in-out';
                setTimeout(() => {
                    field.style.animation = '';
                }, 500);
            });
        }
    });
}

function validateField(field) {
    const value = field.value.trim();
    const fieldId = field.id;
    let isValid = true;
    let message = '';
    
    // Clear previous validation
    clearFieldStatus(field);
    
    // Validation rules
    switch(fieldId) {
        case 'name':
            if (value.length < 2) {
                isValid = false;
                message = 'Name must be at least 2 characters long';
            } else if (!/^[a-zA-Z\s]+$/.test(value)) {
                isValid = false;
                message = 'Name can only contain letters and spaces';
            }
            break;
            
        case 'email':
            if (!value) {
                isValid = false;
                message = 'Email is required';
            } else if (!isValidEmail(value)) {
                isValid = false;
                message = 'Please enter a valid email address';
            }
            break;
            
        case 'phone':
            if (value && !isValidPhone(value)) {
                isValid = false;
                message = 'Please enter a valid phone number';
            }
            break;
            
        case 'message':
            if (!value) {
                isValid = false;
                message = 'Message is required';
            } else if (value.length < 10) {
                isValid = false;
                message = 'Message must be at least 10 characters long';
            } else if (value.length > 1000) {
                isValid = false;
                message = 'Message cannot exceed 1000 characters';
            }
            break;
    }
    
    // Apply validation styling
    if (fieldId !== 'service') {
        if (!isValid && value !== '') {
            field.classList.add('error');
            showValidationMessage(field, message, 'error');
        } else if (isValid && value !== '') {
            field.classList.add('success');
            showValidationMessage(field, '✓ Valid', 'success');
        }
    }
    
    return isValid;
}

function validateForm() {
    const contactForm = document.getElementById('contactForm');
    const requiredFields = contactForm.querySelectorAll('[required]');
    let isFormValid = true;
    
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isFormValid = false;
        }
    });
    
    return isFormValid;
}

function submitContactForm() {
    const contactForm = document.getElementById('contactForm');
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    
    console.log('Submitting contact form...');
    
    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        service: document.getElementById('service').value,
        message: document.getElementById('message').value,
        timestamp: new Date().toISOString()
    };
    
    console.log('Form data collected:', formData);
    
    // Simulate API call
    setTimeout(() => {
        // Show success message
        showSuccessMessage();
        
        // Reset form
        contactForm.reset();
        
        // Reset button
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
        
        // Clear validation
        clearAllValidation();
        
        // Reset character counter
        updateCharacterCounter(document.getElementById('message'));
        
        console.log('Form submitted successfully');
        
    }, 2000);
}

function addCharacterCounter() {
    const messageField = document.getElementById('message');
    if (!messageField) return;
    
    const charCounter = document.createElement('div');
    charCounter.className = 'char-counter';
    charCounter.textContent = '0/1000 characters';
    messageField.parentNode.appendChild(charCounter);
    
    // Initial count
    updateCharacterCounter(messageField);
}

function updateCharacterCounter(field) {
    const counter = field.parentNode.querySelector('.char-counter');
    if (!counter) return;
    
    const count = field.value.length;
    counter.textContent = `${count}/1000 characters`;
    
    // Update styles
    counter.classList.remove('warning', 'error');
    
    if (count > 900 && count <= 1000) {
        counter.classList.add('warning');
    } else if (count > 1000) {
        counter.classList.add('error');
    }
}

function initFreeTrialButton() {
    const freeTrialBtn = document.querySelector('.free-trial-section .btn');
    
    if (freeTrialBtn) {
        freeTrialBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Free trial button clicked');
            
            // Scroll to form smoothly
            document.getElementById('contactForm').scrollIntoView({ 
                behavior: 'smooth' 
            });
            
            // Highlight form
            highlightForm();
        });
    }
}

function highlightForm() {
    const contactForm = document.getElementById('contactForm');
    contactForm.style.transition = 'all 0.3s ease';
    contactForm.style.boxShadow = '0 0 0 3px rgba(33, 150, 243, 0.3)';
    
    setTimeout(() => {
        contactForm.style.boxShadow = '';
    }, 2000);
}

// Utility Functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
}

function showValidationMessage(field, message, type) {
    // Remove existing message
    const existingMessage = field.parentNode.querySelector('.validation-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new message
    const messageElement = document.createElement('div');
    messageElement.className = `validation-message ${type}`;
    messageElement.textContent = message;
    field.parentNode.appendChild(messageElement);
}

function clearFieldStatus(field) {
    field.classList.remove('error', 'success');
    const message = field.parentNode.querySelector('.validation-message');
    if (message) {
        message.remove();
    }
}

function clearAllValidation() {
    const formInputs = document.querySelectorAll('.form-control');
    formInputs.forEach(input => {
        clearFieldStatus(input);
    });
}

function showSuccessMessage() {
    const contactForm = document.getElementById('contactForm');
    
    // Remove existing success message
    const existingMessage = contactForm.parentNode.querySelector('.success-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create success message
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.innerHTML = `
        <h3>🎉 Message Sent Successfully!</h3>
        <p>Thank you for contacting UGFit. We'll get back to you within 24 hours.</p>
    `;
    
    contactForm.parentNode.insertBefore(successMessage, contactForm.nextSibling);
    successMessage.style.display = 'block';
    
    // Remove after 5 seconds
    setTimeout(() => {
        successMessage.style.display = 'none';
    }, 5000);
}

function addDynamicStyles() {
    if (document.getElementById('contact-dynamic-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'contact-dynamic-styles';
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
        
        .char-counter.warning {
            color: #ff9800;
        }
        
        .char-counter.error {
            color: #f44336;
        }
    `;
    document.head.appendChild(style);
}

// Make functions globally available
window.UGFitContact = {
    init: initContactPage,
    validateForm: validateForm
};

console.log('UGFit Contact script loaded successfully');