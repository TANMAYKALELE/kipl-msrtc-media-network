import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Search, MapPin } from "lucide-react";
import { MAHARASHTRA_DISTRICTS } from "@/lib/districts";
import { CLIENT_FACTS } from "@/lib/clientFacts";
import { easePremium, fadeUp, staggerContainer, viewportReveal } from "@/lib/motion";
import Counter from "./Counter";
import Reveal from "./Reveal";

const REGIONS = [
  { name: "Western Maharashtra", color: "hsl(var(--accent) / 0.7)" },
  { name: "North Maharashtra", color: "hsl(var(--status-soon) / 0.7)" },
  { name: "Marathwada", color: "hsl(var(--status-pending) / 0.7)" },
  { name: "Vidarbha", color: "hsl(var(--status-fleet) / 0.7)" },
  { name: "Konkan", color: "hsl(var(--status-live) / 0.7)" },
  { name: "South Maharashtra", color: "hsl(var(--accent-hi) / 0.7)" },
] as const;

const COVERAGE_STATS = [
  { value: CLIENT_FACTS.busStations, label: "Bus Stations" },
  { value: CLIENT_FACTS.buses, label: "Buses" },
  { value: CLIENT_FACTS.districts, label: "Districts" },
  { value: CLIENT_FACTS.dailyReach, label: "Daily Reach" },
] as const;

const MaharashtraCoverage = () => {
  const [query, setQuery] = useState("");
  const [hoveredDistrict, setHoveredDistrict] = useState<string | null>(null);
  const reduce = useReducedMotion();

  const filtered = useMemo(
    () =>
      query.trim()
        ? MAHARASHTRA_DISTRICTS.filter((d) => d.name.toLowerCase().includes(query.toLowerCase()))
        : MAHARASHTRA_DISTRICTS,
    [query],
  );

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      {/* Map visual */}
      <Reveal className="lg:col-span-7">
        <div className="relative rounded-lg border border-stroke bg-surface-1/60 p-6 sm:p-8 overflow-hidden">
          {/* Premium Transit Network schematic visualization */}
          <svg
            viewBox="0 0 400 320"
            className="w-full h-auto"
            aria-label="Maharashtra coverage visualization showing network presence across the state"
            role="img"
          >
            <defs>
              {/* Dotted grid pattern for futuristic dashboard vibe */}
              <pattern id="networkGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="0.75" fill="hsl(var(--accent) / 0.15)" />
              </pattern>
              <linearGradient id="routeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--accent) / 0.6)" />
                <stop offset="100%" stopColor="hsl(var(--brand-violet) / 0.2)" />
              </linearGradient>
              <radialGradient id="glowGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="hsl(var(--accent) / 0.12)" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
            </defs>

            {/* Futuristic dot grid background */}
            <rect width="400" height="320" fill="url(#networkGrid)" rx="6" />

            {/* Glowing background hub circles */}
            <circle cx="80" cy="170" r="45" fill="url(#glowGrad)" />
            <circle cx="220" cy="160" r="55" fill="url(#glowGrad)" />
            <circle cx="330" cy="100" r="40" fill="url(#glowGrad)" />

            {/* Glowing transit route lines connecting divisions */}
            {[
              "M80,170 Q110,120 160,90",      // Konkan to North MH
              "M80,170 Q95,200 120,230",      // Konkan to Western MH
              "M120,230 Q145,245 170,260",    // Western MH to South MH
              "M160,90 Q190,120 220,160",     // North MH to Marathwada
              "M220,160 Q275,125 330,100",    // Marathwada to Vidarbha
              "M220,160 Q200,215 170,260",    // Marathwada to South MH
              "M120,230 Q170,200 220,160",    // Western MH to Marathwada
            ].map((d, i) => (
              <motion.path
                key={i}
                d={d}
                fill="none"
                stroke="url(#routeGrad)"
                strokeWidth="1.75"
                strokeDasharray="4 5"
                initial={reduce ? false : { pathLength: 0, opacity: 0 }}
                whileInView={reduce ? undefined : { pathLength: 1, opacity: 0.7 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 1.0, ease: easePremium, delay: 0.2 + i * 0.08 }}
              />
            ))}

            {/* Division Hub Nodes */}
            {REGIONS.map((region, i) => {
              const positions = [
                { cx: 120, cy: 230, label: "Western Div.", anchor: "middle", dx: 0, dy: 16 },
                { cx: 160, cy: 90, label: "North MH Div.", anchor: "middle", dx: 0, dy: -12 },
                { cx: 220, cy: 160, label: "Marathwada Div.", anchor: "start", dx: 10, dy: 4 },
                { cx: 330, cy: 100, label: "Vidarbha Div.", anchor: "middle", dx: 0, dy: -12 },
                { cx: 80, cy: 170, label: "Konkan Div. (HQ)", anchor: "end", dx: -10, dy: 4 },
                { cx: 170, cy: 260, label: "South MH Div.", anchor: "middle", dx: 0, dy: 16 },
              ];
              const pos = positions[i];
              return (
                <g key={region.name}>
                  {/* Subtle outer pulsing indicator ring */}
                  <motion.circle
                    cx={pos.cx}
                    cy={pos.cy}
                    r="8"
                    fill="none"
                    stroke={region.color}
                    strokeWidth="0.5"
                    initial={{ scale: 0.9, opacity: 0.2 }}
                    animate={{ scale: 1.5, opacity: 0 }}
                    transition={{ duration: 2.2, repeat: 3, ease: "easeOut" }}
                  />

                  {/* Core hub outline */}
                  <circle cx={pos.cx} cy={pos.cy} r="5" fill="none" stroke={region.color} strokeWidth="1" />

                  {/* High-intensity hub center point */}
                  <motion.circle
                    cx={pos.cx}
                    cy={pos.cy}
                    r="2.5"
                    fill={region.color}
                    initial={reduce ? false : { opacity: 0, scale: 0 }}
                    whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, ease: easePremium, delay: 0.5 + i * 0.08 }}
                  />

                  {/* division label text */}
                  <text
                    x={pos.cx + pos.dx}
                    y={pos.cy + pos.dy}
                    textAnchor={pos.anchor}
                    className="font-display text-[9.5px] font-bold tracking-[0.16em] uppercase fill-ivory/80 select-none pointer-events-none"
                  >
                    {pos.label}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Region legend */}
          <div className="mt-6 flex flex-wrap gap-3">
            {REGIONS.map((region) => (
              <div key={region.name} className="flex items-center gap-2 text-detail text-muted-2">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: region.color }} />
                {region.name}
              </div>
            ))}
          </div>

          <p className="mt-4 text-[11px] text-faint leading-relaxed">
            This is a representative coverage visualization, not a survey-grade district boundary map. District-level media availability is confirmed campaign-wise.
          </p>
        </div>
      </Reveal>

      {/* District list */}
      <div className="lg:col-span-5 flex flex-col gap-5">
        <Reveal>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search districts..."
              className="w-full rounded-md border border-stroke bg-surface-1 py-3 pl-10 pr-4 text-body-sm text-ivory placeholder:text-faint focus:border-accent/50 focus:outline-none transition-colors"
            />
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="rounded-lg border border-stroke bg-surface-1/60 overflow-hidden">
            <div className="max-h-[420px] overflow-y-auto">
              <div className="grid grid-cols-1 min-[400px]:grid-cols-2 gap-px bg-stroke/50">
                {filtered.map((d) => (
                  <div
                    key={d.name}
                    onMouseEnter={() => setHoveredDistrict(d.name)}
                    onMouseLeave={() => setHoveredDistrict(null)}
                    className={`flex items-center gap-2 bg-background px-4 py-3 text-body-sm transition-colors ${
                      hoveredDistrict === d.name ? "bg-surface-2 text-ivory" : "text-muted-2"
                    }`}
                  >
                    <MapPin className="h-3 w-3 text-accent shrink-0" strokeWidth={1.5} />
                    <span className="truncate">{d.name}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="border-t border-stroke bg-surface-1 px-4 py-3 text-center text-detail text-faint">
              {filtered.length} of {MAHARASHTRA_DISTRICTS.length} districts
            </div>
          </div>
        </Reveal>

        {/* Coverage stats */}
        <motion.div
          className="grid grid-cols-2 gap-px bg-stroke p-px rounded-lg overflow-hidden"
          variants={reduce ? undefined : staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportReveal}
        >
          {COVERAGE_STATS.map(({ value, label }) => (
            <motion.div key={label} variants={reduce ? undefined : fadeUp} className="bg-background p-5">
              <Counter value={value} label={label} duration={1200} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default MaharashtraCoverage;
