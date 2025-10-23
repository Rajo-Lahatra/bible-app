// bible-data.js
import { initSupabase } from './supabase-client.js';

let supabase;

export async function initializeApp() {
    try {
        supabase = await initSupabase();
        console.log('✅ Bible data initialized from Supabase');
        return true;
    } catch (error) {
        console.error('❌ Error initializing Bible data:', error);
        return false;
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

export function setDisplayMode(mode) {
    // Votre code existant pour setDisplayMode
    const container = document.querySelector('.bible-container');
    if (!container) return;

    container.className = 'bible-container';
    
    switch (mode) {
        case 'both':
            container.classList.add('both-columns');
            break;
        case 'malagasy-only':
            container.classList.add('single-column');
            document.getElementById('malagasy-column').classList.add('active');
            break;
        case 'french-only':
            container.classList.add('single-column');
            document.getElementById('french-column').classList.add('active');
            break;
    }

    // Sauvegarder la préférence
    localStorage.setItem('displayMode', mode);
    
    // Mettre à jour les boutons
    document.querySelectorAll('.display-mode-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-mode="${mode}"]`).classList.add('active');
}

export function getDisplayMode() {
    return localStorage.getItem('displayMode') || 'both';
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