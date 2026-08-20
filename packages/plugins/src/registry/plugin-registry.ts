import type {
  AegisoraPlugin,
  PluginContext,
  PluginPermission,
} from "../types/plugin";

export class PluginRegistry {
  private readonly plugins = new Map<string, AegisoraPlugin>();
  private readonly contexts = new Map<string, PluginContext>();

  register(plugin: AegisoraPlugin): PluginContext {
    this.validate(plugin);

    if (this.plugins.has(plugin.name)) {
      throw new Error(`Plugin already registered: ${plugin.name}`);
    }

    const permissions = [...new Set(plugin.permissions ?? [])] as PluginPermission[];
    const context: PluginContext = Object.freeze({
      pluginName: plugin.name,
      pluginVersion: plugin.version,
      permissions: Object.freeze(permissions),
    });

    this.plugins.set(plugin.name, plugin);
    this.contexts.set(plugin.name, context);
    return context;
  }

  get(name: string): AegisoraPlugin | undefined {
    return this.plugins.get(name);
  }

  getContext(name: string): PluginContext | undefined {
    return this.contexts.get(name);
  }

  list(): AegisoraPlugin[] {
    return [...this.plugins.values()];
  }

  has(name: string): boolean {
    return this.plugins.has(name);
  }

  async unregister(name: string): Promise<boolean> {
    const plugin = this.plugins.get(name);
    if (!plugin) return false;

    if (plugin.destroy) {
      await plugin.destroy();
    }

    this.plugins.delete(name);
    this.contexts.delete(name);
    return true;
  }

  private validate(plugin: AegisoraPlugin): void {
    if (!plugin.name?.trim()) {
      throw new Error("Plugin name is required");
    }

    if (!plugin.version?.trim()) {
      throw new Error(`Plugin version is required: ${plugin.name}`);
    }

    if (!["SECURITY", "POLICY", "INTEGRATION", "OBSERVABILITY"].includes(plugin.type)) {
      throw new Error(`Invalid plugin type: ${plugin.type}`);
    }
  }
}
