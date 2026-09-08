import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export interface ClientRef {
  id: string;
  /** File in /public/logos */
  logo: string;
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
}

interface ClientCardProps {
  client: ClientRef;
  className?: string;
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
export const ClientCard: React.FC<ClientCardProps> = ({ client, className = '' }) => {
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
      <img
        src={`/logos/${client.logo}`}
        alt={client.name}
        loading="lazy"
        className="client-logo h-8 w-auto self-start mb-5"
      />

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
};
