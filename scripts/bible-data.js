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

// CHARGEMENT À LA DEMANDE DES CHAPITRES FRANÇAIS
async function loadFrenchChapterOnDemand(malagasyBook, chapter) {
    const cacheKey = `${malagasyBook}-${chapter}`;
    
    // Vérifier le cache d'abord
    if (frenchChapterCache[cacheKey]) {
        console.log(`Chapitre ${cacheKey} trouvé dans le cache`);
        return frenchChapterCache[cacheKey];
    }
    
    const fileCode = Object.keys(frenchFileMapping).find(
        code => frenchFileMapping[code] === malagasyBook
    );
    
    if (!fileCode) {
        console.warn(`Aucun code trouvé pour ${malagasyBook}`);
        const mockVerses = generateMockFrenchChapter(malagasyBook, chapter);
        frenchChapterCache[cacheKey] = mockVerses;
        return mockVerses;
    }
    
    let chapterStr;
    if (fileCode === "020_PSA") {
        chapterStr = chapter.toString().padStart(3, '0');
    } else {
        chapterStr = chapter.toString().padStart(2, '0');
    }
    
    const fileName = `frajnd_${fileCode}_${chapterStr}_read.txt`;
    const filePath = `/data/french-bible/${fileName}`;
    
    try {
        const response = await fetch(filePath);
        if (response.ok) {
            const text = await response.text();
            const parsedVerses = parseFrenchBibleText(text, malagasyBook, chapter);
            
            // Mettre en cache
            frenchChapterCache[cacheKey] = parsedVerses;
            
            console.log(`✓ ${fileName} chargé et parsé: ${Object.keys(parsedVerses).length} versets`);
            return parsedVerses;
        } else {
            console.warn(`✗ Fichier non trouvé: ${fileName}`);
        }
    } catch (error) {
        console.warn(`✗ Erreur de chargement pour ${fileName}:`, error);
    }
    
    const mockVerses = generateMockFrenchChapter(malagasyBook, chapter);
    frenchChapterCache[cacheKey] = mockVerses;
    return mockVerses;
}

// PARSING AMÉLIORÉ POUR LES FICHIERS FRANÇAIS
function parseFrenchBibleText(text, bookName, chapter) {
    // Détecter le type de format
    const hasGuillemets = text.includes('«') && text.includes('»');
    const hasNumberedVerses = /\d+[\.\s]/.test(text);
    
    if (hasGuillemets) {
        console.log(`Format avec guillemets détecté pour ${bookName} ${chapter}`);
        return parseFrenchBibleTextWithGuillemets(text, bookName, chapter);
    } else if (hasNumberedVerses) {
        console.log(`Format avec numéros détecté pour ${bookName} ${chapter}`);
        return parseFrenchBibleTextWithNumberedVerses(text, bookName, chapter);
    } else {
        console.log(`Format libre détecté pour ${bookName} ${chapter}`);
        return parseFrenchBibleTextFreeFormat(text, bookName, chapter);
    }
}

// Parser pour les formats avec guillemets (comme Proverbes)
function parseFrenchBibleTextWithGuillemets(text, bookName, chapter) {
    const verses = {};
    const lines = text.split('\n');
    
    lines.forEach((line, index) => {
        line = line.trim();
        if (!line) return;

        // Format avec guillemets français : « Texte » (Référence)
        const verseMatch = line.match(/«\s*(.*?)\s*»\s*\(([^)]+)\)/);
        if (verseMatch) {
            const verseText = verseMatch[1].trim();
            const reference = verseMatch[2];
            
            // Extraire le numéro de verset de la référence
            const verseNumMatch = reference.match(/:(\d+)/);
            if (verseNumMatch) {
                const verse = parseInt(verseNumMatch[1]);
                verses[verse] = verseText;
            }
        } else {
            // Essayer d'autres patterns pour les fichiers avec guillemets mais format différent
            const alternativeMatch = line.match(/(\d+)\s*«(.*?)»/);
            if (alternativeMatch) {
                const verse = parseInt(alternativeMatch[1]);
                const verseText = alternativeMatch[2].trim();
                verses[verse] = verseText;
            }
        }
    });

    return verses;
}

// Parser pour les formats avec numéros de versets explicites
function parseFrenchBibleTextWithNumberedVerses(text, bookName, chapter) {
    const verses = {};
    const lines = text.split('\n').filter(line => line.trim());
    
    let currentVerse = 1;

    lines.forEach((line, index) => {
        line = line.trim();
        
        // Ignorer les lignes d'en-tête
        if (isHeaderLine(line, bookName, chapter)) {
            return;
        }

        // Chercher un numéro de verset au début de la ligne
        const verseMatch = line.match(/^(\d+)[\.\s]+(.*)/);
        if (verseMatch) {
            currentVerse = parseInt(verseMatch[1]);
            const verseText = verseMatch[2].trim();
            
            if (verseText) {
                verses[currentVerse] = verseText;
            }
        } else if (line) {
            // Si pas de numéro mais du texte, l'ajouter au verset en cours
            if (verses[currentVerse]) {
                verses[currentVerse] += ' ' + line;
            } else {
                verses[currentVerse] = line;
            }
        }
    });

    return verses;
}

// Parser pour les formats libres (comme Matthieu)
function parseFrenchBibleTextFreeFormat(text, bookName, chapter) {
    const verses = {};
    const lines = text.split('\n').filter(line => line.trim());
    
    let verseNumber = 1;
    let currentParagraph = '';

    lines.forEach((line, index) => {
        line = line.trim();
        
        // Ignorer les lignes d'en-tête
        if (isHeaderLine(line, bookName, chapter)) {
            return;
        }

        // Si la ligne commence par un chiffre, c'est probablement un nouveau verset
        const startsWithNumber = /^\d+[\.\s]/.test(line);
        
        if (startsWithNumber && currentParagraph) {
            // Sauvegarder le paragraphe précédent comme verset
            verses[verseNumber] = currentParagraph.trim();
            verseNumber++;
            currentParagraph = line;
        } else if (line) {
            // Ajouter à la ligne en cours
            if (currentParagraph) currentParagraph += ' ';
            currentParagraph += line;
        }
    });

    // Ne pas oublier le dernier paragraphe
    if (currentParagraph) {
        verses[verseNumber] = currentParagraph.trim();
    }

    return verses;
}

// Fonction pour identifier les lignes d'en-tête
function isHeaderLine(line, bookName, chapter) {
    const frenchBookName = bookNames.french[bookName];
    
    // Vérifier si c'est le nom du livre
    if (line.toLowerCase().includes(frenchBookName.toLowerCase()) || 
        line.toLowerCase().includes(bookName.toLowerCase())) {
        return true;
    }
    
    // Vérifier si c'est le numéro de chapitre seul
    if (line === chapter.toString() || line === `${chapter}.`) {
        return true;
    }
    
    // Vérifier les lignes très courtes qui pourraient être des en-têtes
    if (line.length < 5 && /^\d+\.?$/.test(line)) {
        return true;
    }
    
    return false;
}

// FONCTIONS EXISTANTES POUR LE PARSING MALGACHE
function parseBibleText(text, bookName) {
    const chapters = {};
    const lines = text.split('\n');
    
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

// FONCTIONS DE GÉNÉRATION DE DONNÉES MOCK
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

// FONCTIONS UTILITAIRES
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
    return 30;
}

// FONCTIONS D'AFFICHAGE AVEC ALIGNEMENT DES VERSETS
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

// FONCTION PRINCIPALE DE CHARGEMENT DES VERSETS
export async function loadVerses(book, chapter) {
    if (!book || !chapter) return;

    console.log(`Chargement des versets: ${book} chapitre ${chapter}`);

    // Charger les versets malgaches
    const malagasyVerses = getVerses(book, chapter, 'malagasy');

    // Charger les versets français À LA DEMANDE
    let frenchVerses = getVerses(book, chapter, 'french');
    
    if (!frenchVerses || Object.keys(frenchVerses).length === 0) {
        console.log(`Chargement français à la demande: ${book} chapitre ${chapter}`);
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
    // Afficher les deux versions
    displayAlignedVerses(malagasyVersion, malagasyVerses, frenchVerses, book, chapter);
    displayAlignedVerses(frenchVersion, frenchVerses, malagasyVerses, book, chapter);
}

function displayAlignedVerses(version, verses, otherVerses, book, chapter) {
    const containerId = `${version}-verses`;
    const container = document.getElementById(containerId);
    
    if (!container) {
        console.error(`Container non trouvé: ${containerId}`);
        return;
    }

    container.innerHTML = '';

    const bookName = bookNames[version][book];

    const titleElement = document.createElement('h4');
    titleElement.className = 'chapter-title';
    titleElement.textContent = `${bookName} - Chapitre ${chapter}`;
    container.appendChild(titleElement);

    // Obtenir tous les numéros de versets possibles pour un alignement correct
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

// Fonction pour obtenir tous les numéros de versets possibles pour l'alignement
function getAllPossibleVerseNumbers(verses1, verses2) {
    const verseNumbers1 = Object.keys(verses1).map(Number);
    const verseNumbers2 = Object.keys(verses2).map(Number);
    
    // Prendre l'union de tous les numéros de versets des deux versions
    const allVerseNumbers = [...new Set([...verseNumbers1, ...verseNumbers2])];
    return allVerseNumbers.sort((a, b) => a - b);
}

// SYNCHRONISATION DU SCROLL
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