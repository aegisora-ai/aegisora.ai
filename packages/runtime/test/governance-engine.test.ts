import {
  GovernanceEngine,
  createExecutionIntent,
} from "../src/governance";

async function main() {

  console.log("");
  console.log("============================================");
  console.log("GOVERNANCE PIPELINE TEST");
  console.log("============================================");

  const intent =
    createExecutionIntent({

      agentId:
        "governance-test-agent",

      actor: {
        type: "agent",
        id: "governance-test-agent",
      },

      target: {
        type: "tool",
        name: "echo",
      },

      action:
        "tool.execute",

      input: {
        message:
          "hello",
      },

      metadata: {
        source:
          "governance-test",
      },
    });

  console.log(
    "[1] ExecutionIntent created",
  );

  if (!intent.id) {
    throw new Error(
      "ExecutionIntent ID missing",
    );
  }

  console.log(
    "Intent creation: PASS",
  );

  const engine =
    new GovernanceEngine();

  console.log(
    "[2] GovernanceEngine created",
  );

  const stages =
    engine.listStages();

  console.log(
    "Registered stages:",
    stages,
  );

  const expected = [
    "context-resolution",
    "identity-access",
    "security-analysis",
    "policy-evaluation",
    "risk-analysis",
    "decision-resolution",
    "audit-evidence",
  ];

  if (
    JSON.stringify(stages) !==
    JSON.stringify(expected)
  ) {
    throw new Error(
      `Unexpected stage pipeline: ${JSON.stringify(stages)}`,
    );
  }

  console.log(
    "Stage registration: PASS",
  );

  const result =
    await engine.evaluate(
      intent,
      {} as any,
    );

  console.log(
    "Decision:",
    result.decision,
  );

  console.log(
    "Risk:",
    result.riskScore,
  );

  if (
    result.decision !==
    "ALLOW"
  ) {
    throw new Error(
      `Unexpected decision: ${result.decision}`,
    );
  }

  console.log(
    "Default ALLOW decision: PASS",
  );

  if (
    result.intentId !==
    intent.id
  ) {
    throw new Error(
      "Decision intentId mismatch",
    );
  }

  console.log(
    "Decision correlation: PASS",
  );

  const executedStages =
    (
      result.metadata
        ?.stages as unknown[]
    ) ?? [];

  if (
    executedStages.length !==
    expected.length
  ) {
    throw new Error(
      `Expected ${expected.length} stages, got ${executedStages.length}`,
    );
  }

  console.log(
    "Stage execution: PASS",
  );

  console.log("");
  console.log(
    "GOVERNANCE PIPELINE TEST: PASS",
  );
  console.log("");
}

main().catch((error) => {

  console.error(
    "GOVERNANCE PIPELINE TEST: FAIL",
  );

  console.error(error);

  process.exit(1);
});
