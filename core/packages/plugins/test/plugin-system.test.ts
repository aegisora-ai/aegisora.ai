import assert from "node:assert/strict";
import { PluginLoader, PluginRegistry } from "../src";

async function main() {
  const registry = new PluginRegistry();
  const loader = new PluginLoader(registry);
  let initialized = false;
  let destroyed = false;

  const plugin = {
    name: "trace-plugin",
    version: "1.0.0",
    type: "SECURITY" as const,
    permissions: ["READ_CONTEXT", "ANALYZE_REQUEST"] as const,
    async initialize(context: { pluginName: string; permissions: readonly string[] }) {
      assert.equal(context.pluginName, "trace-plugin");
      assert.deepEqual([...context.permissions], ["READ_CONTEXT", "ANALYZE_REQUEST"]);
      initialized = true;
    },
    async destroy() {
      destroyed = true;
    },
  };

  console.log("[A] Loading valid plugin...");
  await loader.load(plugin);
  assert.equal(initialized, true);
  assert.equal(registry.has("trace-plugin"), true);
  console.log("Plugin initialization: PASS");

  console.log("[B] Rejecting duplicate plugin...");
  await assert.rejects(() => loader.load(plugin), /already registered/);
  assert.equal(registry.list().length, 1);
  console.log("Duplicate protection: PASS");

  console.log("[C] Unloading plugin...");
  assert.equal(await loader.unload("trace-plugin"), true);
  assert.equal(destroyed, true);
  assert.equal(registry.has("trace-plugin"), false);
  console.log("Plugin destruction: PASS");

  console.log("[D] Rolling back failed initialization...");
  const broken = {
    name: "broken-plugin",
    version: "1.0.0",
    type: "SECURITY" as const,
    async initialize() {
      throw new Error("intentional initialization failure");
    },
  };
  await assert.rejects(() => loader.load(broken), /Failed to initialize plugin/);
  assert.equal(registry.has("broken-plugin"), false);
  console.log("Initialization rollback: PASS");

  console.log("\nPLUGIN SYSTEM TEST: PASS");
}

main().catch((error) => {
  console.error("\nPLUGIN SYSTEM TEST: FAIL");
  console.error(error);
  process.exit(1);
});
