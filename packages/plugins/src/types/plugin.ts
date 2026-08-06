export type PluginType = "SECURITY" | "POLICY" | "INTEGRATION";

export interface AegisoraPlugin {
  name: string;

  version: string;

  type: PluginType;

  initialize?(): Promise<void>;

  destroy?(): Promise<void>;
}
