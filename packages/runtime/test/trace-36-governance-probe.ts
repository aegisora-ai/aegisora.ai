import { GovernanceEngine } from "../src/governance/governance-engine";
import type { ExecutionIntent } from "../src/governance/types";

function createIntent(
  tool: string,
): ExecutionIntent {
  return {
    id: crypto.randomUUID(),
    agentId: "trace-36-governance-probe-agent",
    actor: {
      type: "agent",
      id: "trace-36-governance-probe-agent",
    },
    target: {
      type: "tool",
      name: tool,
    },
    action: "execute",
    input: {
      task: "governance probe",
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
  const engine = new GovernanceEngine();

  console.log("");
  console.log("=== REGISTERED GOVERNANCE STAGES ===");

  console.log(
    JSON.stringify(
      engine.listStages(),
      null,
      2,
    ),
  );

  for (const tool of [
    "echo",
    "shell",
    "definitely-not-registered",
  ]) {
    const intent = createIntent(tool);

    const result = await engine.evaluate(
      intent,
      createContext(intent),
    );

    console.log("");
    console.log("============================================================");
    console.log(`[${tool}]`);
    console.log("============================================================");

    console.log("");
    console.log("FINAL DECISION:");
    console.log(
      JSON.stringify(
        result.decision,
        null,
        2,
      ),
    );

    console.log("");
    console.log("FINAL REASON:");
    console.log(
      JSON.stringify(
        result.reason,
        null,
        2,
      ),
    );

    console.log("");
    console.log("RISK:");
    console.log(
      JSON.stringify(
        {
          riskScore: result.riskScore,
          riskLevel: result.riskLevel,
        },
        null,
        2,
      ),
    );

    console.log("");
    console.log("STAGE COUNT:");
    console.log(result.metadata.stageCount);

    console.log("");
    console.log("PIPELINE:");
    console.log(
      JSON.stringify(
        result.metadata.pipeline,
        null,
        2,
      ),
    );

    console.log("");
    console.log("STAGE RESULTS:");

    const stages =
      result.metadata.stages as Array<{
        stage: string;
        order: number;
        result: unknown;
      }>;

    for (const stage of stages) {
      console.log("");
      console.log(
        `--- ${stage.stage} (order ${stage.order}) ---`,
      );

      console.log(
        JSON.stringify(
          stage.result,
          null,
          2,
        ),
      );
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});