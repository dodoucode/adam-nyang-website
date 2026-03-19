/* ============================================================
   ADAM NYANG — AUTHOR WEBSITE
   JavaScript: main.js

   TABLE OF CONTENTS:
   01. Navbar — scroll shadow effect
   02. Mobile Menu — open, close, toggle
   03. Scroll Animations — fade-up on scroll
   04. Newsletter Form — success message
   05. Active Nav Link — highlight current page
============================================================ */


/* ============================================================
   01. NAVBAR — SCROLL SHADOW EFFECT
   — Adds a soft shadow to the navbar when user scrolls down
   — Removed again when user scrolls back to the top
============================================================ */

// Get the navbar element
const navbar = document.getElementById('navbar');

// Listen for scroll events on the window
window.addEventListener('scroll', function () {
  if (window.scrollY > 40) {
    // User scrolled down — add shadow class
    navbar.classList.add('scrolled');
  } else {
    // User is at the top — remove shadow class
    navbar.classList.remove('scrolled');
  }
});


/* ============================================================
   02. MOBILE MENU — OPEN, CLOSE, TOGGLE
   — Hamburger button toggles the full-screen mobile menu
   — Menu closes when: hamburger clicked again, a link is
     clicked, or browser is resized to desktop width
============================================================ */

// Get the elements we need
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

// Safety check — only run if both elements exist on the page
if (hamburger && mobileMenu) {

  /* ── Open the menu ── */
  function openMenu() {
    mobileMenu.classList.add('is-open');      // Shows overlay
    hamburger.classList.add('is-active');     // Animates hamburger to X
    document.body.style.overflow = 'hidden';  // Locks background scroll
  }

  /* ── Close the menu ── */
  function closeMenu() {
    mobileMenu.classList.remove('is-open');   // Hides overlay
    hamburger.classList.remove('is-active');  // Resets hamburger to ☰
    document.body.style.overflow = '';        // Restores background scroll
  }

  /* ── Toggle on hamburger click ── */
  hamburger.addEventListener('click', function () {
    if (mobileMenu.classList.contains('is-open')) {
      closeMenu(); // Already open — close it
    } else {
      openMenu();  // Currently closed — open it
    }
  });

  /* ── Close when any menu link is clicked ── */
  const mobileLinks = mobileMenu.querySelectorAll('a');
  mobileLinks.forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  /* ── Auto-close on resize to desktop ──
     Prevents menu staying open after widening the browser */
  window.addEventListener('resize', function () {
    if (window.innerWidth > 768) {
      closeMenu();
    }
  });

  /* ── Close if user clicks the overlay background ── */
  mobileMenu.addEventListener('click', function (e) {
    if (e.target === mobileMenu) {
      closeMenu();
    }
  });

}


/* ============================================================
   03. SCROLL ANIMATIONS — FADE UP ON SCROLL
   — Elements with class "fade-up" start invisible
   — When they enter the viewport they smoothly appear
   — Uses IntersectionObserver (efficient, no dependencies)
============================================================ */

const fadeElements = document.querySelectorAll('.fade-up');

if (fadeElements.length > 0) {

  const fadeObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          // Element entered the viewport — animate it in
          entry.target.classList.add('is-visible');
          // Stop watching once it has appeared
          fadeObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,                 // Trigger when 12% of element is visible
      rootMargin: '0px 0px -40px 0px' // Fire slightly before bottom of screen
    }
  );

  fadeElements.forEach(function (el) {
    fadeObserver.observe(el);
  });

}


/* ============================================================
   04. NEWSLETTER FORM — SUCCESS MESSAGE
   — Shows a thank-you message on form submit
   — Real email delivery connected via MailerLite later
============================================================ */

/* const newsletterForm = document.getElementById('newsletterForm');

if (newsletterForm) {

  newsletterForm.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent page reload

    const emailInput = newsletterForm.querySelector('input[type="email"]');
    const email = emailInput ? emailInput.value.trim() : '';

    // Only proceed with a valid email
    if (!email || !email.includes('@')) return;

    // Hide form, show success message
    newsletterForm.style.display = 'none';

    const successMsg = document.getElementById('newsletterSuccess');
    if (successMsg) {
      successMsg.style.display = 'block';
    }
  });

} */


const newsletterForm = document.getElementById('newsletterForm');

if (newsletterForm) {
  newsletterForm.addEventListener('submit', function (e) {

    const emailInput = newsletterForm.querySelector('input[type="email"]');
    const email = emailInput ? emailInput.value.trim() : '';

    if (!email || !email.includes('@')) return;

    // Send to Brevo in the background
    const formData = new FormData(newsletterForm);
    fetch(newsletterForm.action, {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    });

    // Show success message immediately
    newsletterForm.style.display = 'none';
    const successMsg = document.getElementById('newsletterSuccess');
    if (successMsg) {
      successMsg.style.display = 'block';
    }
  });
}

/* ============================================================
   05. ACTIVE NAV LINK — HIGHLIGHT CURRENT PAGE
   — Automatically marks the correct nav link as active
   — Works by comparing link href to the current page filename
============================================================ */

// Get current page filename — default to index.html if at root
const currentPage = window.location.pathname.split('/').pop() || 'index.html';

// Target all links in both desktop navbar and mobile menu
const allNavLinks = document.querySelectorAll('.navbar__links a, .mobile-menu a');

allNavLinks.forEach(function (link) {
  link.classList.remove('active');

  const linkHref = link.getAttribute('href');

  if (linkHref === currentPage) {
    link.classList.add('active');
  }
});



/* ============================================================
   06. TYPEWRITER EFFECT — Hero name rotation
   — Cycles through words on the homepage hero
============================================================ */

const typewriterEl = document.querySelector('.hero__name');
if (typewriterEl) typewriterEl.classList.add('typewriter');

if (typewriterEl) {
  const words = ['Adam Nyang', 'International Author', 'Public Speaker', 'Universal Voice'];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
      typewriterEl.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typewriterEl.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    let speed = isDeleting ? 60 : 100;

    if (!isDeleting && charIndex === currentWord.length) {
      speed = 1800;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      speed = 400;
    }

    setTimeout(type, speed);
  }

  setTimeout(type, 1000);
}
