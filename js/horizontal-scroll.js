// Simple Horizontal Scrolling for Projects
document.addEventListener('DOMContentLoaded', function() {
    // Add scroll indicators to the projects section
    const projectsSection = document.getElementById('projects');
    if (!projectsSection) return;
    
    const container = projectsSection.querySelector('.container');
    if (!container) return;
    
    // Wrap the container in a relative positioned div for the indicators
    const wrapper = document.createElement('div');
    wrapper.className = 'projects-section-container';
    
    // Move the container into the wrapper
    container.parentNode.insertBefore(wrapper, container);
    wrapper.appendChild(container);
    
    // Add scroll indicators
    const leftIndicator = document.createElement('div');
    leftIndicator.className = 'scroll-indicator scroll-left';
    leftIndicator.innerHTML = '<i class="fas fa-chevron-left"></i>';
    
    const rightIndicator = document.createElement('div');
    rightIndicator.className = 'scroll-indicator scroll-right';
    rightIndicator.innerHTML = '<i class="fas fa-chevron-right"></i>';
    
    wrapper.appendChild(leftIndicator);
    wrapper.appendChild(rightIndicator);
    
    // Get the projects container
    const projectsContainer = container.querySelector('.projects-container');
    if (!projectsContainer) return;
    
    // Add click events to scroll indicators
    leftIndicator.addEventListener('click', function() {
        const scrollAmount = projectsContainer.clientWidth * 0.8;
        projectsContainer.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    });
    
    rightIndicator.addEventListener('click', function() {
        const scrollAmount = projectsContainer.clientWidth * 0.8;
        projectsContainer.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });
    
    // Update indicator visibility based on scroll position
    projectsContainer.addEventListener('scroll', function() {
        updateIndicatorVisibility();
    });
    
    function updateIndicatorVisibility() {
        // Show/hide left indicator based on scroll position
        if (projectsContainer.scrollLeft <= 10) {
            leftIndicator.style.opacity = '0.3';
        } else {
            leftIndicator.style.opacity = '0.8';
        }
        
        // Show/hide right indicator based on scroll position
        const maxScrollLeft = projectsContainer.scrollWidth - projectsContainer.clientWidth - 10;
        if (projectsContainer.scrollLeft >= maxScrollLeft) {
            rightIndicator.style.opacity = '0.3';
        } else {
            rightIndicator.style.opacity = '0.8';
        }
    }
    
    // Initial update
    updateIndicatorVisibility();
    
    // Update on window resize
    window.addEventListener('resize', updateIndicatorVisibility);
});
