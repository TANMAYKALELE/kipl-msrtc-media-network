import { type ElementType, type ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { blurReveal, fadeUp, viewportReveal } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface Props {
  children: ReactNode;
  delay?: number;
  as?: ElementType;
  className?: string;
  variant?: "fadeUp" | "blur";
  once?: boolean;
}

const motionTags = {
  div: motion.div,
  section: motion.section,
  article: motion.article,
  li: motion.li,
  span: motion.span,
  figure: motion.figure,
} as const;

const Reveal = ({ children, delay = 0, as = "div", className, variant = "fadeUp", once = true }: Props) => {
  const reduce = useReducedMotion();
  const Tag = motionTags[as as keyof typeof motionTags] ?? motion.div;
  const base = variant === "blur" ? blurReveal : fadeUp;
  const variants: Variants = reduce
    ? { hidden: { opacity: 1, y: 0, filter: "none" }, visible: { opacity: 1, y: 0, filter: "none" } }
    : {
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
      className={cn("will-change-transform", className)}
    >
      {children}
    </Tag>
  );
};

export default Reveal;
