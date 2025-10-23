import { 
    initializeApp, 
    setDisplayMode, 
    getDisplayMode, 
    getVerses, 
    getChapters,
    books,
    bookNames 
} from './bible-data.js';
import { 
    saveHighlight, 
    saveComment, 
    getUserData,
    initSupabase,
    getCurrentUser,
    signIn,
    signUp,
    signOut,
    deleteComment,
    updateComment,
    deleteHighlight
} from './supabase-client.js';

class BibleApp {
    constructor() {
        this.currentBook = '';
        this.currentChapter = '';
        this.activeTool = 'pointer'; // 'pointer', 'pencil-blue', 'pencil-red', 'pencil-green', 'comment'
        this.selectedVerse = null;
        this.supabase = null;
        this.displayMode = 'both';
        this.linkedVerses = []; // Pour stocker les versets liés
        this.currentUser = null;
        this.editingCommentId = null;
        
        this.init();
    }

    async init() {
        // Initialiser Supabase
        this.supabase = await initSupabase();
        
        // Configurer les écouteurs d'authentification
        this.setupAuthListeners();
        
        // Vérifier l'état d'authentification actuel
        await this.checkAuthState();
        
        // Charger les données bibliques
        await initializeApp();
        
        // Initialiser les sélecteurs de livres
        await this.initializeBooks();
        
        // Initialiser les événements
        this.initializeEvents();
        
        // Charger les données utilisateur si connecté
        if (this.currentUser) {
            await this.loadUserData();
        }
    }

    async initializeBooks() {
        const bookSelect = document.getElementById('book-select');
        bookSelect.innerHTML = '<option value="">Choisir un livre</option>';
        
        books.forEach(book => {
            const option = document.createElement('option');
            option.value = book;
            option.textContent = bookNames.french[book];
            bookSelect.appendChild(option);
        });
    }

    setupAuthListeners() {
        if (!this.supabase) return;

        // Écouter les changements d'authentification
        this.supabase.auth.onAuthStateChange((event, session) => {
            console.log('Changement d\'état auth:', event, session?.user?.email);
            
            if (event === 'SIGNED_IN') {
                this.currentUser = session.user;
                this.updateAuthUI();
                this.loadUserData();
            } else if (event === 'SIGNED_OUT') {
                this.currentUser = null;
                this.updateAuthUI();
                this.clearUserData();
            }
        });
    }

    async checkAuthState() {
        try {
            const user = await getCurrentUser();
            this.currentUser = user;
            this.updateAuthUI();
        } catch (error) {
            console.error('Erreur vérification état auth:', error);
            this.currentUser = null;
        }
    }

    updateAuthUI() {
        const authButtons = document.getElementById('auth-buttons');
        const userMenu = document.getElementById('user-menu');
        const userEmail = document.getElementById('user-email');

        if (this.currentUser) {
            // Utilisateur connecté
            authButtons.style.display = 'none';
            userMenu.style.display = 'flex';
            userEmail.textContent = this.currentUser.email;
        } else {
            // Utilisateur non connecté
            authButtons.style.display = 'flex';
            userMenu.style.display = 'none';
        }
    }

    initializeEvents() {
        // Sélection de livre et chapitre
        document.getElementById('book-select').addEventListener('change', (e) => {
            this.onBookSelect(e.target.value);
        });

        document.getElementById('chapter-select').addEventListener('change', (e) => {
            this.onChapterSelect(e.target.value);
        });

        // Outils de crayon et commentaire
        document.querySelectorAll('.tool-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Utiliser currentTarget pour toujours cibler le bouton
                const button = e.currentTarget;
                const tool = button.dataset.tool;
                this.setActiveTool(tool);
            });
        });

        // Mode d'affichage
        document.querySelectorAll('.display-mode-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                setDisplayMode(e.target.dataset.mode);
            });
        });

        // Thème
        document.getElementById('theme-toggle').addEventListener('click', () => {
            this.toggleTheme();
        });

        // Authentification
        document.getElementById('login-btn').addEventListener('click', () => {
            this.openAuthModal('login');
        });

        document.getElementById('signup-btn').addEventListener('click', () => {
            this.openAuthModal('signup');
        });

        document.getElementById('logout-btn').addEventListener('click', () => {
            this.signOut();
        });

        // Nouveau bouton "Mes annotations"
        document.getElementById('my-annotations-btn').addEventListener('click', () => {
            this.openAnnotationsModal();
        });

        // Modal de commentaire
        this.initializeCommentModal();
        
        // Modal d'authentification
        this.initializeAuthModal();
        
        // Modal d'annotations
        this.initializeAnnotationsModal();
        
        // Modal d'édition de commentaire
        this.initializeEditCommentModal();
    }

    initializeAuthModal() {
        const authModal = document.getElementById('auth-modal');
        const authForm = document.getElementById('auth-form');
        const authSwitchBtn = document.getElementById('auth-switch-btn');
        const closeBtn = authModal.querySelector('.close');

        // Fermeture
        closeBtn.addEventListener('click', () => {
            authModal.style.display = 'none';
        });

        // Switch entre connexion/inscription
        authSwitchBtn.addEventListener('click', () => {
            const isLogin = authSwitchBtn.textContent === 'Créer un compte';
            this.openAuthModal(isLogin ? 'signup' : 'login');
        });

        // Soumission du formulaire
        authForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleAuthSubmit();
        });

        // Fermer en cliquant à l'extérieur
        window.addEventListener('click', (e) => {
            if (e.target === authModal) {
                authModal.style.display = 'none';
            }
        });
    }

    initializeAnnotationsModal() {
        const modal = document.getElementById('annotations-modal');
        const closeBtn = modal.querySelector('.close');
        const tabs = document.querySelectorAll('.annotation-tab');

        // Fermeture
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        // Navigation par onglets
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const tabName = tab.dataset.tab;
                
                // Désactiver tous les onglets
                tabs.forEach(t => t.classList.remove('active'));
                document.querySelectorAll('.annotation-tab-content').forEach(content => {
                    content.classList.remove('active');
                });
                
                // Activer l'onglet sélectionné
                tab.classList.add('active');
                document.getElementById(`${tabName}-tab`).classList.add('active');
            });
        });

        // Fermer en cliquant à l'extérieur
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }

    initializeEditCommentModal() {
        const modal = document.getElementById('edit-comment-modal');
        const closeBtn = modal.querySelector('.close');

        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        document.getElementById('update-comment').addEventListener('click', () => {
            this.updateComment();
        });

        document.getElementById('delete-comment').addEventListener('click', () => {
            this.deleteComment();
        });

        document.getElementById('cancel-edit').addEventListener('click', () => {
            modal.style.display = 'none';
        });

        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }

    openAuthModal(mode = 'login') {
        const authModal = document.getElementById('auth-modal');
        const authTitle = document.getElementById('auth-modal-title');
        const authSubmitBtn = document.getElementById('auth-submit-btn');
        const authSwitchBtn = document.getElementById('auth-switch-btn');
        const authForm = document.getElementById('auth-form');
        const errorDiv = document.getElementById('auth-error');

        // Cacher les erreurs
        errorDiv.style.display = 'none';

        if (mode === 'login') {
            authTitle.textContent = 'Connexion';
            authSubmitBtn.textContent = 'Se connecter';
            authSwitchBtn.textContent = 'Créer un compte';
        } else {
            authTitle.textContent = 'Créer un compte';
            authSubmitBtn.textContent = 'Créer un compte';
            authSwitchBtn.textContent = 'Se connecter';
        }

        // Réinitialiser le formulaire
        authForm.reset();
        authModal.style.display = 'block';
        
        // Stocker le mode actuel
        authModal.dataset.mode = mode;
    }

    async handleAuthSubmit() {
        const authModal = document.getElementById('auth-modal');
        const email = document.getElementById('auth-email').value;
        const password = document.getElementById('auth-password').value;
        const errorDiv = document.getElementById('auth-error');
        const submitBtn = document.getElementById('auth-submit-btn');
        const mode = authModal.dataset.mode;

        // Cacher les erreurs précédentes
        errorDiv.style.display = 'none';
        submitBtn.disabled = true;
        submitBtn.textContent = mode === 'login' ? 'Connexion...' : 'Création...';

        try {
            if (mode === 'login') {
                await signIn(email, password);
                this.showMessage('Connexion réussie!', 'success');
            } else {
                await signUp(email, password);
                this.showMessage('Compte créé avec succès! Vous êtes maintenant connecté.', 'success');
            }
            
            authModal.style.display = 'none';
        } catch (error) {
            console.error('Erreur auth:', error);
            errorDiv.textContent = error.message;
            errorDiv.style.display = 'block';
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = mode === 'login' ? 'Se connecter' : 'Créer un compte';
        }
    }

    async signOut() {
        try {
            await signOut();
            this.showMessage('Déconnexion réussie', 'info');
        } catch (error) {
            console.error('Erreur déconnexion:', error);
            this.showMessage('Erreur lors de la déconnexion', 'error');
        }
    }

    showMessage(message, type = 'info') {
        // Créer une notification temporaire
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 6px;
            color: white;
            z-index: 1000;
            max-width: 300px;
            animation: slideIn 0.3s ease;
        `;
        
        if (type === 'success') {
            notification.style.background = '#10b981';
        } else if (type === 'error') {
            notification.style.background = '#ef4444';
        } else {
            notification.style.background = '#3b82f6';
        }
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    clearUserData() {
        // Retirer les surlignages et commentaires de l'interface
        document.querySelectorAll('.verse').forEach(verse => {
            verse.classList.remove('highlighted-blue', 'highlighted-red', 'highlighted-green');
            const commentDiv = verse.querySelector('.verse-comment');
            if (commentDiv) {
                commentDiv.remove();
            }
        });
    }

    initializeCommentModal() {
        // Fermeture des modals
        document.querySelectorAll('.close').forEach(closeBtn => {
            closeBtn.addEventListener('click', (e) => {
                e.target.closest('.modal').style.display = 'none';
            });
        });

        // Sauvegarde du commentaire
        document.getElementById('save-comment').addEventListener('click', () => {
            this.saveComment();
        });

        document.getElementById('cancel-comment').addEventListener('click', () => {
            this.closeCommentModal();
        });

        // Ajout de liens versets
        document.getElementById('add-verse-link').addEventListener('click', () => {
            this.addVerseLink();
        });

        // Initialiser les sélecteurs de livres pour les liens
        this.initializeLinkSelects();

        // Fermer les modals en cliquant à l'extérieur
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                e.target.style.display = 'none';
            }
        });
    }

    initializeLinkSelects() {
        // Remplir le sélecteur de livres pour les liens
        const linkBookSelect = document.getElementById('link-book-select');
        if (!linkBookSelect) return;

        linkBookSelect.innerHTML = '<option value="">Choisir un livre</option>';
        
        books.forEach(book => {
            const option = document.createElement('option');
            option.value = book;
            option.textContent = bookNames.french[book];
            linkBookSelect.appendChild(option);
        });

        // Événement de changement de livre pour les liens
        linkBookSelect.addEventListener('change', (e) => {
            this.onLinkBookSelect(e.target.value);
        });
    }

    onLinkBookSelect(book) {
        const linkChapterSelect = document.getElementById('link-chapter-select');
        if (!linkChapterSelect || !book) return;

        // Charger les chapitres disponibles pour ce livre
        getChapters(book, 'french').then(chapters => {
            linkChapterSelect.innerHTML = '<option value="">Chapitre</option>';
            
            chapters.forEach(chapter => {
                const option = document.createElement('option');
                option.value = chapter;
                option.textContent = `Chapitre ${chapter}`;
                linkChapterSelect.appendChild(option);
            });
        });
    }

    setActiveTool(tool) {
        // Vérifier que tool est défini
        if (!tool) {
            console.error('Tool is undefined');
            return;
        }

        // Désactiver tous les outils
        document.querySelectorAll('.tool-btn').forEach(btn => {
            btn.classList.remove('active');
        });

        // Activer le nouvel outil
        const activeBtn = document.querySelector(`[data-tool="${tool}"]`);
        if (activeBtn) {
            activeBtn.classList.add('active');
        }

        this.activeTool = tool;

        if (tool.startsWith('pencil-')) {
            this.enableHighlighting();
        } else if (tool === 'pointer') {
            this.disableHighlighting();
        } else if (tool === 'comment') {
            this.enableCommenting();
        }
    }

    enableHighlighting() {
        document.querySelectorAll('.verse').forEach(verse => {
            verse.style.cursor = 'pointer';
            // Supprimer d'abord les écouteurs existants pour éviter les doublons
            verse.removeEventListener('click', this.handleVerseClick.bind(this));
            verse.addEventListener('click', this.handleVerseClick.bind(this));
        });
    }

    disableHighlighting() {
        document.querySelectorAll('.verse').forEach(verse => {
            verse.style.cursor = 'default';
            verse.removeEventListener('click', this.handleVerseClick.bind(this));
        });
    }

    enableCommenting() {
        document.querySelectorAll('.verse').forEach(verse => {
            verse.style.cursor = 'pointer';
            // Supprimer d'abord les écouteurs existants pour éviter les doublons
            verse.removeEventListener('click', this.handleVerseClick.bind(this));
            verse.addEventListener('click', this.handleVerseClick.bind(this));
        });
    }

    async handleVerseClick(e) {
        const verseElement = e.target.closest('.verse');
        if (!verseElement) return;

        const verseId = verseElement.dataset.verseId;

        if (this.activeTool.startsWith('pencil-')) {
            await this.toggleHighlight(verseId, verseElement);
        } else if (this.activeTool === 'comment') {
            this.openCommentModal(verseId, verseElement);
        }
    }

    async toggleHighlight(verseId, verseElement) {
        const color = this.activeTool.split('-')[1]; // Extraire la couleur
        
        // Retirer toutes les classes de highlight existantes
        verseElement.classList.remove('highlighted-blue', 'highlighted-red', 'highlighted-green');
        
        // Si le verset a déjà cette couleur, le désactiver
        if (verseElement.classList.contains(`highlighted-${color}`)) {
            verseElement.classList.remove(`highlighted-${color}`);
        } else {
            // Sinon, appliquer la nouvelle couleur
            verseElement.classList.add(`highlighted-${color}`);
        }

        if (this.supabase && this.currentUser) {
            const isHighlighted = verseElement.classList.contains(`highlighted-${color}`);
            await saveHighlight(this.supabase, verseId, isHighlighted ? color : null);
        }
    }

    openCommentModal(verseId, verseElement) {
        // Vérifier si l'utilisateur est connecté
        if (!this.currentUser) {
            this.showMessage('Veuillez vous connecter pour ajouter un commentaire', 'error');
            this.openAuthModal('login');
            return;
        }

        this.selectedVerse = verseId;
        this.linkedVerses = [];
        
        // Afficher la référence du verset
        this.getVerseReference(verseId).then(verseRef => {
            document.getElementById('current-verse-ref').textContent = verseRef;
        });
        
        // Vider la liste des versets liés
        document.getElementById('linked-verses-list').innerHTML = '';
        
        // Réinitialiser les sélecteurs
        document.getElementById('link-book-select').value = '';
        document.getElementById('link-chapter-select').innerHTML = '<option value="">Chapitre</option>';
        document.getElementById('link-verse-input').value = '';
        
        document.getElementById('comment-modal').style.display = 'block';
    }

    closeCommentModal() {
        document.getElementById('comment-modal').style.display = 'none';
        this.selectedVerse = null;
        this.linkedVerses = [];
    }

    addVerseLink() {
        const book = document.getElementById('link-book-select').value;
        const chapter = document.getElementById('link-chapter-select').value;
        const verse = document.getElementById('link-verse-input').value;

        if (!book || !chapter || !verse) {
            alert('Veuillez sélectionner un livre, un chapitre et un verset');
            return;
        }

        const verseId = `${book}-${chapter}-${verse}`;
        
        // Vérifier si le verset existe
        getVerses(book, parseInt(chapter), 'french').then(verses => {
            const verseText = verses[parseInt(verse)];

            if (!verseText) {
                alert('Ce verset n\'existe pas');
                return;
            }

            // Ajouter à la liste
            this.linkedVerses.push({
                verseId: verseId,
                book: book,
                chapter: chapter,
                verse: verse,
                text: verseText.substring(0, 100) + '...'
            });

            this.updateLinkedVersesList();
            
            // Réinitialiser les champs
            document.getElementById('link-verse-input').value = '';
        });
    }

    updateLinkedVersesList() {
        const listContainer = document.getElementById('linked-verses-list');
        listContainer.innerHTML = '';

        this.linkedVerses.forEach((linkedVerse, index) => {
            const verseItem = document.createElement('div');
            verseItem.className = 'linked-verse-item';
            
            verseItem.innerHTML = `
                <div class="linked-verse-text">
                    <strong>${linkedVerse.book} ${linkedVerse.chapter}:${linkedVerse.verse}</strong>
                    <br>
                    <span>${linkedVerse.text}</span>
                </div>
                <button type="button" class="remove-verse-link" data-index="${index}">×</button>
            `;

            // Événement pour supprimer le lien
            verseItem.querySelector('.remove-verse-link').addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.index);
                this.linkedVerses.splice(index, 1);
                this.updateLinkedVersesList();
            });

            // Événement pour prévisualiser le verset
            verseItem.querySelector('.linked-verse-text').addEventListener('click', () => {
                this.previewLinkedVerse(linkedVerse.verseId);
            });

            listContainer.appendChild(verseItem);
        });
    }

    previewLinkedVerse(verseId) {
        const [book, chapter, verse] = verseId.split('-');
        
        getVerses(book, parseInt(chapter), 'french').then(verses => {
            const verseText = verses[parseInt(verse)];

            if (verseText) {
                document.getElementById('preview-verse-title').textContent = 
                    `${bookNames.french[book]} ${chapter}:${verse}`;
                document.getElementById('preview-verse-content').textContent = verseText;
                document.getElementById('verse-preview-modal').style.display = 'block';
            }
        });
    }

    getVerseReference(verseId) {
        const [book, chapter, verse] = verseId.split('-');
        return Promise.resolve(`${bookNames.french[book]} ${chapter}:${verse}`);
    }

    async saveComment() {
        const commentText = document.getElementById('comment-text').value;

        if (!commentText.trim()) {
            alert('Veuillez saisir un commentaire');
            return;
        }

        if (this.supabase && this.selectedVerse && this.currentUser) {
            const linkedVersesIds = this.linkedVerses.map(v => v.verseId).join(';');
            
            await saveComment(this.supabase, this.selectedVerse, commentText, linkedVersesIds);
            this.closeCommentModal();
            await this.loadUserData(); // Recharger les commentaires
        }
    }

    async onBookSelect(bookId) {
        this.currentBook = bookId;
        await this.loadChapters(bookId);
        await this.loadVerses();
    }

    async onChapterSelect(chapterId) {
        this.currentChapter = chapterId;
        await this.loadVerses();
    }

    async loadChapters(bookId) {
        if (!bookId) return;

        try {
            const chapterSelect = document.getElementById('chapter-select');
            chapterSelect.innerHTML = '<option value="">Chapitre</option>';
            
            // Charger les chapitres disponibles pour ce livre
            const chapters = await getChapters(bookId, 'malagasy');
            
            chapters.forEach(chapter => {
                const option = document.createElement('option');
                option.value = chapter;
                option.textContent = `Chapitre ${chapter}`;
                chapterSelect.appendChild(option);
            });
            
            console.log(`Chargé ${chapters.length} chapitres pour ${bookId}`);
        } catch (error) {
            console.error('Erreur lors du chargement des chapitres:', error);
        }
    }

    async loadVerses() {
        if (!this.currentBook || !this.currentChapter) return;
        
        try {
            console.log(`Chargement des versets: ${this.currentBook} chapitre ${this.currentChapter}`);
            
            // Charger les versets malgaches et français depuis Supabase
            const malagasyVerses = await getVerses(this.currentBook, parseInt(this.currentChapter), 'malagasy');
            const frenchVerses = await getVerses(this.currentBook, parseInt(this.currentChapter), 'french');
            
            this.displayVerses(malagasyVerses, 'malagasy');
            this.displayVerses(frenchVerses, 'french');
            
        } catch (error) {
            console.error('Erreur lors du chargement des versets:', error);
            this.showMessage('Erreur lors du chargement des versets', 'error');
        }
    }

    displayVerses(verses, language) {
        const containerId = language === 'malagasy' ? 'malagasy-verses' : 'french-verses';
        const container = document.getElementById(containerId);
        
        if (!container) {
            console.error('Container non trouvé:', containerId);
            return;
        }
        
        container.innerHTML = '';
        
        if (!verses || Object.keys(verses).length === 0) {
            container.innerHTML = '<div class="no-verses">Aucun verset disponible</div>';
            return;
        }
        
        // Trier les numéros de versets
        const verseNumbers = Object.keys(verses).map(Number).sort((a, b) => a - b);
        
        verseNumbers.forEach(verseNum => {
            const verseElement = document.createElement('div');
            verseElement.className = 'verse';
            verseElement.dataset.verseId = `${this.currentBook}-${this.currentChapter}-${verseNum}`;
            
            verseElement.innerHTML = `
                <span class="verse-number">${verseNum}</span>
                <span class="verse-text">${verses[verseNum] || '[Verset non disponible]'}</span>
            `;
            
            container.appendChild(verseElement);
        });
        
        // Réactiver les outils si nécessaire
        if (this.activeTool.startsWith('pencil-')) {
            this.enableHighlighting();
        } else if (this.activeTool === 'comment') {
            this.enableCommenting();
        }
    }

    async loadUserData() {
        if (!this.supabase || !this.currentUser) return;
        
        const userData = await getUserData(this.supabase);
        this.displayUserData(userData);
    }

    displayUserData(userData) {
        // Afficher les surlignages
        if (userData.highlights) {
            userData.highlights.forEach(highlight => {
                const verseElement = document.querySelector(`[data-verse-id="${highlight.verse_id}"]`);
                if (verseElement && highlight.color) {
                    verseElement.classList.add(`highlighted-${highlight.color}`);
                }
            });
        }

        // Afficher les commentaires
        if (userData.comments) {
            userData.comments.forEach(comment => {
                this.displayComment(comment);
            });
        }
    }

    displayComment(comment) {
        const verseElement = document.querySelector(`[data-verse-id="${comment.verse_id}"]`);
        if (verseElement) {
            let commentDiv = verseElement.querySelector('.verse-comment');
            if (!commentDiv) {
                commentDiv = document.createElement('div');
                commentDiv.className = 'verse-comment';
                verseElement.appendChild(commentDiv);
            }
            
            // Afficher le commentaire avec les liens versets
            let commentHTML = comment.content;
            
            // Traiter les versets liés
            if (comment.linked_verse) {
                const linkedVerses = comment.linked_verse.split(';');
                linkedVerses.forEach(verseId => {
                    if (verseId) {
                        commentHTML += `<br><small class="verse-link" data-verse-id="${verseId}">🔗 Voir ${verseId}</small>`;
                    }
                });
            }
            
            commentDiv.innerHTML = commentHTML;
            
            // Ajouter les événements pour les liens
            commentDiv.querySelectorAll('.verse-link').forEach(link => {
                link.addEventListener('click', (e) => {
                    const verseId = e.target.dataset.verseId;
                    this.previewLinkedVerse(verseId);
                });
            });
        }
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        
        // Sauvegarder la préférence
        localStorage.setItem('theme', newTheme);
    }

    // NOUVELLES MÉTHODES POUR LA GESTION DES ANNOTATIONS

    async openAnnotationsModal() {
        if (!this.currentUser) {
            this.showMessage('Veuillez vous connecter pour voir vos annotations', 'error');
            this.openAuthModal('login');
            return;
        }

        await this.loadAnnotationsData();
        document.getElementById('annotations-modal').style.display = 'block';
    }

    async loadAnnotationsData() {
        if (!this.supabase || !this.currentUser) return;

        const userData = await getUserData(this.supabase);
        this.displayHighlights(userData.highlights || []);
        this.displayComments(userData.comments || []);
    }

    displayHighlights(highlights) {
        const highlightsList = document.getElementById('highlights-list');
        highlightsList.innerHTML = '';

        if (highlights.length === 0) {
            highlightsList.innerHTML = '<p class="no-annotations">Aucun surlignage sauvegardé</p>';
            return;
        }

        highlights.forEach(highlight => {
            const highlightItem = document.createElement('div');
            highlightItem.className = 'annotation-item';
            
            highlightItem.innerHTML = `
                <div class="annotation-content">
                    <div class="annotation-header">
                        <span class="verse-reference">${this.formatVerseId(highlight.verse_id)}</span>
                        <span class="highlight-color ${highlight.color}"></span>
                    </div>
                    <div class="annotation-actions">
                        <button class="btn-small btn-secondary goto-verse" data-verse-id="${highlight.verse_id}">Aller au verset</button>
                        <button class="btn-small btn-danger remove-highlight" data-highlight-id="${highlight.id}">Supprimer</button>
                    </div>
                </div>
            `;

            // Aller au verset
            highlightItem.querySelector('.goto-verse').addEventListener('click', () => {
                this.goToVerse(highlight.verse_id);
                document.getElementById('annotations-modal').style.display = 'none';
            });

            // Supprimer le surlignage
            highlightItem.querySelector('.remove-highlight').addEventListener('click', async () => {
                if (confirm('Voulez-vous vraiment supprimer ce surlignage ?')) {
                    await this.removeHighlight(highlight.id, highlight.verse_id);
                }
            });

            highlightsList.appendChild(highlightItem);
        });
    }

    displayComments(comments) {
        const commentsList = document.getElementById('comments-list');
        commentsList.innerHTML = '';

        if (comments.length === 0) {
            commentsList.innerHTML = '<p class="no-annotations">Aucun commentaire sauvegardé</p>';
            return;
        }

        comments.forEach(comment => {
            const commentItem = document.createElement('div');
            commentItem.className = 'annotation-item';
            
            // Limiter la longueur du commentaire pour l'affichage
            const shortContent = comment.content.length > 100 
                ? comment.content.substring(0, 100) + '...' 
                : comment.content;

            commentItem.innerHTML = `
                <div class="annotation-content">
                    <div class="annotation-header">
                        <span class="verse-reference">${this.formatVerseId(comment.verse_id)}</span>
                    </div>
                    <div class="comment-preview">${shortContent}</div>
                    <div class="annotation-actions">
                        <button class="btn-small btn-secondary goto-verse" data-verse-id="${comment.verse_id}">Aller au verset</button>
                        <button class="btn-small btn-primary edit-comment" data-comment-id="${comment.id}">Modifier</button>
                        <button class="btn-small btn-danger remove-comment" data-comment-id="${comment.id}">Supprimer</button>
                    </div>
                </div>
            `;

            // Aller au verset
            commentItem.querySelector('.goto-verse').addEventListener('click', () => {
                this.goToVerse(comment.verse_id);
                document.getElementById('annotations-modal').style.display = 'none';
            });

            // Modifier le commentaire
            commentItem.querySelector('.edit-comment').addEventListener('click', () => {
                this.openEditCommentModal(comment);
            });

            // Supprimer le commentaire
            commentItem.querySelector('.remove-comment').addEventListener('click', async () => {
                if (confirm('Voulez-vous vraiment supprimer ce commentaire ?')) {
                    await this.removeComment(comment.id);
                }
            });

            commentsList.appendChild(commentItem);
        });
    }

    formatVerseId(verseId) {
        const [book, chapter, verse] = verseId.split('-');
        return `${book} ${chapter}:${verse}`;
    }

    async goToVerse(verseId) {
        const [book, chapter, verse] = verseId.split('-');
        
        // Fermer le modal des annotations d'abord
        document.getElementById('annotations-modal').style.display = 'none';
        
        // Mettre à jour les sélecteurs
        document.getElementById('book-select').value = book;
        await this.onBookSelect(book);
        
        document.getElementById('chapter-select').value = chapter;
        await this.onChapterSelect(chapter);
        
        // Faire défiler jusqu'au verset
        setTimeout(() => {
            const verseElement = document.querySelector(`[data-verse-id="${verseId}"]`);
            if (verseElement) {
                verseElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                verseElement.style.backgroundColor = 'var(--hover-color)';
                setTimeout(() => {
                    verseElement.style.backgroundColor = '';
                }, 2000);
            }
        }, 500);
    }

    openEditCommentModal(comment) {
        this.editingCommentId = comment.id;
        
        document.getElementById('edit-verse-ref').textContent = this.formatVerseId(comment.verse_id);
        document.getElementById('edit-comment-text').value = comment.content;
        
        document.getElementById('edit-comment-modal').style.display = 'block';
        document.getElementById('annotations-modal').style.display = 'none';
    }

    async updateComment() {
        const newContent = document.getElementById('edit-comment-text').value.trim();
        
        if (!newContent) {
            alert('Le commentaire ne peut pas être vide');
            return;
        }

        try {
            await updateComment(this.supabase, this.editingCommentId, newContent);
            this.showMessage('Commentaire mis à jour avec succès', 'success');
            document.getElementById('edit-comment-modal').style.display = 'none';
            await this.loadAnnotationsData(); // Recharger les données
        } catch (error) {
            console.error('Erreur lors de la mise à jour du commentaire:', error);
            this.showMessage('Erreur lors de la mise à jour du commentaire', 'error');
        }
    }

    async deleteComment() {
        if (!confirm('Voulez-vous vraiment supprimer définitivement ce commentaire ?')) {
            return;
        }

        try {
            await deleteComment(this.supabase, this.editingCommentId);
            this.showMessage('Commentaire supprimé avec succès', 'success');
            document.getElementById('edit-comment-modal').style.display = 'none';
            await this.loadAnnotationsData(); // Recharger les données
            await this.loadUserData(); // Mettre à jour l'affichage dans la Bible
        } catch (error) {
            console.error('Erreur lors de la suppression du commentaire:', error);
            this.showMessage('Erreur lors de la suppression du commentaire', 'error');
        }
    }

    async removeHighlight(highlightId, verseId) {
        try {
            await deleteHighlight(this.supabase, highlightId);
            this.showMessage('Surlignage supprimé avec succès', 'success');
            
            // Mettre à jour l'affichage dans la Bible
            const verseElement = document.querySelector(`[data-verse-id="${verseId}"]`);
            if (verseElement) {
                verseElement.classList.remove('highlighted-blue', 'highlighted-red', 'highlighted-green');
            }
            
            await this.loadAnnotationsData(); // Recharger les données
        } catch (error) {
            console.error('Erreur lors de la suppression du surlignage:', error);
            this.showMessage('Erreur lors de la suppression du surlignage', 'error');
        }
    }

    async removeComment(commentId) {
        try {
            await deleteComment(this.supabase, commentId);
            this.showMessage('Commentaire supprimé avec succès', 'success');
            
            // Mettre à jour l'affichage dans la Bible
            const commentElements = document.querySelectorAll('.verse-comment');
            commentElements.forEach(element => {
                if (element.textContent.includes(commentId)) {
                    element.remove();
                }
            });
            
            await this.loadAnnotationsData(); // Recharger les données
            await this.loadUserData(); // Recharger les données utilisateur
        } catch (error) {
            console.error('Erreur lors de la suppression du commentaire:', error);
            this.showMessage('Erreur lors de la suppression du commentaire', 'error');
        }
    }
}

// Initialiser l'application quand la page est chargée
document.addEventListener('DOMContentLoaded', () => {
    new BibleApp();
});