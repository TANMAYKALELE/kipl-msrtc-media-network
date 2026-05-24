import type { Variants } from "framer-motion";

export const easePremium = [0.22, 1, 0.36, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.62, ease: easePremium } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: easePremium } },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.08 } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.56, ease: easePremium } },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -28 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.62, ease: easePremium } },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 28 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.62, ease: easePremium } },
};

export const blurReveal: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.72, ease: easePremium },
  },
};

export const pageTransition: Variants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.32, ease: easePremium } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2, ease: easePremium } },
};

export const viewportReveal = {
  once: true,
  amount: 0.16,
  margin: "0px 0px -72px 0px",
} as const;

export const cardHover = {
  y: -6,
  scale: 1.01,
  transition: { duration: 0.22, ease: easePremium },
};

export const buttonHover = {
  y: -2,
  transition: { duration: 0.18, ease: easePremium },
};

export const reducedMotionSafe = <T>(enabled: boolean, value: T, fallback: T) => (enabled ? fallback : value);
