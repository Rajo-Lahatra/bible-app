// bible-data.js - Version optimisée

// Structure pour stocker les données bibliques
export const bibleData = {
    malagasy: {},
    french: {}
};

// Cache avancé avec expiration
const advancedCache = {
    malagasy: {},
    french: {},
    structure: {} // Structure des livres/chapitres
};

const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 heures
let supabaseClient = null;
let currentDisplayMode = 'both';
let currentSelectedBook = 'Matio';

// Fonction pour initialiser Supabase
async function initSupabase() {
    if (supabaseClient) return supabaseClient;

    try {
        const { createClient } = await import('./supabase-client.js');
        supabaseClient = await createClient();
        return supabaseClient;
    } catch (error) {
        console.error('Erreur initialisation Supabase:', error);
        return null;
    }
}

// Gestion du cache localStorage
const CACHE_KEYS = {
    STRUCTURE: 'bible_structure',
    VERSES: 'bible_verses_'
};

function saveToLocalStorage(key, data) {
    try {
        const cacheData = {
            timestamp: Date.now(),
            data: data
        };
        localStorage.setItem(key, JSON.stringify(cacheData));
    } catch (e) {
        console.warn('LocalStorage full, clearing old cache');
        clearOldCache();
        // Réessayer
        localStorage.setItem(key, JSON.stringify({
            timestamp: Date.now(),
            data: data
        }));
    }
}

function loadFromLocalStorage(key) {
    try {
        const cached = localStorage.getItem(key);
        if (!cached) return null;
        
        const { timestamp, data } = JSON.parse(cached);
        if (Date.now() - timestamp > CACHE_DURATION) {
            localStorage.removeItem(key);
            return null;
        }
        return data;
    } catch (e) {
        return null;
    }
}

function clearOldCache() {
    const keysToKeep = [CACHE_KEYS.STRUCTURE];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(CACHE_KEYS.VERSES)) {
            const cached = loadFromLocalStorage(key);
            if (!cached) {
                localStorage.removeItem(key);
            }
        }
    }
}

// Fonction pour changer le mode d'affichage
export function setDisplayMode(mode) {
    currentDisplayMode = mode;
    updateDisplayModeUI();
    
    if (currentSelectedBook && document.getElementById('chapter-select').value) {
        const chapter = parseInt(document.getElementById('chapter-select').value);
        loadVerses(currentSelectedBook, chapter);
    }
}

export function getDisplayMode() {
    return currentDisplayMode;
}

function updateDisplayModeUI() {
    const bibleContainer = document.querySelector('.bible-container');
    const malagasyColumn = document.getElementById('malagasy-column');
    const frenchColumn = document.getElementById('french-column');
    const modeButtons = document.querySelectorAll('.display-mode-btn');
    
    if (!bibleContainer || !malagasyColumn || !frenchColumn) return;
    
    modeButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.mode === currentDisplayMode);
    });
    
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

// Liste des livres
export const books = [
    "Genesisy", "Eksodosy", "Levitikosy", "Nomery", "Deotoronomia", "Josoa", "Mpitsara", "Rota",
    "I Samoela", "II Samoela", "I Mpanjaka", "II Mpanjaka", "I Tantara", "II Tantara", "Ezra", "Nehemia",
    "Estera", "Joba", "Salamo", "Ohabolana", "Mpitoriteny", "Tonon-kiran'i Solomona", "Isaia", "Jeremia",
    "Fitomaniana", "Ezekiela", "Daniela", "Hosea", "Joela", "Amosa", "Obadia", "Jona", "Mika", "Nahoma",
    "Habakoka", "Zefania", "Hagay", "Zakaria", "Malakia", "Matio", "Marka", "Lioka", "Jaona", 
    "Asan'ny Apostoly", "Romana", "I Korintiana", "II Korintiana", "Galatiana", "Efesiana", "Filipiana", 
    "Kolosiana", "I Tesaloniana", "II Tesaloniana", "I Timoty", "II Timoty", "Titosy", "Filemona", 
    "Hebreo", "Jakoba", "I Petera", "II Petera", "I Jaona", "II Jaona", "III Jaona", "Joda", "Apokalipsy"
];

// Mapping des noms de livres
export const bookNames = {
    malagasy: {},
    french: {
        "Genesisy": "Genèse", "Eksodosy": "Exode", "Levitikosy": "Lévitique", "Nomery": "Nombres",
        "Deotoronomia": "Deutéronome", "Josoa": "Josué", "Mpitsara": "Juges", "Rota": "Ruth",
        "I Samoela": "1 Samuel", "II Samoela": "2 Samuel", "I Mpanjaka": "1 Rois", "II Mpanjaka": "2 Rois",
        "I Tantara": "1 Chroniques", "II Tantara": "2 Chroniques", "Ezra": "Esdras", "Nehemia": "Néhémie",
        "Estera": "Esther", "Joba": "Job", "Salamo": "Psaumes", "Ohabolana": "Proverbes", "Mpitoriteny": "Ecclésiaste",
        "Tonon-kiran'i Solomona": "Cantique des Cantiques", "Isaia": "Ésaïe", "Jeremia": "Jérémie", "Fitomaniana": "Lamentations",
        "Ezekiela": "Ézéchiel", "Daniela": "Daniel", "Hosea": "Osée", "Joela": "Joël", "Amosa": "Amos",
        "Obadia": "Abdias", "Jona": "Jonas", "Mika": "Michée", "Nahoma": "Nahum", "Habakoka": "Habacuc",
        "Zefania": "Sophonie", "Hagay": "Aggée", "Zakaria": "Zacharie", "Malakia": "Malachie",
        "Matio": "Matthieu", "Marka": "Marc", "Lioka": "Luc", "Jaona": "Jean", "Asan'ny Apostoly": "Actes",
        "Romana": "Romains", "I Korintiana": "1 Corinthiens", "II Korintiana": "2 Corinthiens", "Galatiana": "Galates",
        "Efesiana": "Éphésiens", "Filipiana": "Philippiens", "Kolosiana": "Colossiens", "I Tesaloniana": "1 Thessaloniciens",
        "II Tesaloniana": "2 Thessaloniciens", "I Timoty": "1 Timothée", "II Timoty": "2 Timothée", "Titosy": "Tite",
        "Filemona": "Philémon", "Hebreo": "Hébreux", "Jakoba": "Jacques", "I Petera": "1 Pierre", "II Petera": "2 Pierre",
        "I Jaona": "1 Jean", "II Jaona": "2 Jean", "III Jaona": "3 Jean", "Joda": "Jude", "Apokalipsy": "Apocalypse"
    }
};

// Initialiser les noms malgaches
books.forEach(book => {
    bookNames.malagasy[book] = book;
});

// Fonction principale d'initialisation
export async function initializeApp() {
    console.log('🚀 Initialisation optimisée de l application...');
    
    // Initialiser Supabase (non bloquant)
    initSupabase().then(() => {
        console.log('✅ Supabase initialisé');
    }).catch(console.error);
    
    // Charger la structure depuis le cache ou Supabase
    await loadBooksStructure();
    
    populateBookSelect();
    populateChapterSelect(currentSelectedBook);
    updateDisplayModeUI();
    
    // Précharger les livres populaires en arrière-plan
    preloadPopularBooks();
}

// Charger la structure des livres
async function loadBooksStructure() {
    // Essayer d'abord le cache localStorage
    const cachedStructure = loadFromLocalStorage(CACHE_KEYS.STRUCTURE);
    if (cachedStructure) {
        console.log('📚 Structure chargée depuis le cache');
        Object.assign(advancedCache.structure, cachedStructure);
        return;
    }

    // Sinon charger depuis Supabase
    try {
        const client = await initSupabase();
        if (!client) throw new Error('Supabase non disponible');

        // Charger la structure pour tous les livres en une seule requête
        const { data: malagasyStructure, error: malagasyError } = await client
            .from('malagasy_bible_verses')
            .select('book, chapter')
            .order('book')
            .order('chapter');

        const { data: frenchStructure, error: frenchError } = await client
            .from('french_bible_verses')
            .select('book, chapter')
            .order('book')
            .order('chapter');

        if (malagasyError || frenchError) throw new Error('Erreur structure');

        // Organiser la structure
        const structure = {};
        books.forEach(book => {
            structure[book] = {
                malagasy: [],
                french: []
            };
        });

        malagasyStructure.forEach(item => {
            if (structure[item.book] && !structure[item.book].malagasy.includes(item.chapter)) {
                structure[item.book].malagasy.push(item.chapter);
            }
        });

        frenchStructure.forEach(item => {
            if (structure[item.book] && !structure[item.book].french.includes(item.chapter)) {
                structure[item.book].french.push(item.chapter);
            }
        });

        // Trier les chapitres
        Object.values(structure).forEach(bookStructure => {
            bookStructure.malagasy.sort((a, b) => a - b);
            bookStructure.french.sort((a, b) => a - b);
        });

        Object.assign(advancedCache.structure, structure);
        saveToLocalStorage(CACHE_KEYS.STRUCTURE, structure);
        console.log('📚 Structure chargée depuis Supabase');

    } catch (error) {
        console.error('Erreur chargement structure:', error);
        // Structure par défaut basée sur les counts réalistes
        initializeDefaultStructure();
    }
}

function initializeDefaultStructure() {
    const structure = {};
    books.forEach(book => {
        const chapterCount = getRealisticChapterCounts(book);
        structure[book] = {
            malagasy: Array.from({length: chapterCount}, (_, i) => i + 1),
            french: Array.from({length: chapterCount}, (_, i) => i + 1)
        };
    });
    Object.assign(advancedCache.structure, structure);
}

// Charger les versets depuis Supabase avec cache avancé
async function loadVersesFromSupabase(book, chapter, language) {
    const cacheKey = `${language}-${book}-${chapter}`;
    const storageKey = `${CACHE_KEYS.VERSES}${cacheKey}`;
    
    // 1. Vérifier le cache mémoire
    if (advancedCache[language][cacheKey]) {
        return advancedCache[language][cacheKey];
    }
    
    // 2. Vérifier le localStorage
    const cached = loadFromLocalStorage(storageKey);
    if (cached) {
        advancedCache[language][cacheKey] = cached;
        return cached;
    }
    
    // 3. Charger depuis Supabase
    try {
        const client = await initSupabase();
        if (!client) throw new Error('Supabase non disponible');

        const { data, error } = await client
            .from(`${language}_bible_verses`)
            .select('verse, text')
            .eq('book', book)
            .eq('chapter', chapter)
            .order('verse');
            
        if (error) throw error;
        
        const verses = {};
        data.forEach(item => {
            verses[item.verse] = item.text;
        });
        
        // Mettre en cache
        advancedCache[language][cacheKey] = verses;
        saveToLocalStorage(storageKey, verses);
        
        return verses;
    } catch (error) {
        console.error(`Erreur chargement ${book} ${chapter} (${language}):`, error);
        return generateMockVerses(book, chapter, language);
    }
}

// Précharger les livres populaires
async function preloadPopularBooks() {
    const popularBooks = [
        { book: 'Matio', chapters: [1, 2, 3] },
        { book: 'Marka', chapters: [1] },
        { book: 'Lioka', chapters: [1, 2] },
        { book: 'Jaona', chapters: [1, 3] },
        { book: 'Genesisy', chapters: [1] }
    ];
    
    // Précharger en arrière-plan
    setTimeout(async () => {
        for (const { book, chapters } of popularBooks) {
            for (const chapter of chapters) {
                await Promise.all([
                    loadVersesFromSupabase(book, chapter, 'malagasy'),
                    loadVersesFromSupabase(book, chapter, 'french')
                ]);
            }
        }
        console.log('📖 Livres populaires préchargés');
    }, 1000);
}

// ... [Le reste des fonctions reste similaire mais utilise le cache avancé]

// FONCTIONS D'AFFICHAGE (similaires mais optimisées)
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

    chapterSelect.onchange = null;
    chapterSelect.addEventListener('change', (e) => {
        const selectedChapter = parseInt(e.target.value);
        if (selectedChapter && book) {
            loadVerses(book, selectedChapter);
        }
    });
}

export function getChapters(book, version = 'malagasy') {
    if (advancedCache.structure[book]) {
        return advancedCache.structure[book][version] || [];
    }
    return [];
}

export function getVerses(book, chapter, version = 'malagasy') {
    const cacheKey = `${version}-${book}-${chapter}`;
    return advancedCache[version][cacheKey] || {};
}

// FONCTION PRINCIPALE DE CHARGEMENT DES VERSETS
export async function loadVerses(book, chapter) {
    if (!book || !chapter) return;

    console.log(`⚡ Chargement optimisé: ${book} chapitre ${chapter}`);
    currentSelectedBook = book;

    showLoadingIndicator();

    try {
        const [malagasyVerses, frenchVerses] = await Promise.all([
            loadVersesFromSupabase(book, chapter, 'malagasy'),
            loadVersesFromSupabase(book, chapter, 'french')
        ]);

        // Stocker dans bibleData pour compatibilité
        if (!bibleData.malagasy[book]) bibleData.malagasy[book] = {};
        if (!bibleData.french[book]) bibleData.french[book] = {};
        
        bibleData.malagasy[book][chapter] = malagasyVerses;
        bibleData.french[book][chapter] = frenchVerses;

        displayVersesWithAlignment('malagasy', malagasyVerses, 'french', frenchVerses, book, chapter);
        
    } catch (error) {
        console.error('Erreur chargement versets:', error);
    } finally {
        hideLoadingIndicator();
        setTimeout(syncScroll, 100);
    }
}

// ... [Les autres fonctions d'affichage restent similaires]

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 DOM chargé - initialisation optimisée');
    initializeApp();
});