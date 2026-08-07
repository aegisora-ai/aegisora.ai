import type {
  RuntimeMiddleware,
  RuntimeMiddlewareContext,
} from "../types/middleware";

export class MiddlewareManager {
  private middlewares: RuntimeMiddleware[] = [];

  register(middleware: RuntimeMiddleware) {
    this.middlewares.push(middleware);
  }

  async execute(
    context: RuntimeMiddlewareContext,
  ): Promise<RuntimeMiddlewareContext> {
    let current = context;

    for (const middleware of this.middlewares) {
      current = await middleware.execute(current);
    }

    return current;
  }

  list() {
    return this.middlewares.map((x) => x.name);
  }
}
