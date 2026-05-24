import { type ElementType, type ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { fadeUp, subtleFadeUp, viewportReveal } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface Props {
  children: ReactNode;
  delay?: number;
  as?: ElementType;
  className?: string;
  variant?: "fadeUp" | "subtle";
  once?: boolean;
}

const motionTags = {
  div: motion.div,
  section: motion.section,
  article: motion.article,
  li: motion.li,
  span: motion.span,
  figure: motion.figure,
  p: motion.p,
  h2: motion.h2,
  h3: motion.h3,
} as const;

const Reveal = ({ children, delay = 0, as = "div", className, variant = "fadeUp", once = true }: Props) => {
  const reduce = useReducedMotion();
  const Tag = motionTags[as as keyof typeof motionTags] ?? motion.div;
  const base = variant === "subtle" ? subtleFadeUp : fadeUp;

  if (reduce) {
    // Render without animation for reduced-motion users
    const StaticTag = as === "div" ? "div" : (as as keyof JSX.IntrinsicElements);
    return <StaticTag className={className}>{children}</StaticTag>;
  }

  const variants: Variants = {
    hidden: base.hidden,
    visible: {
      ...(base.visible as object),
      transition: {
        ...((base.visible as { transition?: object }).transition ?? {}),
        delay: delay / 1000,
      },
    },
  };

  return (
    <Tag
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ ...viewportReveal, once }}
      className={className}
    >
      {children}
    </Tag>
  );
};

export default Reveal;
