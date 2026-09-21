import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export interface ClientRef {
  id: string;
  /** File in /public/logos. Absent where no logo exists or the client is
      deliberately unnamed, and then the name carries the card instead. */
  logo?: string;
  /** Company name, used as the image alt and never rendered as a heading. */
  name: string;
  industryBs: string;
  industryEn: string;
  /** What the work looked like before. Concrete, in the client's own terms. */
  beforeBs: string;
  beforeEn: string;
  /** What changed. No adjectives, no claims about us. */
  afterBs: string;
  afterEn: string;
  /** Set where a full case study exists; adds the link at the foot. */
  caseHref?: string;
  /** The product's colour, for the case study link on that card only. */
  accent?: string;
}

interface ClientCardProps {
  client: ClientRef;
  className?: string;
  onNavigate?: (path: string) => void;
}

/**
 * A client reference, told the way the rest of this site tells everything:
 * the situation before, then what changed. No quote, no photograph, no
 * person's name.
 *
 * That is a deliberate constraint rather than a shortage of material. There
 * are four filmed testimonials with named directors on camera, and the
 * decision was to represent the companies instead of the people. A named
 * quote makes the reader weigh one person's opinion. A logo above a plain
 * before and after makes them weigh a company's situation against their own,
 * which is the comparison we actually want.
 *
 * The logos arrive in six different brand colours and most are dark artwork
 * drawn for white backgrounds, so Icarus and half of Rekontiva would be
 * invisible on this ground. They are all rendered to a single white
 * monochrome instead: it fixes the contrast, and it stops a row of client
 * marks from reading as six competing brands sitting on our page.
 */
export const ClientCard: React.FC<ClientCardProps> = ({ client, className = '', onNavigate }) => {
  // shadcn Card from the registry rather than a bare div. The registry
  // default is a card on --color-card with its own padding and gap; that is
  // overridden here to the nested-card treatment this site already uses,
  // because a client reference sits inside a section and should not compete
  // with the panels around it. Structure comes from the library, surface
  // stays Shape9.
  return (
    <Card
      className={`s9-card-nested border-0 bg-transparent p-6 gap-0 flex flex-col h-full ${className}`}
    >
      <CardHeader className="p-0 gap-0 block">
      {/* A logo where one exists. The two case study clients have none on
          file, so their name is set at the same height the mark occupies
          and the row of cards keeps one baseline. */}
      {client.logo ? (
        <img
          src={`/logos/${client.logo}`}
          alt={client.name}
          loading="lazy"
          className="client-logo h-8 w-auto self-start mb-5"
        />
      ) : (
        <div className="mb-5 flex h-8 items-center text-base font-semibold text-[var(--ink)]">
          {client.name}
        </div>
      )}

      <div className="text-xs font-mono uppercase tracking-[0.13em] text-[var(--muted)] mb-4">
        <span className="l-bs">{client.industryBs}</span>
        <span className="l-en">{client.industryEn}</span>
      </div>
      </CardHeader>

      <CardContent className="p-0 mt-auto">
      <dl className="text-sm leading-relaxed space-y-3">
        <div>
          <dt className="text-[var(--muted)] font-semibold mb-0.5">
            <span className="l-bs">Prije</span>
            <span className="l-en">Before</span>
          </dt>
          <dd className="text-[var(--body)] m-0">
            <span className="l-bs">{client.beforeBs}</span>
            <span className="l-en">{client.beforeEn}</span>
          </dd>
        </div>

        <div>
          <dt className="text-[var(--cyan)] font-semibold mb-0.5">
            <span className="l-bs">Sada</span>
            <span className="l-en">Now</span>
          </dt>
          <dd className="text-[var(--ink-dim)] m-0">
            <span className="l-bs">{client.afterBs}</span>
            <span className="l-en">{client.afterEn}</span>
          </dd>
        </div>
      </dl>

      {client.caseHref && (
        <a
          href={client.caseHref}
          onClick={(e) => {
            if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0 || !onNavigate) return;
            e.preventDefault();
            onNavigate(client.caseHref!);
          }}
          className="focus-ring mt-4 inline-flex items-center gap-1.5 rounded-sm border-t border-[var(--line)] pt-3 text-xs font-semibold hover:underline"
          style={{ color: client.accent || 'var(--cyan)' }}
        >
          <span className="l-bs">Pogledajte studiju slučaja</span>
          <span className="l-en">Read case study</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </a>
      )}
      </CardContent>
    </Card>
  );
};

/**
 * Client references. Every line here traces to something the client said on
 * camera or to Ajla, not to a description we wrote for them.
 */
export const CLIENTS: Record<string, ClientRef> = {
  empress: {
    id: 'empress',
    logo: 'empress.png',
    name: 'Empress',
    industryBs: 'Proizvodnja radne i zaštitne odjeće',
    industryEn: 'Workwear and protective textile manufacture',
    beforeBs: 'Proizvodnja na spratu, materijali u podrumu, a evidencija razbacana po tabelama i sveskama.',
    beforeEn: 'Production upstairs, materials in the basement, and the records spread across spreadsheets and notebooks.',
    afterBs: 'Skladište, radni nalozi i proizvodnja u jednom sistemu. Kasnije su na isti sistem dodani ponude, fakture i naplata.',
    afterEn: 'Warehouse, work orders and production in one system. Quotes, invoices and payments were added to the same system later.',
  },
  bhlog: {
    id: 'bhlog',
    logo: 'bhlog.png',
    name: 'BHLog Business Solutions',
    industryBs: 'Veleprodaja prehrambenih proizvoda za restorane i lance',
    industryEn: 'Food wholesale for restaurants and chains',
    beforeBs: 'Narudžbe stižu Viberom, telefonom i mailom, svaka na svoje mjesto.',
    beforeEn: 'Orders arriving by Viber, by phone and by email, each one landing somewhere different.',
    afterBs: 'Kupci naručuju kroz sistem, vide stanje zaliha i prate svoju narudžbu do isporuke.',
    afterEn: 'Customers order through the system, see stock levels and follow their own order through to delivery.',
  },

  /* The two below have a full case study on this site and no logo on file.
     Every figure here is taken from those pages, not written for this card. */
  monad: {
    id: 'monad',
    name: 'Monad Lead',
    industryBs: 'Affiliate platforma, hiljade leadova dnevno',
    industryEn: 'Affiliate platform, thousands of leads a day',
    beforeBs: 'Metrike je neko morao gledati ručno. Partner koji je tiho prestao slati i dvadeset pet dana lažnog prometa nisu se vidjeli na vrijeme.',
    beforeEn: 'Someone had to watch the metrics by hand. An affiliate that quietly stopped, and twenty five days of fake traffic, were not caught in time.',
    afterBs: 'Agent radi dvadeset četiri analitička zadatka svakog radnog dana. Deset dana pilota, nula grešaka.',
    afterEn: 'The agent runs twenty four analytical tasks every working day. Ten days of piloting, zero errors.',
    caseHref: '/radovi/monad-lead',
    accent: '#35B6F0',
  },
  wms: {
    id: 'wms',
    name: 'Organizacija u dvanaest država',
    industryBs: 'Dvanaest skladišnih centara, preko 10.000 artikala',
    industryEn: 'Twelve warehouses, more than 10.000 items',
    beforeBs: 'Tačnost zaliha 81%. Artikli koji su postojali samo na papiru i transferi između skladišta koje niko nije mogao vidjeti.',
    beforeEn: 'Stock accuracy at 81 percent. Items that existed only on paper, and transfers between warehouses nobody could see.',
    afterBs: 'Dvanaest skladišta u jednom sistemu. Šest sedmica do pune produkcije, tačnost 99,4% i 91% manje grešaka pri pakovanju.',
    afterEn: 'Twelve warehouses in one system. Six weeks to full production, accuracy at 99,4 percent and 91 percent fewer packing errors.',
    caseHref: '/radovi/wms',
    accent: '#FFA658',
  },
};
