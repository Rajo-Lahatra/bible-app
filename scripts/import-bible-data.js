// import-bible-data.js
import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync, existsSync } from 'fs';

// Configuration du chemin pour ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Charger les variables d'environnement depuis le fichier .env
config({ path: join(__dirname, '../.env') });

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.VITE_SUPABASE_SERVICE_KEY;

// Validation des variables d'environnement
if (!SUPABASE_URL) {
    console.error('❌ VITE_SUPABASE_URL manquant');
    console.log('💡 Créez un fichier .env avec:');
    console.log('VITE_SUPABASE_URL=https://votre-projet.supabase.co');
    process.exit(1);
}

if (!SUPABASE_SERVICE_KEY) {
    console.error('❌ VITE_SUPABASE_SERVICE_KEY manquant');
    console.log('💡 Obtenez la clé service role dans:');
    console.log('Supabase > Settings > API > Project API keys');
    console.log('Et ajoutez-la dans .env:');
    console.log('VITE_SUPABASE_SERVICE_KEY=votre_clé_service_role');
    process.exit(1);
}

console.log('✅ Configuration Supabase chargée');
console.log('URL:', SUPABASE_URL.replace(/\.co$/, '.co[...]'));
console.log('Clé:', SUPABASE_SERVICE_KEY.substring(0, 10) + '[...]');

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// Fonction pour parser et importer la Bible malgache
async function importMalagasyBible() {
    console.log('Début de l importation de la Bible malgache...');
    
    const books = [
        "Genesisy", "Eksodosy", "Levitikosy", "Nomery", "Deotoronomia", "Josoa", "Mpitsara", "Rota",
        "I Samoela", "II Samoela", "I Mpanjaka", "II Mpanjaka", "I Tantara", "II Tantara", "Ezra", "Nehemia",
        "Estera", "Joba", "Salamo", "Ohabolana", "Mpitoriteny", "Tonon-kiran'i Solomona", "Isaia", "Jeremia",
        "Fitomaniana", "Ezekiela", "Daniela", "Hosea", "Joela", "Amosa", "Obadia", "Jona", "Mika", "Nahoma",
        "Habakoka", "Zefania", "Hagay", "Zakaria", "Malakia", "Matio", "Marka", "Lioka", "Jaona", 
        "Asan'ny Apostoly", "Romana", "I Korintiana", "II Korintiana", "Galatiana", "Efesiana", "Filipiana", 
        "Kolosiana", "I Tesaloniana", "II Tesaloniana", "I Timoty", "II Timoty", "Titosy", "Filemona", 
        "Hebreo", "Jakoba", "I Petera", "II Petera", "I Jaona", "II Jaona", "III Jaona", "Joda", "Apokalipsy"
    ];

    let totalVerses = 0;

    for (const book of books) {
        try {
            // Chemin vers le fichier malgache
            const filePath = join(__dirname, '../public/data/malagasy-bible', `${book}.txt`);
            
            if (!existsSync(filePath)) {
                console.log(`⚠ Fichier non trouvé: ${book}.txt`);
                continue;
            }

            const text = readFileSync(filePath, 'utf8');
            const verses = parseMalagasyText(text, book);
            
            // Insérer les versets dans Supabase
            for (const [chapter, chapterVerses] of Object.entries(verses)) {
                const verseData = Object.entries(chapterVerses).map(([verse, verseText]) => ({
                    book,
                    chapter: parseInt(chapter),
                    verse: parseInt(verse),
                    text: verseText
                }));

                const { error } = await supabase
                    .from('malagasy_bible_verses')
                    .upsert(verseData, { onConflict: 'book,chapter,verse' });

                if (error) {
                    console.error(`Erreur lors de l'import de ${book} chapitre ${chapter}:`, error);
                } else {
                    totalVerses += verseData.length;
                    console.log(`✓ ${book} chapitre ${chapter}: ${verseData.length} versets importés`);
                }
            }
        } catch (error) {
            console.error(`Erreur avec ${book}:`, error);
        }
    }

    console.log(`Importation malgache terminée: ${totalVerses} versets`);
}

// Fonction pour parser et importer la Bible française
async function importFrenchBible() {
    console.log('Début de l importation de la Bible française...');
    
    try {
        // Chemin vers le fichier français
        const filePath = join(__dirname, '../public/data/french-bible/bible-fr.txt');
        
        if (!existsSync(filePath)) {
            throw new Error(`Fichier non trouvé: ${filePath}`);
        }

        const text = readFileSync(filePath, 'utf8');
        const booksData = parseFrenchBibleText(text);
        
        let totalVerses = 0;

        for (const [frenchBookName, chapters] of Object.entries(booksData)) {
            // Convertir le nom français en nom malgache
            const malagasyBook = convertFrenchToMalagasyBookName(frenchBookName);
            if (!malagasyBook) {
                console.log(`Livre non mappé: ${frenchBookName}`);
                continue;
            }

            for (const [chapter, verses] of Object.entries(chapters)) {
                const verseData = Object.entries(verses).map(([verse, verseText]) => ({
                    book: malagasyBook,
                    chapter: parseInt(chapter),
                    verse: parseInt(verse),
                    text: verseText
                }));

                const { error } = await supabase
                    .from('french_bible_verses')
                    .upsert(verseData, { onConflict: 'book,chapter,verse' });

                if (error) {
                    console.error(`Erreur lors de l'import de ${malagasyBook} chapitre ${chapter}:`, error);
                } else {
                    totalVerses += verseData.length;
                    console.log(`✓ ${malagasyBook} (${frenchBookName}) chapitre ${chapter}: ${verseData.length} versets importés`);
                }
            }
        }

        console.log(`Importation française terminée: ${totalVerses} versets`);
    } catch (error) {
        console.error('Erreur lors de l importation française:', error);
    }
}

// Fonction pour parser le texte malgache
function parseMalagasyText(text, bookName) {
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

// Fonction pour parser le texte français
function parseFrenchBibleText(text) {
    const books = {};
    const lines = text.split('\n');
    
    let currentBook = null;
    let currentChapter = null;
    let currentVerse = null;
    let currentText = '';
    
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i].trim();
        if (!line) continue;

        // Détection des livres
        const bookMatch = detectBookName(line);
        if (bookMatch) {
            if (currentBook && currentChapter !== null && currentVerse !== null && currentText) {
                saveVerse(books, currentBook, currentChapter, currentVerse, currentText);
                currentText = '';
            }
            
            currentBook = bookMatch;
            currentChapter = null;
            currentVerse = null;
            if (!books[currentBook]) {
                books[currentBook] = {};
            }
            continue;
        }

        // Détection des chapitres
        let chapterMatch = line.match(/^Chapitre\s+(\d+)/i);
        if (!chapterMatch) {
            chapterMatch = line.match(/^Psaume\s+(\d+)/i);
        }
        if (chapterMatch) {
            if (currentBook && currentChapter !== null && currentVerse !== null && currentText) {
                saveVerse(books, currentBook, currentChapter, currentVerse, currentText);
                currentText = '';
            }
            
            currentChapter = parseInt(chapterMatch[1]);
            currentVerse = null;
            if (!books[currentBook][currentChapter]) {
                books[currentBook][currentChapter] = {};
            }
            continue;
        }

        // Détection des versets
        const verseMatch = line.match(/^(\d+)\s*(¶)?\s*(.*)$/);
        if (verseMatch && currentBook && currentChapter !== null) {
            if (currentVerse !== null && currentText) {
                saveVerse(books, currentBook, currentChapter, currentVerse, currentText);
                currentText = '';
            }
            
            currentVerse = parseInt(verseMatch[1]);
            currentText = verseMatch[3].trim();
        } else if (currentBook && currentChapter !== null && currentVerse !== null && line) {
            if (currentText) currentText += ' ';
            currentText += line;
        }
    }

    if (currentBook && currentChapter !== null && currentVerse !== null && currentText) {
        saveVerse(books, currentBook, currentChapter, currentVerse, currentText);
    }

    return books;
}

function detectBookName(line) {
    const bookNames = [
        "Genèse", "Exode", "Lévitique", "Nombres", "Deutéronome", "Josué", "Juges", "Ruth",
        "1 Samuel", "2 Samuel", "1 Rois", "2 Rois", "1 Chroniques", "2 Chroniques", "Esdras", "Néhémie",
        "Esther", "Job", "Psaumes", "Proverbes", "Ecclésiaste", "Cantique des Cantiques", "Ésaïe", "Jérémie",
        "Lamentations", "Ézéchiel", "Daniel", "Osée", "Joël", "Amos", "Abdias", "Jonas", "Michée", "Nahum",
        "Habacuc", "Sophonie", "Aggée", "Zacharie", "Malachie", "Matthieu", "Marc", "Luc", "Jean", 
        "Actes", "Romains", "1 Corinthiens", "2 Corinthiens", "Galates", "Éphésiens", "Philippiens", 
        "Colossiens", "1 Thessaloniciens", "2 Thessaloniciens", "1 Timothée", "2 Timothée", "Tite", 
        "Philémon", "Hébreux", "Jacques", "1 Pierre", "2 Pierre", "1 Jean", "2 Jean", "3 Jean", "Jude", "Apocalypse"
    ];

    for (const bookName of bookNames) {
        if (line === bookName) {
            return bookName;
        }
    }
    return null;
}

function saveVerse(books, book, chapter, verse, text) {
    if (!books[book][chapter]) {
        books[book][chapter] = {};
    }
    books[book][chapter][verse] = text.replace(/\s+/g, ' ').trim();
}

function convertFrenchToMalagasyBookName(frenchName) {
    const mapping = {
        "Genèse": "Genesisy", "Exode": "Eksodosy", "Lévitique": "Levitikosy", "Nombres": "Nomery",
        "Deutéronome": "Deotoronomia", "Josué": "Josoa", "Juges": "Mpitsara", "Ruth": "Rota",
        "1 Samuel": "I Samoela", "2 Samuel": "II Samoela", "1 Rois": "I Mpanjaka", "2 Rois": "II Mpanjaka",
        "1 Chroniques": "I Tantara", "2 Chroniques": "II Tantara", "Esdras": "Ezra", "Néhémie": "Nehemia",
        "Esther": "Estera", "Job": "Joba", "Psaumes": "Salamo", "Proverbes": "Ohabolana",
        "Ecclésiaste": "Mpitoriteny", "Cantique des Cantiques": "Tonon-kiran'i Solomona",
        "Ésaïe": "Isaia", "Jérémie": "Jeremia", "Lamentations": "Fitomaniana", "Ézéchiel": "Ezekiela",
        "Daniel": "Daniela", "Osée": "Hosea", "Joël": "Joela", "Amos": "Amosa", "Abdias": "Obadia",
        "Jonas": "Jona", "Michée": "Mika", "Nahum": "Nahoma", "Habacuc": "Habakoka", "Sophonie": "Zefania",
        "Aggée": "Hagay", "Zacharie": "Zakaria", "Malachie": "Malakia", "Matthieu": "Matio",
        "Marc": "Marka", "Luc": "Lioka", "Jean": "Jaona", "Actes": "Asan'ny Apostoly", "Romains": "Romana",
        "1 Corinthiens": "I Korintiana", "2 Corinthiens": "II Korintiana", "Galates": "Galatiana",
        "Éphésiens": "Efesiana", "Philippiens": "Filipiana", "Colossiens": "Kolosiana",
        "1 Thessaloniciens": "I Tesaloniana", "2 Thessaloniciens": "II Tesaloniana",
        "1 Timothée": "I Timoty", "2 Timothée": "II Timoty", "Tite": "Titosy", "Philémon": "Filemona",
        "Hébreux": "Hebreo", "Jacques": "Jakoba", "1 Pierre": "I Petera", "2 Pierre": "II Petera",
        "1 Jean": "I Jaona", "2 Jean": "II Jaona", "3 Jean": "III Jaona", "Jude": "Joda", "Apocalypse": "Apokalipsy"
    };
    
    return mapping[frenchName];
}

// Exécuter l'importation
async function main() {
    try {
        console.log('🚀 Début de l\'importation des données bibliques...');
        await importMalagasyBible();
        await importFrenchBible();
        console.log('✅ Importation terminée avec succès !');
    } catch (error) {
        console.error('❌ Erreur lors de l\'importation:', error);
    }
}

main().catch(console.error);