// Gallery Autoscroll Enhancement with Infinite Loop
// This script adds smooth infinite scrolling functionality to the photo gallery

document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit to ensure all elements are loaded
    setTimeout(function() {
        // Find gallery elements
        const galleryCarousel = document.querySelector('.gallery-carousel');
        if (!galleryCarousel) return;
        
        const galleryWrapper = galleryCarousel.querySelector('.gallery-wrapper');
        const galleryItems = galleryCarousel.querySelectorAll('.gallery-item');
        const galleryPrevBtn = galleryCarousel.querySelector('.gallery-nav-prev');
        const galleryNextBtn = galleryCarousel.querySelector('.gallery-nav-next');
        
        if (!galleryWrapper || !galleryItems.length) return;
        
        // Configuration
        const itemsPerView = 3;
        const totalOriginalItems = galleryItems.length;
        let currentIndex = 0;
        let isTransitioning = false;
        let autoScrollInterval = null;
        let isHovered = false;
        
        // Clone items for infinite loop effect
        // We'll use a simpler approach - just reset position when reaching the end
        
        // Calculate item width and gap
        function getItemDimensions() {
            const itemWidth = allGalleryItems[0].offsetWidth;
            const gap = 24; // 1.5rem gap from CSS
            return { itemWidth, gap };
        }
        
        // Get all gallery items (no cloning needed for this approach)
        const allGalleryItems = galleryItems;
        const maxIndex = Math.max(0, totalOriginalItems - itemsPerView);
        
        // Function to update gallery position
        function updateGalleryPosition(animate = true) {
            const translateX = -(currentIndex * (100 / itemsPerView));
            
            if (animate) {
                galleryWrapper.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            } else {
                galleryWrapper.style.transition = 'none';
            }
            
            galleryWrapper.style.transform = `translateX(${translateX}%)`;
        }
        
        // Function to go to next slide with infinite loop
        function goToNextSlide() {
            if (isTransitioning) return;
            isTransitioning = true;
            
            // If at the last position, smoothly transition to the next and then reset
            if (currentIndex >= maxIndex) {
                // Move one more step forward with animation
                currentIndex++;
                updateGalleryPosition(true);
                
                // After the animation completes, instantly reset to the beginning
                setTimeout(() => {
                    currentIndex = 0;
                    updateGalleryPosition(false);
                    isTransitioning = false;
                }, 500);
            } else {
                currentIndex++;
                updateGalleryPosition(true);
                
                setTimeout(() => {
                    isTransitioning = false;
                }, 500);
            }
        }
        
        // Function to go to previous slide with infinite loop
        function goToPrevSlide() {
            if (isTransitioning) return;
            isTransitioning = true;
            
            // If at the first position, instantly jump to the last and then animate backwards
            if (currentIndex <= 0) {
                // First, instantly jump to the end
                currentIndex = maxIndex + 1;
                updateGalleryPosition(false);
                
                // Then animate backwards after a tiny delay
                setTimeout(() => {
                    currentIndex = maxIndex;
                    updateGalleryPosition(true);
                    
                    setTimeout(() => {
                        isTransitioning = false;
                    }, 500);
                }, 10);
            } else {
                currentIndex--;
                updateGalleryPosition(true);
                
                setTimeout(() => {
                    isTransitioning = false;
                }, 500);
            }
        }
        
        // Alternative smooth infinite loop implementation
        function smoothInfiniteNext() {
            if (isTransitioning) return;
            
            currentIndex++;
            
            // If we've gone past the last set, reset to beginning
            if (currentIndex > maxIndex) {
                currentIndex = 0;
            }
            
            updateGalleryPosition(true);
        }
        
        // Start autoscroll with smooth infinite loop
        function startAutoScroll() {
            if (!isHovered && !autoScrollInterval) {
                autoScrollInterval = setInterval(() => {
                    smoothInfiniteNext();
                }, 3000); // 3 seconds interval
            }
        }
        
        // Stop autoscroll
        function stopAutoScroll() {
            if (autoScrollInterval) {
                clearInterval(autoScrollInterval);
                autoScrollInterval = null;
            }
        }
        
        // Restart autoscroll (stop then start)
        function restartAutoScroll() {
            stopAutoScroll();
            setTimeout(() => {
                startAutoScroll();
            }, 100);
        }
        
        // Override existing button event listeners
        if (galleryPrevBtn) {
            // Clone to remove existing listeners
            const newPrevBtn = galleryPrevBtn.cloneNode(true);
            galleryPrevBtn.parentNode.replaceChild(newPrevBtn, galleryPrevBtn);
            
            // Always enable for infinite loop
            newPrevBtn.disabled = false;
            newPrevBtn.style.opacity = '1';
            newPrevBtn.style.cursor = 'pointer';
            
            newPrevBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                goToPrevSlide();
                restartAutoScroll();
            });
        }
        
        if (galleryNextBtn) {
            // Clone to remove existing listeners
            const newNextBtn = galleryNextBtn.cloneNode(true);
            galleryNextBtn.parentNode.replaceChild(newNextBtn, galleryNextBtn);
            
            // Always enable for infinite loop
            newNextBtn.disabled = false;
            newNextBtn.style.opacity = '1';
            newNextBtn.style.cursor = 'pointer';
            
            newNextBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                smoothInfiniteNext();
                restartAutoScroll();
            });
        }
        
        // Pause autoscroll on hover
        galleryCarousel.addEventListener('mouseenter', () => {
            isHovered = true;
            stopAutoScroll();
        });
        
        galleryCarousel.addEventListener('mouseleave', () => {
            isHovered = false;
            startAutoScroll();
        });
        
        // Pause when page is not visible
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                stopAutoScroll();
            } else if (!isHovered) {
                startAutoScroll();
            }
        });
        
        // Initialize position
        currentIndex = 0;
        updateGalleryPosition(false);
        
        // Start the autoscroll when page loads
        startAutoScroll();
        
        // Handle window resize to recalculate positions
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                updateGalleryPosition(false);
            }, 250);
        });
        
        console.log('Gallery infinite loop autoscroll initialized successfully');
        
    }, 500); // Wait 500ms after DOM ready
});
