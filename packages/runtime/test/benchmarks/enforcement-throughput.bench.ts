import { AgentRuntime } from "../../src";

async function main() {
  const runtime = new AgentRuntime();
  const runtimeAny = runtime as any;

  const agentId = "benchmark-enforcement-agent";

  await runtime.createAgent(agentId, {
    name: agentId,
  });

  const iterations = 100;
  const started = performance.now();

  let allowCount = 0;
  let blockCount = 0;

  for (let i = 0; i < iterations; i++) {
    const result = await runtimeAny.enforcement.enforce({
      agentId,
      resourceType: "tool",
      tool: i % 2 === 0 ? "echo" : "unknown-tool",
      action: i % 2 === 0 ? "tool.execute" : "unknown.execute",
      input: {
        benchmark: true,
        iteration: i,
      },
      metadata: {
        benchmark: "26.114",
      },
    });

    if (result.decision === "ALLOW") {
      allowCount++;
    } else {
      blockCount++;
    }
  }

  const elapsed = performance.now() - started;
  const operationsPerSecond = iterations / Math.max(elapsed / 1000, 0.000001);

  console.log("");
  console.log("============================================================");
  console.log(" AEGISORA ENFORCEMENT THROUGHPUT BENCHMARK");
  console.log("============================================================");
  console.log(`Iterations:            ${iterations}`);
  console.log(`Elapsed ms:            ${elapsed.toFixed(2)}`);
  console.log(`Operations/sec:        ${operationsPerSecond.toFixed(2)}`);
  console.log(`ALLOW decisions:       ${allowCount}`);
  console.log(`NON-ALLOW decisions:   ${blockCount}`);

  if (allowCount !== iterations / 2) {
    throw new Error(
      `FAIL: Expected ${iterations / 2} ALLOW decisions, got ${allowCount}`,
    );
  }

  if (blockCount !== iterations / 2) {
    throw new Error(
      `FAIL: Expected ${iterations / 2} NON-ALLOW decisions, got ${blockCount}`,
    );
  }

  if (!Number.isFinite(operationsPerSecond) || operationsPerSecond <= 0) {
    throw new Error("FAIL: Invalid benchmark throughput.");
  }

  console.log("");
  console.log("PASS: Enforcement benchmark completed.");
  console.log("PASS: Authorization behavior remained deterministic.");
  console.log("PASS: Throughput measurement is valid.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
