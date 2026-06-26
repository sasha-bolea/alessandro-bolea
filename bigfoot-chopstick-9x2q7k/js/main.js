/*
 * main.js — Controller di Bigfoot Chopstick.
 * Gestisce schermate, rendering delle mani, input del player, turni e
 * animazioni. La logica decisionale del bot vive in bot.js (trascrizione
 * fedele dell'originale); le regole numeriche in rules.js.
 */

// ----- Stato globale di gioco ------------------------------------------------
const stato = { bs: 1, bd: 1, ps: 1, pd: 1 }; // valori correnti delle mani
let cp = 1;                 // casualePartita (personalità bot)
let cp2 = 1;                // casualepartita2 (mossa in pareggio)
let turnogiocatore = true;  // true = turno del player
let gioco = false;          // partita attiva (input abilitato)
let pausa = false;          // gioco in pausa
let inAnimazione = false;   // lock durante le animazioni
let selezione = null;       // mano del player scelta come attaccante ('ps'|'pd')

// Mappatura nome-mano -> id elemento DOM.
const ID_MANO = { bs: 'bot-sx', bd: 'bot-dx', ps: 'player-sx', pd: 'player-dx' };

// ----- Utility ---------------------------------------------------------------

// Intero casuale in [min, max].
function randInt(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

// Scorciatoia per document.getElementById.
function $(id) { return document.getElementById(id); }

// Mostra la schermata con id dato, nasconde le altre.
function mostraSchermata(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('attiva'));
  $(id).classList.add('attiva');
}

// ----- Rendering -------------------------------------------------------------

/*
 * Aggiorna le immagini delle quattro mani in base allo stato.
 * Mano viva (1..4) -> sprite corrispondente; mano morta (5) -> classe "morta"
 * che la fa uscire dallo schermo.
 */
function aggiornaMani() {
  for (const mano of ['bs', 'bd', 'ps', 'pd']) {
    const el = $(ID_MANO[mano]);
    const v = stato[mano];
    const prefisso = (mano === 'bs' || mano === 'bd') ? 'bigfoot' : 'umano';
    el.src = `assets/${prefisso}_${v}.png`;
    el.classList.toggle('morta', v === 5);
  }
  aggiornaSplit();
}

/* Mostra/nasconde il bottone SPLIT secondo le ridistribuzioni disponibili. */
function aggiornaSplit() {
  const disponibili = splitDisponibili(stato);
  const mostrabile = gioco && turnogiocatore && !inAnimazione && disponibili.length > 0;
  $('btn-split').classList.toggle('visibile', mostrabile);
  if (!mostrabile) {
    $('split-opzioni').classList.remove('visibile');
  }
}

/* Mostra un messaggio di banner per la durata indicata (ms); poi richiama cb. */
function mostraBanner(testo, durata, cb) {
  const b = $('banner-turno');
  b.textContent = testo;
  b.classList.add('visibile');
  setTimeout(() => {
    b.classList.remove('visibile');
    if (cb) setTimeout(cb, 400);
  }, durata);
}

// ----- Ciclo di gioco --------------------------------------------------------

/* Avvia una nuova partita: reset stato, estrazione casuali, primo turno. */
function nuovaPartita() {
  stato.bs = stato.bd = stato.ps = stato.pd = 1;
  cp = randInt(1, 4);
  cp2 = randInt(1, 4);
  const turno = randInt(1, 2);     // 1 = inizia il player, 2 = inizia il bot
  turnogiocatore = (turno === 1);
  gioco = false;
  pausa = false;
  inAnimazione = false;
  selezione = null;
  $('overlay-fine').classList.remove('visibile');
  aggiornaMani();
  mostraSchermata('screen-game');

  if (turno === 1) {
    mostraBanner('È IL TUO TURNO', 1800, () => { gioco = true; aggiornaSplit(); });
  } else {
    mostraBanner("È IL TURNO DELL'AVVERSARIO", 1800, () => { gioco = true; turnoBot(); });
  }
}

/* Click su una mano del player: la seleziona come attaccante. */
function selezionaAttaccante(mano) {
  if (!gioco || pausa || inAnimazione || !turnogiocatore) return;
  if (stato[mano] === 5) return; // mano morta non selezionabile
  selezione = mano;
  $(ID_MANO.ps).classList.toggle('selezionata', mano === 'ps');
  $(ID_MANO.pd).classList.toggle('selezionata', mano === 'pd');
}

/* Click su una mano del bot: bersaglio dell'attacco del player. */
function colpisciBot(mano) {
  if (!gioco || pausa || inAnimazione || !turnogiocatore) return;
  if (!selezione) return;          // serve prima scegliere l'attaccante
  if (stato[mano] === 5) return;   // bersaglio morto
  eseguiAttacco('player', selezione, mano);
}

/*
 * Calcola la trasformazione CSS dell'animazione di attacco: la mano attaccante
 * si protende verso il bersaglio. Spostamento verticale (bot in giù, player in
 * su) e, per gli attacchi diagonali, anche orizzontale verso l'altro lato.
 * Mantiene la specularità delle mani di destra (scaleX(-1)).
 */
function trasformazioneAttacco(src, tgt) {
  const latoSrc = (src === 'bs' || src === 'ps') ? 'sx' : 'dx';
  const latoTgt = (tgt === 'bs' || tgt === 'ps') ? 'sx' : 'dx';
  const eBot = (src === 'bs' || src === 'bd');
  const incrociato = latoSrc !== latoTgt;
  const dy = eBot ? '55%' : '-55%';                  // verso il centro/avversario
  const dx = incrociato ? (latoSrc === 'sx' ? 230 : -230) : 0; // verso l'altro lato
  const mirror = latoSrc === 'dx' ? ' scaleX(-1)' : '';
  return `translate(${dx}px, ${dy}) scale(1.05)${mirror}`;
}

/*
 * Esegue un attacco (player o bot) con animazione.
 * chi = 'player' | 'bot'; src = mano attaccante; tgt = mano colpita.
 */
function eseguiAttacco(chi, src, tgt) {
  inAnimazione = true;
  selezione = null;
  $(ID_MANO.ps).classList.remove('selezionata');
  $(ID_MANO.pd).classList.remove('selezionata');
  aggiornaSplit();

  const elSrc = $(ID_MANO[src]);
  elSrc.style.zIndex = '4';     // l'attaccante passa SOPRA le mani avversarie
  elSrc.style.transform = trasformazioneAttacco(src, tgt);

  setTimeout(() => {
    elSrc.style.transform = ''; // torna alla posizione base (CSS)
    // Applica la regola numerica: tgt += src (con normalizzazione >5 -> -5).
    stato[tgt] = normalizza(stato[tgt] + stato[src]);
    aggiornaMani();

    setTimeout(() => {
      elSrc.style.zIndex = '';  // ripristina l'ordine normale a ritorno finito
      inAnimazione = false;
      if (fineSeFinita()) return;
      // Passa il turno all'altro contendente.
      if (chi === 'player') {
        turnogiocatore = false;
        setTimeout(turnoBot, 650);
      } else {
        turnogiocatore = true;
        aggiornaSplit();
      }
    }, 500);
  }, 480);
}

/* Turno del bot: sceglie la mossa con la logica originale e la esegue. */
function turnoBot() {
  if (!gioco || pausa) return;
  const mossa = botScegliMossa({ ...stato, cp, cp2 });
  if (mossa.tipo === 'attacco') {
    eseguiAttacco('bot', mossa.src, mossa.tgt);
  } else {
    eseguiSplitBot(mossa);
  }
}

/* Split del bot: rianima la mano morta ridistribuendo le dita. */
function eseguiSplitBot(mossa) {
  inAnimazione = true;
  stato.bs = mossa.bs;
  stato.bd = mossa.bd;
  aggiornaMani();
  setTimeout(() => {
    inAnimazione = false;
    if (fineSeFinita()) return;
    turnogiocatore = true;
    aggiornaSplit();
  }, 700);
}

/* Apre la lista delle ridistribuzioni possibili per lo split del player. */
function apriOpzioniSplit() {
  if (!gioco || pausa || inAnimazione || !turnogiocatore) return;
  const cont = $('split-opzioni');
  cont.innerHTML = '';
  for (const opz of splitDisponibili(stato)) {
    const b = document.createElement('button');
    b.textContent = `${opz.ps} | ${opz.pd}`;
    b.onclick = () => eseguiSplitPlayer(opz);
    cont.appendChild(b);
  }
  cont.classList.add('visibile');
}

/* Applica lo split scelto dal player e passa il turno al bot. */
function eseguiSplitPlayer(opz) {
  $('split-opzioni').classList.remove('visibile');
  $('btn-split').classList.remove('visibile');
  inAnimazione = true;
  stato.ps = opz.ps;
  stato.pd = opz.pd;
  aggiornaMani();
  setTimeout(() => {
    inAnimazione = false;
    if (fineSeFinita()) return;
    turnogiocatore = false;
    setTimeout(turnoBot, 650);
  }, 500);
}

/* Se la partita è finita mostra l'overlay e ritorna true. */
function fineSeFinita() {
  const esito = esitoPartita(stato);
  if (!esito) return false;
  gioco = false;
  $('testo-fine').textContent = esito === 'vinto' ? 'HAI VINTO' : 'HAI PERSO';
  $('overlay-fine').classList.add('visibile');
  return true;
}

// ----- Pausa -----------------------------------------------------------------

/* Alterna lo stato di pausa mostrando l'overlay di fine come menu. */
function togglePausa() {
  if (!gioco) return;
  pausa = !pausa;
  if (pausa) {
    $('testo-fine').textContent = 'PAUSA';
    $('overlay-fine').classList.add('visibile');
  } else {
    $('overlay-fine').classList.remove('visibile');
  }
}

// ----- Collegamento eventi UI ------------------------------------------------

function initUI() {
  $('btn-play').onclick = nuovaPartita;
  $('btn-credits').onclick = () => mostraSchermata('screen-credits');
  $('btn-credits-back').onclick = () => mostraSchermata('screen-home');

  $(ID_MANO.ps).onclick = () => selezionaAttaccante('ps');
  $(ID_MANO.pd).onclick = () => selezionaAttaccante('pd');
  $(ID_MANO.bs).onclick = () => colpisciBot('bs');
  $(ID_MANO.bd).onclick = () => colpisciBot('bd');

  $('btn-split').onclick = apriOpzioniSplit;
  $('btn-pause').onclick = togglePausa;
  $('btn-restart').onclick = nuovaPartita;
  $('btn-home').onclick = () => { pausa = false; mostraSchermata('screen-home'); };

  ridimensionaStage();
  window.addEventListener('resize', ridimensionaStage);
}

/* Scala lo stage 480x854 per riempire la finestra mantenendo le proporzioni. */
function ridimensionaStage() {
  const scala = Math.min(window.innerWidth / 480, window.innerHeight / 854);
  $('stage').style.transform = `translate(-50%, -50%) scale(${scala})`;
}

document.addEventListener('DOMContentLoaded', initUI);
