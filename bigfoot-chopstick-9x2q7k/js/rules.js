/*
 * rules.js — Regole numeriche del gioco (variante "chopsticks").
 * Valore mano: 1..4 viva, 5 morta. Quando una somma supera 5 si sottrae 5
 * (rollover); se cade esattamente su 5 la mano muore.
 */

// Normalizza il valore di una mano dopo un'addizione: >5 -> -5, 5 resta morta.
function normalizza(v) {
  return v > 5 ? v - 5 : v;
}

// Vero se la mano è morta (vale 5).
function manoMorta(v) {
  return v === 5;
}

/*
 * Applica un attacco allo stato (muta una copia e la ritorna).
 * stato = { bs, bd, ps, pd }, src = mano attaccante, tgt = mano colpita.
 */
function applicaAttacco(stato, src, tgt) {
  const nuovo = { ...stato };
  nuovo[tgt] = normalizza(nuovo[tgt] + nuovo[src]);
  return nuovo;
}

/*
 * Esito partita dal punto di vista del player.
 * Ritorna 'vinto' (bot con entrambe le mani morte),
 * 'perso' (player con entrambe morte) o null (in corso).
 */
function esitoPartita(stato) {
  if (manoMorta(stato.bs) && manoMorta(stato.bd)) return 'vinto';
  if (manoMorta(stato.ps) && manoMorta(stato.pd)) return 'perso';
  return null;
}

/*
 * Elenco delle ridistribuzioni valide per uno split del player.
 * Si può splittare solo quando UNA mano è morta e l'altra vale >=2.
 * Ritorna array di coppie { ps, pd } possibili (entrambe vive, totale invariato,
 * configurazione diversa da quella attuale).
 */
function splitDisponibili(stato) {
  const vivaSinistra = !manoMorta(stato.ps);
  const vivaDestra = !manoMorta(stato.pd);
  // Serve esattamente una mano viva.
  if (vivaSinistra === vivaDestra) return [];
  const totale = vivaSinistra ? stato.ps : stato.pd;
  if (totale < 2) return [];
  const opzioni = [];
  // Distribuisci 'totale' tra le due mani, entrambe vive (1..4).
  for (let a = 1; a <= 4; a++) {
    const b = totale - a;
    if (b >= 1 && b <= 4) opzioni.push({ ps: a, pd: b });
  }
  return opzioni;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { normalizza, manoMorta, applicaAttacco, esitoPartita, splitDisponibili };
}
