import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { NAV_LINKS, COMPANY_NAV } from "@/lib/site";
import { cn } from "@/lib/utils";
import { buttonHover, easePremium } from "@/lib/motion";
import kiplLogo from "@/assets/kipl-logo.png";
import msrtcLogo from "@/assets/msrtc-logo.png";

const SiteHeader = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-4 z-50 px-4 sm:px-6">
      <motion.div
        className="pointer-events-auto mx-auto flex items-center justify-between gap-5 rounded-md border px-4 sm:px-5"
        animate={{
          y: scrolled ? 0 : 0,
          boxShadow: scrolled ? "0 18px 60px rgba(0,0,0,0.32)" : "0 10px 40px rgba(0,0,0,0.16)",
        }}
        transition={{ duration: 0.28, ease: easePremium }}
        style={{
          maxWidth: "1480px",
          height: scrolled ? "58px" : "62px",
          background: scrolled ? "hsl(var(--surface-1) / 0.9)" : "hsl(var(--surface-1) / 0.62)",
          borderColor: scrolled ? "hsl(var(--stroke-strong) / 0.9)" : "hsl(var(--stroke) / 0.6)",
          backdropFilter: "blur(18px) saturate(140%)",
          WebkitBackdropFilter: "blur(18px) saturate(140%)",
        }}>
        <Link to="/" className="flex items-center gap-3 min-w-0">
          <img src={kiplLogo} alt="KIPL" className="h-7 w-auto shrink-0" />
          <span className="hidden sm:block h-7 w-px bg-stroke-strong/70" />
          <img src={msrtcLogo} alt="MSRTC" className="hidden sm:block h-9 w-auto shrink-0 object-contain" />
          <span className="hidden sm:block h-7 w-px bg-stroke-strong/70" />
          <span className="hidden sm:flex flex-col leading-none">
            <span className="font-display text-[13.5px] font-bold tracking-tight text-ivory">MSRTC Media Network</span>
            <span className="mt-0.5 text-[9.5px] font-semibold uppercase tracking-[0.22em] text-faint">Implemented by KIPL</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-7" aria-label="Primary">
          {[...NAV_LINKS, ...COMPANY_NAV].map((l) => (
            <NavLink key={l.to} to={l.to}
              className={({ isActive }) => cn(
                "group relative flex items-center gap-1.5 py-1 text-[11.5px] font-semibold uppercase tracking-[0.16em] transition-colors",
                isActive ? "text-ivory" : "text-foreground/80 hover:text-ivory",
              )}>
              {({ isActive }) => (
                <>
                  {isActive && <span className="h-1 w-1 rounded-full bg-accent" />}
                  <span>{l.label}</span>
                  <span
                    aria-hidden
                    className={cn(
                      "pointer-events-none absolute -bottom-0.5 left-0 h-px bg-accent transition-all duration-200",
                      isActive ? "w-full opacity-100" : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100",
                    )}
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <motion.div whileHover={reduce ? undefined : buttonHover} whileTap={reduce ? undefined : { scale: 0.98 }}>
            <Button asChild size="sm" className="hidden sm:inline-flex h-9 rounded-md bg-accent text-accent-foreground hover:bg-accent/90 font-semibold cta-shine px-4 text-[12px] tracking-wide">
              <Link to="/get-media-plan">Get My Media Plan</Link>
            </Button>
          </motion.div>
          <button type="button" className="lg:hidden inline-flex h-9 w-9 items-center justify-center rounded-md border border-stroke text-ivory"
            aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </motion.div>

      {open && (
        <div className="pointer-events-auto mx-auto mt-2 rounded-md border border-stroke-strong/70 bg-surface-1/95 backdrop-blur-xl animate-fade-in" style={{ maxWidth: "1480px" }}>
          <nav className="flex flex-col gap-1 p-4" aria-label="Mobile">
            {[...NAV_LINKS, ...COMPANY_NAV].map((l) => (
              <NavLink key={l.to} to={l.to}
                className={({ isActive }) => cn(
                  "rounded-sm px-3 py-3 text-[12px] font-semibold uppercase tracking-[0.16em]",
                  isActive ? "text-ivory bg-surface-2" : "text-muted-2 hover:bg-surface-2 hover:text-ivory",
                )}>
                {l.label}
              </NavLink>
            ))}
            <Button asChild className="mt-2 bg-accent text-accent-foreground hover:bg-accent/90 font-semibold cta-shine">
              <Link to="/get-media-plan">Get My Media Plan</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default SiteHeader;
