// Structure pour stocker les données bibliques
export const bibleData = {
    malagasy: {},
    french: {}
};

// Liste complète des livres de la Bible en malgache (Ancien + Nouveau Testament)
export const books = [
    // Ancien Testament
    "Genesisy", "Eksodosy", "Levitikosy", "Nomery", "Deuteronomy", "Josoa", "Mpitsara", "Rota",
    "1 Samoela", "2 Samoela", "1 Mpanjaka", "2 Mpanjaka", "1 Tantara", "2 Tantara", "Esdrasa", "Nehemia",
    "Estera", "Joba", "Salamo", "Ohabolana", "Mpitoriteny", "Tononkira i Salomona", "Isaia", "Jeremia",
    "Fitoriana", "Ezekiela", "Daniela", "Hosea", "Joela", "Amosa", "Obadia", "Jona", "Mika", "Nahoma",
    "Habakoka", "Zefania", "Hagay", "Zakaria", "Malakia",
    
    // Nouveau Testament
    "Matio", "Marka", "Lioka", "Jaona", "Asan'ny Apostoly", "Romana", "1 Korintiana", "2 Korintiana",
    "Galatiana", "Efesiana", "Filipiana", "Kolosiana", "1 Tesaloniana", "2 Tesaloniana", "1 Timoty",
    "2 Timoty", "Titosy", "Filemona", "Hebreo", "Jakoba", "1 Petera", "2 Petera", "1 Jaona", "2 Jaona",
    "3 Jaona", "Joda", "Apokalypsy"
];

// Mapping des livres malgaches vers français
export const bookNames = {
    malagasy: {
        // Ancien Testament
        "Genesisy": "Genesisy",
        "Eksodosy": "Eksodosy",
        "Levitikosy": "Levitikosy",
        "Nomery": "Nomery",
        "Deuteronomy": "Deuteronomy",
        "Josoa": "Josoa",
        "Mpitsara": "Mpitsara",
        "Rota": "Rota",
        "1 Samoela": "1 Samoela",
        "2 Samoela": "2 Samoela",
        "1 Mpanjaka": "1 Mpanjaka",
        "2 Mpanjaka": "2 Mpanjaka",
        "1 Tantara": "1 Tantara",
        "2 Tantara": "2 Tantara",
        "Esdrasa": "Esdrasa",
        "Nehemia": "Nehemia",
        "Estera": "Estera",
        "Joba": "Joba",
        "Salamo": "Salamo",
        "Ohabolana": "Ohabolana",
        "Mpitoriteny": "Mpitoriteny",
        "Tononkira i Salomona": "Tononkira i Salomona",
        "Isaia": "Isaia",
        "Jeremia": "Jeremia",
        "Fitoriana": "Fitoriana",
        "Ezekiela": "Ezekiela",
        "Daniela": "Daniela",
        "Hosea": "Hosea",
        "Joela": "Joela",
        "Amosa": "Amosa",
        "Obadia": "Obadia",
        "Jona": "Jona",
        "Mika": "Mika",
        "Nahoma": "Nahoma",
        "Habakoka": "Habakoka",
        "Zefania": "Zefania",
        "Hagay": "Hagay",
        "Zakaria": "Zakaria",
        "Malakia": "Malakia",
        
        // Nouveau Testament
        "Matio": "Matio",
        "Marka": "Marka", 
        "Lioka": "Lioka",
        "Jaona": "Jaona",
        "Asan'ny Apostoly": "Asan'ny Apostoly",
        "Romana": "Romana",
        "1 Korintiana": "1 Korintiana",
        "2 Korintiana": "2 Korintiana", 
        "Galatiana": "Galatiana",
        "Efesiana": "Efesiana",
        "Filipiana": "Filipiana",
        "Kolosiana": "Kolosiana",
        "1 Tesaloniana": "1 Tesaloniana",
        "2 Tesaloniana": "2 Tesaloniana",
        "1 Timoty": "1 Timoty",
        "2 Timoty": "2 Timoty",
        "Titosy": "Titosy",
        "Filemona": "Filemona",
        "Hebreo": "Hebreo",
        "Jakoba": "Jakoba",
        "1 Petera": "1 Petera",
        "2 Petera": "2 Petera",
        "1 Jaona": "1 Jaona",
        "2 Jaona": "2 Jaona",
        "3 Jaona": "3 Jaona",
        "Joda": "Joda",
        "Apokalypsy": "Apokalypsy"
    },
    french: {
        // Ancien Testament
        "Genesisy": "Genèse",
        "Eksodosy": "Exode",
        "Levitikosy": "Lévitique",
        "Nomery": "Nombres",
        "Deuteronomy": "Deutéronome",
        "Josoa": "Josué",
        "Mpitsara": "Juges",
        "Rota": "Ruth",
        "1 Samoela": "1 Samuel",
        "2 Samoela": "2 Samuel",
        "1 Mpanjaka": "1 Rois",
        "2 Mpanjaka": "2 Rois",
        "1 Tantara": "1 Chroniques",
        "2 Tantara": "2 Chroniques",
        "Esdrasa": "Esdras",
        "Nehemia": "Néhémie",
        "Estera": "Esther",
        "Joba": "Job",
        "Salamo": "Psaumes",
        "Ohabolana": "Proverbes",
        "Mpitoriteny": "Ecclésiaste",
        "Tononkira i Salomona": "Cantique des Cantiques",
        "Isaia": "Ésaïe",
        "Jeremia": "Jérémie",
        "Fitoriana": "Lamentations",
        "Ezekiela": "Ézéchiel",
        "Daniela": "Daniel",
        "Hosea": "Osée",
        "Joela": "Joël",
        "Amosa": "Amos",
        "Obadia": "Abdias",
        "Jona": "Jonas",
        "Mika": "Michée",
        "Nahoma": "Nahum",
        "Habakoka": "Habacuc",
        "Zefania": "Sophonie",
        "Hagay": "Aggée",
        "Zakaria": "Zacharie",
        "Malakia": "Malachie",
        
        // Nouveau Testament
        "Matio": "Matthieu",
        "Marka": "Marc", 
        "Lioka": "Luc",
        "Jaona": "Jean",
        "Asan'ny Apostoly": "Actes",
        "Romana": "Romains",
        "1 Korintiana": "1 Corinthiens",
        "2 Korintiana": "2 Corinthiens", 
        "Galatiana": "Galates",
        "Efesiana": "Éphésiens",
        "Filipiana": "Philippiens",
        "Kolosiana": "Colossiens",
        "1 Tesaloniana": "1 Thessaloniciens",
        "2 Tesaloniana": "2 Thessaloniciens",
        "1 Timoty": "1 Timothée",
        "2 Timoty": "2 Timothée",
        "Titosy": "Tite",
        "Filemona": "Philémon",
        "Hebreo": "Hébreux",
        "Jakoba": "Jacques",
        "1 Petera": "1 Pierre",
        "2 Petera": "2 Pierre",
        "1 Jaona": "1 Jean",
        "2 Jaona": "2 Jean",
        "3 Jaona": "3 Jean",
        "Joda": "Jude",
        "Apokalypsy": "Apocalypse"
    }
};

export async function initializeApp() {
    await loadMalagasyBible();
    await loadFrenchBibleMock();
    populateBookSelect();
    populateChapterSelect('Genesisy'); // Sélection par défaut sur le premier livre
}

async function loadMalagasyBible() {
    try {
        console.log('Chargement de la Bible malgache...');
        
        for (const book of books) {
            const fileName = `${book}.txt`;
            try {
                // Utiliser le chemin relatif correct pour les fichiers
                const response = await fetch(`./data/malagasy-bible/${fileName}`);
                if (response.ok) {
                    const text = await response.text();
                    bibleData.malagasy[book] = parseBibleText(text, book);
                    console.log(`✓ ${book} chargé: ${Object.keys(bibleData.malagasy[book]).length} chapitres`);
                } else {
                    console.warn(`✗ Fichier non trouvé: ${fileName}`);
                    bibleData.malagasy[book] = generateMockChapters(book);
                }
            } catch (error) {
                console.warn(`✗ Erreur avec ${fileName}:`, error.message);
                bibleData.malagasy[book] = generateMockChapters(book);
            }
        }
        console.log('Bible malgache chargée avec succès');
    } catch (error) {
        console.error('Erreur lors du chargement de la Bible malgache:', error);
    }
}

function parseBibleText(text, bookName) {
    const chapters = {};
    const lines = text.split('\n');
    let currentChapter = 1;
    let currentVerses = {};

    lines.forEach(line => {
        line = line.trim();
        if (!line) return;

        // Détection basée sur le format spécifique de vos fichiers
        // Le format est: "Texte du verset (Livre chapitre:verset)"
        
        // Chercher la référence à la fin comme (Matio 1:1)
        const referenceMatch = line.match(/\(([^)]+)\)\s*ª?$/);
        if (referenceMatch) {
            const reference = referenceMatch[1];
            // Extraire le chapitre et le verset de la référence
            const chapterVerseMatch = reference.match(/(\d+):(\d+)/);
            if (chapterVerseMatch) {
                const chapter = parseInt(chapterVerseMatch[1]);
                const verse = parseInt(chapterVerseMatch[2]);
                
                // Le texte du verset est tout ce qui précède la référence
                let verseText = line.substring(0, referenceMatch.index).trim();
                
                // Nettoyer le texte - enlever le caractère ´ et les espaces au début
                verseText = verseText.replace(/^´\s*/, '');
                
                // Enlever le numéro de verset au début s'il existe (format "1 Texte")
                verseText = verseText.replace(/^\d+\s*/, '');
                
                // Enlever le symbole ª s'il reste
                verseText = verseText.replace(/\s*ª\s*$/, '');
                
                if (verseText) {
                    if (!chapters[chapter]) {
                        chapters[chapter] = {};
                    }
                    chapters[chapter][verse] = verseText;
                }
                
                currentChapter = chapter;
            }
        } else {
            // Si pas de référence détectée, ça pourrait être une continuation du verset précédent
            // ou une ligne de titre/chapitre
            const chapterMatch = line.match(/(?:CHAPITRE|Chapitre|toko|Toko)[\s:]*(\d+)/i);
            if (chapterMatch) {
                currentChapter = parseInt(chapterMatch[1]);
                if (!chapters[currentChapter]) {
                    chapters[currentChapter] = {};
                }
            }
        }
    });

    // Si aucun chapitre n'a été trouvé, créer une structure de base
    if (Object.keys(chapters).length === 0) {
        chapters[1] = {};
        let verseNumber = 1;
        
        lines.forEach(line => {
            line = line.trim();
            if (line && !line.match(/(?:CHAPITRE|Chapitre)/i)) {
                // Nettoyer la ligne
                let cleanLine = line.replace(/^´\s*/, '')
                                   .replace(/^\d+\s*/, '')
                                   .replace(/\s*ª\s*$/, '')
                                   .replace(/\([^)]+\)\s*ª?$/, '')
                                   .trim();
                
                if (cleanLine) {
                    chapters[1][verseNumber] = cleanLine;
                    verseNumber++;
                }
            }
        });
    }

    return chapters;
}

// Version française mock en attendant
async function loadFrenchBibleMock() {
    console.log('Chargement de la Bible française mock...');
    books.forEach(book => {
        bibleData.french[book] = generateMockFrenchChapters(book);
    });
    console.log('Bible française mock chargée');
}

function generateMockChapters(book) {
    const chapters = {};
    // Nombre de chapitres réalistes pour chaque livre
    const chapterCounts = getRealisticChapterCounts(book);
    
    for (let i = 1; i <= chapterCounts; i++) {
        chapters[i] = {};
        // Générer entre 10 et 50 versets par chapitre
        const verseCount = Math.floor(Math.random() * 40) + 10;
        for (let j = 1; j <= verseCount; j++) {
            chapters[i][j] = `Bible malgache - ${bookNames.french[book]} ${i}:${j} - Texte en malgache.`;
        }
    }
    return chapters;
}

function generateMockFrenchChapters(book) {
    const chapters = {};
    const frenchBookName = bookNames.french[book];
    
    // Nombre de chapitres réalistes
    const chapterCounts = getRealisticChapterCounts(book);
    
    for (let i = 1; i <= chapterCounts; i++) {
        chapters[i] = {};
        // Nombre de versets réalistes
        const verseCount = getRealisticVerseCount(book, i);
        for (let j = 1; j <= verseCount; j++) {
            chapters[i][j] = `[Version française en attente] ${frenchBookName} ${i}:${j} - Le texte français de la Bible Louis Segond sera chargé ici prochainement.`;
        }
    }
    return chapters;
}

function getRealisticChapterCounts(book) {
    const counts = {
        // Ancien Testament
        "Genesisy": 50, "Eksodosy": 40, "Levitikosy": 27, "Nomery": 36, "Deuteronomy": 34,
        "Josoa": 24, "Mpitsara": 21, "Rota": 4, "1 Samoela": 31, "2 Samoela": 24,
        "1 Mpanjaka": 22, "2 Mpanjaka": 25, "1 Tantara": 29, "2 Tantara": 36, "Esdrasa": 10,
        "Nehemia": 13, "Estera": 10, "Joba": 42, "Salamo": 150, "Ohabolana": 31,
        "Mpitoriteny": 12, "Tononkira i Salomona": 8, "Isaia": 66, "Jeremia": 52,
        "Fitoriana": 5, "Ezekiela": 48, "Daniela": 12, "Hosea": 14, "Joela": 3,
        "Amosa": 9, "Obadia": 1, "Jona": 4, "Mika": 7, "Nahoma": 3, "Habakoka": 3,
        "Zefania": 3, "Hagay": 2, "Zakaria": 14, "Malakia": 4,
        
        // Nouveau Testament
        "Matio": 28, "Marka": 16, "Lioka": 24, "Jaona": 21, "Asan'ny Apostoly": 28,
        "Romana": 16, "1 Korintiana": 16, "2 Korintiana": 13, "Galatiana": 6,
        "Efesiana": 6, "Filipiana": 4, "Kolosiana": 4, "1 Tesaloniana": 5,
        "2 Tesaloniana": 3, "1 Timoty": 6, "2 Timoty": 4, "Titosy": 3,
        "Filemona": 1, "Hebreo": 13, "Jakoba": 5, "1 Petera": 5, "2 Petera": 3,
        "1 Jaona": 5, "2 Jaona": 1, "3 Jaona": 1, "Joda": 1, "Apokalypsy": 22
    };
    
    return counts[book] || 10;
}

function getRealisticVerseCount(book, chapter) {
    // Retourne un nombre réaliste de versets pour chaque chapitre
    // Pour simplifier, on retourne une valeur moyenne
    const averages = {
        "Salamo": 10, // Les Psaumes sont courts
        "Ohabolana": 20, // Les Proverbes ont des versets courts
        "Matio": 25, "Marka": 30, "Lioka": 30, "Jaona": 25
    };
    
    return averages[book] || 30;
}

function populateBookSelect() {
    const bookSelect = document.getElementById('book-select');
    bookSelect.innerHTML = '<option value="">Choisir un livre</option>';
    
    // Grouper par Ancien et Nouveau Testament
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

    // Événement de changement de livre
    bookSelect.addEventListener('change', (e) => {
        const selectedBook = e.target.value;
        if (selectedBook) {
            populateChapterSelect(selectedBook);
            loadVerses(selectedBook, 1); // Charger le chapitre 1 par défaut
        }
    });
}

export function populateChapterSelect(book, version = 'malagasy') {
    const chapterSelect = document.getElementById('chapter-select');
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

    // Événement de changement de chapitre
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

    const malagasyVerses = getVerses(book, chapter, 'malagasy');
    const frenchVerses = getVerses(book, chapter, 'french');

    displayVerses('malagasy', malagasyVerses, book, chapter);
    displayVerses('french', frenchVerses, book, chapter);

    // Synchroniser le défilement
    syncScroll();
}

function displayVerses(version, verses, book, chapter) {
    const container = document.getElementById(`${version}-verses`);
    if (!container) return;

    container.innerHTML = '';

    if (Object.keys(verses).length === 0) {
        container.innerHTML = `<p class="no-verses">Aucun verset trouvé pour ${bookNames[version][book]} ${chapter}</p>`;
        return;
    }

    const versionTitle = version === 'malagasy' ? 'Bible Malgache' : 'Bible Française (LSG)';
    const bookName = bookNames[version][book];

    // Titre du chapitre
    const titleElement = document.createElement('h4');
    titleElement.className = 'chapter-title';
    titleElement.textContent = `${bookName} - Chapitre ${chapter}`;
    container.appendChild(titleElement);

    // Versets
    Object.keys(verses).sort((a, b) => a - b).forEach(verseNumber => {
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

        setTimeout(() => {
            isScrolling = false;
        }, 100);
    }

    malagasyContainer.addEventListener('scroll', () => handleScroll(malagasyContainer, frenchContainer));
    frenchContainer.addEventListener('scroll', () => handleScroll(frenchContainer, malagasyContainer));
}

// Fonction pour changer de version
export function switchVersion(book, chapter, newVersion) {
    const verses = getVerses(book, chapter, newVersion);
    displayVerses(newVersion, verses, book, chapter);
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});