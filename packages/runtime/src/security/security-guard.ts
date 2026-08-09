import {
  RuntimeEvent,
} from "../events";

export type SecurityDecision =
  | "allow"
  | "block";

export interface SecurityResult {
  decision: SecurityDecision;
  reason: string;
}

export class SecurityGuard {
  check(
    event: RuntimeEvent,
  ): SecurityResult {
    const payload =
      (event.payload as Record<string, unknown> | undefined) ?? {};

    const input = String(
      payload.input ?? "",
    );

    const normalized = input
      .toLowerCase()
      .replace(/\s+/g, " ")
      .trim();

    // --------------------------------------------------------
    // 1. Prompt injection detection
    // --------------------------------------------------------

    const promptInjectionPatterns = [
      /ignore\s+(all\s+)?previous\s+instructions/,
      /ignore\s+(the\s+)?system\s+prompt/,
      /reveal\s+(your\s+)?system\s+prompt/,
      /show\s+(me\s+)?your\s+system\s+prompt/,
      /disregard\s+(all\s+)?previous\s+instructions/,
      /override\s+(the\s+)?system\s+instructions/,
      /forget\s+(all\s+)?previous\s+instructions/,
    ];

    if (
      promptInjectionPatterns.some(
        (pattern) => pattern.test(normalized),
      )
    ) {
      return {
        decision: "block",
        reason: "Prompt injection attempt detected",
      };
    }

    // --------------------------------------------------------
    // 2. Sensitive-data exfiltration detection
    // --------------------------------------------------------

    const emailPattern =
      /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i;

    const transferPattern =
      /\b(send|forward|share|upload|exfiltrate|export|leak)\b/i;

    if (
      emailPattern.test(input) &&
      transferPattern.test(input)
    ) {
      return {
        decision: "block",
        reason:
          "Potential sensitive-data exfiltration detected",
      };
    }

    // --------------------------------------------------------
    // 3. Agent failure
    // --------------------------------------------------------

    if (event.type === "agent.failed") {
      return {
        decision: "block",
        reason: "Agent failure detected",
      };
    }

    // --------------------------------------------------------
    // 4. Default allow
    // --------------------------------------------------------

    return {
      decision: "allow",
      reason: "No security violation",
    };
  }
}
