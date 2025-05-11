// Project Carousel Functionality
document.addEventListener('DOMContentLoaded', function() {
    initProjectCarousel();
});

function initProjectCarousel() {
    const carouselTrack = document.querySelector('.projects-carousel-track');
    const carouselCards = document.querySelectorAll('.carousel-project-card');
    const prevButton = document.querySelector('.carousel-prev');
    const nextButton = document.querySelector('.carousel-next');
    const paginationContainer = document.querySelector('.carousel-pagination');
    
    if (!carouselTrack || carouselCards.length === 0) return;
    
    let currentIndex = 0;
    let cardWidth = carouselCards[0].offsetWidth;
    let cardsPerView = getCardsPerView();
    let maxIndex = carouselCards.length - cardsPerView;
    
    // Create pagination dots
    createPaginationDots();
    
    // Set initial state
    updateCarousel();
    
    // Add event listeners
    window.addEventListener('resize', handleResize);
    prevButton.addEventListener('click', goToPrev);
    nextButton.addEventListener('click', goToNext);
    
    // Handle touch events for mobile swipe
    let touchStartX = 0;
    let touchEndX = 0;
    
    carouselTrack.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    carouselTrack.addEventListener('touchend', function(e) {
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
    
    function goToSlide(index) {
        if (index >= 0 && index <= maxIndex) {
            currentIndex = index;
            updateCarousel();
        }
    }
    
    function updateCarousel() {
        // Update track position
        const gap = 30; // Same as the gap in CSS
        const offset = -(currentIndex * (cardWidth + gap));
        carouselTrack.style.transform = `translateX(${offset}px)`;
        
        // Update pagination dots
        updatePaginationDots();
        
        // Update button states
        prevButton.disabled = currentIndex === 0;
        nextButton.disabled = currentIndex === maxIndex;
        
        // Update button opacity based on state
        prevButton.style.opacity = currentIndex === 0 ? '0.5' : '1';
        nextButton.style.opacity = currentIndex === maxIndex ? '0.5' : '1';
    }
    
    function handleResize() {
        // Recalculate dimensions on window resize
        cardWidth = carouselCards[0].offsetWidth;
        cardsPerView = getCardsPerView();
        maxIndex = Math.max(0, carouselCards.length - cardsPerView);
        
        // Ensure current index is still valid
        if (currentIndex > maxIndex) {
            currentIndex = maxIndex;
        }
        
        // Update carousel position
        updateCarousel();
        
        // Recreate pagination dots if needed
        createPaginationDots();
    }
    
    function getCardsPerView() {
        // Determine how many cards are visible based on screen width
        if (window.innerWidth >= 1200) {
            return 3; // Desktop: 3 cards
        } else if (window.innerWidth >= 992) {
            return 2; // Tablet landscape: 2 cards
        } else {
            return 1; // Mobile: 1 card
        }
    }
    
    function createPaginationDots() {
        if (!paginationContainer) return;
        
        // Clear existing dots
        paginationContainer.innerHTML = '';
        
        // Calculate number of dots needed
        const dotCount = maxIndex + 1;
        
        // Create dots
        for (let i = 0; i < dotCount; i++) {
            const dot = document.createElement('div');
            dot.classList.add('carousel-dot');
            if (i === currentIndex) {
                dot.classList.add('active');
            }
            
            // Add click event
            dot.addEventListener('click', function() {
                goToSlide(i);
            });
            
            paginationContainer.appendChild(dot);
        }
    }
    
    function updatePaginationDots() {
        if (!paginationContainer) return;
        
        const dots = paginationContainer.querySelectorAll('.carousel-dot');
        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
}
