// ==================== INIT AOS ANIMATION ====================
AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true,
    offset: 100
});

// ==================== NAVBAR SCROLL EFFECT ====================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ==================== MOBILE MENU TOGGLE ====================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ==================== ACTIVE NAV LINK ON SCROLL ====================
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// ==================== SMOOTH SCROLL FOR ANCHOR LINKS ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==================== ✉️ CONTACT FORM WITH FORMSPREE ====================
const contactForm = document.querySelector('.contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        
        // Loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        formStatus.textContent = '';
        
        try {
            const formData = new FormData(contactForm);
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });
            
            if (response.ok) {
                formStatus.textContent = '✅ Message sent! I will reply soon.';
                formStatus.style.color = '#4CAF50';
                contactForm.reset();
            } else {
                const data = await response.json();
                formStatus.textContent = `❌ Error: ${data.error || 'Something went wrong'}`;
                formStatus.style.color = '#f44336';
            }
        } catch (error) {
            formStatus.textContent = '❌ Network error. Please try again.';
            formStatus.style.color = '#f44336';
            console.error('Form error:', error);
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
            
            // Clear status after 5 seconds
            setTimeout(() => {
                formStatus.textContent = '';
            }, 5000);
        }
    });
}
// ==================== PROGRESS BAR ANIMATION ====================
const progressBars = document.querySelectorAll('.progress');

const animateProgressBars = () => {
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        
        setTimeout(() => {
            bar.style.width = width;
        }, 500);
    });
};

// Trigger animation when skills section is in view
const skillsSection = document.querySelector('.skills');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateProgressBars();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if (skillsSection) {
    observer.observe(skillsSection);
}

// ==================== TYPING EFFECT FOR HERO ====================
const heroTitle = document.querySelector('.hero-title');

if (heroTitle) {
    const text = heroTitle.innerHTML;
    heroTitle.innerHTML = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            heroTitle.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    };
    
    // Start typing after page load
    setTimeout(typeWriter, 500);
}

// ==================== SCROLL TO TOP BUTTON ====================
const scrollToTop = document.createElement('button');
scrollToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTop.className = 'scroll-to-top';
scrollToTop.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: #3E2723;
    color: #FFD54F;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    font-size: 1.2rem;
    display: none;
    z-index: 999;
    transition: all 0.3s ease;
`;

scrollToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

document.body.appendChild(scrollToTop);

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollToTop.style.display = 'block';
    } else {
        scrollToTop.style.display = 'none';
    }
});

// ==================== PARALLAX EFFECT FOR HERO ====================
const hero = document.querySelector('.hero');

if (hero) {
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
    });
}

console.log('🦁 My Safari Journey Website Loaded Successfully!');
// ==================== 🎵 BACKGROUND MUSIC ====================
const bgMusic = document.getElementById('bg-music');
const musicToggle = document.getElementById('music-toggle');
const musicVolume = document.getElementById('music-volume');

// Set volume awal
if (bgMusic && musicVolume) {
    bgMusic.volume = musicVolume.value;
    
    // Volume change handler
    musicVolume.addEventListener('input', (e) => {
        bgMusic.volume = e.target.value;
        localStorage.setItem('musicVolume', e.target.value);
    });
    
    // Load volume dari localStorage
    const savedVolume = localStorage.getItem('musicVolume');
    if (savedVolume) {
        bgMusic.volume = savedVolume;
        musicVolume.value = savedVolume;
    }
}

// Toggle play/pause
if (musicToggle && bgMusic) {
    musicToggle.addEventListener('click', () => {
        if (bgMusic.paused) {
            bgMusic.play().then(() => {
                musicToggle.classList.add('playing');
                musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
                localStorage.setItem('musicPlaying', 'true');
            }).catch(error => {
                console.log('Autoplay prevented:', error);
                alert('🎵 Klik tombol lagi untuk memutar musik!');
            });
        } else {
            bgMusic.pause();
            musicToggle.classList.remove('playing');
            musicToggle.innerHTML = '<i class="fas fa-music"></i>';
            localStorage.setItem('musicPlaying', 'false');
        }
    });
    
    // Restore play state dari localStorage
    const wasPlaying = localStorage.getItem('musicPlaying') === 'true';
    if (wasPlaying && bgMusic) {
        // Note: Browser butuh user interaction untuk autoplay
        musicToggle.addEventListener('click', function initPlay() {
            if (bgMusic.paused) {
                bgMusic.play();
                musicToggle.classList.add('playing');
                musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
            }
            musicToggle.removeEventListener('click', initPlay);
        }, { once: true });
    }
}
// ==================== 🌙 DARK MODE TOGGLE ====================
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Cek preferensi dari localStorage atau system
const savedTheme = localStorage.getItem('theme');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    body.classList.add('dark-mode');
}

// Toggle function
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });
}
// ==================== 🗂️ PROJECT PORTFOLIO ====================
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const modal = document.getElementById('project-modal');
const modalClose = document.querySelector('.modal-close');
const modalBody = document.getElementById('modal-body');
const viewBtns = document.querySelectorAll('.project-view-btn');

// Filter functionality
if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            
            // Filter cards
            projectCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Modal functionality
const projectData = {
    1: {
        title: "Project Name",
        image: "images/projects/project1.jpg",
        description: "Detailed description of this amazing project. What problem does it solve? What technologies were used?",
        tech: ["HTML5", "CSS3", "JavaScript", "Git"],
        links: {
            demo: "https://demo-link.com",
            github: "https://github.com/phazri/project-name"
        }
    },
    2: {
        title: "Security Audit Tool",
        image: "images/projects/project2.jpg",
        description: "An automated vulnerability scanner built with Python. Helps identify common security issues in web applications.",
        tech: ["Python", "Flask", "SQL", "Docker"],
        links: {
            demo: null,
            github: "https://github.com/phazri/security-audit"
        }
    }
    // Tambahkan project lainnya...
};

if (viewBtns.length > 0) {
    viewBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const projectId = btn.dataset.project;
            const data = projectData[projectId];
            
            if (data) {
                modalBody.innerHTML = `
                    <img src="${data.image}" alt="${data.title}">
                    <h3>${data.title}</h3>
                    <p>${data.description}</p>
                    <div class="project-tech">
                        ${data.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                    <div class="project-links">
                        ${data.links.demo ? `<a href="${data.links.demo}" target="_blank"><i class="fas fa-external-link-alt"></i> Live Demo</a>` : ''}
                        ${data.links.github ? `<a href="${data.links.github}" target="_blank"><i class="fab fa-github"></i> Source Code</a>` : ''}
                    </div>
                `;
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });
}

// Close modal
if (modalClose) {
    modalClose.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    });
}

// Close modal when clicking outside
if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal?.classList.contains('active')) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
});
// 🎇 Particle Background
if (document.getElementById('particles-js')) {
    particlesJS('particles-js', {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: "#FFD54F" },
            shape: { type: "circle" },
            opacity: { value: 0.3, random: true },
            size: { value: 3, random: true },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#FFD54F",
                opacity: 0.2,
                width: 1
            },
            move: { enable: true, speed: 2, direction: "none", random: true }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: { enable: true, mode: "grab" },
                onclick: { enable: true, mode: "push" }
            }
        },
        retina_detect: true
    });
}