// Landscape Fixes for Portfolio
document.addEventListener('DOMContentLoaded', function() {
    // Fix hero section layout
    fixHeroLayout();
    
    // Fix project cards layout
    setupHorizontalProjects();
    
    // Fix video thumbnails
    enhanceVideoThumbnails();
    
    // Handle window resize
    window.addEventListener('resize', function() {
        fixHeroLayout();
    });
});

// Fix hero section layout to ensure all elements fit properly
function fixHeroLayout() {
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (!hero || !heroContent || !scrollIndicator) return;
    
    // Check if viewport is in landscape mode
    const isLandscape = window.innerWidth > window.innerHeight;
    
    if (isLandscape) {
        // For landscape mode, ensure the scroll indicator is below the content
        heroContent.appendChild(scrollIndicator);
        scrollIndicator.style.position = 'relative';
        scrollIndicator.style.bottom = '0';
        scrollIndicator.style.left = '0';
        scrollIndicator.style.transform = 'none';
        scrollIndicator.style.marginTop = '20px';
    } else {
        // For portrait mode, restore original position
        hero.appendChild(scrollIndicator);
        scrollIndicator.style.position = 'absolute';
        scrollIndicator.style.bottom = '40px';
        scrollIndicator.style.left = '50%';
        scrollIndicator.style.transform = 'translateX(-50%)';
        scrollIndicator.style.marginTop = '0';
    }
    
    // Adjust hero height based on content
    const contentHeight = heroContent.offsetHeight;
    const windowHeight = window.innerHeight;
    
    if (contentHeight > windowHeight - 100) {
        hero.style.height = 'auto';
        hero.style.minHeight = '100vh';
        hero.style.paddingTop = '120px';
        hero.style.paddingBottom = '60px';
    } else {
        hero.style.height = '100vh';
        hero.style.minHeight = 'auto';
    }
}

// Setup horizontal scrolling for projects
function setupHorizontalProjects() {
    const projectsContainer = document.querySelector('.projects-container');
    if (!projectsContainer) return;
    
    // Add navigation buttons for horizontal scrolling
    const projectsSection = document.getElementById('projects');
    if (!projectsSection) return;
    
    // Create navigation buttons if they don't exist
    if (!document.querySelector('.project-nav-buttons')) {
        const navButtons = document.createElement('div');
        navButtons.className = 'project-nav-buttons';
        
        const prevButton = document.createElement('button');
        prevButton.className = 'project-nav-btn prev-btn';
        prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
        
        const nextButton = document.createElement('button');
        nextButton.className = 'project-nav-btn next-btn';
        nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
        
        navButtons.appendChild(prevButton);
        navButtons.appendChild(nextButton);
        
        // Insert after the section header
        const sectionHeader = projectsSection.querySelector('.section-header');
        if (sectionHeader) {
            sectionHeader.after(navButtons);
        } else {
            projectsSection.prepend(navButtons);
        }
        
        // Add event listeners
        prevButton.addEventListener('click', function() {
            projectsContainer.scrollBy({
                left: -projectsContainer.offsetWidth * 0.8,
                behavior: 'smooth'
            });
        });
        
        nextButton.addEventListener('click', function() {
            projectsContainer.scrollBy({
                left: projectsContainer.offsetWidth * 0.8,
                behavior: 'smooth'
            });
        });
    }
}

// Enhance video thumbnails
function enhanceVideoThumbnails() {
    const videoThumbnails = document.querySelectorAll('.video-thumbnail');
    
    videoThumbnails.forEach(thumbnail => {
        const videoId = thumbnail.getAttribute('data-video-id');
        if (!videoId) return;
        
        // Create thumbnail image if it doesn't exist
        if (!thumbnail.querySelector('img')) {
            const img = document.createElement('img');
            img.src = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
            img.alt = "Video thumbnail";
            img.onerror = function() {
                // Fallback to medium quality if maxres is not available
                this.src = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
            };
            
            const playButton = document.createElement('div');
            playButton.className = 'video-play-button';
            playButton.innerHTML = '<i class="fas fa-play"></i>';
            
            thumbnail.appendChild(img);
            thumbnail.appendChild(playButton);
        }
        
        // Add click event to play video
        thumbnail.addEventListener('click', function() {
            const iframe = document.createElement('iframe');
            iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
            iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
            iframe.allowFullscreen = true;
            iframe.style.position = 'absolute';
            iframe.style.top = '0';
            iframe.style.left = '0';
            iframe.style.width = '100%';
            iframe.style.height = '100%';
            iframe.style.border = 'none';
            
            const container = this.closest('.video-container');
            if (container) {
                this.style.display = 'none';
                container.appendChild(iframe);
            }
        });
    });
}
