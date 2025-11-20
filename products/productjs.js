// products.js 
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

function showProductDetails(productId) {
    const product = productDetails[productId];
    if (!product) return;

    const modalContent = document.getElementById('modalContent');
    
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

    document.getElementById('productModal').style.display = 'block';
    
    // Prevent body scrolling when modal is open
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('productModal').style.display = 'none';
    // Restore body scrolling
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('productModal');
    if (event.target === modal) {
        closeModal();
    }
}

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});

// Prevent modal from closing when clicking inside modal content
document.addEventListener('click', function(event) {
    const modal = document.getElementById('productModal');
    const modalContent = document.querySelector('.modal-content');
    
    if (modal.style.display === 'block' && modalContent.contains(event.target)) {
        event.stopPropagation();
    }
});