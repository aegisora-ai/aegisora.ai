import type { AegisoraPlugin } from "../types/plugin";

import { PluginRegistry } from "../registry/plugin-registry";

export class PluginLoader {
  constructor(private registry: PluginRegistry) {}

  async load(plugin: AegisoraPlugin) {
    this.registry.register(plugin);

    if (plugin.initialize) {
      await plugin.initialize();
    }
  }
}
