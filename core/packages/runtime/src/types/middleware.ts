import type { AgentRequest } from "@aegisora/core";

export interface RuntimeMiddlewareContext {
  request: AgentRequest;

  requestId: string;

  metadata: Record<string, unknown>;

  blocked: boolean;

  riskScore: number;

  signals: string[];
}

export interface RuntimeMiddleware {
  name: string;

  execute(context: RuntimeMiddlewareContext): Promise<RuntimeMiddlewareContext>;
}
