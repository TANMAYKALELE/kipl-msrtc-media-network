import CTABanner from "@/components/CTABanner";
import Reveal from "@/components/Reveal";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
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
import { safeVariants, staggerContainer, fadeUp, viewportReveal } from "@/lib/motion";
import { cn } from "@/lib/utils";

const PROOF_SYSTEM = [
  { icon: Camera, t: "GPS-enabled start photos", d: "Location-stamped opening documentation for physical placements.", tag: "Physical Proof" },
  { icon: Camera, t: "GPS-enabled end photos", d: "Closure documentation to verify campaign completion.", tag: "Physical Proof" },
  { icon: BadgeCheck, t: "Installation proof", d: "Placement proof for mounted, deployed, or installed media.", tag: "Deployment" },
  { icon: MonitorCheck, t: "Digital screen logs", d: "Run evidence for applicable digital screen inventory.", tag: "Digital Proof" },
  { icon: BarChart3, t: "Display count access", d: "Display count access where applicable to the selected digital media.", tag: "Digital Proof" },
  { icon: FileCheck2, t: "Campaign execution reports", d: "Structured post-deployment reports for media buyers and agencies.", tag: "Reporting" },
  { icon: ClipboardCheck, t: "Brand execution examples", d: "Execution examples can be shared when approved and available.", tag: "Reporting" },
  { icon: MapPinned, t: "Depot-wise visibility proof", d: "Depot-wise visibility proof where applicable to the booking.", tag: "Depot Proof" },
] as const;

const Proof = () => {
  const reduce = useReducedMotion();
  return (
  <>
    {/* ─── Hero ─── */}
    <section className="pt-36 pb-12 lg:pt-40 lg:pb-16">
      <div className="container-page grid gap-10 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <Reveal delay={0}>
            <div className="label-amber">Proof / Case Studies</div>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="mt-6 h-display max-w-5xl text-ivory">Real Campaign Execution, Not Just Promises.</h1>
          </Reveal>
        </div>
        <div className="lg:col-span-4">
          <Reveal delay={240}>
            <p className="lede max-w-md">
              A proof-first operating model for agencies, advertisers, and stakeholders who need confidence after the campaign goes live.
            </p>
          </Reveal>
        </div>
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
              <motion.figure 
                whileHover={reduce ? undefined : {
                  y: -4,
                  transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] }
                }}
                className="group flex h-full flex-col cursor-pointer"
              >
                <div className={cn(
                  "relative overflow-hidden rounded-sm border border-stroke bg-surface-1 transition-all duration-300 group-hover:border-accent/40 group-hover:shadow-[0_0_18px_rgba(245,158,11,0.12)]", 
                  item.aspect
                )}>
                  <img 
                    src={item.src} 
                    alt={item.tag} 
                    loading="lazy" 
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]" 
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_35%,hsl(var(--background)/0.72))]" />
                </div>
                <figcaption className="pt-4">
                  <div className="flex items-center gap-1.5 label-amber">
                    <span>{item.tag}</span>
                    <ArrowUpRight className="h-3 w-3 text-accent transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
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
        
        <motion.div 
          className="lg:col-span-8 grid gap-px bg-stroke p-px sm:grid-cols-2 border border-stroke rounded-sm overflow-hidden"
          variants={safeVariants(reduce, staggerContainer)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportReveal}
        >
          {PROOF_SYSTEM.map(({ icon: Icon, t, d, tag }) => (
            <motion.div
              key={t}
              variants={safeVariants(reduce, fadeUp)}
              whileHover={reduce ? undefined : {
                y: -3,
                transition: { duration: 0.22, ease: "easeOut" }
              }}
              className="bg-background p-6 transition-all duration-300 relative group flex flex-col justify-between overflow-hidden cursor-pointer"
            >
              {/* GPU-accelerated background gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-surface-1/40 to-surface-2/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />
              
              {/* Absolute thin border glow overlay inside the card */}
              <div className="absolute inset-0 border border-accent/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />
              
              {/* Subtle top indicator hover line */}
              <div className="absolute top-0 inset-x-0 h-0.5 bg-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />
              
              <div className="relative z-10">
                <div className="flex items-center justify-between">
                  <div className="grid h-9 w-9 place-items-center rounded-sm bg-accent/10 text-accent ring-1 ring-accent/15 transition-transform duration-300 group-hover:translate-y-[-2px]">
                    <Icon className="h-4 w-4" strokeWidth={1.5} />
                  </div>
                  <span className="rounded-sm bg-background/55 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-faint">
                    {tag}
                  </span>
                </div>
                <h3 className="mt-5 h-card text-[16px] text-ivory font-bold">{t}</h3>
                <p className="mt-2 text-caption leading-relaxed text-muted-2">{d}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>

    {/* ─── Reporting Callout ─── */}
    <section className="section-y-sm border-t border-stroke">
      <div className="container-page">
        <motion.div 
          className="rounded-md border border-stroke bg-surface-1 p-8 relative overflow-hidden group"
          variants={safeVariants(reduce, staggerContainer)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportReveal}
        >
          {/* Subtle gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent/2 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" />
          
          <motion.div variants={safeVariants(reduce, fadeUp)}>
            <Gauge className="h-5 w-5 text-accent transition-transform duration-500 group-hover:rotate-12" />
          </motion.div>
          
          <motion.h2 variants={safeVariants(reduce, fadeUp)} className="mt-5 h-section">
            Reporting is part of the product.
          </motion.h2>
          
          <motion.p variants={safeVariants(reduce, fadeUp)} className="mt-4 max-w-3xl text-[15px] leading-relaxed text-muted-2">
            The goal is simple: every campaign should leave the advertiser with a clear record of deployment, applicable logs, and execution evidence tied to the selected media format.
          </motion.p>
        </motion.div>
      </div>
    </section>

    <CTABanner primaryLabel="Get My Media Plan" secondary={{ to: "/solutions", label: "View Inventory" }} />
  </>
  );
};

export default Proof;
