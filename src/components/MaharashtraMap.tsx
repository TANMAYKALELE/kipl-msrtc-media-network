import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Search } from "lucide-react";
import { MAHARASHTRA_DISTRICTS } from "@/lib/districts";
import { CLIENT_FACTS } from "@/lib/clientFacts";
import { easePremium, staggerContainer, fadeUp } from "@/lib/motion";

const pins = [
  { x: 92, y: 210, label: "Western Corridor" },
  { x: 150, y: 136, label: "North Maharashtra" },
  { x: 210, y: 210, label: "Central Maharashtra" },
  { x: 286, y: 145, label: "Vidarbha" },
  { x: 250, y: 265, label: "Marathwada" },
  { x: 128, y: 286, label: "South Maharashtra" },
] as const;

const MaharashtraMap = () => {
  const [active, setActive] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const reduce = useReducedMotion();
  const districts = useMemo(
    () => MAHARASHTRA_DISTRICTS.filter((district) => district.name.toLowerCase().includes(query.trim().toLowerCase())),
    [query],
  );

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <div className="premium-panel route-sheen min-h-[520px] p-5 sm:p-7 lg:col-span-8">
        <div className="relative z-10 flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="label-amber">Coverage Representation</div>
            <h3 className="mt-3 h-card text-[24px] text-ivory">Maharashtra network footprint</h3>
          </div>
          <div className="rounded-sm border border-stroke bg-background/55 px-4 py-3 text-right backdrop-blur">
            <div className="font-display text-[24px] font-bold text-ivory">{CLIENT_FACTS.districts}</div>
            <div className="mt-1 text-[10px] font-bold uppercase text-faint">Districts</div>
          </div>
        </div>

        <div className="relative z-10 mt-8 overflow-hidden rounded-md border border-stroke bg-background/45 p-4">
          <svg viewBox="0 0 420 360" role="img" aria-label="Coverage representation across 36 districts of Maharashtra" className="h-[420px] w-full">
            <defs>
              <linearGradient id="premiumMh" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--accent) / 0.34)" />
                <stop offset="48%" stopColor="hsl(var(--accent) / 0.12)" />
                <stop offset="100%" stopColor="hsl(var(--brand-violet) / 0.15)" />
              </linearGradient>
              <filter id="softGlow" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <rect x="0" y="0" width="420" height="360" fill="transparent" />
            <motion.path
              d="M58 196 C48 158 78 119 116 88 C153 58 194 69 231 88 C263 104 291 97 324 88 C363 77 395 101 401 136 C409 181 381 215 345 226 C315 235 300 229 273 255 C244 284 219 319 174 316 C145 314 129 294 103 298 C75 302 51 286 44 255 C38 228 68 218 58 196 Z"
              fill="url(#premiumMh)"
              stroke="hsl(var(--accent) / 0.64)"
              strokeWidth="2"
              filter="url(#softGlow)"
              initial={reduce ? false : { opacity: 0, pathLength: 0.2 }}
              whileInView={reduce ? undefined : { opacity: 1, pathLength: 1 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 1.25, ease: easePremium }}
            />
            {[
              "M75 205 C128 174 162 178 202 187 C242 196 275 183 322 162 C350 150 373 150 398 160",
              "M112 94 C135 135 137 178 126 219 C119 246 111 270 119 298",
              "M226 88 C210 134 214 180 229 220 C242 253 241 279 222 309",
              "M66 253 C122 236 176 238 225 255 C266 269 308 260 346 226",
            ].map((d, i) => (
              <motion.path
                key={d}
                d={d}
                fill="none"
                stroke={i === 0 ? "hsl(var(--accent) / 0.42)" : "hsl(var(--ivory) / 0.12)"}
                strokeWidth={i === 0 ? 2 : 1}
                strokeDasharray={i === 0 ? "8 12" : "4 10"}
                initial={reduce ? false : { pathLength: 0, opacity: 0 }}
                whileInView={reduce ? undefined : { pathLength: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 1.4, ease: easePremium, delay: 0.2 + i * 0.08 }}
              />
            ))}
            {pins.map((pin, i) => (
              <g key={pin.label}>
                <circle cx={pin.x} cy={pin.y} r="12" fill="hsl(var(--accent) / 0.12)" stroke="hsl(var(--accent) / 0.28)" />
                <motion.circle
                  cx={pin.x}
                  cy={pin.y}
                  r="4"
                  fill="hsl(var(--accent))"
                  animate={reduce ? undefined : { r: [4, 5.5, 4] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.16 }}
                />
              </g>
            ))}
            <text x="24" y="334" fill="hsl(var(--text-muted))" fontSize="8.5" letterSpacing="1.1">
              COVERAGE REPRESENTATION ACROSS 36 DISTRICTS OF MAHARASHTRA
            </text>
          </svg>
        </div>

        <motion.div
          className="relative z-10 mt-5 grid gap-px overflow-hidden rounded-md border border-stroke bg-stroke sm:grid-cols-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
        >
          {[
            [CLIENT_FACTS.busStations, "Bus Stations"],
            [CLIENT_FACTS.buses, "Buses"],
            [CLIENT_FACTS.upcomingFleet, "Upcoming Fleet"],
            [CLIENT_FACTS.dailyReach, "Daily Reach"],
          ].map(([value, label]) => (
            <motion.div key={label} variants={fadeUp} className="bg-background/85 p-4">
              <div className="font-display text-[22px] font-bold text-ivory">{value}</div>
              <div className="mt-2 text-[10px] font-bold uppercase text-faint">{label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="premium-panel p-5 sm:p-6 lg:col-span-4">
        <div className="label-amber">36-District List Rail</div>
        <p className="mt-3 text-[13px] leading-relaxed text-muted-2">
          Coverage representation across 36 districts of Maharashtra. District-level media availability is confirmed campaign-wise.
        </p>
        <label className="mt-5 flex items-center gap-2 rounded-sm border border-stroke bg-background/70 px-3 py-2 focus-within:border-accent">
          <Search className="h-4 w-4 text-accent" />
          <span className="sr-only">Search districts</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="w-full bg-transparent text-[13px] text-ivory outline-none placeholder:text-faint"
            placeholder="Search districts"
          />
        </label>
        <div className="mt-5 grid max-h-[500px] gap-2 overflow-auto pr-1">
          {districts.map((district) => {
            const selected = active === district.name;
            return (
              <button
                key={district.name}
                type="button"
                onMouseEnter={() => setActive(district.name)}
                onFocus={() => setActive(district.name)}
                onMouseLeave={() => setActive(null)}
                onBlur={() => setActive(null)}
                className={`flex items-center justify-between gap-3 rounded-sm border px-3 py-2.5 text-left text-[13px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                  selected ? "border-accent/60 bg-accent/10 text-ivory" : "border-stroke bg-background/55 text-muted-2 hover:border-accent/45 hover:text-ivory"
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 shrink-0 bg-accent" />
                  {district.name}
                </span>
                <span className="text-[10px] uppercase text-faint">MSRTC</span>
              </button>
            );
          })}
        </div>
        <div className="mt-5 rounded-sm border border-stroke bg-background/55 p-4 text-[12px] leading-relaxed text-faint">
          This is not a survey-grade district boundary map and does not claim exact district-level media availability.
        </div>
      </div>
    </div>
  );
};

export default MaharashtraMap;
