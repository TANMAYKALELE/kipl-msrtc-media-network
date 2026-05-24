import { useReducedMotion } from "framer-motion";
import { useCountUp, parseDisplayValue } from "@/hooks/useCountUp";

interface Props {
  value: string;
  label: string;
  className?: string;
  duration?: number;
}

const Counter = ({ value, label, className = "", duration = 1400 }: Props) => {
  const reduce = useReducedMotion();
  const parsed = parseDisplayValue(value);

  const { ref, display } = useCountUp({
    end: parsed.end,
    suffix: parsed.suffix,
    prefix: parsed.prefix,
    decimals: parsed.decimals,
    indianFormat: parsed.indianFormat,
    duration,
    reducedMotion: !!reduce,
  });

  return (
    <div className={`flex flex-col items-center text-center ${className}`}>
      <span
        ref={ref as React.RefObject<HTMLSpanElement>}
        className="stat-value text-[28px] lg:text-[34px]"
      >
        {display}
      </span>
      <span className="stat-label mt-2">{label}</span>
    </div>
  );
};

export default Counter;
