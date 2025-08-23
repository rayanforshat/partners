// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Get all navigation buttons and clinic sections
    const navButtons = document.querySelectorAll('.nav-btn');
    const clinicSections = document.querySelectorAll('.clinic-section');
    
    // Add click event listeners to navigation buttons
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Get the target clinic from data attribute
            const targetClinic = this.getAttribute('data-clinic');
            
            // Remove active class from all buttons
            navButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Hide all clinic sections
            clinicSections.forEach(section => {
                section.classList.remove('active');
            });
            
            // Show target clinic section
            const targetSection = document.getElementById(targetClinic);
            if (targetSection) {
                targetSection.classList.add('active');
            }
            
            // Scroll to top of section smoothly
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });
    
    // Add hover effects to service items
    const serviceItems = document.querySelectorAll('.service-item');
    
    serviceItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click tracking for social media links
    const socialLinks = document.querySelectorAll('.social-icon');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Add animation effect
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // Add scroll animation for elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all service items for animation
    serviceItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });
    
    // Add smooth scrolling to page
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Add keyboard navigation support
    navButtons.forEach((button, index) => {
        button.addEventListener('keydown', function(e) {
            let nextIndex;
            
            switch(e.key) {
                case 'ArrowRight':
                    nextIndex = (index - 1 + navButtons.length) % navButtons.length;
                    navButtons[nextIndex].focus();
                    e.preventDefault();
                    break;
                case 'ArrowLeft':
                    nextIndex = (index + 1) % navButtons.length;
                    navButtons[nextIndex].focus();
                    e.preventDefault();
                    break;
                case 'Enter':
                case ' ':
                    this.click();
                    e.preventDefault();
                    break;
            }
        });
    });
    
    // Add loading animation
    const container = document.querySelector('.container');
    container.style.opacity = '0';
    container.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        container.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        container.style.opacity = '1';
        container.style.transform = 'translateY(0)';
    }, 100);
    
    // Add price highlight animation
    const partnerPrices = document.querySelectorAll('.partner-price');
    
    partnerPrices.forEach(price => {
        price.addEventListener('mouseenter', function() {
            this.style.textShadow = '0 0 10px rgba(54, 129, 132, 0.5)';
            this.style.fontSize = '1.4rem';
        });
        
        price.addEventListener('mouseleave', function() {
            this.style.textShadow = '';
            this.style.fontSize = '1.3rem';
        });
    });
    
    // Add note card animation
    const noteCard = document.querySelector('.note-card');
    if (noteCard) {
        noteCard.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
        });
        
        noteCard.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }
    
    // Console log for debugging
    console.log('الفرشاة كلينك - الموقع محمل بنجاح');
    console.log('عدد خدمات الأسنان:', document.querySelectorAll('#dental .service-item').length);
    console.log('عدد خدمات الجلدية:', document.querySelectorAll('#dermatology .service-item').length);
    console.log('عدد خدمات التغذية:', document.querySelectorAll('#nutrition .service-item').length);
});

// Additional utility functions

// Function to calculate savings
function calculateSavings(originalPrice, partnerPrice) {
    return originalPrice - partnerPrice;
}

// Function to calculate discount percentage
function calculateDiscountPercentage(originalPrice, partnerPrice) {
    return Math.round(((originalPrice - partnerPrice) / originalPrice) * 100);
}

// Function to format currency
function formatCurrency(amount) {
    return amount.toLocaleString('ar-SA') + ' ريال';
}

// Function to add savings display (optional enhancement)
function addSavingsDisplay() {
    const serviceItems = document.querySelectorAll('.service-item');
    
    serviceItems.forEach(item => {
        const originalPriceText = item.querySelector('.original-price').textContent;
        const partnerPriceText = item.querySelector('.partner-price').textContent;
        
        // Extract numbers from price text
        const originalPrice = parseInt(originalPriceText.replace(/[^\d]/g, ''));
        const partnerPrice = parseInt(partnerPriceText.replace(/[^\d]/g, ''));
        
        if (originalPrice > 0 && partnerPrice > 0) {
            const savings = calculateSavings(originalPrice, partnerPrice);
            const discountPercentage = calculateDiscountPercentage(originalPrice, partnerPrice);
            
            // Create savings element
            const savingsElement = document.createElement('div');
            savingsElement.className = 'savings-info';
            savingsElement.innerHTML = `
                <span class="savings-amount">وفر ${formatCurrency(savings)}</span>
                <span class="discount-percentage">(${discountPercentage}% خصم)</span>
            `;
            
            item.querySelector('.price-container').appendChild(savingsElement);
        }
    });
}

// Function to handle mobile menu toggle (if needed in future)
function toggleMobileMenu() {
    const nav = document.querySelector('.clinic-nav');
    nav.classList.toggle('mobile-open');
}

// Function to handle search functionality (future enhancement)
function searchServices(searchTerm) {
    const serviceItems = document.querySelectorAll('.service-item');
    const searchLower = searchTerm.toLowerCase();
    
    serviceItems.forEach(item => {
        const serviceName = item.querySelector('.service-name').textContent.toLowerCase();
        
        if (serviceName.includes(searchLower)) {
            item.style.display = 'block';
            item.style.animation = 'fadeIn 0.5s ease-in-out';
        } else {
            item.style.display = 'none';
        }
    });
}

// Function to reset search results
function resetSearch() {
    const serviceItems = document.querySelectorAll('.service-item');
    serviceItems.forEach(item => {
        item.style.display = 'block';
    });
}

// Function to handle print functionality
function printPriceList() {
    const printWindow = window.open('', '_blank');
    const currentSection = document.querySelector('.clinic-section.active');
    const sectionTitle = currentSection.querySelector('.section-title').textContent;
    
    printWindow.document.write(`
        <html>
        <head>
            <title>الفرشاة كلينك - ${sectionTitle}</title>
            <style>
                body { font-family: Arial, sans-serif; direction: rtl; }
                .service-item { margin: 10px 0; padding: 10px; border: 1px solid #ddd; }
                .service-name { font-weight: bold; margin-bottom: 5px; }
                .price-info { color: #666; }
            </style>
        </head>
        <body>
            <h1>الفرشاة كلينك - ${sectionTitle}</h1>
            ${currentSection.innerHTML}
        </body>
        </html>
    `);
    
    printWindow.document.close();
    printWindow.print();
}

// Error handling for missing elements
function handleMissingElements() {
    const requiredElements = ['.nav-btn', '.clinic-section', '.service-item'];
    
    requiredElements.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        if (elements.length === 0) {
            console.warn(`تحذير: لم يتم العثور على العناصر: ${selector}`);
        }
    });
}

// Initialize additional features when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    handleMissingElements();
    
    // Uncomment the following line if you want to add savings display
    // addSavingsDisplay();
});