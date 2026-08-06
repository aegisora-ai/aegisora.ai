import type { PolicyContext, PolicyEvaluation } from "../types/policy";

export interface PolicyRule {
  name: string;

  evaluate(context: PolicyContext): PolicyEvaluation | null;
}
