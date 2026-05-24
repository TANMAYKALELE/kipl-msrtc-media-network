import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Reveal from "./Reveal";
import { buttonHover } from "@/lib/motion";

interface Props {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  primaryLabel?: string;
  secondary?: { to: string; label: string };
}

const CTABanner = ({
  eyebrow = "One Agency. One Contract. Entire Maharashtra.",
  title = "Get Your Maharashtra Advertising Plan",
  subtitle = "Tell us your target city, budget, and campaign goal — we'll send a tailored plan back.",
  primaryLabel = "Build My Media Plan",
  secondary,
}: Props) => {
  const reduce = useReducedMotion();
  return (
  <section className="container-page-wide section-y-sm">
    <div className="premium-panel route-sheen px-8 py-20 sm:px-16 sm:py-24">
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent" />
      <div aria-hidden className="absolute inset-0 route-grid opacity-15" />
      <Reveal className="relative grid gap-10 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <div className="label-amber">{eyebrow}</div>
          <h2 className="mt-5 h-section text-ivory">{title}</h2>
          <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-muted-2">{subtitle}</p>
        </div>
        <div className="lg:col-span-4 flex flex-wrap gap-3 lg:justify-end">
          <motion.div whileHover={reduce ? undefined : buttonHover} whileTap={reduce ? undefined : { scale: 0.98 }}>
            <Button asChild size="lg" className="rounded-sm bg-accent text-accent-foreground hover:bg-accent/90 font-semibold cta-shine accent-glow">
              <Link to="/get-media-plan">{primaryLabel} <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </motion.div>
          {secondary && (
            <motion.div whileHover={reduce ? undefined : buttonHover}>
              <Button asChild size="lg" variant="outline" className="rounded-sm border-stroke-strong bg-transparent text-ivory hover:bg-surface-2 hover:text-ivory">
                <Link to={secondary.to}>{secondary.label}</Link>
              </Button>
            </motion.div>
          )}
        </div>
      </Reveal>
    </div>
  </section>
  );
};

export default CTABanner;
