import Reveal from "./Reveal";
import { cn } from "@/lib/utils";

interface Props {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  onDark?: boolean;
  className?: string;
}

const SectionHeading = ({ eyebrow, title, subtitle, align = "left", className }: Props) => {
  return (
    <Reveal className={cn("max-w-3xl", align === "center" && "text-center mx-auto", className)}>
      {eyebrow && <div className="label-amber">{eyebrow}</div>}
      <h2 className="mt-4 h-section text-ivory">{title}</h2>
      {subtitle && <p className="mt-5 lede max-w-2xl">{subtitle}</p>}
    </Reveal>
  );
};

export default SectionHeading;
