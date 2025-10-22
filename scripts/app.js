import { initializeApp, setDisplayMode, getDisplayMode } from './bible-data.js';
import { 
    saveHighlight, 
    saveComment, 
    getUserData,
    initSupabase 
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
        
        this.init();
    }

    async init() {
        // Initialiser Supabase
        this.supabase = await initSupabase();
        
        // Charger les données bibliques
        await initializeApp();
        
        // Initialiser les événements
        this.initializeEvents();
        
        // Charger les données utilisateur si connecté
        if (this.supabase) {
            await this.loadUserData();
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
                const tool = e.target.dataset.tool;
                const color = e.target.dataset.color;
                this.setActiveTool(tool, color);
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

        // Modal de commentaire
        this.initializeCommentModal();
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

        // Utiliser les livres de bible-data.js
        import('./bible-data.js').then(({ books, bookNames }) => {
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
        });
    }

    onLinkBookSelect(book) {
        const linkChapterSelect = document.getElementById('link-chapter-select');
        if (!linkChapterSelect || !book) return;

        // Charger les chapitres disponibles pour ce livre
        import('./bible-data.js').then(({ getChapters }) => {
            const chapters = getChapters(book, 'french');
            linkChapterSelect.innerHTML = '<option value="">Chapitre</option>';
            
            chapters.forEach(chapter => {
                const option = document.createElement('option');
                option.value = chapter;
                option.textContent = `Chapitre ${chapter}`;
                linkChapterSelect.appendChild(option);
            });
        });
    }

    setActiveTool(tool, color = null) {
        // Désactiver tous les outils
        document.querySelectorAll('.tool-btn').forEach(btn => {
            btn.classList.remove('active');
        });

        // Activer le nouvel outil
        const activeBtn = document.querySelector(`[data-tool="${tool}"]`);
        if (activeBtn) {
            activeBtn.classList.add('active');
        }

        this.activeTool = color ? `pencil-${color}` : tool;

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

        if (this.supabase) {
            const isHighlighted = verseElement.classList.contains(`highlighted-${color}`);
            await saveHighlight(this.supabase, verseId, isHighlighted ? color : null);
        }
    }

    openCommentModal(verseId, verseElement) {
        this.selectedVerse = verseId;
        this.linkedVerses = [];
        
        // Afficher la référence du verset
        const verseRef = this.getVerseReference(verseId);
        document.getElementById('current-verse-ref').textContent = verseRef;
        
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
        import('./bible-data.js').then(({ getVerses, bookNames }) => {
            const verses = getVerses(book, parseInt(chapter), 'french');
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
        
        import('./bible-data.js').then(({ getVerses, bookNames }) => {
            const verses = getVerses(book, parseInt(chapter), 'french');
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
        return import('./bible-data.js').then(({ bookNames }) => {
            return `${bookNames.french[book]} ${chapter}:${verse}`;
        });
    }

    async saveComment() {
        const commentText = document.getElementById('comment-text').value;

        if (!commentText.trim()) {
            alert('Veuillez saisir un commentaire');
            return;
        }

        if (this.supabase && this.selectedVerse) {
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
        // Cette fonction est gérée par bible-data.js
    }

    async loadVerses() {
        if (!this.currentBook || !this.currentChapter) return;
        
        // Utiliser la fonction de bible-data.js pour charger les versets
        console.log(`Chargement des versets: ${this.currentBook} chapitre ${this.currentChapter}`);
    }

    async loadUserData() {
        if (!this.supabase) return;
        
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
}

// Initialiser l'application quand la page est chargée
document.addEventListener('DOMContentLoaded', () => {
    new BibleApp();
});