import { useCallback, useEffect, useRef, useState } from "react";

interface UseCountUpOptions {
  /** Target value to count up to */
  end: number;
  /** Suffix to append (e.g., "+", "M+", "%") */
  suffix?: string;
  /** Prefix to prepend (e.g., "₹") */
  prefix?: string;
  /** Duration in ms */
  duration?: number;
  /** Use Indian number formatting (e.g., 1,70,388) */
  indianFormat?: boolean;
  /** Number of decimal places */
  decimals?: number;
  /** Whether to use reduced motion (skip animation) */
  reducedMotion?: boolean;
}

function formatNumber(num: number, decimals: number, indianFormat: boolean): string {
  if (decimals > 0) {
    return num.toFixed(decimals);
  }
  const rounded = Math.round(num);
  if (indianFormat) {
    return formatIndian(rounded);
  }
  return rounded.toLocaleString("en-IN");
}

function formatIndian(n: number): string {
  const s = n.toString();
  if (s.length <= 3) return s;
  const last3 = s.slice(-3);
  const rest = s.slice(0, -3);
  const groups = rest.replace(/\B(?=(\d{2})+(?!\d))/g, ",");
  return groups + "," + last3;
}

/**
 * Parse a display string like "562+", "14,199+", "6.5M+", "1,70,388" into a numeric target and suffix
 */
export function parseDisplayValue(display: string): { end: number; suffix: string; prefix: string; decimals: number; indianFormat: boolean } {
  let suffix = "";
  let prefix = "";
  let decimals = 0;
  let indianFormat = false;
  let end = 0;

  const trimmed = display.trim();
  // Match any digits with commas/dots in between (e.g. 1,70,388 or 6.5 or 500)
  const match = trimmed.match(/([\d,]+(?:\.\d+)?)/);
  
  if (match && typeof match.index === "number") {
    const numStr = match[1];
    prefix = trimmed.slice(0, match.index);
    suffix = trimmed.slice(match.index + numStr.length);
    
    // Check for M/K multiplier in suffix
    let multiplier = 1;
    if (suffix.includes("M")) {
      multiplier = 1;  // Keep decimal as-is, display M suffix
    }

    // Check if Indian formatted (has multiple commas or typical pattern)
    if (numStr.includes(",")) {
      const cleanNum = numStr.replace(/,/g, "");
      const commaCount = (numStr.match(/,/g) || []).length;
      if (commaCount >= 2 || (commaCount === 1 && cleanNum.length > 4)) {
        indianFormat = true;
      }
    }
    
    // Detect decimals on the clean number string
    const dotIndex = numStr.indexOf(".");
    if (dotIndex >= 0) {
      decimals = numStr.length - dotIndex - 1;
    }
    
    const parsedNum = parseFloat(numStr.replace(/,/g, ""));
    end = (isNaN(parsedNum) ? 0 : parsedNum) * multiplier;
  } else {
    // Fallback if no digits found
    prefix = trimmed;
  }

  return { end, suffix, prefix, decimals, indianFormat };
}

export function useCountUp({
  end,
  suffix = "",
  prefix = "",
  duration = 1200,
  indianFormat = false,
  decimals = 0,
  reducedMotion = false,
}: UseCountUpOptions) {
  const [display, setDisplay] = useState(() =>
    reducedMotion ? `${prefix}${formatNumber(end, decimals, indianFormat)}${suffix}` : `${prefix}0${suffix}`
  );
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLElement>(null);

  const animate = useCallback(() => {
    if (hasAnimated || reducedMotion) return;
    setHasAnimated(true);

    const startTime = performance.now();
    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * end;
      setDisplay(`${prefix}${formatNumber(current, decimals, indianFormat)}${suffix}`);
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }, [end, suffix, prefix, duration, indianFormat, decimals, hasAnimated, reducedMotion]);

  useEffect(() => {
    if (reducedMotion) {
      setDisplay(`${prefix}${formatNumber(end, decimals, indianFormat)}${suffix}`);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animate();
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [animate, end, suffix, prefix, decimals, indianFormat, reducedMotion]);

  return { ref, display };
}
