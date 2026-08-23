import type { AgentRequest } from "@aegisora/core";

export class RequestValidator {
  validate(request: AgentRequest): boolean {
    if (!request.agentId) {
      throw new Error("Agent ID is required");
    }

    if (!request.action) {
      throw new Error("Action is required");
    }

    return true;
  }
}
