import assert from "node:assert/strict";

import { AgentRuntime } from "../src/agent/runtime/agent-runtime";

console.log("");
console.log("==================================================");
console.log(" TRACE 43 - SELECTOR / REGISTRY IDENTITY");
console.log("==================================================");

const runtime = new AgentRuntime();

const internal = runtime as any;

console.log("");
console.log("=== 43A - AGENT RUNTIME INTERNAL OBJECTS ===");

console.log(
  "tools exists:",
  !!internal.tools
);

console.log(
  "selector exists:",
  !!internal.selector
);

console.log(
  "executor exists:",
  !!internal.executor
);

console.log(
  "loop exists:",
  !!internal.loop
);

assert.ok(
  internal.tools,
  "AgentRuntime.tools missing"
);

assert.ok(
  internal.selector,
  "AgentRuntime.selector missing"
);

assert.ok(
  internal.executor,
  "AgentRuntime.executor missing"
);

assert.ok(
  internal.loop,
  "AgentRuntime.loop missing"
);

console.log("PASS: Runtime execution objects exist");


console.log("");
console.log("=== 43B - RUNTIME REGISTRY ===");

const runtimeRegistry = internal.tools;

console.log(
  "Runtime registry:",
  runtimeRegistry
);

console.log(
  "Runtime tools:",
  runtimeRegistry.list().map(
    (tool: any) => tool.name
  )
);

assert.equal(
  runtimeRegistry.list().length,
  1
);

assert.equal(
  runtimeRegistry.list()[0]?.name,
  "echo"
);

console.log("PASS: Runtime registry contains echo");


console.log("");
console.log("=== 43C - SELECTOR REGISTRY ===");

const selector = internal.selector;

console.log(
  "Selector:",
  selector
);

const selectorRegistry =
  selector.registry;

console.log(
  "Selector registry:",
  selectorRegistry
);

console.log(
  "Selector tools:",
  selectorRegistry.list().map(
    (tool: any) => tool.name
  )
);

assert.ok(
  selectorRegistry,
  "ToolSelector.registry missing"
);

console.log("PASS: ToolSelector has registry");


console.log("");
console.log("=== 43D - REGISTRY OBJECT IDENTITY ===");

console.log(
  "runtime.tools === selector.registry:",
  runtimeRegistry === selectorRegistry
);

assert.strictEqual(
  runtimeRegistry,
  selectorRegistry,
  "ToolSelector does NOT reference AgentRuntime.tools"
);

console.log(
  "PASS: ToolSelector references SAME ToolRegistry"
);


console.log("");
console.log("=== 43E - EXECUTOR SELECTOR ===");

const executor = internal.executor;

console.log(
  "Executor:",
  executor
);

console.log(
  "Executor selector:",
  executor.selector
);

assert.ok(
  executor.selector,
  "AgentExecutor.selector missing"
);

console.log(
  "executor.selector === runtime.selector:",
  executor.selector === selector
);

assert.strictEqual(
  executor.selector,
  selector,
  "AgentExecutor does NOT reference AgentRuntime.selector"
);

console.log(
  "PASS: AgentExecutor references SAME ToolSelector"
);


console.log("");
console.log("=== 43F - LOOP EXECUTOR ===");

const loop = internal.loop;

console.log(
  "Loop executor:",
  loop.executor
);

console.log(
  "loop.executor === executor:",
  loop.executor === executor
);

assert.strictEqual(
  loop.executor,
  executor,
  "AgentLoop does NOT reference AgentRuntime.executor"
);

console.log(
  "PASS: AgentLoop references SAME AgentExecutor"
);


console.log("");
console.log("=== 43G - FINAL TOOL VISIBILITY ===");

const finalTools =
  loop.executor.selector.registry.list();

console.log(
  "Tools visible from REAL execution path:",
  finalTools.map(
    (tool: any) => tool.name
  )
);

assert.equal(
  finalTools.length,
  1,
  "Real execution path sees wrong tool count"
);

assert.equal(
  finalTools[0]?.name,
  "echo",
  "Real execution path does not see EchoTool"
);

console.log(
  "PASS: REAL AgentLoop → Executor → Selector → Registry sees EchoTool"
);


console.log("");
console.log("==================================================");
console.log(" TRACE 43 COMPLETE - ALL ASSERTIONS PASSED");
console.log("==================================================");
