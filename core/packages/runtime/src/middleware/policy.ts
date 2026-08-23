import type {
  RuntimeMiddleware,
  RuntimeMiddlewareContext,
} from "../types/middleware";

export class PolicyMiddleware implements RuntimeMiddleware {
  name = "policy";

  async execute(
    context: RuntimeMiddlewareContext,
  ): Promise<RuntimeMiddlewareContext> {
    context.signals.push("POLICY_CHECKED");

    return context;
  }
}
