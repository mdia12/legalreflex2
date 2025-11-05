// JavaScript pour l'interactivité de la page LegalReflex

document.addEventListener('DOMContentLoaded', function() {
    
    // Gestion du menu déroulant mobile
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const navDropdown = document.querySelector('.nav-dropdown');
    
    if (dropdownToggle && navDropdown) {
        dropdownToggle.addEventListener('click', function(e) {
            // Sur mobile, gérer le clic pour ouvrir/fermer
            if (window.innerWidth <= 768) {
                e.preventDefault();
                navDropdown.classList.toggle('active');
            }
        });
        
        // Fermer le menu si on clique ailleurs
        document.addEventListener('click', function(e) {
            if (!navDropdown.contains(e.target)) {
                navDropdown.classList.remove('active');
            }
        });
    }
    
    // Smooth scrolling pour les liens de navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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

    // Animation des cartes au scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observer les éléments à animer
    document.querySelectorAll('.feature-card, .pricing-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Gestion des boutons CTA
    const ctaButtons = document.querySelectorAll('.btn-primary');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Animation du bouton
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);

            // Modal ou redirection vers inscription
            showSignupModal();
        });
    });

    // Fonction pour afficher le modal d'inscription
    function showSignupModal() {
        // Créer le modal d'inscription
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>🚀 Rejoignez LegalReflex</h3>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="modal-body">
                    <form class="signup-form">
                        <div class="form-group">
                            <label for="email">Email professionnel</label>
                            <input type="email" id="email" name="email" required placeholder="votre@email.com">
                        </div>
                        <div class="form-group">
                            <label for="userType">Type d'utilisateur</label>
                            <select id="userType" name="userType" required>
                                <option value="">Sélectionnez...</option>
                                <option value="particulier">Particulier</option>
                                <option value="entreprise">Entreprise (PME/TPE)</option>
                                <option value="avocat">Avocat / Juriste</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="needs">Vos besoins principaux</label>
                            <textarea id="needs" name="needs" placeholder="Décrivez brièvement vos besoins juridiques..."></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary btn-full">
                            Commencer mon essai gratuit
                        </button>
                    </form>
                    <p class="modal-footer-text">
                        ✅ Essai gratuit de 30 jours<br>
                        ✅ Aucune carte de crédit requise<br>
                        ✅ Support client dédié
                    </p>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Ajouter les styles du modal
        addModalStyles();

        // Gérer la fermeture du modal
        modal.querySelector('.close-modal').addEventListener('click', () => {
            document.body.removeChild(modal);
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });

        // Gérer la soumission du formulaire
        modal.querySelector('.signup-form').addEventListener('submit', handleSignup);
    }

    // Fonction pour gérer l'inscription
    function handleSignup(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const userData = {
            email: formData.get('email'),
            userType: formData.get('userType'),
            needs: formData.get('needs'),
            timestamp: new Date().toISOString()
        };

        // Simulation d'envoi des données
        console.log('Données utilisateur:', userData);

        // Afficher un message de succès
        showSuccessMessage();
        
        // Fermer le modal
        const modal = document.querySelector('.modal-overlay');
        if (modal) {
            document.body.removeChild(modal);
        }
    }

    // Fonction pour afficher le message de succès
    function showSuccessMessage() {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-notification';
        successDiv.innerHTML = `
            <div class="success-content">
                <span class="success-icon">✅</span>
                <span class="success-text">Inscription réussie ! Un email de confirmation vous a été envoyé.</span>
            </div>
        `;

        document.body.appendChild(successDiv);

        // Supprimer le message après 5 secondes
        setTimeout(() => {
            if (document.body.contains(successDiv)) {
                document.body.removeChild(successDiv);
            }
        }, 5000);
    }

    // Fonction pour ajouter les styles du modal
    function addModalStyles() {
        if (document.getElementById('modal-styles')) return;

        const styles = document.createElement('style');
        styles.id = 'modal-styles';
        styles.textContent = `
            .modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 10000;
                animation: fadeIn 0.3s ease;
            }

            .modal-content {
                background: white;
                border-radius: 16px;
                width: 90%;
                max-width: 500px;
                max-height: 90vh;
                overflow-y: auto;
                animation: slideUp 0.3s ease;
            }

            .modal-header {
                padding: 30px 30px 20px;
                border-bottom: 1px solid #eee;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .modal-header h3 {
                margin: 0;
                color: #333;
                font-size: 1.5rem;
            }

            .close-modal {
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                color: #666;
                padding: 5px;
            }

            .modal-body {
                padding: 30px;
            }

            .form-group {
                margin-bottom: 20px;
            }

            .form-group label {
                display: block;
                margin-bottom: 8px;
                font-weight: 500;
                color: #333;
            }

            .form-group input,
            .form-group select,
            .form-group textarea {
                width: 100%;
                padding: 12px 16px;
                border: 2px solid #e1e5e9;
                border-radius: 8px;
                font-size: 1rem;
                transition: border-color 0.3s ease;
            }

            .form-group input:focus,
            .form-group select:focus,
            .form-group textarea:focus {
                outline: none;
                border-color: #1976d2;
            }

            .form-group textarea {
                height: 100px;
                resize: vertical;
            }

            .modal-footer-text {
                margin-top: 20px;
                text-align: center;
                color: #666;
                font-size: 0.9rem;
                line-height: 1.6;
            }

            .success-notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: #4caf50;
                color: white;
                padding: 15px 20px;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                z-index: 10001;
                animation: slideInRight 0.3s ease;
            }

            .success-content {
                display: flex;
                align-items: center;
                gap: 10px;
            }

            .success-icon {
                font-size: 1.2rem;
            }

            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }

            @keyframes slideUp {
                from { 
                    opacity: 0;
                    transform: translateY(30px);
                }
                to { 
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            @keyframes slideInRight {
                from { 
                    opacity: 0;
                    transform: translateX(100%);
                }
                to { 
                    opacity: 1;
                    transform: translateX(0);
                }
            }
        `;

        document.head.appendChild(styles);
    }

    // Counter animation pour les statistiques
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const target = counter.textContent;
            const isNumeric = !isNaN(parseFloat(target));
            
            if (isNumeric) {
                const startValue = 0;
                const endValue = parseFloat(target);
                const duration = 2000; // 2 secondes
                
                let startTime = null;
                
                function updateCounter(timestamp) {
                    if (!startTime) startTime = timestamp;
                    const progress = Math.min((timestamp - startTime) / duration, 1);
                    
                    const currentValue = Math.floor(progress * endValue);
                    counter.textContent = currentValue + target.replace(/[0-9]/g, '');
                    
                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    }
                }
                
                // Démarrer l'animation quand l'élément est visible
                const counterObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            requestAnimationFrame(updateCounter);
                            counterObserver.unobserve(entry.target);
                        }
                    });
                });
                
                counterObserver.observe(counter);
            }
        });
    }

    // Initialiser les animations des compteurs
    animateCounters();

    // Animation reveal on scroll pour la section "Créer son entreprise"
    function initScrollAnimations() {
        const revealElements = document.querySelectorAll('.reveal-on-scroll');
        
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const delay = element.getAttribute('data-delay') || 0;
                    
                    setTimeout(() => {
                        element.classList.add('visible');
                    }, parseInt(delay));
                    
                    revealObserver.unobserve(element);
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        });
        
        revealElements.forEach(element => {
            revealObserver.observe(element);
        });
    }
    
    // Initialiser les animations de scroll
    initScrollAnimations();

    // Gestion du scroll pour la navbar
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scroll vers le bas - cacher la navbar
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scroll vers le haut - montrer la navbar
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Ajouter transition à la navbar
    navbar.style.transition = 'transform 0.3s ease';

    // Animation fade-in pour les cartes d'activité
    const activityObserverOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const activityObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, activityObserverOptions);

    // Observer les cartes d'activité
    document.querySelectorAll('.activity-card').forEach((card, index) => {
        // Style initial pour l'animation
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        
        activityObserver.observe(card);
    });

    console.log('🚀 LegalReflex Platform initialisée avec succès !');
});