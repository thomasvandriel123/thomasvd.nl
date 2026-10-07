# Thomasvd.nl online zetten

Kort antwoord: voor deze site hoef je **niets extra te betalen voor hosting**. Het is een statische site (HTML, CSS en een beetje JavaScript), dus er is geen server nodig. Je vaste kosten zijn alleen de jaarlijkse verlenging van het domein bij Strato. Betaald hosten loopt pas op als je een backend nodig hebt, bijvoorbeeld voor een tool die data opslaat.

## Keuzes

| Optie | Kosten | Past bij |
| --- | --- | --- |
| **GitHub Pages** (aanbevolen) | gratis, repo moet publiek zijn (is nu zo) | statische site, geen wijziging van nameservers nodig, werkt met Strato's DNS |
| Cloudflare (Pages of Workers) | gratis | als je een CDN, analytics of eigen redirects wilt. Vraagt dat je de nameservers bij Strato overzet |
| Eigen VPS met Docker + Caddy | ongeveer €4 tot €6 per maand | als tools straks een backend nodig hebben. Voor alleen deze site overkill |
| Webhostingpakket bij Strato | betaald | niet nodig voor deze site |

Waarom GitHub Pages: je repo staat er al, een push naar `main` publiceert de site binnen een minuut, HTTPS regelt GitHub zelf, en je hoeft bij Strato alleen een paar DNS-records te zetten. Bij Cloudflare moet je de nameservers overzetten, en volgens wat ik online vond kan Strato daar lastig over doen.

## Stappen voor GitHub Pages

De site staat in de map `docs/`. Het bestand `docs/CNAME` bevat al `thomasvd.nl`.

### 1. Pages aanzetten

Repo op GitHub, **Settings → Pages → Build and deployment**:

- Source: **Deploy from a branch**
- Branch: **`main`**, map **`/docs`**, daarna Save

### 2. Domein koppelen in GitHub

Zelfde pagina, onder **Custom domain**: vul `thomasvd.nl` in en klik Save. GitHub meldt dat de DNS-controle nog niet slaagt. Dat klopt tot stap 3 klaar is.

### 3. DNS-records zetten bij Strato

Log in bij Strato, ga naar je domeinen en open de DNS-instellingen van `thomasvd.nl`. De exacte menunamen kon ik niet controleren, ze kunnen afwijken. Zet deze records:

| Type | Naam | Waarde |
| --- | --- | --- |
| A | `@` (hoofddomein) | `185.199.108.153` |
| CNAME | `www` | `thomasvandriel123.github.io` |

Let op:

- **Bestaande records vervangen.** Staat er al een A-record of een parkeerpagina op `@` of `www`, dan moet die weg of worden aangepast, anders botst het.
- **Maar één A-record.** GitHub noemt vier IP-adressen (`185.199.108.153`, `.109.153`, `.110.153` en `.111.153`). Strato staat volgens wat ik online vond maar één A-record op het hoofddomein toe. Eén IP werkt, je mist alleen de reserve. Staat Strato er meer toe, zet dan alle vier.
- **IPv6 is optioneel.** Staat Strato AAAA-records toe, voeg dan `2606:50c0:8000::153` toe. Zonder werkt de site ook.
- **Controleer de IP-adressen** vóór je ze invoert in de [officiële GitHub-documentatie](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site). Ik kon die pagina vanuit mijn omgeving niet openen en heb de adressen uit mijn geheugen.
- **Mail blijft ongemoeid.** Laat MX- en TXT-records staan als je e-mail op dit domein gebruikt.

### 4. Wachten en controleren

DNS-wijzigingen duren van enkele minuten tot een paar uur. Controleer met:

```sh
dig thomasvd.nl +short       # moet 185.199.108.153 geven
dig www.thomasvd.nl +short   # moet thomasvandriel123.github.io geven
```

### 5. HTTPS aanzetten

Terug in **Settings → Pages**: klik op **Check again** om de DNS-controle opnieuw uit te voeren. Zodra GitHub het certificaat heeft aangemaakt (meestal binnen een uur) vink je **Enforce HTTPS** aan. GitHub stuurt `www.thomasvd.nl` daarna door naar `thomasvd.nl`.

### 6. Optioneel: domein verifiëren

Onder je account-instellingen (**Settings → Pages → Add a domain**) kun je `thomasvd.nl` verifiëren met een TXT-record. Dat voorkomt dat iemand anders het domein aan een eigen Pages-site koppelt als je DNS ooit verkeerd staat.

## Daarna

Aanpassen is: bestanden wijzigen, committen, pushen naar `main`. GitHub publiceert binnen ongeveer een minuut. Je ziet de voortgang onder het tabblad **Actions** van de repo.

## Let op bij een publieke repo

Alles in de repo is openbaar, ook de geschiedenis. Zet er nooit wachtwoorden, sleutels of persoonlijke gegevens in. Controleer ook welk e-mailadres je git gebruikt, want dat staat in elke commit (GitHub heeft een `noreply`-adres als je dat liever gebruikt).

## Alternatief: Cloudflare

Kies dit als je later analytics, een CDN of eigen redirectregels wilt. Het werkt gratis, maar vraagt meer stappen:

1. Maak een gratis Cloudflare-account en voeg `thomasvd.nl` toe. Cloudflare geeft twee nameservers.
2. **Zet eerst alle bestaande records over** (zeker MX en TXT voor mail) naar Cloudflare.
3. Controleer bij Strato of DNSSEC aanstaat voor het domein en zet dat uit vóór de overstap, anders wordt het domein onbereikbaar.
4. Zet bij Strato de nameservers om naar die van Cloudflare. Lukt dat niet (volgens wat ik online vond kan Strato hier lastig over doen, vooral bij domeinen in een hostingpakket), kies dan GitHub Pages.
5. Cloudflare dashboard, **Workers & Pages**: koppel de GitHub-repo, laat het build-commando leeg en zet de output-map op `docs`. Cloudflare noemt Workers met static assets inmiddels de aanbevolen route voor nieuwe projecten, Pages werkt nog wel. De knoppen in het dashboard kunnen dus anders heten dan hier.
6. Voeg onder **Custom domains** `thomasvd.nl` en `www.thomasvd.nl` toe. Cloudflare maakt de DNS-records zelf aan.

## Alternatief: eigen VPS

Alleen zinvol als je tools met een backend wilt draaien. Je hebt dan bij Strato één A-record nodig dat naar het IP van je VPS wijst, en Caddy regelt HTTPS automatisch. Een startpunt (niet door mij getest):

```yaml
# compose.yaml
services:
  caddy:
    image: caddy:2
    restart: unless-stopped
    ports: ["80:80", "443:443", "443:443/udp"]
    volumes:
      - ./docs:/srv:ro
      - ./Caddyfile:/etc/caddy/Caddyfile:ro
      - caddy_data:/data
      - caddy_config:/config
volumes:
  caddy_data:
  caddy_config:
```

```caddyfile
# Caddyfile
thomasvd.nl {
  root * /srv
  file_server
  encode zstd gzip
}
www.thomasvd.nl {
  redir https://thomasvd.nl{uri} permanent
}
```
