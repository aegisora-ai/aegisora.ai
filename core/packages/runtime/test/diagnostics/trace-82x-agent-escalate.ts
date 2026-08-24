import assert from "node:assert/strict";
import { AgentExecutor } from "../../src/execution/executor";

async function main() {
  let toolCalls = 0;
  let providerCalls = 0;
  let rememberCalls = 0;
  let completeStepCalls = 0;

  console.log("");
  console.log("================================");
  console.log("TRACE 82-X: ESCALATE DIAGNOSTIC");
  console.log("================================");

  const g = new AgentExecutor(
    {} as any,

    {
      select: () => ({
        tool: {
          name: "echo",
          execute: async () => {
            console.log("TRACE 82-X: TOOL EXECUTE");
            toolCalls++;
            return "ESCALATE-TOOL-RAN";
          }
        },
        confidence: 1
      })
    } as any,

    {
      completeStep: () => {
        console.log("TRACE 82-X: PLANNER completeStep");
        completeStepCalls++;
      }
    } as any,

    {
      decisionStore: {
        record() {
          console.log("TRACE 82-X: DECISION RECORD");
        }
      },
      eventBus: {
        emit() {
          console.log("TRACE 82-X: EVENT EMIT");
        }
      }
    } as any,

    {} as any,

    {
      getDefaultModel: () => "test",
      generate: async () => {
        console.log("TRACE 82-X: PROVIDER GENERATE");
        providerCalls++;
        return { output: "ESCALATE-PROVIDER-RAN" };
      }
    } as any
  );

  (g as any).enforcement.enforce = async () => {
    console.log("TRACE 82-X: ENFORCEMENT");

    return {
      decision: "ESCALATE",
      reason: "82-X-ESCALATE",
      riskScore: 65,
      threats: ["requires-human-review"]
    };
  };

  console.log("TRACE 82-X: BEFORE executeStep");

  let result: unknown;

  try {
    result = await (g as any).executeStep(
      {
        id: "agent",
        remember() {
          console.log("TRACE 82-X: REMEMBER");
          rememberCalls++;
        }
      } as any,

      {
        id: "step",
        description: "82-X-ESCALATE",
        order: 1
      } as any,

      "plan"
    );

    console.log("TRACE 82-X: AFTER executeStep");
    console.log("TRACE 82-X: RESULT:", result);
  } catch (error) {
    console.log("TRACE 82-X: THREW");
    console.log(
      error instanceof Error ? error.message : error
    );
  }

  console.log("");
  console.log("Provider calls:", providerCalls);
  console.log("Tool calls:", toolCalls);
  console.log("Remember calls:", rememberCalls);
  console.log("CompleteStep calls:", completeStepCalls);

  console.log("");
  console.log("================================");
  console.log("TRACE 82-X: OBSERVATION COMPLETE");
  console.log("================================");
}

main().catch(error => {
  console.error("");
  console.error("TRACE 82-X: FAIL");
  console.error(error instanceof Error ? error.stack : error);
  process.exitCode = 1;
});
