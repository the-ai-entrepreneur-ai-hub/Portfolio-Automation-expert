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

    // Wrap project cards in a wrapper for animation
    if (!document.querySelector('.projects-wrapper')) {
        const projectCards = projectsContainer.querySelectorAll('.project-card');
        if (projectCards.length === 0) return;

        // Create wrapper
        const wrapper = document.createElement('div');
        wrapper.className = 'projects-wrapper';

        // Move all cards to the wrapper
        projectCards.forEach(card => {
            wrapper.appendChild(card);
        });

        // Add wrapper to container
        projectsContainer.appendChild(wrapper);

        // Calculate wrapper width based on number of cards
        updateWrapperWidth();
    }

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
        prevButton.setAttribute('aria-label', 'Previous projects');

        const nextButton = document.createElement('button');
        nextButton.className = 'project-nav-btn next-btn';
        nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
        nextButton.setAttribute('aria-label', 'Next projects');

        navButtons.appendChild(prevButton);
        navButtons.appendChild(nextButton);

        // Insert after the section header
        const sectionHeader = projectsSection.querySelector('.section-header');
        if (sectionHeader) {
            sectionHeader.after(navButtons);
        } else {
            projectsSection.prepend(navButtons);
        }

        // Create pagination dots
        const projectsWrapper = document.querySelector('.projects-wrapper');
        const projectCards = projectsWrapper.querySelectorAll('.project-card');

        // Calculate how many slides we need based on viewport width
        let cardsPerView = getCardsPerView();
        const totalSlides = Math.ceil(projectCards.length / cardsPerView);

        const paginationContainer = document.createElement('div');
        paginationContainer.className = 'project-pagination';

        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('div');
            dot.className = 'pagination-dot';
            if (i === 0) dot.classList.add('active');
            dot.setAttribute('data-index', i);
            paginationContainer.appendChild(dot);

            // Add click event to dot
            dot.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                scrollToSlide(index);
                updateActiveDot(index);
            });
        }

        // Add pagination after nav buttons
        navButtons.after(paginationContainer);

        // Current slide index
        let currentSlide = 0;

        // Add event listeners to buttons
        prevButton.addEventListener('click', function() {
            if (currentSlide > 0) {
                currentSlide--;
                scrollToSlide(currentSlide);
                updateActiveDot(currentSlide);
            }
        });

        nextButton.addEventListener('click', function() {
            if (currentSlide < totalSlides - 1) {
                currentSlide++;
                scrollToSlide(currentSlide);
                updateActiveDot(currentSlide);
            }
        });

        // Function to get number of cards per view based on screen size
        function getCardsPerView() {
            if (window.innerWidth < 992) {
                return 1; // Show 1 card on smaller screens
            }
            return 2; // Show 2 cards on larger screens
        }

        // Function to update wrapper width based on number of cards
        function updateWrapperWidth() {
            const projectsWrapper = document.querySelector('.projects-wrapper');
            const projectCards = projectsWrapper.querySelectorAll('.project-card');
            const cardsPerView = getCardsPerView();

            // Set width based on number of cards and cards per view
            const wrapperWidth = (projectCards.length / cardsPerView) * 100;
            projectsWrapper.style.width = `${wrapperWidth}%`;

            // Update card widths
            const cardWidth = 100 / projectCards.length;
            projectCards.forEach(card => {
                card.style.width = `${cardWidth}%`;
                card.style.flex = `0 0 ${cardWidth}%`;
            });
        }

        // Function to scroll to a specific slide
        function scrollToSlide(index) {
            const projectsWrapper = document.querySelector('.projects-wrapper');
            const cardsPerView = getCardsPerView();
            const slidePercentage = (100 / (projectCards.length / cardsPerView)) * index;

            projectsWrapper.style.transform = `translateX(-${slidePercentage}%)`;
            currentSlide = index;

            // Update button states
            prevButton.disabled = currentSlide === 0;
            nextButton.disabled = currentSlide === totalSlides - 1;

            // Update visual state
            prevButton.style.opacity = currentSlide === 0 ? '0.5' : '1';
            nextButton.style.opacity = currentSlide === totalSlides - 1 ? '0.5' : '1';
        }

        // Function to update active pagination dot
        function updateActiveDot(index) {
            const dots = document.querySelectorAll('.pagination-dot');
            dots.forEach(dot => dot.classList.remove('active'));
            if (dots[index]) {
                dots[index].classList.add('active');
            }
        }

        // Initialize
        scrollToSlide(0);
        updateActiveDot(0);

        // Handle window resize
        window.addEventListener('resize', function() {
            // Update wrapper width on resize
            updateWrapperWidth();

            // Recalculate pagination
            const newCardsPerView = getCardsPerView();
            if (cardsPerView !== newCardsPerView) {
                cardsPerView = newCardsPerView;

                // Update pagination dots
                const newTotalSlides = Math.ceil(projectCards.length / cardsPerView);

                // Clear existing dots
                paginationContainer.innerHTML = '';

                // Create new dots
                for (let i = 0; i < newTotalSlides; i++) {
                    const dot = document.createElement('div');
                    dot.className = 'pagination-dot';
                    if (i === 0) dot.classList.add('active');
                    dot.setAttribute('data-index', i);
                    paginationContainer.appendChild(dot);

                    // Add click event to dot
                    dot.addEventListener('click', function() {
                        const index = parseInt(this.getAttribute('data-index'));
                        scrollToSlide(index);
                        updateActiveDot(index);
                    });
                }
            }

            // Reset to first slide on resize
            scrollToSlide(0);
            updateActiveDot(0);
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
