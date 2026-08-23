import type { AegisoraPlugin } from "../types/plugin";
import { PluginRegistry } from "../registry/plugin-registry";

export class PluginLoader {
  constructor(private readonly registry: PluginRegistry) {}

  async load(plugin: AegisoraPlugin): Promise<void> {
    const context = this.registry.register(plugin);

    try {
      await plugin.initialize?.(context);
    } catch (error) {
      await this.registry.unregister(plugin.name).catch(() => undefined);
      throw new Error(
        `Failed to initialize plugin ${plugin.name}: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }

  async unload(name: string): Promise<boolean> {
    return this.registry.unregister(name);
  }
}
