import zipfile
import html

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

def build_question_box(num, difficulty, scenario, options, correct_key, takeaway, hint=None, product_color="006E8B"):
    p_head = f'''<w:p>
      <w:pPr>
        <w:pBdr><w:left w:val="single" w:sz="24" w:space="12" w:color="{product_color}"/></w:pBdr>
        <w:shd w:val="clear" w:color="auto" w:fill="F8FAFC"/>
        <w:spacing w:before="160" w:after="40"/>
      </w:pPr>
      {build_run(f"PITANJE {num} · TEŽINA: {difficulty.upper()}", bold=True, size=22, color="0F172A", font="JetBrains Mono")}
    </w:p>'''

    p_scen = f'''<w:p>
      <w:pPr>
        <w:pBdr><w:left w:val="single" w:sz="24" w:space="12" w:color="{product_color}"/></w:pBdr>
        <w:shd w:val="clear" w:color="auto" w:fill="F8FAFC"/>
        <w:spacing w:before="0" w:after="80"/>
      </w:pPr>
      {build_run("Poslovni scenario (Uloga CEO / Vlasnika): ", bold=True, size=21, color="006E8B")}
      {build_run(scenario, italic=True, size=21, color="1E293B")}
    </w:p>'''

    hint_xml = ""
    if hint:
        hint_xml = f'''<w:p>
          <w:pPr>
            <w:pBdr><w:left w:val="single" w:sz="24" w:space="12" w:color="{product_color}"/></w:pBdr>
            <w:shd w:val="clear" w:color="auto" w:fill="FFFBEB"/>
            <w:spacing w:before="40" w:after="60"/>
          </w:pPr>
          {build_run("💡 Pomoć uz odgovor (Dostupno samo u Junior nivou): ", bold=True, size=20, color="B45309")}
          {build_run(hint, italic=True, size=20, color="92400E")}
        </w:p>'''
    else:
        hint_xml = f'''<w:p>
          <w:pPr>
            <w:pBdr><w:left w:val="single" w:sz="24" w:space="12" w:color="{product_color}"/></w:pBdr>
            <w:shd w:val="clear" w:color="auto" w:fill="F8FAFC"/>
            <w:spacing w:before="20" w:after="40"/>
          </w:pPr>
          {build_run("🔒 Pomoć uz odgovor: ", bold=True, size=19, color="64748B")}
          {build_run("Nije dostupna na ovom nivou težine (Takmičar odlučuje samostalno).", italic=True, size=19, color="64748B")}
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
        <w:shd w:val="clear" w:color="auto" w:fill="F8FAFC"/>
        <w:spacing w:before="60" w:after="180"/>
      </w:pPr>
      {build_run("Direktorski zaključak: ", bold=True, size=20, color="0F172A")}
      {build_run(takeaway, size=20, color="475569")}
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
    body.append(build_p("SCENSKI KVIZ ZNANJA · PROGRAMERSKA KONFERENCIJA TRAVNIK", bold=True, size=22, font="JetBrains Mono", color="64748B", space_after=180))
    body.append(build_p("Perspektiva: Vi ste CEO kompanije koji donosi strateške odluke i rješava skupe operativne probleme pomoću Shape9 sistema: Mode, Pulse, Atlas, Libra i Vesta. Rječnik pitanja prilagođen je srednjoškolcima, studentima i posjetiocima bez poslovnog predznanja.", italic=True, size=24, color="334155", space_after=300))

    # Section 1: Intro Briefing for 5 Solutions
    body.append(build_p("1. Uvodni briefing prije početka igre (Za takmičare i prezentere)", bold=True, size=32, color="010D13", space_before=240, space_after=120))
    body.append(build_p("Prije nego što započne kviz, takmičar na ekranu (ili od strane voditelja) dobija kratak uvod od jedne do dvije jasne rečenice za svako od 5 Shape9 softverskih rješenja:", size=22, space_after=120))

    prod_table = [
        ["Rješenje (Brend boja)", "Čemu služi (1–2 jednostavne rečenice razumljive mladima)"],
        ["Mode (#FF6170 · Koraljna)", "Softver za modne radnje i butike. Povezuje kase, zalihe i brzu poštu u realnom vremenu tako da radnik na kasi u sekundi vidi ima li tražena veličina dukserice ili jakne u bilo kojoj radnji."],
        ["Pulse (#A98CFF · Ljubičasta)", "Sistem koji automatski preslušava i analizira 100% obavljenih poziva u korisničkoj podršci. Odmah javlja ako je agent rekao pogrešnu cijenu ili prekršio pravilo razgovora."],
        ["Atlas (#FFA658 · Narandžasta)", "Pametni sistem za velika skladišta (WMS). Vodi radnike skenerom tačno do prave police i provjerava svaki artikal prije slanja, kako kupac nikada ne bi dobio pogrešan proizvod."],
        ["Libra (#3DD68C · Zelena)", "Digitalni asistent za ulazne račune i dokumente. Sam prepoznaje tekst i brojeve sa fotografija računa slikanih mobitelom i PDF faktura, bez dosadnog ručnog prekucavanja."],
        ["Vesta (#588DFA · Tehnološko plava)", "Registar cjelokupne opreme i imovine firme. U svakom trenutku tačno zna ko duži koji radni laptop, telefon, službeno vozilo ili mašinu i gdje se oprema nalazi."],
    ]
    body.append(build_table(prod_table[0], prod_table[1:], [2600, 7000]))

    # Section 2: Game Rules and Hint System
    body.append(build_p("2. Pravila igre i sistem pomoći (Hint mehanika)", bold=True, size=32, color="010D13", space_before=240, space_after=120))
    body.append(build_p("• Uloga takmičara: Takmičar je CEO / vlasnik kompanije kroz svih 10 pitanja.", bold=True, size=22, space_after=60))
    body.append(build_p("• Značenje naziva nivoa: Junior, Medior, Senior i CEO označavaju isključivo TEŽINU PITANJA, a ne nečiji staž.", size=22, space_after=60))
    body.append(build_p("• Pomoć uz odgovor (Hint): Dostupna je ISKLJUČIVO u Junior sekciji (pitanja 1, 2 i 3). Takmičar može kliknuti 'Zatraži pomoć' kako bi dobio usmjerenje. Od 4. pitanja (Medior, Senior, CEO) pomoć je trajno zaključana jer pravi direktor na ozbiljnim izazovima odlučuje samostalno.", size=22, space_after=120))

    body.append(build_p("Dvije distinkcije koje voditelj naglašava naglas:", bold=True, size=24, color="010D13", space_before=140, space_after=80))
    body.append(build_p("1. Atlas vs Vesta: Atlas prati robu koja prolazi KROZ firmu (zalihe za prodaju). Vesta prati opremu koju firma POSJEDUJE i koristi (laptopi, vozila, radni alati).", size=22, space_after=60))
    body.append(build_p("2. Switch-on vs Roll-out: Pulse i Libra se uključuju na postojeće podatke. Atlas, Mode i Vesta se uvode na terenu označavanjem barkodovima i policama.", size=22, space_after=240))

    # Section 3: 10 Questions
    body.append(build_p("3. Cjelokupan set od 10 pitanja iz CEO perspektive (Jasno za učenike i studente)", bold=True, size=32, color="010D13", space_before=240, space_after=140))

    # Q1
    body.append(build_question_box(
        "1", "Junior težina (Očigledan operativni propust)",
        "Vlasnik ste firme čiji agenti u korisničkoj podršci svaki dan obave 1.000 poziva s kupcima. Vaša šefica podrške vam kaže: „Preslušala sam 15 poziva, sve je super!”, dok vam nezadovoljni kupci na društvenim mrežama pišu da im podrška daje netačne informacije. Koji sistem vam treba da biste automatski znali šta je rečeno u svakom pozivu?",
        ["A. Pulse: automatska provjera svakog obavljenog poziva", "B. Atlas: praćenje kretanja kroz skladište", "C. Libra: automatsko sortiranje ulaznih računa", "D. Vesta: evidencija ko duži koji laptop"],
        "A", "15 nasumično preslušanih poziva od 1.000 nije kontrola kvaliteta nego puko nagađanje. Niko ne bi trebao voditi firmu na pretpostavkama.",
        hint="Treba vam softver koji umjesto čovjeka može preslušati hiljade audio razgovora i odmah prijaviti greške.",
        product_color="A98CFF"
    ))

    # Q2
    body.append(build_question_box(
        "2", "Junior težina (Očigledan operativni propust)",
        "Vlasnik ste modnog brenda s tri butika u gradu. Kupac ulazi u radnju i traži crnu jaknu u veličini L. Radnik ne zna ima li te veličine u vašem drugom butiku, pa troši 15 minuta zovući kolegicu telefonom dok kupac nervozno čeka, izgubi strpljenje i ode bez kupovine. Koji softver rješava ovaj problem u sekundi?",
        ["A. Vesta: registar klupskog namještaja i opreme", "B. Libra: sanduče za skenirane račune", "C. Mode: prikaz zaliha po radnjama i veličinama u realnom vremenu", "D. Atlas: slaganje visokih paleta u skladištu"],
        "C", "Kupac ne želi čekati telefonske pozive između radnji. Prodaja u butiku se dobija ili gubi u prvih trideset sekundi na kasi.",
        hint="Tražite rješenje specijalizovano za butike koje na samoj kasi odmah prikazuje stanje zaliha u svim radnjama.",
        product_color="FF6170"
    ))

    # Q3
    body.append(build_question_box(
        "3", "Junior težina (Očigledan operativni propust)",
        "Direktor ste firme i primjećujete da vaša asistentica prva četiri radna dana u mjesecu samo otvara mailove, skida stotine računa i slika s mobitela, ručno im mijenja imena i slaže ih po folderima. Posao kasni jer se troši vrijeme na dosadno prepisivanje. Koji vam softver treba?",
        ["A. Mode: kase i prodaja u butiku", "B. Libra: automatsko prepoznavanje i raspoređivanje dokumenata", "C. Pulse: kontrola telefonskih poziva", "D. Atlas: barkod naljepnice za police"],
        "B", "Niko nije zaposlen da bi trećinu radnog vremena proveo preimenujući PDF fajlove i raspoređujući ih po folderima.",
        hint="Traži se sistem koji sam 'pročita' poslani račun ili sliku i automatski ga arhivira na pravo mjesto.",
        product_color="3DD68C"
    ))

    # Q4
    body.append(build_question_box(
        "4", "Medior težina (Srednja složenost / Međutimske frikcije)",
        "Kao direktor odobravate kupovinu tri nova skupa laptopa za novozaposlene radnike, jer se niko u firmi ne može sjetiti kod koga su završili računari kupljeni prije pola godine, a papirni spiskovi su odavno izgubljeni. Koji softver sprečava ovo bacanje novca?",
        ["A. Mode: prodaja i lojalnost kupaca", "B. Atlas: slaganje paketa u skladištu", "C. Libra: digitalna arhiva dokumenata", "D. Vesta: evidencija opreme i zaduženja po svakom radniku"],
        "D", "Najskuplja oprema je ona koju ponovo kupujete samo zato što niko nije zapisao ko ju je zadužio.",
        hint=None,
        product_color="588DFA"
    ))

    # Q5
    body.append(build_question_box(
        "5", "Medior težina (Srednja složenost / Međutimske frikcije)",
        "Direktor ste online trgovine i suočavate se s lavinom reklamacija: kupci vam ljutito vraćaju pakete jer su umjesto naručenih bežičnih slušalica dobili obične sa kablom. Skladištari priznaju da su kutije sa sličnim šiframa bile pomiješane na istim policama i da su ih uzimali napamet. Šta uvodi red u skladište?",
        ["A. Atlas: obavezno skeniranje barkoda na polici prije pakovanja", "B. Pulse: analiza razgovora s kupcima", "C. Mode: maloprodajne kase", "D. Vesta: spisak kancelarijskih stolica i kompjutera"],
        "A", "Atlas skenerom na polici provjeri kutiju prije nego što izađe iz skladišta. Povrat pogrešnog paketa je najskuplji transport u trgovini.",
        hint=None,
        product_color="FFA658"
    ))

    # Q6
    body.append(build_question_box(
        "6", "Medior težina (Srednja složenost / Međutimske frikcije)",
        "Vlasnik ste butika i uveli ste slanje odjeće brzom poštom na kućnu adresu. Na kraju mjeseca vidite da se čak 15% paketa vratilo neuručeno, jer radnici u radnji rukom prepisuju adrese kupaca s Instagrama na papire brze pošte pa prave slovne greške. Šta rješava ovaj problem?",
        ["A. Libra: prijem ulaznih računa", "B. Mode: slanje podataka kupca kurirskoj službi jednim klikom sa kase", "C. Atlas: prijem sirovina za fabriku", "D. Pulse: preslušavanje poziva"],
        "B", "Pogrešno prepisana adresa znači paket koji se vratio i dvostruki trošak dostave. Povezivanje kase i kurira u jednom kliku to potpuno ukida.",
        hint=None,
        product_color="FF6170"
    ))

    # Q7
    body.append(build_question_box(
        "7", "Senior težina (Visoki ulozi / Pravni i revizorski rizik)",
        "Na vaš sto generalnog direktora stiže pismo advokata od klijenta koji prijeti tužbom, tvrdeći da mu je vaš agent preko telefona obećao besplatnu uslugu i 50% popusta. Advokat traži tačan snimak razgovora, a vaš IT tim kaže da u arhivi ima 20.000 snimaka i da bi im trebali mjeseci da to ručno preslušaju. Šta vam treba?",
        ["A. Atlas", "B. Vesta", "C. Pulse", "D. Libra"],
        "C", "Audio snimci bez mogućnosti automatske pretrage i analize nisu arhiva nego pravna tempirana bomba. Pulse pronađe tačnu rečenicu za par sekundi.",
        hint=None,
        product_color="A98CFF"
    ))

    # Q8
    body.append(build_question_box(
        "8", "Senior težina (Visoki ulozi / Pravni i revizorski rizik)",
        "Vodite grupu od nekoliko povezanih firmi. Dolazi porezna inspekcija i traži tačan spisak svih službenih automobila, laptopa i industrijskih mašina: gdje se tačno nalaze, ko ih vozi i kolika im je trenutna vrijednost. Direktori vam donose tri različite Excel tabele koje se uopšte ne slažu. Koji vam sistem treba?",
        ["A. Vesta", "B. Atlas", "C. Mode", "D. Pulse"],
        "A", "Atlas prati robu koja se prodaje kupcima, ali Vesta štiti i prati imovinu koju firma posjeduje i na koga se ona vodi u poslovnim knjigama.",
        hint=None,
        product_color="588DFA"
    ))

    # Q9
    body.append(build_question_box(
        "9", "Senior težina (Visoki ulozi / Pravni i revizorski rizik)",
        "Kao CEO planirate veliku novu nabavku, ali finansijski direktor i šef skladišta imaju ogromnu razliku od 300.000 KM u procjeni trenutnih zaliha. Na papiru piše jedno, a skladištari tvrde da police ne odgovaraju tom stanju. Zbog ovog haosa ne znate stvarno stanje firme. Šta uvodi potpunu tačnost zaliha?",
        ["A. Mode", "B. Libra", "C. Pulse", "D. Atlas"],
        "D", "Naš klijent sa 12 skladišta podigao je tačnost zaliha sa 81% na 99,4% za samo šest sedmica, jer Atlas prati svako fizičko pomjeranje kutije i palete.",
        hint=None,
        product_color="FFA658"
    ))

    # Q10
    body.append(build_question_box(
        "10", "CEO težina (Kompanijska kriza / Strateški opstanak)",
        "Vodite računovodstvenu firmu sa 100 klijenata. Zadnji je dan u mjesecu za predaju poreza, a klijenti vam odjednom pošalju na stotine slika računa sa pumpi, prodavnica i kafića. Vaš tim radi cijelu noć premoren prepisujući iznose sa slika, greške se gomilaju, a klijenti prijete odlaskom zbog mogućih kazni inspekcije. Koji sistem spašava firmu od ovog haosa?",
        ["A. Mode", "B. Libra", "C. Atlas", "D. Pulse"],
        "B", "Kada klijenti pošalju račun slikan mobitelom, a Libra sama prepozna iznose i pridruži ih njihovom folderu, kraj mjeseca prestaje biti noćna mora.",
        hint=None,
        product_color="3DD68C"
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

    filename = "Ko_Zeli_Biti_CEO_Specifikacija.docx"
    with zipfile.ZipFile(filename, 'w', zipfile.ZIP_DEFLATED) as zf:
        zf.writestr('[Content_Types].xml', content_types)
        zf.writestr('_rels/.rels', rels)
        zf.writestr('word/_rels/document.xml.rels', doc_rels)
        zf.writestr('word/styles.xml', styles)
        zf.writestr('word/document.xml', doc_xml)
    print(f"Generated {filename}")

if __name__ == "__main__":
    generate_ceo_docx()
