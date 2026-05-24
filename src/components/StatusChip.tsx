import { cn } from "@/lib/utils";

export type Status = "live" | "soon" | "clearance" | "phases";

const MAP: Record<Status, { label: string; cls: string }> = {
  live: { label: "LIVE NOW", cls: "text-status-live ring-status-live/35 bg-status-live/10" },
  soon: { label: "LAUNCHING SOON", cls: "text-status-soon ring-status-soon/35 bg-status-soon/10" },
  clearance: {
    label: "SUBJECT TO CLEARANCE / FLEET ROLLOUT",
    cls: "text-status-pending ring-status-pending/35 bg-status-pending/10",
  },
  phases: { label: "COMING IN PHASES", cls: "text-status-fleet ring-status-fleet/35 bg-status-fleet/10" },
};

export const StatusChip = ({ status, className }: { status: Status; className?: string }) => {
  const m = MAP[status];
  return (
    <span className={cn(
      "inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] ring-1 ring-inset whitespace-nowrap",
      m.cls, className,
    )}>
      <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-current" />
      {m.label}
    </span>
  );
};

export default StatusChip;
