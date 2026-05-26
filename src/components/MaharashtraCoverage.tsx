import { useMemo, useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Search, MapPin, Activity, ShieldAlert } from "lucide-react";
import { MAHARASHTRA_DISTRICTS } from "@/lib/districts";
import { cn } from "@/lib/utils";
import Reveal from "./Reveal";

// Strict Types for Eslint compliance
interface GeoGeometry {
  type: "Polygon" | "MultiPolygon";
  coordinates: unknown; // Coordinate arrays can be nested at arbitrary levels; using unknown
}

interface GeoFeature {
  type: "Feature";
  properties: {
    district?: string;
    NAME_2?: string;
    [key: string]: string | number | undefined;
  };
  geometry: GeoGeometry;
}

interface GeoJSONData {
  type: "FeatureCollection";
  features: GeoFeature[];
}

// Normalizes district names to handle spelling variations or dual names (e.g. Aurangabad / Chhatrapati Sambhajinagar)
const normalizeDistrictName = (name: string): string => {
  if (!name) return "";
  const lowercase = name.toLowerCase().trim();
  if (lowercase.includes("mumbai")) return "mumbai";
  if (lowercase.includes("aurangabad") || lowercase.includes("sambhaji")) return "aurangabad";
  if (lowercase.includes("osmanabad") || lowercase.includes("dharashiv")) return "osmanabad";
  return lowercase;
};

// Major transit network hubs for command-center aesthetic overlay
const NETWORK_HUBS = [
  { name: "Mumbai (HQ)", lon: 72.87, lat: 19.07, r: 6, pulse: true },
  { name: "Pune", lon: 73.85, lat: 18.52, r: 5, pulse: false },
  { name: "Nashik", lon: 73.78, lat: 19.99, r: 5, pulse: false },
  { name: "Ch. Sambhajinagar", lon: 75.34, lat: 19.87, r: 5, pulse: false },
  { name: "Nagpur", lon: 79.08, lat: 21.14, r: 5.5, pulse: true },
  { name: "Kolhapur", lon: 74.24, lat: 16.70, r: 4.5, pulse: false },
  { name: "Nanded", lon: 77.31, lat: 19.13, r: 4, pulse: false },
  { name: "Amravati", lon: 77.75, lat: 20.93, r: 4, pulse: false },
];

const TRANSIT_ROUTES = [
  { from: "Mumbai (HQ)", to: "Pune" },
  { from: "Mumbai (HQ)", to: "Nashik" },
  { from: "Pune", to: "Kolhapur" },
  { from: "Nashik", to: "Ch. Sambhajinagar" },
  { from: "Ch. Sambhajinagar", to: "Nanded" },
  { from: "Ch. Sambhajinagar", to: "Amravati" },
  { from: "Amravati", to: "Nagpur" },
  { from: "Nanded", to: "Nagpur" },
  { from: "Pune", to: "Nanded" },
];

const MaharashtraCoverage = () => {
  const [query, setQuery] = useState("");
  const [hoveredDistrict, setHoveredDistrict] = useState<string | null>(null);
  const [geoData, setGeoData] = useState<GeoJSONData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const reduce = useReducedMotion();

  // Load simplified GeoJSON map dynamically from public folder to keep bundle size small
  useEffect(() => {
    fetch("/maharashtra-geojson.json")
      .then((res) => {
        if (!res.ok) throw new Error("Coverage map could not be loaded. Please check the district boundary data source.");
        return res.json();
      })
      .then((data: GeoJSONData) => {
        if (!data || !data.features || !Array.isArray(data.features)) {
          throw new Error("Invalid map data structure.");
        }
        setGeoData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading Maharashtra GeoJSON:", err);
        setError(err.message || "Coverage map could not be loaded.");
        setLoading(false);
      });
  }, []);

  const filteredDistricts = useMemo(() => {
    const cleaned = query.trim().toLowerCase();
    if (!cleaned) return MAHARASHTRA_DISTRICTS;
    return MAHARASHTRA_DISTRICTS.filter((d) => d && d.name && d.name.toLowerCase().includes(cleaned));
  }, [query]);

  // Project spherical latitude/longitude coordinates to local SVG viewBox [0, 500, 0, 400]
  const project = (coord: [number, number]): [number, number] => {
    if (!coord || coord.length < 2) return [0, 0];
    const lon = coord[0];
    const lat = coord[1];
    
    // Safety guard against NaN or undefined values
    if (lon === undefined || lat === undefined || isNaN(lon) || isNaN(lat)) return [0, 0];

    const minLon = 72.3;
    const maxLon = 80.9;
    const minLat = 15.5;
    const maxLat = 22.2;

    const x = ((lon - minLon) / (maxLon - minLon)) * 500;
    const y = (1 - (lat - minLat) / (maxLat - minLat)) * 400;

    return [x, y];
  };

  // Convert GeoJSON geometry feature (Polygons and MultiPolygons) to raw SVG path string
  const getPathData = (geometry: GeoGeometry): string => {
    if (!geometry) return "";
    const { type, coordinates } = geometry;
    if (!coordinates) return "";

    if (type === "Polygon") {
      const polygonCoords = coordinates as [number, number][][];
      if (!Array.isArray(polygonCoords)) return "";
      return polygonCoords
        .map((ring: [number, number][]) => {
          if (!Array.isArray(ring)) return "";
          return ring
            .map((coord) => {
              const [x, y] = project(coord);
              return `${isNaN(x) || isNaN(y) ? "L0,0" : `L${x.toFixed(1)},${y.toFixed(1)}`}`;
            })
            .join(" ")
            .replace(/^L/, "M") + " Z"; // Replace first L with M to form path
        })
        .join(" ");
    }

    if (type === "MultiPolygon") {
      const multiPolygonCoords = coordinates as [number, number][][][];
      if (!Array.isArray(multiPolygonCoords)) return "";
      return multiPolygonCoords
        .map((polygon: [number, number][][]) => {
          if (!Array.isArray(polygon)) return "";
          return polygon
            .map((ring) => {
              if (!Array.isArray(ring)) return "";
              return ring
                .map((coord) => {
                  const [x, y] = project(coord);
                  return `${isNaN(x) || isNaN(y) ? "L0,0" : `L${x.toFixed(1)},${y.toFixed(1)}`}`;
                })
                .join(" ")
                .replace(/^L/, "M") + " Z"; // Replace first L with M to form path
            })
            .join(" ");
        })
        .join(" ");
    }

    return "";
  };

  // Find projected center coordinates of network hubs
  const getHubCoords = (name: string): [number, number] | null => {
    const hub = NETWORK_HUBS.find((h) => h.name === name);
    if (!hub) return null;
    return project([hub.lon, hub.lat]);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div className="flex flex-col items-center w-full">
      {/* ─── Top: Showcase Massive Map Visualizer ─── */}
      <Reveal className="w-full">
        <div 
          className="relative rounded-lg border border-stroke bg-surface-1/40 p-6 sm:p-8 lg:p-10 overflow-hidden flex flex-col justify-between min-h-[500px] lg:min-h-[640px] shadow-2xl transition-all duration-300 hover:border-stroke-strong"
          onMouseMove={handleMouseMove}
        >
          {/* Subtle glowing grid background */}
          <div aria-hidden className="absolute inset-0 bg-surface-2/20 mix-blend-color-dodge opacity-25 route-grid pointer-events-none" />
          
          {/* Header Panel with Status Indicators */}
          <div className="relative z-10 flex items-center justify-between border-b border-stroke pb-4 mb-4">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              <span className="font-display text-[11px] font-bold uppercase tracking-[0.25em] text-ivory">
                Maharashtra Transit Coverage Visualizer
              </span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 rounded border border-stroke bg-background/65 text-[9px] font-mono text-faint">
              <Activity className="h-3 w-3 text-accent animate-pulse" />
              <span>ONLINE: 36 DISTRICT BOUNDARIES REPRESENTATIVE</span>
            </div>
          </div>

          {/* Map area */}
          <div className="relative flex-grow flex items-center justify-center min-h-[380px] lg:min-h-[480px]">
            {loading ? (
              <div className="flex flex-col items-center gap-4">
                <div className="h-10 w-10 animate-spin rounded-full border-2 border-accent border-t-transparent" />
                <div className="text-[11px] text-faint uppercase tracking-widest font-semibold">Initializing Coverage Intelligence...</div>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center gap-3 text-center p-6 max-w-md relative z-10">
                <ShieldAlert className="h-8 w-8 text-accent/70 animate-bounce" />
                <h4 className="text-body-sm font-bold text-ivory">Map Loading Offline</h4>
                <p className="text-caption text-faint leading-relaxed">
                  {error}
                </p>
                <div className="text-[10px] text-faint/80 mt-2 font-mono">
                  Statewide district search list directory remains fully operational below.
                </div>
              </div>
            ) : geoData ? (
              <svg
                viewBox="0 0 500 400"
                className="w-full h-auto max-h-[460px] lg:max-h-[580px] select-none"
                aria-label="Maharashtra interactive district map showing coverage networks"
                role="img"
              >
                <defs>
                  {/* Subtle soft glow gradient on major hubs */}
                  <radialGradient id="hubGlowGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="hsl(var(--accent) / 0.18)" />
                    <stop offset="100%" stopColor="transparent" />
                  </radialGradient>
                  
                  {/* Gradient for gold route lines */}
                  <linearGradient id="routeLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="hsl(var(--accent) / 0.7)" />
                    <stop offset="100%" stopColor="hsl(var(--accent-hi) / 0.3)" />
                  </linearGradient>
                </defs>

                {/* A. Base Layer: Districts vector polygons */}
                <g className="districts-layer">
                  {geoData?.features && Array.isArray(geoData.features) ? (
                    geoData.features.map((feat: GeoFeature, i: number) => {
                      const featName = feat.properties?.district || feat.properties?.NAME_2 || "";
                      const normalizedFeatName = normalizeDistrictName(featName);
                      
                      const isHovered = hoveredDistrict && normalizeDistrictName(hoveredDistrict) === normalizedFeatName;

                      return (
                        <motion.path
                          key={featName || i}
                          d={getPathData(feat.geometry)}
                          fill={isHovered ? "hsl(var(--accent) / 0.16)" : "hsl(var(--surface-1) / 0.25)"}
                          stroke={isHovered ? "hsl(var(--accent) / 0.6)" : "hsl(var(--stroke) / 0.65)"}
                          strokeWidth={isHovered ? "1.4" : "0.75"}
                          className="transition-all duration-300 cursor-pointer"
                          onMouseEnter={() => setHoveredDistrict(featName)}
                          onMouseLeave={() => setHoveredDistrict(null)}
                          initial={reduce ? false : { opacity: 0 }}
                          animate={reduce ? { opacity: 1 } : { opacity: 1 }}
                          transition={{ duration: 0.35, delay: i * 0.008 }}
                        />
                      );
                    })
                  ) : null}
                </g>

                {/* B. Premium Overlay: Transit Connection route lines */}
                <g className="routes-layer pointer-events-none">
                  {TRANSIT_ROUTES.map((route, idx) => {
                    const start = getHubCoords(route.from);
                    const end = getHubCoords(route.to);
                    if (!start || !end) return null;

                    // Draw perpendicular quadratic bezier curve for aviation/cinema overlay style
                    const midX = (start[0] + end[0]) / 2;
                    const midY = (start[1] + end[1]) / 2;
                    const dx = end[0] - start[0];
                    const dy = end[1] - start[1];
                    const length = Math.sqrt(dx * dx + dy * dy);
                    
                    // Offset distance (curving slightly)
                    const offsetScale = 16; 
                    const offsetX = (-dy / length) * offsetScale;
                    const offsetY = (dx / length) * offsetScale;

                    const ctrlX = midX + offsetX;
                    const ctrlY = midY + offsetY;

                    const pathD = `M${start[0]},${start[1]} Q${ctrlX},${ctrlY} ${end[0]},${end[1]}`;

                    return (
                      <motion.path
                        key={idx}
                        d={pathD}
                        fill="none"
                        stroke="url(#routeLineGrad)"
                        strokeWidth="1.35"
                        strokeDasharray="4 4"
                        initial={reduce ? false : { pathLength: 0, opacity: 0 }}
                        whileInView={reduce ? undefined : { pathLength: 1, opacity: 0.85 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 + idx * 0.05 }}
                      />
                    );
                  })}
                </g>

                {/* C. Major Network Hub Points */}
                <g className="hubs-layer pointer-events-none">
                  {NETWORK_HUBS.map((hub) => {
                    const coords = project([hub.lon, hub.lat]);
                    const isHubHovered = hoveredDistrict && normalizeDistrictName(hoveredDistrict).includes(normalizeDistrictName(hub.name));

                    return (
                      <g key={hub.name}>
                        {/* Glow hub gradient backing */}
                        <circle
                          cx={coords[0]}
                          cy={coords[1]}
                          r="25"
                          fill="url(#hubGlowGrad)"
                        />

                        {/* Subtle pulsing glow ring */}
                        {hub.pulse && !reduce && (
                          <motion.circle
                            cx={coords[0]}
                            cy={coords[1]}
                            r={hub.r * 2.3}
                            fill="none"
                            stroke="hsl(var(--accent) / 0.55)"
                            strokeWidth="0.5"
                            animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
                            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                          />
                        )}

                        {/* Core hub point */}
                        <circle
                          cx={coords[0]}
                          cy={coords[1]}
                          r={hub.r}
                          fill={isHubHovered ? "hsl(var(--accent))" : "hsl(var(--background))"}
                          stroke="hsl(var(--accent))"
                          strokeWidth="1.5"
                          className="transition-colors duration-250"
                        />

                        {/* Hub labels */}
                        <text
                          x={coords[0]}
                          y={coords[1] - hub.r - 5}
                          textAnchor="middle"
                          className="font-display text-[7.5px] font-bold tracking-wider fill-ivory/80 select-none uppercase pointer-events-none"
                        >
                          {hub.name.replace(" (HQ)", "")}
                        </text>
                      </g>
                    );
                  })}
                </g>
              </svg>
            ) : (
              <div className="flex flex-col items-center gap-2 text-faint">
                <ShieldAlert className="h-8 w-8 text-accent/50" />
                <div className="text-xs">Offline dataset not loaded.</div>
              </div>
            )}
          </div>

          {/* Floating Tooltip inside container */}
          {hoveredDistrict && (
            <div
              className="absolute z-30 pointer-events-none rounded border border-accent/25 bg-background/95 px-3.5 py-2 text-xs font-bold text-ivory shadow-lg flex items-center gap-1.5 backdrop-blur-sm"
              style={{
                left: mousePos.x + 16,
                top: mousePos.y - 12,
              }}
            >
              <MapPin className="h-3.5 w-3.5 text-accent animate-pulse" />
              <span>{hoveredDistrict}</span>
            </div>
          )}

          {/* Bottom legend row */}
          <div className="border-t border-stroke pt-4 mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-faint">
            <span>District boundaries derived from verified GeoJSON shapefiles representing statewide network reach.</span>
            <div className="flex items-center gap-5 shrink-0">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-accent" />
                <span>Major Division Hub</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-px w-5 border-t border-accent/60 border-dashed animate-pulse" />
                <span>Transit Route overlay</span>
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* ─── Bottom: Showcase Wide District Directory Directory (Below Map) ─── */}
      <div className="mt-10 flex flex-col gap-6 w-full">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stroke pb-4">
          <div>
            <h3 className="font-display text-[18px] font-bold text-ivory">Statewide District Directory</h3>
            <p className="text-caption text-faint mt-1">Select or hover a district card to isolate network coverage boundaries on the visualizer.</p>
          </div>
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search 36 districts..."
              className="w-full rounded-md border border-stroke bg-surface-1/70 py-2.5 pl-10 pr-4 text-body-sm text-ivory placeholder:text-faint focus:border-accent/50 focus:outline-none transition-colors"
            />
          </div>
        </div>

        <Reveal delay={80}>
          <div className="rounded-lg border border-stroke bg-surface-1/30 overflow-hidden w-full">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-px bg-stroke/40">
              {filteredDistricts.map((d) => {
                const isHovered = hoveredDistrict && normalizeDistrictName(hoveredDistrict) === normalizeDistrictName(d.name);
                
                return (
                  <div
                    key={d.name}
                    onMouseEnter={() => setHoveredDistrict(d.name)}
                    onMouseLeave={() => setHoveredDistrict(null)}
                    className={cn(
                      "flex items-center gap-2.5 bg-background px-4 py-3.5 text-caption transition-all duration-200 cursor-pointer select-none border-b border-r border-transparent hover:bg-surface-1/40",
                      isHovered ? "bg-surface-2 text-ivory font-bold border-l-2 border-accent" : "text-muted-2"
                    )}
                  >
                    <MapPin className={cn("h-3.5 w-3.5 shrink-0 transition-colors", isHovered ? "text-accent animate-pulse" : "text-faint")} strokeWidth={1.5} />
                    <span className="truncate">{d.name}</span>
                  </div>
                );
              })}
              {filteredDistricts.length === 0 && (
                <div className="col-span-full bg-background px-4 py-12 text-center text-caption text-faint">
                  No districts match "{query}"
                </div>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
};

export default MaharashtraCoverage;
