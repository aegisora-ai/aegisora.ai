import { Aegisora } from "./aegisora";
import type { ProtectableAgent, ProtectedAgent } from "./types";

export function protect(agent: ProtectableAgent): ProtectedAgent {
  return Aegisora.protect(agent);
}
