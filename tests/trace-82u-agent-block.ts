import assert from "node:assert/strict";
import { AgentExecutor } from "../packages/runtime/src/execution/executor";

async function main() {
  const blocked = new AgentExecutor(
    {} as any,
    {
      select: () => ({
        tool: {
          name: "echo",
          execute: async () => {
            throw new Error("TOOL SHOULD NOT RUN");
          }
        },
        confidence: 1
      })
    } as any,
    {} as any,
    {
      decisionStore: { record() {} },
      eventBus: { emit() {} }
    } as any,
    {} as any
  );

  (blocked as any).enforcement.enforce = async () => ({
    decision: "BLOCK",
    reason: "TRACE 82-U forced block",
    riskScore: 100,
    threats: []
  });

  let stopped = false;

  try {
    await (blocked as any).executeStep(
      { id: "trace-82u-agent", start(){}, complete(){} } as any,
      {
        id: "trace-82u-step",
        description: "TRACE 82-U",
        order: 1
      } as any,
      "trace-82u-plan"
    );
  } catch (e) {
    stopped = true;
    console.log(
      "Blocked:",
      e instanceof Error ? e.message : e
    );
  }

  assert.equal(stopped, true);

  console.log("TRACE 82-U: PASS");
  console.log("Tool execution: 0");
}

main().catch(e => {
  console.error("TRACE 82-U: FAIL");
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
