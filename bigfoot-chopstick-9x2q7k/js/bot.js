/*
 * bot.js — Logica del bot "facile", trascritta FEDELMENTE dall'event sheet
 * originale di Construct (eventi 7..57 del gruppo "bot 'facile'").
 *
 * Convenzioni mani:
 *   bs = BotSinistra, bd = BotDestra (mani del Bigfoot, in alto)
 *   ps = PlayerSinistra, pd = PlayerDestra (mani umane, in basso)
 * Valori: 1..4 = mano viva con quel numero di dita; 5 = mano morta.
 *
 * Variabili casuali per partita (estratte una volta a inizio gioco):
 *   cp  = casualePartita  (1..4) -> sceglie la "personalità" difensiva
 *   cp2 = casualepartita2 (1..4) -> sceglie la mossa in caso di pareggio
 *
 * La catena originale è una sequenza di eventi con "Altrimenti" (else-if):
 * il PRIMO che combacia esegue la mossa e passa il turno. Qui la replichiamo
 * come lista ordinata di regole: la prima che ritorna una mossa vince.
 */

// Predicato: la mano vale 5 (morta).
function morta(v) { return v === 5; }

/*
 * Costruttore mossa di attacco.
 * src = mano del bot che attacca ('bd' o 'bs')
 * tgt = mano del player colpita ('pd' o 'ps')
 * L'animazione (SDgiu/SDlato/SSgiu/SSlato) è derivata da src+tgt.
 */
function attacco(src, tgt) {
  // giu = stesso lato (bd->pd, bs->ps); lato = diagonale (bd->ps, bs->pd)
  const lato = (src === 'bd') ? (tgt === 'pd' ? 'giu' : 'lato')
                              : (tgt === 'ps' ? 'giu' : 'lato');
  const anim = (src === 'bd' ? 'SD' : 'SS') + lato; // es. SDgiu
  return { tipo: 'attacco', src, tgt, anim };
}

/*
 * botScegliMossa — restituisce la mossa scelta dal bot dato lo stato.
 * stato = { bs, bd, ps, pd, cp, cp2 }
 * rng() opzionale -> intero 1..2 per i casi casualeS/casualeM (default Math.random).
 * Ritorna { tipo:'attacco', src, tgt, anim } oppure
 *          { tipo:'split', bs, bd, revive } oppure null (mai, c'è sempre il fallback).
 */
function botScegliMossa(stato, rng) {
  const { bs, bd, ps, pd, cp, cp2 } = stato;
  const rnd2 = rng || (() => 1 + Math.floor(Math.random() * 2));

  // --- E7..E10: aperture su stati specifici --------------------------------
  if (bs === 2 && bd === 1 && ps === 2 && pd === 1) return attacco('bd', 'pd'); // E7
  if (bs === 2 && bd === 1 && ps === 1 && pd === 2) return attacco('bd', 'ps'); // E8
  if (bs === 1 && bd === 2 && ps === 2 && pd === 1) return attacco('bs', 'pd'); // E9
  if (bs === 1 && bd === 2 && ps === 1 && pd === 2) return attacco('bs', 'ps'); // E10

  // --- E11..E14: pareggio dei totali, mossa scelta da cp2 -------------------
  if (!morta(pd) && !morta(ps) && !morta(bd) && !morta(bs) && (ps + pd === bs + bd)) {
    if (cp2 === 1) return attacco('bs', 'pd'); // E11
    if (cp2 === 2) return attacco('bs', 'ps'); // E12
    if (cp2 === 3) return attacco('bd', 'pd'); // E13
    if (cp2 === 4) return attacco('bd', 'ps'); // E14
  }

  // --- E15..E18: mosse che uccidono una mano avversaria (somma = 5) ---------
  if (bd + pd === 5 && !morta(bd) && !morta(pd)) return attacco('bd', 'pd'); // E15
  if (bd + ps === 5 && !morta(bd) && !morta(ps)) return attacco('bd', 'ps'); // E16
  if (bs + pd === 5 && !morta(bs) && !morta(pd)) return attacco('bs', 'pd'); // E17
  if (bs + ps === 5 && !morta(bs) && !morta(ps)) return attacco('bs', 'ps'); // E18

  // --- E19..E38: 4 "personalità" difensive selezionate da cp ---------------
  // Pattern di ogni regola: condizione positiva sulla coppia "opposta",
  // condizione negativa sulla coppia d'azione, e mani d'azione vive.
  // (verbatim dagli eventi; vedi note in cima)
  if (cp === 1) {
    // E20
    if (bs + ps === 5 - bs && !(bd + pd === 5 - bd) && !morta(bd) && !morta(pd)) return attacco('bd', 'pd');
    // E21
    if (bs + pd === 5 - bs && !(bd + ps === 5 - bd) && !morta(bd) && !morta(ps)) return attacco('bd', 'ps');
    // E22
    if (bd + pd === 5 - bd && !(bs + ps === 5 - bs) && !morta(bs) && !morta(ps)) return attacco('bs', 'ps');
    // E23
    if (bd + ps === 5 - bd && !(bs + pd === 5 - bs) && !morta(bs) && !morta(pd)) return attacco('bs', 'pd');
  } else if (cp === 2) {
    // E25
    if (bd + ps === 5 - bd && !(bs + pd === 5 - bs) && !morta(bs) && !morta(pd)) return attacco('bs', 'pd');
    // E26
    if (bd + pd === 5 - bd && !(bs + ps === 5 - bs) && !morta(bs) && !morta(ps)) return attacco('bs', 'ps');
    // E27
    if (bs + pd === 5 - bs && !(bd + ps === 5 - bd) && !morta(bd) && !morta(ps)) return attacco('bd', 'ps');
    // E28
    if (bs + ps === 5 - bs && !(bd + pd === 5 - bd) && !morta(bd) && !morta(pd)) return attacco('bd', 'pd');
  } else if (cp === 3) {
    // E30
    if (bs + pd === 5 - bs && !(bd + ps === 5 - bd) && !morta(bd) && !morta(ps)) return attacco('bd', 'ps');
    // E31
    if (bs + ps === 5 - bs && !(bd + pd === 5 - bd) && !morta(bd) && !morta(pd)) return attacco('bd', 'pd');
    // E32
    if (bd + ps === 5 - bd && !(bs + pd === 5 - bs) && !morta(bs) && !morta(pd)) return attacco('bs', 'pd');
    // E33
    if (bd + pd === 5 - bd && !(bs + ps === 5 - bs) && !morta(bs) && !morta(ps)) return attacco('bs', 'ps');
  } else if (cp === 4) {
    // E35
    if (bd + pd === 5 - bd && !(bs + ps === 5 - bs) && !morta(bs) && !morta(ps)) return attacco('bs', 'ps');
    // E36
    if (bd + ps === 5 - bd && !(bs + pd === 5 - bs) && !morta(bs) && !morta(pd)) return attacco('bs', 'pd');
    // E37
    if (bs + ps === 5 - bs && !(bd + pd === 5 - bd) && !morta(bd) && !morta(pd)) return attacco('bd', 'pd');
    // E38
    if (bs + pd === 5 - bs && !(bd + ps === 5 - bd) && !morta(bd) && !morta(ps)) return attacco('bd', 'ps');
  }

  // --- E39..E42: fallback (solo condizione positiva + mani vive) ------------
  if (bs + ps === 5 - bs && !morta(bd) && !morta(pd)) return attacco('bd', 'pd'); // E39
  if (bs + pd === 5 - bs && !morta(bd) && !morta(ps)) return attacco('bd', 'ps'); // E40
  if (bd + pd === 5 - bd && !morta(bs) && !morta(ps)) return attacco('bs', 'ps'); // E41
  if (bd + ps === 5 - bd && !morta(bs) && !morta(pd)) return attacco('bs', 'pd'); // E42

  // --- E43..E46: split quando una mano del bot è morta ----------------------
  // (valori già normalizzati: >5 -> -5)
  if (bs === 5 && bd === 2) return { tipo: 'split', bs: 1, bd: 1, revive: 'bs' }; // E43
  if (bs === 5 && bd === 4) return { tipo: 'split', bs: 2, bd: 2, revive: 'bs' }; // E44
  if (bd === 5 && bs === 2) return { tipo: 'split', bs: 1, bd: 1, revive: 'bd' }; // E45
  if (bd === 5 && bs === 4) return { tipo: 'split', bs: 2, bd: 2, revive: 'bd' }; // E46

  // --- E47..E57: mossa forzata legale -------------------------------------
  // casualeS = mano del bot che attacca (1 = destra, 2 = sinistra)
  let casualeS;
  if (bd === 5) casualeS = 2;          // E48: destra morta -> usa sinistra
  else if (bs === 5) casualeS = 1;     // E49: sinistra morta -> usa destra
  else casualeS = rnd2();              // E50: entrambe vive -> casuale 1..2
  // casualeM = mano del player colpita (1 = destra, 2 = sinistra)
  let casualeM;
  if (pd === 5) casualeM = 2;          // E51
  else if (ps === 5) casualeM = 1;     // E52
  else casualeM = rnd2();              // E53
  // E54..E57: combinazioni
  if (casualeS === 1 && casualeM === 1) return attacco('bd', 'pd'); // E54
  if (casualeS === 1 && casualeM === 2) return attacco('bd', 'ps'); // E55
  if (casualeS === 2 && casualeM === 1) return attacco('bs', 'pd'); // E56
  return attacco('bs', 'ps');                                       // E57
}

// Esporta per uso da modulo o browser globale.
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { botScegliMossa, attacco, morta };
}
