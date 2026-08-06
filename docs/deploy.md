# Deploy

Il sito è pubblicato su **https://alessandrobolea.com**, servito da **Vercel**,
collegato a questo repo GitHub sul branch **`master`**.

## La cosa da sapere prima di tutto

**`git push` su `master` pubblica in produzione.** Non c'è uno step di deploy
separato: Vercel osserva il branch e ricostruisce da solo. Un commit locale non
cambia nulla online, un push sì.

Nel repo **non c'è nessun file che lo dica**: niente `vercel.json`, niente
`CNAME`, niente `.github/workflows`. Il collegamento vive nel pannello Vercel, e
guardando solo il codice si direbbe che il sito non sia pubblicato da qui. È il
motivo per cui va scritto qui.

## Verificare cosa c'è online

I contatori `?v=` in `index.html` sono l'impronta della versione pubblicata:

```bash
curl -s https://alessandrobolea.com/ | grep -o '[a-z0-9]*\.\(css\|js\)?v=[0-9]*'
```

Confrontare con quelli locali:

```bash
grep -o '[a-z0-9]*\.\(css\|js\)?v=[0-9]*' index.html
```

Se differiscono, online c'è una versione vecchia: o non è stato fatto il push, o
il deploy non è ancora finito.

Per sapere se è davvero Vercel a rispondere:

```bash
curl -s -I https://alessandrobolea.com/ | grep -i "^server:"   # -> Server: Vercel
```

## Prima di pubblicare

1. Provare in locale: `py -m http.server 8000`, poi <http://localhost:8000> con
   **Ctrl+Shift+R**.
2. Alzare i `?v=` di ciò che è cambiato — `style.css`, `script.js`, `gol.js` e
   `i18n.js` hanno contatori separati. Senza, i visitatori con la pagina in
   cache continuano a vedere la versione vecchia.
3. `node --check script.js` (e `gol.js`, `i18n.js`) — non cattura errori a
   runtime, ma evita di pubblicare un file che non parte.
4. Commit, poi push.

## Trappola già costata tempo

Il 2026-08-06 una correzione al Game of Life risultava "non funzionante" per
diversi giri di verifica. Il codice era giusto: si stava provando su
`alessandrobolea.com`, cioè in produzione, dove il fix non era mai stato
pubblicato. Se una modifica sembra non avere effetto, **controllare prima la
barra degli indirizzi**: `localhost:8000` o il dominio? E poi confrontare i
`?v=` con il comando qui sopra.
