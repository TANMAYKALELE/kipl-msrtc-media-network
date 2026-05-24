import type { LucideIcon } from "lucide-react";
import StatusChip, { type Status } from "@/components/StatusChip";

interface Props { icon: LucideIcon; title: string; status: Status; desc: string; }

const SolutionCard = ({ icon: Icon, title, status, desc }: Props) => (
  <article tabIndex={0} className="card-surface group relative p-8 outline-none focus-visible:border-accent/50">
    <div className="flex items-start justify-between gap-4">
      <div className="grid h-10 w-10 place-items-center rounded-sm bg-accent/10 text-accent ring-1 ring-accent/15">
        <Icon className="h-4.5 w-4.5" strokeWidth={1.5} />
      </div>
      <StatusChip status={status} />
    </div>
    <h3 className="mt-8 h-card text-ivory">{title}</h3>
    <p className="mt-3 text-[14px] leading-relaxed text-muted-2">{desc}</p>
  </article>
);

export default SolutionCard;
