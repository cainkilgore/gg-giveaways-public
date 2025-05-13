document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const ctaButtons = document.querySelector('.cta-buttons');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            
            // Create mobile menu if it doesn't exist
            if (!document.querySelector('.mobile-menu')) {
                const mobileMenu = document.createElement('div');
                mobileMenu.classList.add('mobile-menu');
                
                // Clone navigation links
                const navLinksClone = navLinks.cloneNode(true);
                
                // Clone CTA buttons
                const ctaButtonsClone = ctaButtons.cloneNode(true);
                
                // Append to mobile menu
                mobileMenu.appendChild(navLinksClone);
                mobileMenu.appendChild(ctaButtonsClone);
                
                // Add to the DOM after the nav
                document.querySelector('nav').insertAdjacentElement('afterend', mobileMenu);
                
                // Add styles dynamically
                const style = document.createElement('style');
                style.textContent = `
                    .mobile-menu {
                        display: none;
                        flex-direction: column;
                        gap: 2rem;
                        padding: 2rem 0;
                        background-color: var(--background-color);
                        border-top: 1px solid var(--border-color);
                        border-bottom: 1px solid var(--border-color);
                    }
                    
                    .mobile-menu .nav-links {
                        display: flex;
                        flex-direction: column;
                        gap: 1.5rem;
                        align-items: center;
                    }
                    
                    .mobile-menu .cta-buttons {
                        display: flex;
                        flex-direction: column;
                        gap: 1rem;
                        align-items: center;
                    }
                    
                    .mobile-menu-btn.active span:nth-child(1) {
                        transform: rotate(45deg) translate(5px, 5px);
                    }
                    
                    .mobile-menu-btn.active span:nth-child(2) {
                        opacity: 0;
                    }
                    
                    .mobile-menu-btn.active span:nth-child(3) {
                        transform: rotate(-45deg) translate(7px, -6px);
                    }
                `;
                document.head.appendChild(style);
            }
            
            // Toggle mobile menu visibility
            const mobileMenu = document.querySelector('.mobile-menu');
            if (this.classList.contains('active')) {
                mobileMenu.style.display = 'flex';
            } else {
                mobileMenu.style.display = 'none';
            }
        });
    }
    
    // FAQ accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Check if this item is already active
            const isActive = item.classList.contains('active');
            
            // Close all items
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
            });
            
            // If the clicked item wasn't active, make it active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
    
    // Privacy Policy Modal
    const privacyLink = document.getElementById('privacy-link');
    const privacyModal = document.getElementById('privacy-modal');
    const closeModalBtn = document.querySelector('.close-modal');
    
    if (privacyLink && privacyModal) {
        // Open modal when privacy link is clicked
        privacyLink.addEventListener('click', function(e) {
            e.preventDefault();
            privacyModal.style.display = 'block';
            document.body.classList.add('modal-open');
        });
        
        // Close modal when X button is clicked
        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', function() {
                privacyModal.style.display = 'none';
                document.body.classList.remove('modal-open');
            });
        }
        
        // Close modal when clicking outside of modal content
        window.addEventListener('click', function(e) {
            if (e.target === privacyModal) {
                privacyModal.style.display = 'none';
                document.body.classList.remove('modal-open');
            }
        });
        
        // Close modal when ESC key is pressed
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && privacyModal.style.display === 'block') {
                privacyModal.style.display = 'none';
                document.body.classList.remove('modal-open');
            }
        });
    }
    
    // Discord invite buttons
    const inviteButtons = document.querySelectorAll('#invite-btn, #invite-btn-hero, #invite-btn-cta');
    
    inviteButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            // Discord OAuth2 invite URL
            // This is a mock URL - replace with your actual Discord bot invite URL when ready
            const inviteUrl = 'https://discord.com/api/oauth2/authorize?client_id=1369102148989620234&permissions=274878221376&scope=bot%20applications.commands';
            window.open(inviteUrl, '_blank');
        });
    });
    
    // Command Card Interaction
    const commandCards = document.querySelectorAll('.command-card');
    const commandPreview = document.querySelector('.discord-message .message-content code');
    const embedTitle = document.querySelector('.embed-title');
    
    // Command examples
    const commandExamples = {
        '/ggcreate': {
            command: '/ggcreate prize: "$20 Buy, Tip if Profit" duration: 24h winners: 2 require_active: true',
            response: {
                title: '🎉 $20 Buy, Tip if Profit 🎉',
                description: 'Time Left: <span class="highlight">Ends in 24 hours</span><br>Entries: 0<br>Winners: 2<br><br>Click the button below to enter!'
            }
        },
        '/gglist': {
            command: '/gglist',
            response: {
                title: 'Active Giveaways',
                description: 'ID: 123456789<br>Prize: $20 Buy, Tip if Profit<br>Time: Ends in 23 hours<br>Entries: 12<br><br>ID: 987654321<br>Prize: Discord Nitro<br>Time: Ends in 2 days<br>Entries: 8'
            }
        },
        '/ggend': {
            command: '/ggend giveaway_id:123456789',
            response: {
                title: '🎉 GIVEAWAY ENDED 🎉',
                description: 'Prize: $20 Buy, Tip if Profit<br><br>Winner: <span class="highlight">@LuckyUser</span><br><br>Total Entries: 24'
            }
        },
        '/ggreroll': {
            command: '/ggreroll giveaway_id:123456789',
            response: {
                title: '🎉 GIVEAWAY REROLL 🎉',
                description: 'Prize: $20 Buy, Tip if Profit<br><br>Previous Winner: @LuckyUser<br>New Winner: <span class="highlight">@NewWinner</span><br><br>Congratulations! 🎉'
            }
        },
        '/ggactive': {
            command: '/ggactive user:@SomeUser',
            response: {
                title: 'Activity Status for SomeUser',
                description: 'Status: ✅ Active<br><br>Messages (Last 30 Days): 45<br>Active Days: 8<br>Total Message Count: 213<br>Spam Detected: No'
            }
        },
        '/ggscan': {
            command: '/ggscan days:30 limit:1000',
            response: {
                title: 'Server History Scan',
                description: '⏳ Starting server history scan for the past 30 days (up to 1000 messages per channel).<br>This may take several minutes depending on server size.'
            }
        }
    };
    
    // Add click event for command cards
    if (commandCards.length && commandPreview) {
        commandCards.forEach(card => {
            card.addEventListener('click', function() {
                // Get command name from the card
                const commandName = this.querySelector('.command-name').textContent;
                
                // Find example for this command
                const example = commandExamples[commandName];
                if (example) {
                    // Update command preview
                    commandPreview.textContent = example.command;
                    
                    // Update embed
                    embedTitle.textContent = example.response.title;
                    document.querySelector('.embed-description').innerHTML = example.response.description;
                    
                    // Add active class to this card
                    commandCards.forEach(c => c.classList.remove('active'));
                    this.classList.add('active');
                    
                    // Add active class styling
                    if (!document.querySelector('#command-card-style')) {
                        const style = document.createElement('style');
                        style.id = 'command-card-style';
                        style.textContent = `
                            .command-card.active {
                                border-left: 3px solid var(--primary-color);
                                background-color: rgba(88, 101, 242, 0.05);
                                transform: translateX(5px);
                            }
                        `;
                        document.head.appendChild(style);
                    }
                }
            });
        });
    }
    
    // Intersection Observer for animations
    if ('IntersectionObserver' in window) {
        // Add fadeIn animation styles
        const animationStyles = document.createElement('style');
        animationStyles.textContent = `
            .fadeIn {
                opacity: 0;
                transform: translateY(20px);
                transition: opacity 0.6s ease, transform 0.6s ease;
            }
            
            .fadeIn.visible {
                opacity: 1;
                transform: translateY(0);
            }
            
            @keyframes floatAnimation {
                0% { transform: translateY(0); }
                50% { transform: translateY(-10px); }
                100% { transform: translateY(0); }
            }
            
            .hero-image img {
                animation: floatAnimation 6s ease-in-out infinite;
            }
        `;
        document.head.appendChild(animationStyles);
        
        // Add fadeIn class to elements we want to animate
        const animatedElements = [
            ...document.querySelectorAll('.section-header'),
            ...document.querySelectorAll('.feature-card'),
            ...document.querySelectorAll('.stat-card'),
            ...document.querySelectorAll('.command-card'),
            ...document.querySelectorAll('.faq-item')
        ];
        
        animatedElements.forEach((element, index) => {
            element.classList.add('fadeIn');
            // Add slight delay to each sequential element
            element.style.transitionDelay = `${index * 0.1}s`;
        });
        
        // Create intersection observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Unobserve after it's been animated
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });
        
        // Observe all animated elements
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }
}); 