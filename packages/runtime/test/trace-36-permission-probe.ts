import { PermissionEngine } from "../src/permissions";

const engine = new PermissionEngine();

const cases = [
  {
    label: "echo",
    tool: "echo",
  },
  {
    label: "shell",
    tool: "shell",
  },
  {
    label: "unknown",
    tool: "definitely-not-registered",
  },
];

for (const item of cases) {
  const result = engine.check({
    agentId: "trace-probe-agent",
    resourceType: "tool",
    tool: item.tool,
    action: "execute",
    metadata: {},
  });

  console.log("");
  console.log(`[${item.label}]`);
  console.log("tool:", JSON.stringify(item.tool));
  console.log("result:", JSON.stringify(result, null, 2));
}