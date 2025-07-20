document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 1000);
    });

    // Initialize Particles.js
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: '#64ffda'
            },
            shape: {
                type: 'circle',
                stroke: {
                    width: 0,
                    color: '#000000'
                },
                polygon: {
                    nb_sides: 5
                }
            },
            opacity: {
                value: 0.5,
                random: false,
                anim: {
                    enable: false,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: false,
                    speed: 40,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#64ffda',
                opacity: 0.2,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false,
                attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'grab'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 140,
                    line_linked: {
                        opacity: 1
                    }
                },
                bubble: {
                    distance: 400,
                    size: 40,
                    duration: 2,
                    opacity: 8,
                    speed: 3
                },
                repulse: {
                    distance: 200,
                    duration: 0.4
                },
                push: {
                    particles_nb: 4
                },
                remove: {
                    particles_nb: 2
                }
            }
        },
        retina_detect: true
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active nav link based on scroll position
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 300) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

 
    // Typing effect for hero subtitle - CORRECTED VERSION
    const typeElement = document.querySelector('.typewrite');
    if (typeElement) {
        const words = JSON.parse(typeElement.getAttribute('data-type'));
        const speed = parseInt(typeElement.getAttribute('data-period')) || 2000;
        
        let i = 0, j = 0, isDeleting = false;
        
        function type() {
            const current = words[i % words.length];
            typeElement.textContent = isDeleting ? current.substr(0, j--) : current.substr(0, j++);
            
            if (!isDeleting && j === current.length) {
                setTimeout(() => isDeleting = true, speed);
            } else if (isDeleting && j === 0) {
                isDeleting = false;
                i++;
            }
            
            setTimeout(type, isDeleting ? 50 : 100);
        }
        
        // Start typing after short delay
        setTimeout(type, 500);
    } else {
        console.error('Typewriter element not found');
    }



// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initTypeWriter);

    // Animate skills bars on scroll
    const skills = document.querySelectorAll('.skill');
    const skillsSection = document.querySelector('.skills');

    function animateSkills() {
        const skillsPosition = skillsSection.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;

        if (skillsPosition < screenPosition) {
            skills.forEach(skill => {
                const percent = skill.getAttribute('data-percent');
                const progressBar = skill.querySelector('.skill-progress');
                progressBar.style.width = `${percent}%`;
            });
        }
    }

    window.addEventListener('scroll', animateSkills);

    // Back to top button
    const backToTopBtn = document.querySelector('.back-to-top');
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });

    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const formData = new FormData(contactForm);
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;

        // Show loading state
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';

        // Send to Web3Forms
        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData
        })
        .then(async (response) => {
            const json = await response.json();
            if (json.success) {
                // Success message
                alert('Thank you for your message! I will get back to you soon.');
                contactForm.reset();
            } else {
                console.error(json);
                alert('There was an error sending your message. Please try again later.');
            }
        })
        .catch((error) => {
            console.error(error);
            alert('There was an error sending your message. Please try again later.');
        })
        .finally(() => {
            // Reset button state
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        });
    });
}

    // Project card hover effect
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.querySelector('.project-overlay').style.opacity = '1';
        });
        card.addEventListener('mouseleave', () => {
            card.querySelector('.project-overlay').style.opacity = '0';
        });
    });

    // Tooltip effect for tools
    const tools = document.querySelectorAll('.tool');
    tools.forEach(tool => {
        tool.addEventListener('mouseenter', () => {
            const tooltip = tool.getAttribute('data-tooltip');
            tool.setAttribute('data-tooltip', tooltip);
        });
    });

    // Image hover effects
    const imageWrappers = document.querySelectorAll('.image-wrapper, .image-container');
    imageWrappers.forEach(wrapper => {
        wrapper.addEventListener('mouseenter', () => {
            wrapper.querySelector('img').style.filter = 'none';
        });
        wrapper.addEventListener('mouseleave', () => {
            wrapper.querySelector('img').style.filter = 'grayscale(100%) contrast(1)';
        });
    });

    // Scroll reveal animations
    const sr = ScrollReveal({
        origin: 'top',
        distance: '60px',
        duration: 1000,
        delay: 200,
        reset: true
    });

    sr.reveal('.hero-content, .hero-image', { origin: 'left' });
    sr.reveal('.about-text, .about-image', { interval: 200 });
    sr.reveal('.skill-category', { interval: 200 });
    sr.reveal('.project-card', { interval: 200 });
    sr.reveal('.timeline-item', { interval: 200 });
    sr.reveal('.contact-info, .contact-form', { origin: 'left', interval: 200 });

    
    // <script src="https://unpkg.com/scrollreveal"></script>
});

// Fallback for ScrollReveal if not loaded
if (typeof ScrollReveal !== 'function') {
    console.log('ScrollReveal not loaded - using fallback animations');
    document.addEventListener('DOMContentLoaded', function() {
        const animateElements = document.querySelectorAll('.hero-content, .hero-image, .about-text, .about-image, .skill-category, .project-card, .timeline-item, .contact-info, .contact-form');
        
        function checkIfInView() {
            animateElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const elementBottom = element.getBoundingClientRect().bottom;
                
                if (elementTop < window.innerHeight && elementBottom > 0) {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }
            });
        }
        
        // Set initial state
        animateElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
        
        window.addEventListener('scroll', checkIfInView);
        window.addEventListener('load', checkIfInView);
    });
}



// AI Assistant Functionality with Loading Indicators Below Each Message
document.addEventListener('DOMContentLoaded', function() {
    const aiBtn = document.querySelector('.ai-assistant-btn');
    const aiModal = document.querySelector('.ai-assistant-modal');
    const closeAi = document.querySelector('.close-ai');
    const aiInput = document.querySelector('.ai-input input');
    const aiSend = document.querySelector('.ai-send');
    const aiMessages = document.querySelector('.ai-messages');
    
    // Track if we've shown the fallback notification
    let hasShownFallbackNotice = false;
    let loadingTimeouts = {};
    
    // Toggle AI Assistant
    aiBtn.addEventListener('click', () => {
        aiModal.classList.toggle('active');
    });
    
    closeAi.addEventListener('click', () => {
        aiModal.classList.remove('active');
    });
    
    // Local knowledge base
    const localKnowledgeBase = {
        personal_info: {
            name: "Kenyi Robert Waya",
            short_name: "Robert",
            pronouns: {
                subject: "he",
                object: "him",
                possessive: "his",
                reflexive: "himself"
            },
            profession: "Computer & Software Engineer",
            specialization: "Full-Stack Development & Embedded Systems",
            location: {
                city: "Kampala",
                country: "Uganda"
            },
            professional_summary: "Innovative computer engineer with expertise in full-stack web development and embedded systems.",
            detailed_introduction: "Robert is a skilled Computer and Software Engineer from ISBAT University Kampala. With a strong background in both software development and computer engineering, he specializes in building full-stack applications and embedded systems.",
            hobbies: [
                "Open source contributions",
                "Mentoring junior developers",
                "Building IoT devices"
            ]
        },
        education: {
            degree: "Bachelor of Science in Computer Engineering",
            university: "ISBAT University, Kampala"
        },
        skills: {
            "Programming Languages": ["JavaScript (ES6+)", "Python", "Java", "C/C++"],
            "Web Development": ["React.js", "Node.js", "Express", "Django", "Flask"],
            "Database": ["SQL", "MongoDB", "PostgreSQL"]
        },
        experience: [
            {
                role: "Software Development Intern",
                company: "Tech Solutions Uganda",
                period: "June 2023 - December 2023"
            }
        ],
        projects: [
            {
                name: "Smart Agriculture IoT System",
                description: "An IoT-based solution for monitoring farm conditions",
                tech: ["Python", "Django", "Raspberry Pi"]
            }
        ],
        contact: {
            email: "robertmayhemj@gmail.com",
            phone: "+256 765 673 373"
        }
    };
    
    // Local response generator
    function getLocalResponse(question) {
        question = question.toLowerCase().trim();
        const { name, short_name, pronouns } = localKnowledgeBase.personal_info;
        
        if (/hi|hello|hey/.test(question)) {
            return `Hello! I'm ${name}'s AI assistant. How can I help?`;
        }
        
        if (/bye|goodbye|exit/.test(question)) {
            return "Goodbye! Feel free to return with more questions.";
        }
        
        if (/thank|thanks|appreciate/.test(question)) {
            return "You're welcome!";
        }
        
        if (/who is|tell me about|describe/.test(question)) {
            return `${localKnowledgeBase.personal_info.detailed_introduction}\n\nName: ${name}\nProfession: ${localKnowledgeBase.personal_info.profession}`;
        }
        
        if (/name|who are you/.test(question)) {
            return `I'm ${name}, a ${localKnowledgeBase.personal_info.profession}.`;
        }
        
        if (/location|where|live|based|city|country/.test(question)) {
            const loc = localKnowledgeBase.personal_info.location;
            return `${name} is based in ${loc.city}, ${loc.country}.`;
        }
        
        if (/professional|background|summary|overview/.test(question)) {
            return `Professional Background:\nName: ${name}\nProfession: ${localKnowledgeBase.personal_info.profession}\n${localKnowledgeBase.personal_info.professional_summary}`;
        }
        
        if (/education|degree|study|university|school/.test(question)) {
            const edu = localKnowledgeBase.education;
            return `Education:\nDegree: ${edu.degree}\nUniversity: ${edu.university}`;
        }
        
        if (/skill|skills|ability|expertise/.test(question)) {
            let response = "Skills:\n";
            for (const [category, skills] of Object.entries(localKnowledgeBase.skills)) {
                response += `\n${category}: ${skills.join(', ')}`;
            }
            return response;
        }
        
        if (/experience|job|career|work history/.test(question)) {
            let response = "Experience:\n";
            localKnowledgeBase.experience.forEach(exp => {
                response += `\n${exp.role} at ${exp.company} (${exp.period})`;
            });
            return response;
        }
        
        if (/project|projects|work|portfolio/.test(question)) {
            let response = "Projects:\n";
            localKnowledgeBase.projects.forEach(proj => {
                response += `\n${proj.name}: ${proj.description}\nTechnologies: ${proj.tech.join(', ')}\n`;
            });
            return response;
        }
        
        if (/contact|email|phone|reach|social media|hire/.test(question)) {
            const contact = localKnowledgeBase.contact;
            return `Contact:\nEmail: ${contact.email}\nPhone: ${contact.phone}`;
        }
        
        return `I can tell you about ${name}'s professional background, skills, education, projects and experience.`;
    }
    
    // Create loading indicator for a specific message
    function createLoadingIndicator(messageId) {
        const loadingDiv = document.createElement('div');
        loadingDiv.id = `loading-${messageId}`;
        loadingDiv.className = 'ai-message bot loading';
        loadingDiv.innerHTML = `
            <div class="typing-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
        `;
        loadingDiv.style.display = 'none';
        return loadingDiv;
    }
    
    // Show loading indicator after 500ms delay for specific message
    function showLoading(messageId) {
        loadingTimeouts[messageId] = setTimeout(() => {
            const loadingIndicator = document.getElementById(`loading-${messageId}`);
            if (loadingIndicator) {
                loadingIndicator.style.display = 'block';
                aiMessages.scrollTop = aiMessages.scrollHeight;
            }
        }, 500);
    }
    
    // Hide loading indicator for specific message
    function hideLoading(messageId) {
        clearTimeout(loadingTimeouts[messageId]);
        const loadingIndicator = document.getElementById(`loading-${messageId}`);
        if (loadingIndicator) {
            loadingIndicator.remove();
        }
        delete loadingTimeouts[messageId];
    }
    
    // Send message function with fallback
    async function sendMessage() {
        const message = aiInput.value.trim();
        if (message) {
            // Add user message to chat
            const messageId = Date.now();
            addMessage(message, 'user', messageId);
            aiInput.value = '';
            
            // Add loading indicator right after the message
            const loadingIndicator = createLoadingIndicator(messageId);
            aiMessages.appendChild(loadingIndicator);
            
            // Show loading indicator
            showLoading(messageId);
            
             try {
            // Updated to use your hosted backend
            const response = await fetchWithTimeout('https://your-ai-backend.onrender.com/ask', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ question: message }),
                timeout: 5000 // 5 seconds timeout
            });
                
                if (!response.ok) throw new Error('Backend not responding');
                
                const data = await response.json();
                hideLoading(messageId);
                addMessage(data.response, 'bot');
            } catch (error) {
                console.log('Using local knowledge base:', error);
                // If backend fails, use local knowledge base
                hideLoading(messageId);
                const localResponse = getLocalResponse(message);
                addMessage(localResponse, 'bot');
                
                // Only show the fallback notice once per session
                if (!hasShownFallbackNotice) {
                    addMessage("Note: Currently using local knowledge base as the server is unavailable.", 'bot-info');
                    hasShownFallbackNotice = true;
                }
            }
        }
    }
    
    // Helper function for fetch with timeout
    function fetchWithTimeout(url, options = {}) {
        const { timeout = 8000 } = options;
        
        const controller = new AbortController();
        const { signal } = controller;
        
        const timeoutId = setTimeout(() => controller.abort(), timeout);
        
        const fetchPromise = fetch(url, {
            ...options,
            signal
        }).finally(() => clearTimeout(timeoutId));
        
        return fetchPromise;
    }
    
    // Add message to chat
    function addMessage(text, sender, messageId) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('ai-message', sender);
        if (messageId) {
            messageDiv.dataset.messageId = messageId;
        }
        messageDiv.textContent = text;
        aiMessages.appendChild(messageDiv);
        aiMessages.scrollTop = aiMessages.scrollHeight;
    }
    
    // Send message on button click or Enter key
    aiSend.addEventListener('click', sendMessage);
    aiInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Initial greeting
  // the initial health check
setTimeout(() => {
    addMessage("Hi! I'm Robert's AI assistant. Ask me anything about him", 'bot');
    
    // Check backend availability (silently)
    fetchWithTimeout('https://your-ai-backend.onrender.com/health', {
        method: 'GET',
        timeout: 2000
    }).catch(() => {
        // Only show the fallback notice if the user actually interacts
    });
}, 1000);
});
