import { motion, useReducedMotion } from "framer-motion";
import { cardHover } from "@/lib/motion";

interface Props { n: string; title: string; desc: string; }

const StepCard = ({ n, title, desc }: Props) => {
  const reduce = useReducedMotion();
  return (
    <motion.li
      whileHover={reduce ? undefined : cardHover}
      className="card-surface group p-7 list-none"
    >
      <div className="flex items-baseline gap-4">
        <span className="font-display text-[28px] font-bold tnum text-accent leading-none">{n}</span>
        <span className="h-px flex-1 bg-stroke" />
      </div>
      <h3 className="mt-6 h-card text-ivory text-base">{title}</h3>
      <p className="mt-2 text-caption leading-relaxed text-muted-2">{desc}</p>
    </motion.li>
  );
};

export default StepCard;
