import type {
  RuntimeMiddleware,
  RuntimeMiddlewareContext,
} from "../types/middleware";

export class PluginsMiddleware implements RuntimeMiddleware {
  name = "plugins";

  async execute(
    context: RuntimeMiddlewareContext,
  ): Promise<RuntimeMiddlewareContext> {
    context.signals.push("PLUGINS_EXECUTED");

    return context;
  }
}
