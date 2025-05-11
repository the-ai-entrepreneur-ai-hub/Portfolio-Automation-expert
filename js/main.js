document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initNavigation();
    initTypingEffect();
    initParticles();
    initCustomCursor();
    initScrollAnimations();
    initCounters();
    initCharts();
    initProjectModals();
    initContactForm();
    initPartnersAnimation();
    
    // Set header background on scroll
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.style.backgroundColor = 'rgba(10, 10, 21, 0.95)';
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.backgroundColor = 'rgba(10, 10, 21, 0.8)';
            header.style.boxShadow = 'none';
        }
    });
});

// Navigation functionality
function initNavigation() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking a link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
// Set active link based on scroll position
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });
}

// Typing effect for hero section
function initTypingEffect() {
    const typeText = document.getElementById('type-text');
    const texts = [
        'Automation Expert',
        'Web Designer',
        'API Integrator',
        'Data Insights Specialist',
        'Chatbot Developer',
        'AGI Specialist'
    ];
    let index = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;
    
    function type() {
        const currentText = texts[index];
        
        if (isDeleting) {
            typeText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typeText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typeSpeed = 1500; // Pause before deleting
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            index = (index + 1) % texts.length;
            typeSpeed = 500; // Pause before typing next text
        }
        
        setTimeout(type, typeSpeed);
    }
    
    setTimeout(type, 1000);
}

// Particles background for hero section
function initParticles() {
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 60,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#ffffff'
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    }
                },
                opacity: {
                    value: 0.3,
                    random: false,
                    anim: {
                        enable: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#7B2CBF',
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
                            opacity: 0.5
                        }
                    },
                    push: {
                        particles_nb: 3
                    }
                }
            },
            retina_detect: true
        });
    }
}

// Partners section animation
function initPartnersAnimation() {
    // Adjust animation speed based on device width for better mobile experience
    const partnersTrack = document.querySelector('.partners-track');
    if (partnersTrack) {
        if (window.innerWidth < 768) {
            partnersTrack.style.animationDuration = '20s';
        } else {
            partnersTrack.style.animationDuration = '30s';
        }
        
        // Update animation duration on resize
        window.addEventListener('resize', () => {
            if (window.innerWidth < 768) {
                partnersTrack.style.animationDuration = '20s';
            } else {
                partnersTrack.style.animationDuration = '30s';
            }
        });
    }
}

// Custom cursor
function initCustomCursor() {
    const cursor = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    if (cursor && cursorOutline) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
            cursorOutline.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        });
        
        document.addEventListener('mousedown', () => {
            cursor.style.transform = 'scale(0.7)';
            cursorOutline.style.transform = 'scale(1.2)';
        });
        
        document.addEventListener('mouseup', () => {
            cursor.style.transform = 'scale(1)';
            cursorOutline.style.transform = 'scale(1)';
        });
        
        // Add hover effect to links and buttons
        const hoverElements = document.querySelectorAll('a, button, .btn');
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(1.5)';
                cursorOutline.style.transform = 'scale(1.5)';
                cursorOutline.style.borderColor = 'var(--accent-purple)';
            });
            
            element.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                cursorOutline.style.transform = 'scale(1)';
                cursorOutline.style.borderColor = 'rgba(255, 255, 255, 0.5)';
            });
        });
    }
}

// Scroll animations
function initScrollAnimations() {
    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
            rect.bottom >= 0
        );
    }
    
    // Get all elements with data-aos attribute
    const elements = document.querySelectorAll('[data-aos]');
    
    // Initial check on page load
    elements.forEach(element => {
        if (isInViewport(element)) {
            element.classList.add('aos-animate');
        }
    });
    
    // Check again on scroll
    window.addEventListener('scroll', () => {
        elements.forEach(element => {
            if (isInViewport(element)) {
                element.classList.add('aos-animate');
            }
        });
    });
    
    // Progress bars animation
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        if (isInViewport(card)) {
            setTimeout(() => {
                const progress = card.querySelector('.skill-progress');
                if (progress) {
                    progress.style.width = progress.style.width || '0%';
                }
            }, 500);
        }
    });
}

// Animated counters
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
            rect.bottom >= 0
        );
    }
    
    function animateCounter(counter) {
        const target = parseInt(counter.getAttribute('data-target'));
        let count = 0;
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60 fps
        
        function updateCount() {
            count += increment;
            if (count < target) {
                counter.textContent = Math.floor(count);
                requestAnimationFrame(updateCount);
            } else {
                counter.textContent = target;
            }
        }
        
        updateCount();
    }
    
    function checkCounters() {
        counters.forEach(counter => {
            if (isInViewport(counter) && !counter.classList.contains('counted')) {
                counter.classList.add('counted');
                animateCounter(counter);
            }
        });
    }
    
    window.addEventListener('scroll', checkCounters);
    checkCounters(); // Check on page load
}

// Initialize charts
function initCharts() {
    // Lead conversion chart
    const conversionChart = document.getElementById('conversionChart');
    if (conversionChart) {
        new Chart(conversionChart, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Before',
                    data: [12, 15, 18, 14, 16, 15],
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    tension: 0.4,
                    borderWidth: 2,
                    pointRadius: 3
                }, {
                    label: 'After',
                    data: [15, 25, 35, 42, 55, 65],
                    borderColor: 'rgba(123, 44, 191, 1)',
                    backgroundColor: 'rgba(123, 44, 191, 0.1)',
                    tension: 0.4,
                    borderWidth: 2,
                    pointRadius: 3
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(255, 255, 255, 0.05)'
                        },
                        ticks: {
                            color: 'rgba(255, 255, 255, 0.7)'
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.05)'
                        },
                        ticks: {
                            color: 'rgba(255, 255, 255, 0.7)'
                        }
                    }
                },
                plugins: {
                    legend: {
                        labels: {
                            color: 'rgba(255, 255, 255, 0.7)'
                        }
                    }
                }
            }
        });
    }
    
    // SEO improvement chart
    const seoChart = document.getElementById('seoChart');
    if (seoChart) {
        new Chart(seoChart, {
            type: 'bar',
            data: {
                labels: ['Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5', 'Month 6'],
                datasets: [{
                    label: 'Traffic Growth',
                    data: [100, 175, 250, 350, 500, 670],
                    backgroundColor: [
                        'rgba(58, 134, 255, 0.6)',
                        'rgba(79, 124, 235, 0.6)',
                        'rgba(99, 114, 215, 0.6)',
                        'rgba(118, 105, 195, 0.6)',
                        'rgba(138, 95, 175, 0.6)',
                        'rgba(123, 44, 191, 0.6)'
                    ],
                    borderWidth: 0,
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(255, 255, 255, 0.05)'
                        },
                        ticks: {
                            color: 'rgba(255, 255, 255, 0.7)'
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.05)'
                        },
                        ticks: {
                            color: 'rgba(255, 255, 255, 0.7)'
                        }
                    }
                },
                plugins: {
                    legend: {
                        labels: {
                            color: 'rgba(255, 255, 255, 0.7)'
                        }
                    }
                }
            }
        });
    }
}

// Project details modal functionality
function initProjectModals() {
    const modal = document.getElementById('project-modal');
    const modalBody = modal ? modal.querySelector('.modal-body') : null;
    const closeModal = modal ? modal.querySelector('.close-modal') : null;
    const detailButtons = document.querySelectorAll('.view-details-btn');
    
    if (modal && modalBody && closeModal) {
        // Project details content
        const projectDetails = {
            'content-gen': {
                title: 'AI Content Generation Application',
                description: `
                    <p>Developed a sophisticated content generation and optimization application that uses advanced AI systems to create highly tailored social media content optimized for each platform.</p>
                    
                    <h4>Challenge</h4>
                    <p>Businesses struggled to create consistent, engaging content across multiple social media platforms, each with different audience preferences and technical requirements.</p>
                    
                    <h4>Solution</h4>
                    <p>Created a comprehensive AI-powered content generation system that:</p>
                    <ul>
                        <li>Analyzes platform-specific engagement patterns</li>
                        <li>Generates content optimized for each platform's unique algorithm</li>
                        <li>Automatically adjusts tone, length, and format based on target audience</li>
                        <li>Provides performance tracking and iterative improvement</li>
                    </ul>
                    
                    <h4>Technologies Used</h4>
                    <div class="tech-tags">
                        <span>Python</span>
                        <span>TensorFlow</span>
                        <span>OpenAI API</span>
                        <span>React</span>
                        <span>Node.js</span>
                        <span>MongoDB</span>
                    </div>
                    
                    <h4>Outcomes</h4>
                    <ul>
                        <li>45% increase in social media engagement</li>
                        <li>70% reduction in content creation time</li>
                        <li>Consistent brand messaging across all platforms</li>
                        <li>Data-driven content strategy improvements</li>
                    </ul>
                `
            },
            'lead-gen': {
                title: 'Intelligent Lead Generation System',
                description: `
                    <p>Built a comprehensive lead generation and qualification system that captures potential customer information and guides them through an intelligent nurturing process to conversion.</p>
                    
                    <h4>Challenge</h4>
                    <p>The client was generating significant website traffic but struggled with low conversion rates and inefficient lead qualification processes.</p>
                    
                    <h4>Solution</h4>
                    <p>Implemented a multi-faceted lead generation and nurturing system that:</p>
                    <ul>
                        <li>Captures visitor information through strategically placed opt-in forms</li>
                        <li>Qualifies leads through automated assessment sequences</li>
                        <li>Creates personalized nurturing pathways based on user behavior and interests</li>
                        <li>Seamlessly integrates with existing CRM systems</li>
                    </ul>
                    
                    <h4>Technologies Used</h4>
                    <div class="tech-tags">
                        <span>JavaScript</span>
                        <span>HubSpot API</span>
                        <span>Salesforce Integration</span>
                        <span>Machine Learning</span>
                        <span>AWS</span>
                    </div>
                    
                    <h4>Outcomes</h4>
                    <ul>
                        <li>58% increase in lead conversion rate</li>
                        <li>40% reduction in customer acquisition cost</li>
                        <li>75% decrease in sales team time spent on lead qualification</li>
                        <li>Comprehensive analytics dashboard for conversion optimization</li>
                    </ul>
                `
            },
            'chatbots': {
                title: 'Self-Learning Personalized Chatbots',
                description: `
                    <p>Developed custom chatbot solutions with advanced contextual memory and self-learning capabilities that adapt to user interactions over time.</p>
                    
                    <h4>Challenge</h4>
                    <p>Traditional chatbots provided limited value due to their inability to maintain context, learn from interactions, or genuinely personalize responses beyond simple rule-based systems.</p>
                    
                    <h4>Solution</h4>
                    <p>Created an innovative chatbot platform featuring:</p>
                    <ul>
                        <li>Long-term memory architecture that retains user preferences and conversation history</li>
                        <li>Self-learning algorithms that improve responses based on user interactions</li>
                        <li>Context-awareness across multiple conversation sessions</li>
                        <li>Multi-channel deployment capabilities (website, messaging apps, voice assistants)</li>
                    </ul>
                    
                    <h4>Technologies Used</h4>
                    <div class="tech-tags">
                        <span>Python</span>
                        <span>Natural Language Processing</span>
                        <span>TensorFlow</span>
                        <span>Flask</span>
                        <span>MongoDB</span>
                        <span>AWS Lambda</span>
                    </div>
                    
                    <h4>Outcomes</h4>
                    <ul>
                        <li>Reduced customer support inquiries by 45%</li>
                        <li>Increased user satisfaction scores by 60%</li>
                        <li>Chatbot successfully handled 78% of customer queries without human intervention</li>
                        <li>Continuous improvement with 15% better response accuracy every month</li>
                    </ul>
                `
            },
            'seo': {
                title: 'SEO Performance Transformation',
                description: `
                    <p>Executed comprehensive SEO optimization strategies for low-ranking websites, resulting in substantial traffic improvements and a 67% increase in customer acquisition.</p>
                    
                    <h4>Challenge</h4>
                    <p>Multiple client websites were experiencing poor search visibility, low organic traffic, and minimal conversion despite having quality products and services.</p>
                    
                    <h4>Solution</h4>
                    <p>Implemented a holistic SEO transformation strategy including:</p>
                    <ul>
                        <li>In-depth technical SEO audit and optimization</li>
                        <li>Comprehensive keyword research and on-page optimization</li>
                        <li>Content gap analysis and strategic content development</li>
                        <li>Authority-building backlink strategy</li>
                        <li>Local SEO optimization for geographically relevant businesses</li>
                    </ul>
                    
                    <h4>Technologies Used</h4>
                    <div class="tech-tags">
                        <span>SEMrush</span>
                        <span>Ahrefs</span>
                        <span>Google Analytics</span>
                        <span>Google Search Console</span>
                        <span>Schema Markup</span>
                        <span>WordPress</span>
                    </div>
                    
                    <h4>Outcomes</h4>
                    <ul>
                        <li>67% increase in customer acquisition through organic search</li>
                        <li>First page rankings for 80+ competitive keywords</li>
                        <li>320% increase in organic traffic within 6 months</li>
                        <li>Reduced dependency on paid advertising by 40%</li>
                    </ul>
                `
            },
            'automation': {
                title: 'Business Process Automation',
                description: `
                    <p>Designed and implemented comprehensive automation solutions for business operations, eliminating manual processes and significantly improving operational efficiency.</p>
                    
                    <h4>Challenge</h4>
                    <p>Businesses were struggling with inefficient manual processes for customer support, social media management, and invoice generation, leading to delays, errors, and excessive labor costs.</p>
                    
                    <h4>Solution</h4>
                    <p>Created an integrated automation ecosystem that:</p>
                    <ul>
                        <li>Automates customer support ticket routing, prioritization, and initial response</li>
                        <li>Schedules, creates, and publishes social media content across multiple platforms</li>
                        <li>Generates and distributes invoices in real-time based on service delivery triggers</li>
                        <li>Provides comprehensive analytics and reporting dashboard</li>
                    </ul>
                    
                    <h4>Technologies Used</h4>
                    <div class="tech-tags">
                        <span>Node.js</span>
                        <span>Python</span>
                        <span>Zapier</span>
                        <span>API Integrations</span>
                        <span>Stripe API</span>
                        <span>Docker</span>
                    </div>
                    
                    <h4>Outcomes</h4>
                    <ul>
                        <li>35% overall increase in operational efficiency</li>
                        <li>50% reduction in invoice processing time</li>
                        <li>75% faster response time for customer support inquiries</li>
                        <li>Consistent social media presence with 40% higher engagement</li>
                    </ul>
                `
            }
        };
        
        // Open modal on button click
        detailButtons.forEach(button => {
            button.addEventListener('click', () => {
                const projectId = button.getAttribute('data-project');
                const project = projectDetails[projectId];
                
                if (project) {
                    modalBody.innerHTML = `
                        <h2>${project.title}</h2>
                        <div class="project-details">${project.description}</div>
                    `;
                    
                    modal.style.display = 'block';
                    document.body.style.overflow = 'hidden';
                }
            });
        });
        
        // Close modal
        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
        
        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
        
        // Close modal on escape key
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.style.display === 'block') {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
}

// Contact form functionality with EmailJS
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    const submitBtn = contactForm ? contactForm.querySelector('.submit-btn') : null;
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Validate form
            const name = contactForm.querySelector('#name').value;
            const email = contactForm.querySelector('#email').value;
            const subject = contactForm.querySelector('#subject').value;
            const message = contactForm.querySelector('#message').value;
            
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // Email validation regex
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Change button text and disable it during sending
            if (submitBtn) {
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
            }
            
            // Prepare EmailJS parameters
            const templateParams = {
                name: name,
                email: email,
                subject: subject,
                message: message
            };
            
            // Send email using EmailJS
            emailjs.send('service_portfolio', 'template_contact', templateParams, 'user_YOUR_USER_ID')
                .then((response) => {
                    console.log('Email sent successfully!', response.status, response.text);
                    alert('Thanks for your message! I\'ll get back to you soon.');
                    contactForm.reset();
                    
                    // Reset button
                    if (submitBtn) {
                        submitBtn.textContent = 'Send Message';
                        submitBtn.disabled = false;
                    }
                })
                .catch((error) => {
                    console.error('Email sending failed:', error);
                    alert('Sorry, there was an error sending your message. Please try again or contact me directly via email.');
                    
                    // Reset button
                    if (submitBtn) {
                        submitBtn.textContent = 'Send Message';
                        submitBtn.disabled = false;
                    }
                });
        });
    }
}

// Add smooth scrolling to all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80, // Adjust for header height
                behavior: 'smooth'
            });
        }
    });
});
