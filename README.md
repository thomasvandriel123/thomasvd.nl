# thomasvd.nl

De persoonlijke website van Thomas: een startpagina, een blog, recepten en tools. Gewone HTML en CSS, zonder build-stap, zonder tracking en zonder externe verzoeken. De huisstijl komt uit het design system "Thomas" (Fraunces en Instrument Sans, warm papier, één terracotta accent). De lettertypen staan lokaal in `docs/assets/fonts`.

Hoe je de site online zet staat in [HOSTING.md](HOSTING.md).

## Lokaal bekijken

```sh
python3 -m http.server 8000 -d docs
```

Open daarna <http://localhost:8000>. Links in de site beginnen met `/`, dus de site moet vanuit de map `docs` worden geserveerd (niet vanuit het bestand zelf geopend).

## Indeling

```
docs/
  index.html            startpagina
  blog/index.html       bloglijst
  blog/<slug>/index.html  één bericht
  recepten/index.html   receptenpagina (laadt recepten.js en recepten-data.js)
  tools/index.html      tools
  404.html
  CNAME                 het domein voor GitHub Pages
  assets/
    site.css            tokens, componenten en pagina-opmaak
    recepten.css        opmaak van de receptmatrix
    recepten.js         bouwt de tabellen uit de data
    recepten-data.js    alle recepten
    fonts/
```

Kleuren, lettergroottes, ruimtes en radii staan als tokens bovenaan `docs/assets/site.css`. Pas ze daar aan en niet verspreid in de pagina's.

## Een blogbericht toevoegen

1. Kopieer `docs/blog/welkom/` naar `docs/blog/<korte-naam>/`.
2. Pas in het nieuwe `index.html` de titel, beschrijving, datum, `canonical` en de `og:`-regels aan, en schrijf de tekst in `.prose`.
3. Zet in `docs/blog/index.html` een nieuwe `<li class="post-item">` bovenaan de lijst.

## Een recept toevoegen

Voeg een object toe aan `RECIPES` in `docs/assets/recepten-data.js`. Een string in de boom is een ingrediënt, een object `{op, note, of:[…]}` is een bewerking op alles eronder:

```js
{
  id: "pannenkoeken", group: 2, title: "Pannenkoeken", sub: "12 stuks",
  intro: "Eén zin over het gerecht.", meta: ["12 stuks", "15 min actief"],
  tree: {op: "bakken", note: "middelhoog", of: [
    {op: "klop glad", of: ["250 g bloem", "500 ml melk", "3 eieren"]},
    "40 g boter"
  ]},
  ingr:   [{h: "", items: [["Bloem", "250 g"], ["Melk", "500 ml"]]}],  // optioneel
  method: [{h: "Kloppen.", t: "Klop alles glad."}],                    // optioneel
  tips:   [{h: "Tip", t: "Laat het beslag rusten."}]                   // optioneel
}
```

`group` is de index in `GROUPS` bovenaan hetzelfde bestand (0 hoofdgerechten, 1 soep, 2 zoet). Laat je `ingr` weg, dan wordt de lijst uit de boom gehaald.

## Een tool toevoegen

Op `docs/tools/index.html` staat een uitgecommentarieerde kaart als voorbeeld. Vervang de kaart "Nog geen tools" door een kaart zoals in dat voorbeeld en zet de tool zelf in `docs/tools/<naam>/index.html`.
