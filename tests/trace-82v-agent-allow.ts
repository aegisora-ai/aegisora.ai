import assert from "node:assert/strict";
import { AgentExecutor } from "../packages/runtime/src/execution/executor";

async function main() {
  let toolCalls = 0;
  let providerCalls = 0;

  const g = new AgentExecutor(
    {} as any,
    {
      select: () => ({
        tool: {
          name: "echo",
          execute: async () => {
            toolCalls++;
            return "OK";
          }
        },
        confidence: 1
      })
    } as any,
    {
      completeStep: () => {}
    } as any,
    {
      decisionStore: {
        record() {}
      },
      eventBus: {
        emit() {}
      }
    } as any,
    {} as any,
    {
      getDefaultModel: () => "test",
      generate: async () => {
        providerCalls++;
        return { output: "OK" };
      }
    } as any
  );

  (g as any).enforcement.enforce = async () => ({
    decision: "ALLOW",
    reason: "82-V",
    riskScore: 0,
    threats: []
  });

  const result = await (g as any).executeStep(
    {
      id: "agent",
      remember() {}
    } as any,
    {
      id: "step",
      description: "82-V",
      order: 1
    } as any,
    "plan"
  );

  assert.equal(providerCalls, 1);
  assert.equal(toolCalls, 1);
  assert.equal(result.result, "OK");
  assert.equal(result.tool, "echo");
  assert.equal(result.enforcement.decision, "ALLOW");
  assert.equal(result.enforcement.riskScore, 0);
  assert.equal(result.reasoning, "OK");
  assert.equal(result.model, "test");
  assert.equal(result.provider, "openai");

  console.log("");
  console.log("================================");
  console.log("TRACE 82-V: PASS");
  console.log("Provider:", providerCalls);
  console.log("Tool:", toolCalls);
  console.log("Decision:", result.enforcement.decision);
  console.log("Risk:", result.enforcement.riskScore);
  console.log("Model:", result.model);
  console.log("Provider ID:", result.provider);
  console.log("Tool Result:", result.result);
  console.log("================================");
}

main().catch(error => {
  console.error("");
  console.error("TRACE 82-V: FAIL");
  console.error(error instanceof Error ? error.stack : error);
  process.exitCode = 1;
});
