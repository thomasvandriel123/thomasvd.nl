/* Receptdata. Een string is een ingrediënt. Een object {op, note, of:[...]} is een bewerking
   op alles eronder. Voeg een recept toe door een object aan RECIPES toe te voegen (zie README). */
window.RECEPTEN = (function(){
var GROUPS=["Hoofdgerechten","Soep","Zoet"];

var RECIPES=[
{
  id:"lasagne", group:0, title:"Vegetarische lasagne", sub:"6 personen",
  meta:["6 personen"],
  tree:{op:"laat rusten",note:"10 min, buiten de oven",of:[
    {op:"oven 180 °C",note:"hetelucht, 35 min",of:[
      {op:"bestrooi",of:[
        {op:"stapel 4 lagen",note:"saus – blad – béchamel",of:[
          {op:"sudder 30 min",note:"deksel schuin",of:[
            {op:"fruit 8 min",of:["2 el olijfolie","1 ui, fijngesneden","2 tenen knoflook","1 winterwortel, blokjes","2 stengels bleekselderij"]},
            "800 g gepelde tomaten","2 el tomatenpuree","1 tl gedroogde oregano","2 laurierblaadjes","400 g bruine linzen, uitgelekt"
          ]},
          "12 lasagnebladen",
          {op:"klop glad, 8 min",note:"laag vuur",of:[
            {op:"roer 2 min",of:["50 g roomboter","50 g bloem"]},
            "600 ml volle melk","snuf nootmuskaat","zout & peper"
          ]}
        ]},
        "80 g geraspte kaas, veg. stremsel"
      ]}
    ]}
  ]}
},
{
  id:"bloemkool-chermoula", group:0, title:"Geroosterde bloemkool en kikkererwten met chermoula", sub:"4 personen",
  intro:"Ottolenghi-stijl.", meta:["4 personen"],
  tree:{op:"strooi erover",of:[
    {op:"lepel erover",of:[
      {op:"schep op de borden",note:"yoghurt ernaast",of:[
        {op:"wissel platen, 15 min",note:"bloemkool donkerbruin, kikkererwten knapperig",of:[
          {op:"oven 200 °C, 25 min",note:"onderste richel",of:[
            {op:"meng op bakplaat",of:["1 grote bloemkool, in roosjes","3 el olijfolie","1 tl komijnzaad","1 tl gemalen koriander","½ tl gerookt paprikapoeder","½ tl zout"]}
          ]},
          {op:"oven 200 °C, 25 min",note:"bovenste richel",of:[
            {op:"meng op bakplaat",of:[
              {op:"vel & dep kurkdroog",note:"anders geen krokant",of:["400 g kikkererwten, uitgelekt"]},
              "1 el olijfolie","½ tl zout"
            ]}
          ]}
        ]},
        {op:"prak glad",of:["100 g feta","200 g Griekse yoghurt","1 el citroensap"]}
      ]},
      {op:"meng tot chermoula",of:["2 tenen knoflook, geraspt","rasp + sap van 1 citroen","20 g koriander, fijngehakt","20 g platte peterselie, fijngehakt","1 tl harissa","4 el olijfolie"]}
    ]},
    "zaden van ½ granaatappel","handvol muntblaadjes"
  ]},
  method:[
    {t:"Oven op 200 °C. Bloemkool met olijfolie en specerijen op bakplaat (onderste richel). Kikkererwten uit velletjes en kurkdroog deppen, op tweede bakplaat (bovenste richel). 25 min."},
    {t:"Bakplaten wisselen, nog 15 min. Bloemkool met donkerbruine randjes. Kikkererwten lekker knapperig."},
    {t:"Chermoula: knoflook, citroenrasp en -sap, kruiden (koriander en platte peterselie), harissa en olijfolie samenmengen."},
    {t:"Feta door yoghurt prakken, met citroen."},
    {t:"Op bord: bloemkool, kikkererwten, yoghurt ernaast, chermoula erover, granaatappel en munt erover."}
  ],
  tips:[{h:"Hoeveelheden",t:"De oorspronkelijke notitie noemde geen hoeveelheden. Die zijn aangevuld, dus pas ze naar smaak aan."}]
},
{
  id:"broccoli-tofu", group:0, title:"Geblakerde broccoli met tofu en rijst", sub:"2 personen · ± 35 min",
  intro:"Volgorde: tofu persen → rijst op → tofu bakken → broccoli", meta:["2 personen","± 35 min"],
  tree:{op:"opdienen",note:"rijst in de kom, tofu en broccoli erop, sesam en lente-ui erover",of:[
    {op:"nagaren",note:"van het vuur, deksel dicht, 10 min · pas dan losroeren",of:[
      {op:"garen",note:"deksel erop, 12 min op de laagste stand",of:[
        {op:"aan de kook brengen",of:[
          {op:"spoelen",note:"tot het water helder is",of:["200 g jasmijnrijst"]},
          "300 ml water"
        ]}
      ]}
    ]},
    {op:"afmaken",note:"aromaten 30 s, saus 1 min tot hij bindt en glanst, tofu erdoor om warm te worden",of:[
      {op:"stomen",note:"deksel erop 2 min, daarna deksel eraf",of:[
        {op:"blakeren",note:"hoog vuur, 3 min niet aanraken, tot er donkere plekken zijn",of:[
          {op:"halveren en droogdeppen",note:"elk roosje één plat snijvlak · stronk geschild, plakjes van 5 mm",of:["±500 g broccoli, hele kop"]},
          "2 el neutrale olie"
        ]},
        "3 el water","snuf zout"
      ]},
      {op:"fijnhakken",note:"gaat als laatste de pan in",of:["3 tenen knoflook","20 g gember","1 tl chilivlokken (of 1 el chilicrisp)"]},
      {op:"glad kloppen",note:"voor gebruik nog even doorroeren, de maizena zakt",of:["3 el sojasaus","1 el rijstazijn","1 el mirin (of 2 tl ahornsiroop)","1 tl sesamolie","1 tl maizena","4 el water"]},
      {op:"bakken",note:"hoog vuur, 8–10 min, pas draaien als er een korst zit",of:[
        {op:"door maizena halen",note:"blokjes van 2 cm, poeder afkloppen",of:[
          {op:"persen",note:"20 min tussen theedoek en snijplank",of:["350 g ferme tofu"]},
          "2 el maizena","zout + witte peper"
        ]},
        "3 el neutrale olie"
      ]}
    ]},
    {op:"roosteren en snijden",note:"sesam droog roosteren tot goudbruin, lente-ui in dunne ringen",of:["1 el sesamzaad","2 lente-uien"]}
  ]},
  ingr:[
    {h:"Basis",items:[["Jasmijnrijst","200 g"],["Water (rijst)","300 ml"],["Broccoli, hele kop","±500 g"],["Tofu, ferm","350 g"],["Maizena (tofu)","2 el"],["Neutrale olie","5 el"],["Zout + witte peper","naar smaak"]]},
    {h:"Aromaten",items:[["Knoflook","3 tenen"],["Gember","20 g"],["Chilivlokken of chilicrisp","1 tl / 1 el"]]},
    {h:"Saus",items:[["Sojasaus","3 el"],["Rijstazijn","1 el"],["Mirin of ahornsiroop","1 el / 2 tl"],["Sesamolie","1 tl"],["Maizena","1 tl"],["Water","4 el"]]},
    {h:"Afwerking",items:[["Sesamzaad","1 el"],["Lente-ui","2 st"]]}
  ],
  method:[
    {h:"Tofu persen.",t:"Tussen een theedoek, snijplank en iets zwaars erop, 20 minuten. Ondertussen alles snijden en de saus kloppen."},
    {h:"Rijst.",t:"Spoelen tot het water helder is. Met 300 ml water aan de kook brengen, deksel erop, 12 minuten op de laagste stand. Van het vuur, deksel dicht, 10 minuten laten staan. Pas dan losroeren."},
    {h:"Broccoli snijden.",t:"Halveer de roosjes door de steel zodat elk roosje één plat snijvlak krijgt — dat vlak wordt straks bruin. Schil de stronk en snijd hem in plakjes van 5 mm; die zijn zoeter dan de roosjes. Dep alles droog."},
    {h:"Tofu bakken.",t:"Blokjes van 2 cm door maizena met zout en peper, poeder afkloppen. In 3 el olie op hoog vuur bakken, 8–10 minuten. Pas draaien als een kant echt een korst heeft. Uit de pan, apart houden."},
    {h:"Blakeren.",t:"Zelfde pan, 2 el olie, hoog vuur tot de olie glanst. Broccoli met het platte vlak omlaag in één laag — liever twee rondes dan een volle pan. 3 minuten niet aanraken, tot er donkere plekken zijn."},
    {h:"Stomen.",t:"3 el water en een snuf zout erbij, deksel erop, 2 minuten. Deksel eraf, het restje vocht laten verdampen. De broccoli is nu beetgaar met een geblakerde buitenkant."},
    {h:"Afmaken.",t:"Knoflook, gember en chili erbij, 30 seconden roerbakken. Saus doorroeren en erbij gieten; 1 minuut tot hij bindt en glanst. Tofu er terug door, alleen om warm te worden."},
    {h:"Opdienen.",t:"Rijst in de kom, tofu en broccoli erop, sesam en lente-ui erover."}
  ],
  tips:[{h:"Waarom deze volgorde",t:"Broccoli bestaat voor ±90% uit water. Zet je hem in een pan die niet heet genoeg is of te vol zit, dan komt dat vocht vrij en stoom je in je eigen sap: grijsgroen en flets."}]
},
{
  id:"tonijn-gai-lan", group:0, title:"Geschroeide tonijn, gai lan met knoflook, jasmijnrijst", sub:"2 personen · 35 min",
  intro:"De rijst bepaalt de klok, de tonijn is het laatste wat de pan in gaat. Alles staat gesneden klaar voordat er iets heet wordt — vanaf het moment dat de wok aangaat is er geen tijd meer om te snijden.",
  meta:["2 personen","35 min","één koekenpan, één wok, één rijstpan"],
  tree:{op:"serveren",note:"rijst in diepe kommen, gai lan ernaast met het wokvocht, plakken tonijn dakpansgewijs erop, dipsaus ernaast en niet eroverheen",of:[
    {op:"10 min nagaren",note:"van het vuur, daarna losroeren met een vork",of:[
      {op:"12 min laagste stand",note:"aan de kook brengen, deksel blijft dicht",of:[
        {op:"in een pan met dikke bodem",note:"deksel erop",of:[
          {op:"spoelen",note:"in koud water tot helder (3–4 keer)",of:["300 g jasmijnrijst"]},
          "360 ml koud water + snuf zout"
        ]}
      ]}
    ]},
    {op:"direct in een schaal",note:"in de pan gaart het blad door en verliest het zijn kleur",of:[
      {op:"wokken",note:"vol vuur, stelen 1 min, dan blad erbij en saus erover, 1–2 min tot glanzend en net slap",of:[
        {op:"fruiten in de wok",note:"30 s met 1 el neutrale olie, geurig en niet bruin",of:[
          {op:"snijden",note:"plakjes en reepjes",of:["3 tenen knoflook","15 g gember","1 rode peper, ontpit"]},
          "1 el neutrale olie"
        ]},
        {op:"blancheren",note:"stelen 90 s in kokend gezouten water, koud spoelen, droogschudden",of:[
          {op:"scheiden",note:"blad en stelen, dikke stelen in de lengte halveren",of:["400 g Chinese broccoli"]}
        ]},
        {op:"losklutsen tot één sausje",note:"binnen handbereik naast de wok",of:["1½ el oestersaus","1 el sojasaus","1 el Shaoxing (of droge sherry)","1 tl suiker + 2 el water"]}
      ]}
    ]},
    {op:"rusten en snijden",note:"3 min op een snijplank, plakken van 1 cm tegen de draad in",of:[
      {op:"schroeien",note:"gietijzeren pan rokend heet, 45–60 s per kant, zijkanten 10 s",of:[
        {op:"marineren",note:"10 min, halverwege keren, daarna opnieuw droogdeppen",of:[
          {op:"kurkdroog deppen",note:"20 min op kamertemperatuur, zouten",of:["2 tonijnsteaks à ±180 g, 2,5 cm dik","zout"]},
          {op:"roeren tot marinade",note:"in een platte schaal",of:["1 el sojasaus","1 tl sesamolie","1 teen knoflook, geraspt"]}
        ]},
        "dun laagje neutrale olie (zonnebloem/arachide)"
      ]}
    ]},
    {op:"vlak voor serveren doorroeren",note:"10 min laten staan, de lente-ui trekt door",of:[
      {op:"mengen in een kommetje",of:["2 el sojasaus","1 el rijstazijn","1 tl mirin (of ½ tl suiker)","½ tl sesamolie","1 lente-ui, dunne ringen","1 el sesamzaad, geroosterd"]}
    ]}
  ]},
  ingr:[
    {h:"Rijst",items:["300 g jasmijnrijst","360 ml water + snuf zout"]},
    {h:"Tonijn",items:["2 tonijnsteaks à ±180 g, 2,5 cm dik","1 el sojasaus","1 tl sesamolie","1 teen knoflook, geraspt","Neutrale olie (zonnebloem/arachide)","Zout"]},
    {h:"Gai lan",items:["400 g Chinese broccoli","3 tenen knoflook","15 g gember","1 rode peper","1½ el oestersaus","1 el sojasaus","1 el Shaoxing of droge sherry","1 tl suiker + 2 el water","1 el neutrale olie"]},
    {h:"Dipsaus",items:["2 el sojasaus","1 el rijstazijn","1 tl mirin","½ tl sesamolie","1 lente-ui","1 el sesamzaad"]}
  ],
  method:[
    {k:"T-35",h:"Alles snijden.",t:"Tonijn uit de koelkast, droogdeppen, zouten. Knoflook, gember en peper snijden. Blad en stelen van de gai lan scheiden, dikke stelen in de lengte halveren zodat ze even dik zijn als de rest. Wokjus mengen (oestersaus, sojasaus, Shaoxing, suiker, water), marinade mengen (sojasaus, sesamolie, geraspte knoflook), dipsaus mengen."},
    {k:"T-30",h:"Rijst op.",t:"Spoel de rijst tot het water helder is — dat scheelt het verschil tussen losse en plakkerige korrels. Met 360 ml water en zout aan de kook, deksel erop, 12 min op de laagste stand, dan van het vuur en 10 min met deksel erop laten staan."},
    {k:"T-20",h:"Stelen blancheren.",t:"Ruim water met zout aan de kook, stelen 90 seconden, dan koud spoelen en droogschudden. Zonder deze stap zijn de stelen nog krakend als het blad al doorgeslagen is."},
    {k:"T-12",h:"Tonijn in de marinade.",t:"10 minuten, halverwege keren. Langer heeft geen zin: de zoute marinade trekt vocht naar buiten en dat kost je de korst."},
    {k:"T-8",h:"Wokken.",t:"Wok op vol vuur, 1 el olie, knoflook/gember/peper 30 seconden tot het geurt. Stelen erbij, 1 minuut. Blad erbij, sausje erover, 1–2 minuten tot alles glanst en het blad net geslonken is. Direct in een schaal."},
    {k:"T-4",h:"Tonijn schroeien.",t:"Haal de steaks uit de marinade en dep ze opnieuw droog — een nat oppervlak stoomt in plaats van te schroeien, en de suikers in de sojasaus verbranden. Gietijzeren pan tot hij net rookt, dun laagje olie, 45–60 seconden per kant voor een kern die rauw blijft. Zijkanten kort aandrukken, ongeveer 10 seconden."},
    {h:"Rusten en serveren.",t:"Laat de tonijn 3 minuten rusten op een snijplank en snijd in plakken van 1 cm tegen de draad in. Rijst in diepe kommen, gai lan ernaast met het wokvocht eroverheen, plakken tonijn dakpansgewijs erop. Dipsaus in een schaaltje ernaast, niet eroverheen — de tonijn moet z'n korst houden."}
  ]
},
{
  id:"pasta-linzen", group:0, title:"Pasta met linzen-tomatensaus, ricotta en gegrilde groenten", sub:"2 personen · 35 min",
  intro:"Vegetarische wedstrijdlunch, zes uur voor het opslaan. Zwaar op zetmeel, ongeveer 38 g eiwit per bord, weinig vet.",
  meta:["2 porties","werktijd 15 min","totaal 35 min","± 38 g eiwit p.p.","± 115 g koolhydraten p.p."],
  tree:{op:"opmaken",note:"direct serveren",of:[
    {op:"mengen",note:"pasta door de saus, scheutje kookvocht",of:[
      {op:"sudderen",note:"laag, 20 min, deksel schuin · in tomatensaus soms 35–40 min",of:[
        {op:"fruiten",note:"middelhoog, 5 min",of:["1 el olijfolie","1 ui, fijngesneden","2 tenen knoflook, geplet"]},
        "100 g rode linzen","500 g passata","200 ml water","1 tl gedroogde oregano","zout, peper, snuf suiker"
      ]},
      {op:"koken",note:"al dente, 1 min korter dan het pak",of:["200 g pasta (penne of rigatoni)","2,5 l water","2 el grof zout"]}
    ]},
    {op:"grillen",note:"oven 220 °C, 20 min",of:["1 courgette, in halve maantjes","1 rode paprika, in repen","1 el olijfolie","snuf zeezout"]},
    {op:"losroeren",note:"glad, op kamertemperatuur",of:["250 g ricotta","½ citroen, rasp","zwarte peper"]},
    "40 g Parmezaan, geraspt","handvol basilicum"
  ]},
  ingr:[
    {h:"Saus",items:[["Olijfolie","1 el"],["Ui","1"],["Knoflook","2 tenen"],["Rode linzen (droog)","100 g"],["Passata","500 g"],["Water","200 ml"],["Gedroogde oregano","1 tl"],["Zout, peper, suiker","naar smaak"]]},
    {h:"Pasta",items:[["Penne of rigatoni","200 g"],["Grof zout","2 el"]]},
    {h:"Gegrilde groenten",items:[["Courgette","1"],["Rode paprika","1"],["Olijfolie","1 el"],["Zeezout","snuf"]]},
    {h:"Ricotta en afwerking",items:[["Ricotta","250 g"],["Citroen (rasp)","½"],["Zwarte peper","naar smaak"],["Parmezaan","40 g"],["Basilicum","handvol"]]}
  ],
  method:[
    {t:"Verwarm de oven voor op 220 °C."},
    {t:"Meng courgette en paprika met olijfolie en zeezout, spreid ze in één laag over een bakplaat en rooster ze 20 minuten, halverwege omscheppen. Ze mogen randjes krijgen."},
    {t:"Fruit ondertussen de ui in olijfolie op middelhoog vuur tot hij glazig is, ongeveer 5 minuten. Voeg de knoflook toe en bak nog een halve minuut mee."},
    {t:"Voeg de rode linzen, passata, water en oregano toe. Breng aan de kook, zet laag en laat met de deksel schuin 20 minuten sudderen tot de linzen uit elkaar vallen en de saus dik is. Roer af en toe; linzen hechten graag aan de bodem. Breng op smaak met zout, peper en een snuf suiker."},
    {t:"Roer de ricotta los met de citroenrasp en flink zwarte peper. Zet apart, niet koud uit de koelkast."},
    {t:"Kook de pasta in ruim gezouten water één minuut korter dan de verpakking aangeeft. Schep vlak voor het afgieten een kop kookvocht apart."},
    {t:"Meng de uitgelekte pasta door de saus in de pan, met een scheut kookvocht tot de saus soepel om de pasta valt. Nog een halve minuut op het vuur."},
    {t:"Verdeel over twee borden. Leg de gegrilde groenten erop, dollen ricotta ertussen, en werk af met Parmezaan en basilicum."}
  ],
  tips:[
    {h:"Waarom deze combinatie",t:"Rode linzen leveren het meeste eiwit en lossen volledig op in de saus, dus je proeft ze niet als losse component. Ricotta vult aan en houdt het gerecht licht — waar room of mascarpone vet toevoegt dat de maaglediging vertraagt, doet ricotta dat nauwelijks. Zes uur voor de wedstrijd zijn de vezels uit de linzen en groenten geen probleem; binnen twee uur vooraf zou ik ze wél laten liggen."},
    {h:"Linzen duren langer",t:"Bij het koken bleken de linzen na 20 minuten nog stevig. Het zuur van de passata vertraagt het zacht worden. Reken op 35 tot 40 minuten en voeg 100–150 ml water toe als de saus te droog wordt. Blijf roeren, want de bodem brandt snel aan. Zout mag gewoon."}
  ]
},
{
  id:"tomatensoep", group:1, title:"Gezonde verse tomatensoep met rode linzen en witte bonen", sub:"4 personen · ± 45 min",
  intro:"Met kefir in plaats van yoghurt als topping.", meta:["4 personen","± 45 min","vegetarisch","≈ 18 g eiwit · 12 g vezels p.p. (schatting)"],
  tree:{op:"serveren",note:"in kommen, volkorenbrood erbij",of:[
    {op:"afmaken",note:"basilicum erover scheuren, proeven of er zout bij moet",of:[
      {op:"bonen erdoor",note:"3 min meewarmen, zodat ze heel blijven",of:[
        {op:"pureren",note:"staafmixer, glad of met structuur",of:[
          {op:"koken",note:"15 min zachtjes, tot de linzen uiteenvallen",of:[
            {op:"roosteren",note:"oven 200 °C, 25 min, tot de randen licht karameliseren",of:["1,2 kg tomaten, gehalveerd","1 rode paprika, grof gesneden","1 el olijfolie","snufje zout"]},
            {op:"1 min meebakken",of:[
              {op:"fruiten",note:"8 min, middelhoog",of:["1 grote ui, gesnipperd","1 wortel, in blokjes","1 stengel bleekselderij, fijn","1 el olijfolie"]},
              "3 tenen knoflook","1 el tomatenpuree","1 tl gerookt paprikapoeder","1 tl gedroogde oregano of tijm"
            ]},
            "750 ml groentebouillon, zoutarm","100 g rode linzen, gewassen"
          ]}
        ]},
        "1 blik witte bonen (400 g), afgespoeld"
      ]},
      "1 el balsamicoazijn","handvol verse basilicum","peper en een snufje zout"
    ]},
    {op:"topping",note:"pas bij het serveren",of:["4 el kefir","2 el geroosterde pompoenpitten","scheut olijfolie"]},
    "4 sneetjes volkorenbrood"
  ]},
  ingr:[
    {h:"",items:[["Tomaten (trostomaat of vleestomaat)","1,2 kg"],["Rode paprika","1"],["Ui, groot","1"],["Knoflook","3 tenen"],["Wortel","1"],["Bleekselderij","1 stengel"],["Olijfolie","2 el + een scheutje"],["Tomatenpuree","1 el"],["Rode linzen","100 g"],["Witte bonen","1 blik (400 g)"],["Groentebouillon, zoutarm","750 ml"],["Gerookt paprikapoeder","1 tl"],["Oregano of tijm, gedroogd","1 tl"],["Balsamicoazijn","1 el"],["Verse basilicum","handvol"],["Peper en zout","snufje"],["Kefir","4 el"],["Pompoenpitten, geroosterd","2 el"],["Volkorenbrood","4 sneetjes"]]}
  ],
  method:[
    {h:"Roosteren.",t:"Verwarm de oven voor op 200 °C. Halveer de tomaten en snijd de paprika in grove stukken. Leg ze met 1 el olijfolie en een snufje zout op een bakplaat en rooster ze 25 minuten, tot de randen licht karameliseren. Dit geeft veel meer smaak dan alleen koken."},
    {h:"Basis.",t:"Fruit ondertussen de gesnipperde ui, de wortel (in blokjes) en de bleekselderij (fijn gesneden) in 1 el olijfolie op middelhoog vuur, 8 minuten. Voeg de knoflook, tomatenpuree, paprikapoeder en oregano toe en bak 1 minuut mee."},
    {h:"Koken.",t:"Voeg de geroosterde tomaten en paprika (inclusief sap), de bouillon en de gewassen rode linzen toe. Laat 15 minuten zachtjes koken, tot de linzen uiteenvallen."},
    {h:"Pureren.",t:"Pureer de soep met een staafmixer, naar keuze glad of met wat structuur. Roer de witte bonen erdoor en laat ze 3 minuten meewarmen, zodat ze heel blijven."},
    {h:"Afmaken.",t:"Breng op smaak met balsamico en peper. Scheur de basilicum erover en proef of er nog zout nodig is."},
    {h:"Serveren.",t:"Schep in kommen en top af met een lepel kefir, pompoenpitten en een scheut olijfolie. Eet er een snee volkorenbrood bij."}
  ],
  tips:[
    {h:"Bewaren",t:"De soep is 4 dagen goed in de koelkast en vriest prima in, zonder de topping."},
    {h:"Dikte",t:"Voeg een scheut water toe als de soep te dik is, want de linzen binden na."},
    {h:"Eiwit",t:"Voor nog meer eiwit kun je een handvol gekookte kikkererwten of wat geraspte Parmezaan toevoegen."}
  ]
},
{
  id:"tiramisu", group:2, title:"Basic Tiramisu", sub:"8 personen",
  intro:"Basisrecept in de tabelnotatie van Cooking for Engineers.",
  meta:["8 personen"],
  tree:{op:"bedek",of:[
    {op:"laag & strijk, 2×",of:[
      {op:"dompel",of:["ca. 20 lange vingers",{op:"meng & koel",of:["2 shots (60 ml) espresso","120 ml gezette koffie"]}]},
      {op:"spatel door",of:[
        {op:"klop stijf",of:["240 ml slagroom"]},
        {op:"meng glad",of:["455 g mascarpone","100 g kristalsuiker","3 el (44 ml) rum of cognac"]}
      ]}
    ]},
    "cacaopoeder","schaafsel pure chocolade"
  ]}
},
{
  id:"pannenkoeken", group:2, title:"Pannenkoeken", sub:"12 stuks · 15 min actief",
  intro:"Alles draait om één ding: eerst een dík glad beslag maken, dan pas verdunnen — klontjes ontstaan alleen in een te nat beslag.",
  meta:["12 stuks · Ø 24–26 cm","15 min actief","30 min rust","20 min bakken"],
  tree:{op:"bakken",note:"middelhoog · 1½–2 min / 45 sec",of:[
    {op:"rusten",note:"30 min · kamertemperatuur · afgedekt",of:[
      {op:"gesmolten boter erdoor",note:"afgekoeld · voorkomt plakken",of:[
        {op:"verdunnen",note:"rest melk · dikte van ongeklopte room",of:[
          {op:"bloem inkloppen",note:"in 3 keer zeven · dik & glad",of:[
            {op:"melk erdoor",note:"helft van de melk",of:[
              {op:"loskloppen",note:"garde · 30 sec · schuimig",of:["3 eieren, maat M · kamertemperatuur","½ tl zout","1 el suiker · optioneel"]},
              "250 ml volle melk · eerste helft"
            ]},
            "250 g patentbloem"
          ]},
          "250 ml volle melk · tweede helft"
        ]},
        "30 g gesmolten boter · in beslag"
      ]}
    ]},
    "± 40 g roomboter om te bakken · klontje per koek"
  ]},
  ingr:[
    {h:"",items:[["Bloem (patent/tarwe)","250 g"],["Volle melk","500 ml"],["Eieren (maat M)","3"],["Zout","½ tl"],["Suiker (optioneel)","1 el"],["Roomboter (in beslag)","30 g"],["Roomboter (om te bakken)","± 40 g"]]}
  ],
  method:[
    {h:"Loskloppen.",t:"Klop de eieren met het zout en eventueel de suiker met een garde los tot ze licht schuimen, ongeveer 30 seconden."},
    {h:"Aanlengen.",t:"Giet de helft van de melk (250 ml) erbij en roer glad."},
    {h:"Beslag.",t:"Zeef de bloem er in drie keer boven en klop na elke toevoeging tot een dik, volkomen glad beslag. Dik beslag geeft de garde grip — juist daarin verdwijnen de klontjes. Blijf ondertussen niet te lang kloppen zodra het glad is."},
    {h:"Verdunnen.",t:"Roer de resterende 250 ml melk er in delen door. Je zoekt de dikte van ongeklopte slagroom: het beslag loopt van de lepel maar bedekt hem nog net."},
    {h:"Boter erdoor.",t:"Smelt 30 g boter, laat lauw worden en roer door het beslag. Dit maakt de pannenkoeken soepeler en voorkomt plakken."},
    {h:"Rusten.",t:"Dek af en laat 30 minuten op kamertemperatuur staan. Het gluten ontspant en de bloem hydrateert volledig — het verschil tussen taai en zijdezacht."},
    {h:"Bakken.",t:"Verhit een koekenpan van 24–26 cm op middelhoog vuur, smelt een klontje boter tot het schuim wegtrekt. Schep een pollepel beslag in de pan en draai de pan direct rond zodat het zich dun verdeelt. Bak 1½–2 minuten tot de bovenkant mat is en de randen loskomen, keer om en bak nog 45 seconden. Stapel de koeken op een bord onder een deksel of theedoek."}
  ],
  tips:[
    {h:"Te dik beslag na het rusten?",t:"Bloem trekt vocht — roer er een scheutje melk door tot je de oorspronkelijke dikte terug hebt."},
    {h:"Eerste pannenkoek mislukt altijd?",t:"Dat is de pan die nog niet op temperatuur is. Reken hem niet mee."},
    {h:"Variaties in de pan",t:"Plakjes appel met kaneelsuiker (leg ze in de boter, giet beslag eroverheen), of gebakken champignons met tijm en oude kaas voor een hartige versie."},
    {h:"Beslag een nacht vooruit?",t:"Kan prima, afgedekt in de koelkast. Haal het 30 minuten voor het bakken eruit en roer even door."}
  ]
}
];

return {GROUPS:GROUPS, RECIPES:RECIPES};
})();
