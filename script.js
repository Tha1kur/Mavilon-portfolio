// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        
        // Toggle icon between bars and times
        const icon = mobileMenuBtn.querySelector('i');
        if (icon) {
            if (mobileMenu.classList.contains('hidden')) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            } else {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            }
        }
    });
    
    // Close mobile menu when clicking on a link
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });
}

// Navbar scroll effect - add shadow when scrolled
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.classList.add('shadow-lg');
        navbar.classList.remove('shadow-sm');
    } else {
        navbar.classList.remove('shadow-lg');
        navbar.classList.add('shadow-sm');
    }
    
    lastScroll = currentScroll;
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections for animation
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Active navigation link highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav a[href^="#"]');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('text-blue-600', 'font-semibold');
        link.classList.add('text-gray-700');
        
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.remove('text-gray-700');
            link.classList.add('text-blue-600', 'font-semibold');
        }
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in';
        document.body.style.opacity = '1';
    }, 100);
});

// Dark Mode Toggle Functionality
const darkModeToggle = document.getElementById('darkModeToggle');
const darkModeToggleMobile = document.getElementById('darkModeToggleMobile');
const darkModeIcon = document.getElementById('darkModeIcon');
const darkModeIconMobile = document.getElementById('darkModeIconMobile');

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';

// Apply theme on page load
if (currentTheme === 'dark') {
    document.documentElement.classList.add('dark');
    if (darkModeIcon) {
        darkModeIcon.classList.remove('fa-moon');
        darkModeIcon.classList.add('fa-sun');
    }
    if (darkModeIconMobile) {
        darkModeIconMobile.classList.remove('fa-moon');
        darkModeIconMobile.classList.add('fa-sun');
    }
} else {
    document.documentElement.classList.remove('dark');
}

// Toggle dark mode function
function toggleDarkMode() {
    const isDark = document.documentElement.classList.toggle('dark');
    const theme = isDark ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
    
    // Update icons
    if (darkModeIcon) {
        if (isDark) {
            darkModeIcon.classList.remove('fa-moon');
            darkModeIcon.classList.add('fa-sun');
        } else {
            darkModeIcon.classList.remove('fa-sun');
            darkModeIcon.classList.add('fa-moon');
        }
    }
    
    if (darkModeIconMobile) {
        if (isDark) {
            darkModeIconMobile.classList.remove('fa-moon');
            darkModeIconMobile.classList.add('fa-sun');
        } else {
            darkModeIconMobile.classList.remove('fa-sun');
            darkModeIconMobile.classList.add('fa-moon');
        }
    }
}

// Add event listeners
if (darkModeToggle) {
    darkModeToggle.addEventListener('click', toggleDarkMode);
}

if (darkModeToggleMobile) {
    darkModeToggleMobile.addEventListener('click', toggleDarkMode);
}
// ===== Floating Particles =====
const canvas = document.getElementById("particles-canvas");

if (canvas) {
  const ctx = canvas.getContext("2d");

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  const particles = [];
  const particleCount = 60;

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 1,
      speedX: Math.random() * 0.6 - 0.3,
      speedY: Math.random() * 0.6 - 0.3,
      opacity: Math.random() * 0.5 + 0.3
    });
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(34, 211, 238, ${p.opacity})`;
      ctx.fill();

      p.x += p.speedX;
      p.y += p.speedY;

      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;
    });

    requestAnimationFrame(animateParticles);
  }

  animateParticles();
}
// ===== Page Load Fade Animation =====
window.addEventListener("load", () => {
  document.body.classList.add("page-fade-in");
});

// ===== Section Transition Overlay =====
const transitionOverlay = document.getElementById("page-transition");

if (transitionOverlay) {
  document.querySelectorAll("nav a[href^='#'], .hero a[href^='#']").forEach(link => {
    link.addEventListener("click", () => {
      transitionOverlay.style.opacity = "1";
      setTimeout(() => {
        transitionOverlay.style.opacity = "0";
      }, 600);
    });
  });
}

// ===== Loader Fade Out =====
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if (loader) {
    loader.style.opacity = "0";
    setTimeout(() => loader.style.display = "none", 600);
  }
});

// ===== 3D Tilt Effect for Project Cards =====
document.querySelectorAll(".tilt-card").forEach(card => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 15;
    const rotateY = (centerX - x) / 15;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(0) rotateY(0)";
  });
});
// ===== Scroll Progress Bar =====
const progressBar = document.getElementById("scroll-progress");

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;

  if (progressBar) {
    progressBar.style.width = progress + "%";
  }
});
// ===== Magnetic Cursor Effect =====
document.querySelectorAll(".magnetic").forEach(el => {
  el.addEventListener("mousemove", (e) => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  });

  el.addEventListener("mouseleave", () => {
    el.style.transform = "translate(0, 0)";
  });
});