// Modern Project Carousel Implementation
document.addEventListener('DOMContentLoaded', function() {
    initModernProjectCarousel();
    createProjectModal();
});

function initModernProjectCarousel() {
    // Get the projects container
    const projectsContainer = document.querySelector('.projects-container');

    if (projectsContainer) {
        // Get all project cards
        const projectCards = Array.from(projectsContainer.querySelectorAll('.project-card'));

        if (projectCards.length > 0) {
            // Create the modern carousel structure
            const carouselWrapper = document.createElement('div');
            carouselWrapper.className = 'modern-carousel-wrapper';

            const carouselTrack = document.createElement('div');
            carouselTrack.className = 'modern-carousel-track';

            const prevButton = document.createElement('button');
            prevButton.className = 'modern-carousel-nav modern-carousel-prev';
            prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
            prevButton.setAttribute('aria-label', 'Previous projects');

            const nextButton = document.createElement('button');
            nextButton.className = 'modern-carousel-nav modern-carousel-next';
            nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
            nextButton.setAttribute('aria-label', 'Next projects');

            const paginationContainer = document.createElement('div');
            paginationContainer.className = 'modern-carousel-pagination';

            // Convert project cards to modern carousel items
            projectCards.forEach((card, index) => {
                // Extract content from original card
                const isReverse = card.classList.contains('reverse');
                const content = card.querySelector('.project-content');
                const image = card.querySelector('.project-image');

                if (!content || !image) return;

                // Create a new modern project card
                const modernCard = document.createElement('div');
                modernCard.className = 'modern-project-card';

                // Extract title
                const title = content.querySelector('h3')?.textContent || 'Project Title';

                // Extract description
                const description = content.querySelector('p:not(:last-child)')?.textContent || 'Project description';

                // Extract tags
                const tagsContainer = content.querySelector('.project-tags');
                const tags = tagsContainer ? Array.from(tagsContainer.querySelectorAll('span')).map(tag => tag.textContent) : [];

                // Extract highlights
                const highlightsContainer = content.querySelector('.project-highlights');
                const highlights = highlightsContainer ?
                    Array.from(highlightsContainer.querySelectorAll('.highlight')).map(highlight => {
                        const icon = highlight.querySelector('i')?.className || 'fas fa-check';
                        const text = highlight.querySelector('span')?.textContent || '';
                        return { icon, text };
                    }) : [];

                // Extract role
                const roleText = content.querySelector('p strong')?.parentElement?.textContent || '';

                // Extract CTA
                const ctaButton = content.querySelector('.btn');
                const ctaText = ctaButton?.textContent || 'View Details';
                const ctaLink = ctaButton?.getAttribute('href') || '#';

                // Build the modern card structure

                // 1. Header with title and tags
                const header = document.createElement('div');
                header.className = 'modern-project-header';

                const titleElement = document.createElement('h3');
                titleElement.className = 'modern-project-title';
                titleElement.textContent = title;
                header.appendChild(titleElement);

                const tagsElement = document.createElement('div');
                tagsElement.className = 'modern-project-tags';

                // Limit visible tags to 5
                const visibleTags = tags.slice(0, 5);
                const hiddenTags = tags.slice(5);

                visibleTags.forEach(tag => {
                    const tagElement = document.createElement('span');
                    tagElement.className = 'modern-project-tag';
                    tagElement.textContent = tag;
                    tagsElement.appendChild(tagElement);
                });

                // Add "more" tag if there are hidden tags
                if (hiddenTags.length > 0) {
                    const moreTag = document.createElement('span');
                    moreTag.className = 'modern-project-tag more-tags';
                    moreTag.textContent = `+${hiddenTags.length} more`;
                    moreTag.title = hiddenTags.join(', ');
                    tagsElement.appendChild(moreTag);
                }

                header.appendChild(tagsElement);
                modernCard.appendChild(header);

                // 2. Content with description and highlights
                const modernContent = document.createElement('div');
                modernContent.className = 'modern-project-content';

                const descriptionElement = document.createElement('p');
                descriptionElement.className = 'modern-project-description';
                descriptionElement.textContent = description;
                modernContent.appendChild(descriptionElement);

                // Add highlights
                if (highlights.length > 0) {
                    const highlightsElement = document.createElement('div');
                    highlightsElement.className = 'modern-project-highlights';

                    highlights.forEach(highlight => {
                        const highlightElement = document.createElement('div');
                        highlightElement.className = 'modern-highlight';

                        const iconElement = document.createElement('i');
                        iconElement.className = highlight.icon;
                        highlightElement.appendChild(iconElement);

                        const textElement = document.createElement('span');
                        textElement.textContent = highlight.text;
                        highlightElement.appendChild(textElement);

                        highlightsElement.appendChild(highlightElement);
                    });

                    modernContent.appendChild(highlightsElement);
                }

                // Add feature icons if needed
                const featuresElement = document.createElement('div');
                featuresElement.className = 'modern-project-features';

                // Check if there's a demo video
                if (ctaLink.includes('youtu')) {
                    const demoIcon = document.createElement('div');
                    demoIcon.className = 'modern-feature-icon';
                    demoIcon.title = 'Demo Available';
                    demoIcon.innerHTML = '<i class="fas fa-play"></i>';
                    featuresElement.appendChild(demoIcon);
                }

                // Add team role icon if role is specified
                if (roleText.includes('Lead') || roleText.includes('Developer')) {
                    const roleIcon = document.createElement('div');
                    roleIcon.className = 'modern-feature-icon';
                    roleIcon.title = roleText.trim();
                    roleIcon.innerHTML = '<i class="fas fa-users"></i>';
                    featuresElement.appendChild(roleIcon);
                }

                if (featuresElement.children.length > 0) {
                    modernContent.appendChild(featuresElement);
                }

                modernCard.appendChild(modernContent);

                // 3. Footer with CTA button
                const footer = document.createElement('div');
                footer.className = 'modern-project-footer';

                const ctaElement = document.createElement('button');
                ctaElement.className = 'modern-project-cta';
                ctaElement.type = 'button';

                // Store project data for modal
                ctaElement.setAttribute('data-project-title', title);
                ctaElement.setAttribute('data-project-description', description);
                ctaElement.setAttribute('data-project-tags', tags.join(','));

                // Store highlights data
                if (highlights.length > 0) {
                    const highlightsData = highlights.map(h => `${h.icon}|${h.text}`).join(';;');
                    ctaElement.setAttribute('data-project-highlights', highlightsData);
                }

                // Add video link if available
                if (ctaLink.includes('youtu')) {
                    ctaElement.setAttribute('data-project-video', ctaLink);
                }

                // Add icon based on CTA text
                let ctaIcon = 'fas fa-arrow-right';
                if (ctaText.toLowerCase().includes('demo') || ctaText.toLowerCase().includes('watch')) {
                    ctaIcon = 'fas fa-play';
                } else if (ctaText.toLowerCase().includes('details')) {
                    ctaIcon = 'fas fa-info-circle';
                }

                ctaElement.innerHTML = `${ctaText} <i class="${ctaIcon}"></i>`;

                // Add click event to open modal
                ctaElement.addEventListener('click', function() {
                    openProjectModal(this);
                });

                footer.appendChild(ctaElement);

                modernCard.appendChild(footer);

                // Add the image content
                const imageClone = image.cloneNode(true);

                // Append the modern card to the carousel track
                carouselTrack.appendChild(modernCard);
            });

            // Assemble the carousel
            carouselWrapper.appendChild(prevButton);
            carouselWrapper.appendChild(carouselTrack);
            carouselWrapper.appendChild(nextButton);

            // Create a container for the modern carousel
            const modernContainer = document.createElement('div');
            modernContainer.className = 'modern-projects-container';
            modernContainer.appendChild(carouselWrapper);
            modernContainer.appendChild(paginationContainer);

            // Replace the original container with the modern carousel
            projectsContainer.innerHTML = '';
            projectsContainer.appendChild(modernContainer);

            // Initialize the carousel functionality
            setupModernCarousel(carouselTrack, prevButton, nextButton, paginationContainer);
        }
    }
}

// Create and handle project modal
function createProjectModal() {
    // Check if modal already exists
    let modal = document.getElementById('modern-project-modal');

    if (!modal) {
        // Create modal elements
        modal = document.createElement('div');
        modal.id = 'modern-project-modal';
        modal.className = 'modern-project-modal';

        const modalContent = document.createElement('div');
        modalContent.className = 'modern-modal-content';

        const closeBtn = document.createElement('button');
        closeBtn.className = 'modern-modal-close';
        closeBtn.innerHTML = '&times;';
        closeBtn.setAttribute('aria-label', 'Close modal');

        const modalBody = document.createElement('div');
        modalBody.className = 'modern-modal-body';

        // Assemble modal
        modalContent.appendChild(closeBtn);
        modalContent.appendChild(modalBody);
        modal.appendChild(modalContent);

        // Add to document
        document.body.appendChild(modal);

        // Add event listeners
        closeBtn.addEventListener('click', closeProjectModal);

        // Close modal when clicking outside content
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeProjectModal();
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeProjectModal();
            }
        });
    }
}

// Open project modal with data from button
function openProjectModal(button) {
    const modal = document.getElementById('modern-project-modal');
    const modalBody = modal.querySelector('.modern-modal-body');

    // Get project data from button attributes
    const title = button.getAttribute('data-project-title');
    const description = button.getAttribute('data-project-description');
    const tags = button.getAttribute('data-project-tags').split(',');
    const highlights = button.getAttribute('data-project-highlights') ?
        button.getAttribute('data-project-highlights').split(';;').map(h => {
            const [icon, text] = h.split('|');
            return { icon, text };
        }) : [];
    const videoLink = button.getAttribute('data-project-video') || null;

    // Build modal content
    let modalContent = `
        <div class="modern-modal-header">
            <h2>${title}</h2>
            <div class="modern-modal-tags">
                ${tags.map(tag => `<span class="modern-project-tag">${tag}</span>`).join('')}
            </div>
        </div>
        <div class="modern-modal-description">
            <p>${description}</p>
        </div>
    `;

    // Add highlights if available
    if (highlights.length > 0) {
        modalContent += `
            <div class="modern-modal-highlights">
                <h3>Key Features</h3>
                <div class="modern-highlights-container">
                    ${highlights.map(h => `
                        <div class="modern-highlight">
                            <i class="${h.icon}"></i>
                            <span>${h.text}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    // Add video if available
    if (videoLink) {
        const videoId = videoLink.includes('youtu.be') ?
            videoLink.split('/').pop() :
            videoLink.includes('watch?v=') ?
                new URLSearchParams(videoLink.split('?')[1]).get('v') :
                null;

        if (videoId) {
            modalContent += `
                <div class="modern-modal-video">
                    <h3>Demo Video</h3>
                    <div class="video-container">
                        <iframe
                            width="100%"
                            height="315"
                            src="https://www.youtube.com/embed/${videoId}"
                            title="YouTube video player"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen>
                        </iframe>
                    </div>
                </div>
            `;
        }
    }

    // Set modal content
    modalBody.innerHTML = modalContent;

    // Show modal with animation
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling

    // Focus on modal for accessibility
    modal.focus();
}

// Close project modal
function closeProjectModal() {
    const modal = document.getElementById('modern-project-modal');

    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
}

function setupModernCarousel(track, prevBtn, nextBtn, pagination) {
    if (!track || !prevBtn || !nextBtn) return;

    const cards = Array.from(track.querySelectorAll('.modern-project-card'));
    if (cards.length === 0) return;

    let currentIndex = 0;
    const cardsPerView = window.innerWidth >= 992 ? 2 : 1;
    const maxIndex = Math.max(0, cards.length - cardsPerView);

    // Create pagination dots
    createPaginationDots();

    // Set initial state
    updateCarousel();

    // Add event listeners
    prevBtn.addEventListener('click', goToPrev);
    nextBtn.addEventListener('click', goToNext);
    window.addEventListener('resize', handleResize);

    // Handle touch events for mobile swipe
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    track.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
            goToNext();
        } else if (touchEndX > touchStartX + swipeThreshold) {
            goToPrev();
        }
    }

    function goToPrev() {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    }

    function goToNext() {
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateCarousel();
        }
    }

    function updateCarousel() {
        // Calculate card width and gap
        const cardWidth = cards[0].offsetWidth;
        const gap = 30; // Same as in CSS

        // Update track position
        const offset = -(currentIndex * (cardWidth + gap));
        track.style.transform = `translateX(${offset}px)`;

        // Update button states
        prevBtn.disabled = currentIndex === 0;
        nextBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';

        nextBtn.disabled = currentIndex === maxIndex;
        nextBtn.style.opacity = currentIndex === maxIndex ? '0.5' : '1';

        // Update pagination dots
        updatePaginationDots();
    }

    function handleResize() {
        const newCardsPerView = window.innerWidth >= 992 ? 2 : 1;
        const newMaxIndex = Math.max(0, cards.length - newCardsPerView);

        // Adjust current index if needed
        if (currentIndex > newMaxIndex) {
            currentIndex = newMaxIndex;
        }

        // Update carousel
        updateCarousel();

        // Recreate pagination if needed
        if (newCardsPerView !== cardsPerView) {
            createPaginationDots();
        }
    }

    function createPaginationDots() {
        if (!pagination) return;

        // Clear existing dots
        pagination.innerHTML = '';

        // Calculate number of dots needed
        const dotCount = maxIndex + 1;

        // Create dots
        for (let i = 0; i < dotCount; i++) {
            const dot = document.createElement('div');
            dot.className = 'modern-carousel-dot';
            if (i === currentIndex) {
                dot.classList.add('active');
            }

            // Add click event
            dot.addEventListener('click', function() {
                currentIndex = i;
                updateCarousel();
            });

            pagination.appendChild(dot);
        }
    }

    function updatePaginationDots() {
        if (!pagination) return;

        const dots = pagination.querySelectorAll('.modern-carousel-dot');
        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
}
