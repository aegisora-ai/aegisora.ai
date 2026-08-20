import { AgentRuntime } from "@aegisora/runtime";

async function main() {

  const runtime = new AgentRuntime();

  console.log("");
  console.log("============================================================");
  console.log("AEGISORA - REAL EXECUTION TRACE");
  console.log("============================================================");

  const agent = runtime.createAgent("trace-agent");

  console.log("");
  console.log("1. AGENT");
  console.dir(agent.getState(), { depth: 10 });

  console.log("");
  console.log("2. TOOLS BEFORE RUN");
  console.dir(
    runtime.getToolRegistry().list(),
    { depth: 10 }
  );

  console.log("");
  console.log("3. RUNNING AGENT");

  try {

    const result = await runtime.runAgent(
      "trace-agent",
      "Use the echo tool to return hello world"
    );

    console.log("");
    console.log("4. EXECUTION RESULT");
    console.dir(result, { depth: 20 });

  } catch (error) {

    console.log("");
    console.log("4. EXECUTION ERROR");

    if (error instanceof Error) {

      console.log("name:", error.name);
      console.log("message:", error.message);
      console.log("stack:", error.stack);

    } else {

      console.dir(error, { depth: 20 });

    }

  }

  console.log("");
  console.log("5. FINAL RUNTIME STATE");

  console.dir(
    runtime.getState(),
    { depth: 20 }
  );

  console.log("");
  console.log("6. EVENT STORE");

  console.dir(
    runtime.getEventStore().getAll(),
    { depth: 20 }
  );

  console.log("");
  console.log("============================================================");
  console.log("REAL EXECUTION TRACE COMPLETE");
  console.log("============================================================");

}

main().catch(error => {

  console.error("");
  console.error("UNHANDLED TEST ERROR");

  if (error instanceof Error) {
    console.error(error.stack);
  } else {
    console.error(error);
  }

  process.exit(1);

});
