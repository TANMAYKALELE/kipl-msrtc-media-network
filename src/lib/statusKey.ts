import type { InventoryStatus } from "@/lib/clientFacts";

/** Map inventory status label → CSS status key for StatusChip */
export function statusKey(s: InventoryStatus): "live" | "soon" | "clearance" | "phases" {
  if (s === "Live Now") return "live";
  if (s === "Launching Soon") return "soon";
  if (s === "Subject to Clearance / Fleet Rollout") return "clearance";
  return "phases";
}
