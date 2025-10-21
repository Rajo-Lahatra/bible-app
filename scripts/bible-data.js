// Structure pour stocker les données bibliques
export const bibleData = {
    malagasy: {},
    french: {}
};

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

// Mapping complet des codes français vers les noms malgaches basé sur les fichiers
export const frenchFileMapping = {
    // Ancien Testament
    "002_GEN": "Genesisy",
    "003_EXO": "Eksodosy", 
    "004_LEV": "Levitikosy",
    "005_NUM": "Nomery",
    "006_DEU": "Deotoronomia",
    "007_JOS": "Josoa",
    "008_JDG": "Mpitsara",
    "009_RUT": "Rota",
    "010_1SA": "I Samoela",
    "011_2SA": "II Samoela",
    "012_1KI": "I Mpanjaka",
    "013_2KI": "II Mpanjaka",
    "014_1CH": "I Tantara",
    "015_2CH": "II Tantara",
    "016_EZR": "Ezra",
    "017_NEH": "Nehemia",
    "018_EST": "Estera",
    "019_JOB": "Joba",
    "020_PSA": "Salamo",
    "021_PRO": "Ohabolana",
    "022_ECC": "Mpitoriteny",
    "023_SNG": "Tonon-kiran'i Solomona",
    "024_ISA": "Isaia",
    "025_JER": "Jeremia",
    "026_LAM": "Fitomaniana",
    "027_EZK": "Ezekiela",
    "028_DAN": "Daniela",
    "029_HOS": "Hosea",
    "030_JOL": "Joela",
    "031_AMO": "Amosa",
    "032_OBA": "Obadia",
    "033_JON": "Jona",
    "034_MIC": "Mika",
    "035_NAM": "Nahoma",
    "036_HAB": "Habakoka",
    "037_ZEP": "Zefania",
    "038_HAG": "Hagay",
    "039_ZEC": "Zakaria",
    "040_MAL": "Malakia",
    
    // Nouveau Testament
    "070_MAT": "Matio",
    "071_MRK": "Marka",
    "072_LUK": "Lioka",
    "073_JHN": "Jaona",
    "074_ACT": "Asan'ny Apostoly",
    "075_ROM": "Romana",
    "076_1CO": "I Korintiana",
    "077_2CO": "II Korintiana",
    "078_GAL": "Galatiana",
    "079_EPH": "Efesiana",
    "080_PHP": "Filipiana",
    "081_COL": "Kolosiana",
    "082_1TH": "I Tesaloniana",
    "083_2TH": "II Tesaloniana",
    "084_1TI": "I Timoty",
    "085_2TI": "II Timoty",
    "086_TIT": "Titosy",
    "087_PHM": "Filemona",
    "088_HEB": "Hebreo",
    "089_JAS": "Jakoba",
    "090_1PE": "I Petera",
    "091_2PE": "II Petera",
    "092_1JN": "I Jaona",
    "093_2JN": "II Jaona",
    "094_3JN": "III Jaona",
    "095_JUD": "Joda",
    "096_REV": "Apokalipsy"
};

// Initialiser les noms malgaches
books.forEach(book => {
    bookNames.malagasy[book] = book;
});

// Fonction principale d'initialisation
export async function initializeApp() {
    console.log('Initialisation de l application...');
    await loadMalagasyBible();
    await loadFrenchBible();
    populateBookSelect();
    populateChapterSelect('Matio');
}

async function loadMalagasyBible() {
    try {
        console.log('Début du chargement de la Bible malgache...');
        
        for (const book of books) {
            const fileName = `${book}.txt`;
            const filePath = `/data/malagasy-bible/${fileName}`;
            
            console.log(`Tentative de chargement: ${filePath}`);
            
            try {
                const response = await fetch(filePath);
                console.log(`Réponse pour ${fileName}: ${response.status}`);
                
                if (response.ok) {
                    const text = await response.text();
                    console.log(`Fichier ${fileName} chargé, longueur: ${text.length} caractères`);
                    
                    let parsedData;
                    
                    // Utiliser le parser spécial pour les livres problématiques
                    if (["II Jaona", "III Jaona", "Joda"].includes(book)) {
                        parsedData = parseProblematicBooks(text, book);
                    } else {
                        parsedData = parseBibleText(text, book);
                    }
                    
                    bibleData.malagasy[book] = parsedData;
                    
                    console.log(`✓ ${book} analysé: ${Object.keys(parsedData).length} chapitres`);
                    
                    // Afficher un exemple du premier verset pour vérifier
                    if (parsedData[1] && parsedData[1][1]) {
                        console.log(`Exemple ${book} 1:1:`, parsedData[1][1].substring(0, 100));
                    }
                } else {
                    console.warn(`✗ Fichier non trouvé (${response.status}): ${fileName}`);
                    bibleData.malagasy[book] = generateMockChapters(book);
                }
            } catch (error) {
                console.error(`✗ Erreur avec ${fileName}:`, error);
                bibleData.malagasy[book] = generateMockChapters(book);
            }
        }
        
        console.log('Chargement de la Bible malgache terminé');
        console.log('Livres chargés:', Object.keys(bibleData.malagasy));
        
    } catch (error) {
        console.error('Erreur lors du chargement de la Bible malgache:', error);
    }
}

// Nouvelle fonction pour charger la Bible française
async function loadFrenchBible() {
    try {
        console.log('Début du chargement de la Bible française...');
        
        // Créer une liste de tous les fichiers français à charger
        const frenchFilesToLoad = generateFrenchFileList();
        
        console.log(`Nombre de fichiers français à charger: ${frenchFilesToLoad.length}`);
        
        let loadedCount = 0;
        let errorCount = 0;
        
        for (const fileInfo of frenchFilesToLoad) {
            const { fileName, malagasyBook, chapter } = fileInfo;
            const filePath = `/data/french-bible/${fileName}`;
            
            try {
                const response = await fetch(filePath);
                
                if (response.ok) {
                    const text = await response.text();
                    const parsedData = parseFrenchBibleText(text, malagasyBook, chapter);
                    
                    // Initialiser le livre s'il n'existe pas encore
                    if (!bibleData.french[malagasyBook]) {
                        bibleData.french[malagasyBook] = {};
                    }
                    
                    // Ajouter le chapitre
                    bibleData.french[malagasyBook][chapter] = parsedData;
                    
                    loadedCount++;
                    if (loadedCount % 50 === 0) {
                        console.log(`✓ ${loadedCount} fichiers français chargés...`);
                    }
                } else {
                    console.warn(`✗ Fichier français non trouvé: ${fileName}`);
                    errorCount++;
                }
            } catch (error) {
                console.error(`✗ Erreur avec ${fileName}:`, error);
                errorCount++;
            }
        }
        
        console.log(`Chargement de la Bible française terminé: ${loadedCount} succès, ${errorCount} erreurs`);
        
        // Compléter les chapitres manquants avec des données mock
        completeMissingFrenchChapters();
        
    } catch (error) {
        console.error('Erreur lors du chargement de la Bible française:', error);
        // En cas d'erreur, charger la version mock
        await loadFrenchBibleMock();
    }
}

// Génère la liste complète des fichiers français basée sur le mapping
function generateFrenchFileList() {
    const filesToLoad = [];
    
    // Parcourir tous les mappings de fichiers
    for (const [fileCode, malagasyBook] of Object.entries(frenchFileMapping)) {
        const chapterCount = getRealisticChapterCounts(malagasyBook);
        
        for (let chapter = 1; chapter <= chapterCount; chapter++) {
            // Format spécial pour les Psaumes (3 chiffres)
            let chapterStr;
            if (fileCode === "020_PSA") {
                chapterStr = chapter.toString().padStart(3, '0');
            } else {
                chapterStr = chapter.toString().padStart(2, '0');
            }
            
            const fileName = `frajnd_${fileCode}_${chapterStr}_read.txt`;
            
            filesToLoad.push({
                fileName,
                malagasyBook,
                chapter
            });
        }
    }
    
    return filesToLoad;
}

// Parser pour les fichiers français
function parseFrenchBibleText(text, bookName, chapter) {
    const verses = {};
    const lines = text.split('\n');
    
    console.log(`Analyse du fichier français ${bookName} chapitre ${chapter}, ${lines.length} lignes`);

    lines.forEach((line, index) => {
        line = line.trim();
        if (!line) return;

        // Format français typique: « Texte » (Référence)
        const verseMatch = line.match(/«\s*(.*?)\s*»\s*\(([^)]+)\)/);
        if (verseMatch) {
            const verseText = verseMatch[1].trim();
            const reference = verseMatch[2];
            
            // Extraire le numéro de verset de la référence
            const verseNumMatch = reference.match(/:(\d+)/);
            if (verseNumMatch) {
                const verse = parseInt(verseNumMatch[1]);
                verses[verse] = verseText;
                
                if (index < 2 && chapter === 1) { // Log les 2 premiers versets du premier chapitre pour debug
                    console.log(`  ${bookName} ${chapter}:${verse} -> "${verseText.substring(0, 50)}..."`);
                }
            }
        } else {
            // Si le format standard ne marche pas, essayer d'autres patterns
            const alternativeMatch = line.match(/(\d+)\s+(.*)/);
            if (alternativeMatch) {
                const verse = parseInt(alternativeMatch[1]);
                const verseText = alternativeMatch[2].trim();
                verses[verse] = verseText;
            } else if (line.includes('«') && line.includes('»')) {
                // Format alternatif avec guillemets mais sans parenthèses
                const textMatch = line.match(/«(.*?)»/);
                if (textMatch) {
                    const verseText = textMatch[1].trim();
                    // Essayer d'extraire le numéro du verset du début de la ligne
                    const verseNumMatch = line.match(/^(\d+)/);
                    const verse = verseNumMatch ? parseInt(verseNumMatch[1]) : index + 1;
                    verses[verse] = verseText;
                }
            }
        }
    });

    // Si aucun verset n'a été trouvé, essayer une méthode de secours
    if (Object.keys(verses).length === 0) {
        return parseFrenchBibleTextFallback(text, bookName, chapter);
    }

    return verses;
}

// Méthode de secours pour le parsing français
function parseFrenchBibleTextFallback(text, bookName, chapter) {
    const verses = {};
    const lines = text.split('\n').filter(line => line.trim());
    
    console.log(`Parsing de secours pour ${bookName} chapitre ${chapter}`);

    lines.forEach((line, index) => {
        // Essayer différents patterns
        const patterns = [
            /(\d+)[\s\.]+(.*)/, // "1. Texte" ou "1 Texte"
            /^(\d+)\s*[-:]\s*(.*)/, // "1: Texte" ou "1 - Texte"
            /«(.*?)»/, // Juste le texte entre guillemets
        ];
        
        for (const pattern of patterns) {
            const match = line.match(pattern);
            if (match) {
                let verse, verseText;
                
                if (pattern === /«(.*?)»/) {
                    verse = index + 1;
                    verseText = match[1].trim();
                } else {
                    verse = parseInt(match[1]);
                    verseText = match[2].trim();
                }
                
                if (verse && verseText) {
                    verses[verse] = verseText;
                    break;
                }
            }
        }
        
        // Si aucun pattern ne correspond, utiliser le numéro de ligne
        if (!verses[index + 1] && line.trim()) {
            verses[index + 1] = line.trim();
        }
    });

    return verses;
}

// Complète les chapitres manquants en français
function completeMissingFrenchChapters() {
    books.forEach(book => {
        if (!bibleData.french[book]) {
            bibleData.french[book] = {};
        }
        
        const chapterCount = getRealisticChapterCounts(book);
        for (let chapter = 1; chapter <= chapterCount; chapter++) {
            if (!bibleData.french[book][chapter]) {
                bibleData.french[book][chapter] = generateMockFrenchChapter(book, chapter);
                console.log(`Chapitre mock généré: ${book} ${chapter}`);
            }
        }
    });
}

function parseBibleText(text, bookName) {
    const chapters = {};
    const lines = text.split('\n');
    
    console.log(`Analyse de ${bookName}, ${lines.length} lignes`);

    lines.forEach((line, index) => {
        line = line.trim();
        if (!line) return;

        // Format: « Texte » (Livre chapitre:verset)
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
    
    console.log(`Parsing spécial pour ${bookName}, ${lines.length} lignes`);

    lines.forEach((line, index) => {
        // Extraire le texte entre guillemets
        const textMatch = line.match(/«(.*?)»/);
        if (textMatch) {
            const verseText = textMatch[1].trim();
            
            // Extraire le numéro de verset de la référence
            const refMatch = line.match(/\(.*?(\d+)\)/);
            const verse = refMatch ? parseInt(refMatch[1]) : index + 1;
            
            chapters[1][verse] = verseText;
        } else {
            // Si pas de guillemets, prendre toute la ligne jusqu'à la parenthèse
            const cleanLine = line.split('(')[0].trim();
            if (cleanLine) {
                chapters[1][index + 1] = cleanLine;
            }
        }
    });

    return chapters;
}

// Version française mock (fallback)
async function loadFrenchBibleMock() {
    console.log('Chargement de la Bible française mock...');
    books.forEach(book => {
        bibleData.french[book] = generateMockFrenchChapters(book);
    });
    console.log('Bible française mock chargée');
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

function generateMockFrenchChapters(book) {
    const chapters = {};
    const frenchBookName = bookNames.french[book];
    const chapterCount = getRealisticChapterCounts(book);
    
    for (let i = 1; i <= chapterCount; i++) {
        chapters[i] = {};
        const verseCount = getRealisticVerseCount(book, i);
        for (let j = 1; j <= verseCount; j++) {
            chapters[i][j] = `[Version française en attente] ${frenchBookName} ${i}:${j}`;
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
        // Ancien Testament
        "Genesisy": 50, "Eksodosy": 40, "Levitikosy": 27, "Nomery": 36, "Deotoronomia": 34,
        "Josoa": 24, "Mpitsara": 21, "Rota": 4, "I Samoela": 31, "II Samoela": 24,
        "I Mpanjaka": 22, "II Mpanjaka": 25, "I Tantara": 29, "II Tantara": 36, "Ezra": 10,
        "Nehemia": 13, "Estera": 10, "Joba": 42, "Salamo": 150, "Ohabolana": 31,
        "Mpitoriteny": 12, "Tonon-kiran'i Solomona": 8, "Isaia": 66, "Jeremia": 52,
        "Fitomaniana": 5, "Ezekiela": 48, "Daniela": 12, "Hosea": 14, "Joela": 3,
        "Amosa": 9, "Obadia": 1, "Jona": 4, "Mika": 7, "Nahoma": 3, "Habakoka": 3,
        "Zefania": 3, "Hagay": 2, "Zakaria": 14, "Malakia": 4,
        
        // Nouveau Testament
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
    // Retourne un nombre réaliste de versets par défaut
    return 30;
}

// Les fonctions suivantes restent identiques à ta version originale...
export function populateBookSelect() {
    const bookSelect = document.getElementById('book-select');
    if (!bookSelect) {
        console.error('Element book-select non trouvé');
        return;
    }
    
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
    if (!chapterSelect) {
        console.error('Element chapter-select non trouvé');
        return;
    }
    
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

export async function loadVerses(book, chapter) {
    if (!book || !chapter) return;

    console.log(`Chargement des versets: ${book} chapitre ${chapter}`);

    const malagasyVerses = getVerses(book, chapter, 'malagasy');
    const frenchVerses = getVerses(book, chapter, 'french');

    console.log(`Versets malgaches: ${Object.keys(malagasyVerses).length}`);
    console.log(`Versets français: ${Object.keys(frenchVerses).length}`);

    displayVerses('malagasy', malagasyVerses, book, chapter);
    displayVerses('french', frenchVerses, book, chapter);
    
    setTimeout(syncScroll, 100);
}

function displayVerses(version, verses, book, chapter) {
    const containerId = `${version}-verses`;
    const container = document.getElementById(containerId);
    
    if (!container) {
        console.error(`Container non trouvé: ${containerId}`);
        return;
    }

    container.innerHTML = '';

    if (!verses || Object.keys(verses).length === 0) {
        container.innerHTML = `<p class="no-verses">Aucun verset trouvé pour ${bookNames[version][book]} ${chapter}</p>`;
        return;
    }

    const bookName = bookNames[version][book];

    const titleElement = document.createElement('h4');
    titleElement.className = 'chapter-title';
    titleElement.textContent = `${bookName} - Chapitre ${chapter}`;
    container.appendChild(titleElement);

    const verseNumbers = Object.keys(verses).map(Number).sort((a, b) => a - b);
    
    verseNumbers.forEach(verseNumber => {
        const verseElement = document.createElement('div');
        verseElement.className = 'verse';
        verseElement.dataset.verseId = `${book}-${chapter}-${verseNumber}`;
        verseElement.dataset.version = version;

        const verseContent = `
            <span class="verse-number">${verseNumber}</span>
            <span class="verse-text">${verses[verseNumber]}</span>
        `;

        verseElement.innerHTML = verseContent;
        container.appendChild(verseElement);
    });
    
    console.log(`Affiché ${verseNumbers.length} versets pour ${book} ${chapter} (${version})`);
}

function syncScroll() {
    const malagasyContainer = document.getElementById('malagasy-verses');
    const frenchContainer = document.getElementById('french-verses');

    if (!malagasyContainer || !frenchContainer) {
        return;
    }

    let isScrolling = false;

    function handleScroll(source, target) {
        if (isScrolling) return;
        isScrolling = true;

        const scrollPercentage = source.scrollTop / (source.scrollHeight - source.clientHeight);
        target.scrollTop = scrollPercentage * (target.scrollHeight - target.clientHeight);

        setTimeout(() => {
            isScrolling = false;
        }, 100);
    }

    malagasyContainer.addEventListener('scroll', () => handleScroll(malagasyContainer, frenchContainer));
    frenchContainer.addEventListener('scroll', () => handleScroll(frenchContainer, malagasyContainer));
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM chargé - initialisation de l application');
    initializeApp();
});