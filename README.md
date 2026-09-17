# Herinneringen Duinrust

Een statische herdenkingssite voor GitHub Pages. De openbare site bevat een doorzoekbare voorpagina en detailpagina's. De losse QR-codegenerator is alleen bereikbaar via `qr.html` en staat niet in de openbare navigatie.

## Publiceren met GitHub Pages

1. Plaats alle bestanden uit deze map in de hoofdmap van de repository `davek-0251/herdenking`.
2. Open op GitHub **Settings → Pages**.
3. Kies bij **Build and deployment** voor **Deploy from a branch**, branch `main` en map `/ (root)`.
4. Sla de instelling op. De site verschijnt daarna op `https://davek-0251.github.io/herdenking/`.

## QR-codes maken

Open `https://davek-0251.github.io/herdenking/qr.html`, kies een bestaande pagina en maak de QR-code. Deze beheerpagina is bewust niet zichtbaar in de navigatie van de website.

## Handmatig aanpassen

De bestaande pagina's staan in `js/data.js`. Iedere pagina heeft een unieke ID, naam, datums, hoofdfoto, extra foto's en een verhaal. De overzichtspagina wordt automatisch uit deze gegevens opgebouwd.

## Een pagina uitlichten

Iedere pagina in `js/data.js` heeft de instelling `highlight`. Verander bij de gewenste pagina:

```js
highlight: false,
```

naar:

```js
highlight: true,
```

De pagina verschijnt dan automatisch bovenaan het overzicht met het label **Uitgelicht**. Je kunt ook meerdere pagina's tegelijk uitlichten; deze worden onderling alfabetisch gesorteerd.
