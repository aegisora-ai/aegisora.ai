import type { PolicyContext, PolicyEvaluation } from "../types/policy";

import type { PolicyRule } from "../rules/base-rule";

export class PolicyEngine {
  private rules: PolicyRule[];

  constructor(rules: PolicyRule[] = []) {
    this.rules = rules;
  }

  async evaluate(context: PolicyContext): Promise<PolicyEvaluation> {
    for (const rule of this.rules) {
      const result = rule.evaluate(context);

      if (result) {
        return result;
      }
    }

    return {
      decision: "ALLOW",

      reason: "No policy violation detected",

      riskScore: 0,
    };
  }
}
