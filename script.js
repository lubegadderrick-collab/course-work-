// script.js 

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const mobileMenuBtn = document.createElement('button');
    const navMenu = document.querySelector('.nav-menu');
    
    mobileMenuBtn.innerHTML = '☰';
    mobileMenuBtn.classList.add('mobile-menu-btn');
    mobileMenuBtn.style.display = 'none';
    
    document.querySelector('.nav-container').appendChild(mobileMenuBtn);

    // Show mobile menu button on small screens
    function checkScreenSize() {
        if (window.innerWidth <= 768) {
            mobileMenuBtn.style.display = 'block';
            navMenu.style.display = 'none';
        } else {
            mobileMenuBtn.style.display = 'none';
            navMenu.style.display = 'flex';
        }
    }

    mobileMenuBtn.addEventListener('click', function() {
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        navMenu.classList.toggle('active');
    });

    window.addEventListener('resize', checkScreenSize);
    checkScreenSize();

    // Set active navigation link
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
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
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    alert('Thank you for your message! We will get back to you soon.');
                    contactForm.reset();
                    submitBtn.textContent = 'Send Message';
                    submitBtn.disabled = false;
                }, 2000);
            } else {
                alert('Please correct the following errors:\n' + errorMessage);
            }
        });
    }


    // Simple workout filtering
        const filterButtons = document.querySelectorAll('.filter-btn');
        const workoutCards = document.querySelectorAll('.workout-card');
        
        if (filterButtons.length > 0) {
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

    
    // Simple Gallery Functionality
        const modal = document.getElementById('imageModal');
        const modalImage = document.getElementById('modalImage');
        const modalTitle = document.getElementById('modalTitle');
        const modalDescription = document.getElementById('modalDescription');
        const modalClose = document.querySelector('.modal-close');

        // An click event to all gallery images
        document.querySelectorAll('.gallery-item').forEach(item => {
            item.addEventListener('click', function() {
                const img = this.querySelector('.gallery-img');
                const title = this.querySelector('h3').textContent;
                const description = this.querySelector('p').textContent;
                
                modalImage.src = img.src;
                modalImage.alt = img.alt;
                modalTitle.textContent = title;
                modalDescription.textContent = description;
                modal.style.display = 'flex';
            });
        });

        // Close modal when X is clicked
        modalClose.addEventListener('click', function() {
            modal.style.display = 'none';
        });

        // Close modal when clicking outside the image
        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                modal.style.display = 'none';
            }
        });
            
                
    // Smooth scrolling for anchor links
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
});