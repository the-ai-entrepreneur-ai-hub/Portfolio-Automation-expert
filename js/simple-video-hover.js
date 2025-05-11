// Simple Video Hover Implementation
document.addEventListener('DOMContentLoaded', function() {
    console.log('Simple video hover script loaded');
    initializeVideoThumbnails();
});

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
        
        // Create thumbnail image
        const img = document.createElement('img');
        img.src = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
        img.alt = "Video thumbnail";
        img.className = 'video-thumb-img';
        
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
    // Create iframe for YouTube video
    const iframe = document.createElement('iframe');
    iframe.className = 'hover-video-iframe';
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0`;
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    iframe.allowFullscreen = true;
    
    // Hide the thumbnail image and play button
    const img = thumbnail.querySelector('.video-thumb-img');
    const playButton = thumbnail.querySelector('.video-play-button');
    
    if (img) img.style.display = 'none';
    if (playButton) playButton.style.display = 'none';
    
    // Add iframe to thumbnail
    thumbnail.appendChild(iframe);
}

function restoreThumbnail(thumbnail, videoId) {
    // Remove iframe
    const iframe = thumbnail.querySelector('.hover-video-iframe');
    if (iframe) {
        iframe.remove();
    }
    
    // Show the thumbnail image and play button
    const img = thumbnail.querySelector('.video-thumb-img');
    const playButton = thumbnail.querySelector('.video-play-button');
    
    if (img) img.style.display = 'block';
    if (playButton) playButton.style.display = 'flex';
}

function playVideoOnClick(thumbnail, videoId) {
    // Get parent container
    const container = thumbnail.closest('.video-container');
    if (!container) {
        console.error('Video container not found');
        return;
    }
    
    // Remove thumbnail
    thumbnail.remove();
    
    // Create iframe for YouTube video
    const iframe = document.createElement('iframe');
    iframe.className = 'click-video-iframe';
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    iframe.allowFullscreen = true;
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    
    // Add iframe to container
    container.appendChild(iframe);
}
