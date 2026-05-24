import CTABanner from "@/components/CTABanner";
import { Clock, Wrench, Zap } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { CLIENT_FACTS } from "@/lib/clientFacts";
import { easePremium } from "@/lib/motion";

const STEPS = [
  { n: "01", title: "Share your requirement", desc: "Tell us your campaign goal, target geography, and budget." },
  { n: "02", title: "Get recommended media plan", desc: "We send a tailored mix of currently active and phased options." },
  { n: "03", title: "Approve campaign", desc: "Review pricing, locations, and creative deadlines together." },
  { n: "04", title: "Execution and deployment", desc: "Maintenance and on-ground execution handled by our team." },
  { n: "05", title: "Receive proof and reports", desc: "GPS photos for physical media; screen logs for digital placements." },
];

const HowItWorks = () => {
  const reduce = useReducedMotion();
  return (
  <>
    {/* ─── Hero ─── */}
    <section className="pt-36 pb-12 lg:pt-40 lg:pb-16">
      <div className="container-page grid gap-10 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <Reveal>
            <div className="label-amber">How It Works</div>
            <h1 className="mt-6 h-display text-ivory max-w-4xl">Launch your campaign in five simple steps.</h1>
          </Reveal>
        </div>
        <Reveal delay={120} className="lg:col-span-4">
          <p className="lede max-w-md">A clean, frictionless path from brief to proof — built for serious B2B campaigns.</p>
        </Reveal>
      </div>
    </section>

    {/* ─── Process Steps ─── */}
    <section className="section-y border-t border-stroke">
      <div className="container-page grid gap-16 lg:grid-cols-12">
        <Reveal className="lg:col-span-4 lg:sticky lg:top-32 self-start">
          <div className="label-amber">Process</div>
          <h2 className="mt-5 h-section text-ivory">From brief to proof.</h2>
          <p className="mt-6 lede max-w-md">Every step transparent, owned by the KIPL delivery team.</p>
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
          {STEPS.map((s, i) => (
            <Reveal key={s.n} as="li" delay={i * 60} className="relative pl-14 pb-12 last:pb-0">
              <span aria-hidden className="absolute left-0 top-1 grid h-8 w-8 place-items-center rounded-sm border border-stroke-strong bg-surface-1 text-[11px] font-bold text-accent tnum">{s.n}</span>
              <h3 className="h-card text-ivory text-[20px]">{s.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted-2 max-w-xl">{s.desc}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>

    {/* ─── Execution Timelines ─── */}
    <section className="section-y-sm border-t border-stroke">
      <div className="container-page">
        <Reveal>
          <div className="label-amber">Execution Timelines</div>
          <h2 className="mt-5 h-section text-ivory">Speed-to-launch, by channel.</h2>
        </Reveal>
        <div className="mt-12 grid gap-px border border-stroke bg-stroke sm:grid-cols-3">
          {[
            { icon: Zap, t: "Digital campaigns", d: CLIENT_FACTS.digitalTimeline },
            { icon: Clock, t: "Physical media", d: CLIENT_FACTS.physicalTimeline },
            { icon: Wrench, t: "Maintenance", d: "Printing, mounting, deployment, maintenance, and reporting are coordinated by the implementation team." },
          ].map(({ icon: Icon, t, d }, i) => (
            <Reveal key={t} delay={i * 60} variant="subtle" className="bg-surface-1 p-7">
              <Icon className="h-4 w-4 text-accent" strokeWidth={1.5} />
              <h3 className="mt-5 h-card text-ivory text-[16px]">{t}</h3>
              <p className="mt-2 text-caption text-muted-2">{d}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    <CTABanner />
  </>
  );
};

export default HowItWorks;
