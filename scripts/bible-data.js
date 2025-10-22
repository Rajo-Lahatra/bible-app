// Structure pour stocker les données bibliques
export const bibleData = {
    malagasy: {},
    french: {}
};

// Cache pour les chapitres français déjà chargés
const frenchChapterCache = {};

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

// Mapping des livres français vers malgache pour le PDF (Ancien Testament seulement)
export const frenchToMalagasyMapping = {
    // Ancien Testament
    "GENESE": "Genesisy", "EXODE": "Eksodosy", "LEVITIQUE": "Levitikosy", "NOMBRES": "Nomery",
    "DEUTERONOME": "Deotoronomia", "JOSUE": "Josoa", "JUGES": "Mpitsara", "RUTH": "Rota",
    "1 SAMUEL": "I Samoela", "2 SAMUEL": "II Samoela", "1 ROIS": "I Mpanjaka", "2 ROIS": "II Mpanjaka",
    "1 CHRONIQUES": "I Tantara", "2 CHRONIQUES": "II Tantara", "ESDRAS": "Ezra", "NEHEMIE": "Nehemia",
    "ESTHER": "Estera", "JOB": "Joba", "PSAUMES": "Salamo", "PROVERBES": "Ohabolana", "ECCLESIASTE": "Mpitoriteny",
    "CANTIQUE DES CANTIQUES": "Tonon-kiran'i Solomona", "ESAÏE": "Isaia", "JEREMIE": "Jeremia", "LAMENTATIONS": "Fitomaniana",
    "EZECHIEL": "Ezekiela", "DANIEL": "Daniela", "OSEE": "Hosea", "JOËL": "Joela", "AMOS": "Amosa",
    "ABDIAS": "Obadia", "JONAS": "Jona", "MICHEE": "Mika", "NAHUM": "Nahoma", "HABACUC": "Habakoka",
    "SOPHONIE": "Zefania", "AGGEE": "Hagay", "ZACHARIE": "Zakaria", "MALACHIE": "Malakia"
};

// Mapping des codes fichiers pour le Nouveau Testament seulement
export const newTestamentFileMapping = {
    // Nouveau Testament  
    "070_MAT": "Matio", "071_MRK": "Marka", "072_LUK": "Lioka", "073_JHN": "Jaona", "074_ACT": "Asan'ny Apostoly",
    "075_ROM": "Romana", "076_1CO": "I Korintiana", "077_2CO": "II Korintiana", "078_GAL": "Galatiana",
    "079_EPH": "Efesiana", "080_PHP": "Filipiana", "081_COL": "Kolosiana", "082_1TH": "I Tesaloniana",
    "083_2TH": "II Tesaloniana", "084_1TI": "I Timoty", "085_2TI": "II Timoty", "086_TIT": "Titosy",
    "087_PHM": "Filemona", "088_HEB": "Hebreo", "089_JAS": "Jakoba", "090_1PE": "I Petera", "091_2PE": "II Petera",
    "092_1JN": "I Jaona", "093_2JN": "II Jaona", "094_3JN": "III Jaona", "095_JUD": "Joda", "096_REV": "Apokalipsy"
};

// Liste des livres de l'Ancien Testament et du Nouveau Testament
const oldTestamentBooks = books.slice(0, 39);
const newTestamentBooks = books.slice(39);

// Initialiser les noms malgaches
books.forEach(book => {
    bookNames.malagasy[book] = book;
});

// Fonction principale d'initialisation - CHARGEMENT RAPIDE
export async function initializeApp() {
    console.log('Initialisation de l application...');
    await loadMalagasyBible();
    // Initialiser bibleData.french comme objet vide - chargement à la demande
    bibleData.french = {};
    populateBookSelect();
    populateChapterSelect('Matio');
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

// CHARGEMENT À LA DEMANDE DES CHAPITRES FRANÇAIS
async function loadFrenchChapterOnDemand(malagasyBook, chapter) {
    const cacheKey = `${malagasyBook}-${chapter}`;
    
    // Vérifier le cache d'abord
    if (frenchChapterCache[cacheKey]) {
        return frenchChapterCache[cacheKey];
    }
    
    // Déterminer si c'est l'Ancien ou le Nouveau Testament
    if (oldTestamentBooks.includes(malagasyBook)) {
        // Ancien Testament - utiliser le PDF
        const verses = await loadOldTestamentFromPDF(malagasyBook, chapter);
        frenchChapterCache[cacheKey] = verses;
        return verses;
    } else {
        // Nouveau Testament - utiliser les fichiers individuels
        const verses = await loadNewTestamentFromIndividualFile(malagasyBook, chapter);
        frenchChapterCache[cacheKey] = verses;
        return verses;
    }
}

// Charger l'Ancien Testament depuis le PDF texte
async function loadOldTestamentFromPDF(malagasyBook, chapter) {
    // Si le livre n'est pas encore chargé, charger tout l'Ancien Testament depuis le PDF
    if (!bibleData.french[malagasyBook] || !bibleData.french[malagasyBook][chapter]) {
        await loadOldTestamentFromPDFFile();
    }
    
    // Vérifier si le chapitre existe maintenant
    if (bibleData.french[malagasyBook] && bibleData.french[malagasyBook][chapter]) {
        return bibleData.french[malagasyBook][chapter];
    }
    
    // Fallback: générer des données mock
    return generateMockFrenchChapter(malagasyBook, chapter);
}

// Charger tout l'Ancien Testament depuis le fichier PDF texte
async function loadOldTestamentFromPDFFile() {
    try {
        console.log('Chargement de l\'Ancien Testament depuis le PDF...');
        
        const response = await fetch('/data/french-bible/bible-fr.txt');
        if (!response.ok) {
            throw new Error('Fichier PDF texte non trouvé');
        }
        
        const pdfText = await response.text();
        const parsedData = parsePDFText(pdfText);
        
        // Organiser les données dans bibleData.french pour l'Ancien Testament seulement
        for (const [frenchBookName, chapters] of Object.entries(parsedData)) {
            const malagasyBook = frenchToMalagasyMapping[frenchBookName];
            if (malagasyBook && oldTestamentBooks.includes(malagasyBook)) {
                if (!bibleData.french[malagasyBook]) {
                    bibleData.french[malagasyBook] = {};
                }
                // Fusionner les chapitres
                Object.assign(bibleData.french[malagasyBook], chapters);
                console.log(`✓ ${frenchBookName} -> ${malagasyBook}`);
            }
        }
        
        console.log('Ancien Testament chargé depuis PDF');
        
    } catch (error) {
        console.error('Erreur lors du chargement du PDF:', error);
    }
}

// Charger le Nouveau Testament depuis les fichiers individuels
async function loadNewTestamentFromIndividualFile(malagasyBook, chapter) {
    const fileCode = Object.keys(newTestamentFileMapping).find(
        code => newTestamentFileMapping[code] === malagasyBook
    );
    
    if (!fileCode) {
        return generateMockFrenchChapter(malagasyBook, chapter);
    }
    
    const chapterStr = chapter.toString().padStart(2, '0');
    const fileName = `frajnd_${fileCode}_${chapterStr}_read.txt`;
    const filePath = `/data/french-bible/${fileName}`;
    
    try {
        const response = await fetch(filePath);
        if (response.ok) {
            const text = await response.text();
            return parseFrenchBibleTextImproved(text, malagasyBook, chapter);
        } else {
            console.warn(`✗ Fichier non trouvé: ${fileName}`);
        }
    } catch (error) {
        console.warn(`✗ Erreur de chargement pour ${fileName}:`, error);
    }
    
    return generateMockFrenchChapter(malagasyBook, chapter);
}

// Parser pour le texte extrait du PDF
function parsePDFText(pdfText) {
    const books = {};
    const lines = pdfText.split('\n');
    
    let currentBook = null;
    let currentChapter = 0;
    let currentVerse = 0;
    let verseText = '';
    
    lines.forEach((line, index) => {
        line = line.trim();
        if (!line) return;
        
        // Détecter un nouveau livre (ligne en majuscules seule, sans chiffres)
        if (line === line.toUpperCase() && line.length > 3 && !line.match(/\d/) && !line.includes('...')) {
            // Sauvegarder le dernier verset du livre précédent
            if (currentBook && currentChapter > 0 && currentVerse > 0 && verseText) {
                if (!books[currentBook][currentChapter]) {
                    books[currentBook][currentChapter] = {};
                }
                books[currentBook][currentChapter][currentVerse] = verseText.trim();
                verseText = '';
            }
            
            currentBook = line;
            currentChapter = 0;
            currentVerse = 0;
            if (!books[currentBook]) {
                books[currentBook] = {};
            }
            console.log(`Nouveau livre détecté: ${currentBook}`);
            return;
        }
        
        // Détecter un nouveau chapitre (format: "GENESE 1" ou "EXODE 1")
        const chapterMatch = line.match(/^([A-ZÉÈÊÀÂÇÔÎÏËÜÆŒ]+)\s+(\d+)$/);
        if (chapterMatch && currentBook) {
            // Sauvegarder le dernier verset du chapitre précédent
            if (currentChapter > 0 && currentVerse > 0 && verseText) {
                books[currentBook][currentChapter][currentVerse] = verseText.trim();
                verseText = '';
            }
            
            currentChapter = parseInt(chapterMatch[2]);
            currentVerse = 0;
            if (!books[currentBook][currentChapter]) {
                books[currentBook][currentChapter] = {};
            }
            console.log(`  Chapitre ${currentChapter} de ${currentBook}`);
            return;
        }
        
        // Détecter un numéro de verset (format: "1.1", "1.2", etc.)
        const verseMatch = line.match(/^(\d+)\.(\d+)$/);
        if (verseMatch && currentBook && currentChapter > 0) {
            // Sauvegarder le verset précédent s'il y en a un
            if (currentVerse > 0 && verseText) {
                books[currentBook][currentChapter][currentVerse] = verseText.trim();
                verseText = '';
            }
            
            currentVerse = parseInt(verseMatch[2]);
            return;
        }
        
        // Si on a un livre, un chapitre et un verset en cours, ajouter le texte
        if (currentBook && currentChapter > 0 && currentVerse > 0 && line) {
            if (verseText) verseText += ' ';
            verseText += line;
        }
    });
    
    // Ne pas oublier le dernier verset
    if (currentBook && currentChapter > 0 && currentVerse > 0 && verseText) {
        if (!books[currentBook][currentChapter]) {
            books[currentBook][currentChapter] = {};
        }
        books[currentBook][currentChapter][currentVerse] = verseText.trim();
    }
    
    return books;
}

// Parser amélioré pour les fichiers texte individuels du Nouveau Testament
function parseFrenchBibleTextImproved(text, bookName, chapter) {
    const verses = {};
    const lines = text.split('\n').filter(line => line.trim());
    
    let currentVerse = 0;
    let currentText = '';
    
    lines.forEach(line => {
        line = line.trim();
        if (!line) return;
        
        // Ignorer les en-têtes
        if (isHeaderLine(line, bookName, chapter)) {
            return;
        }
        
        // Chercher des numéros de verset explicites
        const verseMatch = line.match(/^(\d+)[\.\s]/);
        if (verseMatch) {
            // Sauvegarder le verset précédent
            if (currentVerse > 0 && currentText) {
                verses[currentVerse] = currentText.trim();
            }
            
            currentVerse = parseInt(verseMatch[1]);
            currentText = line.substring(verseMatch[0].length).trim();
        } else if (currentVerse > 0) {
            // Continuer le verset en cours
            if (currentText) currentText += ' ';
            currentText += line;
        } else {
            // Commencer un nouveau verset (par défaut verset 1)
            currentVerse = 1;
            currentText = line;
        }
    });
    
    // Sauvegarder le dernier verset
    if (currentVerse > 0 && currentText) {
        verses[currentVerse] = currentText.trim();
    }
    
    console.log(`Parsé ${Object.keys(verses).length} versets pour ${bookName} ${chapter}`);
    return verses;
}

// FONCTIONS EXISTANTES

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

function isHeaderLine(line, bookName, chapter) {
    const frenchBookName = bookNames.french[bookName];
    if (line.toLowerCase().includes(frenchBookName.toLowerCase()) || 
        line.toLowerCase().includes(bookName.toLowerCase())) {
        return true;
    }
    if (line === chapter.toString() || line === `${chapter}.`) {
        return true;
    }
    if (line.length < 5 && /^\d+\.?$/.test(line)) {
        return true;
    }
    return false;
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

    bookSelect.addEventListener('change', (e) => {
        const selectedBook = e.target.value;
        if (selectedBook) {
            populateChapterSelect(selectedBook);
            loadVerses(selectedBook, 1);
        }
    });
}

export function populateChapterSelect(book, version = 'malagasy') {
    const chapterSelect = document.getElementById('chapter-select');
    if (!chapterSelect) return;
    
    chapterSelect.innerHTML = '<option value="">Chapitre</option>';
    
    const chapters = getChapters(book, version);
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

    chapterSelect.addEventListener('change', (e) => {
        const selectedChapter = parseInt(e.target.value);
        if (selectedChapter && book) {
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
    displayAlignedVerses(malagasyVersion, malagasyVerses, frenchVerses, book, chapter);
    displayAlignedVerses(frenchVersion, frenchVerses, malagasyVerses, book, chapter);
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
    const malagasyContainer = document.getElementById('malagasy-verses');
    const frenchContainer = document.getElementById('french-verses');
    if (!malagasyContainer || !frenchContainer) return;

    let isScrolling = false;
    function handleScroll(source, target) {
        if (isScrolling) return;
        isScrolling = true;
        const scrollPercentage = source.scrollTop / (source.scrollHeight - source.clientHeight);
        target.scrollTop = scrollPercentage * (target.scrollHeight - target.clientHeight);
        setTimeout(() => { isScrolling = false; }, 100);
    }

    malagasyContainer.addEventListener('scroll', () => handleScroll(malagasyContainer, frenchContainer));
    frenchContainer.addEventListener('scroll', () => handleScroll(frenchContainer, malagasyContainer));
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM chargé - initialisation de l application');
    initializeApp();
});