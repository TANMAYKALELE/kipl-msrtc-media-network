import type { Variants } from "framer-motion";

/* ─── easing ─── */
export const easePremium = [0.22, 1, 0.36, 1] as const;
export const easeSnappy = [0.25, 0.46, 0.45, 0.94] as const;

/* ─── core reveal variants ─── */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: easePremium } },
};

export const subtleFadeUp: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: easePremium } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.45, ease: easePremium } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: easePremium } },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: easePremium } },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: easePremium } },
};

/* ─── stagger containers ─── */
export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.06 } },
};

export const listReveal: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.04 } },
};

/* ─── section-level reveals ─── */
export const sectionReveal: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easePremium } },
};

export const timelineReveal: Variants = {
  hidden: { opacity: 0, x: -16 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: easePremium } },
};

/* ─── page transitions ─── */
export const pageTransition: Variants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.28, ease: easePremium } },
  exit: { opacity: 0, transition: { duration: 0.12, ease: easeSnappy } },
};

/* ─── viewport observer config ─── */
export const viewportReveal = {
  once: true,
  amount: 0.18,
  margin: "0px 0px -60px 0px",
} as const;

/* ─── interaction states ─── */
export const cardHover = {
  y: -5,
  transition: { duration: 0.22, ease: easePremium },
};

export const cardHoverReset = {
  y: 0,
  transition: { duration: 0.22, ease: easePremium },
};

export const buttonHover = {
  y: -2,
  transition: { duration: 0.16, ease: easePremium },
};

/* ─── helpers ─── */
export const reducedMotionSafe = <T>(enabled: boolean, value: T, fallback: T) => (enabled ? fallback : value);

/** Return static variants when reduced-motion is active */
export const safeVariants = (reduce: boolean | null, variants: Variants): Variants | undefined => {
  if (reduce) return undefined;
  return variants;
};
