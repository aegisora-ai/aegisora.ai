import type { SecurityAnalyzer } from "./base-analyzer";
import type { SecurityContext, ThreatSignal } from "../types/security";
import {
  EMAIL_PATTERN,
  PARTIAL_SSN_PATTERN,
  PHONE_PATTERN,
  SSN_PATTERN,
} from "../patterns/pii-patterns";

export interface PIIRuleDefinition {
  label: string;
  patterns: RegExp[];
  score: number;
}

export const DEFAULT_PII_RULES: readonly PIIRuleDefinition[] = [
  {
    label: "Social Security Number (SSN/partial SSN)",
    patterns: [SSN_PATTERN, PARTIAL_SSN_PATTERN],
    score: 70,
  },
  {
    label: "email address",
    patterns: [EMAIL_PATTERN],
    score: 40,
  },
  {
    label: "phone number",
    patterns: [PHONE_PATTERN],
    score: 40,
  },
];

/**
 * PIIDetector implements the Strategy / Rule Matcher Pattern for extensible,
 * declarative PII analysis and severity scoring across incoming agent inputs.
 */
export class PIIDetector implements SecurityAnalyzer {
  public readonly name = "pii-detector";
  private readonly rules: readonly PIIRuleDefinition[];

  constructor(rules: readonly PIIRuleDefinition[] = DEFAULT_PII_RULES) {
    this.rules = rules;
  }

  analyze(context: SecurityContext): ThreatSignal | null {
    const input = String(context.input ?? "");
    if (!input) {
      return null;
    }

    const detectedLabels: string[] = [];
    let maxScore = 0;

    for (const rule of this.rules) {
      const isMatched = rule.patterns.some((pattern) => {
        // Reset lastIndex for stateful global regexes
        pattern.lastIndex = 0;
        return pattern.test(input);
      });

      if (isMatched) {
        detectedLabels.push(rule.label);
        maxScore = Math.max(maxScore, rule.score);
      }
    }

    if (detectedLabels.length === 0) {
      return null;
    }

    return {
      type: "PII_EXPOSURE",
      severity: maxScore >= 70 ? "HIGH" : "MEDIUM",
      description: `Potential PII detected: ${detectedLabels.join(", ")}.`,
      score: maxScore,
    };
  }
}
