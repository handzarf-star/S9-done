import zipfile
import html
import os

def xml_escape(text):
    return html.escape(str(text))

def build_p(text="", bold=False, italic=False, size=22, color="010D13", font="Inter", align="left", space_after=120, space_before=0, highlight=None):
    r_pr = f'<w:rFonts w:ascii="{font}" w:hAnsi="{font}" w:cs="{font}"/>'
    if bold:
        r_pr += '<w:b/>'
    if italic:
        r_pr += '<w:i/>'
    if size:
        r_pr += f'<w:sz w:val="{size}"/>'
    if color:
        r_pr += f'<w:color w:val="{color}"/>'
    if highlight:
        r_pr += f'<w:shd w:val="clear" w:color="auto" w:fill="{highlight}"/>'

    p_pr = f'<w:jc w:val="{align}"/><w:spacing w:before="{space_before}" w:after="{space_after}"/>'
    t_xml = f'<w:t xml:space="preserve">{xml_escape(text)}</w:t>' if text else ''
    return f'<w:p><w:pPr>{p_pr}</w:pPr><w:r><w:rPr>{r_pr}</w:rPr>{t_xml}</w:r></w:p>'

def build_run(text, bold=False, italic=False, size=22, color="010D13", font="Inter", bg=None):
    r_pr = f'<w:rFonts w:ascii="{font}" w:hAnsi="{font}" w:cs="{font}"/>'
    if bold:
        r_pr += '<w:b/>'
    if italic:
        r_pr += '<w:i/>'
    if size:
        r_pr += f'<w:sz w:val="{size}"/>'
    if color:
        r_pr += f'<w:color w:val="{color}"/>'
    if bg:
        r_pr += f'<w:shd w:val="clear" w:color="auto" w:fill="{bg}"/>'
    return f'<w:r><w:rPr>{r_pr}</w:rPr><w:t xml:space="preserve">{xml_escape(text)}</w:t></w:r>'

def build_question_box(num, difficulty, prize, scenario, options, correct_key, takeaway, aris_hint, product_color="006E8B"):
    p_head = f'''<w:p>
      <w:pPr>
        <w:pBdr><w:left w:val="single" w:sz="24" w:space="12" w:color="{product_color}"/></w:pBdr>
        <w:shd w:val="clear" w:color="auto" w:fill="F8FAFC"/>
        <w:spacing w:before="160" w:after="40"/>
      </w:pPr>
      {build_run(f"PITANJE {num} · NIVO: {difficulty.upper()} · NAGRADA: {prize} · TAJMER: 30S", bold=True, size=22, color="0F172A", font="JetBrains Mono")}
    </w:p>'''

    p_scen = f'''<w:p>
      <w:pPr>
        <w:pBdr><w:left w:val="single" w:sz="24" w:space="12" w:color="{product_color}"/></w:pBdr>
        <w:shd w:val="clear" w:color="auto" w:fill="F8FAFC"/>
        <w:spacing w:before="0" w:after="80"/>
      </w:pPr>
      {build_run("Kritična odluka uprave (Uloga CEO): ", bold=True, size=21, color="006E8B")}
      {build_run(scenario, italic=True, size=21, color="1E293B")}
    </w:p>'''

    hint_xml = f'''<w:p>
      <w:pPr>
        <w:pBdr><w:left w:val="single" w:sz="24" w:space="12" w:color="{product_color}"/></w:pBdr>
        <w:shd w:val="clear" w:color="auto" w:fill="FAF5FF"/>
        <w:spacing w:before="40" w:after="60"/>
      </w:pPr>
      {build_run("🤖 Aris Chatbot (Pomoć digitalnog analitičara u uglu ekrana): ", bold=True, size=20, color="9333EA")}
      {build_run(f'„{aris_hint}”', italic=True, size=20, color="6B21A8")}
    </w:p>'''

    opts_xml = ""
    for opt in options:
        is_correct = opt.startswith(correct_key + ".")
        opt_color = "15803D" if is_correct else "334155"
        opt_weight = True if is_correct else False
        check_mark = " ✔ (ODOBRENO RJEŠENJE)" if is_correct else ""
        opts_xml += f'''<w:p>
          <w:pPr>
            <w:pBdr><w:left w:val="single" w:sz="24" w:space="12" w:color="{product_color}"/></w:pBdr>
            <w:shd w:val="clear" w:color="auto" w:fill="F8FAFC"/>
            <w:spacing w:before="0" w:after="20"/>
          </w:pPr>
          {build_run("  • " + opt + check_mark, bold=opt_weight, size=20, color=opt_color)}
        </w:p>'''

    p_takeaway = f'''<w:p>
      <w:pPr>
        <w:pBdr><w:left w:val="single" w:sz="24" w:space="12" w:color="{product_color}"/></w:pBdr>
        <w:shd w:val="clear" w:color="auto" w:fill="F0FDF4"/>
        <w:spacing w:before="60" w:after="180"/>
      </w:pPr>
      {build_run("Potvrda: ", bold=True, size=20, color="166534")}
      {build_run(takeaway, size=20, color="15803D")}
    </w:p>'''

    return p_head + p_scen + hint_xml + opts_xml + p_takeaway

def build_table(headers, rows, col_widths=None):
    grid = ""
    if col_widths:
        for w in col_widths:
            grid += f'<w:gridCol w:w="{w}"/>'
    
    tbl = f'<w:tbl><w:tblPr><w:tblW w:w="9600" w:type="dxa"/><w:tblBorders><w:top w:val="single" w:sz="6" w:space="0" w:color="CBD5E1"/><w:bottom w:val="single" w:sz="6" w:space="0" w:color="CBD5E1"/><w:insideH w:val="single" w:sz="4" w:space="0" w:color="E2E8F0"/><w:insideV w:val="none"/><w:left w:val="none"/><w:right w:val="none"/></w:tblBorders></w:tblPr><w:tblGrid>{grid}</w:tblGrid>'
    
    # Header row
    tbl += '<w:tr><w:trPr><w:tblHeader/></w:trPr>'
    for h in headers:
        tbl += f'''<w:tc><w:tcPr><w:shd w:val="clear" w:color="auto" w:fill="F1F5F9"/><w:tcMar><w:top w:w="120"/><w:bottom w:w="120"/><w:left w:w="160"/><w:right w:w="160"/></w:tcMar></w:tcPr><w:p><w:pPr><w:spacing w:before="0" w:after="0"/></w:pPr>{build_run(h, bold=True, size=19, font="JetBrains Mono", color="475569")}</w:p></w:tc>'''
    tbl += '</w:tr>'
    
    # Rows
    for row in rows:
        tbl += '<w:tr>'
        for cell in row:
            tbl += f'''<w:tc><w:tcPr><w:tcMar><w:top w:w="100"/><w:bottom w:w="100"/><w:left w:w="160"/><w:right w:w="160"/></w:tcMar></w:tcPr><w:p><w:pPr><w:spacing w:before="0" w:after="0"/></w:pPr>{build_run(cell, size=20, color="1E293B")}</w:p></w:tc>'''
        tbl += '</w:tr>'
    tbl += '</w:tbl><w:p><w:pPr><w:spacing w:before="100" w:after="100"/></w:pPr></w:p>'
    return tbl

def generate_ceo_docx():
    body = []

    # Title
    body.append(build_p("Shape9 · Ko želi biti CEO?", bold=True, size=48, color="006E8B", space_after=60))
    body.append(build_p("SCENSKI KVIZ ZNANJA ZA POSLOVNE LIDERE · IT.REBOOT VOL 6.0 TRAVNIK", bold=True, size=22, font="JetBrains Mono", color="64748B", space_after=180))
    body.append(build_p("Ciljna publika: Dok je Pulse QA igra namijenjena svim uzrastima, igra 'Ko želi biti CEO?' namijenjena je vlasnicima kompanija, direktorima i menadžerima. Format je u stilu Milionera: 10 kriznih situacija, novčana ljestvica do 1.000.000 KM, tačni odgovori su samo imena softvera, a pogrešan odgovor odmah vodi na ekran poraza.", italic=True, size=24, color="334155", space_after=300))

    # Section 1: Detailed Product Guide (Prije / Sada & features)
    body.append(build_p("1. Detaljan vodič kroz 5 Shape9 rješenja (Operativni kontekst i mogućnosti)", bold=True, size=32, color="010D13", space_before=240, space_after=120))
    body.append(build_p("Kategorije proizvoda na statusnoj traci tokom igre: Mode (Butici i maloprodaja), Pulse (Kontakt centri), Atlas (Skladište), Libra (Dokumenti i računovodstvo), Vesta (Imovina i inventar). Tokom igre prozor s detaljima se ne može otvarati kako bi se održala visoka dinamika.", size=22, space_after=120))

    # Mode Table
    body.append(build_p("MODE (#FF6170 · Butici i maloprodaja)", bold=True, size=26, color="FF6170", space_before=160, space_after=60))
    body.append(build_p("Sistem za butike i maloprodaju. Od prijema robe do isporuke artikla kupcu. Mode Vas prati svaki korak.", italic=True, size=21, color="475569", space_after=100))
    mode_table = [
        ["Segment poslovanja", "Prije (Uobičajeni problemi)", "Sada (Sa Mode sistemom)"],
        ["1. Prijem robe", "Roba se prebroji na brzinu, otpremnica se potpiše. Manjak se otkrije kada je već kasno.", "Skenirate, Mode sam utvrdi manjak ili višak. Problem je spriječen pri prijemu robe."],
        ["2. Prodaja", "Kupac ode i to je kraj. Nemate dodatnih informacija.", "Uz prodaju ostaje profil kupca: veličina, spol, kontakt i podaci za bolje targetiranje."],
        ["3. Kupci", "Objava na Instagramu uz nadu da će je prava osoba vidjeti.", "Ponuda ide onim kupcima koji odgovaraju profilu, uz automatske poruke koje Vi odredite."],
        ["4. Stanje zaliha", "Prodavač zove druge radnje ili ide u magacin dok kupac gubi strpljenje i ode.", "Prodavač skenira artikal na mobitelu i vidi stanje u svim radnjama i magacinu odmah."],
        ["5. Dostava", "Adresa se prepisuje ručno u kurirski obrazac. Greška znači vraćen paket.", "Najava dostave se generiše iz narudžbe. Kupac dobija notifikaciju s brojem pošiljke."],
        ["6. Promet i marža", "Rezultati kojima ne možete vjerovati. Ne znate koja je promocija uspjela.", "Realtime izvještaj o prodaji po prodavaču, lokaciji, artiklu i maržama."]
    ]
    body.append(build_table(mode_table[0], mode_table[1:], [2500, 3550, 3550]))

    # Pulse Table
    body.append(build_p("PULSE (#A98CFF · Kontakt centri i analiza govora)", bold=True, size=26, color="7C3AED", space_before=160, space_after=60))
    body.append(build_p("Sluša i analizira pozive umjesto Vas. Provjeri hiljade poziva s kupcima ili klijentima i napravi detaljan izvještaj. Od audio snimka do jasnog izvještaja, potpuno automatizovano.", italic=True, size=21, color="475569", space_after=100))
    pulse_table = [
        ["Mogućnost", "Operativni opis u praksi"],
        ["Transkripcija govora u tekst", "Precizno prepoznavanje lokalnog govora s razdvajanjem govornika i mogućnošću pretrage."],
        ["Vaša prilagođena pravila", "Vi odredite šta se provjerava, Pulse to primijeni na svaki poziv jednako: je li najavljeno snimanje, jesu li objašnjeni cijena, uslovi i rok, i šta se desilo kad je klijent tražio prekid kontakta."],
        ["Izvještaj o svakom pozivu", "Za svaki poziv dobijete sažetak i oznaku za ono što odstupa od Vaših pravila. Radite po popisu, ne po snimcima."],
        ["Direktna integracija s centralom", "Snimci se automatski preuzimaju direktno s Vaše telefonije, bez ručnog eksporta."],
        ["Analitika i trendovi tima", "Performanse agenata, učestalost pitanja i kretanje korisničkog zadovoljstva kroz vrijeme."],
        ["Sigurnost i usklađenost", "Napredna enkripcija podataka i automatizovano brisanje u skladu s propisima."]
    ]
    body.append(build_table(pulse_table[0], pulse_table[1:], [3200, 6400]))

    # Atlas Table
    body.append(build_p("ATLAS (#FFA658 · Skladište i napredni WMS)", bold=True, size=26, color="C2410C", space_before=160, space_after=60))
    body.append(build_p("Napredno upravljanje skladištem (WMS). Tačno stanje zaliha, tačna polica na kojoj se artikal nalazi i obavještenje za nabavku robe. Sve funkcije skladišnog poslovanja u jedinstvenom sistemu.", italic=True, size=21, color="475569", space_after=100))
    atlas_table = [
        ["Funkcija skladišta", "Operativni opis u praksi"],
        ["Stanje i mikrolokacije", "Tačan uvid u količinu, poziciju na polici i historiju kretanja artikala na svim lokacijama."],
        ["Nabavka i dobavljači", "Uporedite šta je stvarno stiglo sa dostavnicom, po kojoj je cijeni roba ušla, ko ju je dostavio i kada, i je li plaćena."],
        ["Komisioniranje i otprema", "Optimizovane rute kretanja kroz skladište i dvostruka verifikacija skeniranjem prije predaje kurirskoj službi."],
        ["Međuskladišni transferi", "Potpuna kontrola kretanja robe između centralnih i regionalnih skladišta bez gubitaka."],
        ["Mobilna aplikacija za radnike", "Intuitivno skeniranje barkodova putem industrijskih terminala ili Android pametnih telefona."],
        ["Prodaja, kupci i premještanje", "Vidite šta brzo napušta skladište, šta stoji mjesecima, kako se prodaje i kome."]
    ]
    body.append(build_table(atlas_table[0], atlas_table[1:], [3200, 6400]))

    # Libra Table
    body.append(build_p("LIBRA (#3DD68C · Dokumenti i računovodstvo)", bold=True, size=26, color="15803D", space_before=160, space_after=60))
    body.append(build_p("Dokumenti pristižu na različite načine. Neko ih mora ručno otvoriti i razvrstati svaki od njih. Skenirani računi, PDF ugovori, bankovni izvodi ili fotografije troškova sa terena. Libra prepoznaje o čemu je riječ, čiji je dokument i odmah ga pohranjuje u odgovarajući folder.", italic=True, size=21, color="475569", space_after=80))
    body.append(build_p("Gubitak produktivnosti: Najskuplji radni sat u računovodstvu je onaj potrošen na preimenovanje i sortiranje fajlova. Klijenti šalju račune bez reda i standarda. Vaši stručnjaci svakodnevno otvaraju priloge, preimenuju fajlove, kreiraju foldere i ručno ih razvrstavaju. Kada to pomnožite sa desetinama klijenata, dobijate sate izgubljene na administrativnu rutinu umjesto na stručni finansijski rad. Vrijednost Vašeg tima je u analizi i savjetovanju, a ne u ručnoj administraciji.", size=20, color="92400E", highlight="FEF3C7", space_after=100))
    libra_table = [
        ["Korak", "Faza procesa", "Opis automatizacije"],
        ["01", "Automatski prijem", "Dokumenti stižu na Vaš postojeći email ili u portal. Za svakog klijenta sistem zna šta je za taj mjesec već stiglo, a šta još fali."],
        ["02", "Libra pročita i prepozna", "Libra analizira sadržaj: identifikuje izdavača, period, vrstu troška i automatski pridružuje dokument tačnom klijentu."],
        ["03", "Uredno arhiviranje", "Fajl dobije uredno ime i sjedne u folder klijenta, po Vašoj strukturi. Klijent vidi dokle je stiglo i dobije obavijest. Svaka izmjena ostaje zapisana."]
    ]
    body.append(build_table(libra_table[0], libra_table[1:], [1200, 2800, 5600]))

    # Vesta Table
    body.append(build_p("VESTA (#588DFA · Imovina i inventar kompanije)", bold=True, size=26, color="1D4ED8", space_before=160, space_after=60))
    body.append(build_p("Cjelokupna imovina kompanije pod kontrolom, od narudžbenice do konačnog otpisa. „Kod koga se trenutno nalazi uređaj?” To je pitanje koje se u praksi ponavlja gotovo svake sedmice i redovno troši pola radnog dana.", italic=True, size=21, color="475569", space_after=80))
    body.append(build_p("Problem godišnjeg popisa i terena: Popis radite jednom godišnje, a oprema se kreće svakodnevno. Kada je imovina raspoređena na više lokacija i pravnih lica, niko nema tačan uvid u to šta kompanija posjeduje niti gdje se pojedinačna sredstva nalaze.", size=20, color="1E40AF", highlight="EFF6FF", space_after=100))
    vesta_table = [
        ["Izazov u praksi", "Kako Vesta rješava problem"],
        ["Tabele ne mogu pratiti stvarnu dinamiku na terenu", "Ko je zadužen za opremu, kolika joj je knjigovodstvena vrijednost, kada ističe garancija i šta je na njoj servisirano: svi ti podaci u tabelama zastarijevaju već za nekoliko sedmica. Vesta nudi živi registar u realnom vremenu."],
        ["Kretanje imovine između povezanih firmi ne ostavlja trag", "Interni zakup, ustupanje ili povrat: ništa od toga u tabelama nije evidentirano na način da se kasnije može brzo pronaći i revidirati. Vesta prati svaki prelaz sa pravnog lica na pravno lice."],
        ["Terenskom osoblju nedostaju operativni alati", "Radnici mogu na licu mjesta skenirati barkod naljepnicu na sredstvu, vidjeti zaduženje i ažurirati status opreme putem pametnog telefona."]
    ]
    body.append(build_table(vesta_table[0], vesta_table[1:], [3500, 6100]))

    # Section 2: Mechanics & Elimination rules
    body.append(build_p("2. Pravila eliminacije, mehanika Milionera i Aris Chatbot", bold=True, size=32, color="010D13", space_before=240, space_after=120))
    body.append(build_p("• Opcije odgovora: Uklonjena su duga objašnjenja unutar dugmadi. Igrač bira isključivo naziv proizvoda: [A] Mode, [B] Pulse, [C] Atlas, [D] Libra ili Vesta.", bold=True, size=22, space_after=60))
    body.append(build_p("• Ekran poraza (Game Over): Pogrešan odgovor ili istek 30 sekundi odmah vodi na ekran poraza, uz prikaz postignutog nivoa i tačnog rješenja.", size=22, space_after=60))
    body.append(build_p("• Ljestvica nagrade: Na desnoj strani nalazi se skala iznosa (1.000 KM do 1.000.000 KM) bez otkrivanja tačnih rješenja. Sigurni prag je na 16.000 KM (pitanje 5).", size=22, space_after=60))
    body.append(build_p("• Aris Chatbot balončić u uglu: Smješten u donjem desnom uglu ekrana kao moderan chatbot widget sa brojačem pomoći (najviše 2 korištenja tokom igre).", size=22, space_after=60))
    body.append(build_p("• Kratka i brza potvrda: Nakon tačnog izbora prikazuje se kratka, 1-rečenična potvrda s audio pohvalom.", size=22, space_after=140))

    # Section 3: 10 Questions
    body.append(build_p("3. Cjelokupan set od 10 pitanja iz CEO perspektive", bold=True, size=32, color="010D13", space_before=240, space_after=140))

    questions = [
        {
            "num": 1, "level": "Junior", "prize": "1.000 KM",
            "scenario": "Vlasnik ste firme čiji agenti u korisničkoj podršci svaki dan obave 1.000 poziva s kupcima. Voditeljica podrške Vam kaže: „Preslušala sam 15 poziva, sve je super!”, dok Vam nezadovoljni kupci na društvenim mrežama pišu da im podrška daje netačne informacije. Koji sistem Vam treba da biste automatski znali šta je rečeno u svakom pozivu?",
            "options": ["A. Pulse", "B. Atlas", "C. Libra", "D. Vesta"], "correct": "A",
            "takeaway": "Tako je. Pulse automatski provjeri svaki poziv i odmah javi greške agenata.",
            "aris": "Pregledao sam baze. Ovaj problem se rješava automatizovanom provjerom audio poziva. Razmislite o sistemu koji sluša agente: Pulse.",
            "color": "A98CFF"
        },
        {
            "num": 2, "level": "Junior", "prize": "2.000 KM",
            "scenario": "Vlasnik ste modnog brenda s tri butika u gradu. Kupac ulazi u radnju i traži crnu jaknu u veličini L. Radnik ne zna ima li te veličine u Vašem drugom butiku, pa troši 15 minuta zovući kolegicu telefonom dok kupac nervozno čeka, izgubi strpljenje i ode bez kupovine. Koji softver rješava ovaj problem u sekundi?",
            "options": ["A. Vesta", "B. Libra", "C. Mode", "D. Atlas"], "correct": "C",
            "takeaway": "Tačno. Mode u realnom vremenu vidi zalihe i veličine u svim buticima.",
            "aris": "U evidenciji vidim da kupac čeka na kasi zbog veličine jakne. Za radnje, butike i veličine u svim objektima koristimo Mode.",
            "color": "FF6170"
        },
        {
            "num": 3, "level": "Junior", "prize": "4.000 KM",
            "scenario": "Direktor ste firme i primjećujete da Vaša asistentica prva četiri radna dana u mjesecu samo otvara mailove, skida stotine računa i slika s mobitela, ručno im mijenja imena i slaže ih po folderima. Posao kasni jer se troši vrijeme na dosadno prepisivanje. Koji Vam softver treba?",
            "options": ["A. Mode", "B. Libra", "C. Pulse", "D. Atlas"], "correct": "B",
            "takeaway": "Tako je. Libra sama prepozna račune i posloži ih u foldere bez prekucavanja.",
            "aris": "Ovo je gubljenje vremena na ručno slaganje ulaznih računa. Libra to rješava automatskim čitanjem i arhiviranjem bez prekucavanja.",
            "color": "3DD68C"
        },
        {
            "num": 4, "level": "Medior", "prize": "8.000 KM",
            "scenario": "Kao direktor odobravate kupovinu tri nova skupa laptopa za novozaposlene radnike, jer se niko u firmi ne može sjetiti kod koga su završili računari kupljeni prije pola godine, a papirni spiskovi su odavno izgubljeni. Koji softver sprečava ovo bacanje novca?",
            "options": ["A. Mode", "B. Atlas", "C. Libra", "D. Vesta"], "correct": "D",
            "takeaway": "Tačno. Vesta u svakom trenutku zna ko duži koji laptop i komad opreme.",
            "aris": "U pitanju su osnovna sredstva i laptopi koji pripadaju firmi. Vesta u svakom trenutku prati ko šta duži i gdje se oprema nalazi.",
            "color": "588DFA"
        },
        {
            "num": 5, "level": "Medior", "prize": "16.000 KM",
            "scenario": "Direktor ste online trgovine i suočavate se s lavinom reklamacija: kupci Vam ljutito vraćaju pakete jer su umjesto naručenih bežičnih slušalica dobili obične sa kablom. Skladištari priznaju da su kutije sa sličnim šiframa bile pomiješane na istim policama i da su ih uzimali napamet. Šta uvodi red u skladište?",
            "options": ["A. Atlas", "B. Pulse", "C. Mode", "D. Vesta"], "correct": "A",
            "takeaway": "Tako je. Atlas skeniranjem police osigurava da kupac dobije tačan artikal.",
            "aris": "Kupac je dobio pogrešne slušalice jer radnik nije skenirao policu. Atlas uvodi red u skladište i vodi radnika do tačne lokacije.",
            "color": "FFA658"
        },
        {
            "num": 6, "level": "Medior", "prize": "32.000 KM",
            "scenario": "Vlasnik ste butika i uveli ste slanje odjeće brzom poštom na kućnu adresu. Na kraju mjeseca vidite da se čak 15% paketa vratilo neuručeno, jer radnici u radnji rukom prepisuju adrese kupaca s Instagrama na papire brze pošte pa prave slovne greške. Šta rješava ovaj problem?",
            "options": ["A. Libra", "B. Mode", "C. Atlas", "D. Pulse"], "correct": "B",
            "takeaway": "Tačno. Mode jednim klikom šalje nalog kuriru direktno sa kase.",
            "aris": "Adrese sa Instagrama se ručno prepisuju, što stvara skupe greške. Mode je povezan s kuririma i rješava dostavu jednim klikom sa kase.",
            "color": "FF6170"
        },
        {
            "num": 7, "level": "Senior", "prize": "64.000 KM",
            "scenario": "Na Vaš sto generalnog direktora stiže pismo advokata od klijenta koji prijeti tužbom, tvrdeći da mu je Vaš agent preko telefona obećao besplatnu uslugu i 50% popusta. Advokat traži tačan snimak razgovora, a Vaš IT tim kaže da u arhivi ima 20.000 snimaka i da bi im trebali mjeseci da to ručno preslušaju. Šta Vam treba?",
            "options": ["A. Atlas", "B. Vesta", "C. Pulse", "D. Libra"], "correct": "C",
            "takeaway": "Tako je. Pulse za par sekundi pronađe tačnu rečenicu u hiljadama audio snimaka.",
            "aris": "Analizirao sam pravni rizik: traži se pronalazak tačnog obećanja u 20.000 audio zapisa. Treba Vam sistem za automatsku transkripciju i pretragu govora: Pulse.",
            "color": "A98CFF"
        },
        {
            "num": 8, "level": "Senior", "prize": "125.000 KM",
            "scenario": "Vodite grupu od nekoliko povezanih firmi. Dolazi porezna inspekcija i traži tačan spisak svih službenih automobila, laptopa i industrijskih mašina: gdje se tačno nalaze, ko ih vozi i kolika im je trenutna vrijednost. Direktori Vam donose tri različite Excel tabele koje se uopšte ne slažu. Koji Vam sistem treba?",
            "options": ["A. Vesta", "B. Atlas", "C. Mode", "D. Pulse"], "correct": "A",
            "takeaway": "Tačno. Vesta vodi tačan centralni registar kompletne imovine kompanije.",
            "aris": "Ovdje se ne radi o robi za prodaju kupcima, već o internoj imovini firme (automobili, laptopi, mašine). Za praćenje ko šta duži i gdje se nalazi zadužena je Vesta.",
            "color": "588DFA"
        },
        {
            "num": 9, "level": "Senior", "prize": "250.000 KM",
            "scenario": "Kao CEO planirate veliku novu nabavku, ali finansijski direktor i šef skladišta imaju ogromnu razliku od 300.000 KM u procjeni trenutnih zaliha robe za prodaju. Na papiru piše jedno, a police skladišta su poluprazne. Zbog ovog haosa ne znate stvarno stanje firme. Šta uvodi potpunu tačnost zaliha?",
            "options": ["A. Mode", "B. Libra", "C. Pulse", "D. Atlas"], "correct": "D",
            "takeaway": "Tako je. Atlas vodi radnika skenerom do police i drži tačnost zaliha iznad 99%.",
            "aris": "Problem je neusklađenost stanja u skladištu i na papiru za robu na stanju. WMS sistem sa barkod skenerima i mikrolokacijama polica je Atlas.",
            "color": "FFA658"
        },
        {
            "num": 10, "level": "CEO", "prize": "1.000.000 KM",
            "scenario": "Vodite računovodstvenu firmu sa 100 klijenata. Zadnji je dan u mjesecu za predaju poreza, a klijenti Vam odjednom pošalju na stotine slika računa sa pumpi, prodavnica i kafića. Vaš tim radi cijelu noć premoren prepisujući iznose sa slika, greške se gomilaju, a klijenti prijete odlaskom zbog mogućih kazni inspekcije. Koji sistem spašava firmu od ovog haosa?",
            "options": ["A. Mode", "B. Libra", "C. Atlas", "D. Pulse"], "correct": "B",
            "takeaway": "Tako je. Libra očitava račune sa slika i automatizuje kraj mjeseca.",
            "aris": "Analiziram problem: gomila fotografija ulaznih računa i ručno prekucavanje troškova pred kraj mjeseca. Sistem koji sam prepoznaje stavke i razvrstava dokumentaciju je Libra.",
            "color": "3DD68C"
        }
    ]

    for q in questions:
        body.append(build_question_box(
            str(q["num"]), q["level"], q["prize"],
            q["scenario"], q["options"], q["correct"],
            q["takeaway"], q["aris"], q["color"]
        ))

    # Package as docx
    content_types = '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
  <Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>
</Types>'''

    rels = '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>'''

    doc_rels = '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
</Relationships>'''

    styles = '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:docDefaults>
    <w:rPrDefault>
      <w:rPr>
        <w:rFonts w:ascii="Inter" w:hAnsi="Inter" w:cs="Inter"/>
        <w:sz w:val="22"/>
        <w:color w:val="010D13"/>
      </w:rPr>
    </w:rPrDefault>
  </w:docDefaults>
</w:styles>'''

    doc_xml = f'''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:body>
    {''.join(body)}
    <w:sectPr>
      <w:pgSz w:w="11906" w:h="16838"/>
      <w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440"/>
    </w:sectPr>
  </w:body>
</w:document>'''

    # Verify zero em-dashes and en-dashes
    if '—' in doc_xml:
        raise ValueError("EM DASH FOUND IN DOCX XML!")
    if '–' in doc_xml:
        raise ValueError("EN DASH FOUND IN DOCX XML!")

    dest_paths = [
        "Ko_Zeli_Biti_CEO_Specifikacija.docx",
        "/Users/farishandzar/Claude/Projects/Shape9/_Kod/Igre/Ko_Zeli_Biti_CEO_Specifikacija.docx"
    ]
    for filename in dest_paths:
        try:
            with zipfile.ZipFile(filename, 'w', zipfile.ZIP_DEFLATED) as zf:
                zf.writestr('[Content_Types].xml', content_types)
                zf.writestr('_rels/.rels', rels)
                zf.writestr('word/_rels/document.xml.rels', doc_rels)
                zf.writestr('word/styles.xml', styles)
                zf.writestr('word/document.xml', doc_xml)
            print(f"Generated {filename}")
        except Exception as e:
            print(f"Could not write {filename}: {e}")

if __name__ == "__main__":
    generate_ceo_docx()
