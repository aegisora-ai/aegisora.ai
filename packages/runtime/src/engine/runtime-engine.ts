import type { AgentRequest, PolicyResult } from "@aegisora/core";

import { RequestValidator } from "../services/request-validator";

export class AegisoraRuntime {
  private validator: RequestValidator;

  constructor() {
    this.validator = new RequestValidator();
  }

  async execute(request: AgentRequest): Promise<PolicyResult> {
    this.validator.validate(request);

    return {
      decision: "ALLOW",

      reason: "Request passed initial runtime checks",

      riskScore: 0,
    };
  }
}
