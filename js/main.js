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
// ==================== 🎯 INTERACTIVE HOBBY MODAL ====================

// Data untuk setiap hobby (bisa disesuaikan dengan konten Anda)
const hobbyData = {
    reading: {
        title: "Reading & Literature",
        subtitle: "Exploring worlds through words",
        headerImage: "images/hobbies/reading-header.jpg",
        description: "Reading has been my passion since childhood. I love diving into different genres - from fantasy novels that spark imagination to self-development books that help me grow. Every book teaches me something new and opens my mind to different perspectives.",
        
        stats: {
            booksRead: "150+",
            favoriteGenre: "Fantasy & Sci-Fi",
            hoursReading: "500+",
            currentlyReading: "5"
        },
        
        favoriteBooks: [
            {
                title: "The Alchemist",
                author: "Paulo Coelho",
                rating: 5,
                cover: "images/hobbies/books/alchemist.jpg"
            },
            {
                title: "Atomic Habits",
                author: "James Clear",
                rating: 5,
                cover: "images/hobbies/books/atomic-habits.jpg"
            },
            {
                title: "Harry Potter Series",
                author: "J.K. Rowling",
                rating: 5,
                cover: "images/hobbies/books/harry-potter.jpg"
            },
            {
                title: "Rich Dad Poor Dad",
                author: "Robert Kiyosaki",
                rating: 4,
                cover: "images/hobbies/books/rich-dad.jpg"
            }
        ],
        
        equipment: [
            {
                icon: "fa-book-open",
                title: "Kindle Paperwhite",
                desc: "E-reader untuk baca digital"
            },
            {
                icon: "fa-bookmark",
                title: "Goodreads",
                desc: "Tracking bacaan & review"
            },
            {
                icon: "fa-coffee",
                title: "Coffee Shop",
                desc: "Tempat baca favorit"
            }
        ],
        
        gallery: [
            "images/hobbies/reading/photo1.jpg",
            "images/hobbies/reading/photo2.jpg",
            "images/hobbies/reading/photo3.jpg",
            "images/hobbies/reading/photo4.jpg"
        ]
    },
    
    music: {
        title: "Music & Guitar",
        subtitle: "Creating melodies, expressing emotions",
        headerImage: "images/hobbies/music-header.jpg",
        description: "Music is my therapy. I've been playing guitar for 5 years, starting from acoustic to electric. I love playing various genres - from pop, rock, to fingerstyle. Sometimes I record covers and share them on social media.",
        
        stats: {
            yearsPlaying: "5 Years",
            songsLearned: "100+",
            genres: "Pop, Rock, Fingerstyle",
            practiceHours: "1000+"
        },
        
        favoriteSongs: [
            {
                title: "Tears in Heaven",
                artist: "Eric Clapton",
                difficulty: "Intermediate",
                rating: 5
            },
            {
                title: "Wonderwall",
                artist: "Oasis",
                difficulty: "Beginner",
                rating: 4
            },
            {
                title: "Blackbird",
                artist: "The Beatles",
                difficulty: "Advanced",
                rating: 5
            },
            {
                title: "Hotel California",
                artist: "Eagles",
                difficulty: "Advanced",
                rating: 5
            }
        ],
        
        equipment: [
            {
                icon: "fa-guitar",
                title: "Yamaha F310",
                desc: "Acoustic guitar pertama"
            },
            {
                icon: "fa-music",
                title: "Fender Stratocaster",
                desc: "Electric guitar"
            },
            {
                icon: "fa-sliders-h",
                title: "Audio Interface",
                desc: "Untuk recording"
            }
        ],
        
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Ganti dengan video Anda
        
        gallery: [
            "images/hobbies/music/photo1.jpg",
            "images/hobbies/music/photo2.jpg",
            "images/hobbies/music/photo3.jpg",
            "images/hobbies/music/photo4.jpg"
        ]
    },
    
    photography: {
        title: "Photography",
        subtitle: "Capturing moments that last forever",
        headerImage: "images/hobbies/photography-header.jpg",
        description: "Photography allows me to freeze time and capture beautiful moments. I enjoy various types of photography - from landscape and street photography to portraits. Every photo tells a story, and I love being the storyteller.",
        
        stats: {
            photosTaken: "5000+",
            favoriteSubject: "Landscape & Portrait",
            yearsShooting: "3 Years",
            editingHours: "300+"
        },
        
        equipment: [
            {
                icon: "fa-camera",
                title: "Canon EOS M50",
                desc: "Mirrorless camera utama"
            },
            {
                icon: "fa-circle",
                title: "50mm f/1.8",
                desc: "Prime lens favorit"
            },
            {
                icon: "fa-laptop",
                title: "Lightroom & Photoshop",
                desc: "Editing software"
            },
            {
                icon: "fa-sun",
                title: "Golden Hour",
                desc: "Waktu foto terbaik"
            }
        ],
        
        gallery: [
            "images/hobbies/photography/photo1.jpg",
            "images/hobbies/photography/photo2.jpg",
            "images/hobbies/photography/photo3.jpg",
            "images/hobbies/photography/photo4.jpg",
            "images/hobbies/photography/photo5.jpg",
            "images/hobbies/photography/photo6.jpg"
        ],
        
        achievements: [
            {
                date: "2024",
                title: "Photography Exhibition",
                desc: "Mengikuti pameran foto kampus"
            },
            {
                date: "2023",
                title: "Photo Contest Winner",
                desc: "Juara 2 lomba foto landscape"
            }
        ]
    },
    
    traveling: {
        title: "Traveling & Adventure",
        subtitle: "Exploring the world, one city at a time",
        headerImage: "images/hobbies/traveling-header.jpg",
        description: "Traveling broadens my horizons and teaches me about different cultures, foods, and ways of life. I love exploring both natural landscapes and urban cities. Every trip gives me new experiences and unforgettable memories.",
        
        stats: {
            citiesVisited: "15+",
            countriesVisited: "3",
            favoriteDestination: "Bali & Yogyakarta",
            travelDays: "100+"
        },
        
        favoriteDestinations: [
            {
                title: "Bali, Indonesia",
                location: "Indonesia",
                rating: 5,
                highlight: "Beautiful beaches & culture"
            },
            {
                title: "Yogyakarta",
                location: "Indonesia",
                rating: 5,
                highlight: "Borobudur & local wisdom"
            },
            {
                title: "Bandung",
                location: "Indonesia",
                rating: 4,
                highlight: "Cool weather & culinary"
            },
            {
                title: "Singapore",
                location: "Singapore",
                rating: 5,
                highlight: "Modern city & attractions"
            }
        ],
        
        timeline: [
            {
                date: "December 2024",
                title: "Bali Adventure",
                desc: "Explored Ubud, Kuta, and Uluwatu. Experienced amazing sunsets and traditional culture."
            },
            {
                date: "August 2024",
                title: "Yogyakarta Trip",
                desc: "Visited Borobudur at sunrise, explored Malioboro, and enjoyed local cuisine."
            },
            {
                date: "March 2024",
                title: "Singapore Visit",
                desc: "Experienced modern city life, visited Gardens by the Bay and Universal Studios."
            }
        ],
        
        gallery: [
            "images/hobbies/traveling/photo1.jpg",
            "images/hobbies/traveling/photo2.jpg",
            "images/hobbies/traveling/photo3.jpg",
            "images/hobbies/traveling/photo4.jpg",
            "images/hobbies/traveling/photo5.jpg",
            "images/hobbies/traveling/photo6.jpg"
        ]
    }
};

// Modal elements
const hobbyModal = document.getElementById('hobby-modal');
const hobbyModalClose = document.getElementById('hobby-modal-close');
const hobbyModalBody = document.getElementById('hobby-modal-body');
const hobbyCards = document.querySelectorAll('.hobby-card');

// Function to generate star rating
function generateStars(rating) {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
}

// Function to create modal content
function createModalContent(hobbyKey) {
    const data = hobbyData[hobbyKey];
    if (!data) return '';
    
    let content = `
        <div class="modal-header">
            <img src="${data.headerImage}" alt="${data.title}" onerror="this.src='https://via.placeholder.com/900x300/6D4C41/FFD54F?text=${encodeURIComponent(data.title)}'">
            <div class="modal-header-overlay">
                <h2>${data.title}</h2>
                <p>${data.subtitle}</p>
            </div>
        </div>
        
        <div class="modal-content-section">
            <h3 class="modal-section-title">
                <i class="fas fa-info-circle"></i> About This Hobby
            </h3>
            <p class="modal-text">${data.description}</p>
            
            <!-- Stats -->
            ${data.stats ? `
            <h3 class="modal-section-title">
                <i class="fas fa-chart-bar"></i> My Stats
            </h3>
            <div class="stats-grid">
                ${Object.entries(data.stats).map(([key, value]) => `
                    <div class="stat-card">
                        <span class="stat-number">${value}</span>
                        <div class="stat-label">${key.replace(/([A-Z])/g, ' $1').trim()}</div>
                    </div>
                `).join('')}
            </div>
            ` : ''}
            
            <!-- Favorite Books (for reading) -->
            ${data.favoriteBooks ? `
            <h3 class="modal-section-title">
                <i class="fas fa-heart"></i> Favorite Books
            </h3>
            <div class="favorite-list">
                ${data.favoriteBooks.map(book => `
                    <div class="favorite-item">
                        <img src="${book.cover}" alt="${book.title}" class="favorite-cover" onerror="this.style.display='none'">
                        <div class="favorite-info">
                            <h4>${book.title}</h4>
                            <p>by ${book.author}</p>
                            <div class="favorite-rating">${generateStars(book.rating)}</div>
                        </div>
                    </div>
                `).join('')}
            </div>
            ` : ''}
            
            <!-- Favorite Songs (for music) -->
            ${data.favoriteSongs ? `
            <h3 class="modal-section-title">
                <i class="fas fa-music"></i> Favorite Songs to Play
            </h3>
            <div class="favorite-list">
                ${data.favoriteSongs.map(song => `
                    <div class="favorite-item">
                        <div class="favorite-info" style="flex: 1;">
                            <h4>${song.title}</h4>
                            <p>${song.artist}</p>
                            <p style="font-size: 0.85rem; color: var(--primary-light);">
                                <i class="fas fa-signal"></i> ${song.difficulty}
                            </p>
                            <div class="favorite-rating">${generateStars(song.rating)}</div>
                        </div>
                    </div>
                `).join('')}
            </div>
            ` : ''}
            
            <!-- Video (for music) -->
            ${data.videoUrl ? `
            <h3 class="modal-section-title">
                <i class="fas fa-video"></i> Watch Me Play
            </h3>
            <div class="video-container">
                <iframe src="${data.videoUrl}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            ` : ''}
            
            <!-- Favorite Destinations (for traveling) -->
            ${data.favoriteDestinations ? `
            <h3 class="modal-section-title">
                <i class="fas fa-map-marked-alt"></i> Favorite Destinations
            </h3>
            <div class="favorite-list">
                ${data.favoriteDestinations.map(dest => `
                    <div class="favorite-item">
                        <div class="favorite-info" style="flex: 1;">
                            <h4>${dest.title}</h4>
                            <p><i class="fas fa-map-marker-alt"></i> ${dest.location}</p>
                            <p style="font-size: 0.9rem; margin-top: 5px;">${dest.highlight}</p>
                            <div class="favorite-rating">${generateStars(dest.rating)}</div>
                        </div>
                    </div>
                `).join('')}
            </div>
            ` : ''}
            
            <!-- Travel Timeline -->
            ${data.timeline ? `
            <h3 class="modal-section-title">
                <i class="fas fa-route"></i> My Travel Journey
            </h3>
            <div class="hobby-timeline">
                ${data.timeline.map(event => `
                    <div class="timeline-event">
                        <div class="timeline-date">${event.date}</div>
                        <div class="timeline-title">${event.title}</div>
                        <div class="timeline-desc">${event.desc}</div>
                    </div>
                `).join('')}
            </div>
            ` : ''}
            
            <!-- Achievements (for photography) -->
            ${data.achievements ? `
            <h3 class="modal-section-title">
                <i class="fas fa-trophy"></i> Achievements
            </h3>
            <div class="hobby-timeline">
                ${data.achievements.map(ach => `
                    <div class="timeline-event">
                        <div class="timeline-date">${ach.date}</div>
                        <div class="timeline-title">${ach.title}</div>
                        <div class="timeline-desc">${ach.desc}</div>
                    </div>
                `).join('')}
            </div>
            ` : ''}
            
            <!-- Equipment -->
            ${data.equipment ? `
            <h3 class="modal-section-title">
                <i class="fas fa-tools"></i> My Equipment & Tools
            </h3>
            <div class="equipment-list">
                ${data.equipment.map(eq => `
                    <div class="equipment-item">
                        <div class="equipment-icon">
                            <i class="fas ${eq.icon}"></i>
                        </div>
                        <div class="equipment-info">
                            <h4>${eq.title}</h4>
                            <p>${eq.desc}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
            ` : ''}
            
            <!-- Photo Gallery -->
            ${data.gallery ? `
            <h3 class="modal-section-title">
                <i class="fas fa-images"></i> Photo Gallery
            </h3>
            <div class="photo-gallery">
                ${data.gallery.map((img, index) => `
                    <div class="gallery-item" onclick="openLightbox('${img}', ${index})">
                        <img src="${img}" alt="Gallery ${index + 1}" onerror="this.src='https://via.placeholder.com/300x300/8D6E63/FFD54F?text=Photo+${index + 1}'">
                    </div>
                `).join('')}
            </div>
            ` : ''}
        </div>
    `;
    
    return content;
}

// Open modal when clicking hobby card
hobbyCards.forEach(card => {
    card.addEventListener('click', () => {
        const hobbyKey = card.dataset.hobby;
        const content = createModalContent(hobbyKey);
        
        hobbyModalBody.innerHTML = content;
        hobbyModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

// Close modal
if (hobbyModalClose) {
    hobbyModalClose.addEventListener('click', () => {
        hobbyModal.classList.remove('active');
        document.body.style.overflow = '';
    });
}

// Close modal when clicking outside
if (hobbyModal) {
    hobbyModal.addEventListener('click', (e) => {
        if (e.target === hobbyModal) {
            hobbyModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && hobbyModal?.classList.contains('active')) {
        hobbyModal.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Lightbox function for gallery images
function openLightbox(imageSrc, index) {
    // Create lightbox if not exists
    let lightbox = document.getElementById('lightbox');
    if (!lightbox) {
        lightbox = document.createElement('div');
        lightbox.id = 'lightbox';
        lightbox.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.95);
            z-index: 4000;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
        `;
        lightbox.innerHTML = `
            <img id="lightbox-img" style="max-width: 90%; max-height: 90%; object-fit: contain; border-radius: 10px;">
            <button id="lightbox-close" style="position: absolute; top: 20px; right: 40px; background: none; border: none; color: white; font-size: 3rem; cursor: pointer;">&times;</button>
        `;
        document.body.appendChild(lightbox);
        
        // Close lightbox
        lightbox.addEventListener('click', (e) => {
            if (e.target !== lightbox.querySelector('img')) {
                lightbox.remove();
            }
        });
    }
    
    const img = lightbox.querySelector('#lightbox-img');
    img.src = imageSrc;
    lightbox.style.display = 'flex';
}
