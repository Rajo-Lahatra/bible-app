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