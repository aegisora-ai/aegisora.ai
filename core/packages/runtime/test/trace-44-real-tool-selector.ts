import assert from "node:assert/strict";

import { AgentRuntime } from "../src/agent/runtime/agent-runtime";

console.log("");
console.log("==================================================");
console.log(" TRACE 44 - REAL TOOL SELECTOR EXECUTION");
console.log("==================================================");

const runtime = new AgentRuntime();

const internal = runtime as any;

const selector = internal.selector;

console.log("");
console.log("=== 44A - SELECTOR REGISTRY STATE ===");

const registry = selector.registry;

console.log(
  "Tool count:",
  registry.list().length
);

console.log(
  "Tools:",
  registry.list().map(
    (tool: any) => tool.name
  )
);

assert.equal(
  registry.list().length,
  1
);

assert.equal(
  registry.list()[0]?.name,
  "echo"
);

console.log(
  "PASS: Selector registry contains EchoTool"
);


console.log("");
console.log("=== 44B - DIRECT SELECTOR CALL ===");

const selection =
  selector.select("echo");

console.log(
  "Selected tool:",
  selection.tool.name
);

console.log(
  "Reason:",
  selection.reason
);

console.log(
  "Confidence:",
  selection.confidence
);

assert.equal(
  selection.tool.name,
  "echo"
);

assert.ok(
  selection.confidence >= 0.5,
  "Unexpectedly low selection confidence"
);

console.log(
  "PASS: ToolSelector.select() returns EchoTool"
);


console.log("");
console.log("=== 44C - REALISTIC GOAL ===");

const realistic =
  selector.select(
    "Use the echo tool to return the received input"
  );

console.log(
  "Selected tool:",
  realistic.tool.name
);

console.log(
  "Reason:",
  realistic.reason
);

console.log(
  "Confidence:",
  realistic.confidence
);

assert.equal(
  realistic.tool.name,
  "echo"
);

console.log(
  "PASS: Realistic goal selects EchoTool"
);


console.log("");
console.log("=== 44D - EXECUTOR SELECTOR IDENTITY ===");

const executor = internal.executor;

assert.strictEqual(
  executor.selector,
  selector
);

assert.strictEqual(
  executor.selector.registry,
  registry
);

console.log(
  "Executor selector uses same selector:",
  true
);

console.log(
  "Executor selector uses same registry:",
  true
);

console.log(
  "PASS: Executor selection chain remains identical"
);


console.log("");
console.log("==================================================");
console.log(" TRACE 44 COMPLETE - ALL ASSERTIONS PASSED");
console.log("==================================================");
