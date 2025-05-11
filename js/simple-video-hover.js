// Enhanced Video Hover Implementation
document.addEventListener('DOMContentLoaded', function() {
    console.log('Enhanced video hover script loaded');
    initializeVideoThumbnails();

    // Add resize handler to ensure proper video behavior on window resize
    window.addEventListener('resize', handleResize);
});

// Handle window resize events
function handleResize() {
    // Reset any playing videos on mobile when orientation changes
    if (window.innerWidth < 768) {
        const iframes = document.querySelectorAll('.hover-video-iframe');
        iframes.forEach(iframe => {
            const thumbnail = iframe.closest('.video-thumbnail');
            if (thumbnail) {
                restoreThumbnail(thumbnail, thumbnail.getAttribute('data-video-id'));
            }
        });
    }
}

function initializeVideoThumbnails() {
    // Find all video thumbnails
    const videoThumbnails = document.querySelectorAll('.video-thumbnail');
    console.log(`Found ${videoThumbnails.length} video thumbnails`);

    videoThumbnails.forEach(thumbnail => {
        const videoId = thumbnail.getAttribute('data-video-id');
        if (!videoId) {
            console.error('Video thumbnail missing data-video-id attribute');
            return;
        }

        console.log(`Processing video ID: ${videoId}`);

        // Create thumbnail image with high quality
        const img = document.createElement('img');
        img.src = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
        img.alt = "Video thumbnail";
        img.className = 'video-thumb-img';
        img.loading = 'lazy'; // Add lazy loading for better performance

        // Add error handler for fallback
        img.onerror = function() {
            this.src = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
        };

        // Create play button
        const playButton = document.createElement('div');
        playButton.className = 'video-play-button';
        playButton.innerHTML = '<i class="fas fa-play"></i>';

        // Clear thumbnail and add new elements
        thumbnail.innerHTML = '';
        thumbnail.appendChild(img);
        thumbnail.appendChild(playButton);

        // Add hover event for desktop
        if (window.matchMedia('(min-width: 768px)').matches) {
            thumbnail.addEventListener('mouseenter', function() {
                console.log(`Mouse entered thumbnail for video ID: ${videoId}`);
                playVideoOnHover(this, videoId);
            });

            thumbnail.addEventListener('mouseleave', function() {
                console.log(`Mouse left thumbnail for video ID: ${videoId}`);
                restoreThumbnail(this, videoId);
            });
        }

        // Add click event for all devices
        thumbnail.addEventListener('click', function(e) {
            e.preventDefault();
            console.log(`Clicked thumbnail for video ID: ${videoId}`);
            playVideoOnClick(this, videoId);
        });
    });
}

function playVideoOnHover(thumbnail, videoId) {
    // Check if video is already playing
    if (thumbnail.querySelector('.hover-video-iframe')) {
        return;
    }

    // Create iframe for YouTube video with improved parameters
    const iframe = document.createElement('iframe');
    iframe.className = 'hover-video-iframe';
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&modestbranding=1&loop=1&playlist=${videoId}`;
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    iframe.allowFullscreen = true;

    // Create a loading indicator
    const loader = document.createElement('div');
    loader.className = 'video-loader';
    loader.innerHTML = '<div class="spinner"></div>';
    thumbnail.appendChild(loader);

    // Hide the thumbnail image and play button with a fade effect
    const img = thumbnail.querySelector('.video-thumb-img');
    const playButton = thumbnail.querySelector('.video-play-button');

    if (img) {
        img.style.opacity = '0';
        setTimeout(() => {
            img.style.display = 'none';
        }, 300);
    }

    if (playButton) {
        playButton.style.opacity = '0';
        setTimeout(() => {
            playButton.style.display = 'none';
        }, 300);
    }

    // Add iframe to thumbnail
    thumbnail.appendChild(iframe);

    // Remove loader when video is loaded
    iframe.onload = function() {
        const loader = thumbnail.querySelector('.video-loader');
        if (loader) {
            loader.remove();
        }
    };
}

function restoreThumbnail(thumbnail, videoId) {
    // Remove iframe with a fade effect
    const iframe = thumbnail.querySelector('.hover-video-iframe');
    if (iframe) {
        iframe.style.opacity = '0';
        setTimeout(() => {
            iframe.remove();
        }, 200);
    }

    // Remove any loader that might still be present
    const loader = thumbnail.querySelector('.video-loader');
    if (loader) {
        loader.remove();
    }

    // Show the thumbnail image and play button with a fade-in effect
    const img = thumbnail.querySelector('.video-thumb-img');
    const playButton = thumbnail.querySelector('.video-play-button');

    if (img) {
        img.style.display = 'block';
        // Small delay to ensure display is set before opacity transition
        setTimeout(() => {
            img.style.opacity = '1';
        }, 50);
    }

    if (playButton) {
        playButton.style.display = 'flex';
        // Small delay to ensure display is set before opacity transition
        setTimeout(() => {
            playButton.style.opacity = '1';
        }, 50);
    }
}

function playVideoOnClick(thumbnail, videoId) {
    // Get parent container
    const container = thumbnail.closest('.video-container');
    if (!container) {
        console.error('Video container not found');
        return;
    }

    // Create a loading indicator
    const loader = document.createElement('div');
    loader.className = 'video-loader';
    loader.innerHTML = '<div class="spinner"></div>';
    container.appendChild(loader);

    // Fade out thumbnail
    thumbnail.style.opacity = '0';

    // Create iframe for YouTube video with improved parameters
    const iframe = document.createElement('iframe');
    iframe.className = 'click-video-iframe';
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&color=white`;
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    iframe.allowFullscreen = true;
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.opacity = '0';
    iframe.style.transition = 'opacity 0.5s ease';

    // Add iframe to container
    container.appendChild(iframe);

    // Remove thumbnail after fade out
    setTimeout(() => {
        thumbnail.remove();
    }, 300);

    // Fade in iframe when loaded
    iframe.onload = function() {
        // Remove loader
        const loader = container.querySelector('.video-loader');
        if (loader) {
            loader.remove();
        }

        // Fade in iframe
        setTimeout(() => {
            iframe.style.opacity = '1';
        }, 100);
    };
}
