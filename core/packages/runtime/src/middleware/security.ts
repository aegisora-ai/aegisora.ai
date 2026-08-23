import type {
  RuntimeMiddleware,
  RuntimeMiddlewareContext,
} from "../types/middleware";

export class SecurityMiddleware implements RuntimeMiddleware {
  name = "security";

  async execute(
    context: RuntimeMiddlewareContext,
  ): Promise<RuntimeMiddlewareContext> {
    if (context.riskScore >= 90) {
      return {
        ...context,

        blocked: true,

        signals: [...context.signals, "HIGH_SECURITY_RISK"],
      };
    }

    return context;
  }
}
