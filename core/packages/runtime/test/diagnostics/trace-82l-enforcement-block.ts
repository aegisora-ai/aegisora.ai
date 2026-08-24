import assert from "node:assert/strict";
import { ProviderExecutionGateway } from "../../src/providers/provider-execution-gateway";

async function main() {

  let providerCalls = 0;

  const gateway = new ProviderExecutionGateway(
    {} as any,
    {} as any,
    {} as any,
    {} as any
  );

  const enforcement = (gateway as any).enforcement;

  enforcement.enforce = async () => ({
    decision: "BLOCK",
    reason: "TRACE 82-L forced block",
    riskScore: 100,
    threats: [
      {
        type: "test",
        severity: "high"
      }
    ]
  });

  const provider = (gateway as any).provider;

  if (provider) {
    const originalExecute = provider.execute;

    provider.execute = async (...args: any[]) => {
      providerCalls++;
      return originalExecute?.(...args);
    };
  }

  let blocked = false;

  try {

    await gateway.execute({
      agentId: "trace-82l-agent",
      tool: "echo",
      action: "TRACE 82-L",
      input: {
        test: true
      }
    } as any);

  } catch (error) {

    blocked = true;

    console.log(
      "Caught expected block:",
      error instanceof Error
        ? error.message
        : String(error)
    );
  }

  console.log("");
  console.log("TRACE 82-L");
  console.log("Blocked:", blocked ? "YES" : "NO");
  console.log("Provider calls:", providerCalls);

  assert.equal(
    blocked,
    true,
    "Execution must be blocked"
  );

  assert.equal(
    providerCalls,
    0,
    "Provider must not execute after BLOCK"
  );

  console.log("");
  console.log("ENFORCEMENT BLOCK: PASS");
  console.log("PROVIDER BYPASS: PASS");
  console.log("");
  console.log("RESULT: PASS");
}

main().catch(error => {

  console.error("");
  console.error("RESULT: FAIL");
  console.error(
    error instanceof Error
      ? error.stack
      : error
  );

  process.exit(1);
});
