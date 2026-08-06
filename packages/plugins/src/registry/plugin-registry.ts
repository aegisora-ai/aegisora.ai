import type { AegisoraPlugin } from "../types/plugin";

export class PluginRegistry {
  private plugins: Map<string, AegisoraPlugin> = new Map();

  register(plugin: AegisoraPlugin) {
    this.plugins.set(plugin.name, plugin);
  }

  get(name: string) {
    return this.plugins.get(name);
  }

  list() {
    return [...this.plugins.values()];
  }
}
