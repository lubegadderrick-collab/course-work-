// script.js 
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const mobileMenuBtn = document.createElement('button');
    const navMenu = document.querySelector('.nav-menu');
    const navContainer = document.querySelector('.nav-container');
    
    // Only create mobile button if nav container exists
    if (navContainer && navMenu) {
        mobileMenuBtn.innerHTML = '☰';
        mobileMenuBtn.classList.add('mobile-menu-btn');
        mobileMenuBtn.style.display = 'none';
        
        navContainer.appendChild(mobileMenuBtn);

        // Show mobile menu button on small screens
        function checkScreenSize() {
            if (window.innerWidth <= 768) {
                mobileMenuBtn.style.display = 'block';
                if (!navMenu.classList.contains('active')) {
                    navMenu.style.display = 'none';
                }
            } else {
                mobileMenuBtn.style.display = 'none';
                navMenu.style.display = 'flex';
                navMenu.classList.remove('active');
            }
        }

        mobileMenuBtn.addEventListener('click', function() {
            if (navMenu.style.display === 'flex' || navMenu.classList.contains('active')) {
                navMenu.style.display = 'none';
                navMenu.classList.remove('active');
            } else {
                navMenu.style.display = 'flex';
                navMenu.classList.add('active');
            }
        });

        window.addEventListener('resize', checkScreenSize);
        checkScreenSize();
    }

    // Set active navigation link
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        // Remove active class from all links first
        link.classList.remove('active');
        
        // Set active class for current page
        if (linkHref === currentPage) {
            link.classList.add('active');
        }
        
        // Special case for index.html when on root
        if (currentPage === '' && linkHref === 'index.html') {
            link.classList.add('active');
        }
    });

    // Contact Form Validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            let isValid = true;
            let errorMessage = '';

            // Validation
            if (name.length < 2) {
                isValid = false;
                errorMessage += 'Please enter a valid name.\n';
            }

            if (!email.includes('@') || !email.includes('.')) {
                isValid = false;
                errorMessage += 'Please enter a valid email address.\n';
            }

            if (message.length < 10) {
                isValid = false;
                errorMessage += 'Please enter a message with at least 10 characters.\n';
            }

            if (isValid) {
                // Simulate form submission
                const submitBtn = contactForm.querySelector('.btn');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    alert('Thank you for your message! We will get back to you soon.');
                    contactForm.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            } else {
                alert('Please correct the following errors:\n' + errorMessage);
            }
        });
    }

    // Workout filtering functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const workoutCards = document.querySelectorAll('.workout-card');
    
    if (filterButtons.length > 0 && workoutCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Filter cards
                workoutCards.forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // Gallery modal functionality
    const galleryModal = document.getElementById('imageModal');
    if (galleryModal) {
        const modalImage = document.getElementById('modalImage');
        const modalTitle = document.getElementById('modalTitle');
        const modalDescription = document.getElementById('modalDescription');
        const modalClose = document.querySelector('.modal-close');

        // click event to all gallery items
        document.querySelectorAll('.gallery-item').forEach(item => {
            item.addEventListener('click', function() {
                const img = this.querySelector('.gallery-img');
                const title = this.querySelector('h3').textContent;
                const description = this.querySelector('p').textContent;
                
                if (modalImage && modalTitle && modalDescription) {
                    modalImage.src = img.src;
                    modalImage.alt = img.alt;
                    modalTitle.textContent = title;
                    modalDescription.textContent = description;
                    galleryModal.style.display = 'block';
                    document.body.style.overflow = 'hidden';
                }
            });
        });

        // Close modal when X is clicked
        if (modalClose) {
            modalClose.addEventListener('click', function() {
                galleryModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            });
        }

        // Close modal when clicking outside
        galleryModal.addEventListener('click', function(event) {
            if (event.target === galleryModal) {
                galleryModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && galleryModal.style.display === 'block') {
                galleryModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                const target = document.querySelector(targetId);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});

// Product details data
const productDetails = {
    'personal-training': {
        title: 'Personal Training',
        description: 'Get personalized one-on-one coaching sessions with our certified trainers. We create custom workout plans tailored to your specific goals, fitness level, and schedule.',
        features: [
            'Customized workout plans based on your goals',
            'Professional form correction and technique guidance',
            'Regular progress monitoring and adjustments',
            'Motivational support and accountability',
            'Flexible scheduling options',
            'Nutrition and lifestyle guidance'
        ],
        benefits: [
            'Faster and more effective results',
            'Learn proper techniques to prevent injuries',
            'Stay motivated and consistent',
            'Personalized attention and support',
            'Adapt workouts as you progress'
        ],
        price: '60,000 UGX per session (minimum 4 sessions)'
    },
    'group-classes': {
        title: 'Group Classes',
        description: 'Join our energetic group workouts designed for all fitness levels. Experience the motivation of training together in a fun, supportive environment.',
        features: [
            'High-Intensity Interval Training (HIIT)',
            'Yoga and Pilates for flexibility and core strength',
            'Spin cycling for cardiovascular fitness',
            'Strength training with proper form',
            'Small class sizes for individual attention',
            'Professional certified instructors'
        ],
        benefits: [
            'Cost-effective training option',
            'Community support and motivation',
            'Varied workout styles to prevent boredom',
            'Suitable for beginners to advanced',
            'Social and fun atmosphere'
        ],
        price: '15,000 UGX per class (package discounts available)'
    },
    'nutrition-coaching': {
        title: 'Nutrition Coaching',
        description: 'Transform your eating habits with personalized meal plans and expert dietary guidance. Learn how to fuel your body for optimal performance, health, and weight management.',
        features: [
            'Comprehensive diet analysis and assessment',
            'Custom meal planning based on your preferences',
            'Grocery shopping guidance and tips',
            'Healthy recipe collection and meal prep ideas',
            'Weekly progress check-ins and adjustments',
            'Lifestyle and habit coaching'
        ],
        benefits: [
            'Sustainable weight management',
            'Improved energy levels and performance',
            'Better understanding of nutrition principles',
            'Long-term healthy eating habits',
            'Support for specific dietary needs'
        ],
        price: '99,000 UGX per month (3-month commitment recommended)'
    },
    'online-coaching': {
        title: 'Online Coaching',
        description: 'Access professional fitness guidance anywhere, anytime. Our virtual training programs bring the gym experience to your home or wherever you are.',
        features: [
            'Extensive video workout library',
            'Weekly virtual check-ins with your coach',
            'Mobile app access for on-the-go training',
            'Online community support forum',
            'Progress tracking tools and metrics',
            'Flexible cancellation policy'
        ],
        benefits: [
            'Train from anywhere with internet access',
            'No commute time or gym membership fees',
            'Flexible scheduling around your life',
            'Cost-effective fitness solution',
            'Privacy and comfort of your own space'
        ],
        price: '49,000 UGX per month (cancel anytime)'
    }
};

// functions for product modals
function showProductDetails(productId) {
    const product = productDetails[productId];
    if (!product) return;

    const modalContent = document.getElementById('modalContent');
    const productModal = document.getElementById('productModal');
    
    if (!modalContent || !productModal) return;
    
    modalContent.innerHTML = `
        <div class="modal-header">
            <h2>${product.title}</h2>
        </div>
        
        <div class="modal-body">
            <div class="modal-section">
                <p>${product.description}</p>
            </div>
            
            <div class="modal-section">
                <div class="modal-features">
                    <h3>What's Included:</h3>
                    <ul class="list">
                        ${product.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>
            </div>
            
            <div class="modal-section">
                <div class="modal-benefits">
                    <h3>Key Benefits:</h3>
                    <ul class="list">
                        ${product.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
                    </ul>
                </div>
            </div>
            
            <div class="modal-section">
                <div class="modal-price">
                    <p class="price"><strong>${product.price}</strong></p>
                </div>
            </div>
        </div>
        
        <div class="modal-footer">
            <div class="modal-actions">
                <button class="btn" onclick="location.href='contact.html?service=${productId}'">
                    Get Started Now
                </button>
                <button class="btn btn-secondary" onclick="closeModal()">
                    Close
                </button>
            </div>
        </div>
    `;

    productModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const productModal = document.getElementById('productModal');
    const galleryModal = document.getElementById('imageModal');
    
    if (productModal) {
        productModal.style.display = 'none';
    }
    if (galleryModal) {
        galleryModal.style.display = 'none';
    }
    
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside (for both modals)
document.addEventListener('click', function(event) {
    const productModal = document.getElementById('productModal');
    const galleryModal = document.getElementById('imageModal');
    
    if (productModal && event.target === productModal) {
        closeModal();
    }
    if (galleryModal && event.target === galleryModal) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});

// Prevent modal from closing when clicking inside modal content
document.addEventListener('click', function(event) {
    const productModal = document.getElementById('productModal');
    const galleryModal = document.getElementById('imageModal');
    
    if (productModal && productModal.style.display === 'block') {
        const modalContent = productModal.querySelector('.modal-content');
        if (modalContent && modalContent.contains(event.target)) {
            event.stopPropagation();
        }
    }
    
    if (galleryModal && galleryModal.style.display === 'block') {
        const modalContent = galleryModal.querySelector('.modal-content');
        if (modalContent && modalContent.contains(event.target)) {
            event.stopPropagation();
        }
    }
});