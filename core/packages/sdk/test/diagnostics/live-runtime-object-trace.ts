import { AegisoraClient } from "@aegisora/sdk";

async function main() {

  console.log("\n=== CREATE SDK CLIENT ===");

  const client = new AegisoraClient();

  const runtime: any = client.runtimeInstance();

  console.log("\n=== RUNTIME INSTANCE ===");
  console.log("runtime constructor:", runtime.constructor?.name);

  console.log("\n=== RUNTIME TOOL REGISTRY ===");
  console.log("tools object exists:", !!runtime.tools);
  console.log(
    "tools constructor:",
    runtime.tools?.constructor?.name
  );
  console.log(
    "tools list:",
    runtime.tools?.list?.().map((t: any) => t.name)
  );

  console.log("\n=== RUNTIME SELECTOR ===");
  console.log("selector exists:", !!runtime.selector);
  console.log(
    "selector constructor:",
    runtime.selector?.constructor?.name
  );

  console.log(
    "selector.registry exists:",
    !!runtime.selector?.registry
  );

  console.log(
    "selector.registry constructor:",
    runtime.selector?.registry?.constructor?.name
  );

  console.log(
    "selector.registry tools:",
    runtime.selector?.registry?.list?.().map((t: any) => t.name)
  );

  console.log("\n=== OBJECT IDENTITY ===");

  console.log(
    "runtime.tools === runtime.selector.registry:",
    runtime.tools === runtime.selector?.registry
  );

  console.log("\n=== EXECUTOR ===");

  console.log(
    "executor exists:",
    !!runtime.executor
  );

  console.log(
    "executor constructor:",
    runtime.executor?.constructor?.name
  );

  console.log(
    "executor.selector exists:",
    !!runtime.executor?.selector
  );

  console.log(
    "executor.selector === runtime.selector:",
    runtime.executor?.selector === runtime.selector
  );

  console.log(
    "executor.selector.registry === runtime.tools:",
    runtime.executor?.selector?.registry === runtime.tools
  );

  console.log(
    "executor selector tools:",
    runtime.executor?.selector?.registry?.list?.()
      ?.map((t: any) => t.name)
  );

  console.log("\n=== LOOP ===");

  console.log(
    "loop exists:",
    !!runtime.loop
  );

  console.log(
    "loop constructor:",
    runtime.loop?.constructor?.name
  );

  console.log(
    "loop.executor exists:",
    !!runtime.loop?.executor
  );

  console.log(
    "loop.executor === runtime.executor:",
    runtime.loop?.executor === runtime.executor
  );

  console.log(
    "loop executor selector registry tools:",
    runtime.loop?.executor?.selector?.registry
      ?.list?.()
      ?.map((t: any) => t.name)
  );

  console.log("\n=== SDK AGENT ===");

  const agent = client.agent({
    name: "live-trace-agent"
  });

  console.log(
    "agent created"
  );

  console.log(
    "runtime tool list AFTER agent creation:",
    runtime.tools?.list?.().map((t: any) => t.name)
  );

  console.log(
    "selector tool list AFTER agent creation:",
    runtime.selector?.registry?.list?.()
      ?.map((t: any) => t.name)
  );

  console.log("\n=== RUN AGENT ===");

  try {

    const result = await agent.run(
      "Use the echo tool to test Aegisora"
    );

    console.log("\nRUN RESULT:");
    console.dir(result, { depth: null });

  } catch (error) {

    console.log("\nRUN FAILED:");

    console.error(error);

    console.log("\n=== POST-FAILURE TOOL STATE ===");

    console.log(
      "runtime tools:",
      runtime.tools?.list?.().map((t: any) => t.name)
    );

    console.log(
      "selector tools:",
      runtime.selector?.registry?.list?.()
        ?.map((t: any) => t.name)
    );

    console.log(
      "executor selector tools:",
      runtime.executor?.selector?.registry?.list?.()
        ?.map((t: any) => t.name)
    );

    console.log(
      "loop executor selector tools:",
      runtime.loop?.executor?.selector?.registry
        ?.list?.()
        ?.map((t: any) => t.name)
    );

    process.exitCode = 1;
  }

}

main().catch((error) => {
  console.error("FATAL:");
  console.error(error);
  process.exit(1);
});
