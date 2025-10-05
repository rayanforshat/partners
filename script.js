console.log('Script loaded successfully1111');


document.addEventListener('DOMContentLoaded', function() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const clinicSections = document.querySelectorAll('.clinic-section');
    const searchInput = document.getElementById('searchInput');
    const clearBtn = document.getElementById('clearSearch');
    const serviceItems = document.querySelectorAll('.service-item');
    
    // Navigation functionality
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetClinic = this.getAttribute('data-clinic');
            navButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            clinicSections.forEach(section => section.classList.remove('active'));
            const targetSection = document.getElementById(targetClinic);
            if (targetSection) {
                targetSection.classList.add('active');
            }
            clearSearch();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
    
    // Search functionality
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
        if (searchTerm.length > 0) {
            clearBtn.classList.add('show');
        } else {
            clearBtn.classList.remove('show');
        }
        filterServices(searchTerm);
    });
    
    // Clear search functionality
    clearBtn.addEventListener('click', function() {
        clearSearch();
    });
    
    // Clear search with Escape key
    searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            clearSearch();
        }
    });
    
    function clearSearch() {
        searchInput.value = '';
        clearBtn.classList.remove('show');
        serviceItems.forEach(item => {
            item.style.display = 'block';
            removeHighlights(item);
        });
    }
    
    function filterServices(searchTerm) {
        if (searchTerm === '') {
            serviceItems.forEach(item => {
                item.style.display = 'block';
                removeHighlights(item);
            });
            return;
        }
        
        serviceItems.forEach(item => {
            const serviceName = item.querySelector('.service-name').textContent.toLowerCase();
            const serviceDesc = item.querySelector('.service-desc');
            let descText = serviceDesc ? serviceDesc.textContent.toLowerCase() : '';
            
            if (serviceName.includes(searchTerm) || descText.includes(searchTerm)) {
                item.style.display = 'block';
                highlightSearchTerm(item, searchTerm);
            } else {
                item.style.display = 'none';
                removeHighlights(item);
            }
        });
    }
    
    function highlightSearchTerm(item, searchTerm) {
        const serviceName = item.querySelector('.service-name');
        const serviceDesc = item.querySelector('.service-desc');
        highlightText(serviceName, searchTerm);
        if (serviceDesc) {
            highlightText(serviceDesc, searchTerm);
        }
    }
    
    function highlightText(element, searchTerm) {
        const originalText = element.dataset.originalText || element.textContent;
        element.dataset.originalText = originalText;
        const regex = new RegExp(`(${searchTerm})`, 'gi');
        const highlightedText = originalText.replace(regex, '<span class="highlight">$1</span>');
        element.innerHTML = highlightedText;
    }
    
    function removeHighlights(item) {
        const serviceName = item.querySelector('.service-name');
        const serviceDesc = item.querySelector('.service-desc');
        if (serviceName.dataset.originalText) {
            serviceName.innerHTML = serviceName.dataset.originalText;
        }
        if (serviceDesc && serviceDesc.dataset.originalText) {
            serviceDesc.innerHTML = serviceDesc.dataset.originalText;
        }
    }
    
    // Loading animation
    const container = document.querySelector('.container');
    container.style.opacity = '0';
    container.style.transform = 'translateY(20px)';
    setTimeout(() => {
        container.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        container.style.opacity = '1';
        container.style.transform = 'translateY(0)';
    }, 100);
    
    console.log('عروض الشركاء - الفرشاة كلينك محملة بنجاح!');
});
