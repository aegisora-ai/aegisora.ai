import type {
  RuntimeMiddleware,
  RuntimeMiddlewareContext,
} from "../types/middleware";

export class AuditMiddleware implements RuntimeMiddleware {
  name = "audit";

  async execute(
    context: RuntimeMiddlewareContext,
  ): Promise<RuntimeMiddlewareContext> {
    console.log("[Aegisora Audit]", {
      requestId: context.requestId,

      blocked: context.blocked,

      risk: context.riskScore,
    });

    return context;
  }
}
