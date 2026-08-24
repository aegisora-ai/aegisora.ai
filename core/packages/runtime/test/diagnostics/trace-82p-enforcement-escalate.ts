import assert from "node:assert/strict";
import { ProviderExecutionGateway } from "../../src/providers/provider-execution-gateway";

async function main() {
  const g = new ProviderExecutionGateway({} as any);
  let calls = 0;

  (g as any).enforcement.enforce = async () => ({
    decision: "ESCALATE",
    reason: "TRACE 82-P forced escalation",
    riskScore: 75,
    threats: []
  });

  const router = (g as any).router;
  const original = router.resolve;

  router.resolve = (...args: any[]) => {
    const p = original.apply(router, args);
    p.generate = async () => {
      calls++;
      return { output: "SHOULD NOT EXECUTE" };
    };
    return p;
  };

  let escalated = false;
  let message = "";

  try {
    await g.generate({
      agentId: "trace-82p-agent",
      provider: "openai",
      request: { prompt: "TRACE 82-P" }
    } as any);
  } catch (e) {
    escalated = true;
    message = e instanceof Error ? e.message : String(e);
    console.log("Escalated:", message);
  }

  assert.equal(escalated, true);
  assert.match(message, /\[ENFORCEMENT:ESCALATE\]/);
  assert.equal(calls, 0);

  console.log("TRACE 82-P: PASS");
  console.log("Provider calls:", calls);
}

main().catch(e => {
  console.error("TRACE 82-P: FAIL");
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
