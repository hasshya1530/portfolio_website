document.addEventListener("DOMContentLoaded", () => {
  const typedTextElement = document.querySelector(".typed-text");
  const roles = [
    "Tech Enthusiast",
    "Machine Learning Enthusiast",
    "Data Annalyst",
    "Web Developer",
    "AI Explorer",
  ];
  let currentIndex = 0;

  // Initial style setup for typed text
  Object.assign(typedTextElement.style, {
    opacity: 0,
    whiteSpace: "nowrap",
    display: "inline-block",
    fontFamily: "monospace",
    transition: "opacity 0.8s ease-in-out"
  });

  const sleep = (ms) => new Promise(res => setTimeout(res, ms));

  const typeText = async (text, speed = 80) => {
    typedTextElement.textContent = "";
    for (let char of text) {
      typedTextElement.textContent += char;
      await sleep(speed);
    }
  };

  const fade = async (element, toOpacity, duration = 800) => {
    element.style.opacity = toOpacity;
    return sleep(duration);
  };

  const cycleRoles = async () => {
    while (true) {
      await fade(typedTextElement, 1);
      await typeText(roles[currentIndex]);
      await sleep(1500);
      await fade(typedTextElement, 0);
      currentIndex = (currentIndex + 1) % roles.length;
    }
  };

  cycleRoles();

  // AOS (Animate On Scroll)
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 1500,
      once: true,
      easing: "ease-in-out"
    });
  }

  // VanillaTilt
  if (typeof VanillaTilt !== "undefined") {
    const tiltElements = document.querySelectorAll(".glass-card");
    if (tiltElements.length) {
      VanillaTilt.init(tiltElements, {
        max: 15,
        speed: 100,
        glare: true,
        "max-glare": 0.5
      });
    }
  }

  // Hamburger menu toggle logic
  const hamburgerBtn = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburgerBtn && navLinks) {
    // Initialize aria-expanded attribute for accessibility
    hamburgerBtn.setAttribute('aria-expanded', 'false');

    hamburgerBtn.addEventListener('click', () => {
      const isMenuOpen = navLinks.classList.contains('open');

      if (isMenuOpen) {
        // If menu is open, close it
        navLinks.classList.remove('open');
        hamburgerBtn.classList.remove('open'); // This line is crucial for icon toggle
        hamburgerBtn.setAttribute('aria-expanded', 'false');
      } else {
        // If menu is closed, open it
        navLinks.classList.add('open');
        hamburgerBtn.classList.add('open'); // This line is crucial for icon toggle
        hamburgerBtn.setAttribute('aria-expanded', 'true');
      }
    });

    // We removed the auto-close on link click in the previous step,
    // so this section remains commented out or removed as per your request.
    // navLinks.querySelectorAll('a').forEach(link => {
    //   link.addEventListener('click', () => {
    //     navLinks.classList.remove('open');
    //     hamburgerBtn.classList.remove('open');
    //     hamburgerBtn.setAttribute('aria-expanded', 'false');
    //   });
    // });
  }
});