// scripts/check-psalms.js
import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

config({ path: join(__dirname, '../.env') });

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.VITE_SUPABASE_SERVICE_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

async function checkPsalms() {
    console.log('🔍 Vérification détaillée des Psaumes dans la base de données...\n');
    
    // Vérifier la Bible malgache
    console.log('📖 Vérification de la Bible malgache (Salamo)...');
    const { data: mgData, error: mgError } = await supabase
        .from('malagasy_bible_verses')
        .select('chapter, verse')
        .eq('book', 'Salamo')
        .order('chapter')
        .order('verse');

    if (mgError) {
        console.error('❌ Erreur malgache:', mgError);
    } else {
        const mgChapters = [...new Set(mgData.map(row => row.chapter))].sort((a, b) => a - b);
        console.log(`✅ Bible malgache (Salamo): ${mgChapters.length} chapitres trouvés`);
        
        // Analyser chaque chapitre
        const chapterStats = {};
        mgChapters.forEach(chapter => {
            const verses = mgData.filter(row => row.chapter === chapter);
            chapterStats[chapter] = verses.length;
        });
        
        console.log(`📊 Statistiques par chapitre (premiers 10):`);
        Object.keys(chapterStats).slice(0, 10).forEach(chapter => {
            console.log(`   Chapitre ${chapter}: ${chapterStats[chapter]} versets`);
        });
        
        if (mgChapters.length > 10) {
            console.log(`   ... et ${mgChapters.length - 10} autres chapitres`);
        }
        
        console.log(`🔍 Premier chapitre: ${mgChapters[0]}, Dernier: ${mgChapters[mgChapters.length - 1]}`);
        
        // Vérifier les chapitres manquants
        const missingChapters = [];
        for (let i = 1; i <= 150; i++) {
            if (!mgChapters.includes(i)) {
                missingChapters.push(i);
            }
        }
        
        if (missingChapters.length > 0) {
            console.log(`❌ Chapitres manquants: ${missingChapters.join(', ')}`);
        } else {
            console.log(`✅ Tous les 150 chapitres sont présents !`);
        }
    }
    
    console.log('\n' + '='.repeat(50) + '\n');
    
    // Vérifier la Bible française
    console.log('📖 Vérification de la Bible française (Salamo)...');
    const { data: frData, error: frError } = await supabase
        .from('french_bible_verses')
        .select('chapter, verse')
        .eq('book', 'Salamo')
        .order('chapter')
        .order('verse');

    if (frError) {
        console.error('❌ Erreur française:', frError);
    } else {
        const frChapters = [...new Set(frData.map(row => row.chapter))].sort((a, b) => a - b);
        console.log(`✅ Bible française (Salamo): ${frChapters.length} chapitres trouvés`);
        
        // Vérifier les chapitres manquants
        const missingChapters = [];
        for (let i = 1; i <= 150; i++) {
            if (!frChapters.includes(i)) {
                missingChapters.push(i);
            }
        }
        
        if (missingChapters.length > 0) {
            console.log(`❌ Chapitres manquants: ${missingChapters.join(', ')}`);
        } else {
            console.log(`✅ Tous les 150 chapitres sont présents !`);
        }
    }
    
    // Vérification spécifique des chapitres problématiques
    console.log('\n🔍 Vérification des chapitres 69-71...');
    for (let chapter of [69, 70, 71]) {
        const { data: verses, error } = await supabase
            .from('malagasy_bible_verses')
            .select('verse, text')
            .eq('book', 'Salamo')
            .eq('chapter', chapter)
            .order('verse');
            
        if (error) {
            console.error(`❌ Erreur chapitre ${chapter}:`, error);
        } else {
            console.log(`✅ Psaume ${chapter}: ${verses.length} versets trouvés`);
        }
    }
}

checkPsalms().catch(console.error);