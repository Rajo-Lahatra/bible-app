// bible-data.js
import { initSupabase } from './supabase-client.js';

let supabase;
let currentBook = '';
let currentChapter = '';

export async function initializeApp() {
    try {
        supabase = await initSupabase();
        console.log('✅ Bible data initialized from Supabase');
        
        // Initialiser le défilement synchronisé après le chargement
        setTimeout(() => {
            setupScrollSync();
        }, 1000);
        
        return true;
    } catch (error) {
        console.error('❌ Error initializing Bible data:', error);
        return false;
    }
}

// NOUVELLE FONCTION : Défilement synchronisé
let isScrolling = false;

export function setupScrollSync() {
    const malagasyContainer = document.getElementById('malagasy-verses');
    const frenchContainer = document.getElementById('french-verses');

    if (!malagasyContainer || !frenchContainer) {
        console.log('Conteneurs de versets non trouvés, réessai dans 500ms...');
        setTimeout(setupScrollSync, 500);
        return;
    }

    // Supprimer les écouteurs existants pour éviter les doublons
    malagasyContainer.removeEventListener('scroll', handleMalagasyScroll);
    frenchContainer.removeEventListener('scroll', handleFrenchScroll);

    function handleMalagasyScroll() {
        if (isScrolling) return;
        isScrolling = true;
        
        const scrollPercent = malagasyContainer.scrollTop / (malagasyContainer.scrollHeight - malagasyContainer.clientHeight);
        frenchContainer.scrollTop = scrollPercent * (frenchContainer.scrollHeight - frenchContainer.clientHeight);
        
        setTimeout(() => {
            isScrolling = false;
        }, 50);
    }

    function handleFrenchScroll() {
        if (isScrolling) return;
        isScrolling = true;
        
        const scrollPercent = frenchContainer.scrollTop / (frenchContainer.scrollHeight - frenchContainer.clientHeight);
        malagasyContainer.scrollTop = scrollPercent * (malagasyContainer.scrollHeight - malagasyContainer.clientHeight);
        
        setTimeout(() => {
            isScrolling = false;
        }, 50);
    }

    // Ajouter les écouteurs d'événements
    malagasyContainer.addEventListener('scroll', handleMalagasyScroll);
    frenchContainer.addEventListener('scroll', handleFrenchScroll);
    
    console.log('✅ Scroll synchronisé activé');
}

// FONCTION AMÉLIORÉE : Gestion des modes d'affichage
export function setDisplayMode(mode) {
    const container = document.querySelector('.bible-container');
    if (!container) {
        console.error('Conteneur Bible non trouvé');
        return;
    }

    // Réinitialiser toutes les classes
    container.className = 'bible-container';
    
    const malagasyColumn = document.getElementById('malagasy-column');
    const frenchColumn = document.getElementById('french-column');
    
    if (!malagasyColumn || !frenchColumn) {
        console.error('Colonnes non trouvées');
        return;
    }

    // Réinitialiser l'affichage des colonnes
    malagasyColumn.style.display = 'flex';
    malagasyColumn.style.flex = '1';
    malagasyColumn.style.width = 'auto';
    
    frenchColumn.style.display = 'flex';
    frenchColumn.style.flex = '1';
    frenchColumn.style.width = 'auto';

    switch (mode) {
        case 'both':
            container.style.flexDirection = 'row';
            // Les deux colonnes côte à côte
            malagasyColumn.style.display = 'flex';
            frenchColumn.style.display = 'flex';
            break;
            
        case 'malagasy-only':
            container.style.flexDirection = 'column';
            // Seulement malgache
            malagasyColumn.style.display = 'flex';
            malagasyColumn.style.width = '100%';
            frenchColumn.style.display = 'none';
            break;
            
        case 'french-only':
            container.style.flexDirection = 'column';
            // Seulement français
            frenchColumn.style.display = 'flex';
            frenchColumn.style.width = '100%';
            malagasyColumn.style.display = 'none';
            break;
    }

    // Sauvegarder la préférence
    localStorage.setItem('displayMode', mode);
    
    // Mettre à jour les boutons
    document.querySelectorAll('.display-mode-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    const activeButton = document.querySelector(`[data-mode="${mode}"]`);
    if (activeButton) {
        activeButton.classList.add('active');
    }
    
    console.log(`✅ Mode d'affichage changé: ${mode}`);
    
    // Réinitialiser le défilement synchronisé si on revient en mode both
    if (mode === 'both') {
        setTimeout(() => {
            setupScrollSync();
        }, 100);
    }
}

export function getDisplayMode() {
    return localStorage.getItem('displayMode') || 'both';
}

// FONCTION POUR METTRE À JOUR LES EN-TÊTES
export function updateColumnHeaders(book, chapter) {
    currentBook = book;
    currentChapter = chapter;
    
    const malagasyHeader = document.querySelector('#malagasy-column .column-header h3');
    const frenchHeader = document.querySelector('#french-column .column-header h3');
    
    if (malagasyHeader && book && chapter) {
        const bookNameMalagasy = bookNames.malagasy[book] || book;
        malagasyHeader.textContent = `${bookNameMalagasy} ${chapter} - Bible Malgache`;
    }
    
    if (frenchHeader && book && chapter) {
        const bookNameFrench = bookNames.french[book] || book;
        frenchHeader.textContent = `${bookNameFrench} ${chapter} - Bible Française (LSG)`;
    }
}

export async function getVerses(book, chapter, language) {
    if (!supabase) {
        await initializeApp();
    }

    try {
        const tableName = language === 'malagasy' ? 'malagasy_bible_verses' : 'french_bible_verses';
        
        const { data, error } = await supabase
            .from(tableName)
            .select('verse, text')
            .eq('book', book)
            .eq('chapter', chapter)
            .order('verse');

        if (error) {
            console.error(`Error fetching ${language} verses for ${book} ${chapter}:`, error);
            return {};
        }

        // Convertir le format de données
        const verses = {};
        if (data) {
            data.forEach(row => {
                verses[row.verse] = row.text;
            });
        }

        console.log(`✅ Loaded ${Object.keys(verses).length} ${language} verses for ${book} ${chapter}`);
        return verses;

    } catch (error) {
        console.error(`Error in getVerses for ${book} ${chapter} (${language}):`, error);
        return {};
    }
}

// Fonctions utilitaires pour les noms de livres
export const bookNames = {
    french: {
        'Genesisy': 'Genèse',
        'Eksodosy': 'Exode',
        'Levitikosy': 'Lévitique',
        'Nomery': 'Nombres',
        'Deotoronomia': 'Deutéronome',
        'Josoa': 'Josué',
        'Mpitsara': 'Juges',
        'Rota': 'Ruth',
        'I Samoela': '1 Samuel',
        'II Samoela': '2 Samuel',
        'I Mpanjaka': '1 Rois',
        'II Mpanjaka': '2 Rois',
        'I Tantara': '1 Chroniques',
        'II Tantara': '2 Chroniques',
        'Ezra': 'Esdras',
        'Nehemia': 'Néhémie',
        'Estera': 'Esther',
        'Joba': 'Job',
        'Salamo': 'Psaumes',
        'Ohabolana': 'Proverbes',
        'Mpitoriteny': 'Ecclésiaste',
        'Tonon-kiran\'i Solomona': 'Cantique des Cantiques',
        'Isaia': 'Ésaïe',
        'Jeremia': 'Jérémie',
        'Fitomaniana': 'Lamentations',
        'Ezekiela': 'Ézéchiel',
        'Daniela': 'Daniel',
        'Hosea': 'Osée',
        'Joela': 'Joël',
        'Amosa': 'Amos',
        'Obadia': 'Abdias',
        'Jona': 'Jonas',
        'Mika': 'Michée',
        'Nahoma': 'Nahum',
        'Habakoka': 'Habacuc',
        'Zefania': 'Sophonie',
        'Hagay': 'Aggée',
        'Zakaria': 'Zacharie',
        'Malakia': 'Malachie',
        'Matio': 'Matthieu',
        'Marka': 'Marc',
        'Lioka': 'Luc',
        'Jaona': 'Jean',
        'Asan\'ny Apostoly': 'Actes',
        'Romana': 'Romains',
        'I Korintiana': '1 Corinthiens',
        'II Korintiana': '2 Corinthiens',
        'Galatiana': 'Galates',
        'Efesiana': 'Éphésiens',
        'Filipiana': 'Philippiens',
        'Kolosiana': 'Colossiens',
        'I Tesaloniana': '1 Thessaloniciens',
        'II Tesaloniana': '2 Thessaloniciens',
        'I Timoty': '1 Timothée',
        'II Timoty': '2 Timothée',
        'Titosy': 'Tite',
        'Filemona': 'Philémon',
        'Hebreo': 'Hébreux',
        'Jakoba': 'Jacques',
        'I Petera': '1 Pierre',
        'II Petera': '2 Pierre',
        'I Jaona': '1 Jean',
        'II Jaona': '2 Jean',
        'III Jaona': '3 Jean',
        'Joda': 'Jude',
        'Apokalipsy': 'Apocalypse'
    },
    malagasy: {
        'Genesisy': 'Genesisy',
        'Eksodosy': 'Eksodosy',
        'Levitikosy': 'Levitikosy',
        'Nomery': 'Nomery',
        'Deotoronomia': 'Deotoronomia',
        'Josoa': 'Josoa',
        'Mpitsara': 'Mpitsara',
        'Rota': 'Rota',
        'I Samoela': 'I Samoela',
        'II Samoela': 'II Samoela',
        'I Mpanjaka': 'I Mpanjaka',
        'II Mpanjaka': 'II Mpanjaka',
        'I Tantara': 'I Tantara',
        'II Tantara': 'II Tantara',
        'Ezra': 'Ezra',
        'Nehemia': 'Nehemia',
        'Estera': 'Estera',
        'Joba': 'Joba',
        'Salamo': 'Salamo',
        'Ohabolana': 'Ohabolana',
        'Mpitoriteny': 'Mpitoriteny',
        'Tonon-kiran\'i Solomona': 'Tonon-kiran\'i Solomona',
        'Isaia': 'Isaia',
        'Jeremia': 'Jeremia',
        'Fitomaniana': 'Fitomaniana',
        'Ezekiela': 'Ezekiela',
        'Daniela': 'Daniela',
        'Hosea': 'Hosea',
        'Joela': 'Joela',
        'Amosa': 'Amosa',
        'Obadia': 'Obadia',
        'Jona': 'Jona',
        'Mika': 'Mika',
        'Nahoma': 'Nahoma',
        'Habakoka': 'Habakoka',
        'Zefania': 'Zefania',
        'Hagay': 'Hagay',
        'Zakaria': 'Zakaria',
        'Malakia': 'Malakia',
        'Matio': 'Matio',
        'Marka': 'Marka',
        'Lioka': 'Lioka',
        'Jaona': 'Jaona',
        'Asan\'ny Apostoly': 'Asan\'ny Apostoly',
        'Romana': 'Romana',
        'I Korintiana': 'I Korintiana',
        'II Korintiana': 'II Korintiana',
        'Galatiana': 'Galatiana',
        'Efesiana': 'Efesiana',
        'Filipiana': 'Filipiana',
        'Kolosiana': 'Kolosiana',
        'I Tesaloniana': 'I Tesaloniana',
        'II Tesaloniana': 'II Tesaloniana',
        'I Timoty': 'I Timoty',
        'II Timoty': 'II Timoty',
        'Titosy': 'Titosy',
        'Filemona': 'Filemona',
        'Hebreo': 'Hebreo',
        'Jakoba': 'Jakoba',
        'I Petera': 'I Petera',
        'II Petera': 'II Petera',
        'I Jaona': 'I Jaona',
        'II Jaona': 'II Jaona',
        'III Jaona': 'III Jaona',
        'Joda': 'Joda',
        'Apokalipsy': 'Apokalipsy'
    }
};

export const books = [
    'Genesisy', 'Eksodosy', 'Levitikosy', 'Nomery', 'Deotoronomia', 'Josoa', 'Mpitsara', 'Rota',
    'I Samoela', 'II Samoela', 'I Mpanjaka', 'II Mpanjaka', 'I Tantara', 'II Tantara', 'Ezra', 'Nehemia',
    'Estera', 'Joba', 'Salamo', 'Ohabolana', 'Mpitoriteny', 'Tonon-kiran\'i Solomona', 'Isaia', 'Jeremia',
    'Fitomaniana', 'Ezekiela', 'Daniela', 'Hosea', 'Joela', 'Amosa', 'Obadia', 'Jona', 'Mika', 'Nahoma',
    'Habakoka', 'Zefania', 'Hagay', 'Zakaria', 'Malakia', 'Matio', 'Marka', 'Lioka', 'Jaona', 
    'Asan\'ny Apostoly', 'Romana', 'I Korintiana', 'II Korintiana', 'Galatiana', 'Efesiana', 'Filipiana', 
    'Kolosiana', 'I Tesaloniana', 'II Tesaloniana', 'I Timoty', 'II Timoty', 'Titosy', 'Filemona', 
    'Hebreo', 'Jakoba', 'I Petera', 'II Petera', 'I Jaona', 'II Jaona', 'III Jaona', 'Joda', 'Apokalipsy'
];

export async function getChapters(book, language) {
    if (!supabase) {
        await initializeApp();
    }

    try {
        const tableName = language === 'malagasy' ? 'malagasy_bible_verses' : 'french_bible_verses';
        
        const { data, error } = await supabase
            .from(tableName)
            .select('chapter')
            .eq('book', book)
            .order('chapter');

        if (error) {
            console.error(`Error fetching chapters for ${book} (${language}):`, error);
            return [];
        }

        // Extraire les chapitres uniques
        const chapters = [...new Set(data.map(row => row.chapter))].sort((a, b) => a - b);
        console.log(`✅ Found ${chapters.length} chapters for ${book} (${language})`);
        return chapters;

    } catch (error) {
        console.error(`Error in getChapters for ${book} (${language}):`, error);
        return [];
    }
}

// Fonction pour obtenir le livre et chapitre actuels
export function getCurrentBook() {
    return currentBook;
}

export function getCurrentChapter() {
    return currentChapter;
}