// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Get all navigation buttons and clinic sections
    const navButtons = document.querySelectorAll('.nav-btn');
    const clinicSections = document.querySelectorAll('.clinic-section');
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    const clearSearchBtn = document.querySelector('.clear-search-btn');
    
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
            
            // Clear search when switching sections
            if (searchInput && searchInput.value) {
                clearSearch();
            }
            
            // Scroll to top of section smoothly
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });
    
    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.trim();
            if (searchTerm.length > 0) {
                if (clearSearchBtn) clearSearchBtn.classList.add('show');
                performSearch(searchTerm);
            } else {
                if (clearSearchBtn) clearSearchBtn.classList.remove('show');
                clearSearch();
            }
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                const searchTerm = this.value.trim();
                if (searchTerm) {
                    performSearch(searchTerm);
                }
            }
        });
    }
    
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
    
    // Add hover effects to partner items
    const partnerItems = document.querySelectorAll('.partner-item');
    
    partnerItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
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
    
    // Observe partner items for animation
    partnerItems.forEach(item => {
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
    if (container) {
        container.style.opacity = '0';
        container.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            container.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            container.style.opacity = '1';
            container.style.transform = 'translateY(0)';
        }, 100);
    }
    
    // Add price highlight animation
    const partnerPrices = document.querySelectorAll('.partner-price');
    
    partnerPrices.forEach(price => {
        // Skip unavailable services
        if (price.textContent.includes('غير متوفر') || price.textContent.includes('مجانا')) {
            return;
        }
        
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
    console.log('الفرشاة كلينك - الموقع محمل بنجاح مع التحديثات الجديدة');
    console.log('عدد خدمات الأسنان:', document.querySelectorAll('#dental .service-item').length);
    console.log('عدد خدمات الجلدية:', document.querySelectorAll('#dermatology .service-item').length);
    console.log('عدد خدمات التغذية:', document.querySelectorAll('#nutrition .service-item').length);
    
    // Add special styling for unavailable services
    partnerPrices.forEach(price => {
        if (price.textContent.includes('غير متوفر')) {
            price.style.color = '#e74c3c';
            price.style.fontStyle = 'italic';
            price.style.background = 'none';
            price.style.webkitTextFillColor = '#e74c3c';
        }
    });
    
    // Initialize additional features
    handleMissingElements();
    monitorPerformance();
    
    // Log service statistics
    setTimeout(() => {
        const stats = getServiceStats();
        console.log('إحصائيات الخدمات:', stats);
    }, 1000);
});

// Search functionality - Global function
function performSearch(searchTerm) {
    const serviceItems = document.querySelectorAll('.service-item');
    const searchResults = document.getElementById('searchResults');
    let foundCount = 0;
    let matchedServices = [];
    
    if (!searchTerm) {
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchTerm = searchInput.value.trim();
        }
    }
    
    if (!searchTerm) return;
    
    const searchLower = searchTerm.toLowerCase();
    
    // Clear previous search highlights
    clearSearchHighlights();
    
    serviceItems.forEach(item => {
        const serviceName = item.querySelector('.service-name');
        const serviceNameText = serviceName.textContent.toLowerCase();
        
        if (serviceNameText.includes(searchLower)) {
            // Show the item
            item.style.display = 'block';
            item.classList.add('search-highlight');
            
            // Highlight the matching text
            const originalText = serviceName.textContent;
            const regex = new RegExp(`(${searchTerm})`, 'gi');
            const highlightedText = originalText.replace(regex, '<span class="search-match">$1</span>');
            serviceName.innerHTML = highlightedText;
            
            foundCount++;
            matchedServices.push({
                name: originalText,
                price: item.querySelector('.partner-price').textContent,
                section: item.closest('.clinic-section').id
            });
            
            // Show the section containing this service
            const section = item.closest('.clinic-section');
            section.classList.add('active');
            
            // Update navigation to show the section
            const sectionNav = document.querySelector(`[data-clinic="${section.id}"]`);
            if (sectionNav) {
                document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
                sectionNav.classList.add('active');
            }
        } else {
            // Hide the item
            item.style.display = 'none';
            item.classList.remove('search-highlight');
        }
    });
    
    // Show search results
    if (searchResults) {
        if (foundCount > 0) {
            searchResults.innerHTML = `تم العثور على ${foundCount} خدمة تحتوي على "${searchTerm}"`;
            searchResults.style.display = 'block';
            searchResults.style.color = '#368184';
            
            // Scroll to first result
            const firstResult = document.querySelector('.service-item.search-highlight');
            if (firstResult) {
                setTimeout(() => {
                    firstResult.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 300);
            }
        } else {
            searchResults.innerHTML = `لم يتم العثور على نتائج لـ "${searchTerm}"`;
            searchResults.style.display = 'block';
            searchResults.style.color = '#e74c3c';
            
            // Show all items if no results found
            serviceItems.forEach(item => {
                item.style.display = 'block';
            });
        }
    }
}

// Clear search function - Global function
function clearSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    const clearSearchBtn = document.querySelector('.clear-search-btn');
    const serviceItems = document.querySelectorAll('.service-item');
    
    // Clear input
    if (searchInput) searchInput.value = '';
    
    // Hide search results
    if (searchResults) {
        searchResults.style.display = 'none';
        searchResults.style.color = '#368184';
    }
    
    // Hide clear button
    if (clearSearchBtn) clearSearchBtn.classList.remove('show');
    
    // Show all items and clear highlights
    serviceItems.forEach(item => {
        item.style.display = 'block';
        item.classList.remove('search-highlight');
        
        // Restore original text
        const serviceName = item.querySelector('.service-name');
        if (serviceName) {
            const originalText = serviceName.textContent || serviceName.innerText;
            serviceName.innerHTML = originalText;
        }
    });
    
    // Return to original section view
    document.querySelectorAll('.clinic-section').forEach(section => {
        section.classList.remove('active');
    });
    const dentalSection = document.getElementById('dental');
    if (dentalSection) dentalSection.classList.add('active');
    
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    const dentalNav = document.querySelector('[data-clinic="dental"]');
    if (dentalNav) dentalNav.classList.add('active');
}

// Clear search highlights
function clearSearchHighlights() {
    const serviceItems = document.querySelectorAll('.service-item');
    serviceItems.forEach(item => {
        item.classList.remove('search-highlight');
        const serviceName = item.querySelector('.service-name');
        if (serviceName) {
            // Restore original text without HTML tags
            const originalText = serviceName.textContent || serviceName.innerText;
            serviceName.innerHTML = originalText;
        }
    });
}

// Additional utility functions
function getDiscountedPrice(originalPrice) {
    return Math.round(originalPrice * 0.9); // 10% discount
}

function formatCurrency(amount) {
    return amount.toLocaleString('ar-SA') + ' ريال';
}

function filterByPriceRange(minPrice, maxPrice) {
    const serviceItems = document.querySelectorAll('.service-item');
    let filteredCount = 0;
    
    serviceItems.forEach(item => {
        const priceText = item.querySelector('.partner-price').textContent;
        const price = parseInt(priceText.replace(/[^\d]/g, ''));
        
        if (priceText.includes('مجانا') || priceText.includes('غير متوفر')) {
            // Keep free and unavailable services visible
            item.style.display = 'block';
            filteredCount++;
        } else if (price >= minPrice && price <= maxPrice) {
            item.style.display = 'block';
            filteredCount++;
        } else {
            item.style.display = 'none';
        }
    });
    
    console.log(`تم العثور على ${filteredCount} خدمة في النطاق السعري ${minPrice} - ${maxPrice} ريال`);
    return filteredCount;
}

function getServiceStats() {
    const sections = ['dental', 'dermatology', 'nutrition'];
    const stats = {};
    
    sections.forEach(section => {
        const sectionElement = document.getElementById(section);
        if (!sectionElement) return;
        
        const services = sectionElement.querySelectorAll('.service-item');
        const prices = [];
        let freeCount = 0;
        let unavailableCount = 0;
        
        services.forEach(service => {
            const priceElement = service.querySelector('.partner-price');
            if (!priceElement) return;
            
            const priceText = priceElement.textContent;
            
            if (priceText.includes('مجانا')) {
                freeCount++;
            } else if (priceText.includes('غير متوفر')) {
                unavailableCount++;
            } else {
                const price = parseInt(priceText.replace(/[^\d]/g, ''));
                if (!isNaN(price)) {
                    prices.push(price);
                }
            }
        });
        
        stats[section] = {
            total: services.length,
            free: freeCount,
            unavailable: unavailableCount,
            paid: prices.length,
            minPrice: prices.length > 0 ? Math.min(...prices) : 0,
            maxPrice: prices.length > 0 ? Math.max(...prices) : 0,
            avgPrice: prices.length > 0 ? Math.round(prices.reduce((a, b) => a + b, 0) / prices.length) : 0
        };
    });
    
    return stats;
}

function handleMissingElements() {
    const requiredElements = ['.nav-btn', '.clinic-section', '.service-item'];
    
    requiredElements.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        if (elements.length === 0) {
            console.warn(`تحذير: لم يتم العثور على العناصر: ${selector}`);
        }
    });
}

function monitorPerformance() {
    if (window.performance && window.performance.timing) {
        const timing = window.performance.timing;
        const loadTime = timing.loadEventEnd - timing.navigationStart;
        console.log(`وقت تحميل الصفحة: ${loadTime} مللي ثانية`);
    }
}
