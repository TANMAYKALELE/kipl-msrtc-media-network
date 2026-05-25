import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CalendarDays, ClipboardCheck, Filter, Layers, Megaphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import CTABanner from "@/components/CTABanner";
import Reveal from "@/components/Reveal";
import StatusChip from "@/components/StatusChip";
import { CLIENT_FACTS, MEDIA_INVENTORY } from "@/lib/clientFacts";
import { BOT_NOTE, PWD_NOTE } from "@/lib/site";
import { cn } from "@/lib/utils";
import { buttonHover, cardHover, listReveal, subtleFadeUp, fadeUp, viewportReveal } from "@/lib/motion";
import { statusKey } from "@/lib/statusKey";
import { useCountUp, parseDisplayValue } from "@/hooks/useCountUp";

const TABS = ["All", "Live Now", "Launching Soon", "Bus Media", "Station Media", "Digital Media"] as const;
type Tab = (typeof TABS)[number];

const stats = [
  { value: "1,70,388", label: "GRAB HANDLES", sub: CLIENT_FACTS.grabHandlesLogic },
  { value: "2,100", label: "HOARDINGS", sub: "Total Network" },
  { value: "~500", label: "DIGITAL HOARDINGS", sub: "10 × 15" },
  { value: "1,686", label: "SCREENS", sub: "in-bus LCD / LED" },
] as const;

interface StatCounterProps {
  value: string;
  label: string;
  sub: string;
}

const StatCounter = ({ value, label, sub }: StatCounterProps) => {
  const reduce = useReducedMotion();
  const parsed = parseDisplayValue(value);

  const { ref, display } = useCountUp({
    end: parsed.end,
    suffix: parsed.suffix,
    prefix: parsed.prefix,
    decimals: parsed.decimals,
    indianFormat: parsed.indianFormat,
    duration: 1400,
    reducedMotion: !!reduce,
  });

  return (
    <div className="flex flex-col text-left">
      <span
        ref={ref as React.RefObject<HTMLSpanElement>}
        className="block font-display text-[32px] md:text-[38px] lg:text-[44px] font-bold text-ivory leading-none"
      >
        {display}
      </span>
      <span className="block mt-4 text-[11px] font-bold uppercase tracking-[0.16em] text-accent leading-snug">
        {label}
      </span>
      <span className="block mt-2 text-[12px] text-faint leading-normal font-medium">
        {sub}
      </span>
    </div>
  );
};

const FAQ = [
  { q: "Are roadside shelters / pickup sheds included?", a: PWD_NOTE },
  { q: "Are all depots equally available?", a: BOT_NOTE },
  {
    q: "How fast can a campaign go live?",
    a: `${CLIENT_FACTS.digitalTimeline} ${CLIENT_FACTS.physicalTimeline}`,
  },
  {
    q: "What proof do you provide for campaigns?",
    a: "GPS-enabled start photos, GPS-enabled end photos, installation proof, digital screen logs, display count access where applicable, campaign execution reports, and depot-wise visibility proof.",
  },
] as const;

const Solutions = () => {
  const [tab, setTab] = useState<Tab>("All");
  const reduce = useReducedMotion();
  const items = useMemo(
    () =>
      MEDIA_INVENTORY.filter((item) => {
        if (tab === "All") return true;
        if (tab === "Live Now" || tab === "Launching Soon") return item.status === tab;
        return item.category === tab;
      }),
    [tab],
  );

  return (
    <>
      {/* ─── Hero ─── */}
      <section className="pt-36 pb-12 lg:pt-40 lg:pb-16">
        <div className="container-page grid gap-10 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-8">
            <div className="label-amber">Solutions / Media Inventory</div>
            <h1 className="mt-6 h-display max-w-5xl text-ivory">A campaign-ready catalogue for Maharashtra transit media.</h1>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-4">
            <p className="lede max-w-md">
              Browse active, launching, clearance-linked, and phased formats with quantities, start dates, buyer use cases, and proof lines separated cleanly.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ─── Inventory at a Glance ─── */}
      <section className="section-y border-t border-stroke bg-surface-0">
        <div className="container-page">
          <div className="mb-12">
            <Reveal>
              <div className="label-amber uppercase tracking-[0.16em] text-[11px] font-bold">
                Inventory at a Glance
              </div>
              <h2 className="mt-4 h-section text-ivory font-display font-bold max-w-2xl leading-[1.15]">
                Network quantities,<br />officially approved.
              </h2>
            </Reveal>
          </div>

          <div className="border border-stroke/60 rounded-sm overflow-hidden bg-stroke/30">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-stroke/30">
              {stats.map((stat, i) => (
                <Reveal key={stat.label} delay={i * 80} className="bg-surface-1 px-8 py-10 lg:px-10 lg:py-12">
                  <StatCounter value={stat.value} label={stat.label} sub={stat.sub} />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Inventory Grid ─── */}
      <section className="section-y border-t border-stroke">
        <div className="container-page">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <Reveal>
              <div className="label-amber flex items-center gap-2"><Filter className="h-3.5 w-3.5" /> Filter Inventory</div>
              <h2 className="mt-5 h-section max-w-3xl">Serious media cards for serious planning.</h2>
            </Reveal>
            <div className="flex w-full overflow-x-auto scrollbar-none gap-2 pb-2 -mb-2 lg:flex-wrap lg:overflow-x-visible lg:pb-0 lg:mb-0">
              {TABS.map((next) => (
                <button
                  key={next}
                  type="button"
                  onClick={() => setTab(next)}
                  className={cn(
                    "rounded-sm border px-3.5 py-2 text-[11px] font-bold uppercase tracking-[0.16em] transition-colors shrink-0",
                    tab === next
                      ? "border-accent bg-accent text-accent-foreground"
                      : "border-stroke-strong bg-surface-1 text-muted-2 hover:border-accent/50 hover:text-ivory",
                  )}
                >
                  {next}
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="popLayout">
            <motion.div
              key={tab}
              variants={reduce ? undefined : listReveal}
              initial="hidden"
              animate="visible"
              exit={reduce ? undefined : { opacity: 0, transition: { duration: 0.15 } }}
              className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3"
            >
              {items.map((item, i) => (
                <motion.article
                  key={item.slug}
                  layout
                  variants={reduce ? undefined : subtleFadeUp}
                  whileHover={reduce ? undefined : cardHover}
                  className="card-surface inventory-card flex h-full flex-col p-6"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-sm bg-accent/10 text-accent ring-1 ring-accent/15">
                      <Megaphone className="h-4 w-4" strokeWidth={1.5} />
                    </div>
                    <StatusChip status={statusKey(item.status)} />
                  </div>
                  <div className="mt-6">
                    <div className="label-sm">{item.category}</div>
                    <h3 className="mt-2 h-card text-[20px] text-ivory">{item.name}</h3>
                  </div>
                  <div className="mt-5 grid gap-2 text-[13px] text-muted-2">
                    {"startDate" in item && item.startDate && (
                      <p className="flex items-center gap-2"><CalendarDays className="h-3.5 w-3.5 text-accent" /> Start date: <span className="text-ivory">{item.startDate}</span></p>
                    )}
                    {"quantity" in item && item.quantity && (
                      <p className="flex items-center gap-2"><Layers className="h-3.5 w-3.5 text-accent" /> Quantity: <span className="text-ivory">{item.quantity}</span></p>
                    )}
                    {"note" in item && item.note && <p className="text-faint">{item.note}</p>}
                  </div>
                  <p className="mt-5 flex-1 text-[14px] leading-relaxed text-muted-2">{item.bestUse}</p>
                  <p className="mt-5 border-t border-stroke pt-4 text-caption leading-relaxed text-faint">
                    <span className="font-semibold text-muted-2">Reporting · </span>{item.reporting}
                  </p>
                  <motion.div whileHover={reduce ? undefined : buttonHover} className="mt-5">
                    <Link
                    to={`/get-media-plan?media=${item.slug}`}
                    className="inline-flex items-center gap-1 text-[11.5px] font-bold uppercase tracking-[0.16em] text-accent hover:text-accent-hi"
                  >
                    Enquire for this media <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </motion.div>
                </motion.article>
              ))}
            </motion.div>
          </AnimatePresence>

          <Reveal delay={60}>
            <div className="mt-12 rounded-md border border-stroke bg-surface-1 p-6 text-[13px] leading-relaxed text-muted-2">
              <p><span className="font-semibold text-ivory">Transparency · </span>Inventory may be live, launching, subject to clearance / fleet rollout, or coming in phases. Availability is confirmed campaign-wise.</p>
              <p className="mt-3"><span className="font-semibold text-ivory">Station Boards · </span>Station Boards are non-lit.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="section-y-sm border-t border-stroke">
        <div className="container-page grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <div className="label-amber flex items-center gap-2"><ClipboardCheck className="h-3.5 w-3.5" /> Operational Details</div>
            <h2 className="mt-5 h-section">Clear answers before you buy.</h2>
          </Reveal>
          <Reveal delay={80} className="lg:col-span-8">
            <Accordion type="single" collapsible className="border-y border-stroke">
              {FAQ.map((f, i) => (
                <Reveal key={f.q} as="div" delay={i * 50} variant="subtle">
                  <AccordionItem value={`f-${i}`} className="border-stroke">
                    <AccordionTrigger className="py-6 text-left text-[16px] font-semibold text-ivory hover:no-underline">{f.q}</AccordionTrigger>
                    <AccordionContent className="pb-6 text-[14px] leading-relaxed text-muted-2">{f.a}</AccordionContent>
                  </AccordionItem>
                </Reveal>
              ))}
            </Accordion>
            <motion.div whileHover={reduce ? undefined : buttonHover} className="mt-10 inline-block">
              <Button asChild size="lg" className="rounded-sm bg-accent text-accent-foreground hover:bg-accent/90 font-semibold cta-shine">
                <Link to="/get-media-plan">Get My Media Plan <ArrowRight className="h-4 w-4" /></Link>
              </Button>
            </motion.div>
          </Reveal>
        </div>
      </section>

      <CTABanner primaryLabel="Get My Media Plan" secondary={{ to: "/reach", label: "View Reach" }} />
    </>
  );
};

export default Solutions;
