import { motion, useReducedMotion } from "framer-motion";
import { easePremium } from "@/lib/motion";

interface Props {
  value: string;
  className?: string;
}

const Counter = ({ value, className }: Props) => {
  const reduce = useReducedMotion();

  return (
    <motion.span
      className={className}
      initial={reduce ? false : { opacity: 0, y: 10, scale: 0.98 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.45, ease: easePremium }}
    >
      {value}
    </motion.span>
  );
};

export default Counter;
