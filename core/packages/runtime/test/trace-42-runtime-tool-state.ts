import assert from "node:assert/strict";

import { AgentRuntime } from "../src/agent/runtime/agent-runtime";

console.log("");
console.log("==================================================");
console.log(" TRACE 42 - REAL RUNTIME TOOL STATE");
console.log("==================================================");

const runtime = new AgentRuntime();

console.log("");
console.log("=== 42A - INITIAL TOOL REGISTRY ===");

const registry = runtime.getToolRegistry();

const initialTools = registry.list();

console.log("Tool count:", initialTools.length);
console.log(
  "Tools:",
  initialTools.map(tool => tool.name)
);

assert.equal(
  initialTools.length,
  1,
  "Expected exactly one registered tool"
);

assert.equal(
  initialTools[0]?.name,
  "echo",
  "Expected EchoTool to be registered"
);

console.log("PASS: EchoTool exists");


console.log("");
console.log("=== 42B - DIRECT REGISTRY IDENTITY ===");

const registryAgain = runtime.getToolRegistry();

console.log(
  "Same registry instance:",
  registry === registryAgain
);

assert.strictEqual(
  registry,
  registryAgain,
  "ToolRegistry identity changed"
);

console.log("PASS: ToolRegistry identity stable");


console.log("");
console.log("=== 42C - ECHO TOOL LOOKUP ===");

const echo = registry.get("echo");

console.log("Echo tool:", echo.name);
console.log("Description:", echo.description);

assert.equal(echo.name, "echo");

console.log("PASS: EchoTool lookup works");


console.log("");
console.log("=== 42D - REGISTER/REMOVE MUTATION TEST ===");

const before = registry.list().map(tool => tool.name);

console.log("Before:", before);

const markerTool = {
  name: "__trace42_marker__",
  description: "Trace 42 marker tool",
  async execute(input: unknown) {
    return input;
  }
};

registry.register(markerTool);

console.log(
  "After register:",
  registry.list().map(tool => tool.name)
);

assert.equal(
  registry.list().length,
  2
);

registry.remove("__trace42_marker__");

console.log(
  "After remove:",
  registry.list().map(tool => tool.name)
);

assert.equal(
  registry.list().length,
  1
);

assert.equal(
  registry.list()[0]?.name,
  "echo"
);

console.log("PASS: Registry mutation behaves correctly");


console.log("");
console.log("=== 42E - RUNTIME SNAPSHOT ===");

console.log(
  JSON.stringify(
    runtime.snapshot(),
    null,
    2
  )
);

console.log("");
console.log("==================================================");
console.log(" TRACE 42 COMPLETE - ALL ASSERTIONS PASSED");
console.log("==================================================");
