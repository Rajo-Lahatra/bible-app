import { bookNames, getVerses, books, getChapters } from './bible-data.js';

let bibleAppInstance = null;

// Définition de TDICT pour le sermon libre
const TDICT = {
    mg: {
        uiTitle: "Générateur de prédication libre",
        uiLangLabel: "Langue des amorces :",
        uiLangMg: "Malagasy",
        uiLangFr: "Français",
        uiTheme: "Thème principal (Lohahevitra)",
        uiPericope: "Perikopa (références des versets)",
        uiParts: "Fizarana (Parties)",
        uiAddPart: "+ Ajouter une Fizarana",
        uiGenerate: "Générer la prédication",
        uiResult: "Résultat",
        uiCopyMd: "Copier (Markdown)",
        uiDlTxt: "Télécharger .txt",
        uiDlHtml: "Télécharger .html",

        partTitle: "Anarana fizarana",
        partContent: "Famintinana sy fanazavana",
        addVerse: "Ajouter un verset",
        removeVerse: "Supprimer",
        removePart: "Supprimer cette partie",

        verseSelectionTitle: "Sélection des versets",
        verseFrom: "Du verset",
        verseTo: "au verset",
        selectVerses: "Sélectionner",
        selectedVerses: "Versets sélectionnés",
        selectBook: "Livre",
        selectChapter: "Chapitre",
        versesText: "Texte des versets"
    },

    fr: {
        uiTitle: "Générateur de prédication libre",
        uiLangLabel: "Langue des amorces :",
        uiLangMg: "Malagasy",
        uiLangFr: "Français",
        uiTheme: "Thème principal",
        uiPericope: "Péricope (références des versets)",
        uiParts: "Parties",
        uiAddPart: "+ Ajouter une partie",
        uiGenerate: "Générer la prédication",
        uiResult: "Résultat",
        uiCopyMd: "Copier (Markdown)",
        uiDlTxt: "Télécharger .txt",
        uiDlHtml: "Télécharger .html",

        partTitle: "Titre de la partie",
        partContent: "Contenu et explication",
        addVerse: "Ajouter un verset",
        removeVerse: "Supprimer",
        removePart: "Supprimer cette partie",

        verseSelectionTitle: "Sélection des versets",
        verseFrom: "Du verset",
        verseTo: "au verset",
        selectVerses: "Sélectionner",
        selectedVerses: "Versets sélectionnés",
        selectBook: "Livre",
        selectChapter: "Chapitre",
        versesText: "Texte des versets"
    }
};

export function initFreeSermonGenerator(appInstance) {
    bibleAppInstance = appInstance;
    
    // Vérifier que le conteneur existe
    const sermonContainer = document.getElementById('free-sermon-generator');
    if (!sermonContainer) {
        console.error('Conteneur free-sermon-generator non trouvé');
        return;
    }
    
    // Réinitialiser le conteneur
    sermonContainer.innerHTML = '';
    
    // Créer une instance de l'interface sermon libre
    new FreeSermonGeneratorUI();
}

class FreeSermonGeneratorUI {
    constructor() {
        this.state = {
            lang: "mg",
            theme: "",
            pericopeRefs: [], // Tableau pour stocker plusieurs références de versets
            parts: [
                {
                    title: "",
                    content: ""
                }
            ],
        };
        
        this.currentVerseTarget = null;
        this.currentBook = "Genesisy";
        this.currentChapter = "1";
        this.currentFromVerse = 1;
        this.currentToVerse = 1;
        this.maxVerses = 1;
        this.currentVersesData = {};
        
        this.initUI();
    }

    // Méthode pour obtenir les traductions
    T() {
        return TDICT[this.state.lang] || TDICT.mg;
    }

    initUI() {
        const sermonContainer = document.getElementById('free-sermon-generator');
        if (!sermonContainer) {
            console.error('Conteneur free-sermon-generator non trouvé lors de l\'initialisation');
            return;
        }

        try {
            sermonContainer.innerHTML = this.getTemplate();
            this.bindEvents();
            this.initializeVerseSelectionModal();
        } catch (error) {
            console.error('Erreur lors de l\'initialisation de l\'UI sermon libre:', error);
        }
    }

    getTemplate() {
        const t = this.T();
        return `
            <div class="free-sermon-generator">
                <h2>${t.uiTitle}</h2>

                <div class="lang-switch">
                    <label for="langSelect">${t.uiLangLabel}</label>
                    <select id="langSelect" class="inp">
                        <option value="mg">${t.uiLangMg}</option>
                        <option value="fr">${t.uiLangFr}</option>
                    </select>
                </div>

                <!-- BOUTONS D'ACTION EN HAUT -->
                <div class="actions-top">
                    <button type="button" id="addPart" class="btn-secondary">${t.uiAddPart}</button>
                    <button type="button" id="generate" class="btn-primary">${t.uiGenerate}</button>
                </div>

                <div class="theme-section">
                    <label>
                        ${t.uiTheme}
                        <input id="themeInput" class="inp wide-input" placeholder="${t.uiTheme}" value="${this.state.theme}" />
                    </label>
                </div>

                <div class="pericope-section">
                    <h3>${t.uiPericope}</h3>
                    <div class="verses-list-container">
                        ${this.state.pericopeRefs.length === 0 ? `
                            <p class="no-verses">Aucun verset sélectionné</p>
                        ` : ''}
                        <div id="pericope-refs-list" class="pericope-refs-list">
                            ${this.state.pericopeRefs.map((ref, index) => `
                                <div class="verse-ref-item" data-index="${index}">
                                    <span class="verse-ref-text">${ref}</span>
                                    <button type="button" class="btn-small btn-danger remove-verse-ref" data-index="${index}">${t.removeVerse}</button>
                                </div>
                            `).join('')}
                        </div>
                        <button type="button" class="btn-small btn-secondary" id="add-pericope-verse">${t.addVerse}</button>
                    </div>
                </div>

                <div id="parts-list" class="parts-stack">
                    ${this.state.parts.map((part, index) => this.renderPartCard(part, index)).join('')}
                </div>

                <!-- SECTION DE RÉSULTAT -->
                <div id="output" class="output hidden">
                    <h3>${t.uiResult}</h3>
                    <div class="out-actions">
                        <button type="button" id="copyMd" class="btn-secondary">${t.uiCopyMd}</button>
                        <button type="button" id="downloadTxt" class="btn-secondary">${t.uiDlTxt}</button>
                        <button type="button" id="downloadHtml" class="btn-secondary">${t.uiDlHtml}</button>
                    </div>
                    <textarea id="mdResult" class="code" rows="20" spellcheck="false"></textarea>
                    <details>
                        <summary>Prévisualisation HTML</summary>
                        <iframe id="htmlPreview" class="preview"></iframe>
                    </details>
                </div>

                <!-- Modal pour la sélection des versets -->
                <div id="verse-selection-modal" class="modal verse-selection-modal">
                    <div class="modal-content">
                        <span class="close">&times;</span>
                        <h3>${t.verseSelectionTitle}</h3>
                        
                        <div class="verse-selection-controls">
                            <div class="book-chapter-selection">
                                <label>${t.selectBook}
                                    <select id="verse-book-select" class="inp">
                                        ${this.getBookOptions()}
                                    </select>
                                </label>
                                <label>${t.selectChapter}
                                    <select id="verse-chapter-select" class="inp">
                                        <option value="1">1</option>
                                    </select>
                                </label>
                            </div>
                            
                            <div class="verse-range">
                                <label>${t.verseFrom}
                                    <input type="number" id="verse-from" min="1" value="1" class="inp small-input">
                                </label>
                                <label>${t.verseTo}
                                    <input type="number" id="verse-to" min="1" value="1" class="inp small-input">
                                </label>
                            </div>
                            
                            <div class="selected-verses-display">
                                <h4>${t.selectedVerses}:</h4>
                                <div id="selected-verses-list" class="verses-list">
                                    <div class="verse-item">Genèse 1:1-1</div>
                                </div>
                            </div>

                            <!-- Affichage du texte des versets dans la modale -->
                            <div class="verses-text-display">
                                <h4>${t.versesText}:</h4>
                                <div id="verses-text-content" class="verses-text-content"></div>
                            </div>
                        </div>
                        
                        <div class="modal-actions">
                            <button type="button" id="confirm-verse-selection" class="btn-primary">${t.selectVerses}</button>
                            <button type="button" id="cancel-verse-selection" class="btn-secondary">Annuler</button>
                        </div>
                    </div>
                </div>
            </div>

            <style>
                .free-sermon-generator {
                    max-width: 100%;
                    padding: 1rem;
                    height: calc(100vh - 100px);
                    overflow-y: auto;
                }

                .wide-input {
                    width: 100% !important;
                    min-width: 300px;
                }

                .small-input {
                    width: 80px;
                }

                /* BOUTONS EN HAUT - STYLE AMÉLIORÉ */
                .actions-top {
                    margin: 1.5rem 0;
                    display: flex;
                    gap: 1rem;
                    justify-content: flex-start;
                    padding: 1rem;
                    background: #f8f9fa;
                    border-radius: 8px;
                    border: 1px solid #e9ecef;
                }

                .actions-top .btn-primary {
                    background: #007bff;
                    color: white;
                    border: none;
                    padding: 0.75rem 1.5rem;
                    border-radius: 6px;
                    font-weight: bold;
                    cursor: pointer;
                    transition: background 0.3s;
                }

                .actions-top .btn-primary:hover {
                    background: #0056b3;
                }

                .actions-top .btn-secondary {
                    background: #6c757d;
                    color: white;
                    border: none;
                    padding: 0.75rem 1.5rem;
                    border-radius: 6px;
                    font-weight: bold;
                    cursor: pointer;
                    transition: background 0.3s;
                }

                .actions-top .btn-secondary:hover {
                    background: #545b62;
                }

                .theme-section {
                    margin-bottom: 2rem;
                    padding: 1rem;
                    background: #f8f9fa;
                    border-radius: 8px;
                    border: 1px solid #e9ecef;
                }

                .theme-section label {
                    font-weight: bold;
                    font-size: 1.1rem;
                }

                .pericope-section {
                    margin-bottom: 2rem;
                    padding: 1rem;
                    background: #f8f9fa;
                    border-radius: 8px;
                    border: 1px solid #e9ecef;
                }

                .pericope-section h3 {
                    margin-top: 0;
                    color: #2c5aa0;
                }

                .verses-list-container {
                    margin-top: 1rem;
                }

                .pericope-refs-list {
                    margin-bottom: 1rem;
                }

                .verse-ref-item {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 0.75rem;
                    margin-bottom: 0.5rem;
                    background: white;
                    border-radius: 6px;
                    border: 1px solid #dee2e6;
                }

                .verse-ref-text {
                    font-weight: 500;
                    color: #2c5aa0;
                }

                .no-verses {
                    color: #6c757d;
                    font-style: italic;
                    text-align: center;
                    padding: 1rem;
                }

                .part-card {
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    padding: 1.5rem;
                    margin: 1rem 0;
                    background: #f9f9f9;
                    position: relative;
                }

                .part-card__head {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 1rem;
                }

                .part-card__title {
                    font-size: 1.2rem;
                    font-weight: bold;
                    color: #2c5aa0;
                    margin: 0;
                }

                .part-card__actions {
                    display: flex;
                    gap: 0.5rem;
                }

                .part-content {
                    margin-top: 1rem;
                }

                .verse-selection-modal .modal-content {
                    max-width: 700px;
                    max-height: 80vh;
                    overflow-y: auto;
                }

                .book-chapter-selection {
                    display: flex;
                    gap: 1rem;
                    margin-bottom: 1rem;
                }

                .book-chapter-selection label {
                    flex: 1;
                }

                .verse-range {
                    display: flex;
                    gap: 1rem;
                    margin-bottom: 1rem;
                }

                .selected-verses-display {
                    margin: 1rem 0;
                }

                .verses-list {
                    max-height: 100px;
                    overflow-y: auto;
                    border: 1px solid #ddd;
                    padding: 0.5rem;
                    background: white;
                }

                .verse-item {
                    padding: 0.25rem;
                    border-bottom: 1px solid #eee;
                }

                .verses-text-display {
                    margin: 1rem 0;
                }

                .verses-text-content {
                    max-height: 200px;
                    overflow-y: auto;
                    border: 1px solid #ddd;
                    padding: 0.5rem;
                    background: #f8f9fa;
                    font-size: 0.9rem;
                    line-height: 1.4;
                }

                .verse-text-item {
                    margin-bottom: 0.5rem;
                    padding-bottom: 0.5rem;
                    border-bottom: 1px solid #eee;
                }

                .verse-text-item:last-child {
                    border-bottom: none;
                }

                .verse-number {
                    font-weight: bold;
                    color: #2c5aa0;
                    margin-right: 0.5rem;
                }

                label {
                    display: block;
                    margin-bottom: 1rem;
                }

                textarea.inp {
                    min-height: 120px;
                    resize: vertical;
                }

                .output {
                    margin-top: 2rem;
                    padding: 1.5rem;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    background: #f9f9f9;
                }

                .output.hidden {
                    display: none;
                }

                .out-actions {
                    display: flex;
                    gap: 0.5rem;
                    margin-bottom: 1rem;
                }

                .code {
                    width: 100%;
                    font-family: 'Courier New', monospace;
                    background: #f5f5f5;
                    border: 1px solid #ddd;
                    padding: 1rem;
                    border-radius: 4px;
                }

                .preview {
                    width: 100%;
                    height: 400px;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                }
            </style>
        `;
    }

    getBookOptions() {
        return books.map(book => {
            const bookName = this.state.lang === 'mg' ? bookNames.malagasy[book] : bookNames.french[book];
            return `<option value="${book}">${bookName}</option>`;
        }).join('');
    }

    renderPartCard(part, index) {
        const t = this.T();
        return `
            <div class="part-card" data-index="${index}">
                <div class="part-card__head">
                    <h3 class="part-card__title">${t.uiParts} ${index + 1}</h3>
                    <div class="part-card__actions">
                        <button type="button" class="btn-small btn-danger remove-part" data-index="${index}">${t.removePart}</button>
                    </div>
                </div>

                <label>${t.partTitle}
                    <input class="inp wide-input part-title" placeholder="${t.partTitle}" value="${part.title || ''}" />
                </label>

                <div class="part-content">
                    <label>${t.partContent}
                        <textarea class="inp wide-input part-content" placeholder="${t.partContent}">${part.content || ''}</textarea>
                    </label>
                </div>
            </div>
        `;
    }

    bindEvents() {
        // Langue
        const langSelect = document.getElementById('langSelect');
        if (langSelect) {
            langSelect.value = this.state.lang;
            langSelect.addEventListener('change', (e) => {
                this.state.lang = e.target.value;
                this.updateUITexts();
                // Recharger les chapitres avec la nouvelle langue
                this.loadChaptersForBook(this.currentBook);
            });
        }

        // Thème
        const themeInput = document.getElementById('themeInput');
        if (themeInput) {
            themeInput.addEventListener('input', (e) => {
                this.state.theme = e.target.value;
            });
        }

        // Ajout de verset à la péricope
        const addPericopeVerseBtn = document.getElementById('add-pericope-verse');
        if (addPericopeVerseBtn) {
            addPericopeVerseBtn.addEventListener('click', () => {
                this.currentVerseTarget = 'pericope';
                this.openVerseSelection();
            });
        }

        // Boutons d'actions EN HAUT
        const addPartBtn = document.getElementById('addPart');
        if (addPartBtn) {
            addPartBtn.addEventListener('click', () => {
                this.addPart();
            });
        }

        // BOUTON DE GÉNÉRATION EN HAUT
        const generateBtn = document.getElementById('generate');
        if (generateBtn) {
            generateBtn.addEventListener('click', () => {
                this.generateOutput();
            });
        }

        // Événements de saisie pour les parties
        this.bindPartEvents();
    }

    bindPartEvents() {
        const partsList = document.getElementById('parts-list');
        if (!partsList) return;

        // Événements de saisie pour les titres et contenus des parties
        partsList.addEventListener('input', (e) => {
            const target = e.target;
            if (target.classList.contains('part-title') || target.classList.contains('part-content')) {
                const partCard = target.closest('.part-card');
                const index = parseInt(partCard.dataset.index);
                const field = target.classList.contains('part-title') ? 'title' : 'content';
                
                if (this.state.parts[index]) {
                    this.state.parts[index][field] = target.value;
                }
            }
        });

        // Événements de suppression des parties
        partsList.addEventListener('click', (e) => {
            if (e.target.classList.contains('remove-part')) {
                const index = parseInt(e.target.dataset.index);
                this.removePart(index);
            }
        });

        // Événements de suppression des références de versets
        const pericopeRefsList = document.getElementById('pericope-refs-list');
        if (pericopeRefsList) {
            pericopeRefsList.addEventListener('click', (e) => {
                if (e.target.classList.contains('remove-verse-ref')) {
                    const index = parseInt(e.target.dataset.index);
                    this.removePericopeRef(index);
                }
            });
        }
    }

    addPart() {
        this.state.parts.push({
            title: "",
            content: ""
        });
        this.rerenderParts();
    }

    removePart(index) {
        if (this.state.parts.length > 1) {
            this.state.parts.splice(index, 1);
            this.rerenderParts();
        } else {
            alert("Vous devez avoir au moins une partie");
        }
    }

    rerenderParts() {
        const partsList = document.getElementById('parts-list');
        if (!partsList) return;
        
        partsList.innerHTML = this.state.parts.map((part, index) => this.renderPartCard(part, index)).join('');
    }

    addPericopeRef(verseRef) {
        this.state.pericopeRefs.push(verseRef);
        this.updatePericopeDisplay();
    }

    removePericopeRef(index) {
        this.state.pericopeRefs.splice(index, 1);
        this.updatePericopeDisplay();
    }

    updatePericopeDisplay() {
        const pericopeRefsList = document.getElementById('pericope-refs-list');
        const noVersesMsg = document.querySelector('.no-verses');
        
        if (pericopeRefsList) {
            pericopeRefsList.innerHTML = this.state.pericopeRefs.map((ref, index) => `
                <div class="verse-ref-item" data-index="${index}">
                    <span class="verse-ref-text">${ref}</span>
                    <button type="button" class="btn-small btn-danger remove-verse-ref" data-index="${index}">${this.T().removeVerse}</button>
                </div>
            `).join('');
        }
        
        if (noVersesMsg) {
            noVersesMsg.style.display = this.state.pericopeRefs.length === 0 ? 'block' : 'none';
        }
    }

    initializeVerseSelectionModal() {
        const modal = document.getElementById('verse-selection-modal');
        const closeBtn = modal.querySelector('.close');
        const cancelBtn = document.getElementById('cancel-verse-selection');
        const confirmBtn = document.getElementById('confirm-verse-selection');
        const bookSelect = document.getElementById('verse-book-select');
        const chapterSelect = document.getElementById('verse-chapter-select');

        // Fermeture de la modale
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        cancelBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        confirmBtn.addEventListener('click', () => {
            this.confirmVerseSelection();
        });

        // Changement de livre
        bookSelect.addEventListener('change', (e) => {
            this.currentBook = e.target.value;
            this.loadChaptersForBook(this.currentBook);
        });

        // Changement de chapitre
        chapterSelect.addEventListener('change', (e) => {
            this.currentChapter = e.target.value;
            this.loadVersesForChapter(this.currentBook, parseInt(this.currentChapter));
        });

        // Changement des versets
        document.getElementById('verse-from').addEventListener('input', (e) => {
            this.currentFromVerse = parseInt(e.target.value) || 1;
            this.updateSelectedVersesDisplay();
            this.displayVersesText();
        });

        document.getElementById('verse-to').addEventListener('input', (e) => {
            this.currentToVerse = parseInt(e.target.value) || 1;
            this.updateSelectedVersesDisplay();
            this.displayVersesText();
        });

        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });

        // Initialiser avec Genèse
        this.loadChaptersForBook('Genesisy');
    }

    async loadChaptersForBook(book) {
        const chapterSelect = document.getElementById('verse-chapter-select');
        
        try {
            // Utiliser la langue sélectionnée pour charger les chapitres
            const chapters = await getChapters(book, this.state.lang === 'mg' ? 'malagasy' : 'french');
            chapterSelect.innerHTML = '';
            
            chapters.forEach(chapter => {
                const option = document.createElement('option');
                option.value = chapter;
                option.textContent = chapter;
                chapterSelect.appendChild(option);
            });
            
            this.currentChapter = chapters[0] || "1";
            await this.loadVersesForChapter(book, parseInt(this.currentChapter));
        } catch (error) {
            console.error('Erreur lors du chargement des chapitres:', error);
            chapterSelect.innerHTML = '<option value="1">1</option>';
        }
    }

    async loadVersesForChapter(book, chapter) {
        try {
            // Utiliser la langue sélectionnée pour charger les versets
            const verses = await getVerses(book, chapter, this.state.lang === 'mg' ? 'malagasy' : 'french');
            this.currentVersesData = verses;
            
            const verseNumbers = Object.keys(verses).map(Number).sort((a, b) => a - b);
            this.maxVerses = verseNumbers.length > 0 ? Math.max(...verseNumbers) : 1;
            
            const fromInput = document.getElementById('verse-from');
            const toInput = document.getElementById('verse-to');
            
            fromInput.max = this.maxVerses;
            toInput.max = this.maxVerses;
            
            this.currentFromVerse = 1;
            this.currentToVerse = this.maxVerses;
            
            fromInput.value = this.currentFromVerse;
            toInput.value = this.currentToVerse;
            
            this.updateSelectedVersesDisplay();
            this.displayVersesText();
        } catch (error) {
            console.error('Erreur lors du chargement des versets:', error);
            this.maxVerses = 1;
            this.currentVersesData = {};
        }
    }

    updateSelectedVersesDisplay() {
        // Utiliser les noms de livres dans la langue sélectionnée
        const bookName = this.state.lang === 'mg' ? 
            bookNames.malagasy[this.currentBook] : 
            bookNames.french[this.currentBook];
        
        const versesList = document.getElementById('selected-verses-list');
        
        // Ajuster les valeurs si nécessaire
        if (this.currentFromVerse > this.currentToVerse) {
            this.currentToVerse = this.currentFromVerse;
            document.getElementById('verse-to').value = this.currentToVerse;
        }
        
        if (this.currentFromVerse > this.maxVerses) {
            this.currentFromVerse = this.maxVerses;
            document.getElementById('verse-from').value = this.currentFromVerse;
        }
        
        if (this.currentToVerse > this.maxVerses) {
            this.currentToVerse = this.maxVerses;
            document.getElementById('verse-to').value = this.currentToVerse;
        }
        
        if (this.currentFromVerse === this.currentToVerse) {
            versesList.innerHTML = `<div class="verse-item">${bookName} ${this.currentChapter}:${this.currentFromVerse}</div>`;
        } else {
            versesList.innerHTML = `<div class="verse-item">${bookName} ${this.currentChapter}:${this.currentFromVerse}-${this.currentToVerse}</div>`;
        }
    }

    displayVersesText() {
        const textContainer = document.getElementById('verses-text-content');
        
        if (!this.currentVersesData || Object.keys(this.currentVersesData).length === 0) {
            textContainer.innerHTML = '<div class="verse-text-item">Aucun texte disponible</div>';
            return;
        }
        
        let html = '';
        
        for (let verseNum = this.currentFromVerse; verseNum <= this.currentToVerse; verseNum++) {
            if (this.currentVersesData[verseNum]) {
                html += `
                    <div class="verse-text-item">
                        <span class="verse-number">${verseNum}</span>
                        <span class="verse-text">${this.currentVersesData[verseNum]}</span>
                    </div>
                `;
            }
        }
        
        textContainer.innerHTML = html || '<div class="verse-text-item">Aucun texte disponible pour cette plage</div>';
    }

    openVerseSelection() {
        document.getElementById('verse-selection-modal').style.display = 'block';
    }

    confirmVerseSelection() {
        // Utiliser les noms de livres dans la langue sélectionnée
        const bookName = this.state.lang === 'mg' ? 
            bookNames.malagasy[this.currentBook] : 
            bookNames.french[this.currentBook];
        
        let verseRef;
        if (this.currentFromVerse === this.currentToVerse) {
            verseRef = `${bookName} ${this.currentChapter}:${this.currentFromVerse}`;
        } else {
            verseRef = `${bookName} ${this.currentChapter}:${this.currentFromVerse}-${this.currentToVerse}`;
        }
        
        // Ajouter la référence à la péricope
        this.addPericopeRef(verseRef);
        
        document.getElementById('verse-selection-modal').style.display = 'none';
    }

    updateUITexts() {
        const t = this.T();
        
        // Titre
        const title = document.querySelector('.free-sermon-generator h2');
        if (title) title.textContent = t.uiTitle;
        
        // Boutons
        const addBtn = document.getElementById('addPart');
        const genBtn = document.getElementById('generate');
        if (addBtn) addBtn.textContent = t.uiAddPart;
        if (genBtn) genBtn.textContent = t.uiGenerate;
        
        // Labels
        const themeLabel = document.querySelector('.theme-section label');
        if (themeLabel) themeLabel.innerHTML = t.uiTheme;
        
        const pericopeTitle = document.querySelector('.pericope-section h3');
        if (pericopeTitle) pericopeTitle.textContent = t.uiPericope;
        
        const addVerseBtn = document.getElementById('add-pericope-verse');
        if (addVerseBtn) addVerseBtn.textContent = t.addVerse;
        
        // Mettre à jour les placeholders et labels des parties
        this.rerenderParts();
        
        // Mettre à jour les options des livres
        const bookSelect = document.getElementById('verse-book-select');
        if (bookSelect) {
            bookSelect.innerHTML = this.getBookOptions();
            bookSelect.value = this.currentBook;
        }
    }

    generateOutput() {
        const md = this.renderAllMarkdown();
        const output = document.getElementById('output');
        if (output) {
            output.classList.remove('hidden');
        }
        
        const mdResult = document.getElementById('mdResult');
        if (mdResult) {
            mdResult.value = md;
        }
        
        const html = this.mdToSimpleHtml(md);
        const iframe = document.getElementById('htmlPreview');
        if (iframe) {
            const blob = new Blob([html], { type: 'text/html' });
            iframe.src = URL.createObjectURL(blob);
        }
        
        // Boutons d'export
        const copyBtn = document.getElementById('copyMd');
        const txtBtn = document.getElementById('downloadTxt');
        const htmlBtn = document.getElementById('downloadHtml');
        
        if (copyBtn) {
            copyBtn.onclick = () => this.copyToClipboard(md, copyBtn);
        }
        
        if (txtBtn) {
            txtBtn.onclick = () => this.saveToFile(`predication-libre-${this.state.lang.toUpperCase()}.txt`, md, 'text/plain');
        }
        
        if (htmlBtn) {
            htmlBtn.onclick = () => this.saveToFile(`predication-libre-${this.state.lang.toUpperCase()}.html`, html, 'text/html');
        }
    }

    renderAllMarkdown() {
        const t = this.T();
        const lines = [];
        
        // Titre + Thème
        lines.push(`# ${this.state.theme || t.uiTitle}\n`);
        
        // Péricope
        if (this.state.pericopeRefs.length > 0) {
            lines.push(`## ${t.uiPericope}`);
            this.state.pericopeRefs.forEach(ref => {
                lines.push(`- ${ref}`);
            });
            lines.push('');
        }
        
        // Parties
        this.state.parts.forEach((part, idx) => {
            const partNumber = idx + 1;
            lines.push(`## ${t.uiParts} ${partNumber}: ${part.title || ''}`);
            if (part.content) {
                lines.push(part.content);
            }
            lines.push('');
        });
        
        return lines.join('\n');
    }

    mdToSimpleHtml(md) {
        let html = md
            .replace(/^## (.*)$/gm, '<h2>$1</h2>')
            .replace(/^# (.*)$/gm, '<h1>$1</h1>')
            .replace(/^- (.*)$/gm, '<li>$1</li>');
            
        html = html.split('\n').map(line => {
            if (line.trim() === '') return '<p></p>';
            if (line.startsWith('<h') || line.startsWith('<li>')) return line;
            return `<p>${line}</p>`;
        }).join('\n');
        
        html = html.replace(/(<p><li>.*?<\/li><\/p>\n?)+/gs, (match) => {
            const items = match.replace(/<\/?p>/g, '');
            return `<ul>${items}</ul>`;
        });
        
        return `<!DOCTYPE html>
<html lang="${this.state.lang}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Prédication Libre - ${this.state.theme || ''}</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; margin: 2rem; }
        h1 { color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 0.5rem; }
        h2 { color: #3498db; margin-top: 2rem; }
        strong { color: #e74c3c; }
        ul { margin: 1rem 0; padding-left: 2rem; }
        li { margin: 0.5rem 0; }
    </style>
</head>
<body>${html}</body>
</html>`;
    }

    async copyToClipboard(text, btn) {
        try {
            await navigator.clipboard.writeText(text);
            if (btn) {
                const original = btn.textContent;
                btn.textContent = 'Copié ✓';
                setTimeout(() => {
                    btn.textContent = original;
                }, 2000);
            }
        } catch (err) {
            alert('Erreur lors de la copie : ' + err.message);
        }
    }

    saveToFile(filename, content, type) {
        const blob = new Blob([content], { type });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
    }
}