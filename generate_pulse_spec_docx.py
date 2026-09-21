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

def build_callout(speaker, speech, error_tag, error_detail, bg="FFF5F5", border_color="F87171"):
    # Builds a callout box for dialogue
    p1 = f'''<w:p>
      <w:pPr>
        <w:pBdr>
          <w:left w:val="single" w:sz="24" w:space="12" w:color="{border_color}"/>
        </w:pBdr>
        <w:shd w:val="clear" w:color="auto" w:fill="{bg}"/>
        <w:spacing w:before="120" w:after="40"/>
      </w:pPr>
      {build_run(speaker + ": ", bold=True, size=22, color="010D13")}
      {build_run(speech, italic=True, size=22, color="1E293B")}
    </w:p>'''
    
    p2 = f'''<w:p>
      <w:pPr>
        <w:pBdr>
          <w:left w:val="single" w:sz="24" w:space="12" w:color="{border_color}"/>
        </w:pBdr>
        <w:shd w:val="clear" w:color="auto" w:fill="{bg}"/>
        <w:spacing w:before="0" w:after="160"/>
      </w:pPr>
      {build_run("❌ PROPUST: ", bold=True, size=20, color="E11D48")}
      {build_run(error_tag + " — ", bold=True, size=20, color="010D13")}
      {build_run(error_detail, size=20, color="475569")}
    </w:p>'''
    return p1 + p2

def build_dialogue(speaker, speech):
    return f'''<w:p>
      <w:pPr>
        <w:spacing w:before="60" w:after="60"/>
      </w:pPr>
      {build_run(speaker + ": ", bold=True, size=22, color="010D13")}
      {build_run(speech, size=22, color="334155")}
    </w:p>'''

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

def generate_document():
    body_elements = []

    # Title & Metadata
    body_elements.append(build_p("Shape9 Pulse · Specifikacija mini-igre", bold=True, size=48, color="6D3BF0", space_after=60))
    body_elements.append(build_p("QA SIMULATOR · KONFERENCIJA TRAVNIK (OKTOBAR)", bold=True, size=22, font="JetBrains Mono", color="64748B", space_after=180))
    body_elements.append(build_p("Sveobuhvatno uputstvo za razvojni tim, dizajnere i audio produkciju", italic=True, size=24, color="334155", space_after=300))

    # Section 1
    body_elements.append(build_p("1. Pregled koncepta i cilj na štandu", bold=True, size=32, color="010D13", space_before=300, space_after=120))
    body_elements.append(build_p("Na programerskoj konferenciji u Travniku Shape9 nastupa sa interaktivnim štandom. Cilj je privući mlade programere i studente, ali i njihove roditelje koji su vlasnici biznisa (trgovine, distribucija, proizvodnja, usluge).", size=22, space_after=120))
    body_elements.append(build_p("Glavna poruka štanda: „Vaša kompanija ne treba poslovati na pretpostavkama.”", bold=True, size=22, color="6D3BF0", space_after=160))
    body_elements.append(build_p("Posjetilac stavlja profesionalne over-ear slušalice, preuzima ulogu QA kontrolora u call centru i sluša 60 sekundi stvarnog razgovora. Na ekranu ima pristup 3 taba iz sistema (Pravila, Adresa, Finansije). Nakon poziva odgovara na 6 jednostavnih pitanja (Da / Ne / Ne znam). Na kraju vidi poređenje: njegov parcijalni ulov (npr. 2 od 6) naspram Pulse tačnosti od 100/100, koja u milisekundi poredi svaku riječ sa bazom podataka.", size=22, space_after=240))

    # Section 2: Brand Rules
    body_elements.append(build_p("2. Shape9 Brand & Design pravila (Službeni standard)", bold=True, size=32, color="010D13", space_before=240, space_after=120))
    body_elements.append(build_p("Dizajn se oslanja na estetiku preciznih mjernih instrumenata: mirne, duboke površine, tanke linije (hairlines) i monospace tipografiju za sve brojeve i očitanja. Zabranjeni su generički dark-mode šabloni i blještavi gejmerski neoni.", size=22, space_after=160))

    brand_tokens = [
        ["Token", "HEX / Vrijednost", "Uloga u aplikaciji"],
        ["--ground", "#010D13", "Glavna pozadina ekrana (najdublja tamna površina)"],
        ["--panel", "#061A21", "Pozadina kontejnera, kartica i ekrana"],
        ["--panel-raise", "#122A33", "Aktivni tabovi, podignuti elementi, hover stanja"],
        ["--pulse", "#A98CFF", "Službena Pulse ljubičasta, akcent za ključna očitanja"],
        ["--pulse-deep", "#6D3BF0", "Pritisnuta stanja i jači kontrast ljubičaste"],
        ["--ink", "#F2F5F7", "Primarni tekst i glavni naslovi"],
        ["--body", "#98A1AE", "Opisni tekst, pitanja i uputstva"],
        ["--muted", "#808997", "Oznake, fusnote, neaktivna stanja"],
        ["--danger", "#F87171", "Greške, propusti i crvena 'Ne' opcija"],
        ["--success", "#3DD68C", "Potvrđene stavke i zelena 'Da' opcija"],
        ["--line", "rgba(255,255,255,0.12)", "Tanke granične linije (hairline borders)"],
    ]
    body_elements.append(build_table(brand_tokens[0], brand_tokens[1:], [2400, 2600, 4600]))

    body_elements.append(build_p("Kućna pravila komunikacije:", bold=True, size=24, color="010D13", space_before=160, space_after=80))
    body_elements.append(build_p("• Vi, Vaš, Vam se UVIJEK pišu velikim početnim slovom pri obraćanju posjetiocu ili kupcu.", size=22, space_after=60))
    body_elements.append(build_p("• NEMA CRTICA (-) u rečenicama. Koristiti zareze, tačke ili dvotačke.", size=22, space_after=60))
    body_elements.append(build_p("• Svi brojevi, novčani iznosi, šifre i tajmeri obavezno se ispisuju u fontu JetBrains Mono.", size=22, space_after=180))

    # Section 3: Pulse Icons
    body_elements.append(build_p("3. Zvanične ikone sistema Pulse", bold=True, size=32, color="010D13", space_before=240, space_after=120))
    body_elements.append(build_p("Prema službenoj Shape9 Design Specifikaciji (_spec.html / card 21), za Pulse se koristi definisan set od 6 ikona koje predstavljaju njegove funkcije:", size=22, space_after=140))

    icons_data = [
        ["Ikona", "Naziv funkcije u specifikaciji", "Značenje i primjena u igri"],
        ["PhoneCall / Phone", "Telefonski poziv & Centrala", "Prikazuje se uz audio status, vezu i dolazni poziv"],
        ["Mic", "Transkripcija govora u tekst", "Prikazuje se uz vizualizator govora i detekciju glasa"],
        ["SlidersHorizontal", "Prilagođena interna pravila", "Prikazuje se na tabu Pravila i u upitniku"],
        ["FileText", "Izvještaj o svakom pozivu", "Prikazuje se uz karton narudžbe i završni Pulse nalaz"],
        ["ShieldCheck", "Pravna i zakonska usklađenost", "Prikazuje se uz najavu snimanja i GDPR odjavu"],
        ["BarChart3", "Analitika i QA ocjena tima", "Prikazuje se uz score badge (Tvoj ulov vs Pulse 100/100)"],
    ]
    body_elements.append(build_table(icons_data[0], icons_data[1:], [2400, 3200, 4000]))

    # Section 4: Full Call Script with Highlighted Mistakes
    body_elements.append(build_p("4. Cjeloviti scenarij poziva sa istaknutim propustima", bold=True, size=32, color="010D13", space_before=240, space_after=120))
    body_elements.append(build_p("Uloge: Jasmin (Agent, govori tečno i profesionalno) i Lejla (Kupac, užurbana). Trajanje: 55–60 sekundi. Svaki propust je označen crvenim okvirom, sa objašnjenjem zašto je nastao i koliku štetu stvara firmi.", size=22, space_after=180))

    # Dialogue item 1 (Missed Recording)
    body_elements.append(build_callout(
        "[0:00 - 0:04] AGENT",
        "Dobar dan, modni studio Aura, Jasmin pri telefonu. Jesam li dobio gospođu Lejlu Hodžić?",
        "ZAKONSKI OBAVEZNA NAJAVA SNIMANJA",
        "Agent je odmah započeo razgovor bez obavijesti: 'Poziv se snima u svrhu unapređenja usluge'. Pravni i regulatorni rizik za kompaniju."
    ))
    body_elements.append(build_dialogue("[0:05] KUPAC", "Dobar dan Jasmine, jeste, Lejla pri telefonu. Recite?"))

    # Dialogue item 2 (Item confirmed)
    body_elements.append(build_dialogue("[0:06 - 0:13] AGENT", "Zovem samo za kratku potvrdu narudžbe... zimska jakna Nordic, teget plava, veličina M."))
    body_elements.append(build_dialogue("[0:14 - 0:18] KUPAC", "(Upada u riječ) Joj jeste, super! Samo mi recite pošto je na kraju tačno, zaboravila sam koliko je pisalo na stranici sa popustom?"))

    # Dialogue item 3 (Price Mismatch)
    body_elements.append(build_callout(
        "[0:19 - 0:24] AGENT",
        "Sa uračunatim popustom i dostavom to Vam dođe tačno 89 maraka, plaćate kuriru pri preuzimanju.",
        "SISTEMSKA NEUSKLAĐENOST CIJENE (-40,00 KM)",
        "U sistemu i tabu 'Finansije' stoji 129,00 KM. Agent samouvjereno izgovara 89 KM. Kupac pristaje, a kompanija trpi direktan finansijski gubitak od 40 KM po narudžbi."
    ))
    body_elements.append(build_dialogue("[0:25 - 0:28] KUPAC", "E odlično, super, odgovara."))
    body_elements.append(build_dialogue("[0:29 - 0:34] KUPAC", "A recite mi kad otprilike stiže? Na putu sam od petka pa da znam hoće li prije stići?"))

    # Dialogue item 4 (Delivery Time Dodged)
    body_elements.append(build_callout(
        "[0:35 - 0:40] AGENT",
        "Ma nema brige, javit će se Vama kurir na ovaj broj prije nego krene na adresu.",
        "IZBJEGAVANJE PROMETNOG ROKA ISPORUKE",
        "Kupac izričito pita za termin prije petka. Pravilo nalaže saopštavanje tačnog roka od 2 do 4 radna dana. Agent daje neodređeni odgovor, stvarajući rizik neisporučenog paketa."
    ))
    body_elements.append(build_dialogue("[0:41 - 0:48] KUPAC", "Važi. I dajte molim Vas samo zabilježite tamo da mi više ne šaljete one promotivne poruke na Viber, stalno mi telefon zvoni na sastancima."))

    # Dialogue item 5 (Opt-out skipped)
    body_elements.append(build_callout(
        "[0:49 - 0:52] AGENT",
        "Naravno, sve u redu, zabilježeno.",
        "IGNORISANJE ZAHTJEVA ZA DEREGISTRACIJU",
        "Pravilo nalaže obavezan unos broja telefona u registar odjave. Agent samo verbalno prelazi preko zahtjeva bez formalne akcije, što stvara rizik od prijave inspekciji."
    ))

    # Dialogue item 6 (Address Mismatch)
    body_elements.append(build_callout(
        "[0:53 - 0:57] AGENT",
        "I samo još da potvrdimo lokaciju: šaljemo na Maršala Tita broj 11, Sarajevo?",
        "SISTEMSKA NEUSKLAĐENOST ADRESE (BROJ 11 vs 1)",
        "U sistemu i tabu 'Adresa' stoji Maršala Tita broj 1. Agent izgovara broj 11. Paket odlazi na pogrešnu zgradu, kurir ne pronalazi kupca, narudžba propada."
    ))
    body_elements.append(build_dialogue("[0:58] KUPAC", "Tako je, stan 4."))
    body_elements.append(build_dialogue("[0:59] AGENT", "Dogovoreno. Hvala Vam puno na kupovini i ugodan dan!"))
    body_elements.append(build_dialogue("[1:00] KUPAC", "Hvala Vam, prijatno."))
    body_elements.append(build_p("[1:01] (Ton spuštanja slušalice)", italic=True, size=20, color="94A3B8", space_after=240))

    # Section 5: The 3 System Tabs
    body_elements.append(build_p("5. Prikaz tabova tokom poziva (Realnost QA posla)", bold=True, size=32, color="010D13", space_before=240, space_after=120))
    body_elements.append(build_p("QA agent u stvarnosti ima pristup podacima, ali ih ne vidi sve na jednom mjestu. Dok poziv traje, igrač klikće između tri taba. Klik na jedan tab skriva ostala dva.", size=22, space_after=160))

    tab_data = [
        ["Naziv taba", "Sadržaj i polja u bazi", "Kritična vrijednost koju treba provjeriti"],
        ["📋 PRAVILA", "Pravilo 1: Najava snimanja\nPravilo 2: Rok isporuke (2–4 dana)\nPravilo 3: Registar odjave sa poruka", "Agent mora ispoštovati sve 3 interne procedure"],
        ["📍 ADRESA", "Kupac: Lejla Hodžić\nTelefon: +387 61 234 567\nUlica: Maršala Tita broj 1, Stan 4", "U bazi stoji broj 1 (agent izgovara 11)"],
        ["💳 FINANSIJE", "Artikal: Zimska jakna Nordic (M)\nPlaćanje: Pouzećem kuriru\nIznos: 129,00 KM (sa PDV-om)", "U bazi stoji 129 KM (agent izgovara 89 KM)"],
    ]
    body_elements.append(build_table(tab_data[0], tab_data[1:], [2200, 4200, 3200]))

    # Section 6: Quiz Screen
    body_elements.append(build_p("6. Upitnik za posjetioca (Da / Ne / Ne znam)", bold=True, size=32, color="010D13", space_before=240, space_after=120))
    body_elements.append(build_p("Čim poziv istekne, automatski se prikazuje 6 pitanja. Igrač klikom bira jednu od tri opcije:", size=22, space_after=160))

    q_table = [
        ["#", "Pitanje", "Tačan odgovor", "Zašto je ovaj odgovor tačan"],
        ["1", "Da li je agent na početku najavio da se poziv snima?", "Ne", "Agent je odmah počeo govoriti o narudžbi"],
        ["2", "Da li je artikal i veličina tačno potvrđena?", "Da", "Jakna Nordic, teget plava, veličina M"],
        ["3", "Da li je agent izgovorio tačan iznos za plaćanje iz baze?", "Ne", "Izgovorio 89 KM umjesto 129 KM iz baze"],
        ["4", "Da li je agent naveo tačan rok isporuke (2 do 4 dana)?", "Ne", "Rekao neodređeno 'javiće se kurir'"],
        ["5", "Da li je propisno evidentiran zahtjev za odjavu sa poruka?", "Ne", "Rekao 'važi' bez unosa u CRM registar"],
        ["6", "Da li je agent potvrdio tačnu adresu kupca iz baze?", "Ne", "Izgovorio broj 11 umjesto broj 1"],
    ]
    body_elements.append(build_table(q_table[0], q_table[1:], [600, 4200, 1600, 3200]))

    # Section 7: Reveal & Sales Angle
    body_elements.append(build_p("7. Ekran rezultata (Tvoj ulov vs Pulse 100/100)", bold=True, size=32, color="010D13", space_before=240, space_after=120))
    body_elements.append(build_p("Zaglavlje rezultata prikazuje:", size=22, space_after=80))
    body_elements.append(build_p("• Tvoj ulov: X / 6 tačnih (prosjek posjetilaca je 2 ili 3)", size=22, space_after=40))
    body_elements.append(build_p("• Pulse Tačnost: 100 / 100 (Pulse je bez greške detektovao svih 6 stavki)", bold=True, size=22, color="6D3BF0", space_after=140))
    body_elements.append(build_p("Struktura rezultata:", bold=True, size=24, color="010D13", space_after=80))
    body_elements.append(build_p("1. Zelena kartica: Pohvala za ono što je posjetilac tačno prepoznao (npr. najava i artikal).", size=22, space_after=60))
    body_elements.append(build_p("2. Ljubičasta kartica: Prikaz propusta koji su nastali jer je posjetilac gledao jedan tab dok je agent govorio o drugom (cijena od 89 KM umjesto 129 KM, adresa 11 umjesto 1).", size=22, space_after=60))
    body_elements.append(build_p("3. Završna poruka: 'Za vlasnike kompanija: Testirajte Pulse na 50 Vaših poziva besplatno na shape9.agency/pulse'.", bold=True, size=22, color="010D13", space_after=240))

    # Section 8: Tech Specs
    body_elements.append(build_p("8. Tehničke smjernice za programera", bold=True, size=32, color="010D13", space_before=240, space_after=120))
    body_elements.append(build_p("• 100% Offline rad: Aplikacija se pokreće u Chrome Kiosk modu ili kao PWA/lokalni build bez pristupa internetu.", size=22, space_after=60))
    body_elements.append(build_p("• Audio fajl: public/audio/call_4418.mp3 se učitava lokalno.", size=22, space_after=60))
    body_elements.append(build_p("• Auto-reset tajmer: 45 sekundi neaktivnosti na ekranu rezultata automatski vraća igru na početni ekran.", size=22, space_after=60))
    body_elements.append(build_p("• Referentni prototip: Radni kod sa gotovim CSS-om i logikom nalazi se u fajlu public/pulse-game.html.", size=22, space_after=240))

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
    {''.join(body_elements)}
    <w:sectPr>
      <w:pgSz w:w="11906" w:h="16838"/>
      <w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440"/>
    </w:sectPr>
  </w:body>
</w:document>'''

    filename = "Pulse_QA_Simulator_Specifikacija.docx"
    with zipfile.ZipFile(filename, 'w', zipfile.ZIP_DEFLATED) as zf:
        zf.writestr('[Content_Types].xml', content_types)
        zf.writestr('_rels/.rels', rels)
        zf.writestr('word/_rels/document.xml.rels', doc_rels)
        zf.writestr('word/styles.xml', styles)
        zf.writestr('word/document.xml', doc_xml)
    print(f"Generated {filename}")

generate_document()
