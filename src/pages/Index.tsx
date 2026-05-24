import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Building2,
  Bus,
  CheckCircle2,
  ClipboardCheck,
  Layers,
  MapPin,
  MonitorSmartphone,
  Route,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import CTABanner from "@/components/CTABanner";
import Reveal from "@/components/Reveal";
import Counter from "@/components/Counter";
import StatusChip, { type Status } from "@/components/StatusChip";
import heroImg from "@/assets/hero-station.jpg";
import proofBus from "@/assets/proof-bus.jpg";
import proofDigital from "@/assets/proof-digital.jpg";
import proofInterior from "@/assets/proof-interior.jpg";
import kiplLogo from "@/assets/kipl-logo.png";
import { CLIENT_FACTS, MEDIA_INVENTORY, TRUST_STATS } from "@/lib/clientFacts";
import { KIPL } from "@/lib/kipl";
import { blurReveal, buttonHover, cardHover, easePremium, fadeUp, staggerContainer } from "@/lib/motion";

const HERO_VIDEO_SRC: string | null = null;

const FUNNEL_STATS = [
  { value: CLIENT_FACTS.busStations, label: "Bus Stations", icon: Building2 },
  { value: CLIENT_FACTS.buses, label: "Buses", icon: Bus },
  { value: CLIENT_FACTS.upcomingFleet, label: "Upcoming Fleet", icon: Route },
  { value: CLIENT_FACTS.districts, label: "Districts", icon: MapPin },
  { value: CLIENT_FACTS.dailyReach, label: "Daily Reach", icon: Users },
] as const;

const WHY = [
  {
    icon: ShieldCheck,
    title: "One managed access point",
    desc: "Brands and agencies can plan across stations, buses, hoardings, screens, grab handles, and digital channels through a single execution partner.",
  },
  {
    icon: MapPin,
    title: "Statewide planning without district-level guesswork",
    desc: "Coverage is represented across 36 districts, with media availability confirmed campaign-wise instead of overstated at district level.",
  },
  {
    icon: Layers,
    title: "Physical + digital media mix",
    desc: "Combine high-dwell station formats, moving bus inventory, screen-led recall, social media, and upcoming phased assets.",
  },
  {
    icon: BadgeCheck,
    title: "Proof-led execution",
    desc: "GPS-enabled start photos, end photos, installation proof, display counts, screen logs, and campaign execution reports where applicable.",
  },
] as const;

const PROCESS = [
  "Share your requirement",
  "Get recommended media plan",
  "Approve campaign",
  "Printing, mounting, and deployment",
  "Receive proof and reports",
] as const;

const statusKey = (status: string): Status =>
  status === "Live Now" ? "live" : status === "Launching Soon" ? "soon" : status.startsWith("Subject") ? "clearance" : "phases";

const Index = () => {
  const reduce = useReducedMotion();

  return (
    <>
      <section className="relative -mt-[88px] overflow-hidden pt-[88px]">
        <div className="relative min-h-[760px]">
          <HeroBackdrop reduce={Boolean(reduce)} />

          <div className="container-edge relative z-10 grid min-h-[760px] items-center gap-12 pb-12 pt-32 lg:grid-cols-12">
            <motion.div
              className="lg:col-span-7"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={fadeUp} className="inline-flex items-center gap-3 border-y border-accent/35 bg-background/45 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-accent backdrop-blur-md">
                <span className="h-1.5 w-1.5 bg-accent" />
                {CLIENT_FACTS.brand}
              </motion.div>
              <motion.h1 variants={blurReveal} className="mt-7 max-w-[13ch] h-display text-ivory">
                One Contract to Reach Maharashtra's Daily Commuters
              </motion.h1>
              <motion.p variants={fadeUp} className="mt-7 max-w-2xl text-[18px] leading-relaxed text-muted-2">
                Advertise across MSRTC bus stations, buses, hoardings, screens, grab handles, and digital channels through one managed media network.
              </motion.p>
              <motion.div variants={fadeUp} className="mt-9 flex flex-wrap gap-3">
                <motion.div whileHover={reduce ? undefined : buttonHover} whileTap={reduce ? undefined : { scale: 0.98 }}>
                  <Button asChild size="lg" className="h-12 rounded-sm bg-accent px-6 font-semibold text-accent-foreground hover:bg-accent/90 cta-shine accent-glow">
                    <Link to="/get-media-plan">Get My Media Plan <ArrowRight className="h-4 w-4" /></Link>
                  </Button>
                </motion.div>
                <motion.div whileHover={reduce ? undefined : buttonHover}>
                  <Button asChild size="lg" variant="outline" className="h-12 rounded-sm border-stroke-strong bg-background/35 px-6 text-ivory backdrop-blur hover:bg-surface-2 hover:text-ivory">
                    <Link to="/solutions">View Media Inventory</Link>
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div
              className="lg:col-span-5"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={blurReveal} className="premium-panel route-sheen p-5 sm:p-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="label-amber">Network Access</div>
                    <h2 className="mt-3 h-card text-[22px] text-ivory">Managed media buying across transit touchpoints.</h2>
                  </div>
                  <img src={kiplLogo} alt="KIPL logo" className="h-8 w-auto shrink-0" />
                </div>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  {MEDIA_INVENTORY.slice(0, 4).map((item) => (
                    <div key={item.slug} className="rounded-sm border border-stroke bg-background/55 p-4 backdrop-blur">
                      <div className="text-[12px] font-semibold text-ivory">{item.name}</div>
                      <div className="mt-2 text-[11px] text-faint">{item.status}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-stroke bg-stroke sm:grid-cols-4">
                  {TRUST_STATS.map((stat) => (
                    <div key={stat.label} className="bg-background/85 px-4 py-4">
                      <div className="font-display text-[22px] font-bold leading-none text-ivory tnum">{stat.value}</div>
                      <div className="mt-2 text-[10px] font-bold uppercase text-faint">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section-y border-t border-stroke bg-surface-1/35">
        <div className="container-page grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-5" variant="blur">
            <div className="label-amber">Problem → Solution</div>
            <h2 className="mt-5 h-section">Transit media is fragmented. This network makes it buyable.</h2>
            <p className="mt-6 lede max-w-md">
              Media buyers need scale, reliable execution, and proof. MSRTC Media Network packages Maharashtra's transit opportunity into a managed B2B buying path.
            </p>
          </Reveal>
          <div className="lg:col-span-7">
            {[
              ["Fragmented buying", "One managed access point for media planning and execution."],
              ["Unclear availability", "Live, launching, conditional, and phased inventory separated clearly."],
              ["Weak campaign proof", "GPS photos, display logs, reports, and depot-wise proof where applicable."],
            ].map(([problem, solution], i) => (
              <Reveal key={problem} delay={i * 80} className="grid grid-cols-12 gap-5 border-t border-stroke py-7 last:border-b">
                <div className="col-span-12 sm:col-span-4">
                  <div className="text-[13px] font-semibold uppercase tracking-[0.16em] text-faint">{problem}</div>
                </div>
                <div className="col-span-12 sm:col-span-8 flex items-start gap-3 text-[16px] leading-relaxed text-ivory">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-accent" />
                  {solution}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y border-t border-stroke">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <Reveal className="lg:col-span-7" variant="blur">
              <div className="label-amber">Media Inventory Snapshot</div>
              <h2 className="mt-5 h-section">A serious transit catalogue, not a brochure.</h2>
            </Reveal>
            <Reveal delay={100} className="lg:col-span-5">
              <p className="lede lg:text-right">Every card separates status, approved quantities, buyer value, and reporting proof.</p>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {MEDIA_INVENTORY.slice(0, 8).map((item, i) => (
              <Reveal key={item.slug} delay={i * 45}>
                <motion.article whileHover={reduce ? undefined : cardHover} className="card-surface inventory-card flex h-full flex-col p-6">
                  <div className="flex items-start justify-between gap-3">
                    <MonitorSmartphone className="h-5 w-5 text-accent" strokeWidth={1.5} />
                    <StatusChip status={statusKey(item.status)} />
                  </div>
                  <h3 className="mt-6 h-card text-ivory">{item.name}</h3>
                  <div className="mt-3 space-y-1 text-[12.5px] text-muted-2">
                    {"startDate" in item && item.startDate && <p><span className="text-faint">Start · </span>{item.startDate}</p>}
                    {"quantity" in item && item.quantity && <p><span className="text-faint">Qty · </span>{item.quantity}</p>}
                    {"note" in item && item.note && <p><span className="text-faint">Note · </span>{item.note}</p>}
                  </div>
                  <p className="mt-4 flex-1 text-[14px] leading-relaxed text-muted-2">{item.bestUse}</p>
                  <p className="mt-5 border-t border-stroke pt-4 text-[12px] leading-relaxed text-faint">{item.reporting}</p>
                </motion.article>
              </Reveal>
            ))}
          </div>
          <div className="mt-10 flex justify-end">
            <Button asChild size="lg" className="rounded-sm bg-accent text-accent-foreground hover:bg-accent/90 font-semibold cta-shine">
              <Link to="/solutions">Explore Full Inventory <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="section-y border-t border-stroke bg-surface-1/30">
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4" variant="blur">
            <div className="label-amber">Scale & Reach</div>
            <h2 className="mt-5 h-section">Government-scale infrastructure opportunity.</h2>
            <p className="mt-6 lede">Rural and urban Maharashtra, with strong Tier 2 and Tier 3 market advantage.</p>
          </Reveal>
          <div className="lg:col-span-8 grid grid-cols-2 gap-px bg-stroke p-px sm:grid-cols-3 lg:grid-cols-5">
            {FUNNEL_STATS.map(({ value, label, icon: Icon }, i) => (
              <Reveal key={label} delay={i * 60} className="bg-background p-6">
                <Icon className="h-4 w-4 text-accent" strokeWidth={1.5} />
                <div className="mt-5 font-display text-[30px] font-bold leading-none text-ivory tnum"><Counter value={value} /></div>
                <div className="mt-3 label-sm">{label}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y border-t border-stroke">
        <div className="container-page grid gap-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-4 lg:sticky lg:top-32 self-start" variant="blur">
            <div className="label-amber">Why Choose This Network</div>
            <h2 className="mt-5 h-section">Built for advertisers who need confidence before scale.</h2>
          </Reveal>
          <div className="lg:col-span-8 border-y border-stroke divide-y divide-stroke">
            {WHY.map(({ icon: Icon, title, desc }, i) => (
              <Reveal key={title} delay={i * 60} className="grid grid-cols-12 gap-6 py-7">
                <div className="col-span-2 sm:col-span-1">
                  <div className="grid h-10 w-10 place-items-center rounded-sm bg-accent/10 text-accent ring-1 ring-accent/15">
                    <Icon className="h-4 w-4" strokeWidth={1.5} />
                  </div>
                </div>
                <h3 className="col-span-10 sm:col-span-4 h-card text-[17px] text-ivory">{title}</h3>
                <p className="col-span-12 sm:col-span-7 text-[14px] leading-relaxed text-muted-2">{desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y border-t border-stroke bg-surface-1/30">
        <div className="container-page">
          <Reveal className="max-w-3xl" variant="blur">
            <div className="label-amber">Proof / Reporting</div>
            <h2 className="mt-5 h-section">Real campaign execution, not just promises.</h2>
            <p className="mt-6 lede">The reporting system is designed to help media buyers verify deployment, visibility, and campaign closure.</p>
          </Reveal>
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {[
              { src: proofDigital, tag: "Digital screen logs", title: "Run evidence and display count access where applicable." },
              { src: proofInterior, tag: "Installation proof", title: "Inside-bus and screen placements documented during deployment." },
              { src: proofBus, tag: "Depot-wise visibility proof", title: "Campaign execution reports for distributed media assets." },
            ].map((item, i) => (
              <Reveal key={item.tag} delay={i * 80}>
                <motion.figure whileHover={reduce ? undefined : cardHover} className="group h-full overflow-hidden rounded-md border border-stroke bg-surface-1">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={item.src} alt={item.tag} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                  </div>
                  <figcaption className="p-6">
                    <div className="label-amber">{item.tag}</div>
                    <p className="mt-3 text-[15px] leading-relaxed text-ivory">{item.title}</p>
                  </figcaption>
                </motion.figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y border-t border-stroke">
        <div className="container-page grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-4" variant="blur">
            <div className="label-amber">How It Works</div>
            <h2 className="mt-5 h-section">A clear path from brief to proof.</h2>
            <div className="mt-8 premium-panel p-6">
              <ClipboardCheck className="h-5 w-5 text-accent" />
              <p className="mt-4 text-[14px] leading-relaxed text-ivory">{CLIENT_FACTS.physicalTimeline}</p>
              <p className="mt-3 text-[13px] leading-relaxed text-muted-2">{CLIENT_FACTS.digitalTimeline}</p>
            </div>
          </Reveal>
          <ol className="lg:col-span-8 relative">
            <motion.span
              aria-hidden
              className="absolute left-[15px] top-2 bottom-2 w-px origin-top bg-accent/40"
              initial={reduce ? false : { scaleY: 0 }}
              whileInView={reduce ? undefined : { scaleY: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, ease: easePremium }}
            />
            {PROCESS.map((step, i) => (
              <Reveal key={step} as="li" delay={i * 70} className="relative pl-14 pb-10 last:pb-0">
                <span className="absolute left-0 top-1 grid h-8 w-8 place-items-center rounded-sm border border-accent/35 bg-surface-1 text-[11px] font-bold text-accent tnum">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="h-card text-[19px] text-ivory">{step}</h3>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-y border-t border-stroke bg-surface-1/30">
        <div className="container-page grid gap-10 lg:grid-cols-12 lg:items-center">
          <Reveal className="lg:col-span-7" variant="blur">
            <div className="label-amber">Implemented by KIPL</div>
            <h2 className="mt-5 h-section">The execution layer behind the MSRTC Media Network.</h2>
            <p className="mt-6 lede">
              KIPL brings {KIPL.experienceLabel} of experience, {CLIENT_FACTS.kiplEmployees}, government project experience, in-house IT capability, 24/7 support, and {CLIENT_FACTS.monitoring}.
            </p>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-5 grid grid-cols-2 gap-px bg-stroke p-px">
            {[
              [CLIENT_FACTS.kiplExperience, "Experience"],
              [CLIENT_FACTS.kiplEmployees, "Team"],
              [CLIENT_FACTS.companyDistricts, "Company Overview"],
              [CLIENT_FACTS.monitoring, "Technical Phrase"],
            ].map(([value, label]) => (
              <div key={label} className="bg-background p-6">
                <div className="font-display text-[22px] font-bold text-ivory">{value}</div>
                <div className="mt-2 label-sm">{label}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <CTABanner
        title="Build a media plan for Maharashtra's daily commuters."
        subtitle="Share your target geography, media preference, budget, and campaign timeline. The fallback flow prepares both Email and WhatsApp with your requirement summary."
        primaryLabel="Get My Media Plan"
        secondary={{ to: "/solutions", label: "View Media Inventory" }}
      />
    </>
  );
};

const HeroBackdrop = ({ reduce }: { reduce: boolean }) => (
  <div className="absolute inset-0 overflow-hidden">
    {HERO_VIDEO_SRC && !reduce ? (
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={HERO_VIDEO_SRC}
        poster={heroImg}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      />
    ) : (
      <>
        <img src={heroImg} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-45" />
        <div className="absolute inset-0 hero-video-fallback opacity-55 mix-blend-screen" />
      </>
    )}
    <div className="absolute inset-0 bg-[linear-gradient(90deg,hsl(var(--background))_0%,hsl(var(--background)/0.82)_44%,hsl(var(--background)/0.42)_100%)]" />
    <div className="absolute inset-0 bg-[linear-gradient(180deg,hsl(var(--background)/0.86)_0%,transparent_28%,hsl(var(--background))_100%)]" />
    <div className="absolute inset-0 route-grid opacity-30 [mask-image:linear-gradient(90deg,black,transparent_72%)]" />
    <svg className="absolute inset-0 h-full w-full opacity-55" viewBox="0 0 1440 820" preserveAspectRatio="none" aria-hidden="true">
      <motion.path
        d="M-80 640 C 180 520, 292 690, 520 560 S 864 340, 1120 420 S 1340 530, 1520 350"
        fill="none"
        stroke="hsl(var(--accent) / 0.42)"
        strokeWidth="2"
        strokeDasharray="10 16"
        initial={reduce ? false : { pathLength: 0, opacity: 0 }}
        animate={reduce ? undefined : { pathLength: 1, opacity: 1 }}
        transition={{ duration: 2.2, ease: easePremium }}
      />
      <motion.path
        d="M-120 350 C 160 310, 280 210, 520 260 S 835 470, 1030 300 S 1260 160, 1520 230"
        fill="none"
        stroke="hsl(var(--ivory) / 0.16)"
        strokeWidth="1.2"
        strokeDasharray="5 14"
        initial={reduce ? false : { pathLength: 0, opacity: 0 }}
        animate={reduce ? undefined : { pathLength: 1, opacity: 1 }}
        transition={{ duration: 2.4, ease: easePremium, delay: 0.3 }}
      />
    </svg>
  </div>
);

export default Index;
