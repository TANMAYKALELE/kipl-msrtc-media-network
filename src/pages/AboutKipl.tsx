import { Link } from "react-router-dom";
import {
  ArrowRight, Award, Cpu, Wallet, Shield, Gauge, Cloud, Radio, Plug,
  Wifi, Server, Activity, RefreshCw, PhoneCall, QrCode, MessageCircle,
  Languages, Bell, BatteryCharging, HeartHandshake, Leaf, BarChart3, MapPin,
  Building2, Users, Briefcase, Network,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Reveal from "@/components/Reveal";
import Counter from "@/components/Counter";
import { KIPL, KIPL_PROJECTS, KIPL_WHY_PARTNER } from "@/lib/kipl";
import { CLIENT_FACTS } from "@/lib/clientFacts";
import { staggerContainer, fadeUp, cardHover, cardHoverReset, viewportReveal, safeVariants } from "@/lib/motion";
import proofDigital from "@/assets/proof-digital.jpg";
import proofBus from "@/assets/proof-bus.jpg";
import proofInterior from "@/assets/proof-interior.jpg";
import kiplLogo from "@/assets/kipl-logo.png";

const OVERVIEW = [
  { icon: Building2, t: "Companies Act, 1956", d: "Incorporated under the Companies Act, 1956." },
  { icon: Award, t: "Established 2012", d: "Operating across Maharashtra since 2012." },
  { icon: Users, t: CLIENT_FACTS.kiplEmployees, d: "Delivery, engineering, and operations teams." },
  { icon: Cpu, t: "In-house IT team", d: "Owned engineering capability and IT skills." },
  { icon: MapPin, t: "Maharashtra-wide delivery", d: `Company overview coverage: ${CLIENT_FACTS.companyDistricts}.` },
  { icon: Briefcase, t: "Digital, IT & Government", d: "Digital advertising, IT infrastructure, government solutions." },
];

const EXPERIENCE = [
  { t: `${CLIENT_FACTS.kiplExperience} specialized`, d: "In digital advertising infrastructure development and management." },
  { t: "Large-scale digital media", d: "Network-wide deployment, monitoring, and content systems." },
  { t: "Transportation hub expertise", d: "Stations, depots, fleets, and passenger touchpoints." },
  { t: "Government & public-sector", d: "Compliant delivery for state and PSU clients." },
];

const TECH = [
  { icon: Plug, t: "Dedicated electricity meters" },
  { icon: Wifi, t: "Independent high-speed broadband" },
  { icon: Radio, t: "PSU and SIM-based internet" },
  { icon: Shield, t: "ELCB and proper earthing" },
  { icon: Activity, t: "Centralized Heartbeat Monitoring" },
  { icon: Cloud, t: "Cloud-based infrastructure" },
  { icon: Server, t: "24/7 support" },
  { icon: RefreshCw, t: "Redundancy and failover logic" },
];

const BENEFITS = [
  { icon: Wallet, t: "Zero Liability Model", d: "KIPL bears Capex and Opex; MSRTC receives pure advertising revenue." },
  { icon: Gauge, t: "99.99% uptime over 5 years", d: "Proven reliability on critical government infrastructure." },
  { icon: Shield, t: "98% system uptime guarantee", d: "Operational SLA backed by centralized monitoring." },
  { icon: Users, t: CLIENT_FACTS.kiplEmployees, d: "Dedicated employees across delivery, engineering, and field operations." },
  { icon: Leaf, t: "Eco-friendly PVC-free materials", d: "UV-resistant, sustainable substrates for outdoor media." },
  { icon: BarChart3, t: "Real-time analytics", d: "Location-based tracking and live campaign telemetry." },
  { icon: Cloud, t: "Future-ready cloud infra", d: "Scalable architecture built for the next decade." },
  { icon: Network, t: "Pure ad revenue to MSRTC", d: "No infrastructure burden, no operational overhead." },
];

const PASSENGER = [
  { icon: PhoneCall, t: "Dedicated call centre" },
  { icon: QrCode, t: "QR code helpdesk", d: "For complaint, suggestion, and feedback." },
  { icon: MessageCircle, t: "Chatbot-integrated helpline" },
  { icon: Languages, t: "Bilingual passenger information" },
  { icon: Bell, t: "Next-stop alerts" },
  { icon: BatteryCharging, t: "Mobile charging kiosks" },
  { icon: HeartHandshake, t: "1% Women Safety media", d: "Digital media space at no cost." },
];

const WHY_ICONS = [Network, Award, Cpu, Wallet];

const SectionRail = ({ label, title, lede, children }: { label: string; title: string; lede?: string; children: React.ReactNode }) => (
  <section className="section-y border-t border-stroke">
    <div className="container-page grid gap-12 lg:grid-cols-12">
      <div className="lg:col-span-4 lg:sticky lg:top-32 self-start">
        <Reveal>
          <div className="label-amber">{label}</div>
        </Reveal>
        <Reveal delay={60}>
          <h2 className="mt-5 h-section text-ivory">{title}</h2>
        </Reveal>
        {lede && (
          <Reveal delay={120}>
            <p className="mt-6 lede max-w-md">{lede}</p>
          </Reveal>
        )}
      </div>
      <div className="lg:col-span-8">{children}</div>
    </div>
  </section>
);

const AboutKipl = () => {
  const reduce = useReducedMotion();

  return (
    <>
      <section className="pt-36 pb-12 lg:pt-40 lg:pb-16">
        <div className="container-page">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-violet/60" />
              <span className="label-sm" style={{ color: "hsl(var(--brand-violet))" }}>About KIPL · Implementing Partner</span>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-7 h-display text-ivory max-w-5xl">
              {KIPL.legalName} — <span className="text-accent">implementation partner behind the MSRTC Media Network.</span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-8 lede max-w-3xl">
              A proven government-grade digital and infrastructure partner delivering large-scale media, IT, and public-sector solutions across Maharashtra.
            </p>
          </Reveal>
          <Reveal delay={220} className="mt-8 inline-flex items-center gap-4 border-t border-stroke pt-5">
            <img src={kiplLogo} alt="KIPL" className="h-8 w-auto" />
          </Reveal>

          <Reveal delay={280} className="mt-16 grid grid-cols-2 divide-x divide-y divide-stroke border border-stroke sm:grid-cols-4 sm:divide-y-0">
            {[
              { v: KIPL.established, l: "Established" },
              { v: CLIENT_FACTS.kiplEmployees, l: "Team" },
              { v: CLIENT_FACTS.kiplExperience, l: "Experience" },
              { v: KIPL.deployments, l: "Deployments" },
            ].map((s) => (
              <div key={s.l} className="px-6 py-7">
                <Counter value={s.v} label={s.l} />
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Company Overview */}
      <SectionRail label="Company Overview" title="The implementation, infrastructure, monitoring, and execution partner." lede={`Company overview: ${CLIENT_FACTS.companyDistricts}, with delivery, engineering, and operations teams under one roof.`}>
        <motion.ul
          className="border-y border-stroke divide-y divide-stroke"
          variants={safeVariants(reduce, staggerContainer)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportReveal}
        >
          {OVERVIEW.map(({ icon: Icon, t, d }) => (
            <motion.li key={t} className="grid grid-cols-12 items-start gap-6 py-7" variants={safeVariants(reduce, fadeUp)}>
              <div className="col-span-2 sm:col-span-1">
                <div className="grid h-9 w-9 place-items-center rounded-sm bg-accent/10 text-accent ring-1 ring-accent/15"><Icon className="h-4 w-4" strokeWidth={1.5} /></div>
              </div>
              <div className="col-span-10 sm:col-span-4"><h3 className="h-card text-ivory text-[16px]">{t}</h3></div>
              <div className="col-span-12 sm:col-span-7 text-body-sm leading-relaxed text-muted-2">{d}</div>
            </motion.li>
          ))}
        </motion.ul>
      </SectionRail>

      {/* Experience & Expertise */}
      <SectionRail label="Experience & Expertise" title={`${CLIENT_FACTS.kiplExperience} specialized in digital advertising infrastructure.`} lede="Large-scale digital media, transportation-hub expertise, and proven government and public-sector delivery.">
        <motion.div
          className="grid gap-6 sm:grid-cols-2"
          variants={safeVariants(reduce, staggerContainer)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportReveal}
        >
          {EXPERIENCE.map((c) => (
            <motion.div
              key={c.t}
              className="card-surface p-7"
              variants={safeVariants(reduce, fadeUp)}
              whileHover={reduce ? undefined : cardHover}
              whileTap={reduce ? undefined : cardHoverReset}
            >
              <div className="label-amber">Capability</div>
              <h3 className="mt-4 h-card text-ivory text-[16px]">{c.t}</h3>
              <p className="mt-3 text-body-sm leading-relaxed text-muted-2">{c.d}</p>
            </motion.div>
          ))}
        </motion.div>
      </SectionRail>

      {/* Major Project Achievements */}
      <SectionRail label="Major Project Achievements" title="Government-grade delivery, already on the ground." lede="Live projects executed for state and law-enforcement bodies — proof of capability at the scale Maharashtra requires.">
        <motion.div
          className="grid gap-6 sm:grid-cols-2"
          variants={safeVariants(reduce, staggerContainer)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportReveal}
        >
          {KIPL_PROJECTS.map((p) => (
            <motion.div
              key={p.name}
              className="card-surface relative p-7"
              variants={safeVariants(reduce, fadeUp)}
              whileHover={reduce ? undefined : cardHover}
              whileTap={reduce ? undefined : cardHoverReset}
            >
              <div className="absolute inset-x-0 top-0 h-px bg-accent/70" />
              <div className="label-amber">Government Project</div>
              <h3 className="mt-4 h-card text-ivory text-[18px]">{p.name}</h3>
              <p className="mt-3 text-body-sm leading-relaxed text-muted-2">{p.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </SectionRail>

      {/* Why KIPL */}
      <SectionRail label="Why KIPL" title="Why KIPL supports credibility, execution, and technical confidence.">
        <motion.ul
          className="border-y border-stroke divide-y divide-stroke"
          variants={safeVariants(reduce, staggerContainer)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportReveal}
        >
          {KIPL_WHY_PARTNER.map((s, i) => {
            const Icon = WHY_ICONS[i] ?? Award;
            return (
              <motion.li key={s.title} className="grid grid-cols-12 items-start gap-6 py-7" variants={safeVariants(reduce, fadeUp)}>
                <div className="col-span-2 sm:col-span-1">
                  <div className="grid h-9 w-9 place-items-center rounded-sm bg-accent/10 text-accent ring-1 ring-accent/15"><Icon className="h-4 w-4" strokeWidth={1.5} /></div>
                </div>
                <div className="col-span-10 sm:col-span-4"><h3 className="h-card text-ivory text-[16px]">{s.title}</h3></div>
                <div className="col-span-12 sm:col-span-7 text-body-sm leading-relaxed text-muted-2">{s.desc}</div>
              </motion.li>
            );
          })}
        </motion.ul>
      </SectionRail>

      {/* Technical Excellence */}
      <SectionRail label="Technical Excellence" title="An infrastructure stack engineered for uptime." lede="From dedicated power to cloud failover — the operational backbone behind every deployment.">
        <motion.div
          className="grid grid-cols-2 divide-x divide-y divide-stroke border border-stroke sm:grid-cols-4 sm:divide-y-0"
          variants={safeVariants(reduce, staggerContainer)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportReveal}
        >
          {TECH.map(({ icon: Icon, t }) => (
            <motion.div
              key={t}
              className="p-6"
              variants={safeVariants(reduce, fadeUp)}
              whileHover={reduce ? undefined : cardHover}
              whileTap={reduce ? undefined : cardHoverReset}
            >
              <Icon className="h-4 w-4 text-accent" strokeWidth={1.5} />
              <h3 className="mt-5 text-caption font-semibold leading-snug text-ivory">{t}</h3>
            </motion.div>
          ))}
        </motion.div>
      </SectionRail>

      {/* Partnership Benefits */}
      <SectionRail label="Partnership Benefits" title="Zero liability for MSRTC. Pure ad revenue. Operational discipline." lede="KIPL bears Capex and Opex. MSRTC receives the upside without the burden.">
        <motion.div
          className="grid gap-6 sm:grid-cols-2"
          variants={safeVariants(reduce, staggerContainer)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportReveal}
        >
          {BENEFITS.map(({ icon: Icon, t, d }) => (
            <motion.div
              key={t}
              className="card-surface p-6"
              variants={safeVariants(reduce, fadeUp)}
              whileHover={reduce ? undefined : cardHover}
              whileTap={reduce ? undefined : cardHoverReset}
            >
              <div className="grid h-9 w-9 place-items-center rounded-sm bg-accent/10 text-accent ring-1 ring-accent/15"><Icon className="h-4 w-4" strokeWidth={1.5} /></div>
              <h3 className="mt-5 h-card text-ivory text-[15px]">{t}</h3>
              <p className="mt-2 text-caption leading-relaxed text-muted-2">{d}</p>
            </motion.div>
          ))}
        </motion.div>
      </SectionRail>

      {/* Passenger Experience */}
      <SectionRail label="Passenger Experience" title="Better journeys, built into the network." lede="Service layers KIPL deploys alongside the media network — including a 1% media space dedicated to Women Safety at no cost.">
        <motion.div
          className="grid gap-px border border-stroke bg-stroke sm:grid-cols-2 lg:grid-cols-3"
          variants={safeVariants(reduce, staggerContainer)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportReveal}
        >
          {PASSENGER.map(({ icon: Icon, t, d }) => (
            <motion.div
              key={t}
              className="bg-surface-1 p-6"
              variants={safeVariants(reduce, fadeUp)}
              whileHover={reduce ? undefined : cardHover}
              whileTap={reduce ? undefined : cardHoverReset}
            >
              <Icon className="h-4 w-4 text-accent" strokeWidth={1.5} />
              <h3 className="mt-5 h-card text-ivory text-[15px]">{t}</h3>
              {d && <p className="mt-2 text-caption text-muted-2">{d}</p>}
            </motion.div>
          ))}
        </motion.div>
      </SectionRail>

      {/* Site Visits */}
      <SectionRail label="Site Visits · Ground Reality" title="Site visits already conducted across the MSRTC network." lede="Implementation readiness grounded in first-hand surveys of stations, depots, and live passenger flows.">
        <motion.div
          className="grid gap-6 sm:grid-cols-3"
          variants={safeVariants(reduce, staggerContainer)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportReveal}
        >
          {[
            { src: proofInterior, alt: "MSRTC media infrastructure site visit", tag: "Infrastructure Audits" },
            { src: proofDigital, alt: "Depot walk-through", tag: "Depot Walk-throughs" },
            { src: proofBus, alt: "Operational interviews", tag: "Operational Interviews" },
          ].map((p) => (
            <motion.div
              key={p.alt}
              className="overflow-hidden rounded-sm border border-stroke"
              variants={safeVariants(reduce, fadeUp)}
              whileHover={reduce ? undefined : cardHover}
              whileTap={reduce ? undefined : cardHoverReset}
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img src={p.src} alt={p.alt} loading="lazy" className="h-full w-full object-cover" />
              </div>
              <div className="bg-surface-1 p-4 label-amber">{p.tag}</div>
            </motion.div>
          ))}
        </motion.div>
      </SectionRail>

      {/* CTA */}
      <section className="section-y border-t border-stroke">
        <div className="container-page grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Reveal>
              <div className="label-amber">Let's Partner for Success</div>
            </Reveal>
            <Reveal delay={60}>
              <h2 className="mt-5 h-section text-ivory max-w-3xl">Build Maharashtra's transit future with KIPL.</h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-6 lede max-w-2xl">Talk to the KIPL team about partnership, integration, and government-grade delivery.</p>
            </Reveal>
          </div>
          <Reveal delay={180} className="lg:col-span-4 flex flex-wrap gap-3 lg:justify-end">
            <Button asChild size="lg" className="rounded-sm bg-accent text-accent-foreground hover:bg-accent/90 font-semibold cta-shine accent-glow">
              <Link to="/contact">Contact Us <ArrowRight className="h-4 w-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-sm border-stroke-strong bg-transparent text-ivory hover:bg-surface-2 hover:text-ivory">
              <Link to="/get-media-plan">Get Media Plan</Link>
            </Button>
          </Reveal>
        </div>
      </section>
    </>
  );
};

export default AboutKipl;
