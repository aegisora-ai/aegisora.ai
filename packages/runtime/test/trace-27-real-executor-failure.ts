import { AgentRuntime } from "../src/agent/runtime/agent-runtime";

const failingTool = {
    name: "trace-27-failing-tool",

    description: "Always throws for TRACE 27 failure testing.",

    execute: async () => {
        throw new Error("TRACE 27 intentional tool failure");
    }
};

async function main() {

    console.log("");
    console.log("============================================================");
    console.log("TRACE 27 — REAL EXECUTOR FAILURE PROPAGATION");
    console.log("============================================================");
    console.log("");

    const runtime = new AgentRuntime();

    runtime.registerTool(failingTool);

    const agentId = "trace-27-failure";

    console.log("[A] Creating failure-test agent...");

    runtime.create(
        agentId,
        {
            trace: "27",
            path: "executor-failure"
        }
    );

    console.log("[B] Running execution expected to fail...");

    let caught = false;

    try {

        await runtime.runAgent(
            agentId,
            "Execute a task that must fail"
        );

    } catch (error) {

        caught = true;

        console.log(
            "Caught execution error:",
            error instanceof Error
                ? error.message
                : error
        );
    }

    if (!caught) {
        throw new Error(
            "TRACE 27 expected executor failure was not thrown."
        );
    }

    console.log("[C] Checking final agent state...");

    const agent =
        runtime.getAgent(agentId);

    if (!agent) {
        throw new Error(
            "Failure-test agent disappeared."
        );
    }

    console.log(
        "Final registry state:",
        agent.status
    );

    if (agent.status !== "failed") {
        throw new Error(
            `Expected failed state, got ${agent.status}`
        );
    }

    console.log(
        "Agent failure state: PASS"
    );

    console.log("[D] Inspecting persisted events...");

    const events =
        runtime
            .getEventStore()
            .getAll()
            .filter(
                event =>
                    event.agentId === agentId
            );

    const types =
        events.map(
            event => event.type
        );

    console.log(
        "Events:",
        types
    );

    const failedEvents =
        events.filter(
            event =>
                event.type === "agent.failed"
        );

    console.log(
        "agent.failed count:",
        failedEvents.length
    );

    if (failedEvents.length === 0) {
        throw new Error(
            "No agent.failed event was persisted."
        );
    }

    if (failedEvents.length > 1) {
        throw new Error(
            `Duplicate agent.failed events detected: ${failedEvents.length}`
        );
    }

    console.log(
        "agent.failed persistence + uniqueness: PASS"
    );

    console.log("[E] Checking tool.called persistence...");

    const toolEvents =
        events.filter(
            event =>
                event.type === "tool.called"
        );

    console.log(
        "tool.called count:",
        toolEvents.length
    );

    if (toolEvents.length === 0) {
        throw new Error(
            "Expected tool.called event was not persisted."
        );
    }

    console.log(
        "tool.called persistence: PASS"
    );

    console.log("[F] Checking metrics...");

    const metrics =
        runtime.getMetrics();

    console.log(
        "Metrics:",
        metrics
    );

    if (typeof metrics.total !== "number") {
        throw new Error(
            "Metrics total missing."
        );
    }

    console.log(
        "Metrics surface: PASS"
    );

    console.log("");
    console.log("============================================================");
    console.log("TRACE 27 REAL EXECUTOR FAILURE: PASS");
    console.log("============================================================");
    console.log("");
}

main().catch(
    error => {

        console.error("");
        console.error(
            "TRACE 27 FAILED"
        );

        console.error(
            error
        );

        process.exit(1);
    }
);
