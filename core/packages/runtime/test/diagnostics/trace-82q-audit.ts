import assert from "node:assert/strict";
import { EnforcementGate } from "../../src/enforcement";

async function main() {
  const traces: any[] = [];

  const context: any = {
    decisionStore: {
      record: (x: any) => traces.push(x)
    }
  };

  const gate = new EnforcementGate(context, {} as any);

  await (gate as any).audit(
    {
      agentId: "trace-82q-agent",
      resourceType: "provider",
      tool: "openai",
      action: "provider.generate",
      input: {},
      metadata: { trace: "82-Q" }
    },
    {
      decision: "ESCALATE",
      reason: "TRACE 82-Q escalation",
      riskScore: 75,
      threats: []
    }
  );

  const t = traces[0];

  assert.equal(traces.length, 1);
  assert.equal(t.agentId, "trace-82q-agent");
  assert.equal(t.action, "provider.generate");
  assert.equal(t.decision, "escalate");
  assert.equal(t.riskScore, 75);
  assert.equal(t.metadata.trace, "82-Q");

  console.log("TRACE 82-Q: PASS");
  console.log("Decision:", t.decision);
  console.log("Agent:", t.agentId);
  console.log("Risk:", t.riskScore);
}

main().catch(e => {
  console.error("TRACE 82-Q: FAIL");
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
