import type { AegisoraPlugin } from "../types/plugin";

export class PluginRegistry {
  private plugins: Map<string, AegisoraPlugin> = new Map();

  register(plugin: AegisoraPlugin): void {
    this.plugins.set(plugin.name, plugin);
  }

  unregister(name: string): boolean {
    return this.plugins.delete(name);
  }

  get(name: string): AegisoraPlugin | undefined {
    return this.plugins.get(name);
  }

  has(name: string): boolean {
    return this.plugins.has(name);
  }

  list(): AegisoraPlugin[] {
    return [...this.plugins.values()];
  }
}
