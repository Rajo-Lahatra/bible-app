// Structure pour stocker les données bibliques
export const bibleData = {
    malagasy: {},
    french: {}
};

// Cache pour les chapitres français déjà chargés
const frenchChapterCache = {};
let isFrenchBibleLoaded = false;

// Variable pour suivre le mode d'affichage actuel
let currentDisplayMode = 'both'; // 'malagasy-only', 'french-only', 'both'

// Fonction pour changer le mode d'affichage
export function setDisplayMode(mode) {
    currentDisplayMode = mode;
    console.log(`Mode d'affichage changé: ${mode}`);
    
    // Mettre à jour l'interface
    updateDisplayModeUI();
    
    // Recharger les versets si un livre et chapitre sont sélectionnés
    if (currentSelectedBook && document.getElementById('chapter-select').value) {
        const chapter = parseInt(document.getElementById('chapter-select').value);
        loadVerses(currentSelectedBook, chapter);
    }
}

// Fonction pour obtenir le mode d'affichage actuel
export function getDisplayMode() {
    return currentDisplayMode;
}

// Mettre à jour l'interface utilisateur pour le mode d'affichage
function updateDisplayModeUI() {
    const bibleContainer = document.querySelector('.bible-container');
    const malagasyColumn = document.getElementById('malagasy-column');
    const frenchColumn = document.getElementById('french-column');
    const modeButtons = document.querySelectorAll('.display-mode-btn');
    
    if (!bibleContainer || !malagasyColumn || !frenchColumn) return;
    
    // Mettre à jour les boutons actifs
    modeButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.mode === currentDisplayMode);
    });
    
    // Mettre à jour l'affichage des colonnes
    switch (currentDisplayMode) {
        case 'malagasy-only':
            bibleContainer.classList.add('single-column');
            malagasyColumn.classList.add('active');
            malagasyColumn.classList.remove('hidden');
            frenchColumn.classList.remove('active');
            frenchColumn.classList.add('hidden');
            break;
            
        case 'french-only':
            bibleContainer.classList.add('single-column');
            frenchColumn.classList.add('active');
            frenchColumn.classList.remove('hidden');
            malagasyColumn.classList.remove('active');
            malagasyColumn.classList.add('hidden');
            break;
            
        case 'both':
            bibleContainer.classList.remove('single-column');
            malagasyColumn.classList.remove('hidden', 'active');
            frenchColumn.classList.remove('hidden', 'active');
            break;
    }
}

// Liste complète des livres de la Bible en malgache
export const books = [
    // Ancien Testament
    "Genesisy", "Eksodosy", "Levitikosy", "Nomery", "Deotoronomia", "Josoa", "Mpitsara", "Rota",
    "I Samoela", "II Samoela", "I Mpanjaka", "II Mpanjaka", "I Tantara", "II Tantara", "Ezra", "Nehemia",
    "Estera", "Joba", "Salamo", "Ohabolana", "Mpitoriteny", "Tonon-kiran'i Solomona", "Isaia", "Jeremia",
    "Fitomaniana", "Ezekiela", "Daniela", "Hosea", "Joela", "Amosa", "Obadia", "Jona", "Mika", "Nahoma",
    "Habakoka", "Zefania", "Hagay", "Zakaria", "Malakia",
    
    // Nouveau Testament
    "Matio", "Marka", "Lioka", "Jaona", "Asan'ny Apostoly", "Romana", "I Korintiana", "II Korintiana",
    "Galatiana", "Efesiana", "Filipiana", "Kolosiana", "I Tesaloniana", "II Tesaloniana", "I Timoty",
    "II Timoty", "Titosy", "Filemona", "Hebreo", "Jakoba", "I Petera", "II Petera", "I Jaona", "II Jaona",
    "III Jaona", "Joda", "Apokalipsy"
];

// Mapping des livres
export const bookNames = {
    malagasy: {},
    french: {
        // Ancien Testament
        "Genesisy": "Genèse", "Eksodosy": "Exode", "Levitikosy": "Lévitique", "Nomery": "Nombres",
        "Deotoronomia": "Deutéronome", "Josoa": "Josué", "Mpitsara": "Juges", "Rota": "Ruth",
        "I Samoela": "1 Samuel", "II Samoela": "2 Samuel", "I Mpanjaka": "1 Rois", "II Mpanjaka": "2 Rois",
        "I Tantara": "1 Chroniques", "II Tantara": "2 Chroniques", "Ezra": "Esdras", "Nehemia": "Néhémie",
        "Estera": "Esther", "Joba": "Job", "Salamo": "Psaumes", "Ohabolana": "Proverbes", "Mpitoriteny": "Ecclésiaste",
        "Tonon-kiran'i Solomona": "Cantique des Cantiques", "Isaia": "Ésaïe", "Jeremia": "Jérémie", "Fitomaniana": "Lamentations",
        "Ezekiela": "Ézéchiel", "Daniela": "Daniel", "Hosea": "Osée", "Joela": "Joël", "Amosa": "Amos",
        "Obadia": "Abdias", "Jona": "Jonas", "Mika": "Michée", "Nahoma": "Nahum", "Habakoka": "Habacuc",
        "Zefania": "Sophonie", "Hagay": "Aggée", "Zakaria": "Zacharie", "Malakia": "Malachie",
        
        // Nouveau Testament
        "Matio": "Matthieu", "Marka": "Marc", "Lioka": "Luc", "Jaona": "Jean", "Asan'ny Apostoly": "Actes",
        "Romana": "Romains", "I Korintiana": "1 Corinthiens", "II Korintiana": "2 Corinthiens", "Galatiana": "Galates",
        "Efesiana": "Éphésiens", "Filipiana": "Philippiens", "Kolosiana": "Colossiens", "I Tesaloniana": "1 Thessaloniciens",
        "II Tesaloniana": "2 Thessaloniciens", "I Timoty": "1 Timothée", "II Timoty": "2 Timothée", "Titosy": "Tite",
        "Filemona": "Philémon", "Hebreo": "Hébreux", "Jakoba": "Jacques", "I Petera": "1 Pierre", "II Petera": "2 Pierre",
        "I Jaona": "1 Jean", "II Jaona": "2 Jean", "III Jaona": "3 Jean", "Joda": "Jude", "Apokalipsy": "Apocalypse"
    }
};

// Mapping complet des livres français vers malgache
export const frenchToMalagasyMapping = {
    // Ancien Testament
    "GENESE": "Genesisy", "GENÈSE": "Genesisy", "Genèse": "Genesisy",
    "EXODE": "Eksodosy", "Exode": "Eksodosy",
    "LEVITIQUE": "Levitikosy", "Lévitique": "Levitikosy",
    "NOMBRES": "Nomery", "Nombres": "Nomery",
    "DEUTERONOME": "Deotoronomia", "Deutéronome": "Deotoronomia",
    "JOSUE": "Josoa", "JOSUÉ": "Josoa", "Josué": "Josoa",
    "JUGES": "Mpitsara", "Juges": "Mpitsara",
    "RUTH": "Rota", "Ruth": "Rota",
    "1 SAMUEL": "I Samoela", "1ER SAMUEL": "I Samoela", "PREMIER SAMUEL": "I Samoela", "1 Samuel": "I Samoela",
    "2 SAMUEL": "II Samoela", "2EME SAMUEL": "II Samoela", "DEUXIEME SAMUEL": "II Samoela", "2 Samuel": "II Samoela",
    "1 ROIS": "I Mpanjaka", "1ER ROIS": "I Mpanjaka", "PREMIER ROIS": "I Mpanjaka", "1 Rois": "I Mpanjaka",
    "2 ROIS": "II Mpanjaka", "2EME ROIS": "II Mpanjaka", "DEUXIEME ROIS": "II Mpanjaka", "2 Rois": "II Mpanjaka",
    "1 CHRONIQUES": "I Tantara", "1ER CHRONIQUES": "I Tantara", "PREMIER CHRONIQUES": "I Tantara", "1 Chroniques": "I Tantara",
    "2 CHRONIQUES": "II Tantara", "2EME CHRONIQUES": "II Tantara", "DEUXIEME CHRONIQUES": "II Tantara", "2 Chroniques": "II Tantara",
    "ESDRAS": "Ezra", "Esdras": "Ezra",
    "NEHEMIE": "Nehemia", "NÉHÉMIE": "Nehemia", "Néhémie": "Nehemia",
    "ESTHER": "Estera", "Esther": "Estera",
    "JOB": "Joba", "Job": "Joba",
    "PSAUMES": "Salamo", "Psaumes": "Salamo", "Psaume": "Salamo", // Ajout de "Psaume" au singulier
    "PROVERBES": "Ohabolana", "Proverbes": "Ohabolana",
    "ECCLESIASTE": "Mpitoriteny", "ECCLÉSIASTE": "Mpitoriteny", "Ecclésiaste": "Mpitoriteny",
    "CANTIQUE DES CANTIQUES": "Tonon-kiran'i Solomona", "Cantique des Cantiques": "Tonon-kiran'i Solomona",
    "ESAIE": "Isaia", "ÉSAÏE": "Isaia", "Ésaïe": "Isaia",
    "JEREMIE": "Jeremia", "JÉRÉMIE": "Jeremia", "Jérémie": "Jeremia",
    "LAMENTATIONS": "Fitomaniana", "Lamentations": "Fitomaniana",
    "EZECHIEL": "Ezekiela", "ÉZÉCHIEL": "Ezekiela", "Ézéchiel": "Ezekiela",
    "DANIEL": "Daniela", "Daniel": "Daniela",
    "OSEE": "Hosea", "OSÉE": "Hosea", "Osée": "Hosea",
    "JOEL": "Joela", "JOËL": "Joela", "Joël": "Joela",
    "AMOS": "Amosa", "Amos": "Amosa",
    "ABDIAS": "Obadia", "Abdias": "Obadia",
    "JONAS": "Jona", "Jonas": "Jona",
    "MICHEE": "Mika", "MICHEÉ": "Mika", "Michée": "Mika",
    "NAHUM": "Nahoma", "Nahum": "Nahoma",
    "HABACUC": "Habakoka", "HABAKUK": "Habakoka", "Habacuc": "Habakoka",
    "SOPHONIE": "Zefania", "Sophonie": "Zefania",
    "AGGEE": "Hagay", "AGGÉE": "Hagay", "Aggée": "Hagay",
    "ZACHARIE": "Zakaria", "Zacharie": "Zakaria",
    "MALACHIE": "Malakia", "MALACHI": "Malakia", "Malachie": "Malakia",
    
    // Nouveau Testament
    "MATTHIEU": "Matio", "Matthieu": "Matio",
    "MARC": "Marka", "Marc": "Marka",
    "LUC": "Lioka", "Luc": "Lioka",
    "JEAN": "Jaona", "Jean": "Jaona",
    "ACTES": "Asan'ny Apostoly", "Actes": "Asan'ny Apostoly",
    "ROMAINS": "Romana", "Romains": "Romana",
    "1 CORINTHIENS": "I Korintiana", "1ER CORINTHIENS": "I Korintiana", "1 Corinthiens": "I Korintiana",
    "2 CORINTHIENS": "II Korintiana", "2EME CORINTHIENS": "II Korintiana", "2 Corinthiens": "II Korintiana",
    "GALATES": "Galatiana", "Galates": "Galatiana",
    "EPHESIENS": "Efesiana", "ÉPHÉSIENS": "Efesiana", "Éphésiens": "Efesiana",
    "PHILIPPIENS": "Filipiana", "Philippiens": "Filipiana",
    "COLOSSIENS": "Kolosiana", "Colossiens": "Kolosiana",
    "1 THESSALONICIENS": "I Tesaloniana", "1ER THESSALONICIENS": "I Tesaloniana", "1 Thessaloniciens": "I Tesaloniana",
    "2 THESSALONICIENS": "II Tesaloniana", "2EME THESSALONICIENS": "II Tesaloniana", "2 Thessaloniciens": "II Tesaloniana",
    "1 TIMOTHEE": "I Timoty", "1 TIMOTHÉE": "I Timoty", "1 Timothée": "I Timoty",
    "2 TIMOTHEE": "II Timoty", "2 TIMOTHÉE": "II Timoty", "2 Timothée": "II Timoty",
    "TITE": "Titosy", "Tite": "Titosy",
    "PHILEMON": "Filemona", "PHILÉMON": "Filemona", "Philémon": "Filemona",
    "HEBREUX": "Hebreo", "Hébreux": "Hebreo",
    "JACQUES": "Jakoba", "Jacques": "Jakoba",
    "1 PIERRE": "I Petera", "1ER PIERRE": "I Petera", "1 Pierre": "I Petera",
    "2 PIERRE": "II Petera", "2EME PIERRE": "II Petera", "2 Pierre": "II Petera",
    "1 JEAN": "I Jaona", "1ER JEAN": "I Jaona", "1 Jean": "I Jaona",
    "2 JEAN": "II Jaona", "2EME JEAN": "II Jaona", "2 Jean": "II Jaona",
    "3 JEAN": "III Jaona", "3EME JEAN": "III Jaona", "3 Jean": "III Jaona",
    "JUDE": "Joda", "Jude": "Joda",
    "APOCALYPSE": "Apokalipsy", "Apocalypse": "Apokalipsy"
};

// Liste des livres de l'Ancien Testament et du Nouveau Testament
const oldTestamentBooks = books.slice(0, 39);
const newTestamentBooks = books.slice(39);

// Initialiser les noms malgaches
books.forEach(book => {
    bookNames.malagasy[book] = book;
});

// Variable pour suivre le livre actuellement sélectionné
let currentSelectedBook = 'Matio';

// Fonction principale d'initialisation
export async function initializeApp() {
    console.log('Initialisation de l application...');
    await loadMalagasyBible();
    // Initialiser bibleData.french comme objet vide - chargement à la demande
    bibleData.french = {};
    
    // Charger la Bible française en arrière-plan
    loadFrenchBibleFromFile();
    
    populateBookSelect();
    populateChapterSelect(currentSelectedBook);
    
    // Initialiser l'affichage du mode
    updateDisplayModeUI();
}

// Charger la Bible française depuis le fichier unique
async function loadFrenchBibleFromFile() {
    try {
        console.log('Début du chargement de la Bible française depuis le fichier...');
        
        const response = await fetch('/data/french-bible/bible-fr.txt');
        if (!response.ok) {
            throw new Error(`Fichier Bible française non trouvé: ${response.status} ${response.statusText}`);
        }
        
        const bibleText = await response.text();
        console.log(`Fichier Bible française chargé, taille: ${bibleText.length} caractères`);
        
        const parsedData = parseFrenchBibleText(bibleText);
        console.log('Données parsées:', Object.keys(parsedData));
        
        // Organiser les données dans bibleData.french pour tous les livres
        let loadedBooks = 0;
        for (const [frenchBookName, chapters] of Object.entries(parsedData)) {
            const malagasyBook = frenchToMalagasyMapping[frenchBookName];
            if (malagasyBook) {
                if (!bibleData.french[malagasyBook]) {
                    bibleData.french[malagasyBook] = {};
                }
                // Fusionner les chapitres
                Object.assign(bibleData.french[malagasyBook], chapters);
                loadedBooks++;
                console.log(`✓ ${frenchBookName} -> ${malagasyBook} (${Object.keys(chapters).length} chapitres, ${Object.values(chapters).reduce((acc, chap) => acc + Object.keys(chap).length, 0)} versets)`);
            } else {
                console.log(`⚠ Livre non mappé: ${frenchBookName}`);
            }
        }
        
        console.log(`Bible française chargée: ${loadedBooks} livres`);
        isFrenchBibleLoaded = true;
        
    } catch (error) {
        console.error('Erreur lors du chargement de la Bible française:', error);
        isFrenchBibleLoaded = false;
    }
}

// NOUVEAU PARSER POUR LE FORMAT DE FICHIER FRANÇAIS - VERSION CORRIGÉE POUR PSAUMES
function parseFrenchBibleText(text) {
    const books = {};
    const lines = text.split('\n');
    
    let currentBook = null;
    let currentChapter = null;
    let currentVerse = null;
    let currentText = '';
    let inVerse = false;
    
    console.log(`Début du parsing Bible française, ${lines.length} lignes`);

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i].trim();
        if (!line) continue;

        // Détection des livres (lignes qui contiennent seulement le nom du livre)
        const bookMatch = detectBookName(line);
        if (bookMatch) {
            // Sauvegarder le verset précédent si on en a un
            if (currentBook && currentChapter !== null && currentVerse !== null && currentText) {
                saveVerse(books, currentBook, currentChapter, currentVerse, currentText);
                currentText = '';
            }
            
            currentBook = bookMatch;
            currentChapter = null;
            currentVerse = null;
            inVerse = false;
            if (!books[currentBook]) {
                books[currentBook] = {};
            }
            console.log(`📖 Livre détecté: "${line}" -> "${currentBook}"`);
            continue;
        }

        // Détection des chapitres (format: "Chapitre X" ou "Psaume X" pour le livre des Psaumes)
        let chapterMatch = line.match(/^Chapitre\s+(\d+)/i);
        if (!chapterMatch) {
            // Cas spécial pour les Psaumes : "Psaume X"
            chapterMatch = line.match(/^Psaume\s+(\d+)/i);
        }
        if (chapterMatch) {
            // Sauvegarder le verset précédent si on en a un
            if (currentBook && currentChapter !== null && currentVerse !== null && currentText) {
                saveVerse(books, currentBook, currentChapter, currentVerse, currentText);
                currentText = '';
            }
            
            currentChapter = parseInt(chapterMatch[1]);
            currentVerse = null;
            inVerse = false;
            if (!books[currentBook][currentChapter]) {
                books[currentBook][currentChapter] = {};
            }
            console.log(`   📑 Chapitre ${currentChapter} de ${currentBook}`);
            continue;
        }

        // Détection des versets (format: "X ¶ Texte" ou "X Texte")
        const verseMatch = line.match(/^(\d+)\s*(¶)?\s*(.*)$/);
        if (verseMatch && currentBook && currentChapter !== null) {
            // Sauvegarder le verset précédent si on en a un
            if (currentVerse !== null && currentText) {
                saveVerse(books, currentBook, currentChapter, currentVerse, currentText);
                currentText = '';
            }
            
            currentVerse = parseInt(verseMatch[1]);
            currentText = verseMatch[3].trim();
            inVerse = true;
            continue;
        }

        // Si on est dans un verset et que la ligne ne commence pas par un numéro, on l'ajoute au texte du verset en cours
        if (inVerse && currentBook && currentChapter !== null && currentVerse !== null && line) {
            // Ignorer les lignes de séparation
            if (line.match(/^[-=*_]+$/)) continue;
            
            if (currentText) currentText += ' ';
            currentText += line;
        }
    }

    // Sauvegarder le dernier verset
    if (currentBook && currentChapter !== null && currentVerse !== null && currentText) {
        saveVerse(books, currentBook, currentChapter, currentVerse, currentText);
    }

    console.log(`Parsing terminé: ${Object.keys(books).length} livres trouvés`);
    return books;
}

// Fonction pour détecter les noms de livres dans le nouveau format
function detectBookName(line) {
    // Normaliser la ligne
    const normalizedLine = normalizeBookName(line);
    
    // Vérifier chaque nom de livre dans le mapping
    for (const [frenchName, malagasyName] of Object.entries(frenchToMalagasyMapping)) {
        const normalizedFrench = normalizeBookName(frenchName);
        if (normalizedLine === normalizedFrench) {
            return frenchName; // Retourner le nom français original
        }
    }
    
    return null;
}

// Fonction utilitaire pour sauvegarder un verset
function saveVerse(books, book, chapter, verse, text) {
    if (!books[book][chapter]) {
        books[book][chapter] = {};
    }
    // Nettoyer le texte des espaces superflus
    books[book][chapter][verse] = text.replace(/\s+/g, ' ').trim();
}

// Fonction utilitaire pour normaliser les noms de livres
function normalizeBookName(name) {
    return name
        .toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Enlever les accents
        .replace(/\s+/g, ' ') // Normaliser les espaces
        .replace(/[^a-z0-9\s]/g, '') // Enlever la ponctuation
        .trim();
}

// CHARGEMENT À LA DEMANDE DES CHAPITRES FRANÇAIS
async function loadFrenchChapterOnDemand(malagasyBook, chapter) {
    const cacheKey = `${malagasyBook}-${chapter}`;
    
    // Vérifier le cache d'abord
    if (frenchChapterCache[cacheKey]) {
        return frenchChapterCache[cacheKey];
    }
    
    // Si la Bible française n'a pas encore été chargée, attendre un peu
    if (!isFrenchBibleLoaded) {
        console.log('Bible française pas encore chargée, chargement immédiat...');
        // On pourrait implémenter une attente ici si nécessaire
    }
    
    // Vérifier si le chapitre existe dans bibleData.french
    if (bibleData.french[malagasyBook] && bibleData.french[malagasyBook][chapter]) {
        console.log(`✓ Chapitre trouvé: ${malagasyBook} ${chapter}`);
        frenchChapterCache[cacheKey] = bibleData.french[malagasyBook][chapter];
        return bibleData.french[malagasyBook][chapter];
    }
    
    console.log(`✗ Chapitre non trouvé: ${malagasyBook} ${chapter}`);
    // Fallback: générer des données mock
    return generateMockFrenchChapter(malagasyBook, chapter);
}

async function loadMalagasyBible() {
    try {
        console.log('Début du chargement de la Bible malgache...');
        
        for (const book of books) {
            const fileName = `${book}.txt`;
            const filePath = `/data/malagasy-bible/${fileName}`;
            
            try {
                const response = await fetch(filePath);
                
                if (response.ok) {
                    const text = await response.text();
                    
                    let parsedData;
                    
                    // Utiliser le parser spécial pour les livres problématiques
                    if (["II Jaona", "III Jaona", "Joda"].includes(book)) {
                        parsedData = parseProblematicBooks(text, book);
                    } else {
                        parsedData = parseBibleText(text, book);
                    }
                    
                    bibleData.malagasy[book] = parsedData;
                    
                    console.log(`✓ ${book} analysé: ${Object.keys(parsedData).length} chapitres`);
                    
                } else {
                    console.warn(`✗ Fichier non trouvé: ${fileName}`);
                    bibleData.malagasy[book] = generateMockChapters(book);
                }
            } catch (error) {
                console.error(`✗ Erreur avec ${fileName}:`, error);
                bibleData.malagasy[book] = generateMockChapters(book);
            }
        }
        
        console.log('Chargement de la Bible malgache terminé');
        
    } catch (error) {
        console.error('Erreur lors du chargement de la Bible malgache:', error);
    }
}

// FONCTIONS EXISTANTES (inchangées)

function parseBibleText(text, bookName) {
    const chapters = {};
    const lines = text.split('\n');
    
    lines.forEach((line, index) => {
        line = line.trim();
        if (!line) return;

        const verseMatch = line.match(/«\s*(.*?)\s*»\s*\(([^)]+)\)/);
        if (verseMatch) {
            const verseText = verseMatch[1].trim();
            const reference = verseMatch[2];
            
            const refMatch = reference.match(/(\d+):(\d+)/);
            if (refMatch) {
                const chapter = parseInt(refMatch[1]);
                const verse = parseInt(refMatch[2]);
                
                if (!chapters[chapter]) {
                    chapters[chapter] = {};
                }
                
                if (verseText) {
                    chapters[chapter][verse] = verseText;
                }
            }
        }
    });

    return chapters;
}

function parseProblematicBooks(text, bookName) {
    const chapters = { 1: {} };
    const lines = text.split('\n').filter(line => line.trim());
    
    lines.forEach((line, index) => {
        const textMatch = line.match(/«(.*?)»/);
        if (textMatch) {
            const verseText = textMatch[1].trim();
            const refMatch = line.match(/\(.*?(\d+)\)/);
            const verse = refMatch ? parseInt(refMatch[1]) : index + 1;
            chapters[1][verse] = verseText;
        } else {
            const cleanLine = line.split('(')[0].trim();
            if (cleanLine) {
                chapters[1][index + 1] = cleanLine;
            }
        }
    });

    return chapters;
}

function generateMockChapters(book) {
    const chapters = {};
    const chapterCount = getRealisticChapterCounts(book);
    for (let i = 1; i <= chapterCount; i++) {
        chapters[i] = {};
        const verseCount = getRealisticVerseCount(book, i);
        for (let j = 1; j <= verseCount; j++) {
            chapters[i][j] = `Texte malgache de ${book} ${i}:${j}`;
        }
    }
    return chapters;
}

function generateMockFrenchChapter(book, chapter) {
    const verses = {};
    const frenchBookName = bookNames.french[book];
    const verseCount = getRealisticVerseCount(book, chapter);
    for (let j = 1; j <= verseCount; j++) {
        verses[j] = `[Version française en attente] ${frenchBookName} ${chapter}:${j}`;
    }
    return verses;
}

function getRealisticChapterCounts(book) {
    const counts = {
        "Genesisy": 50, "Eksodosy": 40, "Levitikosy": 27, "Nomery": 36, "Deotoronomia": 34,
        "Josoa": 24, "Mpitsara": 21, "Rota": 4, "I Samoela": 31, "II Samoela": 24,
        "I Mpanjaka": 22, "II Mpanjaka": 25, "I Tantara": 29, "II Tantara": 36, "Ezra": 10,
        "Nehemia": 13, "Estera": 10, "Joba": 42, "Salamo": 150, "Ohabolana": 31,
        "Mpitoriteny": 12, "Tonon-kiran'i Solomona": 8, "Isaia": 66, "Jeremia": 52,
        "Fitomaniana": 5, "Ezekiela": 48, "Daniela": 12, "Hosea": 14, "Joela": 3,
        "Amosa": 9, "Obadia": 1, "Jona": 4, "Mika": 7, "Nahoma": 3, "Habakoka": 3,
        "Zefania": 3, "Hagay": 2, "Zakaria": 14, "Malakia": 4,
        "Matio": 28, "Marka": 16, "Lioka": 24, "Jaona": 21, "Asan'ny Apostoly": 28,
        "Romana": 16, "I Korintiana": 16, "II Korintiana": 13, "Galatiana": 6,
        "Efesiana": 6, "Filipiana": 4, "Kolosiana": 4, "I Tesaloniana": 5,
        "II Tesaloniana": 3, "I Timoty": 6, "II Timoty": 4, "Titosy": 3,
        "Filemona": 1, "Hebreo": 13, "Jakoba": 5, "I Petera": 5, "II Petera": 3,
        "I Jaona": 5, "II Jaona": 1, "III Jaona": 1, "Joda": 1, "Apokalipsy": 22
    };
    return counts[book] || 10;
}

function getRealisticVerseCount(book, chapter) {
    return 30;
}

// FONCTIONS D'AFFICHAGE
export function populateBookSelect() {
    const bookSelect = document.getElementById('book-select');
    if (!bookSelect) return;
    
    bookSelect.innerHTML = '<option value="">Choisir un livre</option>';
    
    const oldTestament = books.slice(0, 39);
    const newTestament = books.slice(39);
    
    const oldTestamentGroup = document.createElement('optgroup');
    oldTestamentGroup.label = 'Ancien Testament';
    const newTestamentGroup = document.createElement('optgroup');
    newTestamentGroup.label = 'Nouveau Testament';
    
    oldTestament.forEach(book => {
        const option = document.createElement('option');
        option.value = book;
        option.textContent = `${bookNames.french[book]} (${book})`;
        oldTestamentGroup.appendChild(option);
    });
    
    newTestament.forEach(book => {
        const option = document.createElement('option');
        option.value = book;
        option.textContent = `${bookNames.french[book]} (${book})`;
        newTestamentGroup.appendChild(option);
    });
    
    bookSelect.appendChild(oldTestamentGroup);
    bookSelect.appendChild(newTestamentGroup);

    // Sélectionner le livre courant
    if (currentSelectedBook) {
        bookSelect.value = currentSelectedBook;
    }

    bookSelect.addEventListener('change', (e) => {
        const selectedBook = e.target.value;
        if (selectedBook) {
            currentSelectedBook = selectedBook;
            populateChapterSelect(selectedBook);
            loadVerses(selectedBook, 1);
        }
    });
}

export function populateChapterSelect(book) {
    const chapterSelect = document.getElementById('chapter-select');
    if (!chapterSelect) return;
    
    chapterSelect.innerHTML = '<option value="">Chapitre</option>';
    
    const chapters = getChapters(book, 'malagasy');
    if (chapters.length === 0) {
        const option = document.createElement('option');
        option.value = 1;
        option.textContent = "Chapitre 1";
        chapterSelect.appendChild(option);
    } else {
        chapters.forEach(chapter => {
            const option = document.createElement('option');
            option.value = chapter;
            option.textContent = `Chapitre ${chapter}`;
            chapterSelect.appendChild(option);
        });
    }

    // Réinitialiser l'événement pour éviter les cumuls
    chapterSelect.onchange = null;
    chapterSelect.addEventListener('change', (e) => {
        const selectedChapter = parseInt(e.target.value);
        if (selectedChapter && book) {
            console.log(`Changement de chapitre: ${book} chapitre ${selectedChapter}`);
            loadVerses(book, selectedChapter);
        }
    });
}

export function getChapters(book, version = 'malagasy') {
    if (bibleData[version] && bibleData[version][book]) {
        const chapters = Object.keys(bibleData[version][book]).map(Number);
        return chapters.sort((a, b) => a - b);
    }
    return [];
}

export function getVerses(book, chapter, version = 'malagasy') {
    if (bibleData[version] && bibleData[version][book] && bibleData[version][book][chapter]) {
        return bibleData[version][book][chapter];
    }
    return {};
}

// FONCTION PRINCIPALE DE CHARGEMENT DES VERSETS
export async function loadVerses(book, chapter) {
    if (!book || !chapter) return;

    console.log(`Chargement des versets: ${book} chapitre ${chapter}`);

    // Mettre à jour le livre courant
    currentSelectedBook = book;

    // Charger les versets malgaches
    const malagasyVerses = getVerses(book, chapter, 'malagasy');

    // Charger les versets français À LA DEMANDE
    let frenchVerses = getVerses(book, chapter, 'french');
    
    if (!frenchVerses || Object.keys(frenchVerses).length === 0) {
        frenchVerses = await loadFrenchChapterOnDemand(book, chapter);
        
        // Stocker les versets chargés
        if (!bibleData.french[book]) {
            bibleData.french[book] = {};
        }
        bibleData.french[book][chapter] = frenchVerses;
    }

    // Afficher les versets avec alignement
    displayVersesWithAlignment('malagasy', malagasyVerses, 'french', frenchVerses, book, chapter);
    
    setTimeout(syncScroll, 100);
}

// AFFICHAGE AVEC ALIGNEMENT DES VERSETS
function displayVersesWithAlignment(malagasyVersion, malagasyVerses, frenchVersion, frenchVerses, book, chapter) {
    // Mettre à jour la visibilité des conteneurs
    updateDisplayModeUI();
    
    // Afficher seulement les versions nécessaires
    if (currentDisplayMode === 'malagasy-only' || currentDisplayMode === 'both') {
        displayAlignedVerses(malagasyVersion, malagasyVerses, frenchVerses, book, chapter);
    }
    
    if (currentDisplayMode === 'french-only' || currentDisplayMode === 'both') {
        displayAlignedVerses(frenchVersion, frenchVerses, malagasyVerses, book, chapter);
    }
}

function displayAlignedVerses(version, verses, otherVerses, book, chapter) {
    const containerId = `${version}-verses`;
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = '';

    const bookName = bookNames[version][book];

    const titleElement = document.createElement('h4');
    titleElement.className = 'chapter-title';
    titleElement.textContent = `${bookName} - Chapitre ${chapter}`;
    container.appendChild(titleElement);

    // Obtenir tous les numéros de versets pour l'alignement
    const allVerseNumbers = getAllPossibleVerseNumbers(verses, otherVerses);
    
    allVerseNumbers.forEach(verseNumber => {
        const verseElement = document.createElement('div');
        verseElement.className = 'verse';
        verseElement.dataset.verseId = `${book}-${chapter}-${verseNumber}`;
        verseElement.dataset.version = version;

        const verseText = verses[verseNumber] || '[Verset non disponible]';
        
        const verseContent = `
            <span class="verse-number">${verseNumber}</span>
            <span class="verse-text">${verseText}</span>
        `;

        verseElement.innerHTML = verseContent;
        container.appendChild(verseElement);
    });
    
    console.log(`Affiché ${allVerseNumbers.length} versets pour ${book} ${chapter} (${version})`);
}

function getAllPossibleVerseNumbers(verses1, verses2) {
    const verseNumbers1 = Object.keys(verses1).map(Number);
    const verseNumbers2 = Object.keys(verses2).map(Number);
    const allVerseNumbers = [...new Set([...verseNumbers1, ...verseNumbers2])];
    return allVerseNumbers.sort((a, b) => a - b);
}

function syncScroll() {
    if (currentDisplayMode !== 'both') return;
    
    const malagasyContainer = document.getElementById('malagasy-verses');
    const frenchContainer = document.getElementById('french-verses');
    if (!malagasyContainer || !frenchContainer) return;

    let isScrolling = false;
    
    function handleScroll(source, target) {
        if (isScrolling || !target) return;
        isScrolling = true;
        const scrollPercentage = source.scrollTop / (source.scrollHeight - source.clientHeight);
        target.scrollTop = scrollPercentage * (target.scrollHeight - target.clientHeight);
        setTimeout(() => { isScrolling = false; }, 100);
    }

    // Nettoyer les écouteurs existants
    malagasyContainer.removeEventListener('scroll', malagasyContainer._scrollHandler);
    frenchContainer.removeEventListener('scroll', frenchContainer._scrollHandler);
    
    // Ajouter les nouveaux écouteurs
    malagasyContainer._scrollHandler = () => handleScroll(malagasyContainer, frenchContainer);
    frenchContainer._scrollHandler = () => handleScroll(frenchContainer, malagasyContainer);
    
    malagasyContainer.addEventListener('scroll', malagasyContainer._scrollHandler);
    frenchContainer.addEventListener('scroll', frenchContainer._scrollHandler);
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM chargé - initialisation de l application');
    initializeApp();
});