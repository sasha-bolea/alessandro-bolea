/**
 * ============================================================================
 * CONFIGURAZIONE E STATO GLOBALE
 * ============================================================================
 * In questa sezione vengono definite le variabili globali che mantengono lo stato
 * dell'applicazione e i riferimenti agli elementi del DOM (Document Object Model).
 */

// --- Riferimenti agli Elementi del DOM ---
// Vengono recuperati gli elementi HTML con cui lo script interagirà.
const surnameElement = document.getElementById("surname"); // Elemento per il cognome
const nameElement = document.getElementById("name"); // Elemento per il nome
const backgroundtext = document.getElementById("background-text"); // Testo di sfondo animato
const nameLineNumbers = document.getElementById("name-line-numbers"); // Numeri di riga per la sezione del nome
const indentLine = document.getElementById("indent-line"); // Linea di indentazione verticale
const closingBrace = document.getElementById("closing-brace"); // Graffa di chiusura "}"
const revealContent = document.getElementById("reveal-content"); // Contenuto della sezione "reveal" che appare con lo scroll
const revealLineNumbers = document.getElementById("reveal-line-numbers"); // Numeri di riga per la sezione "reveal"
const revealSection = document.querySelector(".reveal-section"); // La sezione "reveal" intera

// --- Testi Originali per le Animazioni ---
// Stringhe di testo che verranno utilizzate nelle animazioni di "scrittura".
const originalBackground =
    "//WEB_DEVEL0PER\nFULL_STACK_ARCHITECT\nTYPESCRIPT_NODE_REACT\nSYSTEM_DESIGN_UI_UX\nSCALABLE_SOLUTIONS\nSTATUS_200_OK"; // Testo per lo sfondo
const originalSurname = "bolea"; // Cognome iniziale
const originalName = "Alessandro(){"; // Nome iniziale
const newName = "Sasha(){"; // Nuovo nome (nickname) che sostituisce l'originale

// --- Variabili di Stato ---
// Queste variabili tengono traccia dello stato delle animazioni e delle interazioni dell'utente.
let lastNameLineCount = 1; // Conteggio delle linee visuali per la sezione del nome
let skipNameAnimation = false; // Flag per saltare l'animazione del nome se l'utente scrolla
let animationFinished = false; // Flag che indica se l'animazione del nome è terminata
let revealAnimationFinished = false; // Flag che indica se l'animazione della sezione "reveal" è terminata
let hasTyped = false; // Flag per assicurarsi che l'animazione "reveal" parta una sola volta
let currentEditableElement = null; // Riferimento all'elemento attualmente "modificabile" dall'utente (simula un input di testo)
let additionalRevealTyped = false; // Flag per tracciare se il testo aggiuntivo è stato aggiunto
let lastRevealLineCount = 1; // Conteggio righe sezione "reveal", usato per numeri di riga tools

// --- Sezione "I Miei Strumenti" ---
// Variabile inizializzata che rappresenta gli strumenti usati.
const iMieiStrumenti = {
    linguaggi: ["JavaScript", "TypeScript", "HTML", "CSS"],
    runtime: ["Node.js", "Express"],
    frontend: ["React", "Vue"],
    database: ["SQL", "MongoDB"],
    tools: ["Git", "GitHub", "VSCode"],
};

/**
 * ============================================================================
 * UTILITY & REFRESH FUNCTIONS
 * ============================================================================
 * Funzioni di utilità generiche usate in diverse parti dello script.
 */

/**
 * Funzione `sleep`: mette in pausa l'esecuzione per un dato numero di millisecondi.
 * Essenziale per le animazioni di "scrittura" per creare un effetto realistico.
 * @param {number} ms - Millisecondi di attesa.
 * @returns {Promise} Una Promise che si risolve dopo il tempo specificato.
 */
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Ritorna un delay casuale tra MIN_DELAY e MAX_DELAY (ms).
 */
const MIN_DELAY = 5;
const MAX_DELAY = 25;
function getScrollBasedDelay() {
    return Math.random() * (MAX_DELAY - MIN_DELAY) + MIN_DELAY;
}

/**
 * Sincronizza la larghezza dei numeri di riga della sezione "reveal" con quella
 * della sezione del nome, per mantenerle allineate.
 */
function syncLineNumbersWidth() {
    const nameWidth = nameLineNumbers.offsetWidth;
    if (revealLineNumbers) revealLineNumbers.style.width = nameWidth + "px";
    const toolsNums = [
        document.getElementById("tools-title-line-numbers"),
        document.getElementById("tools-body-line-numbers"),
        document.getElementById("tools-close-line-numbers"),
    ];
    toolsNums.forEach((el) => {
        if (el) el.style.width = nameWidth + "px";
    });
}

/**
 * ============================================================================
 * POSIZIONAMENTO DINAMICO E GEOMETRIA
 * ============================================================================
 * Funzioni che gestiscono la posizione e le dimensioni degli elementi in modo
 * dinamico, specialmente in risposta al resize della finestra o al contenuto
 * che cambia.
 */

/**
 * Aggiorna la posizione della `revealSection` per assicurarsi che non si
 * sovrapponga al titolo `h1` se questo occupa più spazio del previsto (es. su schermi stretti).
 */
function updateRevealSectionPosition() {
    const h1Element = document.querySelector("h1");
    const fullNameElement = document.getElementById("full-name");
    const viewportHeight = window.innerHeight;

    // Calcola l'altezza di una singola riga di testo
    const tempSpan = document.createElement("span");
    tempSpan.style.visibility = "hidden";
    tempSpan.style.position = "absolute";
    tempSpan.textContent = "X";
    fullNameElement.appendChild(tempSpan);
    const lineHeight = tempSpan.offsetHeight;
    tempSpan.remove();

    // MODIFICA QUI: Posizione verticale iniziale dell'H1 (0.2 = 20% della viewport)
    const h1Top = viewportHeight * 0.2;
    const h1Bottom = h1Top + h1Element.offsetHeight;

    // Se l'H1 supera la viewport, sposta la sezione "reveal" più in basso
    if (h1Bottom > viewportHeight) {
        revealSection.style.marginTop = h1Bottom + lineHeight + "px";
    } else {
        // MODIFICA QUI: Distanza di default della sezione reveal dall'alto
        revealSection.style.marginTop = "100vh";
    }
}

/**
 * Aggiorna la posizione e l'altezza della linea di indentazione verticale
 * e della graffa di chiusura.
 */
function updateIndentLine() {
    const h1 = document.querySelector("h1");
    const fullNameElement = document.getElementById("full-name");

    // Se la linea non è visibile, non fare nulla
    if (indentLine.style.display === "none") return;

    // Calcola l'altezza di una singola riga di testo
    const tempSpan = document.createElement("span");
    tempSpan.textContent = "X";
    fullNameElement.appendChild(tempSpan);
    const singleLineHeight = tempSpan.offsetHeight;
    tempSpan.remove();

    const h1Rect = h1.getBoundingClientRect();
    // Calcola la posizione orizzontale della linea (allineata al testo)
    const lineLeft =
        h1Rect.left +
        nameLineNumbers.offsetWidth +
        parseInt(getComputedStyle(nameLineNumbers).marginRight);
    // Calcola la posizione verticale di partenza della linea
    const lineTop =
        h1Rect.top + window.scrollY + lastNameLineCount * singleLineHeight;

    const docHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
    );

    // MODIFICA QUI: Spazio riservato alla graffa chiusa (} ) in fondo alla linea
    const braceHeight = closingBrace.offsetHeight || 32;

    // Calcola l'altezza che la linea deve avere per arrivare fino in fondo alla pagina
    const targetLineHeight = docHeight - lineTop - braceHeight;

    indentLine.style.left = `${lineLeft}px`;
    indentLine.style.top = `${lineTop}px`;
    closingBrace.style.left = `${lineLeft}px`;
    closingBrace.style.top = `${lineTop + targetLineHeight}px`;

    // Se l'animazione di discesa è già completata, aggiorna l'altezza in modo responsivo
    if (window.indentAnimationComplete) {
        indentLine.style.height = `${targetLineHeight}px`;
    }
}

/**
 * ============================================================================
 * GESTIONE NUMERI DI RIGA (LINE NUMBERS)
 * ============================================================================
 * Funzioni dedicate a calcolare e aggiornare i numeri di riga a fianco
 * del testo, per simulare l'aspetto di un editor di codice.
 */

/**
 * Aggiorna i numeri di riga per la sezione del nome (`h1`).
 * Calcola quante righe visuali occupa il testo e genera i numeri corrispondenti.
 */
function updateNameLineNumbers() {
    const fullNameElement = document.getElementById("full-name");
    // Calcola l'altezza di una singola riga
    const tempSpan = document.createElement("span");
    tempSpan.textContent = "X";
    fullNameElement.appendChild(tempSpan);
    const singleLineHeight = tempSpan.offsetHeight;
    tempSpan.remove();

    // Calcola il numero di righe che il testo occupa
    const visualLineCount = Math.max(
        1,
        Math.round(fullNameElement.offsetHeight / singleLineHeight),
    );

    // Genera la stringa dei numeri di riga
    let numbers = "";
    for (let i = 1; i <= visualLineCount; i++) {
        numbers += i + (i < visualLineCount ? "\n" : "");
    }
    nameLineNumbers.textContent = numbers;

    // Se il numero di righe è cambiato, aggiorna le altre parti dell'interfaccia
    if (visualLineCount !== lastNameLineCount) {
        lastNameLineCount = visualLineCount;
        updateVisualLineNumbers(); // Aggiorna i numeri di riga della sezione "reveal"
        updateRevealSectionPosition(); // Riposiziona la sezione "reveal"
    }
    syncLineNumbersWidth(); // Sincronizza la larghezza delle colonne dei numeri
    updateIndentLine(); // Aggiorna la linea di indentazione
}

/**
 * Aggiorna i numeri di riga per la sezione "reveal".
 * I numeri partono da dove finiscono quelli della sezione del nome.
 */
function updateVisualLineNumbers() {
    // Calcola l'altezza di una riga
    const tempSpan = document.createElement("span");
    tempSpan.textContent = "X";
    revealContent.parentElement.appendChild(tempSpan);
    const singleLineHeight = tempSpan.offsetHeight;
    tempSpan.remove();

    const contentHeight = revealContent.offsetHeight || singleLineHeight;
    // Calcola quante righe occupa il contenuto "reveal"
    const actualLines = Math.max(
        1,
        Math.round(contentHeight / singleLineHeight),
    );
    // Il numero di partenza è il successivo all'ultimo della sezione del nome
    const startLineNumber = lastNameLineCount + 1;

    // Genera la stringa di numeri
    let numbersText = "";
    for (let i = startLineNumber; i < startLineNumber + actualLines; i++) {
        numbersText += i + (i < startLineNumber + actualLines - 1 ? "\n" : "");
    }
    revealLineNumbers.textContent = numbersText;
    lastRevealLineCount = actualLines;
    updateIndentLine();
    updateToolsLineNumbers();
}

/**
 * ============================================================================
 * LOGICA ANIMAZIONI (ASINCRONE)
 * ============================================================================
 * Funzioni `async` che gestiscono le animazioni principali di "scrittura".
 */

/**
 * Funzione principale che anima il nome e il testo di sfondo.
 */
async function animateName() {
    // Funzione interna per animare il testo di sfondo
    async function typeBackground() {
        for (let i = 1; i <= originalBackground.length; i++) {
            backgroundtext.textContent = originalBackground.substring(0, i);
            // MODIFICA QUI: Velocità scrittura commento background (ms)
            await sleep(60);
        }
    }

    // Funzione interna per animare il nome e cognome
    async function typeSurnameAndName() {
        // Scrive il cognome
        for (let i = 1; i <= originalSurname.length; i++) {
            if (skipNameAnimation) return; // Se l'utente scrolla, interrompe l'animazione
            surnameElement.textContent = originalSurname.substring(0, i);
            updateNameLineNumbers();
            // MODIFICA QUI: Velocità scrittura cognome (ms)
            await sleep(80);
        }
        // Scrive il nome "Alessandro"
        for (let i = 1; i <= originalName.length; i++) {
            if (skipNameAnimation) return;
            nameElement.textContent = originalName.substring(0, i);
            updateNameLineNumbers();
            // MODIFICA QUI: Velocità scrittura nome "Alessandro" (ms)
            await sleep(80);
        }
        // MODIFICA QUI: Pausa con nome completo scritto (ms)
        await sleep(800);

        // Cancella il nome "Alessandro"
        for (let i = originalName.length; i >= 0; i--) {
            if (skipNameAnimation) return;
            nameElement.textContent = originalName.substring(0, i);
            updateNameLineNumbers();
            // MODIFICA QUI: Velocità cancellazione nome (ms)
            await sleep(40);
        }
        // MODIFICA QUI: Pausa dopo aver cancellato tutto (ms)
        await sleep(150);

        // Scrive il nuovo nome "Sasha"
        for (let i = 1; i <= newName.length; i++) {
            if (skipNameAnimation) return;
            nameElement.textContent = newName.substring(0, i);
            updateNameLineNumbers();
            // MODIFICA QUI: Velocità scrittura nome "Sasha" (ms)
            await sleep(80);
        }
    }

    // Avvia le due animazioni (quella dello sfondo non blocca quella del nome)
    typeBackground();
    await typeSurnameAndName();
}

/**
 * Anima la scrittura del testo nella sezione "reveal", che appare dopo lo scroll.
 */
async function typeRevealText() {
    // Il testo da scrivere
    const revealText =
        "/*\nSono uno sviluppatore web full stack di 10011 anni. Progetto e sviluppo applicazioni web curando frontend e backend, con attenzione a performance, usabilità e mantenibilità. Affronto i problemi in modo analitico, con particolare attenzione al debug e all'ottimizzazione.\n*/";

    revealContent.classList.add("typing-cursor");

    // Mostra la linea di indentazione e la graffa, ma con altezza 0
    indentLine.style.display = "block";
    closingBrace.style.display = "block";
    indentLine.style.height = "0";

    // Funzione per animare la discesa della linea di indentazione
    const startAnimateLine = () => {
        const h1 = document.querySelector("h1");
        const fullNameElement = document.getElementById("full-name");

        const tempSpan = document.createElement("span");
        tempSpan.textContent = "X";
        fullNameElement.appendChild(tempSpan);
        const singleLineHeight = tempSpan.offsetHeight;
        tempSpan.remove();

        const h1Rect = h1.getBoundingClientRect();
        const lineLeft =
            h1Rect.left +
            nameLineNumbers.offsetWidth +
            parseInt(getComputedStyle(nameLineNumbers).marginRight);
        const lineTop =
            h1Rect.top + window.scrollY + lastNameLineCount * singleLineHeight;

        const docHeight = Math.max(
            document.body.scrollHeight,
            document.documentElement.scrollHeight,
        );
        const braceHeight = closingBrace.offsetHeight || 32;
        const targetHeight = docHeight - lineTop - braceHeight; // Altezza finale

        closingBrace.style.left = `${lineLeft}px`;
        closingBrace.style.top = `${lineTop + targetHeight}px`;

        // MODIFICA QUI: Durata animazione discesa linea verticale (ms)
        const duration = 500;

        const startTime = performance.now();

        // Ciclo di animazione con `requestAnimationFrame` per un'animazione fluida
        function animate(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const currentH = targetHeight * progress;

            indentLine.style.height = `${currentH}px`;

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                window.indentAnimationComplete = true; // Segna che l'animazione è finita
            }
        }
        requestAnimationFrame(animate);
    };

    startAnimateLine(); // Avvia l'animazione della linea

    // --- Animazione speciale per l'età: da binario a decimale ---
    const binaryNumber = "10011"; // 19 in binario
    const bIndex = revealText.indexOf(binaryNumber);
    const beforeBinary = revealText.substring(0, bIndex); // Testo prima del numero
    const afterBinary = revealText.substring(bIndex + binaryNumber.length); // Testo dopo il numero

    let currentReplacement = binaryNumber;
    let typedAfterPart = "";

    // Funzione per aggiornare il contenuto del testo "reveal"
    const refresh = () => {
        revealContent.textContent =
            beforeBinary + currentReplacement + typedAfterPart;
        updateVisualLineNumbers();
    };

    // Funzione per animare il "countdown" da binario a decimale
    const runCountdown = () => {
        // MODIFICA QUI: Parametri countdown (da numero binario a decimale)
        // start (binario), end (decimale), duration (durata animazione in ms)
        const start = 10011, // Valore di partenza (interpretato come numero)
            end = 19, // Valore finale
            duration = 2000; // Durata

        const startTime = performance.now();
        const animate = (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // "Easing function" per un effetto di rallentamento alla fine
            const eased = 1 - Math.pow(1 - progress, 3);
            currentReplacement = Math.round(
                start - (start - end) * eased,
            ).toString();
            refresh();
            if (progress < 1) requestAnimationFrame(animate);
            else {
                currentReplacement = "19"; // Assicura che il valore finale sia esatto
                refresh();
            }
        };
        requestAnimationFrame(animate);
    };

    // Scrive la prima parte del testo, fino all'età
    for (let i = 1; i <= beforeBinary.length; i++) {
        revealContent.textContent = beforeBinary.substring(0, i);
        updateVisualLineNumbers();
        await sleep(getScrollBasedDelay()); // Usa il delay basato sullo scroll
    }

    runCountdown(); // Avvia l'animazione del numero

    // Scrive la seconda parte del testo, dopo l'età
    for (let i = 1; i <= afterBinary.length; i++) {
        typedAfterPart = afterBinary.substring(0, i);
        refresh();
        await sleep(getScrollBasedDelay());
    }

    revealAnimationFinished = true;

    const nameEl = document.getElementById("full-name");
    if (currentEditableElement === nameEl) deactivateCursor(nameEl);

    revealContent.textContent += "\n ";
    updateVisualLineNumbers();
    revealContent.classList.remove("typing-cursor");

    typeToolsSection();
}

/**
 * Anima la scrittura della sezione "I Miei Strumenti" carattere per carattere,
 * dopo che il testo aggiuntivo del reveal è stato completato.
 */
async function typeToolsSection() {
    const titleEl = document.querySelector(".tools-title-text");
    const bodyEl = document.getElementById("tools-body");
    const closeEl = document.querySelector(".tools-closing-text");
    if (!titleEl || !bodyEl || !closeEl) return;

    titleEl.textContent = "";
    bodyEl.textContent = "";
    closeEl.textContent = "";

    titleEl.classList.add("typing-cursor");
    const titleText = "const iMieiStrumenti = {";
    for (let i = 1; i <= titleText.length; i++) {
        titleEl.textContent = titleText.substring(0, i);
        updateToolsLineNumbers();
        await sleep(getScrollBasedDelay());
    }
    titleEl.classList.remove("typing-cursor");

    const bodyText = Object.entries(iMieiStrumenti)
        .map(([key, val]) => {
            const formatted = Array.isArray(val)
                ? `[${val.map((v) => `"${v}"`).join(", ")}]`
                : JSON.stringify(val);
            return `    ${key}: ${formatted},`;
        })
        .join("\n");

    bodyEl.classList.add("typing-cursor");
    for (let i = 1; i <= bodyText.length; i++) {
        bodyEl.textContent = bodyText.substring(0, i);
        updateToolsLineNumbers();
        await sleep(getScrollBasedDelay());
    }
    bodyEl.classList.remove("typing-cursor");

    closeEl.classList.add("typing-cursor");
    const closeText = "};";
    for (let i = 1; i <= closeText.length; i++) {
        closeEl.textContent = closeText.substring(0, i);
        updateToolsLineNumbers();
        await sleep(getScrollBasedDelay());
    }
    closeEl.classList.remove("typing-cursor");
}

/**
 * ============================================================================
 * INPUT E TASTIERA (Simulazione Terminale)
 * ============================================================================
 * Gestisce l'input da tastiera per simulare un terminale o un editor di testo
 * in cui l'utente può scrivere.
 */

/**
 * Attiva il cursore lampeggiante su un elemento e lo imposta come "modificabile".
 * @param {HTMLElement} element - L'elemento su cui attivare il cursore.
 */
function activateCursor(element) {
    element.classList.add("cursor-active");
    currentEditableElement = element;
}

/**
 * Disattiva il cursore lampeggiante su un elemento.
 * @param {HTMLElement} element - L'elemento da cui rimuovere il cursore.
 */
function deactivateCursor(element) {
    element.classList.remove("cursor-active");
    if (currentEditableElement === element) currentEditableElement = null;
}

// Listener per gli eventi della tastiera
document.addEventListener("keydown", function (e) {
    if (!currentEditableElement) return; // Se nessun elemento è modificabile, non fare nulla

    const isName =
        currentEditableElement === document.getElementById("full-name");
    const isReveal = currentEditableElement === revealContent;

    if (isReveal) return;
    if (isName && !animationFinished) return;

    // Blocca il "seleziona tutto" (Ctrl+A)
    if (e.key === "a" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        return;
    }

    // Gestisce il tasto "Backspace" per cancellare il testo
    if (e.key === "Backspace") {
        e.preventDefault();
        const text = currentEditableElement.textContent;
        if (text.length > 0) {
            currentEditableElement.textContent = text.slice(0, -1);
            if (isReveal) updateVisualLineNumbers();
            if (isName) updateNameLineNumbers();
        }
        return;
    }

    // Gestisce il tasto "Enter" per andare a capo (solo nella sezione "reveal")
    if (e.key === "Enter" && isReveal) {
        e.preventDefault();
        currentEditableElement.textContent += "\n";
        updateVisualLineNumbers();
        return;
    }

    // Gestisce l'inserimento di caratteri stampabili
    if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        currentEditableElement.textContent += e.key;
        if (isReveal) updateVisualLineNumbers();
        if (isName) updateNameLineNumbers();
    }
});

// Blocca alcuni eventi di default per migliorare l'esperienza di "finto terminale"
document.addEventListener("mousedown", (e) => {
    // Previene il focus del mouse all'interno dell'area "modificabile"
    if (currentEditableElement && currentEditableElement.contains(e.target))
        e.preventDefault();
});
document.addEventListener("paste", (e) => e.preventDefault()); // Blocca l'incolla
document.addEventListener("copy", (e) => {
    // Blocca la copia se un elemento è "modificabile"
    if (currentEditableElement) e.preventDefault();
});

/**
 * ============================================================================
 * EVENTI DI SISTEMA (SCROLL, RESIZE, INIT)
 * ============================================================================
 * Gestori di eventi globali che orchestrano l'intera pagina.
 */

// `IntersectionObserver` per rilevare quando la sezione "reveal" entra nella viewport.
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            // Se la sezione è visibile, l'animazione del nome è finita e l'animazione
            // "reveal" non è ancora partita, allora avviala.
            if (entry.isIntersecting && !hasTyped && animationFinished) {
                hasTyped = true; // Segna che è partita
                typeRevealText();
            }
        });
    },
    { threshold: 0.05 }, // Si attiva quando il 5% dell'elemento è visibile
);

observer.observe(revealContent); // Inizia ad osservare la sezione "reveal"

// Listener per l'evento di scroll della finestra
window.addEventListener("scroll", () => {
    const h1 = document.querySelector("h1");
    const fullNameElement = document.getElementById("full-name");

    // Nasconde il cursore del nome se l'utente ha scrollato un po'
    if (window.scrollY > 0 && animationFinished) {
        fullNameElement.classList.add("no-cursor");
    }

    // MODIFICA QUI: Calcolo soglia uscita nome dalla vista (0.3 = 30% della viewport)
    const nameOutOfView =
        window.scrollY > window.innerHeight * 0.3 + h1.offsetHeight;

    // MODIFICA QUI: Soglia scroll per attivare il reveal se l'animazione nome è già finita (10px)
    const shouldStartReveal =
        (!animationFinished && nameOutOfView) ||
        (animationFinished && window.scrollY > 10);

    // Se l'utente scrolla via il nome prima che l'animazione finisca,
    // salta l'animazione e mostra subito il risultato finale.
    if (nameOutOfView && !animationFinished) {
        skipNameAnimation = true;
        surnameElement.textContent = originalSurname;
        nameElement.textContent = newName;
        updateNameLineNumbers();
        animationFinished = true;
    }

    // Se necessario, avvia l'animazione "reveal"
    if (shouldStartReveal && !hasTyped) {
        hasTyped = true;
        typeRevealText();
    }

});

// Listener per l'evento di resize della finestra, per mantenere il layout corretto
window.addEventListener("resize", () => {
    updateNameLineNumbers();
    syncLineNumbersWidth();
    updateRevealSectionPosition();
    updateToolsLineNumbers();
});

/**
 * Renderizza il contenuto della sezione "I Miei Strumenti" leggendo
 * Inizializza la sezione tools vuota al caricamento (verrà animata dopo il reveal).
 */
function initToolsSection() {
    updateToolsLineNumbers();
}

/**
 * Calcola i numeri di riga della sezione "tools", in continuità visuale con
 * la sezione "reveal".
 */
function updateToolsLineNumbers() {
    const titleNums = document.getElementById("tools-title-line-numbers");
    const bodyNums = document.getElementById("tools-body-line-numbers");
    const closeNums = document.getElementById("tools-close-line-numbers");
    const body = document.getElementById("tools-body");
    const titleEl = document.querySelector(".tools-title-text");
    const closeEl = document.querySelector(".tools-closing-text");
    if (
        !titleNums ||
        !bodyNums ||
        !closeNums ||
        !body ||
        !titleEl ||
        !closeEl
    ) {
        return;
    }

    let currentLine = lastNameLineCount + lastRevealLineCount + 1;

    if (titleEl.textContent.length > 0) {
        titleNums.textContent = String(currentLine);
        currentLine++;
    } else {
        titleNums.textContent = "";
    }

    const bodyText = body.textContent;
    if (bodyText.length > 0) {
        const bodyLines = bodyText.split("\n").length;
        let bodyStr = "";
        for (let i = 0; i < bodyLines; i++) {
            bodyStr +=
                currentLine + i + (i < bodyLines - 1 ? "\n" : "");
        }
        bodyNums.textContent = bodyStr;
        currentLine += bodyLines;
    } else {
        bodyNums.textContent = "";
    }

    if (closeEl.textContent.length > 0) {
        closeNums.textContent = String(currentLine);
    } else {
        closeNums.textContent = "";
    }
}

// Listener per l'evento "load": si attiva quando la pagina è completamente caricata
window.addEventListener("load", () => {
    // Imposta le posizioni iniziali corrette
    updateRevealSectionPosition();
    syncLineNumbersWidth();
    initToolsSection();

    // Avvia l'animazione principale del nome
    animateName().then(() => {
        animationFinished = true; // L'animazione del nome è finita
        // MODIFICA QUI: Soglia scroll per permettere editing manuale del nome (50px)
        // Se l'utente non ha scrollato, attiva il cursore sul nome per la modifica.
        if (window.scrollY <= 50) {
            activateCursor(document.getElementById("full-name"));
        }
    });
});
