/* ============================================================
   i18n.js — tutti i contenuti del sito, nelle due lingue.

   Va caricato PRIMA di script.js (entrambi defer, l'ordine dei tag comanda):
   script.js legge le costanti globali LANG e T definite qui.

   Perché i contenuti stanno qui e non in script.js: sono testo, non logica, e
   in due lingue raddoppiano. Tenerli separati lascia script.js sul suo lavoro
   — typing, geometria, numeri di riga — e rende ovvio dove si aggiunge roba.

   Regola per aggiungere contenuto: ogni chiave esiste in ENTRAMBE le lingue.
   Un ramo `en` incompleto non degrada in italiano, dà undefined a schermo.
   ============================================================ */

/* Lingua attiva. Precedenza: scelta manuale salvata → lingua del browser →
   italiano. La scelta manuale è definitiva, non viene mai riscritta da
   navigator.language: chi ha cliccato IT da un browser inglese resta in IT.
   Ritorna "it" oppure "en". */
const LINGUE = ["it", "en"];
function linguaIniziale() {
  let salvata = null;
  // localStorage può lanciare in navigazione privata o con i cookie bloccati:
  // in quel caso si ricade sulla lingua del browser, non si rompe la pagina.
  try { salvata = localStorage.getItem("lang"); } catch (e) {}
  if (LINGUE.includes(salvata)) return salvata;
  return (navigator.language || "").toLowerCase().startsWith("it") ? "it" : "en";
}
const LANG = linguaIniziale();

const CONTENUTI = {

  /* ══════════════════════ ITALIANO ══════════════════════ */
  it: {
    htmlLang: "it",

    bio: "/*\nSono uno sviluppatore web full stack di 19 anni. Progetto e sviluppo applicazioni web curando frontend e backend, con attenzione a performance, usabilità e mantenibilità. Affronto i problemi in modo analitico, con particolare attenzione al debug e all'ottimizzazione.\n*/",

    // Righe di apertura e chiusura di ogni sezione: sono codice finto, quindi i
    // nomi delle variabili si traducono insieme al resto.
    titoli: {
      percorso:  "const percorso = {",
      strumenti: "const strumenti = [",
      progetti:  "const progetti = [",
      contatti:  "const contatti = {",
    },

    // Chiavi = periodi, l'ordine di scrittura è l'ordine di visualizzazione.
    // Il valore può essere una stringa o { display, href } per rendere la riga un link.
    percorso: {
      "2025 — in corso": {
        display: 'ITS Digital Academy "Mario Volpato", Web Developer Full Stack',
        href: "https://itsdigitalacademy.com/corsi/web-developer-full-stack/"
      },
      "2026 — in corso": {
        display: "Stage, ELAN42 digital agency",
        href: "https://elan42.com/"
      },
    },

    // Le chiavi diventano i commenti "// linguaggi" sopra ogni riga di icone.
    strumenti: {
      linguaggi: ["Python", "Java", "JS", "HTML", "CSS"],
      runtime:   ["Node.js", "Express", "Docker"],
      database:  ["SQL"],
      tools:     ["Git", "GitHub", "VSCode"],
      ai:        ["Claude Code", "MCP", "Gemini"],
    },

    progetti: [
      {
        nome: "Game of Life",
        desc: "Sfondo interattivo del sito",
        dettagli: `<div class="gol-desc">
  <p class="gol-desc-intro">Creato dal matematico <span class="gol-hl">John Horton Conway</span> nel <span class="gol-hl">1970</span>, il Game of Life è un automa cellulare che simula l'evoluzione di una popolazione su una griglia. Non è un gioco nel senso tradizionale — non ci sono giocatori né obiettivi — ma una simulazione che si svolge da sola. Ogni cella può essere viva ■ o morta □ e, in base allo stato delle celle circostanti (dette "vicini"), il suo stato cambierà alla generazione successiva — dimostrando come comportamenti <span class="gol-hl">complessi</span> possano <span class="gol-hl">emergere</span> da poche semplici regole:</p>
  <p class="gol-desc-section-title">// regole</p>
  <div class="gol-rules-row">
    <div class="gol-rule">
      <div class="gol-rule-icon">
        <div class="gol-rule-grid">
          <b class="gi d"></b><b class="gi d"></b><b class="gi d"></b>
          <b class="gi d"></b><b class="gi a c"></b><b class="gi d"></b>
          <b class="gi d"></b><b class="gi d"></b><b class="gi a"></b>
        </div>
        <span class="gol-rule-arrow">→</span>
        <b class="gi r d"></b>
      </div>
      <span class="gol-rule-label">Una cella viva con meno di 2 vicini vivi → muore (sottopopolazione)</span>
    </div>
    <div class="gol-rule">
      <div class="gol-rule-icon">
        <div class="gol-rule-grid">
          <b class="gi d"></b><b class="gi a"></b><b class="gi d"></b>
          <b class="gi d"></b><b class="gi a c"></b><b class="gi d"></b>
          <b class="gi d"></b><b class="gi a"></b><b class="gi d"></b>
        </div>
        <span class="gol-rule-arrow">→</span>
        <b class="gi r a"></b>
      </div>
      <span class="gol-rule-label">Una cella viva con 2 o 3 vicini vivi → sopravvive</span>
    </div>
    <div class="gol-rule">
      <div class="gol-rule-icon">
        <div class="gol-rule-grid">
          <b class="gi a"></b><b class="gi a"></b><b class="gi a"></b>
          <b class="gi a"></b><b class="gi a c"></b><b class="gi d"></b>
          <b class="gi d"></b><b class="gi d"></b><b class="gi d"></b>
        </div>
        <span class="gol-rule-arrow">→</span>
        <b class="gi r d"></b>
      </div>
      <span class="gol-rule-label">Una cella viva con più di 3 vicini vivi → muore (sovrappopolazione)</span>
    </div>
    <div class="gol-rule">
      <div class="gol-rule-icon">
        <div class="gol-rule-grid">
          <b class="gi d"></b><b class="gi a"></b><b class="gi d"></b>
          <b class="gi a"></b><b class="gi d c"></b><b class="gi a"></b>
          <b class="gi d"></b><b class="gi d"></b><b class="gi d"></b>
        </div>
        <span class="gol-rule-arrow">→</span>
        <b class="gi r a"></b>
      </div>
      <span class="gol-rule-label">Una cella morta con esattamente 3 vicini vivi → nasce</span>
    </div>
  </div>
  <p class="gol-desc-section-title">// tecnologie</p>
  <div class="gol-tech-row"><span class="tech-tag">JS</span><span class="tech-tag">Canvas 2D</span><span class="tech-tag">requestAnimationFrame</span></div>
  <p class="gol-desc-section-title">// interfaccia</p>
  <table class="gol-iface-table">
    <tr><td class="gol-iface-key">puntatore</td><td class="gol-iface-sep">→</td><td class="gol-iface-val">navigazione, nessun disegno</td></tr>
    <tr><td class="gol-iface-key">disegna</td><td class="gol-iface-sep">→</td><td class="gol-iface-val">click / drag aggiunge cellule</td></tr>
    <tr><td class="gol-iface-key">glider</td><td class="gol-iface-sep">→</td><td class="gol-iface-val">click piazza un glider casuale</td></tr>
    <tr><td class="gol-iface-key">pattern</td><td class="gol-iface-sep">→</td><td class="gol-iface-val">piazza strutture predefinite</td></tr>
    <tr><td class="gol-iface-key">modalità focus</td><td class="gol-iface-sep">→</td><td class="gol-iface-val">schermo intero</td></tr>
  </table>
  <p class="gol-iface-hint">play/pause · clear · reseed · velocità</p>
</div>`,
        tech: ["JS"],
        status: "LIVE",
        link: "#",
        isGol: true,
      },
      {
        nome: "Royale Arena",
        desc: "Piattaforma per tornei e statistiche tramite Clash Royale API",
        dettagli: `<div class="gol-desc">
  <p class="gol-desc-intro">PWA per clan di <span class="gol-hl">Clash Royale</span> progettata per essere usata nel modo più semplice possibile — nessun account, nessuna registrazione. Un codice condiviso è l'unico gate d'accesso. Per avviare un torneo basta <span class="gol-hl">selezionare i giocatori e premere start</span>: l'app recupera automaticamente le battaglie recenti tramite l'<span class="gol-hl">API ufficiale</span>, filtra solo quelle valide per il torneo in corso e aggiorna il bracket senza nessun intervento manuale.</p>
  <p class="gol-desc-section-title">// funzionalità</p>
  <table class="gol-iface-table">
    <tr><td class="gol-iface-key">clan</td><td class="gol-iface-sep">→</td><td class="gol-iface-val">creazione via codice condiviso, nessuna registrazione</td></tr>
    <tr><td class="gol-iface-key">tornei</td><td class="gol-iface-sep">→</td><td class="gol-iface-val">bracket automatico, partite collegate alle battaglie reali</td></tr>
    <tr><td class="gol-iface-key">classifiche</td><td class="gol-iface-sep">→</td><td class="gol-iface-val">statistiche per giocatore aggiornate via polling</td></tr>
    <tr><td class="gol-iface-key">manutenzione</td><td class="gol-iface-sep">→</td><td class="gol-iface-val">pg_cron invalida tornei inattivi ogni 30 min, pulisce clan vuoti ogni notte</td></tr>
  </table>
  <p class="gol-desc-section-title">// sicurezza</p>
  <p class="gol-iface-hint">modello flat — niente auth, niente token. codice clan = unico gate. isolamento dati garantito, attrito utente zero.</p>
  <p class="gol-desc-section-title">// tecnologie</p>
  <div class="gol-tech-row"><span class="tech-tag">Nuxt 4</span><span class="tech-tag">Vue 3</span><span class="tech-tag">Supabase</span><span class="tech-tag">PostgreSQL</span><span class="tech-tag">pg_cron</span><span class="tech-tag">PWA</span></div>
</div>`,
        tech: ["Nuxt 4", "Vue 3", "Supabase", "PWA"],
        status: "LIVE",
        link: "https://royalarena.it",
        github: "https://github.com/sasha-bolea/clash-royale-api",
      },
      {
        nome: "ELAN42 Time Tracker",
        desc: "TMS interno per il tracking ore e il controllo di gestione",
        dettagli: `<div class="gol-desc">
  <p class="gol-desc-intro">Time Management System interno di <span class="gol-hl">ELAN42</span>, nato per sostituire Clockify e abilitare il <span class="gol-hl">controllo di gestione</span>: analisi di redditività per singolo progetto. Replica le funzioni chiave di Clockify — tracking delle ore su progetti e task, distinzione <span class="gol-hl">fatturabile / non fatturabile</span>, reporting grafico — con i dati di riferimento (clienti, progetti, task) importati da <span class="gol-hl">Fatture in Cloud</span> e <span class="gol-hl">Asana</span>.</p>
  <p class="gol-desc-section-title">// funzionalità</p>
  <table class="gol-iface-table">
    <tr><td class="gol-iface-key">inserimento ore</td><td class="gol-iface-sep">→</td><td class="gol-iface-val">calendario, manuale o cronometro — tutte scrivono sulla stessa tabella</td></tr>
    <tr><td class="gol-iface-key">fatturabilità</td><td class="gol-iface-sep">→</td><td class="gol-iface-val">ogni attività distingue ore fatturabili e non fatturabili</td></tr>
    <tr><td class="gol-iface-key">reporting</td><td class="gol-iface-sep">→</td><td class="gol-iface-val">grafici per progetto e cliente, tariffe e redditività</td></tr>
    <tr><td class="gol-iface-key">asana</td><td class="gol-iface-sep">→</td><td class="gol-iface-val">progetti e task sincronizzati, widget ore dentro il task</td></tr>
    <tr><td class="gol-iface-key">sincronizzazione</td><td class="gol-iface-sep">→</td><td class="gol-iface-val">cache read-only, upsert idempotente, sync schedulate</td></tr>
  </table>
  <p class="gol-desc-section-title">// tecnologie</p>
  <div class="gol-tech-row"><span class="tech-tag">Laravel 13</span><span class="tech-tag">PHP 8.3</span><span class="tech-tag">React</span><span class="tech-tag">Inertia</span><span class="tech-tag">MariaDB</span><span class="tech-tag">Docker</span><span class="tech-tag">Tailwind</span></div>
</div>`,
        // Miniature: file in assets/screenshots/. Vuoto = nessuna striscia.
        screenshots: [
          { src: "assets/screenshots/tms-calendario.png",  alt: "Vista calendario con le ore inserite sulla settimana" },
          { src: "assets/screenshots/tms-statistiche.png", alt: "Statistiche: andamento settimanale, ore per progetto e per cliente" },
        ],
        tech: ["Laravel", "React", "MariaDB", "Docker"],
        status: "IN SVILUPPO",
      },
      {
        nome: "Claude Code Branching",
        desc: "CLI che apre l'albero dei rami di una conversazione Claude Code",
        dettagli: `<div class="gol-desc">
  <p class="gol-desc-intro">Claude Code ha il restore (Esc Esc), ma è un <span class="gol-hl">undo a senso unico</span>: una volta tornato indietro non c'è modo di rivedere i prompt e le risposte che hai lasciato. I dati però ci sono ancora — i transcript sono <span class="gol-hl">append-only</span>, il ramo abbandonato resta fisicamente nel file. <span class="gol-hl">cb</span> lo legge e te lo rimette davanti: si lancia al posto di <span class="gol-hl">claude</span>, intercetta un tasto e mostra l'albero dei rami, da cui riparti da qualsiasi messaggio. Pubblicato su npm.</p>
  <p class="gol-desc-section-title">// albero</p>
<pre class="cb-tree"><span class="cb-on">●━━━●━━━●━━━●━┳</span>━●━━━●━━━●━━━●
              <span class="cb-on">┗━●━┳━●━━━<span class="cb-cur">○</span></span>
                  ┗━●━━━●━━━●</pre>
  <p class="gol-iface-hint">○ riparti da qui · ┳ biforcazione · arancione = storia di questo punto</p>
  <p class="gol-desc-section-title">// funzionalità</p>
  <table class="gol-iface-table">
    <tr><td class="gol-iface-key">albero</td><td class="gol-iface-sep">→</td><td class="gol-iface-val">un nodo per prompt, ogni fork è un ramo — inclusi quelli abbandonati</td></tr>
    <tr><td class="gol-iface-key">ripartenza</td><td class="gol-iface-sep">→</td><td class="gol-iface-val">conversazione e codice, solo conversazione o solo codice</td></tr>
    <tr><td class="gol-iface-key">catalogo</td><td class="gol-iface-sep">→</td><td class="gol-iface-val">sessioni di tutti i progetti, raggruppate per uuid radice e non per file</td></tr>
    <tr><td class="gol-iface-key">wrapper</td><td class="gol-iface-sep">→</td><td class="gol-iface-val">pty attorno a Claude Code, tasto configurabile, niente da cambiare nel flusso</td></tr>
    <tr><td class="gol-iface-key">pulizia</td><td class="gol-iface-sep">→</td><td class="gol-iface-val">prune di sessioni troncate, copie file e auto-commit, automatico una volta al giorno</td></tr>
  </table>
  <p class="gol-desc-section-title">// tecnologie</p>
  <div class="gol-tech-row"><span class="tech-tag">Node.js</span><span class="tech-tag">node-pty</span><span class="tech-tag">CLI</span><span class="tech-tag">npm</span></div>
</div>`,
        tech: ["Node.js", "CLI", "npm"],
        status: "LIVE",
        link: "https://www.npmjs.com/package/claude-code-branching",
        linkLabel: "npm",
        github: "https://github.com/sasha-bolea/claude-code-branching",
      },
    ],

    contatti: {
      email:    "sashabol3a@gmail.com",
      github:   "github.com/sasha-bolea",
      linkedin: { display: "linkedin.com/in/alessandro-bolea", href: "https://www.linkedin.com/in/alessandro-bolea-651393264/" }
    },

    // Etichette dell'interfaccia: bottoni, tooltip, aria-label, easter egg.
    ui: {
      apri:            "open",
      temaScuro:       "//Devs: Beware",
      temaChiaro:      "//Back to the Cave",
      golVelocita:     "velocità",
      golLento:        "lento",
      golVeloce:       "veloce",
      golRiduci:       "Riduci controlli",
      golPausaPlay:    "Pausa / Play",
      golPassoSingolo: "Passo singolo",
      golAvanza:       "Avanza di una generazione",
      golPulisci:      "Pulisci",
      golPulisciGriglia: "Pulisci griglia",
      golReseed:       "Re-seed",
      golNuovaGen:     "Nuova generazione",
      golPuntatore:    "Puntatore (non disegna)",
      golDisegna:      "Disegna trascinando",
      golGlider:       "Glider",
      golPattern:      "Pattern",
      golFocus:        "Modalit&agrave; focus",
      chiudi:          "Chiudi",
      eeAccesso:       "✓ Accesso concesso.",
      eeTrovato:       "✓ Easter egg trovato!",
      eeBravo:         '  — hai digitato "sudo", bravo hacker.',
    },

    golPattern: {
      "gosper-gun":     { title: "Gosper Glider Gun", desc: "Prima struttura capace di generazione infinita, scoperta da William Gosper nel 1970. Produce un glider ogni 30 generazioni." },
      "pulsar":         { title: "Pulsar", desc: "Oscillatore di periodo 3. Uno dei pattern più simmetrici e visivamente ipnotici del GoL." },
      "pentadecathlon": { title: "Pentadecathlon", desc: "Oscillatore di periodo 15 — tra i più alti per una struttura così semplice. Prende il nome dal ciclo olimpico." },
      "acorn":          { title: "Acorn", desc: "Methuselah da 7 celle. Cresce in modo caotico per 5206 generazioni prima di stabilizzarsi in 633 celle." },
      "diehard":        { title: "Diehard", desc: "Methuselah da 7 celle. Sopravvive per 130 generazioni, poi scompare completamente senza lasciare traccia." },
      "lwss":           { title: "Lightweight Spaceship", desc: "Il più piccolo degli spaceship standard. Si muove orizzontalmente di 2 celle ogni 4 generazioni (velocità c/2). Scoperto da John Conway nel 1970." },
      "beacon":         { title: "Beacon", desc: "Oscillatore di periodo 2 formato da due blocchi 2×2 sovrapposti a un angolo. Uno dei più semplici e comuni oscillatori del GoL." },
      "pi-heptomino":   { title: "Pi-Heptomino\n(il mio preferito)", desc: "Methuselah da 7 celle a forma di π. Evolve in modo caotico per 173 generazioni prima di stabilizzarsi in una configurazione con glider." },
      "switch-engine":  { title: "Switch Engine", desc: "Struttura da 8 celle scoperta da Charles Corderman nel 1971. Cresce in modo infinito lasciando una scia di detriti, muovendosi in diagonale a velocità c/12." },
      "copperhead":     { title: "Copperhead", desc: "Spaceship di periodo 10 scoperto nel 2016. Si muove verticalmente a velocità c/10. Notevole per la sua forma compatta e simmetrica." },
    },
  },

  /* ══════════════════════ ENGLISH ══════════════════════ */
  en: {
    htmlLang: "en",

    bio: "/*\nI'm a 19-year-old full stack web developer. I design and build web applications across frontend and backend, with an eye on performance, usability and maintainability. I approach problems analytically, with particular attention to debugging and optimization.\n*/",

    titoli: {
      percorso:  "const path = {",
      strumenti: "const tools = [",
      progetti:  "const projects = [",
      contatti:  "const contacts = {",
    },

    percorso: {
      "2025 — ongoing": {
        display: 'ITS Digital Academy "Mario Volpato", Web Developer Full Stack',
        href: "https://itsdigitalacademy.com/corsi/web-developer-full-stack/"
      },
      "2026 — ongoing": {
        display: "Internship, ELAN42 digital agency",
        href: "https://elan42.com/"
      },
    },

    strumenti: {
      languages: ["Python", "Java", "JS", "HTML", "CSS"],
      runtime:   ["Node.js", "Express", "Docker"],
      database:  ["SQL"],
      tools:     ["Git", "GitHub", "VSCode"],
      ai:        ["Claude Code", "MCP", "Gemini"],
    },

    progetti: [
      {
        nome: "Game of Life",
        desc: "The site's interactive background",
        dettagli: `<div class="gol-desc">
  <p class="gol-desc-intro">Created by the mathematician <span class="gol-hl">John Horton Conway</span> in <span class="gol-hl">1970</span>, the Game of Life is a cellular automaton simulating how a population evolves on a grid. It is not a game in the usual sense — there are no players and no goals — but a simulation that runs on its own. Each cell is either alive ■ or dead □ and, depending on the state of the cells around it (its "neighbours"), its own state changes in the next generation — showing how <span class="gol-hl">complex</span> behaviour can <span class="gol-hl">emerge</span> from a handful of simple rules:</p>
  <p class="gol-desc-section-title">// rules</p>
  <div class="gol-rules-row">
    <div class="gol-rule">
      <div class="gol-rule-icon">
        <div class="gol-rule-grid">
          <b class="gi d"></b><b class="gi d"></b><b class="gi d"></b>
          <b class="gi d"></b><b class="gi a c"></b><b class="gi d"></b>
          <b class="gi d"></b><b class="gi d"></b><b class="gi a"></b>
        </div>
        <span class="gol-rule-arrow">→</span>
        <b class="gi r d"></b>
      </div>
      <span class="gol-rule-label">A live cell with fewer than 2 live neighbours → dies (underpopulation)</span>
    </div>
    <div class="gol-rule">
      <div class="gol-rule-icon">
        <div class="gol-rule-grid">
          <b class="gi d"></b><b class="gi a"></b><b class="gi d"></b>
          <b class="gi d"></b><b class="gi a c"></b><b class="gi d"></b>
          <b class="gi d"></b><b class="gi a"></b><b class="gi d"></b>
        </div>
        <span class="gol-rule-arrow">→</span>
        <b class="gi r a"></b>
      </div>
      <span class="gol-rule-label">A live cell with 2 or 3 live neighbours → survives</span>
    </div>
    <div class="gol-rule">
      <div class="gol-rule-icon">
        <div class="gol-rule-grid">
          <b class="gi a"></b><b class="gi a"></b><b class="gi a"></b>
          <b class="gi a"></b><b class="gi a c"></b><b class="gi d"></b>
          <b class="gi d"></b><b class="gi d"></b><b class="gi d"></b>
        </div>
        <span class="gol-rule-arrow">→</span>
        <b class="gi r d"></b>
      </div>
      <span class="gol-rule-label">A live cell with more than 3 live neighbours → dies (overpopulation)</span>
    </div>
    <div class="gol-rule">
      <div class="gol-rule-icon">
        <div class="gol-rule-grid">
          <b class="gi d"></b><b class="gi a"></b><b class="gi d"></b>
          <b class="gi a"></b><b class="gi d c"></b><b class="gi a"></b>
          <b class="gi d"></b><b class="gi d"></b><b class="gi d"></b>
        </div>
        <span class="gol-rule-arrow">→</span>
        <b class="gi r a"></b>
      </div>
      <span class="gol-rule-label">A dead cell with exactly 3 live neighbours → is born</span>
    </div>
  </div>
  <p class="gol-desc-section-title">// technologies</p>
  <div class="gol-tech-row"><span class="tech-tag">JS</span><span class="tech-tag">Canvas 2D</span><span class="tech-tag">requestAnimationFrame</span></div>
  <p class="gol-desc-section-title">// interface</p>
  <table class="gol-iface-table">
    <tr><td class="gol-iface-key">pointer</td><td class="gol-iface-sep">→</td><td class="gol-iface-val">navigation only, no drawing</td></tr>
    <tr><td class="gol-iface-key">draw</td><td class="gol-iface-sep">→</td><td class="gol-iface-val">click / drag adds cells</td></tr>
    <tr><td class="gol-iface-key">glider</td><td class="gol-iface-sep">→</td><td class="gol-iface-val">click drops a random glider</td></tr>
    <tr><td class="gol-iface-key">pattern</td><td class="gol-iface-sep">→</td><td class="gol-iface-val">drops predefined structures</td></tr>
    <tr><td class="gol-iface-key">focus mode</td><td class="gol-iface-sep">→</td><td class="gol-iface-val">full screen</td></tr>
  </table>
  <p class="gol-iface-hint">play/pause · clear · reseed · speed</p>
</div>`,
        tech: ["JS"],
        status: "LIVE",
        link: "#",
        isGol: true,
      },
      {
        nome: "Royale Arena",
        desc: "Tournament and stats platform built on the Clash Royale API",
        dettagli: `<div class="gol-desc">
  <p class="gol-desc-intro">A PWA for <span class="gol-hl">Clash Royale</span> clans designed to be as frictionless as possible — no accounts, no sign-up. A shared code is the only gate. Starting a tournament takes <span class="gol-hl">picking the players and hitting start</span>: the app pulls recent battles through the <span class="gol-hl">official API</span>, keeps only the ones valid for the running tournament and updates the bracket with no manual work at all.</p>
  <p class="gol-desc-section-title">// features</p>
  <table class="gol-iface-table">
    <tr><td class="gol-iface-key">clans</td><td class="gol-iface-sep">→</td><td class="gol-iface-val">created via a shared code, no registration</td></tr>
    <tr><td class="gol-iface-key">tournaments</td><td class="gol-iface-sep">→</td><td class="gol-iface-val">automatic bracket, matches tied to real battles</td></tr>
    <tr><td class="gol-iface-key">rankings</td><td class="gol-iface-sep">→</td><td class="gol-iface-val">per-player stats refreshed by polling</td></tr>
    <tr><td class="gol-iface-key">upkeep</td><td class="gol-iface-sep">→</td><td class="gol-iface-val">pg_cron voids idle tournaments every 30 min, clears empty clans nightly</td></tr>
  </table>
  <p class="gol-desc-section-title">// security</p>
  <p class="gol-iface-hint">flat model — no auth, no tokens. the clan code is the only gate. data isolation holds, user friction is zero.</p>
  <p class="gol-desc-section-title">// technologies</p>
  <div class="gol-tech-row"><span class="tech-tag">Nuxt 4</span><span class="tech-tag">Vue 3</span><span class="tech-tag">Supabase</span><span class="tech-tag">PostgreSQL</span><span class="tech-tag">pg_cron</span><span class="tech-tag">PWA</span></div>
</div>`,
        tech: ["Nuxt 4", "Vue 3", "Supabase", "PWA"],
        status: "LIVE",
        link: "https://royalarena.it",
        github: "https://github.com/sasha-bolea/clash-royale-api",
      },
      {
        nome: "ELAN42 Time Tracker",
        desc: "Internal TMS for time tracking and management reporting",
        dettagli: `<div class="gol-desc">
  <p class="gol-desc-intro">The internal Time Management System of <span class="gol-hl">ELAN42</span>, built to replace Clockify and to enable <span class="gol-hl">management reporting</span>: profitability analysis per single project. It covers Clockify's key functions — tracking hours against projects and tasks, splitting <span class="gol-hl">billable / non-billable</span>, graphical reporting — with the reference data (clients, projects, tasks) imported from <span class="gol-hl">Fatture in Cloud</span> and <span class="gol-hl">Asana</span>.</p>
  <p class="gol-desc-section-title">// features</p>
  <table class="gol-iface-table">
    <tr><td class="gol-iface-key">logging hours</td><td class="gol-iface-sep">→</td><td class="gol-iface-val">calendar, manual entry or stopwatch — all three write to the same table</td></tr>
    <tr><td class="gol-iface-key">billability</td><td class="gol-iface-sep">→</td><td class="gol-iface-val">every entry separates billable from non-billable hours</td></tr>
    <tr><td class="gol-iface-key">reporting</td><td class="gol-iface-sep">→</td><td class="gol-iface-val">charts per project and client, rates and profitability</td></tr>
    <tr><td class="gol-iface-key">asana</td><td class="gol-iface-sep">→</td><td class="gol-iface-val">projects and tasks synced, hours widget inside the task</td></tr>
    <tr><td class="gol-iface-key">syncing</td><td class="gol-iface-sep">→</td><td class="gol-iface-val">read-only cache, idempotent upsert, scheduled syncs</td></tr>
  </table>
  <p class="gol-desc-section-title">// technologies</p>
  <div class="gol-tech-row"><span class="tech-tag">Laravel 13</span><span class="tech-tag">PHP 8.3</span><span class="tech-tag">React</span><span class="tech-tag">Inertia</span><span class="tech-tag">MariaDB</span><span class="tech-tag">Docker</span><span class="tech-tag">Tailwind</span></div>
</div>`,
        screenshots: [
          { src: "assets/screenshots/tms-calendario.png",  alt: "Calendar view with the hours logged across the week" },
          { src: "assets/screenshots/tms-statistiche.png", alt: "Stats: weekly trend, hours per project and per client" },
        ],
        tech: ["Laravel", "React", "MariaDB", "Docker"],
        status: "IN PROGRESS",
      },
      {
        nome: "Claude Code Branching",
        desc: "CLI that opens the branch tree of a Claude Code conversation",
        dettagli: `<div class="gol-desc">
  <p class="gol-desc-intro">Claude Code has restore (Esc Esc), but it is a <span class="gol-hl">one-way undo</span>: once you have gone back there is no way to see the prompts and answers you left behind. The data is still there, though — transcripts are <span class="gol-hl">append-only</span>, so the abandoned branch physically stays in the file. <span class="gol-hl">cb</span> reads it and puts it back in front of you: run it instead of <span class="gol-hl">claude</span>, press a key and the branch tree appears, ready to restart from any message. Published on npm.</p>
  <p class="gol-desc-section-title">// tree</p>
<pre class="cb-tree"><span class="cb-on">●━━━●━━━●━━━●━┳</span>━●━━━●━━━●━━━●
              <span class="cb-on">┗━●━┳━●━━━<span class="cb-cur">○</span></span>
                  ┗━●━━━●━━━●</pre>
  <p class="gol-iface-hint">○ restart here · ┳ fork · orange = history of this point</p>
  <p class="gol-desc-section-title">// features</p>
  <table class="gol-iface-table">
    <tr><td class="gol-iface-key">tree</td><td class="gol-iface-sep">→</td><td class="gol-iface-val">one node per prompt, every fork is a branch — abandoned ones included</td></tr>
    <tr><td class="gol-iface-key">restart</td><td class="gol-iface-sep">→</td><td class="gol-iface-val">conversation and code, conversation only, or code only</td></tr>
    <tr><td class="gol-iface-key">catalogue</td><td class="gol-iface-sep">→</td><td class="gol-iface-val">sessions across every project, grouped by root uuid instead of by file</td></tr>
    <tr><td class="gol-iface-key">wrapper</td><td class="gol-iface-sep">→</td><td class="gol-iface-val">a pty around Claude Code, configurable key, nothing to change in your flow</td></tr>
    <tr><td class="gol-iface-key">cleanup</td><td class="gol-iface-sep">→</td><td class="gol-iface-val">prunes truncated sessions, file copies and auto-commits, once a day on its own</td></tr>
  </table>
  <p class="gol-desc-section-title">// technologies</p>
  <div class="gol-tech-row"><span class="tech-tag">Node.js</span><span class="tech-tag">node-pty</span><span class="tech-tag">CLI</span><span class="tech-tag">npm</span></div>
</div>`,
        tech: ["Node.js", "CLI", "npm"],
        status: "LIVE",
        link: "https://www.npmjs.com/package/claude-code-branching",
        linkLabel: "npm",
        github: "https://github.com/sasha-bolea/claude-code-branching",
      },
    ],

    contatti: {
      email:    "sashabol3a@gmail.com",
      github:   "github.com/sasha-bolea",
      linkedin: { display: "linkedin.com/in/alessandro-bolea", href: "https://www.linkedin.com/in/alessandro-bolea-651393264/" }
    },

    ui: {
      apri:            "open",
      temaScuro:       "//Devs: Beware",
      temaChiaro:      "//Back to the Cave",
      golVelocita:     "speed",
      golLento:        "slow",
      golVeloce:       "fast",
      golRiduci:       "Collapse controls",
      golPausaPlay:    "Pause / Play",
      golPassoSingolo: "Single step",
      golAvanza:       "Step one generation",
      golPulisci:      "Clear",
      golPulisciGriglia: "Clear grid",
      golReseed:       "Re-seed",
      golNuovaGen:     "New generation",
      golPuntatore:    "Pointer (does not draw)",
      golDisegna:      "Draw by dragging",
      golGlider:       "Glider",
      golPattern:      "Pattern",
      golFocus:        "Focus mode",
      chiudi:          "Close",
      eeAccesso:       "✓ Access granted.",
      eeTrovato:       "✓ Easter egg found!",
      eeBravo:         '  — you typed "sudo", nice hacking.',
    },

    golPattern: {
      "gosper-gun":     { title: "Gosper Glider Gun", desc: "The first structure capable of infinite growth, found by William Gosper in 1970. It emits one glider every 30 generations." },
      "pulsar":         { title: "Pulsar", desc: "A period-3 oscillator. One of the most symmetric and visually hypnotic patterns in Life." },
      "pentadecathlon": { title: "Pentadecathlon", desc: "A period-15 oscillator — among the highest for a structure this simple. Named after the Olympic cycle." },
      "acorn":          { title: "Acorn", desc: "A 7-cell methuselah. It grows chaotically for 5206 generations before settling into 633 cells." },
      "diehard":        { title: "Diehard", desc: "A 7-cell methuselah. It survives 130 generations, then vanishes completely without a trace." },
      "lwss":           { title: "Lightweight Spaceship", desc: "The smallest of the standard spaceships. It travels horizontally 2 cells every 4 generations (speed c/2). Found by John Conway in 1970." },
      "beacon":         { title: "Beacon", desc: "A period-2 oscillator made of two 2×2 blocks overlapping at one corner. One of the simplest and most common oscillators in Life." },
      "pi-heptomino":   { title: "Pi-Heptomino\n(my favourite)", desc: "A 7-cell methuselah shaped like π. It evolves chaotically for 173 generations before settling into a configuration with gliders." },
      "switch-engine":  { title: "Switch Engine", desc: "An 8-cell structure found by Charles Corderman in 1971. It grows forever leaving a trail of debris, moving diagonally at speed c/12." },
      "copperhead":     { title: "Copperhead", desc: "A period-10 spaceship found in 2016. It travels vertically at speed c/10. Notable for its compact, symmetric shape." },
    },
  },
};

const T = CONTENUTI[LANG];
// Scorciatoia per le etichette: dentro i template literal di script.js
// ${U.golPausaPlay} resta leggibile, ${T.ui.golPausaPlay} no.
const U = T.ui;

/* Cambia lingua e ricarica. Il ricaricamento è voluto: la pagina si scrive da
   sola con un motore di rivelazione a stati, e sostituire i testi a metà
   animazione vorrebbe dire rifarne il percorso. Lo scroll è già salvato in
   sessionStorage da script.js, quindi si riparte dallo stesso punto con il
   testo già scritto nella lingua nuova.
   lang: "it" oppure "en". Nessun valore di ritorno. */
function cambiaLingua(lang) {
  if (!LINGUE.includes(lang) || lang === LANG) return;
  try { localStorage.setItem("lang", lang); } catch (e) {}
  location.reload();
}
