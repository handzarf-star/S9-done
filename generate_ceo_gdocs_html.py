html_content = '''<!DOCTYPE html>
<html lang="bs">
<head>
  <meta charset="UTF-8">
  <title>Shape9 · Ko želi biti CEO? (Specifikacija kviza)</title>
  <style>
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      color: #0F172A;
      line-height: 1.6;
      max-width: 880px;
      margin: 40px auto;
      padding: 0 24px;
      background: #FFFFFF;
    }
    h1 {
      color: #006E8B;
      font-size: 28px;
      font-weight: 800;
      margin-bottom: 4px;
      letter-spacing: -0.02em;
    }
    .subhead {
      font-family: 'JetBrains Mono', monospace;
      font-size: 13px;
      color: #64748B;
      font-weight: 600;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      margin-bottom: 24px;
      border-bottom: 2px solid #E2E8F0;
      padding-bottom: 12px;
    }
    h2 {
      color: #010D13;
      font-size: 20px;
      font-weight: 700;
      margin-top: 36px;
      margin-bottom: 12px;
      border-bottom: 1px solid #E2E8F0;
      padding-bottom: 6px;
    }
    .callout-lead {
      background: #F0FDF4;
      border-left: 4px solid #3DD68C;
      padding: 14px 18px;
      border-radius: 6px;
      font-weight: 600;
      color: #166534;
      margin-bottom: 20px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 16px 0 24px;
      font-size: 13px;
    }
    th, td {
      border: 1px solid #E2E8F0;
      padding: 12px 14px;
      text-align: left;
      vertical-align: top;
    }
    th {
      background: #F8FAFC;
      font-weight: 700;
      color: #475569;
      font-family: 'JetBrains Mono', monospace;
      font-size: 12px;
    }
    .cheat-box {
      background: #F8FAFC;
      border: 1px solid #CBD5E1;
      border-left: 5px solid #006E8B;
      padding: 14px 18px;
      border-radius: 6px;
      margin: 20px 0;
      font-size: 13px;
    }
    .cheat-box b {
      color: #0F172A;
    }
    .q-card {
      margin: 20px 0;
      padding: 16px 20px;
      border-radius: 8px;
      background: #F8FAFC;
      border: 1px solid #E2E8F0;
      border-left: 5px solid #006E8B;
    }
    .q-header {
      font-family: 'JetBrains Mono', monospace;
      font-size: 13px;
      font-weight: 700;
      color: #006E8B;
      text-transform: uppercase;
      margin-bottom: 6px;
    }
    .q-scenario {
      font-size: 14.5px;
      font-weight: 600;
      color: #1E293B;
      margin-bottom: 10px;
      line-height: 1.5;
    }
    .q-hint {
      background: #FFFBEB;
      border: 1px solid #FDE68A;
      color: #92400E;
      font-size: 12.5px;
      padding: 8px 12px;
      border-radius: 6px;
      margin-bottom: 12px;
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }
    .q-no-hint {
      color: #94A3B8;
      font-size: 11.5px;
      font-family: 'JetBrains Mono', monospace;
      margin-bottom: 10px;
    }
    .q-options {
      list-style: none;
      padding: 0;
      margin: 0 0 12px 0;
      font-size: 13px;
    }
    .q-options li {
      padding: 4px 0;
      color: #334155;
    }
    .q-options li.correct {
      color: #15803D;
      font-weight: 700;
    }
    .q-takeaway {
      font-size: 12.5px;
      color: #475569;
      background: #FFFFFF;
      padding: 8px 12px;
      border-radius: 4px;
      border: 1px solid #E2E8F0;
    }
    .badge-mode { color: #FF6170; font-weight: bold; }
    .badge-pulse { color: #A98CFF; font-weight: bold; }
    .badge-atlas { color: #FFA658; font-weight: bold; }
    .badge-libra { color: #3DD68C; font-weight: bold; }
    .badge-vesta { color: #588DFA; font-weight: bold; }
    .formula-tag {
      background: #EFF6FF;
      color: #1E40AF;
      font-size: 11.5px;
      font-weight: 600;
      padding: 4px 8px;
      border-radius: 4px;
      margin-top: 6px;
      display: inline-block;
    }
  </style>
</head>
<body>

  <h1>Shape9 · Ko želi biti CEO?</h1>
  <div class="subhead">Specifikacija scenskog kviza znanja · Programerska konferencija Travnik</div>

  <div class="callout-lead">
    <b>Perspektiva takmičara:</b> Vi ste CEO kompanije koji donosi strateške odluke i rješava skupe operativne probleme pomoću Shape9 sistema: Mode, Pulse, Atlas, Libra i Vesta. Rječnik i situacije prilagođeni su učenicima i studentima sa jasnim metaforama za dedukciju tačnih rješenja.
  </div>

  <h2>1. Uvodni vodič kroz 5 Shape9 rješenja (Jednostavne i zabavne metafore)</h2>
  <p>Svako rješenje ima jasnu esenciju i 'formulu za prepoznavanje' tako da igrač iz 2–3 rečenice može odmah dedukovati šta treba odabrati:</p>

  <table>
    <thead>
      <tr>
        <th style="width: 25%;">Rješenje i metafora</th>
        <th style="width: 45%;">Čemu služi (Essence u 2 rečenice)</th>
        <th style="width: 30%;">🎯 Kako igrač prepoznaje odgovor</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          <span class="badge-mode">Mode (#FF6170)</span><br>
          <b>„Mozak za modne radnje”</b>
        </td>
        <td>Dok obične kase samo kucaju račun, Mode u sekundi zna ima li ta dukserica ili jakna u veličini L u bilo kojoj tvojoj radnji i jednim klikom šalje nalog kuriru brze pošte.</td>
        <td><div class="formula-tag">Prodaja odjeće, veličine (S/M/L) ili slanje paketa iz butika.</div></td>
      </tr>
      <tr>
        <td>
          <span class="badge-pulse">Pulse (#A98CFF)</span><br>
          <b>„Inspektor sa super-sluhom”</b>
        </td>
        <td>Dok čovjek može preslušati jedva 15 poziva mjesečno, Pulse automatski presluša i provjeri 100% svih telefonskih razgovora u podršci i odmah alarmira ako je agent slagao za cijenu ili prekršio pravilo.</td>
        <td><div class="formula-tag">Telefonski razgovori, agenti na slušalicama ili audio snimci.</div></td>
      </tr>
      <tr>
        <td>
          <span class="badge-atlas">Atlas (#FFA658)</span><br>
          <b>„GPS i radar za skladište”</b>
        </td>
        <td>Vodi radnika sa skenerom u ruci tačno do prave police i ne da mu da spakuje paket dok ne skenira tačan barkod, tako da kupac nikad ne dobije pogrešan model.</td>
        <td><div class="formula-tag">Roba na policama, slaganje paleta, barkod skeneri ili slanje kupcima.</div></td>
      </tr>
      <tr>
        <td>
          <span class="badge-libra">Libra (#3DD68C)</span><br>
          <b>„Čitač računa koji mrzi papir”</b>
        </td>
        <td>Samo proslijediš PDF fakturu na mail ili uslikaš račun mobitelom na benzinskoj pumpi, a Libra sama 'pročita' brojeve i troškove bez ijednog ručnog prekucavanja u tabelu.</td>
        <td><div class="formula-tag">Ulazni računi, fotografije troškova sa terena ili PDF fakture.</div></td>
      </tr>
      <tr>
        <td>
          <span class="badge-vesta">Vesta (#588DFA)</span><br>
          <b>„Čuvar imovine tvoje firme”</b>
        </td>
        <td>Dok Atlas prati robu koju prodaješ kupcima, Vesta prati stvari koje firma posjeduje: u svakom trenu zna ko duži koji radni laptop, ko vozi koje auto i gdje se nalazi koja mašina.</td>
        <td><div class="formula-tag">Oprema firme koju radnici koriste (laptopi, telefoni, auta, alati).</div></td>
      </tr>
    </tbody>
  </table>

  <h2>2. Uporedni trikovi za igrače (Dvojbe koje mogu zbuniti)</h2>
  <div class="cheat-box">
    <p>• 📦 <b>Atlas vs Vesta:</b> <b>Atlas</b> je roba na policama za <i>kupce</i> (zalihe za prodaju). <b>Vesta</b> je oprema koju <i>firma posjeduje i ne prodaje</i> (laptopi, vozila, alati).</p>
    <p style="margin-top: 8px;">• 🎙️ <b>Pulse vs Libra:</b> <b>Pulse</b> <i>'sluša' uši i glas</i> (telefonski pozivi). <b>Libra</b> <i>'čita' oči i papire</i> (fakture i slike računa s mobitela).</p>
    <p style="margin-top: 8px;">• 👗 <b>Mode:</b> Vlada butikom — povezuje kase, provjerava veličine odjeće i šalje brzu poštu.</p>
  </div>

  <h2>3. Pravila igre i sistem pomoći (Hint mehanika)</h2>
  <ul>
    <li><b>Uloga takmičara:</b> Takmičar je CEO / vlasnik kompanije kroz svih 10 pitanja.</li>
    <li><b>Značenje naziva nivoa:</b> Junior, Medior, Senior i CEO označavaju <b>isključivo težinu pitanja</b>.</li>
    <li><b>Pomoć uz odgovor (Hint):</b> Dostupna je <b>isključivo u Junior sekciji (pitanja 1, 2 i 3)</b>. Takmičar može kliknuti „Zatraži pomoć” kako bi dobio usmjerenje. Od 4. pitanja (Medior, Senior, CEO) pomoć je trajno zaključana jer pravi direktor na ozbiljnim izazovima odlučuje samostalno.</li>
  </ul>

  <h2>4. Cjelokupan set od 10 pitanja iz CEO perspektive</h2>

  <!-- Q1 -->
  <div class="q-card" style="border-left-color: #A98CFF;">
    <div class="q-header">Pitanje 1 · Težina: Junior (Očigledan operativni propust)</div>
    <div class="q-scenario">Vlasnik ste firme čiji agenti u korisničkoj podršci svaki dan obave 1.000 poziva s kupcima. Vaša šefica podrške vam kaže: „Preslušala sam 15 poziva, sve je super!”, dok vam nezadovoljni kupci na društvenim mrežama pišu da im podrška daje netačne informacije. Koji sistem vam treba da biste automatski znali šta je rečeno u svakom pozivu?</div>
    <div class="q-hint">💡 <b>Pomoć uz odgovor:</b> Sjetite se inspektora sa super-sluhom. Koji softver sluša glasove i audio snimke umjesto čovjeka?</div>
    <ul class="q-options">
      <li class="correct">• A. Pulse: automatska provjera svakog obavljenog poziva ✔ (ODOBRENO RJEŠENJE)</li>
      <li>• B. Atlas: praćenje kretanja kroz skladište</li>
      <li>• C. Libra: automatsko sortiranje ulaznih računa</li>
      <li>• D. Vesta: evidencija ko duži koji laptop</li>
    </ul>
    <div class="q-takeaway"><b>Direktorski zaključak:</b> 15 nasumično preslušanih poziva od 1.000 nije kontrola kvaliteta nego puko nagađanje. Niko ne bi trebao voditi firmu na pretpostavkama.</div>
  </div>

  <!-- Q2 -->
  <div class="q-card" style="border-left-color: #FF6170;">
    <div class="q-header">Pitanje 2 · Težina: Junior (Očigledan operativni propust)</div>
    <div class="q-scenario">Vlasnik ste modnog brenda s tri butika u gradu. Kupac ulazi u radnju i traži crnu jaknu u veličini L. Radnik ne zna ima li te veličine u vašem drugom butiku, pa troši 15 minuta zovući kolegicu telefonom dok kupac nervozno čeka, izgubi strpljenje i ode bez kupovine. Koji softver rješava ovaj problem u sekundi?</div>
    <div class="q-hint">💡 <b>Pomoć uz odgovor:</b> Sjetite se mozga za modne radnje koji na samoj kasi odmah prikazuje stanje veličina u svim buticima.</div>
    <ul class="q-options">
      <li>• A. Vesta: registar klupskog namještaja i opreme</li>
      <li>• B. Libra: sanduče za skenirane račune</li>
      <li class="correct">• C. Mode: prikaz zaliha po radnjama i veličinama u realnom vremenu ✔ (ODOBRENO RJEŠENJE)</li>
      <li>• D. Atlas: slaganje visokih paleta u skladištu</li>
    </ul>
    <div class="q-takeaway"><b>Direktorski zaključak:</b> Kupac ne želi čekati telefonske pozive između radnji. Prodaja u butiku se dobija ili gubi u prvih trideset sekundi na kasi.</div>
  </div>

  <!-- Q3 -->
  <div class="q-card" style="border-left-color: #3DD68C;">
    <div class="q-header">Pitanje 3 · Težina: Junior (Očigledan operativni propust)</div>
    <div class="q-scenario">Direktor ste firme i primjećujete da vaša asistentica prva četiri radna dana u mjesecu samo otvara mailove, skida stotine računa i slika s mobitela, ručno im mijenja imena i slaže ih po folderima. Posao kasni jer se troši vrijeme na dosadno prepisivanje. Koji vam softver treba?</div>
    <div class="q-hint">💡 <b>Pomoć uz odgovor:</b> Sjetite se čitača računa koji mrzi papir i sam skenira slike troškova sa mobitela bez ručnog prekucavanja.</div>
    <ul class="q-options">
      <li>• A. Mode: kase i prodaja u butiku</li>
      <li class="correct">• B. Libra: automatsko prepoznavanje i raspoređivanje dokumenata ✔ (ODOBRENO RJEŠENJE)</li>
      <li>• C. Pulse: kontrola telefonskih poziva</li>
      <li>• D. Atlas: barkod naljepnice za police</li>
    </ul>
    <div class="q-takeaway"><b>Direktorski zaključak:</b> Niko nije zaposlen da bi trećinu radnog vremena proveo preimenujući PDF fajlove i raspoređujući ih po folderima.</div>
  </div>

  <!-- Q4 -->
  <div class="q-card" style="border-left-color: #588DFA;">
    <div class="q-header">Pitanje 4 · Težina: Medior (Srednja složenost / Međutimske frikcije)</div>
    <div class="q-scenario">Kao direktor odobravate kupovinu tri nova skupa laptopa za novozaposlene radnike, jer se niko u firmi ne može sjetiti kod koga su završili računari kupljeni prije pola godine, a papirni spiskovi su odavno izgubljeni. Koji softver sprečava ovo bacanje novca?</div>
    <div class="q-no-hint">🔒 Pomoć nije dostupna na ovom nivou težine (Takmičar odlučuje samostalno).</div>
    <ul class="q-options">
      <li>• A. Mode: prodaja i lojalnost kupaca</li>
      <li>• B. Atlas: slaganje paketa u skladištu</li>
      <li>• C. Libra: digitalna arhiva dokumenata</li>
      <li class="correct">• D. Vesta: evidencija opreme i zaduženja po svakom radniku ✔ (ODOBRENO RJEŠENJE)</li>
    </ul>
    <div class="q-takeaway"><b>Direktorski zaključak:</b> Najskuplja oprema je ona koju ponovo kupujete samo zato što niko nije zapisao ko ju je zadužio.</div>
  </div>

  <!-- Q5 -->
  <div class="q-card" style="border-left-color: #FFA658;">
    <div class="q-header">Pitanje 5 · Težina: Medior (Srednja složenost / Međutimske frikcije)</div>
    <div class="q-scenario">Direktor ste online trgovine i suočavate se s lavinom reklamacija: kupci vam ljutito vraćaju pakete jer su umjesto naručenih bežičnih slušalica dobili obične sa kablom. Skladištari priznaju da su kutije sa sličnim šiframa bile pomiješane na istim policama i da su ih uzimali napamet. Šta uvodi red u skladište?</div>
    <div class="q-no-hint">🔒 Pomoć nije dostupna na ovom nivou težine (Takmičar odlučuje samostalno).</div>
    <ul class="q-options">
      <li class="correct">• A. Atlas: obavezno skeniranje barkoda na polici prije pakovanja ✔ (ODOBRENO RJEŠENJE)</li>
      <li>• B. Pulse: analiza razgovora s kupcima</li>
      <li>• C. Mode: maloprodajne kase</li>
      <li>• D. Vesta: spisak kancelarijskih stolica i kompjutera</li>
    </ul>
    <div class="q-takeaway"><b>Direktorski zaključak:</b> Atlas skenerom na polici provjeri kutiju prije nego što izađe iz skladišta. Povrat pogrešnog paketa je najskuplji transport u trgovini.</div>
  </div>

  <!-- Q6 -->
  <div class="q-card" style="border-left-color: #FF6170;">
    <div class="q-header">Pitanje 6 · Težina: Medior (Srednja složenost / Međutimske frikcije)</div>
    <div class="q-scenario">Vlasnik ste butika i uveli ste slanje odjeće brzom poštom na kućnu adresu. Na kraju mjeseca vidite da se čak 15% paketa vratilo neuručeno, jer radnici u radnji rukom prepisuju adrese kupaca s Instagrama na papire brze pošte pa prave slovne greške. Šta rješava ovaj problem?</div>
    <div class="q-no-hint">🔒 Pomoć nije dostupna na ovom nivou težine (Takmičar odlučuje samostalno).</div>
    <ul class="q-options">
      <li>• A. Libra: prijem ulaznih računa</li>
      <li class="correct">• B. Mode: slanje podataka kupca kurirskoj službi jednim klikom sa kase ✔ (ODOBRENO RJEŠENJE)</li>
      <li>• C. Atlas: prijem sirovina za fabriku</li>
      <li>• D. Pulse: preslušavanje poziva</li>
    </ul>
    <div class="q-takeaway"><b>Direktorski zaključak:</b> Pogrešno prepisana adresa znači paket koji se vratio i dvostruki trošak dostave. Povezivanje kase i kurira u jednom kliku to potpuno ukida.</div>
  </div>

  <!-- Q7 -->
  <div class="q-card" style="border-left-color: #A98CFF;">
    <div class="q-header">Pitanje 7 · Težina: Senior (Visoki ulozi / Pravni i revizorski rizik)</div>
    <div class="q-scenario">Na vaš sto generalnog direktora stiže pismo advokata od klijenta koji prijeti tužbom, tvrdeći da mu je vaš agent preko telefona obećao besplatnu uslugu i 50% popusta. Advokat traži tačan snimak razgovora, a vaš IT tim kaže da u arhivi ima 20.000 snimaka i da bi im trebali mjeseci da to ručno preslušaju. Šta vam treba?</div>
    <div class="q-no-hint">🔒 Pomoć nije dostupna na ovom nivou težine (Takmičar odlučuje samostalno).</div>
    <ul class="q-options">
      <li>• A. Atlas</li>
      <li>• B. Vesta</li>
      <li class="correct">• C. Pulse ✔ (ODOBRENO RJEŠENJE)</li>
      <li>• D. Libra</li>
    </ul>
    <div class="q-takeaway"><b>Direktorski zaključak:</b> Audio snimci bez mogućnosti automatske pretrage i analize nisu arhiva nego pravna tempirana bomba. Pulse pronađe tačnu rečenicu za par sekundi.</div>
  </div>

  <!-- Q8 -->
  <div class="q-card" style="border-left-color: #588DFA;">
    <div class="q-header">Pitanje 8 · Težina: Senior (Visoki ulozi / Pravni i revizorski rizik)</div>
    <div class="q-scenario">Vodite grupu od nekoliko povezanih firmi. Dolazi porezna inspekcija i traži tačan spisak svih službenih automobila, laptopa i industrijskih mašina: gdje se tačno nalaze, ko ih vozi i kolika im je trenutna vrijednost. Direktori vam donose tri različite Excel tabele koje se uopšte ne slažu. Koji vam sistem treba?</div>
    <div class="q-no-hint">🔒 Pomoć nije dostupna na ovom nivou težine (Takmičar odlučuje samostalno).</div>
    <ul class="q-options">
      <li class="correct">• A. Vesta ✔ (ODOBRENO RJEŠENJE)</li>
      <li>• B. Atlas</li>
      <li>• C. Mode</li>
      <li>• D. Pulse</li>
    </ul>
    <div class="q-takeaway"><b>Direktorski zaključak:</b> Atlas prati robu koja se prodaje kupcima, ali Vesta štiti i prati imovinu koju firma posjeduje i na koga se ona vodi u poslovnim knjigama.</div>
  </div>

  <!-- Q9 -->
  <div class="q-card" style="border-left-color: #FFA658;">
    <div class="q-header">Pitanje 9 · Težina: Senior (Visoki ulozi / Pravni i revizorski rizik)</div>
    <div class="q-scenario">Kao CEO planirate veliku novu nabavku, ali finansijski direktor i šef skladišta imaju ogromnu razliku od 300.000 KM u procjeni trenutnih zaliha robe za prodaju. Na papiru piše jedno, a police skladišta su poluprazne. Zbog ovog haosa ne znate stvarno stanje firme. Šta uvodi potpunu tačnost zaliha?</div>
    <div class="q-no-hint">🔒 Pomoć nije dostupna na ovom nivou težine (Takmičar odlučuje samostalno).</div>
    <ul class="q-options">
      <li>• A. Mode</li>
      <li>• B. Libra</li>
      <li>• C. Pulse</li>
      <li class="correct">• D. Atlas ✔ (ODOBRENO RJEŠENJE)</li>
    </ul>
    <div class="q-takeaway"><b>Direktorski zaključak:</b> Naš klijent sa 12 skladišta podigao je tačnost zaliha sa 81% na 99,4% za samo šest sedmica, jer Atlas prati svako fizičko pomjeranje kutije i palete.</div>
  </div>

  <!-- Q10 -->
  <div class="q-card" style="border-left-color: #3DD68C;">
    <div class="q-header">Pitanje 10 · Težina: CEO (Kompanijska kriza / Strateški opstanak)</div>
    <div class="q-scenario">Vodite računovodstvenu firmu sa 100 klijenata. Zadnji je dan u mjesecu za predaju poreza, a klijenti vam odjednom pošalju na stotine slika računa sa pumpi, prodavnica i kafića. Vaš tim radi cijelu noć premoren prepisujući iznose sa slika, greške se gomilaju, a klijenti prijete odlaskom zbog mogućih kazni inspekcije. Koji sistem spašava firmu od ovog haosa?</div>
    <div class="q-no-hint">🔒 Pomoć nije dostupna na ovom nivou težine (Takmičar odlučuje samostalno).</div>
    <ul class="q-options">
      <li>• A. Mode</li>
      <li class="correct">• B. Libra ✔ (ODOBRENO RJEŠENJE)</li>
      <li>• C. Atlas</li>
      <li>• D. Pulse</li>
    </ul>
    <div class="q-takeaway"><b>Direktorski zaključak:</b> Kada klijenti pošalju račun slikan mobitelom, a Libra sama prepozna iznose i pridruži ih njihovom folderu, kraj mjeseca prestaje biti noćna mora.</div>
  </div>

</body>
</html>
'''

with open("public/Ko_Zeli_Biti_CEO_GoogleDocs.html", "w", encoding="utf-8") as f:
    f.write(html_content)

print("Generated public/Ko_Zeli_Biti_CEO_GoogleDocs.html")
