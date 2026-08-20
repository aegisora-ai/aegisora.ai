import { IdentityAccessStage } from "../src/governance/pipeline";
import type { ExecutionIntent } from "../src/governance/types";

function createIntent(
  tool: string,
): ExecutionIntent {
  return {
    id: crypto.randomUUID(),
    agentId: "trace-36-adversarial-agent",
    actor: {
      type: "agent",
      id: "trace-36-adversarial-agent",
    },
    target: {
      type: "tool",
      name: tool,
    },
    action: "execute",
    input: {
      task: "probe",
    },
    metadata: {},
    createdAt: new Date(),
  };
}

function createContext(intent: ExecutionIntent) {
  return {
    intent,
    requestId: intent.id,
    startedAt: new Date(),
    metadata: {},
  };
}

async function main() {
  const stage = new IdentityAccessStage();

  for (const tool of [
    "echo",
    "shell",
    "definitely-not-registered",
  ]) {
    const intent = createIntent(tool);

    const result = await stage.evaluate(
      intent,
      createContext(intent),
    );

    console.log("");
    console.log(`[${tool}]`);
    console.log(
      "intent.target:",
      JSON.stringify(intent.target),
    );
    console.log(
      "intent.action:",
      JSON.stringify(intent.action),
    );
    console.log(
      "intent.agentId:",
      JSON.stringify(intent.agentId),
    );
    console.log(
      "intent.actor:",
      JSON.stringify(intent.actor),
    );
    console.log(
      "stage result:",
      JSON.stringify(result, null, 2),
    );
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});