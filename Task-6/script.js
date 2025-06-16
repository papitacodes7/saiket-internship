// =======================
// Navigation Functionality
// =======================

// Get references to navbar, mobile menu button, and navigation links
const navbar = document.querySelector('.navbar');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');


document.getElementById('home-link').addEventListener('click', e => {
  e.preventDefault(); // Prevent default jump
  window.scrollTo({ top: 0, behavior: 'smooth' }); // Smooth scroll to top
});


// Change navbar style on scroll for sticky effect and shadow
window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    // Add background and shadow when scrolled down
    navbar.style.backgroundColor = 'white';
    navbar.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
  } else {
    // Make navbar transparent at the top
    navbar.style.backgroundColor = 'transparent';
    navbar.style.boxShadow = 'none';
  }
});

// Toggle mobile navigation menu on hamburger button click
mobileMenuBtn.addEventListener('click', () => {
  // Show or hide nav links based on current state
  navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
});

// Adjust nav links display on window resize for responsiveness
window.addEventListener('resize', () => {
  if (window.innerWidth >= 768) {
    // Show nav links on desktop/tablet
    navLinks.style.display = 'flex';
  } else {
    // Hide nav links on mobile by default
    navLinks.style.display = 'none';
  }
});

// =======================
// Smooth Scrolling for Anchor Links
// =======================

// Add smooth scroll behavior for all anchor links that reference IDs
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault(); // Prevent default jump

    const targetId = this.getAttribute('href').substring(1); // Get ID without '#'
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      const offset = 80; // Offset for fixed navbar height
      const targetPosition = targetElement.offsetTop - offset;

      // Scroll smoothly to the target position
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });

      // Close mobile menu after navigation on small screens
      if (window.innerWidth < 768) {
        navLinks.style.display = 'none';
      }
    }
  });
});

// =======================
// Features Section Interactivity
// =======================

// Get all feature cards
const featureCards = document.querySelectorAll('.feature-card');

// Highlight the clicked feature card by changing its top border color
featureCards.forEach(card => {
  card.addEventListener('click', () => {
    // Reset all cards' border color
    featureCards.forEach(c => c.style.borderTopColor = 'transparent');
    // Highlight the clicked card
    card.style.borderTopColor = 'var(--color-primary)';
  });
});

// =======================
// Testimonials Slider Logic
// =======================

// Array of testimonial data objects
const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Marketing Director",
    company: "TechCorp",
    quote: "Quantum has revolutionized how our marketing team collaborates. We've seen a 40% increase in campaign turnaround times since implementation.",
    avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    rating: 5
  },
  {
    name: "Michael Rodriguez",
    role: "Project Manager",
    company: "InnovateCo",
    quote: "The customizable workflows have been a game-changer for our project management. We're now completing projects ahead of schedule consistently.",
    avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    rating: 5
  },
  {
    name: "Emily Chen",
    role: "CTO",
    company: "StartupX",
    quote: "As we scaled our team from 5 to 50, Quantum scaled with us. The analytics features have given us insights we never had before.",
    avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    rating: 4
  }
];

// Track the currently displayed testimonial index
let currentTestimonial = 0;

// Get references to testimonial card container and slider controls
const testimonialCard = document.querySelector('.testimonial-card');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const sliderDots = document.querySelector('.slider-dots');

// Dynamically create navigation dots for each testimonial
testimonials.forEach((_, index) => {
  const dot = document.createElement('button');
  dot.setAttribute('aria-label', `Go to testimonial ${index + 1}`);
  dot.addEventListener('click', () => showTestimonial(index));
  sliderDots.appendChild(dot);
});

// Function to display a testimonial by index
function showTestimonial(index) {
  const testimonial = testimonials[index];
  currentTestimonial = index;

  // Render testimonial content and rating stars
  testimonialCard.innerHTML = `
    <div class="testimonial-content">
      <img src="${testimonial.avatar}" alt="${testimonial.name}" class="testimonial-avatar">
      <div class="testimonial-info">
        <h3>${testimonial.name}</h3>
        <p class="role">${testimonial.role}</p>
        <p class="company">${testimonial.company}</p>
        <div class="rating">${'★'.repeat(testimonial.rating)}${'☆'.repeat(5 - testimonial.rating)}</div>
      </div>
      <blockquote>
        <p>${testimonial.quote}</p>
      </blockquote>
    </div>
  `;

  // Update active state for slider dots
  const dots = sliderDots.querySelectorAll('button');
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
}

// Show previous testimonial on prev button click
prevBtn.addEventListener('click', () => {
  currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
  showTestimonial(currentTestimonial);
});

// Show next testimonial on next button click
nextBtn.addEventListener('click', () => {
  currentTestimonial = (currentTestimonial + 1) % testimonials.length;
  showTestimonial(currentTestimonial);
});

// Initialize by showing the first testimonial
showTestimonial(0);

// Auto-advance testimonials every 5 seconds
let testimonialInterval = setInterval(() => {
  currentTestimonial = (currentTestimonial + 1) % testimonials.length;
  showTestimonial(currentTestimonial);
}, 2000);

// Pause auto-advance when mouse is over the testimonial card
testimonialCard.addEventListener('mouseenter', () => {
  clearInterval(testimonialInterval);
});

// Resume auto-advance when mouse leaves the testimonial card
testimonialCard.addEventListener('mouseleave', () => {
  testimonialInterval = setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
  }, 5000);
});

// =======================
// Contact Form Validation and Submission
// =======================

// Get the contact form and all input/textarea fields inside it
const contactForm = document.getElementById('contact-form');
const formInputs = contactForm.querySelectorAll('input, textarea');

// Validate a single input field and show error messages as needed
function validateInput(input) {
  const errorMessage = input.nextElementSibling; // The error message element after the input
  let isValid = true;

  // Check for empty value (required)
  if (!input.value.trim()) {
    errorMessage.textContent = `${input.name.charAt(0).toUpperCase() + input.name.slice(1)} is required`;
    isValid = false;
  // Validate email format for email fields
  } else if (input.type === 'email' && !/\S+@\S+\.\S+/.test(input.value)) {
    errorMessage.textContent = 'Please enter a valid email address';
    isValid = false;
  // Validate minimum length for message textarea
  } else if (input.name === 'message' && input.value.trim().length < 10) {
    errorMessage.textContent = 'Message must be at least 10 characters';
    isValid = false;
  } else {
    // Clear error message if valid
    errorMessage.textContent = '';
  }

  // Add or remove error class for styling
  input.classList.toggle('error', !isValid);
  return isValid;
}

// Attach validation to each input on input and blur events
formInputs.forEach(input => {
  input.addEventListener('input', () => validateInput(input));
  input.addEventListener('blur', () => validateInput(input));
});

// Handle form submission
contactForm.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent default form submission

  let isValid = true; // Track overall form validity

  // Validate all fields; if any are invalid, prevent submission
  formInputs.forEach(input => {
    if (!validateInput(input)) {
      isValid = false;
    }
  });

  // If all fields are valid, simulate form submission
  if (isValid) {
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;

    submitButton.disabled = true; // Prevent multiple submissions
    submitButton.textContent = 'Sending...'; // Show loading state

    // Simulate async submission (e.g., AJAX)
    setTimeout(() => {
      const formData = new FormData(contactForm); // Gather form data
      const data = Object.fromEntries(formData.entries()); // Convert to object
      console.log('Form submitted:', data); // Log data (replace with real submission)

      // Replace form with thank you message and reload option
      contactForm.innerHTML = `
        <div class="text-center">
          <div style="color: var(--color-primary); font-size: 2rem; margin-bottom: 1rem;">✓</div>
          <h3 style="margin-bottom: 0.5rem;">Thank You!</h3>
          <p style="color: var(--color-gray-600); margin-bottom: 1rem;">
            Your message has been received. We'll get back to you as soon as possible.
          </p>
          <button class="btn btn-primary" onclick="location.reload()">Send another message</button>
        </div>
      `;
    }, 1000); // Simulate 1.5s network delay
  }
});