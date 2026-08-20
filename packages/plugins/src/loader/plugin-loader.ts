import type { AegisoraPlugin } from "../types/plugin";

import { PluginRegistry } from "../registry/plugin-registry";

export class PluginLoader {
  constructor(
    private readonly registry: PluginRegistry,
  ) {}

  async load(plugin: AegisoraPlugin): Promise<void> {
    this.registry.register(plugin);

    try {
      if (plugin.initialize) {
        await plugin.initialize();
      }
    } catch (error) {
      this.registry.unregister(plugin.name);
      throw error;
    }
  }

  async unload(name: string): Promise<boolean> {
    const plugin = this.registry.get(name);

    if (!plugin) {
      return false;
    }

    if (plugin.destroy) {
      await plugin.destroy();
    }

    return this.registry.unregister(name);
  }
}
