import assert from "node:assert/strict";
import { AgentExecutor } from "../../src/execution/executor";

async function main() {
  let toolCalls = 0;
  let providerCalls = 0;
  let rememberCalls = 0;
  let completeStepCalls = 0;

  console.log("");
  console.log("================================");
  console.log("TRACE 82-W: BLOCK DIAGNOSTIC");
  console.log("================================");

  const g = new AgentExecutor(
    {} as any,

    {
      select: () => ({
        tool: {
          name: "echo",
          execute: async () => {
            console.log("TRACE 82-W: TOOL EXECUTE");
            toolCalls++;
            return "SHOULD-NOT-RUN";
          }
        },
        confidence: 1
      })
    } as any,

    {
      completeStep: () => {
        console.log("TRACE 82-W: PLANNER completeStep");
        completeStepCalls++;
      }
    } as any,

    {
      decisionStore: {
        record() {
          console.log("TRACE 82-W: DECISION RECORD");
        }
      },
      eventBus: {
        emit() {
          console.log("TRACE 82-W: EVENT EMIT");
        }
      }
    } as any,

    {} as any,

    {
      getDefaultModel: () => "test",
      generate: async () => {
        console.log("TRACE 82-W: PROVIDER GENERATE");
        providerCalls++;
        return { output: "SHOULD-NOT-RUN" };
      }
    } as any
  );

  (g as any).enforcement.enforce = async () => {
    console.log("TRACE 82-W: ENFORCEMENT");
    return {
      decision: "BLOCK",
      reason: "82-W-BLOCK",
      riskScore: 95,
      threats: ["policy-violation"]
    };
  };

  console.log("TRACE 82-W: BEFORE executeStep");

  let result: unknown;
  let thrown: unknown;

  try {
    result = await (g as any).executeStep(
      {
        id: "agent",
        remember() {
          console.log("TRACE 82-W: REMEMBER");
          rememberCalls++;
        }
      } as any,

      {
        id: "step",
        description: "82-W-BLOCK",
        order: 1
      } as any,

      "plan"
    );

    console.log("TRACE 82-W: AFTER executeStep");
    console.log("TRACE 82-W: RESULT:", result);
  } catch (error) {
    thrown = error;
    console.log("TRACE 82-W: THREW");
    console.log(
      error instanceof Error ? error.message : error
    );
  }

  console.log("");
  console.log("Provider calls:", providerCalls);
  console.log("Tool calls:", toolCalls);
  console.log("Remember calls:", rememberCalls);
  console.log("CompleteStep calls:", completeStepCalls);

  assert.equal(providerCalls, 0);
  assert.equal(toolCalls, 0);
  assert.equal(rememberCalls, 0);
  assert.equal(completeStepCalls, 0);

  console.log("");
  console.log("================================");
  console.log("TRACE 82-W: PASS");
  console.log("BLOCK prevented execution");
  console.log("Provider: 0");
  console.log("Tool: 0");
  console.log("Remember: 0");
  console.log("CompleteStep: 0");
  console.log("================================");
}

main().catch(error => {
  console.error("");
  console.error("TRACE 82-W: FAIL");
  console.error(error instanceof Error ? error.stack : error);
  process.exitCode = 1;
});
