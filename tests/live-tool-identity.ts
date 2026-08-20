import { AgentRuntime } from "@aegisora/runtime";

const runtime = new AgentRuntime();

console.log("");
console.log("============================================================");
console.log("AEGISORA - LIVE CANONICAL TOOL IDENTITY TEST");
console.log("============================================================");

const registry = runtime.getToolRegistry();

console.log("");
console.log("Registry tools:");
console.log(registry.list().map(t => ({
  name: t.name,
  description: t.description,
})));

console.log("");
console.log("Registry size:", registry.list().length);
console.log("Has echo:", registry.has("echo"));

console.log("");
console.log("Runtime state:");
console.dir(runtime.getState(), { depth: 10 });

console.log("");
console.log("============================================================");
