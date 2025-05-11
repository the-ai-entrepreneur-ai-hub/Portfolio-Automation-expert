// Enhanced Horizontal Projects Functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('Enhanced horizontal projects script loaded');

    // Convert vertical projects to horizontal layout with improved styling
    convertToHorizontalProjects();

    // Initialize scroll indicators with smooth animation
    initScrollIndicators();

    // Add keyboard navigation for accessibility
    initKeyboardNavigation();
});

function convertToHorizontalProjects() {
    // Get the projects container
    const projectsSection = document.getElementById('projects');
    if (!projectsSection) {
        console.error('Projects section not found');
        return;
    }

    // Find the projects container
    const projectsContainer = projectsSection.querySelector('.projects-container');
    if (!projectsContainer) {
        console.error('Projects container not found');
        return;
    }

    // Get all project cards
    const projectCards = projectsContainer.querySelectorAll('.project-card');
    if (projectCards.length === 0) {
        console.error('No project cards found');
        return;
    }

    console.log(`Found ${projectCards.length} project cards`);

    // Create horizontal container
    const horizontalContainer = document.createElement('div');
    horizontalContainer.className = 'horizontal-projects';

    // Add scroll indicators
    const leftIndicator = document.createElement('div');
    leftIndicator.className = 'scroll-indicator scroll-left';
    leftIndicator.innerHTML = '<i class="fas fa-chevron-left"></i>';

    const rightIndicator = document.createElement('div');
    rightIndicator.className = 'scroll-indicator scroll-right';
    rightIndicator.innerHTML = '<i class="fas fa-chevron-right"></i>';

    horizontalContainer.appendChild(leftIndicator);
    horizontalContainer.appendChild(rightIndicator);

    // Convert each project card to horizontal format
    projectCards.forEach(card => {
        // Create wrapper
        const wrapper = document.createElement('div');
        wrapper.className = 'project-wrapper';

        // Create horizontal card
        const horizontalCard = document.createElement('div');
        horizontalCard.className = 'horizontal-project-card';

        // Get content and image from original card
        const content = card.querySelector('.project-content');
        const image = card.querySelector('.project-image');

        if (content) {
            const horizontalContent = document.createElement('div');
            horizontalContent.className = 'horizontal-project-content';
            horizontalContent.innerHTML = content.innerHTML;
            horizontalCard.appendChild(horizontalContent);
        }

        if (image) {
            const horizontalImage = document.createElement('div');
            horizontalImage.className = 'horizontal-project-image';
            horizontalImage.innerHTML = image.innerHTML;
            horizontalCard.appendChild(horizontalImage);
        }

        // Add to wrapper
        wrapper.appendChild(horizontalCard);

        // Add to horizontal container
        horizontalContainer.appendChild(wrapper);
    });

    // Replace original container with horizontal container
    projectsContainer.innerHTML = '';
    projectsContainer.appendChild(horizontalContainer);

    console.log('Converted projects to horizontal layout');
}

function initScrollIndicators() {
    // Wait a bit to ensure DOM is fully processed
    setTimeout(() => {
        const horizontalContainer = document.querySelector('.horizontal-projects');
        if (!horizontalContainer) return;

        const leftIndicator = horizontalContainer.querySelector('.scroll-left');
        const rightIndicator = horizontalContainer.querySelector('.scroll-right');

        // Calculate the width of a project card plus margin
        const projectWrapper = horizontalContainer.querySelector('.project-wrapper');
        const scrollAmount = projectWrapper ? projectWrapper.offsetWidth + 20 : 300;

        if (leftIndicator) {
            leftIndicator.addEventListener('click', () => {
                horizontalContainer.scrollBy({
                    left: -scrollAmount,
                    behavior: 'smooth'
                });
            });

            // Add hover effect
            leftIndicator.addEventListener('mouseenter', () => {
                leftIndicator.style.transform = 'translateY(-50%) scale(1.1)';
            });

            leftIndicator.addEventListener('mouseleave', () => {
                leftIndicator.style.transform = 'translateY(-50%)';
            });
        }

        if (rightIndicator) {
            rightIndicator.addEventListener('click', () => {
                horizontalContainer.scrollBy({
                    left: scrollAmount,
                    behavior: 'smooth'
                });
            });

            // Add hover effect
            rightIndicator.addEventListener('mouseenter', () => {
                rightIndicator.style.transform = 'translateY(-50%) scale(1.1)';
            });

            rightIndicator.addEventListener('mouseleave', () => {
                rightIndicator.style.transform = 'translateY(-50%)';
            });
        }

        // Show/hide indicators based on scroll position
        horizontalContainer.addEventListener('scroll', () => {
            if (horizontalContainer.scrollLeft <= 10) {
                leftIndicator.style.opacity = '0.3';
                leftIndicator.style.pointerEvents = 'none';
            } else {
                leftIndicator.style.opacity = '0.8';
                leftIndicator.style.pointerEvents = 'auto';
            }

            if (horizontalContainer.scrollLeft >= horizontalContainer.scrollWidth - horizontalContainer.clientWidth - 10) {
                rightIndicator.style.opacity = '0.3';
                rightIndicator.style.pointerEvents = 'none';
            } else {
                rightIndicator.style.opacity = '0.8';
                rightIndicator.style.pointerEvents = 'auto';
            }
        });

        // Trigger initial check
        horizontalContainer.dispatchEvent(new Event('scroll'));
    }, 500);
}

// Add keyboard navigation for accessibility
function initKeyboardNavigation() {
    const horizontalContainer = document.querySelector('.horizontal-projects');
    if (!horizontalContainer) return;

    // Calculate the width of a project card plus margin
    const projectWrapper = horizontalContainer.querySelector('.project-wrapper');
    const scrollAmount = projectWrapper ? projectWrapper.offsetWidth + 20 : 300;

    // Make the container focusable
    horizontalContainer.tabIndex = 0;

    // Add keyboard event listener
    horizontalContainer.addEventListener('keydown', (e) => {
        // Left arrow key
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            horizontalContainer.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        }

        // Right arrow key
        if (e.key === 'ArrowRight') {
            e.preventDefault();
            horizontalContainer.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        }
    });

    // Add focus indicator
    horizontalContainer.addEventListener('focus', () => {
        horizontalContainer.style.outline = '2px solid var(--accent-purple)';
        horizontalContainer.style.outlineOffset = '4px';
    });

    horizontalContainer.addEventListener('blur', () => {
        horizontalContainer.style.outline = 'none';
        horizontalContainer.style.outlineOffset = '0';
    });
}
