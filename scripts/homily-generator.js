import { bookNames, getVerses, books, getChapters } from './bible-data.js';

let bibleAppInstance = null;

// Définition de TDICT comme variable globale du module
const TDICT = {
    mg: {
        uiTitle: "Générateur de plan d'homélie (Toriteny)",
        uiLangLabel: "Langue des amorces :",
        uiLangMg: "Malagasy",
        uiLangFr: "Français",
        uiPericope: "Perikopa (référence à annoncer – (AVERINA INDROA))",
        uiSummary: "Résumé (1–2 phrases)",
        uiNotesSummary: "Petite phrase intercalée entre les vérités en conclusion (fitaomana, fampiheritreretana, kristolojia, andinin-tsoratra masina, tonon-kira…).",
        uiAddTruth: "+ Ajouter une Fahamarinana",
        uiGenerate: "Générer le plan",
        uiResult: "Résultat",
        uiCopyMd: "Copier (Markdown)",
        uiDlTxt: "Télécharger .txt",
        uiDlHtml: "Télécharger .html",

        introGreeting: "Ho aminareo anie ny fahasoavana sy ny fiadanana avy amin'Andriamanitra Ray sy Jesoa Kristy Tompo. Amen.",
        introPericopeLead: "Ny tenin'Andriamanitra izay angalantsika ny hafatra anio dia voasoratra ao amin'ny",
        introPericopeRepeat: "(AVERINA INDROA)",
        introSummaryLead: "Ity soratra masina ity dia miresaka indrindra ny",

        truthTitle: (i) => `Fahamarinana ${i}`,
        truthLead: (i) => i === 1 
            ? "Ny fahamarinana voalohany hitantsika eto ry havana dia izao (averina in-2):"
            : "Ny fahamarinana manaraka hitantsika eto ry havana dia izao (averina in-2):",
        verseLead: "Hitantsika izany eo amin'ny andininy faha",
        explainLead: "Eto, ry havana, dia hitantsika fa",
        appLead: "Inona ary no lesona azontsika tsoahina avy amin'izany?",
        appDimsLabel: "Dimensions (D1/D2/D3)",
        reflectLead: "Ny fanontaniana mipetraka amiko sy aminao ary dia izao:",
        exhortLead: "Mitaona anao aho, ry havana,",
        christLead: "Ny vaovao mahafaly ho antsika ry havana dia izao:",

        conclTitle: "Famaranana",
        conclLead: "Raha fintinina izay rehetra voambara teo ry havana dia hitantsika teo fa:",
        gloria: "Ho an'Andriamanitra irery ihany ny voninahitra, Amen!",

        lblKey: "Déclaration (Key statement) *",
        phKey: "Atomboka amin'ny hoe: Ny fahamarinana ... dia izao (averina in-2)",
        lblVerses: "Andininy (référence(s))",
        phVerses: "Oh: Zak. 8:1-8 / Mat. 5:3-10",
        lblExplain: "Fanazavana (40%)",
        phExplain: "Eto, ry havana, dia hitantsika fa ... (konteksta, teny loham-fahamarinana, sary ... )",
        lblApp: (d) => `Fampiharana – ${d} (50%)`,
        phD1: "D1 (oh: izaho/ankohonana/asa…)",
        phD2: "D2",
        phD3: "D3",
        lblReflect: "Fampiheritreretana",
        phReflect: "Ny fanontaniana mipetraka amiko sy aminao ary dia izao …",
        lblExhort: "Fitaomana",
        phExhort: "Mitaona anao aho, ry havana, …",
        lblChrist: "Kristolojia",
        phChrist: "Ny vaovao mahafaly ho antsika ry havana dia izao … (fahasoavana, vahaolana, en Kristo)",

        actUp: "▲",
        actDown: "▼",
        actRemove: "Supprimer",
        removeDim: "×",

        lblExplainOut: "Fanazavana :",
        lblAppOut: "Fampiharana :",
        lblReflectOut: "Fampiheritreretana :",
        lblExhortOut: "Fitaomana :",
        lblChristOut: "Kristolojia :",
        lblVersesOut: "Andininy :",

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
        uiTitle: "Générateur de plan d'homélie",
        uiLangLabel: "Langue des amorces :",
        uiLangMg: "Malagasy",
        uiLangFr: "Français",
        uiPericope: "Péricope (référence à annoncer – (ANNONCER DEUX FOIS))",
        uiSummary: "Résumé (1–2 phrases)",
        uiNotesSummary: "Petite phrase intercalée entre les vérités en conclusion (exhortation, réflexion, christologie, verset, cantique…).",
        uiAddTruth: "+ Ajouter une vérité",
        uiGenerate: "Générer le plan",
        uiResult: "Résultat",
        uiCopyMd: "Copier (Markdown)",
        uiDlTxt: "Télécharger .txt",
        uiDlHtml: "Télécharger .html",

        introGreeting: "Que la grâce et la paix vous soient données de la part de Dieu notre Père et du Seigneur Jésus-Christ. Amen.",
        introPericopeLead: "La Parole de Dieu qui porte notre message aujourd'hui est écrite dans",
        introPericopeRepeat: "(ANNONCER DEUX FOIS)",
        introSummaryLead: "Ce passage parle principalement de",

        truthTitle: (i) => `Vérité ${i}`,
        truthLead: (i) => i === 1
            ? "La première vérité que nous voyons ici, chers frères et sœurs, est la suivante (à répéter 2×) :"
            : "La vérité suivante que nous voyons est la suivante (à répéter 2×) :",
        verseLead: "Nous le voyons au verset",
        explainLead: "Ici, nous constatons que",
        appLead: "Quelle leçon concrète pouvons-nous en tirer ?",
        appDimsLabel: "Dimensions (D1/D2/D3)",
        reflectLead: "La question qui s'impose à vous et à moi est la suivante :",
        exhortLead: "Je vous exhorte, chers frères et sœurs, à",
        christLead: "La Bonne Nouvelle pour nous aujourd'hui est la suivante :",

        conclTitle: "Conclusion",
        conclLead: "En résumé, nous avons vu que :",
        gloria: "À Dieu seul soit la gloire. Amen !",

        lblKey: "Déclaration (énoncé clé) *",
        phKey: "Commencez par : La première vérité que nous voyons… (à répéter 2×)",
        lblVerses: "Verset(s) (référence)",
        phVerses: "Ex : Za 8:1-8 / Mt 5:3-10",
        lblExplain: "Explication (40 %)",
        phExplain: "Ici, nous constatons que … (contexte, mot-clé, illustration)",
        lblApp: (d) => `Application – ${d} (50 %)`,
        phD1: "D1 (ex : moi/famille/travail…)",
        phD2: "D2",
        phD3: "D3",
        lblReflect: "Réflexion",
        phReflect: "La question qui s'impose à vous et à moi est la suivante …",
        lblExhort: "Exhortation",
        phExhort: "Je vous exhorte à …",
        lblChrist: "Christologie",
        phChrist: "La Bonne Nouvelle pour nous aujourd'hui est … (grâce, solution, en Christ)",

        actUp: "▲",
        actDown: "▼",
        actRemove: "Supprimer",
        removeDim: "×",

        lblExplainOut: "Explication :",
        lblAppOut: "Application :",
        lblReflectOut: "Réflexion :",
        lblExhortOut: "Exhortation :",
        lblChristOut: "Christologie :",
        lblVersesOut: "Verset(s) :",

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

export function initHomilyGenerator(appInstance) {
    bibleAppInstance = appInstance;
    
    // Vérifier que le conteneur existe
    const homilyContainer = document.getElementById('homily-generator');
    if (!homilyContainer) {
        console.error('Conteneur homily-generator non trouvé');
        return;
    }
    
    // Réinitialiser le conteneur
    homilyContainer.innerHTML = '';
    
    // Créer une instance de l'interface homélie
    new HomilyGeneratorUI();
}

class HomilyGeneratorUI {
    constructor() {
        // Initialiser this.state d'abord
        this.state = {
            lang: "mg",
            pericopeRef: "",
            pericopeSummary: "",
            pericopeText: "", // NOUVEAU: Texte des versets de la péricope
            truths: [],
            conclusionNotes: "",
        };
        
        this.currentVerseTarget = null;
        this.currentTruthIndex = null;
        this.selectedVerses = {};
        this.currentBook = "Genesisy";
        this.currentChapter = "1";
        this.currentFromVerse = 1;
        this.currentToVerse = 1;
        this.maxVerses = 1;
        this.currentVersesData = {};
        
        // Maintenant initialiser les truths après que this.state soit défini
        this.state.truths = [this.emptyTruth(1), this.emptyTruth(2)];
        
        this.initUI();
    }

    // Méthode pour obtenir les traductions
    T() {
        return TDICT[this.state.lang] || TDICT.mg;
    }

    emptyTruth(i = 1) {
        const t = this.T();
        return {
            title: t.truthTitle(i),
            keyStatement: "",
            versesRef: "",
            versesText: "", // NOUVEAU: Texte des versets pour chaque vérité
            explanation: "",
            appD1: "",
            appD2: "",
            appD3: "",
            reflection: "",
            exhortation: "",
            christology: "",
            intercalaryNotes: ""
        };
    }

    initUI() {
        const homilyContainer = document.getElementById('homily-generator');
        if (!homilyContainer) {
            console.error('Conteneur homily-generator non trouvé lors de l\'initialisation');
            return;
        }

        try {
            homilyContainer.innerHTML = this.getTemplate();
            this.bindEvents();
            this.rerenderTruths();
            this.initializeVerseSelectionModal();
        } catch (error) {
            console.error('Erreur lors de l\'initialisation de l\'UI homélie:', error);
        }
    }

    getTemplate() {
        const t = this.T();
        return `
            <div class="homily-generator">
                <h2>${t.uiTitle}</h2>

                <div class="lang-switch">
                    <label for="langSelect">${t.uiLangLabel}</label>
                    <select id="langSelect" class="inp">
                        <option value="mg">${t.uiLangMg}</option>
                        <option value="fr">${t.uiLangFr}</option>
                    </select>
                </div>

                <div class="pericope-section">
                    <div class="grid2">
                        <label>
                            ${t.uiPericope}
                            <input id="pericopeRef" class="inp wide-input" placeholder="${t.phVerses}" value="${this.state.pericopeRef}" />
                            <button type="button" class="btn-small btn-secondary" id="select-pericope">${t.selectVerses}</button>
                        </label>

                        <label>
                            ${t.uiSummary}
                            <input id="pericopeSummary" class="inp wide-input" placeholder="${t.introSummaryLead} …" value="${this.state.pericopeSummary}" />
                        </label>
                    </div>
                    
                    <!-- AFFICHAGE DU TEXTE DE LA PÉRICOPE DANS LA FENÊTRE PRINCIPALE -->
                    ${this.state.pericopeText ? `
                        <div class="verses-display-main">
                            <h4>${t.versesText}:</h4>
                            <div class="verses-text-content">${this.state.pericopeText}</div>
                        </div>
                    ` : ''}
                </div>

                <div id="truths-list" class="truths-stack"></div>

                <!-- Notes de conclusion déplacées entre les Fahamarinana -->
                <details class="note intercalary-notes">
                    <summary>${t.uiNotesSummary}</summary>
                    <textarea id="conclusionNotes" class="inp wide-input" placeholder="${t.uiNotesSummary}">${this.state.conclusionNotes}</textarea>
                </details>

                <!-- BOUTON DE GÉNÉRATION BIEN VISIBLE -->
                <div class="actions">
                    <button type="button" id="addTruth" class="btn-secondary">${t.uiAddTruth}</button>
                    <button type="button" id="generate" class="btn-primary">${t.uiGenerate}</button>
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
                .homily-generator {
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

                .pericope-section {
                    margin-bottom: 2rem;
                    padding: 1rem;
                    background: #f8f9fa;
                    border-radius: 8px;
                    border: 1px solid #e9ecef;
                }

                .verses-display-main {
                    margin-top: 1rem;
                    padding: 1rem;
                    background: white;
                    border-radius: 6px;
                    border: 1px solid #dee2e6;
                }

                .verses-display-main h4 {
                    margin: 0 0 0.5rem 0;
                    color: #2c5aa0;
                    font-size: 1rem;
                }

                .truth-card {
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    padding: 1.5rem;
                    margin: 1rem 0;
                    background: #f9f9f9;
                }

                .truth-card__head {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 1rem;
                }

                .truth-card__actions {
                    display: flex;
                    gap: 0.5rem;
                }

                .dimension-row {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    margin-bottom: 0.5rem;
                }

                .dimension-row .inp {
                    flex: 1;
                }

                .remove-dimension {
                    width: 30px;
                    height: 30px;
                    padding: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
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

                .intercalary-notes {
                    margin: 1rem 0;
                    background: #fff3cd;
                    border-color: #ffeaa7;
                }

                .intercalary-notes summary {
                    font-weight: bold;
                    color: #856404;
                }

                label {
                    display: block;
                    margin-bottom: 1rem;
                }

                textarea.inp {
                    min-height: 80px;
                    resize: vertical;
                }

                .app-fieldset {
                    border: 1px solid #ccc;
                    padding: 1rem;
                    margin: 1rem 0;
                }

                .app-fieldset legend {
                    font-weight: bold;
                    padding: 0 0.5rem;
                }

                .actions {
                    margin: 2rem 0;
                    display: flex;
                    gap: 1rem;
                    justify-content: center;
                    position: sticky;
                    bottom: 0;
                    background: white;
                    padding: 1rem;
                    border-top: 2px solid #e9ecef;
                    z-index: 100;
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

                .truth-verses-display {
                    margin: 0.5rem 0;
                    padding: 0.75rem;
                    background: white;
                    border-radius: 4px;
                    border: 1px solid #e9ecef;
                    font-size: 0.9rem;
                    line-height: 1.4;
                }

                .truth-verses-display h5 {
                    margin: 0 0 0.5rem 0;
                    color: #2c5aa0;
                    font-size: 0.9rem;
                }
            </style>
        `;
    }

    getBookOptions() {
        return books.map(book => {
            const bookName = bookNames.french[book] || book;
            return `<option value="${book}">${bookName}</option>`;
        }).join('');
    }

    bindEvents() {
        // Sélection de la péricope
        const selectPericopeBtn = document.getElementById('select-pericope');
        if (selectPericopeBtn) {
            selectPericopeBtn.addEventListener('click', () => {
                this.openVerseSelection('pericopeRef');
            });
        }

        // Langue
        const langSelect = document.getElementById('langSelect');
        if (langSelect) {
            langSelect.value = this.state.lang;
            langSelect.addEventListener('change', (e) => {
                this.state.lang = e.target.value;
                this.updateUITexts();
                this.rerenderTruths();
            });
        }

        // Champs de saisie
        const pericopeRef = document.getElementById('pericopeRef');
        if (pericopeRef) {
            pericopeRef.addEventListener('input', (e) => {
                this.state.pericopeRef = e.target.value;
            });
        }

        const pericopeSummary = document.getElementById('pericopeSummary');
        if (pericopeSummary) {
            pericopeSummary.addEventListener('input', (e) => {
                this.state.pericopeSummary = e.target.value;
            });
        }

        const conclusionNotes = document.getElementById('conclusionNotes');
        if (conclusionNotes) {
            conclusionNotes.addEventListener('input', (e) => {
                this.state.conclusionNotes = e.target.value;
            });
        }

        // Boutons d'actions
        const addTruthBtn = document.getElementById('addTruth');
        if (addTruthBtn) {
            addTruthBtn.addEventListener('click', () => {
                this.state.truths.push(this.emptyTruth(this.state.truths.length + 1));
                this.rerenderTruths();
            });
        }

        // BOUTON DE GÉNÉRATION - BIEN VISIBLE MAINTENANT
        const generateBtn = document.getElementById('generate');
        if (generateBtn) {
            generateBtn.addEventListener('click', () => {
                this.generateOutput();
            });
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
            const chapters = await getChapters(book, 'french');
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
            const verses = await getVerses(book, chapter, 'french');
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
        const bookName = bookNames.french[this.currentBook] || this.currentBook;
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

    formatVersesText(versesData, fromVerse, toVerse) {
        if (!versesData || Object.keys(versesData).length === 0) {
            return 'Aucun texte disponible';
        }
        
        let html = '';
        
        for (let verseNum = fromVerse; verseNum <= toVerse; verseNum++) {
            if (versesData[verseNum]) {
                html += `
                    <div class="verse-text-item">
                        <span class="verse-number">${verseNum}</span>
                        <span class="verse-text">${versesData[verseNum]}</span>
                    </div>
                `;
            }
        }
        
        return html || '<div class="verse-text-item">Aucun texte disponible pour cette plage</div>';
    }

    openVerseSelection(targetField) {
        this.currentVerseTarget = targetField;
        document.getElementById('verse-selection-modal').style.display = 'block';
    }

    confirmVerseSelection() {
        const bookName = bookNames.french[this.currentBook] || this.currentBook;
        
        let verseRef;
        if (this.currentFromVerse === this.currentToVerse) {
            verseRef = `${bookName} ${this.currentChapter}:${this.currentFromVerse}`;
        } else {
            verseRef = `${bookName} ${this.currentChapter}:${this.currentFromVerse}-${this.currentToVerse}`;
        }
        
        const versesText = this.formatVersesText(this.currentVersesData, this.currentFromVerse, this.currentToVerse);
        
        const targetElement = document.getElementById(this.currentVerseTarget);
        if (targetElement) {
            targetElement.value = verseRef;
        }
        
        if (this.currentVerseTarget === 'pericopeRef') {
            this.state.pericopeRef = verseRef;
            this.state.pericopeText = versesText;
            // Mettre à jour l'affichage dans la fenêtre principale
            this.updatePericopeDisplay();
        } else if (this.currentVerseTarget && this.currentVerseTarget.startsWith('truth-')) {
            const parts = this.currentVerseTarget.split('-');
            const truthIndex = parseInt(parts[1]);
            if (this.state.truths[truthIndex]) {
                this.state.truths[truthIndex].versesRef = verseRef;
                this.state.truths[truthIndex].versesText = versesText;
                this.rerenderTruths();
            }
        }
        
        document.getElementById('verse-selection-modal').style.display = 'none';
    }

    updatePericopeDisplay() {
        // Mettre à jour l'affichage de la péricope dans la fenêtre principale
        const pericopeSection = document.querySelector('.pericope-section');
        if (pericopeSection) {
            const existingDisplay = pericopeSection.querySelector('.verses-display-main');
            if (existingDisplay) {
                existingDisplay.remove();
            }
            
            if (this.state.pericopeText) {
                const t = this.T();
                const displayDiv = document.createElement('div');
                displayDiv.className = 'verses-display-main';
                displayDiv.innerHTML = `
                    <h4>${t.versesText}:</h4>
                    <div class="verses-text-content">${this.state.pericopeText}</div>
                `;
                pericopeSection.appendChild(displayDiv);
            }
        }
    }

    renderTruthCard(truth, idx) {
        const t = this.T();
        const wrap = document.createElement('div');
        wrap.className = 'truth-card';
        
        wrap.innerHTML = `
            <div class="truth-card__head">
                <h3>${truth.title}</h3>
                <div class="truth-card__actions">
                    <button type="button" class="btn-small btn-secondary" data-action="move-up">${t.actUp}</button>
                    <button type="button" class="btn-small btn-secondary" data-action="move-down">${t.actDown}</button>
                    <button type="button" class="btn-small btn-danger" data-action="remove">${t.actRemove}</button>
                </div>
            </div>

            <label>${t.lblKey}
                <textarea class="inp wide-input keyStatement" placeholder="${t.phKey}">${truth.keyStatement || ''}</textarea>
            </label>

            <label>${t.lblVerses}
                <input class="inp wide-input versesRef" placeholder="${t.phVerses}" value="${truth.versesRef || ''}" />
                <button type="button" class="btn-small btn-secondary select-verses" data-index="${idx}">${t.selectVerses}</button>
            </label>

            <!-- AFFICHAGE DU TEXTE DES VERSETS DANS LA FENÊTRE PRINCIPALE POUR CHAQUE VÉRITÉ -->
            ${truth.versesText ? `
                <div class="truth-verses-display">
                    <h5>${t.versesText}:</h5>
                    <div class="verses-text-content">${truth.versesText}</div>
                </div>
            ` : ''}

            <label>${t.lblExplain}
                <textarea class="inp wide-input explanation" placeholder="${t.explainLead} ...">${truth.explanation || ''}</textarea>
            </label>

            <fieldset class="app-fieldset">
                <legend>${t.lblApp(t.appDimsLabel)}</legend>
                <div class="dimension-row">
                    <input class="inp wide-input appD1" placeholder="${t.phD1}" value="${truth.appD1 || ''}" />
                    <button type="button" class="btn-small btn-danger remove-dimension" data-dim="1" data-index="${idx}">${t.removeDim}</button>
                </div>
                <div class="dimension-row">
                    <input class="inp wide-input appD2" placeholder="${t.phD2}" value="${truth.appD2 || ''}" />
                    <button type="button" class="btn-small btn-danger remove-dimension" data-dim="2" data-index="${idx}">${t.removeDim}</button>
                </div>
                <div class="dimension-row">
                    <input class="inp wide-input appD3" placeholder="${t.phD3}" value="${truth.appD3 || ''}" />
                    <button type="button" class="btn-small btn-danger remove-dimension" data-dim="3" data-index="${idx}">${t.removeDim}</button>
                </div>
            </fieldset>

            <label>${t.lblReflect}
                <textarea class="inp wide-input reflection" placeholder="${t.reflectLead} …">${truth.reflection || ''}</textarea>
            </label>

            <label>${t.lblExhort}
                <textarea class="inp wide-input exhortation" placeholder="${t.exhortLead} …">${truth.exhortation || ''}</textarea>
            </label>

            <label>${t.lblChrist}
                <textarea class="inp wide-input christology" placeholder="${t.christLead} …">${truth.christology || ''}</textarea>
            </label>

            <!-- Notes intercalaires pour chaque vérité -->
            <details class="note intercalary-notes">
                <summary>Notes intercalaires (facultatif)</summary>
                <textarea class="inp wide-input intercalaryNotes" placeholder="Notes supplémentaires pour cette vérité...">${truth.intercalaryNotes || ''}</textarea>
            </details>
        `;

        // Événements de saisie
        wrap.addEventListener('input', (e) => {
            const el = e.target;
            const field = el.className.split(' ').find(cls => 
                ['keyStatement', 'versesRef', 'explanation', 'appD1', 'appD2', 'appD3', 'reflection', 'exhortation', 'christology', 'intercalaryNotes'].includes(cls)
            );
            if (this.state.truths[idx] && field) {
                this.state.truths[idx][field] = el.value;
            }
        });

        // Bouton de sélection de versets pour cette vérité
        const selectVersesBtn = wrap.querySelector('.select-verses');
        if (selectVersesBtn) {
            selectVersesBtn.addEventListener('click', (e) => {
                const index = e.target.dataset.index;
                this.openVerseSelectionForTruth(index);
            });
        }

        // Boutons de suppression des dimensions
        wrap.querySelectorAll('.remove-dimension').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = e.target.dataset.index;
                const dim = e.target.dataset.dim;
                this.removeDimension(index, dim);
            });
        });

        // Actions de la carte
        wrap.addEventListener('click', (e) => {
            const btn = e.target.closest('button');
            if (!btn) return;
            
            const action = btn.dataset.action;
            if (action === 'remove') {
                this.state.truths.splice(idx, 1);
                this.rerenderTruths();
            } else if (action === 'move-up' && idx > 0) {
                [this.state.truths[idx - 1], this.state.truths[idx]] = [this.state.truths[idx], this.state.truths[idx - 1]];
                this.rerenderTruths();
            } else if (action === 'move-down' && idx < this.state.truths.length - 1) {
                [this.state.truths[idx + 1], this.state.truths[idx]] = [this.state.truths[idx], this.state.truths[idx + 1]];
                this.rerenderTruths();
            }
        });

        return wrap;
    }

    removeDimension(truthIndex, dimension) {
        const fieldName = `appD${dimension}`;
        if (this.state.truths[truthIndex]) {
            this.state.truths[truthIndex][fieldName] = "";
            this.rerenderTruths();
        }
    }

    openVerseSelectionForTruth(truthIndex) {
        this.currentVerseTarget = `truth-${truthIndex}-verses`;
        this.openVerseSelection(this.currentVerseTarget);
    }

    rerenderTruths() {
        const list = document.getElementById('truths-list');
        if (!list) return;
        
        list.innerHTML = '';
        this.state.truths.forEach((truth, idx) => {
            const t = this.T();
            truth.title = t.truthTitle(idx + 1);
            list.appendChild(this.renderTruthCard(truth, idx));
        });
    }

    updateUITexts() {
        const t = this.T();
        
        // Titre
        const title = document.querySelector('#homily-generator h2');
        if (title) title.textContent = t.uiTitle;
        
        // Boutons
        const addBtn = document.getElementById('addTruth');
        const genBtn = document.getElementById('generate');
        if (addBtn) addBtn.textContent = t.uiAddTruth;
        if (genBtn) genBtn.textContent = t.uiGenerate;
        
        // Mettre à jour les placeholders et labels
        this.rerenderTruths();
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
            txtBtn.onclick = () => this.saveToFile(`plan-homelie-${this.state.lang.toUpperCase()}.txt`, md, 'text/plain');
        }
        
        if (htmlBtn) {
            htmlBtn.onclick = () => this.saveToFile(`plan-homelie-${this.state.lang.toUpperCase()}.html`, html, 'text/html');
        }
    }

    renderAllMarkdown() {
        const t = this.T();
        const lines = [];
        
        // Titre + Introduction
        lines.push(`# ${t.uiTitle}\n`);
        lines.push(`**${this.state.lang === 'mg' ? 'Fampidirana' : 'Introduction'}**`);
        lines.push(`${t.introGreeting}`);
        
        if (this.state.pericopeRef.trim()) {
            lines.push(`${t.introPericopeLead} **${this.state.pericopeRef.trim()}**. ${t.introPericopeRepeat}`);
        }
        
        if (this.state.pericopeSummary.trim()) {
            lines.push(`${t.introSummaryLead} **${this.state.pericopeSummary.trim()}**.`);
        }
        lines.push('');
        
        // Vérités
        this.state.truths.forEach((truth, idx) => {
            lines.push(this.renderTruthMarkdown(truth, idx));
        });
        
        // Notes de conclusion intercalaires
        if (this.state.conclusionNotes?.trim()) {
            lines.push(`## Notes Intercalaires`);
            lines.push(this.state.conclusionNotes.trim());
            lines.push('');
        }
        
        // Conclusion
        lines.push(`## ${t.conclTitle}`);
        lines.push(`${t.conclLead}`);
        this.state.truths.forEach((truth, idx) => {
            const num = idx + 1;
            const short = truth.keyStatement?.trim() || truth.title;
            lines.push(`- **${num})** ${short}`);
        });
        
        lines.push('');
        lines.push(t.gloria);
        
        return lines.join('\n');
    }

    renderTruthMarkdown(truth, idx) {
        const i = idx + 1;
        const t = this.T();
        
        let md = `### ${truth.title}\n\n`;
        md += `${t.truthLead(i)}\n\n`;
        
        if (truth.keyStatement?.trim()) {
            md += `**${truth.keyStatement.trim()}**\n\n`;
        }
        
        if (truth.versesRef?.trim()) {
            md += `**${t.lblVersesOut}** ${truth.versesRef.trim()}\n\n`;
        }
        
        if (truth.explanation?.trim()) {
            md += `**${t.lblExplainOut}** ${t.explainLead} ${truth.explanation.trim()}\n\n`;
        }
        
        const hasApp = truth.appD1?.trim() || truth.appD2?.trim() || truth.appD3?.trim();
        if (hasApp) {
            md += `**${t.lblAppOut}** ${t.appLead}\n`;
            if (truth.appD1?.trim()) md += `- D1: ${truth.appD1.trim()}\n`;
            if (truth.appD2?.trim()) md += `- D2: ${truth.appD2.trim()}\n`;
            if (truth.appD3?.trim()) md += `- D3: ${truth.appD3.trim()}\n`;
            md += '\n';
        }
        
        if (truth.reflection?.trim()) {
            md += `**${t.lblReflectOut}** ${t.reflectLead} ${truth.reflection.trim()}\n\n`;
        }
        
        if (truth.exhortation?.trim()) {
            md += `**${t.lblExhortOut}** ${t.exhortLead} ${truth.exhortation.trim()}\n\n`;
        }
        
        if (truth.christology?.trim()) {
            md += `**${t.lblChristOut}** ${truth.christology.trim()}\n\n`;
        }
        
        // Notes intercalaires pour cette vérité
        if (truth.intercalaryNotes?.trim()) {
            md += `**Notes:** ${truth.intercalaryNotes.trim()}\n\n`;
        }
        
        return md;
    }

    mdToSimpleHtml(md) {
        let html = md
            .replace(/^### (.*)$/gm, '<h3>$1</h3>')
            .replace(/^## (.*)$/gm, '<h2>$1</h2>')
            .replace(/^# (.*)$/gm, '<h1>$1</h1>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
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
    <title>Plan d'Homélie</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; margin: 2rem; }
        h1 { color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 0.5rem; }
        h2 { color: #3498db; margin-top: 2rem; }
        h3 { color: #2c3e50; margin-top: 1.5rem; }
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