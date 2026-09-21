# Shape9 Pulse · Specifikacija za izradu mini-igre (QA Simulator)
*Verzija: 1.0 · Datum: 2026-09-21 · Događaj: Programerska konferencija Travnik (Oktobar)*  
*Namjena: Uputstvo za razvojni tim i produkciju zvuka*

---

## 1. Pregled i cilj na štandu

Na programerskoj konferenciji u Travniku, Shape9 nastupa sa interaktivnim štandom. Cilj ove igre je privući mlade programere (srednjoškolce i studente), ali i njihove roditelje koji su često vlasnici malih, srednjih ili velikih biznisa (trgovine, distribucija, proizvodnja, usluge).

### Ključna poruka igre (Shape9 WHY)
> **„Vaša kompanija ne treba poslovati na pretpostavkama.”**

Posjetilac stavlja profesionalne over-ear slušalice, preuzima ulogu QA kontrolora u call centru i sluša 60 sekundi stvarnog razgovora. Tokom poziva na ekranu ima 3 taba sa podacima iz baze. Njegov zadatak je otkriti da li je agent radio po pravilima.

Kada poziv završi, posjetilac odgovara na 6 jednostavnih pitanja (`Da` / `Ne` / `Ne znam`).  
Na kraju dobija poređenje: **njegov ulov (prosjek 2 od 6) naspram Pulse tačnosti (100 / 100).**  
Igra dokazuje da čovjek zbog rasipanja pažnje i prebacivanja tabova ne može u realnom vremenu porediti govor sa bazom podataka, dok Pulse to radi na 100% poziva u djeliću sekunde.

---

## 2. Shape9 Brand & Design pravila (Strogi standardi)

Aplikacija **ne smije** izgledati kao generički dark-mode šablon, niti smije imati neonske gejming efekte. Shape9 dizajn se oslanja na estetiku mjernih instrumenata: mirne tamne površine, precizne tanke linije (hairline borders) i monospaced tipografiju za sve brojeve i očitanja.

### 2.1 Paleta boja (Službeni Shape9 OKLCH sistem)

Izvor: `src/index.css` (baza: OKLCH Hue 224.5 izveden iz primarne boje brenda `#659BB0`).

| Token | Vrijednost | Uloga u aplikaciji |
|---|---|---|
| `--ground` | `#010D13` | Glavna pozadina aplikacije (najdublja tamna površina) |
| `--panel` | `#061A21` | Kartice, kontejneri ekrana, pozadina modula |
| `--panel-raise` | `#122A33` | Podignuti paneli, aktivni tabovi, hover stanja |
| `--pulse` | `#A98CFF` | Službena Pulse ljubičasta, akcent za bitna očitanja |
| `--pulse-deep` | `#6D3BF0` | Pritisnuta stanja i jači kontrast ljubičaste |
| `--pulse-glow` | `rgba(169, 140, 255, 0.12)` | Diskretan glow na ključnim tačkama (umjeren) |
| `--ink` | `#F2F5F7` | Glavni naslovi i primarni tekst (visoki kontrast) |
| `--ink-dim` | `#C2C9D3` | Sekundarni naslovi i naglašeni detalji |
| `--body` | `#98A1AE` | Opisni tekst, pitanja, uputstva |
| `--muted` | `#808997` | Oznake, labele, fusnote, neaktivna stanja |
| `--danger` | `#F87171` | Crvena za propuste, greške i `Ne` opciju |
| `--danger-bg` | `rgba(248, 113, 113, 0.12)` | Pozadina upozorenja |
| `--success` | `#3DD68C` | Zelena za potvrde i `Da` opciju |
| `--success-bg` | `rgba(61, 214, 140, 0.12)` | Pozadina potvrđenih stavki |
| `--line` | `rgba(255, 255, 255, 0.12)` | Standardne linije i ivice kartica |
| `--line-subtle` | `rgba(255, 255, 255, 0.06)` | Unutrašnje suptilne razdijelne linije |

### 2.2 Tipografija

- **Glavni font (Inter):** Koristi se za sve naslove, pitanja, opise i navigaciju.  
  - Naslovi: `Inter 700` ili `800`, sa blagim negativnim proredom (`letter-spacing: -0.02em` do `-0.03em`).
  - Tekst: `Inter 400` i `500`.
- **Instrument font (JetBrains Mono):** **Obavezno** za sve brojeve, tajmere, šifre, iznose u KM, adrese, procente i tehničke oznake. U Shape9 dizajnu svako očitanje mora izgledati kao očitanje na instrumentu.

### 2.3 Kućna pravila pisanja (Copywriting)

1. **Obavezno persiranje:** Riječi *Vi*, *Vaš*, *Vam* pišu se uvijek velikim početnim slovom kada se obraća posjetiocu ili kupcu.
2. **Bez crtica u tekstu:** Nikada ne koristiti crtice (`-`) u marketinškim i operativnim rečenicama. Koristiti zareze, tačke ili dvotačke.
3. **Bez industrijskog žargona:** Ne spominjati apstraktne fraze ("AI sinergija", "revolucionarna platforma"). Govoriti jezikom problema: *propušten poziv, pogrešna adresa, manjak u naplati, izgubljeni kupac*.
4. **Kratke rečenice:** Jezik mora biti prirodan, jasan i direktan.

---

## 3. Audio produkcija i scenarij

### 3.1 Smjernice za snimanje
- **Glasovi:** Dva člana tima (muški i ženski glas).
- **Jasmin (Agent):** Zvuči ljubazno, sigurno i brzo, tačno onako kako govore iskusni agenti u korisničkoj podršci. Propusti se ne smiju naglašavati teatralno: Jasmin zvuči kao da radi svoj posao rutinski.
- **Lejla (Kupac):** Normalan ton, javlja se usput, prekida agenta jer je u žurbi.
- **Trajanje:** 55 do 60 sekundi.
- **Efekat:** Na master audio dodati blagi telefonski filter (bandpass 300Hz–3400Hz) za glas kupca kako bi zvučalo kao stvaran dolazni poziv.

### 3.2 Tačan tekst razgovora (sa režijskim napomenama)

```text
[0:00 - 0:04]
AGENT: Dobar dan, modni studio "Aura", Jasmin pri telefonu. Jesam li dobio gospođu Lejlu Hodžić?
KUPAC: Dobar dan Jasmine, jeste, recite?
(❌ PROPUST 1: Nema zakonske najave snimanja poziva)

[0:05 - 0:14]
AGENT: Zovem samo za kratku potvrdu narudžbe... zimska jakna "Nordic", teget plava, veličina M.
KUPAC: (Upada u riječ) Joj jeste, super! Samo mi recite pošto je na kraju tačno, zaboravila sam koliko je pisalo na stranici sa popustom?

[0:15 - 0:24]
AGENT: Sa uračunatim popustom i dostavom to Vam dođe tačno 89 maraka, plaćate kuriru pri preuzimanju.
KUPAC: E odlično, super, odgovara.
(❌ PROPUST 2: U bazi stoji 129,00 KM, agent izgovara 89 KM)

[0:25 - 0:34]
KUPAC: A recite mi kad otprilike stiže? Na putu sam od petka pa da znam hoće li prije stići?
AGENT: Ma nema brige, javit će se Vama kurir na ovaj broj prije nego krene na adresu.
(❌ PROPUST 3: Nije naveo propisani rok od 2 do 4 radna dana)

[0:35 - 0:44]
KUPAC: Važi. I dajte molim Vas samo zabilježite tamo da mi više ne šaljete one promotivne poruke na Viber, stalno mi telefon zvoni na sastancima.
AGENT: Naravno, sve u redu, zabilježeno.
(❌ PROPUST 4: Zahtjev za odjavu sa Vibera nije formalno unesen u registar)

[0:45 - 0:56]
AGENT: I samo još da potvrdimo lokaciju: šaljemo na Maršala Tita broj 11, Sarajevo?
KUPAC: Tako je, stan 4.
AGENT: Dogovoreno. Hvala Vam puno na kupovini i ugodan dan!
KUPAC: Hvala Vam, prijatno.
(❌ PROPUST 5: U bazi stoji broj 1, agent izgovara 11)
(✔ POTVRĐENO: Artikal i kupac su tačno identifikovani)

[0:57 - 0:59]
(Zvuk spuštanja slušalice / kratak bip centrale)
```

---

## 4. Arhitektura ekrana i korisničko iskustvo

Aplikacija radi kao kiosk aplikacija na tabletu (npr. iPad ili Microsoft Surface) ili monitoru sa touch-screenom na štandu.

### Ekran 1: Početni ekran (Standby / Attract Loop)
- **Naslov:** `Možeš li zamijeniti AI kontrolora kvaliteta?`
- **Uputstvo:** *Stavite slušalice. Tokom poziva na raspolaganju imate 3 taba iz sistema sa podacima. Poslušajte kratak razgovor agenta sa kupcem i provjerite da li je sve urađeno tačno po bazi.*
- **Dugme:** `[ STAVITE SLUŠALICE I ZAPOČNITE ]`

### Ekran 2: Pregled poziva i tabovi (Trajanje: ~58s)
- **Lijeva polovina (Sistem / Baza podataka):**
  - Tri brza taba na vrhu:
    1. `[ 📋 PRAVILA ]`
    2. `[ 📍 ADRESA ]`
    3. `[ 💳 FINANSIJE ]`
  - **Pravilo interakcije:** Klikom na jedan tab, ostala dva se sakrivaju. Posjetilac mora sam birati šta provjerava dok poziv traje.
  - Sadržaj tabova:
    - *Tab 1 (Pravila):*  
      - Najava snimanja: Obavezna na samom početku.  
      - Rok isporuke: Obavezno navesti **2 do 4 radna dana**.  
      - Odjava sa poruka: Zahtjev za prestanak slanja Viber poruka mora se zabilježiti u registar.
    - *Tab 2 (Adresa):*  
      - Kupac: Lejla Hodžić  
      - Telefon: +387 61 234 567  
      - Adresa u bazi: **Maršala Tita broj 1, Sarajevo (Stan 4)**
    - *Tab 3 (Finansije):*  
      - Artikal: Zimska jakna Nordic (Teget plava, veličina M)  
      - Plaćanje: Pouzećem (gotovinom kuriru)  
      - Iznos za naplatu u bazi: **129,00 KM** *(uračunata dostava)*
- **Desna polovina (Audio Player):**
  - Oznaka: `Poziv #4418 · Audio zapis`
  - Status: Crvena tačka i tekst `U TOKU`
  - Audio waveform (vizualizacija govora)
  - Monospace tajmer: `00:00 / 00:58`
  - Obavijest na dnu panela:  
    *🎧 Slušajte pažljivo i provjeravajte tabove. Ocjenjivanje poziva slijedi odmah po završetku.*
  - **Važno:** Tokom samog poziva nema dugmadi za prijavu grešaka. Posjetilac samo sluša i pretražuje tabove.

### Ekran 3: Ocjenjivanje poziva (Upitnik)
Nakon što audio istekne, sistem automatski prelazi na upitnik sa 6 pitanja.  
Svako pitanje ima tačno 3 opcije: `Da`, `Ne`, `Ne znam`.

| # | Pitanje | Tačan odgovor | Objašnjenje |
|---|---|:---:|---|
| **1** | Da li je agent na početku najavio da se poziv snima? | **Ne** | Preskočio zakonsku napomenu |
| **2** | Da li je artikal i veličina tačno potvrđena? | **Da** | Teget plava jakna Nordic, M |
| **3** | Da li je agent izgovorio tačan iznos za plaćanje iz baze? | **Ne** | Rekao 89 KM, a u bazi piše 129 KM |
| **4** | Da li je agent naveo tačan rok isporuke (2 do 4 radna dana)? | **Ne** | Rekao samo 'javiće se kurir' |
| **5** | Da li je propisno evidentiran zahtjev za odjavu sa Viber poruka? | **Ne** | Samo rekao 'važi', bez unosa |
| **6** | Da li je agent potvrdio tačnu adresu kupca iz baze? | **Ne** | Rekao broj 11, a u bazi stoji broj 1 |

Na dnu ekrana: Dugme `[ UPOREDI SA PULSE NALAZOM → ]`.

### Ekran 4: Rezultati i Shape9 prodajni zaključak
Zaglavlje prikazuje dva rezultata:
- **Tvoj rezultat:** Npr. `2 / 6` tačnih.
- **Pulse Tačnost:** **`100 / 100`** *(Jasno istaknuto u Pulse ljubičastoj boji).*

Sadržaj rezultata podijeljen je u dvije jasne cjeline:

1. **Zeleni blok (Šta ste tačno procijenili):**
   - Pohvali korisnika za stavke koje je uočio (npr. zaboravljena najava snimanja ili tačan model jakne).
2. **Ljubičasti blok (Šta Vam je promaklo dok ste prebacivali tabove i slušali):**
   - **Iznos za naplatu:** Agent je izgovorio **89 KM**, a u bazi stoji **129 KM**. Direktna finansijska šteta: **40 KM**.
   - **Adresa isporuke:** Agent je rekao **Maršala Tita 11**, a u bazi stoji **Maršala Tita 1**. Paket odlazi na pogrešnu zgradu.
   - **Rok isporuke:** Nije naveden rok od 2 do 4 radna dana.
   - **Zahtjev za odjavu:** Nije evidentirana deregistracija sa liste za poruke.
3. **CTA za vlasnike kompanija na dnu ekrana:**  
   *„Za vlasnike kompanija: Testirajte Pulse na 50 Vaših stvarnih poziva besplatno na **shape9.agency/pulse**”*  
   Uz dugme `[ Ponovi igru ↺ ]`.

---

## 5. Tehnički zahtjevi za programera

### 5.1 Tehnologija i pokretanje
- **Stack:** React + Vite + Tailwind CSS ili samostalni HTML5/JS fajl.
- **Offline rad:** Aplikacija mora raditi **100% offline**, bez interneta. Audio fajl (`call_4418.mp3`) mora biti upakovan lokalno u `public/audio/`.
- **Ekran / Rezolucija:** Prilagođeno za Full HD (1920x1080) i tablete (iPad 10.2" / 11", rezolucije 4:3 i 16:9).
- **Auto-reset tajmer:** Ako na ekranu rezultata ili upitnika niko ne dodirne ekran duže od **45 sekundi**, aplikacija se automatski vraća na Ekran 1 (Početni ekran).

### 5.2 Struktura podataka (`data.json`)

```json
{
  "call": {
    "id": "call_4418",
    "audioFile": "/audio/call_4418.mp3",
    "durationSeconds": 58,
    "title": "Poziv #4418 · Potvrda narudžbe",
    "agent": "Jasmin",
    "customer": "Lejla Hodžić"
  },
  "crmData": {
    "rules": [
      {
        "id": "rule_recording",
        "title": "Najava snimanja",
        "instruction": "Agent mora na početku naglasiti da se poziv snima."
      },
      {
        "id": "rule_delivery_time",
        "title": "Rok isporuke",
        "instruction": "Obavezno komunicirati rok: 2 do 4 radna dana."
      },
      {
        "id": "rule_opt_out",
        "title": "Zahtjev za odjavu sa poruka",
        "instruction": "Zahtjev za prestanak Viber poruka mora se unijeti u registar."
      }
    ],
    "address": {
      "customer": "Lejla Hodžić",
      "phone": "+387 61 234 567",
      "street": "Maršala Tita broj 1",
      "city": "Sarajevo",
      "apartment": "Stan 4"
    },
    "finance": {
      "item": "Zimska jakna Nordic (Teget plava, M)",
      "paymentMethod": "Pouzećem (kuriru pri dostavi)",
      "totalAmount": "129,00 KM",
      "taxAndDelivery": "Uračunata dostava i PDV"
    }
  },
  "questions": [
    {
      "id": "q1",
      "text": "1. Da li je agent na početku najavio da se poziv snima?",
      "correctAnswer": "ne",
      "field": "recording"
    },
    {
      "id": "q2",
      "text": "2. Da li je artikal i veličina tačno potvrđena?",
      "correctAnswer": "da",
      "field": "item"
    },
    {
      "id": "q3",
      "text": "3. Da li je agent izgovorio tačan iznos za plaćanje iz baze?",
      "correctAnswer": "ne",
      "field": "amount",
      "spokenValue": "89 KM",
      "systemValue": "129 KM"
    },
    {
      "id": "q4",
      "text": "4. Da li je agent naveo tačan rok isporuke (2 do 4 radna dana)?",
      "correctAnswer": "ne",
      "field": "delivery_time"
    },
    {
      "id": "q5",
      "text": "5. Da li je propisno evidentiran zahtjev za odjavu sa Viber poruka?",
      "correctAnswer": "ne",
      "field": "opt_out"
    },
    {
      "id": "q6",
      "text": "6. Da li je agent potvrdio tačnu adresu kupca iz baze?",
      "correctAnswer": "ne",
      "field": "address",
      "spokenValue": "Maršala Tita 11",
      "systemValue": "Maršala Tita 1"
    }
  ]
}
```

---

## 6. Radni prototip

Verifikovan, funkcionalan prototip aplikacije nalazi se u repozitoriju:  
📁 [`public/pulse-game.html`](file:///Users/farishandzar/antigravity/Shape9-%E2%80%94-Software-Product-House/public/pulse-game.html)

Programer može otvoriti taj fajl u bilo kojem pregledniku kao referentnu tačku za funkcionalnost tabova, tajmera i ekrana rezultata.
