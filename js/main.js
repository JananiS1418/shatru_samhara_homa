document.addEventListener('DOMContentLoaded', () => {
    const readMoreBtns = document.querySelectorAll('.read-more-btn');

    readMoreBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const card = btn.closest('.temple-card');
            const details = card.querySelector('.temple-details');
            const isExpanded = btn.getAttribute('aria-expanded') === 'true';

            if (isExpanded) {
                btn.setAttribute('aria-expanded', 'false');
                btn.classList.remove('active');
                details.classList.remove('expanded');
                btn.innerHTML = 'Read More <i class="fa-solid fa-chevron-down"></i>';
            } else {
                btn.setAttribute('aria-expanded', 'true');
                btn.classList.add('active');
                details.classList.add('expanded');
                btn.innerHTML = 'Read Less <i class="fa-solid fa-chevron-up"></i>';
            }
        });
    });
});

/* Navbar scroll spy logic */
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

// Function to update active link
function updateActiveLink() {
    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        // Offset by 150px to trigger slightly before reaching the section
        if (window.scrollY >= sectionTop - 150) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }
    });
}

// Update on scroll
window.addEventListener("scroll", updateActiveLink);
// Initial call to set correct state on load
updateActiveLink();

/* --------------------------------------------------------------------------
   Reviews Carousel Logic
   -------------------------------------------------------------------------- */
const track = document.getElementById('revTrack');
const prevBtn = document.getElementById('revPrevBtn');
const nextBtn = document.getElementById('revNextBtn');
const dots = document.querySelectorAll('#revDots .dot');

if (track && prevBtn && nextBtn) {
    let currentIndex = 0;
    
    function updateSlider() {
        const cards = track.querySelectorAll('.review-card');
        if (cards.length === 0) return;
        
        // Calculate dynamic width of one card + margins (10px left/right = 20px)
        const cardWidth = cards[0].offsetWidth + 20; 
        const containerWidth = track.parentElement.offsetWidth;
        
        // Calculate max index based on visible items
        const visibleItems = Math.max(1, Math.floor(containerWidth / cardWidth));
        const maxIndex = Math.max(0, cards.length - visibleItems);
        
        // Ensure current index is within bounds (e.g., if window is resized)
        if (currentIndex > maxIndex) currentIndex = maxIndex;
        if (currentIndex < 0) currentIndex = 0;
        
        // Apply transform
        track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        
        // Update dots
        // We might have fewer dots than cards, so update dynamically based on percentage or direct mapping
        dots.forEach((dot, index) => {
            dot.classList.remove('active');
            // Simplified dot logic: map index to dot 
            // In a production app, dots would be generated dynamically based on maxIndex
            if (index === Math.min(currentIndex, dots.length - 1)) {
                dot.classList.add('active');
            }
        });
        
        // Button states
        prevBtn.style.opacity = currentIndex === 0 ? "0.5" : "1";
        prevBtn.style.cursor = currentIndex === 0 ? "default" : "pointer";
        
        nextBtn.style.opacity = currentIndex >= maxIndex ? "0.5" : "1";
        nextBtn.style.cursor = currentIndex >= maxIndex ? "default" : "pointer";
    }

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    });

    nextBtn.addEventListener('click', () => {
        const cards = track.querySelectorAll('.review-card');
        const cardWidth = cards[0].offsetWidth + 20; 
        const containerWidth = track.parentElement.offsetWidth;
        const visibleItems = Math.max(1, Math.floor(containerWidth / cardWidth));
        const maxIndex = Math.max(0, cards.length - visibleItems);
        
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateSlider();
        }
    });

    // Handle window resize to recalculate slide boundaries
    window.addEventListener('resize', updateSlider);
    
    // Initial call
    setTimeout(updateSlider, 100); // slight delay to allow layout to settle
}

/* --------------------------------------------------------------------------
   FAQ Accordion Logic
   -------------------------------------------------------------------------- */
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    const toggleIcon = item.querySelector('.faq-toggle i');

    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close all other items first (optional, as requested in plan)
        faqItems.forEach(otherItem => {
            otherItem.classList.remove('active');
            const otherAnswer = otherItem.querySelector('.faq-answer');
            const otherIcon = otherItem.querySelector('.faq-toggle i');
            if (otherAnswer) otherAnswer.style.maxHeight = null;
            if (otherIcon) {
                otherIcon.classList.remove('fa-minus');
                otherIcon.classList.add('fa-plus');
            }
        });

        // If it wasn't active, open it now
        if (!isActive) {
            item.classList.add('active');
            // Calculate height of the answer content to animate max-height
            answer.style.maxHeight = answer.scrollHeight + "px";
            toggleIcon.classList.remove('fa-plus');
            toggleIcon.classList.add('fa-minus');
        }
    });
});

