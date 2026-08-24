import assert from "node:assert/strict";
import { ProviderExecutionGateway } from "../../src/providers/provider-execution-gateway";

async function main() {
  const g = new ProviderExecutionGateway({} as any);
  let calls = 0;

  (g as any).enforcement.enforce = async () => ({
    decision: "BLOCK",
    reason: "TRACE 82-N forced block",
    riskScore: 100,
    threats: []
  });

  const router = (g as any).router;
  const original = router.resolve;

  router.resolve = (...args: any[]) => {
    const p = original.apply(router, args);
    p.generate = async () => { calls++; };
    return p;
  };

  let blocked = false;

  try {
    await g.generate({
      agentId: "trace-82n-agent",
      provider: "openai",
      request: { prompt: "TRACE 82-N" }
    } as any);
  } catch (e) {
    blocked = true;
    console.log("Blocked:", e instanceof Error ? e.message : e);
  }

  assert.equal(blocked, true);
  assert.equal(calls, 0);

  console.log("TRACE 82-N: PASS");
  console.log("Provider calls:", calls);
}

main().catch(e => {
  console.error("TRACE 82-N: FAIL", e);
  process.exit(1);
});
