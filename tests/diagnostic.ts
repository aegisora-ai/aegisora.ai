import { AgentRuntime } from "@aegisora/runtime";

const runtime = new AgentRuntime();

console.log("===== RUNTIME TOOL DIAGNOSTIC =====");

console.log(
  "Tools:",
  runtime.getToolRegistry().list()
);

console.log(
  "Tool count:",
  runtime.getToolRegistry().list().length
);

console.log(
  "Has echo:",
  runtime.getToolRegistry().has("echo")
);

console.log("===================================");
