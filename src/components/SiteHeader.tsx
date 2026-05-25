import { useEffect, useMemo, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
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
  const rafId = useRef(0);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      rafId.current = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 12);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const headerStyle = useMemo(() => ({
    maxWidth: "1480px",
    height: scrolled ? "56px" : "62px",
    background: scrolled ? "hsl(var(--surface-1) / 0.92)" : "hsl(var(--surface-1) / 0.62)",
    borderColor: scrolled ? "hsl(var(--stroke-strong) / 0.9)" : "hsl(var(--stroke) / 0.6)",
    backdropFilter: "blur(12px) saturate(130%)",
    WebkitBackdropFilter: "blur(12px) saturate(130%)",
    transition: "height 0.28s cubic-bezier(0.22,1,0.36,1), background 0.28s ease, border-color 0.28s ease",
  }), [scrolled]);

  const headerShadow = useMemo(() => ({
    boxShadow: scrolled ? "0 16px 48px rgba(0,0,0,0.28)" : "0 8px 32px rgba(0,0,0,0.14)",
  }), [scrolled]);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-4 z-50 px-4 sm:px-6">
      <div
        className="pointer-events-auto mx-auto flex items-center justify-between gap-5 rounded-md border px-4 sm:px-5"
        style={{ ...headerStyle, ...headerShadow }}
      >
        <Link to="/" className="flex items-center gap-3 min-w-0">
          <img src={kiplLogo} alt="KIPL" className="h-6 sm:h-7 w-auto shrink-0" />
          <span className="h-6 sm:h-7 w-px bg-stroke-strong/70" />
          <img src={msrtcLogo} alt="MSRTC" className="h-8 sm:h-9 w-auto shrink-0 object-contain" />
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
                "group relative flex items-center gap-1.5 py-1 text-[11.5px] font-semibold uppercase tracking-[0.16em] transition-colors duration-200",
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
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.2, ease: easePremium } }}
            exit={{ opacity: 0, y: -8, transition: { duration: 0.15, ease: easePremium } }}
            className="pointer-events-auto mx-auto mt-2 rounded-md border border-stroke-strong/70 bg-surface-1/95 backdrop-blur-lg"
            style={{ maxWidth: "1480px" }}
          >
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
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default SiteHeader;
