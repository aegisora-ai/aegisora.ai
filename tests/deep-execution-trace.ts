import { AgentRuntime } from "@aegisora/runtime";

async function main() {

    const runtime = new AgentRuntime();

    console.log("");
    console.log("============================================================");
    console.log("AEGISORA - SINGLE STEP / PROVIDER FAILURE TRACE");
    console.log("============================================================");

    const agent = runtime.createAgent("diagnostic-agent");

    console.log("");
    console.log("TOOLS:");
    console.dir(
        runtime.getToolRegistry().list().map(tool => ({
            name: tool.name,
            description: tool.description
        })),
        { depth: 10 }
    );

    console.log("");
    console.log("RUN:");

    try {

        const result = await runtime.runAgent(
            "diagnostic-agent",
            "Use the echo tool to return hello world"
        );

        console.log("");
        console.log("RESULT:");
        console.dir(result, { depth: 30 });

    } catch (error) {

        console.log("");
        console.log("ERROR:");

        if (error instanceof Error) {
            console.log("name:", error.name);
            console.log("message:", error.message);
            console.log("stack:", error.stack);
        } else {
            console.dir(error, { depth: 30 });
        }
    }

    console.log("");
    console.log("STATE:");

    console.dir(
        runtime.getState(),
        { depth: 30 }
    );

    console.log("");
    console.log("EVENTS:");

    console.dir(
        runtime.getEventStore().getAll(),
        { depth: 30 }
    );

    console.log("");
    console.log("============================================================");
    console.log("TRACE COMPLETE");
    console.log("============================================================");
}

main().catch(error => {

    console.error("");
    console.error("UNHANDLED ERROR:");

    if (error instanceof Error) {
        console.error(error.stack);
    } else {
        console.error(error);
    }

    process.exit(1);
});
