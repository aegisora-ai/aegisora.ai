import type { SecurityContext, ThreatSignal } from "../types/security";

export interface SecurityAnalyzer {
  name: string;

  analyze(context: SecurityContext): ThreatSignal | null;
}
