import type { SecurityAnalyzer } from "./base-analyzer";

import type { SecurityContext, ThreatSignal } from "../types/security";

export class PromptInjectionAnalyzer implements SecurityAnalyzer {
  name = "prompt-injection-detector";

  analyze(context: SecurityContext): ThreatSignal | null {
    const input = String(context.input ?? "").toLowerCase();

    const patterns = [
      "ignore previous instructions",

      "system prompt",

      "developer message",

      "reveal your instructions",
    ];

    const detected = patterns.some((pattern) => input.includes(pattern));

    if (!detected) {
      return null;
    }

    return {
      type: "PROMPT_INJECTION",

      severity: "HIGH",

      description: "Potential prompt injection attempt detected.",

      score: 80,
    };
  }
}
