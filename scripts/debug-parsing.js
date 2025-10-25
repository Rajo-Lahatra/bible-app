// scripts/debug-parsing.js
import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function debugParsing() {
    console.log('🔍 Debug du parsing du fichier source...\n');
    
    try {
        const filePath = join(__dirname, '../public/data/malagasy-bible/bible-mg.txt');
        
        if (!existsSync(filePath)) {
            console.error('❌ Fichier source non trouvé:', filePath);
            return;
        }

        const text = readFileSync(filePath, 'utf8');
        const lines = text.split('\n');
        
        console.log(`📄 Total de lignes dans le fichier: ${lines.length}`);
        
        // Trouver la section Salamo
        let inSalamo = false;
        let salamoStart = -1;
        let salamoEnd = -1;
        let salamoLines = [];
        
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            
            if (line === 'Salamo.txt') {
                inSalamo = true;
                salamoStart = i;
                console.log(`📖 Début de Salamo détecté à la ligne ${i}`);
                continue;
            }
            
            if (inSalamo) {
                if (line.endsWith('.txt') && line !== 'Salamo.txt') {
                    salamoEnd = i;
                    console.log(`📖 Fin de Salamo détecté à la ligne ${i} (début de: ${line})`);
                    inSalamo = false;
                    break;
                }
                salamoLines.push({ lineNumber: i, content: line });
            }
        }
        
        console.log(`\n🔍 Section Salamo: lignes ${salamoStart} à ${salamoEnd}`);
        console.log(`📝 Nombre de lignes dans Salamo: ${salamoLines.length}`);
        
        // Analyser les références dans Salamo
        console.log('\n🔍 Analyse des références dans Salamo:');
        const chaptersFound = new Set();
        
        salamoLines.forEach(({ lineNumber, content }) => {
            if (!content) return;
            
            const verseMatch = content.match(/«\s*(.*?)\s*»\s*\(([^)]+)\)/);
            if (verseMatch) {
                const reference = verseMatch[2];
                const refMatch = reference.match(/(\w+)\s+(\d+):(\d+)/);
                if (refMatch) {
                    const book = refMatch[1];
                    const chapter = parseInt(refMatch[2]);
                    const verse = parseInt(refMatch[3]);
                    
                    if (book === 'Salamo') {
                        chaptersFound.add(chapter);
                    }
                }
            }
        });
        
        const sortedChapters = Array.from(chaptersFound).sort((a, b) => a - b);
        console.log(`\n📖 Chapitres de Salamo détectés dans le fichier source: ${sortedChapters.length}`);
        console.log(`📋 Chapitres: ${sortedChapters.join(', ')}`);
        console.log(`🔍 Premier: ${sortedChapters[0]}, Dernier: ${sortedChapters[sortedChapters.length - 1]}`);
        
        // Vérifier les chapitres manquants
        const missingChapters = [];
        for (let i = 1; i <= 150; i++) {
            if (!sortedChapters.includes(i)) {
                missingChapters.push(i);
            }
        }
        
        if (missingChapters.length > 0) {
            console.log(`\n❌ CHAPITRES MANQUANTS DANS LE FICHIER SOURCE: ${missingChapters.length}`);
            console.log(`📝 Manquants: ${missingChapters.join(', ')}`);
        } else {
            console.log(`\n✅ Tous les 150 Psaumes sont présents dans le fichier source !`);
        }
        
    } catch (error) {
        console.error('❌ Erreur lors du debug:', error);
    }
}

debugParsing();