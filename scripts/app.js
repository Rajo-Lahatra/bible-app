import { initializeApp } from './bible-data.js';
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
        this.activeTool = null;
        this.selectedVerse = null;
        this.supabase = null;
        
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

        // Outils
        document.querySelectorAll('.tool-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setActiveTool(e.target.dataset.tool);
            });
        });

        // Thème
        document.getElementById('theme-toggle').addEventListener('click', () => {
            this.toggleTheme();
        });

        // Modal de commentaire
        document.querySelector('.close').addEventListener('click', () => {
            this.closeCommentModal();
        });

        document.getElementById('save-comment').addEventListener('click', () => {
            this.saveComment();
        });

        document.getElementById('cancel-comment').addEventListener('click', () => {
            this.closeCommentModal();
        });
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
        // Implémentation à compléter selon votre structure de données
    }

    async loadVerses() {
        if (!this.currentBook || !this.currentChapter) return;
        
        // Charger les versets malgaches et français
        // Cette partie dépendra de votre structure de données
    }

    setActiveTool(tool) {
        this.activeTool = tool;
        
        // Mettre à jour l'interface pour l'outil actif
        document.querySelectorAll('.tool-btn').forEach(btn => {
            btn.style.backgroundColor = btn.dataset.tool === tool ? 
                'var(--secondary-color)' : '';
        });

        if (tool === 'highlight') {
            this.enableHighlighting();
        }
    }

    enableHighlighting() {
        // Activer le surlignage des versets
        document.querySelectorAll('.verse').forEach(verse => {
            verse.style.cursor = 'pointer';
            verse.addEventListener('click', this.handleVerseClick.bind(this));
        });
    }

    async handleVerseClick(e) {
        const verseElement = e.target.closest('.verse');
        if (!verseElement) return;

        const verseId = verseElement.dataset.verseId;

        if (this.activeTool === 'highlight') {
            await this.toggleHighlight(verseId, verseElement);
        } else if (this.activeTool === 'comment') {
            this.openCommentModal(verseId);
        }
    }

    async toggleHighlight(verseId, verseElement) {
        verseElement.classList.toggle('highlighted');
        
        if (this.supabase) {
            await saveHighlight(this.supabase, verseId, verseElement.classList.contains('highlighted'));
        }
    }

    openCommentModal(verseId) {
        this.selectedVerse = verseId;
        document.getElementById('comment-modal').style.display = 'block';
    }

    closeCommentModal() {
        document.getElementById('comment-modal').style.display = 'none';
        this.selectedVerse = null;
    }

    async saveComment() {
        const commentText = document.getElementById('comment-text').value;
        const verseLink = document.getElementById('verse-link').value;

        if (this.supabase && this.selectedVerse) {
            await saveComment(this.supabase, this.selectedVerse, commentText, verseLink);
            this.closeCommentModal();
            await this.loadUserData(); // Recharger les commentaires
        }
    }

    async loadUserData() {
        if (!this.supabase) return;
        
        const userData = await getUserData(this.supabase);
        this.displayUserData(userData);
    }

    displayUserData(userData) {
        // Afficher les surlignages et commentaires
        userData.highlights.forEach(highlight => {
            const verseElement = document.querySelector(`[data-verse-id="${highlight.verse_id}"]`);
            if (verseElement) {
                verseElement.classList.add('highlighted');
            }
        });

        userData.comments.forEach(comment => {
            this.displayComment(comment);
        });
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
            commentDiv.textContent = comment.content;
            
            if (comment.linked_verse) {
                // Ajouter le lien vers l'autre verset
            }
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