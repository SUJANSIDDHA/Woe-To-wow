// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start', // Align to the top of the viewport
      });

      // Accessibility: Make target focusable and focus on it
      targetElement.setAttribute('tabindex', '-1');
      targetElement.focus({ preventScroll: true });
    } else {
      console.warn(`Target element "${targetId}" not found.`);
    }
  });
});

// Throttle Function
const throttle = (func, limit) => {
  let lastFunc;
  let lastRan;
  return function () {
    const context = this;
    const args = arguments;
    if (!lastRan) {
      func.apply(context, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(() => {
        if (Date.now() - lastRan >= limit) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
};

// Scroll Event Listener
window.addEventListener(
  'scroll',
  throttle(() => {
    console.log('Scroll event triggered');
    // Additional scroll-based logic can be added here
  }, 200) // Adjust throttle time as needed
);

// Animation on Scroll (Using AOS Library)
(() => {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 1200, // Animation duration in milliseconds
      easing: 'ease-in-out', // Animation easing effect
      once: true, // Trigger animations only once
      mirror: false, // Disable animation on scroll-back
      offset: 50, // Trigger animations slightly earlier
    });

    // Reinitialize AOS for dynamically loaded content
    const observer = new MutationObserver(() => {
      AOS.refresh();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true, // Monitor the entire DOM tree for changes
    });
  } else {
    console.warn('AOS library is not loaded.');
  }
})();
document.addEventListener('DOMContentLoaded', function() {
    const examples = document.querySelectorAll('.example-content');
    let currentExampleIndex = 0;

    function showExample(index) {
        examples.forEach((example, i) => {
            example.classList.remove('active');
            example.style.display = 'none';
            if (i === index) {
                example.classList.add('active');
                example.style.display = 'block';
            }
        });
    }

    document.getElementById('prev-example').addEventListener('click', function() {
        currentExampleIndex = (currentExampleIndex - 1 + examples.length) % examples.length;
        showExample(currentExampleIndex);
    });

    document.getElementById('next-example').addEventListener('click', function() {
        currentExampleIndex = (currentExampleIndex + 1) % examples.length;
        showExample(currentExampleIndex);
    });

    // Initialize the first example
    showExample(currentExampleIndex);
});

document.addEventListener('DOMContentLoaded', function() {
    const examples = document.querySelectorAll('.example-content');
    let currentExampleIndex = 0;

    document.getElementById('next-example').addEventListener('click', function() {
        examples[currentExampleIndex].style.display = 'none'; // Hide current example
        currentExampleIndex = (currentExampleIndex + 1) % examples.length; // Move to next example
        examples[currentExampleIndex].style.display = 'block'; // Show next example
    });
});