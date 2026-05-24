import CTABanner from "@/components/CTABanner";
import Reveal from "@/components/Reveal";
import { motion, useReducedMotion } from "framer-motion";
import {
  BadgeCheck,
  BarChart3,
  Camera,
  ClipboardCheck,
  FileCheck2,
  Gauge,
  MapPinned,
  MonitorCheck,
} from "lucide-react";
import proofDigital from "@/assets/proof-digital.jpg";
import proofInterior from "@/assets/proof-interior.jpg";
import proofBus from "@/assets/proof-bus.jpg";
import { cardHover } from "@/lib/motion";
import { cn } from "@/lib/utils";

const PROOF_SYSTEM = [
  { icon: Camera, t: "GPS-enabled start photos", d: "Location-stamped opening documentation for physical placements." },
  { icon: Camera, t: "GPS-enabled end photos", d: "Closure documentation to verify campaign completion." },
  { icon: BadgeCheck, t: "Installation proof", d: "Placement proof for mounted, deployed, or installed media." },
  { icon: MonitorCheck, t: "Digital screen logs", d: "Run evidence for applicable digital screen inventory." },
  { icon: BarChart3, t: "Display count access", d: "Display count access where applicable to the selected digital media." },
  { icon: FileCheck2, t: "Campaign execution reports", d: "Structured post-deployment reports for media buyers and agencies." },
  { icon: ClipboardCheck, t: "Brand execution examples", d: "Execution examples can be shared when approved and available." },
  { icon: MapPinned, t: "Depot-wise visibility proof", d: "Depot-wise visibility proof where applicable to the booking." },
] as const;

const Proof = () => {
  const reduce = useReducedMotion();
  return (
  <>
    {/* ─── Hero ─── */}
    <section className="pt-36 pb-12 lg:pt-40 lg:pb-16">
      <div className="container-page grid gap-10 lg:grid-cols-12 lg:items-end">
        <Reveal className="lg:col-span-8">
          <div className="label-amber">Proof / Case Studies</div>
          <h1 className="mt-6 h-display max-w-5xl text-ivory">Real Campaign Execution, Not Just Promises.</h1>
        </Reveal>
        <Reveal delay={120} className="lg:col-span-4">
          <p className="lede max-w-md">
            A proof-first operating model for agencies, advertisers, and stakeholders who need confidence after the campaign goes live.
          </p>
        </Reveal>
      </div>
    </section>

    {/* ─── Photo Evidence ─── */}
    <section className="section-y border-t border-stroke">
      <div className="container-page">
        <div className="grid gap-6 lg:grid-cols-12">
          {[
            { src: proofDigital, tag: "Digital proof", caption: "Screen logs and display count access where applicable.", span: "lg:col-span-7", aspect: "aspect-[16/10]" },
            { src: proofInterior, tag: "Installation proof", caption: "In-bus and display installations documented during deployment.", span: "lg:col-span-5", aspect: "aspect-[16/10]" },
            { src: proofBus, tag: "Depot-wise visibility", caption: "Route, depot, and campaign execution proof for distributed media.", span: "lg:col-span-12", aspect: "aspect-[16/10] md:aspect-[21/9]" },
          ].map((item, i) => (
            <Reveal key={item.tag} delay={i * 80} className={item.span}>
              <motion.figure whileHover={reduce ? undefined : cardHover} className="group flex h-full flex-col">
                <div className={cn("relative overflow-hidden rounded-sm border border-stroke bg-surface-1", item.aspect)}>
                  <img src={item.src} alt={item.tag} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_35%,hsl(var(--background)/0.72))]" />
                </div>
                <figcaption className="pt-4">
                  <div className="label-amber">{item.tag}</div>
                  <div className="mt-2 text-body-sm leading-snug text-ivory">{item.caption}</div>
                </figcaption>
              </motion.figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    {/* ─── Evidence Stack ─── */}
    <section className="section-y border-t border-stroke bg-surface-1/30">
      <div className="container-page grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <div className="label-amber">Evidence Stack</div>
          <h2 className="mt-5 h-section">The proof media buyers expect.</h2>
          <p className="mt-6 lede">These cards describe proof mechanisms, not fabricated case studies or invented client claims.</p>
        </Reveal>
        <div className="lg:col-span-8 grid gap-px bg-stroke p-px sm:grid-cols-2">
          {PROOF_SYSTEM.map(({ icon: Icon, t, d }, i) => (
            <Reveal key={t} delay={i * 45} className="bg-background p-6">
              <Icon className="h-4 w-4 text-accent" strokeWidth={1.5} />
              <h3 className="mt-5 h-card text-[16px] text-ivory">{t}</h3>
              <p className="mt-2 text-caption leading-relaxed text-muted-2">{d}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    {/* ─── Reporting Callout ─── */}
    <section className="section-y-sm border-t border-stroke">
      <Reveal className="container-page">
        <div className="rounded-md border border-stroke bg-surface-1 p-8">
          <Gauge className="h-5 w-5 text-accent" />
          <h2 className="mt-5 h-section">Reporting is part of the product.</h2>
          <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-muted-2">
            The goal is simple: every campaign should leave the advertiser with a clear record of deployment, applicable logs, and execution evidence tied to the selected media format.
          </p>
        </div>
      </Reveal>
    </section>

    <CTABanner primaryLabel="Get My Media Plan" secondary={{ to: "/solutions", label: "View Inventory" }} />
  </>
  );
};

export default Proof;
