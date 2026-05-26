import { MapPin, Users, Bus, Building2, Ticket } from "lucide-react";
import CTABanner from "@/components/CTABanner";
import Reveal from "@/components/Reveal";
import Counter from "@/components/Counter";
import MaharashtraCoverage from "@/components/MaharashtraCoverage";
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
    {/* ─── Hero Section ─── */}
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

    {/* ─── Map Showcase Section ( center centerpiece of the page) ─── */}
    <section className="pb-20 border-t border-stroke pt-16">
      <div className="container-page">
        <div className="mb-12 max-w-3xl">
          <Reveal>
            <div className="label-amber">Coverage Map</div>
            <h2 className="mt-4 h-section text-ivory">Coverage representation across 36 districts of Maharashtra.</h2>
            <p className="mt-4 lede">This interactive visual is intentionally representative. District-level media availability is confirmed campaign-wise.</p>
          </Reveal>
        </div>
        <div className="w-full">
          <MaharashtraCoverage />
        </div>
      </div>
    </section>

    {/* ─── Metric Strip Section (supporting quantitative proof) ─── */}
    <section className="border-y border-stroke bg-surface-1/25">
      <div className="container-page">
        <div className="grid grid-cols-2 divide-x divide-y divide-stroke border-x border-stroke sm:grid-cols-3 lg:grid-cols-5 lg:divide-y-0">
          {STATS.map(({ v, l, icon: Icon }, i) => (
            <Reveal key={l} delay={i * 60} className="px-6 py-8">
              <Icon className="h-4 w-4 text-accent" strokeWidth={1.5} />
              <Counter value={v} label={l} className="!items-start !text-left mt-4" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    {/* ─── Corridors & Audience Spread ─── */}
    <section className="section-y bg-background">
      <div className="container-page grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Reveal>
            <div className="label-amber">Network Corridors</div>
            <h2 className="mt-5 h-section text-ivory">Statewide rural and urban spread.</h2>
            <p className="mt-6 text-body-sm leading-relaxed text-muted-2 max-w-2xl">
              The network covers rural and urban routes, important corridors across Maharashtra, and reaches villages
              and different tiers of cities — connecting brands with audiences that traditional media struggles to engage.
            </p>
            <p className="mt-5 text-body-sm leading-relaxed text-ivory max-w-2xl">
              In many Tier 2 and Tier 3 markets, this is the only major transit advertising medium available.
            </p>
          </Reveal>
        </div>
        <Reveal className="lg:col-span-5 card-surface p-8">
          <div>
            <div className="label-amber">Audience Profile</div>
            <h3 className="mt-4 h-card text-ivory text-[22px]">18–45 urban working population</h3>
            <ul className="mt-6 space-y-4 text-caption text-muted-2">
              <li className="flex items-start gap-3"><Users className="mt-0.5 h-4 w-4 text-accent" strokeWidth={1.5} />{CLIENT_FACTS.dailyReach} daily reach across the MSRTC network</li>
              <li className="flex items-start gap-3"><Building2 className="mt-0.5 h-4 w-4 text-accent" strokeWidth={1.5} />{CLIENT_FACTS.busStations} bus stations across Maharashtra</li>
              <li className="flex items-start gap-3"><Ticket className="mt-0.5 h-4 w-4 text-accent" strokeWidth={1.5} />Rural + urban Maharashtra spread</li>
              <li className="flex items-start gap-3"><MapPin className="mt-0.5 h-4 w-4 text-accent" strokeWidth={1.5} />Tier 2 & Tier 3 dominance where applicable</li>
            </ul>
          </div>
        </Reveal>
      </div>
    </section>

    <CTABanner />
  </>
);

export default Reach;
