import assert from "node:assert/strict";
import { ProviderExecutionGateway } from "../packages/runtime/src/providers/provider-execution-gateway";

async function main() {
  const g = new ProviderExecutionGateway({} as any);
  let calls = 0;

  (g as any).enforcement.enforce = async () => ({
    decision: "ALLOW",
    reason: "TRACE 82-O forced allow",
    riskScore: 0,
    threats: []
  });

  const router = (g as any).router;
  const original = router.resolve;

  router.resolve = (...args: any[]) => {
    const p = original.apply(router, args);
    p.generate = async () => {
      calls++;
      return {
        provider: "openai",
        model: "test",
        output: "TRACE 82-O SUCCESS"
      };
    };
    return p;
  };

  const result = await g.generate({
    agentId: "trace-82o-agent",
    provider: "openai",
    request: { prompt: "TRACE 82-O" }
  } as any);

  assert.equal(calls, 1);
  assert.equal(result.output, "TRACE 82-O SUCCESS");

  console.log("TRACE 82-O: PASS");
  console.log("Provider calls:", calls);
  console.log("Output:", result.output);
}

main().catch(e => {
  console.error("TRACE 82-O: FAIL");
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
