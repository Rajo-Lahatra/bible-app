import { bookNames, getVerses } from './bible-data.js';

let bibleAppInstance = null;

// Dictionnaire bilingue - Déplacé AVANT les classes
const TDICT = {
    mg: {
        uiTitle: "Générateur de plan d'homélie (Toriteny)",
        uiLangLabel: "Langue des amorces :",
        uiLangMg: "Malagasy",
        uiLangFr: "Français",
        uiPericope: "Perikopa (référence à annoncer – (AVERINA INDROA))",
        uiSummary: "Résumé (1–2 phrases)",
        uiNotesSummary: "Petite phrase intercalée entre les vérités en conclusion (fitaomana, fampiheritreretana, kristolojia, andinin-tsoratra masina, tonon-kira…).",
        uiAddTruth: "+ Ajouter une Fahamarinana",
        uiGenerate: "Générer le plan",
        uiResult: "Résultat",
        uiCopyMd: "Copier (Markdown)",
        uiDlTxt: "Télécharger .txt",
        uiDlHtml: "Télécharger .html",

        introGreeting: "Ho aminareo anie ny fahasoavana sy ny fiadanana avy amin'Andriamanitra Ray sy Jesoa Kristy Tompo. Amen.",
        introPericopeLead: "Ny tenin'Andriamanitra izay angalantsika ny hafatra anio dia voasoratra ao amin'ny",
        introPericopeRepeat: "(AVERINA INDROA)",
        introSummaryLead: "Ity soratra masina ity dia miresaka indrindra ny",

        truthTitle: (i) => `Fahamarinana ${i}`,
        truthLead: (i) => i === 1 
            ? "Ny fahamarinana voalohany hitantsika eto ry havana dia izao (averina in-2):"
            : "Ny fahamarinana manaraka hitantsika eto ry havana dia izao (averina in-2):",
        verseLead: "Hitantsika izany eo amin'ny andininy faha",
        explainLead: "Eto, ry havana, dia hitantsika fa",
        appLead: "Inona ary no lesona azontsika tsoahina avy amin'izany?",
        appDimsLabel: "Dimensions (D1/D2/D3)",
        reflectLead: "Ny fanontaniana mipetraka amiko sy aminao ary dia izao:",
        exhortLead: "Mitaona anao aho, ry havana,",
        christLead: "Ny vaovao mahafaly ho antsika ry havana dia izao:",

        conclTitle: "Famaranana",
        conclLead: "Raha fintinina izay rehetra voambara teo ry havana dia hitantsika teo fa:",
        gloria: "Ho an'Andriamanitra irery ihany ny voninahitra, Amen!",

        lblKey: "Déclaration (Key statement) *",
        phKey: "Atomboka amin'ny hoe: Ny fahamarinana ... dia izao (averina in-2)",
        lblVerses: "Andininy (référence(s))",
        phVerses: "Oh: Zak. 8:1-8 / Mat. 5:3-10",
        lblExplain: "Fanazavana (40%)",
        phExplain: "Eto, ry havana, dia hitantsika fa ... (konteksta, teny loham-pahamarinana, sary ... )",
        lblApp: (d) => `Fampiharana – ${d} (50%)`,
        phD1: "D1 (oh: izaho/ankohonana/asa…)",
        phD2: "D2",
        phD3: "D3",
        lblReflect: "Fampiheritreretana",
        phReflect: "Ny fanontaniana mipetraka amiko sy aminao ary dia izao …",
        lblExhort: "Fitaomana",
        phExhort: "Mitaona anao aho, ry havana, …",
        lblChrist: "Kristolojia",
        phChrist: "Ny vaovao mahafaly ho antsika ry havana dia izao … (fahasoavana, vahaolana, en Kristo)",

        actUp: "▲",
        actDown: "▼",
        actRemove: "Supprimer",

        lblExplainOut: "Fanazavana :",
        lblAppOut: "Fampiharana :",
        lblReflectOut: "Fampiheritreretana :",
        lblExhortOut: "Fitaomana :",
        lblChristOut: "Kristolojia :",
        lblVersesOut: "Andininy :",
    },

    fr: {
        uiTitle: "Générateur de plan d'homélie",
        uiLangLabel: "Langue des amorces :",
        uiLangMg: "Malagasy",
        uiLangFr: "Français",
        uiPericope: "Péricope (référence à annoncer – (ANNONCER DEUX FOIS))",
        uiSummary: "Résumé (1–2 phrases)",
        uiNotesSummary: "Petite phrase intercalée entre les vérités en conclusion (exhortation, réflexion, christologie, verset, cantique…).",
        uiAddTruth: "+ Ajouter une vérité",
        uiGenerate: "Générer le plan",
        uiResult: "Résultat",
        uiCopyMd: "Copier (Markdown)",
        uiDlTxt: "Télécharger .txt",
        uiDlHtml: "Télécharger .html",

        introGreeting: "Que la grâce et la paix vous soient données de la part de Dieu notre Père et du Seigneur Jésus-Christ. Amen.",
        introPericopeLead: "La Parole de Dieu qui porte notre message aujourd'hui est écrite dans",
        introPericopeRepeat: "(ANNONCER DEUX FOIS)",
        introSummaryLead: "Ce passage parle principalement de",

        truthTitle: (i) => `Vérité ${i}`,
        truthLead: (i) => i === 1
            ? "La première vérité que nous voyons ici, chers frères et sœurs, est la suivante (à répéter 2×) :"
            : "La vérité suivante que nous voyons est la suivante (à répéter 2×) :",
        verseLead: "Nous le voyons au verset",
        explainLead: "Ici, nous constatons que",
        appLead: "Quelle leçon concrète pouvons-nous en tirer ?",
        appDimsLabel: "Dimensions (D1/D2/D3)",
        reflectLead: "La question qui s'impose à vous et à moi est la suivante :",
        exhortLead: "Je vous exhorte, chers frères et sœurs, à",
        christLead: "La Bonne Nouvelle pour nous aujourd'hui est la suivante :",

        conclTitle: "Conclusion",
        conclLead: "En résumé, nous avons vu que :",
        gloria: "À Dieu seul soit la gloire. Amen !",

        lblKey: "Déclaration (énoncé clé) *",
        phKey: "Commencez par : La première vérité que nous voyons… (à répéter 2×)",
        lblVerses: "Verset(s) (référence)",
        phVerses: "Ex : Za 8:1-8 / Mt 5:3-10",
        lblExplain: "Explication (40 %)",
        phExplain: "Ici, nous constatons que … (contexte, mot-clé, illustration)",
        lblApp: (d) => `Application – ${d} (50 %)`,
        phD1: "D1 (ex : moi/famille/travail…)",
        phD2: "D2",
        phD3: "D3",
        lblReflect: "Réflexion",
        phReflect: "La question qui s'impose à vous et à moi est la suivante …",
        lblExhort: "Exhortation",
        phExhort: "Je vous exhorte à …",
        lblChrist: "Christologie",
        phChrist: "La Bonne Nouvelle pour nous aujourd'hui est … (grâce, solution, en Christ)",

        actUp: "▲",
        actDown: "▼",
        actRemove: "Supprimer",

        lblExplainOut: "Explication :",
        lblAppOut: "Application :",
        lblReflectOut: "Réflexion :",
        lblExhortOut: "Exhortation :",
        lblChristOut: "Christologie :",
        lblVersesOut: "Verset(s) :",
    }
};

export function initHomilyGenerator(appInstance) {
    bibleAppInstance = appInstance;
    HomilyGenerator.init();
}

class HomilyGenerator {
    static init() {
        const homilyContainer = document.getElementById('homily-generator');
        if (!homilyContainer) return;

        if (homilyContainer.dataset.initialized) return;
        homilyContainer.dataset.initialized = 'true';

        new HomilyGeneratorUI();
    }
}

class HomilyGeneratorUI {
    constructor() {
        this.state = {
            lang: "mg",
            pericopeRef: "",
            pericopeSummary: "",
            truths: [this.emptyTruth(1), this.emptyTruth(2)],
            conclusionNotes: "",
        };
        
        this.currentVerseTarget = null;
        this.initUI();
    }

    emptyTruth(i = 1) {
        const t = this.T();
        return {
            title: t.truthTitle(i),
            keyStatement: "",
            versesRef: "",
            explanation: "",
            appD1: "",
            appD2: "",
            appD3: "",
            reflection: "",
            exhortation: "",
            christology: "",
        };
    }

    T() {
        return TDICT[this.state.lang];
    }

    initUI() {
        const homilyContainer = document.getElementById('homily-generator');
        homilyContainer.innerHTML = this.getTemplate();
        
        this.bindEvents();
        this.rerenderTruths();
    }

    getTemplate() {
        const t = this.T();
        return `
            <div class="homily-generator">
                <h2>${t.uiTitle}</h2>

                <div class="lang-switch">
                    <label for="langSelect">${t.uiLangLabel}</label>
                    <select id="langSelect" class="inp">
                        <option value="mg">${t.uiLangMg}</option>
                        <option value="fr">${t.uiLangFr}</option>
                    </select>
                </div>

                <div class="grid2">
                    <label>
                        ${t.uiPericope}
                        <input id="pericopeRef" class="inp" placeholder="${t.phVerses}" />
                        <button type="button" class="btn-small btn-secondary" id="select-pericope">Sélectionner</button>
                    </label>

                    <label>
                        ${t.uiSummary}
                        <input id="pericopeSummary" class="inp" placeholder="${t.introSummaryLead} …" />
                    </label>
                </div>

                <details class="note">
                    <summary>Notes de conclusion (facultatif)</summary>
                    <textarea id="conclusionNotes" class="inp" placeholder="${t.uiNotesSummary}"></textarea>
                </details>

                <div class="actions">
                    <button type="button" id="addTruth" class="btn-secondary">${t.uiAddTruth}</button>
                    <button type="button" id="generate" class="btn-primary">${t.uiGenerate}</button>
                </div>

                <div id="truths-list" class="truths-stack"></div>

                <div id="output" class="output hidden">
                    <h3>${t.uiResult}</h3>
                    <div class="out-actions">
                        <button type="button" id="copyMd" class="btn-secondary">${t.uiCopyMd}</button>
                        <button type="button" id="downloadTxt" class="btn-secondary">${t.uiDlTxt}</button>
                        <button type="button" id="downloadHtml" class="btn-secondary">${t.uiDlHtml}</button>
                    </div>
                    <textarea id="mdResult" class="code" rows="20" spellcheck="false"></textarea>
                    <details>
                        <summary>Prévisualisation HTML</summary>
                        <iframe id="htmlPreview" class="preview"></iframe>
                    </details>
                </div>
            </div>
        `;
    }

    bindEvents() {
        // Sélection de la péricope
        document.getElementById('select-pericope').addEventListener('click', () => {
            this.openVerseSelection('pericopeRef');
        });

        // Langue
        document.getElementById('langSelect').value = this.state.lang;
        document.getElementById('langSelect').addEventListener('change', (e) => {
            this.state.lang = e.target.value;
            this.updateUITexts();
            this.rerenderTruths();
        });

        // Champs de saisie
        document.getElementById('pericopeRef').addEventListener('input', (e) => {
            this.state.pericopeRef = e.target.value;
        });

        document.getElementById('pericopeSummary').addEventListener('input', (e) => {
            this.state.pericopeSummary = e.target.value;
        });

        document.getElementById('conclusionNotes').addEventListener('input', (e) => {
            this.state.conclusionNotes = e.target.value;
        });

        // Boutons d'actions
        document.getElementById('addTruth').addEventListener('click', () => {
            this.state.truths.push(this.emptyTruth(this.state.truths.length + 1));
            this.rerenderTruths();
        });

        document.getElementById('generate').addEventListener('click', () => {
            this.generateOutput();
        });
    }

    openVerseSelection(targetField) {
        if (bibleAppInstance) {
            this.currentVerseTarget = targetField;
            document.getElementById('homily-section').style.display = 'none';
            
            // Ouvrir la sélection de livre
            bibleAppInstance.openBookSelectionModal();
            
            // Écouter la fermeture de la sélection
            this.setupVerseSelectionListener();
        }
    }

    setupVerseSelectionListener() {
        const checkSelection = setInterval(() => {
            const bookModal = document.getElementById('book-selection-modal');
            const chapterModal = document.getElementById('chapter-selection-modal');
            
            if ((!bookModal || bookModal.style.display === 'none') && 
                (!chapterModal || chapterModal.style.display === 'none')) {
                clearInterval(checkSelection);
                
                // Rouvrir la modale homélie
                document.getElementById('homily-section').style.display = 'block';
                
                // Récupérer la sélection actuelle
                if (bibleAppInstance && bibleAppInstance.currentBook && bibleAppInstance.currentChapter) {
                    const book = bibleAppInstance.currentBook;
                    const chapter = bibleAppInstance.currentChapter;
                    const bookName = bookNames.french[book] || book;
                    const verseRef = `${bookName} ${chapter}`;
                    
                    document.getElementById(this.currentVerseTarget).value = verseRef;
                    
                    if (this.currentVerseTarget === 'pericopeRef') {
                        this.state.pericopeRef = verseRef;
                    }
                }
            }
        }, 100);
    }

    renderTruthCard(truth, idx) {
        const t = this.T();
        const wrap = document.createElement('div');
        wrap.className = 'truth-card';
        
        wrap.innerHTML = `
            <div class="truth-card__head">
                <h3>${truth.title}</h3>
                <div class="truth-card__actions">
                    <button type="button" class="btn-small btn-secondary" data-action="move-up">${t.actUp}</button>
                    <button type="button" class="btn-small btn-secondary" data-action="move-down">${t.actDown}</button>
                    <button type="button" class="btn-small btn-danger" data-action="remove">${t.actRemove}</button>
                </div>
            </div>

            <label>${t.lblKey}
                <textarea class="inp keyStatement" placeholder="${t.phKey}">${truth.keyStatement || ''}</textarea>
            </label>

            <label>${t.lblVerses}
                <input class="inp versesRef" placeholder="${t.phVerses}" value="${truth.versesRef || ''}" />
                <button type="button" class="btn-small btn-secondary select-verses" data-index="${idx}">Sélectionner</button>
            </label>

            <label>${t.lblExplain}
                <textarea class="inp explanation" placeholder="${t.explainLead} ...">${truth.explanation || ''}</textarea>
            </label>

            <fieldset class="app-fieldset">
                <legend>${t.lblApp(t.appDimsLabel)}</legend>
                <input class="inp appD1" placeholder="${t.phD1}" value="${truth.appD1 || ''}" />
                <input class="inp appD2" placeholder="${t.phD2}" value="${truth.appD2 || ''}" />
                <input class="inp appD3" placeholder="${t.phD3}" value="${truth.appD3 || ''}" />
            </fieldset>

            <label>${t.lblReflect}
                <input class="inp reflection" placeholder="${t.reflectLead} …" value="${truth.reflection || ''}" />
            </label>

            <label>${t.lblExhort}
                <input class="inp exhortation" placeholder="${t.exhortLead} …" value="${truth.exhortation || ''}" />
            </label>

            <label>${t.lblChrist}
                <textarea class="inp christology" placeholder="${t.christLead} …">${truth.christology || ''}</textarea>
            </label>
        `;

        // Événements de saisie
        wrap.addEventListener('input', (e) => {
            const el = e.target;
            const field = el.className.split(' ')[1];
            this.state.truths[idx][field] = el.value;
        });

        // Bouton de sélection de versets pour cette vérité
        wrap.querySelector('.select-verses').addEventListener('click', (e) => {
            const index = e.target.dataset.index;
            this.openVerseSelectionForTruth(index);
        });

        // Actions de la carte
        wrap.addEventListener('click', (e) => {
            const btn = e.target.closest('button');
            if (!btn) return;
            
            const action = btn.dataset.action;
            if (action === 'remove') {
                this.state.truths.splice(idx, 1);
                this.rerenderTruths();
            } else if (action === 'move-up' && idx > 0) {
                [this.state.truths[idx - 1], this.state.truths[idx]] = [this.state.truths[idx], this.state.truths[idx - 1]];
                this.rerenderTruths();
            } else if (action === 'move-down' && idx < this.state.truths.length - 1) {
                [this.state.truths[idx + 1], this.state.truths[idx]] = [this.state.truths[idx], this.state.truths[idx + 1]];
                this.rerenderTruths();
            }
        });

        return wrap;
    }

    openVerseSelectionForTruth(truthIndex) {
        this.currentTruthIndex = truthIndex;
        this.currentVerseTarget = `truth-${truthIndex}-verses`;
        this.openVerseSelection(null);
    }

    rerenderTruths() {
        const list = document.getElementById('truths-list');
        if (!list) return;
        
        list.innerHTML = '';
        this.state.truths.forEach((truth, idx) => {
            truth.title = this.T().truthTitle(idx + 1);
            list.appendChild(this.renderTruthCard(truth, idx));
        });
    }

    updateUITexts() {
        const t = this.T();
        
        // Titre
        const title = document.querySelector('#homily-generator h2');
        if (title) title.textContent = t.uiTitle;
        
        // Boutons
        const addBtn = document.getElementById('addTruth');
        const genBtn = document.getElementById('generate');
        if (addBtn) addBtn.textContent = t.uiAddTruth;
        if (genBtn) genBtn.textContent = t.uiGenerate;
        
        // Labels
        const pericopeLabel = document.querySelector('label[for="pericopeRef"]');
        const summaryLabel = document.querySelector('label[for="pericopeSummary"]');
        if (pericopeLabel) pericopeLabel.innerHTML = `${t.uiPericope}<input id="pericopeRef" class="inp" placeholder="${t.phVerses}" /><button type="button" class="btn-small btn-secondary" id="select-pericope">Sélectionner</button>`;
        if (summaryLabel) summaryLabel.innerHTML = `${t.uiSummary}<input id="pericopeSummary" class="inp" placeholder="${t.introSummaryLead} …" />`;
        
        // Recréer les événements pour les nouveaux éléments
        this.bindPericopeEvents();
    }

    bindPericopeEvents() {
        const pericopeInput = document.getElementById('pericopeRef');
        const pericopeBtn = document.getElementById('select-pericope');
        const summaryInput = document.getElementById('pericopeSummary');
        
        if (pericopeInput) {
            pericopeInput.addEventListener('input', (e) => {
                this.state.pericopeRef = e.target.value;
            });
        }
        
        if (pericopeBtn) {
            pericopeBtn.addEventListener('click', () => {
                this.openVerseSelection('pericopeRef');
            });
        }
        
        if (summaryInput) {
            summaryInput.addEventListener('input', (e) => {
                this.state.pericopeSummary = e.target.value;
            });
        }
    }

    generateOutput() {
        const md = this.renderAllMarkdown();
        const output = document.getElementById('output');
        output.classList.remove('hidden');
        
        const mdResult = document.getElementById('mdResult');
        if (mdResult) mdResult.value = md;
        
        const html = this.mdToSimpleHtml(md);
        const iframe = document.getElementById('htmlPreview');
        if (iframe) {
            const blob = new Blob([html], { type: 'text/html' });
            iframe.src = URL.createObjectURL(blob);
        }
        
        // Boutons d'export
        const copyBtn = document.getElementById('copyMd');
        const txtBtn = document.getElementById('downloadTxt');
        const htmlBtn = document.getElementById('downloadHtml');
        
        if (copyBtn) {
            copyBtn.onclick = () => this.copyToClipboard(md, copyBtn);
        }
        
        if (txtBtn) {
            txtBtn.onclick = () => this.saveToFile(`plan-homelie-${this.state.lang.toUpperCase()}.txt`, md, 'text/plain');
        }
        
        if (htmlBtn) {
            htmlBtn.onclick = () => this.saveToFile(`plan-homelie-${this.state.lang.toUpperCase()}.html`, html, 'text/html');
        }
    }

    renderAllMarkdown() {
        const t = this.T();
        const lines = [];
        
        // Titre + Introduction
        lines.push(`# ${t.uiTitle}\n`);
        lines.push(`**${this.state.lang === 'mg' ? 'Fampidirana' : 'Introduction'}**`);
        lines.push(`${t.introGreeting}`);
        
        if (this.state.pericopeRef.trim()) {
            lines.push(`${t.introPericopeLead} **${this.state.pericopeRef.trim()}**. ${t.introPericopeRepeat}`);
        }
        
        if (this.state.pericopeSummary.trim()) {
            lines.push(`${t.introSummaryLead} **${this.state.pericopeSummary.trim()}**.`);
        }
        lines.push('');
        
        // Vérités
        this.state.truths.forEach((truth, idx) => {
            lines.push(this.renderTruthMarkdown(truth, idx));
        });
        
        // Conclusion
        lines.push(`## ${t.conclTitle}`);
        lines.push(`${t.conclLead}`);
        this.state.truths.forEach((truth, idx) => {
            const num = idx + 1;
            const short = truth.keyStatement?.trim() || truth.title;
            lines.push(`- **${num})** ${short}`);
        });
        
        if (this.state.conclusionNotes?.trim()) {
            lines.push('');
            lines.push(this.state.conclusionNotes.trim());
        }
        
        lines.push('');
        lines.push(t.gloria);
        
        return lines.join('\n');
    }

    renderTruthMarkdown(truth, idx) {
        const i = idx + 1;
        const t = this.T();
        
        let md = `### ${truth.title}\n\n`;
        md += `${t.truthLead(i)}\n\n`;
        
        if (truth.keyStatement?.trim()) {
            md += `**${truth.keyStatement.trim()}**\n\n`;
        }
        
        if (truth.versesRef?.trim()) {
            md += `**${t.lblVersesOut}** ${truth.versesRef.trim()}\n\n`;
        }
        
        if (truth.explanation?.trim()) {
            md += `**${t.lblExplainOut}** ${t.explainLead} ${truth.explanation.trim()}\n\n`;
        }
        
        const hasApp = truth.appD1?.trim() || truth.appD2?.trim() || truth.appD3?.trim();
        if (hasApp) {
            md += `**${t.lblAppOut}** ${t.appLead}\n`;
            if (truth.appD1?.trim()) md += `- D1: ${truth.appD1.trim()}\n`;
            if (truth.appD2?.trim()) md += `- D2: ${truth.appD2.trim()}\n`;
            if (truth.appD3?.trim()) md += `- D3: ${truth.appD3.trim()}\n`;
            md += '\n';
        }
        
        if (truth.reflection?.trim()) {
            md += `**${t.lblReflectOut}** ${t.reflectLead} ${truth.reflection.trim()}\n\n`;
        }
        
        if (truth.exhortation?.trim()) {
            md += `**${t.lblExhortOut}** ${t.exhortLead} ${truth.exhortation.trim()}\n\n`;
        }
        
        if (truth.christology?.trim()) {
            md += `**${t.lblChristOut}** ${truth.christology.trim()}\n\n`;
        }
        
        return md;
    }

    mdToSimpleHtml(md) {
        let html = md
            .replace(/^### (.*)$/gm, '<h3>$1</h3>')
            .replace(/^## (.*)$/gm, '<h2>$1</h2>')
            .replace(/^# (.*)$/gm, '<h1>$1</h1>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/^- (.*)$/gm, '<li>$1</li>');
            
        html = html.split('\n').map(line => {
            if (line.trim() === '') return '<p></p>';
            if (line.startsWith('<h') || line.startsWith('<li>')) return line;
            return `<p>${line}</p>`;
        }).join('\n');
        
        html = html.replace(/(<p><li>.*?<\/li><\/p>\n?)+/gs, (match) => {
            const items = match.replace(/<\/?p>/g, '');
            return `<ul>${items}</ul>`;
        });
        
        return `<!DOCTYPE html>
<html lang="${this.state.lang}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Plan d'Homélie</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; margin: 2rem; }
        h1 { color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 0.5rem; }
        h2 { color: #3498db; margin-top: 2rem; }
        h3 { color: #2c3e50; margin-top: 1.5rem; }
        strong { color: #e74c3c; }
        ul { margin: 1rem 0; padding-left: 2rem; }
        li { margin: 0.5rem 0; }
    </style>
</head>
<body>${html}</body>
</html>`;
    }

    async copyToClipboard(text, btn) {
        try {
            await navigator.clipboard.writeText(text);
            if (btn) {
                const original = btn.textContent;
                btn.textContent = 'Copié ✓';
                setTimeout(() => {
                    btn.textContent = original;
                }, 2000);
            }
        } catch (err) {
            alert('Erreur lors de la copie : ' + err.message);
        }
    }

    saveToFile(filename, content, type) {
        const blob = new Blob([content], { type });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
    }
}