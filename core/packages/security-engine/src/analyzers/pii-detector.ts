import type { SecurityAnalyzer } from "./base-analyzer";

import type { SecurityContext, ThreatSignal } from "../types/security";

export class PIIDetector implements SecurityAnalyzer {
  name = "pii-detector";

  analyze(context: SecurityContext): ThreatSignal | null {
    const input = String(context.input ?? "");

    const emailPattern = /\S+@\S+\.\S+/;

    if (emailPattern.test(input)) {
      return {
        type: "PII_EXPOSURE",

        severity: "MEDIUM",

        description: "Possible email address detected.",

        score: 40,
      };
    }

    return null;
  }
}
