/**
 * ============================================================================
 * CONFIGURAZIONE E STATO GLOBALE
 * ============================================================================
 */

// --- Riferimenti agli Elementi del DOM ---
const surnameElement = document.getElementById("surname");
const nameElement = document.getElementById("name");
const backgroundtext = document.getElementById("background-text");
const nameLineNumbers = document.getElementById("name-line-numbers");
const indentLine = document.getElementById("indent-line");
const closingBrace = document.getElementById("closing-brace");
const revealContent = document.getElementById("reveal-content");
const revealLineNumbers = document.getElementById("reveal-line-numbers");
const revealSection = document.querySelector(".reveal-section");

// --- Testi Originali per le Animazioni ---
const originalBackground =
    "//WEB_DEVEL0PER\nFULL_STACK_ARCHITECT\nTYPESCRIPT_NODE_REACT";
const originalSurname = "bolea";
const originalName = "Alessandro(){";
const newName = "Sasha(){";

// --- Variabili di Stato ---
let lastNameLineCount = 1;
let skipNameAnimation = false;
let animationFinished = false;
let revealAnimationFinished = false;
let hasTyped = false;
let currentEditableElement = null;
let lastRevealLineCount = 1;

/**
 * ============================================================================
 * UTILITY & REFRESH FUNCTIONS
 * ============================================================================
 */

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const MIN_DELAY = 5;
const MAX_DELAY = 25;
function getScrollBasedDelay() {
    return Math.random() * (MAX_DELAY - MIN_DELAY) + MIN_DELAY;
}

function syncLineNumbersWidth() {
    const nameWidth = nameLineNumbers.offsetWidth;
    if (revealLineNumbers) revealLineNumbers.style.width = nameWidth + "px";
}

/**
 * ============================================================================
 * POSIZIONAMENTO DINAMICO E GEOMETRIA
 * ============================================================================
 */

function updateRevealSectionPosition() {
    const h1Element = document.querySelector("h1");
    const fullNameElement = document.getElementById("full-name");
    const viewportHeight = window.innerHeight;

    const tempSpan = document.createElement("span");
    tempSpan.style.visibility = "hidden";
    tempSpan.style.position = "absolute";
    tempSpan.textContent = "X";
    fullNameElement.appendChild(tempSpan);
    const lineHeight = tempSpan.offsetHeight;
    tempSpan.remove();

    const h1Top = viewportHeight * 0.2;
    const h1Bottom = h1Top + h1Element.offsetHeight;

    if (h1Bottom > viewportHeight) {
        revealSection.style.marginTop = h1Bottom + lineHeight + "px";
    } else {
        revealSection.style.marginTop = "100vh";
    }
}

function updateIndentLine() {
    const h1 = document.querySelector("h1");
    const fullNameElement = document.getElementById("full-name");

    if (indentLine.style.display === "none") return;

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
    const targetLineHeight = docHeight - lineTop - braceHeight;

    indentLine.style.left = `${lineLeft}px`;
    indentLine.style.top = `${lineTop}px`;
    closingBrace.style.left = `${lineLeft}px`;
    closingBrace.style.top = `${lineTop + targetLineHeight}px`;

    if (window.indentAnimationComplete) {
        indentLine.style.height = `${targetLineHeight}px`;
    }
}

/**
 * ============================================================================
 * GESTIONE NUMERI DI RIGA (LINE NUMBERS)
 * ============================================================================
 */

function updateNameLineNumbers() {
    const fullNameElement = document.getElementById("full-name");
    const tempSpan = document.createElement("span");
    tempSpan.textContent = "X";
    fullNameElement.appendChild(tempSpan);
    const singleLineHeight = tempSpan.offsetHeight;
    tempSpan.remove();

    const visualLineCount = Math.max(
        1,
        Math.round(fullNameElement.offsetHeight / singleLineHeight),
    );

    let numbers = "";
    for (let i = 1; i <= visualLineCount; i++) {
        numbers += i + (i < visualLineCount ? "\n" : "");
    }
    nameLineNumbers.textContent = numbers;

    if (visualLineCount !== lastNameLineCount) {
        lastNameLineCount = visualLineCount;
        updateVisualLineNumbers();
        updateRevealSectionPosition();
    }
    syncLineNumbersWidth();
    updateIndentLine();
}

function updateVisualLineNumbers() {
    const tempSpan = document.createElement("span");
    tempSpan.textContent = "X";
    revealContent.parentElement.appendChild(tempSpan);
    const singleLineHeight = tempSpan.offsetHeight;
    tempSpan.remove();

    const contentHeight = revealContent.offsetHeight || singleLineHeight;
    const actualLines = Math.max(
        1,
        Math.round(contentHeight / singleLineHeight),
    );
    const startLineNumber = lastNameLineCount + 1;

    let numbersText = "";
    for (let i = startLineNumber; i < startLineNumber + actualLines; i++) {
        numbersText += i + (i < startLineNumber + actualLines - 1 ? "\n" : "");
    }
    revealLineNumbers.textContent = numbersText;
    lastRevealLineCount = actualLines;
    updateIndentLine();
}

/**
 * ============================================================================
 * LOGICA ANIMAZIONI (ASINCRONE)
 * ============================================================================
 */

async function animateName() {
    async function typeBackground() {
        for (let i = 1; i <= originalBackground.length; i++) {
            backgroundtext.textContent = originalBackground.substring(0, i);
            await sleep(60);
        }
    }

    async function typeSurnameAndName() {
        for (let i = 1; i <= originalSurname.length; i++) {
            if (skipNameAnimation) return;
            surnameElement.textContent = originalSurname.substring(0, i);
            updateNameLineNumbers();
            await sleep(80);
        }
        for (let i = 1; i <= originalName.length; i++) {
            if (skipNameAnimation) return;
            nameElement.textContent = originalName.substring(0, i);
            updateNameLineNumbers();
            await sleep(80);
        }
        await sleep(800);

        for (let i = originalName.length; i >= 0; i--) {
            if (skipNameAnimation) return;
            nameElement.textContent = originalName.substring(0, i);
            updateNameLineNumbers();
            await sleep(40);
        }
        await sleep(150);

        for (let i = 1; i <= newName.length; i++) {
            if (skipNameAnimation) return;
            nameElement.textContent = newName.substring(0, i);
            updateNameLineNumbers();
            await sleep(80);
        }
    }

    typeBackground();
    await typeSurnameAndName();
}

async function typeRevealText() {
    const revealText = "/*\nSITO IN COSTRUZIONE\n*/";

    revealContent.classList.add("typing-cursor");
    indentLine.style.display = "block";
    closingBrace.style.display = "block";
    indentLine.style.height = "0";

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
        const targetHeight = docHeight - lineTop - braceHeight;

        closingBrace.style.left = `${lineLeft}px`;
        closingBrace.style.top = `${lineTop + targetHeight}px`;

        const duration = 500;
        const startTime = performance.now();

        function animate(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const currentH = targetHeight * progress;

            indentLine.style.height = `${currentH}px`;

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                window.indentAnimationComplete = true;
            }
        }
        requestAnimationFrame(animate);
    };

    startAnimateLine();

    for (let i = 1; i <= revealText.length; i++) {
        revealContent.textContent = revealText.substring(0, i);
        updateVisualLineNumbers();
        await sleep(getScrollBasedDelay());
    }

    revealAnimationFinished = true;
    const nameEl = document.getElementById("full-name");
    if (currentEditableElement === nameEl) deactivateCursor(nameEl);

    revealContent.textContent += "\n ";
    updateVisualLineNumbers();
    revealContent.classList.remove("typing-cursor");
}

/**
 * ============================================================================
 * INPUT E TASTIERA (Simulazione Terminale)
 * ============================================================================
 */

function activateCursor(element) {
    element.classList.add("cursor-active");
    currentEditableElement = element;
}

function deactivateCursor(element) {
    element.classList.remove("cursor-active");
    if (currentEditableElement === element) currentEditableElement = null;
}

document.addEventListener("keydown", function (e) {
    if (!currentEditableElement) return;

    const isName =
        currentEditableElement === document.getElementById("full-name");
    const isReveal = currentEditableElement === revealContent;

    if (isReveal) return;
    if (isName && !animationFinished) return;

    if (e.key === "a" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        return;
    }

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

    if (e.key === "Enter" && isReveal) {
        e.preventDefault();
        currentEditableElement.textContent += "\n";
        updateVisualLineNumbers();
        return;
    }

    if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        currentEditableElement.textContent += e.key;
        if (isReveal) updateVisualLineNumbers();
        if (isName) updateNameLineNumbers();
    }
});

document.addEventListener("mousedown", (e) => {
    if (currentEditableElement && currentEditableElement.contains(e.target))
        e.preventDefault();
});
document.addEventListener("paste", (e) => e.preventDefault());
document.addEventListener("copy", (e) => {
    if (currentEditableElement) e.preventDefault();
});

/**
 * ============================================================================
 * EVENTI DI SISTEMA (SCROLL, RESIZE, INIT)
 * ============================================================================
 */

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting && !hasTyped && animationFinished) {
                hasTyped = true;
                typeRevealText();
            }
        });
    },
    { threshold: 0.05 },
);

observer.observe(revealContent);

window.addEventListener("scroll", () => {
    const h1 = document.querySelector("h1");
    const fullNameElement = document.getElementById("full-name");

    if (window.scrollY > 0 && animationFinished) {
        fullNameElement.classList.add("no-cursor");
    }

    const nameOutOfView =
        window.scrollY > window.innerHeight * 0.3 + h1.offsetHeight;

    const shouldStartReveal =
        (!animationFinished && nameOutOfView) ||
        (animationFinished && window.scrollY > 10);

    if (nameOutOfView && !animationFinished) {
        skipNameAnimation = true;
        surnameElement.textContent = originalSurname;
        nameElement.textContent = newName;
        updateNameLineNumbers();
        animationFinished = true;
    }

    if (shouldStartReveal && !hasTyped) {
        hasTyped = true;
        typeRevealText();
    }
});

window.addEventListener("resize", () => {
    updateNameLineNumbers();
    syncLineNumbersWidth();
    updateRevealSectionPosition();
});

window.addEventListener("load", () => {
    updateRevealSectionPosition();
    syncLineNumbersWidth();

    animateName().then(() => {
        animationFinished = true;
        if (window.scrollY <= 50) {
            activateCursor(document.getElementById("full-name"));
        }
    });
});
