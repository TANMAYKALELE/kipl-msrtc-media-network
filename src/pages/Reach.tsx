import { MapPin, Users, Bus, Building2, Ticket } from "lucide-react";
import CTABanner from "@/components/CTABanner";
import Reveal from "@/components/Reveal";
import Counter from "@/components/Counter";
import MaharashtraMap from "@/components/MaharashtraMap";
import { CLIENT_FACTS } from "@/lib/clientFacts";

const STATS = [
  { v: CLIENT_FACTS.busStations, l: "Bus Stations", icon: Building2 },
  { v: CLIENT_FACTS.buses, l: "Buses", icon: Bus },
  { v: CLIENT_FACTS.upcomingFleet, l: "Upcoming Fleet", icon: Bus },
  { v: CLIENT_FACTS.districts, l: "Districts", icon: MapPin },
  { v: CLIENT_FACTS.dailyReach, l: "Daily Reach", icon: Users },
];

const Reach = () => (
  <>
    <section className="pt-36 pb-12 lg:pt-40 lg:pb-16">
      <div className="container-page grid gap-10 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <Reveal>
            <div className="label-amber">Reach & Coverage</div>
            <h1 className="mt-6 h-display text-ivory max-w-4xl">Built for Maharashtra-wide reach.</h1>
          </Reveal>
        </div>
        <Reveal delay={120} className="lg:col-span-4">
          <p className="lede max-w-md">
            From metro cities to Tier 2 and Tier 3 towns, the network reaches where most media cannot.
          </p>
        </Reveal>
      </div>
    </section>

    <section className="border-t border-stroke">
      <div className="container-page">
        <div className="grid grid-cols-2 divide-x divide-y divide-stroke border-x border-b border-stroke sm:grid-cols-3 lg:grid-cols-5 lg:divide-y-0">
          {STATS.map(({ v, l, icon: Icon }) => (
            <div key={l} className="px-6 py-8">
              <Icon className="h-4 w-4 text-accent" strokeWidth={1.5} />
              <div className="mt-4 font-display text-[28px] lg:text-[34px] font-bold text-ivory tnum leading-none"><Counter value={v} /></div>
              <div className="mt-3 label-sm">{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="section-y border-t border-stroke">
      <div className="container-page grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="label-amber">Coverage</div>
          <h2 className="mt-5 h-section text-ivory">Coverage representation across 36 districts of Maharashtra.</h2>
          <p className="mt-6 lede max-w-md">This visual is intentionally representative, with a district list rail beside it. District-level media availability is confirmed campaign-wise.</p>
        </div>
        <div className="lg:col-span-8">
          <MaharashtraMap />
        </div>
      </div>
    </section>

    <section className="section-y border-t border-stroke">
      <div className="container-page grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="label-amber">Network</div>
          <h2 className="mt-5 h-section text-ivory">Statewide rural and urban spread.</h2>
          <p className="mt-6 text-[15px] leading-relaxed text-muted-2 max-w-2xl">
            The network covers rural and urban routes, important corridors across Maharashtra, and reaches villages
            and different tiers of cities — connecting brands with audiences that traditional media struggles to engage.
          </p>
          <p className="mt-5 text-[15px] leading-relaxed text-ivory max-w-2xl">
            In many Tier 2 and Tier 3 markets, this is the only major advertising medium available.
          </p>
        </div>
        <div className="lg:col-span-5 card-surface p-8">
          <div className="label-amber">Audience</div>
          <h3 className="mt-4 h-card text-ivory text-[22px]">18–45 urban working population</h3>
          <ul className="mt-6 space-y-4 text-[14px] text-muted-2">
            <li className="flex items-start gap-3"><Users className="mt-0.5 h-4 w-4 text-accent" strokeWidth={1.5} />{CLIENT_FACTS.dailyReach} daily reach across the MSRTC network</li>
            <li className="flex items-start gap-3"><Building2 className="mt-0.5 h-4 w-4 text-accent" strokeWidth={1.5} />{CLIENT_FACTS.busStations} bus stations across Maharashtra</li>
            <li className="flex items-start gap-3"><Ticket className="mt-0.5 h-4 w-4 text-accent" strokeWidth={1.5} />Rural + urban Maharashtra spread</li>
            <li className="flex items-start gap-3"><MapPin className="mt-0.5 h-4 w-4 text-accent" strokeWidth={1.5} />Tier 2 & Tier 3 dominance where applicable</li>
          </ul>
        </div>
      </div>
    </section>

    <CTABanner />
  </>
);

export default Reach;
