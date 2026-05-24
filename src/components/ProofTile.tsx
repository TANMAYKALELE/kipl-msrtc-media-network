import { motion, useReducedMotion } from "framer-motion";
import { cardHover } from "@/lib/motion";

interface Props {
  src: string;
  alt: string;
  caption: string;
  tag?: string;
  className?: string;
  imgClassName?: string;
}

const ProofTile = ({ src, alt, caption, tag, className = "", imgClassName = "" }: Props) => {
  const reduce = useReducedMotion();
  return (
    <motion.figure
      whileHover={reduce ? undefined : cardHover}
      className={`group flex h-full flex-col ${className}`}
    >
      <div className="relative flex-1 overflow-hidden rounded-sm border border-stroke bg-surface-1 aspect-[16/10]">
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className={`h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] ${imgClassName}`}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_35%,hsl(var(--background)/0.72))]" />
        <div aria-hidden className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/[0.04]" />
      </div>
      <figcaption className="pt-4">
        {tag && <div className="label-amber">{tag}</div>}
        <div className="mt-2 text-[14px] leading-snug text-ivory">{caption}</div>
      </figcaption>
    </motion.figure>
  );
};

export default ProofTile;
