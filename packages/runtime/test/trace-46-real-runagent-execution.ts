import assert from "node:assert/strict";

import { AgentRuntime } from "../src/agent/runtime/agent-runtime";

async function main() {

console.log("");
console.log("==================================================");
console.log(" TRACE 46 - REAL runAgent() EXECUTION");
console.log("==================================================");

const runtime = new AgentRuntime();

console.log("");
console.log("=== 46A - REGISTER AGENT ===");

const agent = runtime.create(
  "trace46-agent"
);

console.log(
  "Agent ID:",
  agent.id
);

assert.equal(
  agent.id,
  "trace46-agent"
);

console.log("PASS: Agent registered");

console.log("");
console.log("=== 46B - VERIFY TOOL BEFORE EXECUTION ===");

const tools =
  runtime.getToolRegistry().list();

console.log(
  "Tools:",
  tools.map(tool => tool.name)
);

assert.equal(
  tools.length,
  1
);

assert.equal(
  tools[0]?.name,
  "echo"
);

console.log("PASS: EchoTool available");

console.log("");
console.log("=== 46C - REAL runtime.runAgent() ===");

let result: unknown;

try {

  result = await runtime.runAgent(
    "trace46-agent",
    "Use the echo tool to return the received input"
  );

  console.log("");
  console.log("runAgent RESULT:");
  console.log(
    JSON.stringify(
      result,
      null,
      2
    )
  );

} catch (error) {

  console.log("");
  console.log("runAgent ERROR:");

  console.error(
    error instanceof Error
      ? error.stack
      : error
  );

  throw error;
}

console.log("");
console.log("=== 46D - RESULT VALIDATION ===");

assert.ok(
  result,
  "runAgent returned no result"
);

const response =
  result as any;

console.log(
  "Result status:",
  response.status
);

console.log(
  "Agent ID:",
  response.agentId
);

assert.equal(
  response.agentId,
  "trace46-agent"
);

assert.equal(
  response.status,
  "completed"
);

console.log(
  "PASS: Real runAgent() completed"
);

console.log("");
console.log("=== 46E - RUNTIME CONTEXT EVENTS ===");

const internal =
  runtime as any;

const context =
  internal.context;

assert.ok(
  context,
  "RuntimeContext missing"
);

console.log(
  "Context exists:",
  true
);

if (context.eventStore?.events) {

  console.log(
    "Event count:",
    context.eventStore.events.length
  );

  console.log(
    "Events:"
  );

  for (
    const event of context.eventStore.events
  ) {

    console.log(
      JSON.stringify(
        event,
        null,
        2
      )
    );

  }

}

console.log("");
console.log("=== 46F - FINAL TOOL STATE ===");

const finalTools =
  runtime.getToolRegistry().list();

console.log(
  "Final tools:",
  finalTools.map(tool => tool.name)
);

assert.equal(
  finalTools.length,
  1
);

assert.equal(
  finalTools[0]?.name,
  "echo"
);

console.log(
  "PASS: EchoTool remains registered after execution"
);

console.log("");
console.log("==================================================");
console.log(" TRACE 46 COMPLETE - REAL EXECUTION PASSED");
console.log("==================================================");

}

main().catch(error => {
  console.error("");
  console.error("==================================================");
  console.error(" TRACE 46 FAILED");
  console.error("==================================================");
  console.error(
    error instanceof Error
      ? error.stack
      : error
  );
  process.exitCode = 1;
});
