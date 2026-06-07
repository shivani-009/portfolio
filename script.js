const typingText = document.getElementById("typing");

const roles = [
  "Full Stack Developer",
  "Java Developer",
  "DSA Learner",
  "Backend Developer",
  "AI Project Builder"
];

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
  const currentRole = roles[roleIndex];

  if (deleting) {
    typingText.textContent = currentRole.substring(0, charIndex--);
  } else {
    typingText.textContent = currentRole.substring(0, charIndex++);
  }

  if (!deleting && charIndex === currentRole.length + 1) {
    deleting = true;
    setTimeout(typeEffect, 1200);
    return;
  }

  if (deleting && charIndex === 0) {
    deleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
  }

  setTimeout(typeEffect, deleting ? 55 : 95);
}

typeEffect();

const revealElements = document.querySelectorAll(".reveal");

function revealOnScroll() {
  revealElements.forEach((element) => {
    const top = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (top < windowHeight - 100) {
      element.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");

  if (document.body.classList.contains("light")) {
    themeToggle.textContent = "☀️";
  } else {
    themeToggle.textContent = "🌙";
  }
});

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("show");
  });
});

const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 130;

    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navItems.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

const form = document.getElementById("contactForm");
const popup = document.getElementById("popup");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  try {
    await fetch("https://formsubmit.co/ajax/sv723596@gmail.com", {
      method: "POST",
      body: formData
    });

    popup.textContent = "✅ Message Sent Successfully!";
    popup.classList.add("show");
    form.reset();

    setTimeout(() => {
      popup.classList.remove("show");
    }, 3000);

  } catch (error) {
    popup.textContent = "❌ Message not sent. Try again!";
    popup.classList.add("show");

    setTimeout(() => {
      popup.classList.remove("show");
    }, 3000);
  }
});