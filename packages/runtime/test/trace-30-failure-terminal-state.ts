import { AgentRuntime } from "../src/agent/runtime/agent-runtime";

const failingTool = {
    name: "trace-30-failing-tool",

    description:
        "Always throws for TRACE 30 terminal-state testing.",

    execute: async () => {
        throw new Error(
            "TRACE 30 intentional terminal failure"
        );
    }
};

async function main() {

    console.log("");
    console.log("============================================================");
    console.log("TRACE 30 — FAILURE TERMINAL STATE / EVENT ORDER");
    console.log("============================================================");
    console.log("");

    const runtime =
        new AgentRuntime();

    runtime.registerTool(
        failingTool
    );

    const agentId =
        "trace-30-terminal-failure";

    console.log("[A] Creating agent...");

    runtime.create(
        agentId,
        {
            trace: "30",
            path: "failure-terminal"
        }
    );

    console.log("[B] Executing expected failure...");

    let caught = false;

    try {

        await runtime.runAgent(
            agentId,
            "Execute a task that must fail"
        );

    } catch (error) {

        caught = true;

        console.log(
            "Caught:",
            error instanceof Error
                ? error.message
                : error
        );
    }

    if (!caught) {
        throw new Error(
            "Expected failure was not propagated."
        );
    }

    console.log("[C] Checking terminal agent state...");

    const agent =
        runtime.getAgent(agentId);

    if (!agent) {
        throw new Error(
            "Agent disappeared from registry."
        );
    }

    console.log(
        "Final agent status:",
        agent.status
    );

    if (agent.status !== "failed") {
        throw new Error(
            `Expected failed, got ${agent.status}`
        );
    }

    console.log(
        "Terminal failed state: PASS"
    );

    console.log("[D] Checking lifecycle events...");

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

    const createdIndex =
        types.indexOf(
            "agent.created"
        );

    const startedIndex =
        types.indexOf(
            "agent.started"
        );

    const toolIndex =
        types.indexOf(
            "tool.called"
        );

    const failedIndex =
        types.indexOf(
            "agent.failed"
        );

    const completedIndex =
        types.indexOf(
            "agent.completed"
        );

    if (createdIndex < 0) {
        throw new Error(
            "agent.created missing."
        );
    }

    if (startedIndex < 0) {
        throw new Error(
            "agent.started missing."
        );
    }

    if (toolIndex < 0) {
        throw new Error(
            "tool.called missing."
        );
    }

    if (failedIndex < 0) {
        throw new Error(
            "agent.failed missing."
        );
    }

    console.log(
        "Required lifecycle events: PASS"
    );

    if (
        !(
            createdIndex <
            startedIndex &&
            startedIndex <
            toolIndex &&
            toolIndex <
            failedIndex
        )
    ) {
        throw new Error(
            "Failure event ordering is invalid."
        );
    }

    console.log(
        "Failure event ordering: PASS"
    );

    console.log("[E] Checking forbidden completion...");

    if (completedIndex >= 0) {
        throw new Error(
            "agent.completed exists after failure."
        );
    }

    console.log(
        "No agent.completed after failure: PASS"
    );

    console.log("[F] Checking failure uniqueness...");

    const failedCount =
        types.filter(
            type =>
                type === "agent.failed"
        ).length;

    if (failedCount !== 1) {
        throw new Error(
            `Expected exactly one agent.failed, got ${failedCount}`
        );
    }

    console.log(
        "Single agent.failed event: PASS"
    );

    console.log("[G] Checking loop terminal state...");

    const loop =
        runtime
            .getState()
            .loop;

    console.log(
        "Loop:",
        loop
    );

    if (loop.status !== "failed") {
        throw new Error(
            `Expected loop failed, got ${loop.status}`
        );
    }

    if (
        loop.lastAction !==
        "execution-failed"
    ) {
        throw new Error(
            `Expected execution-failed, got ${loop.lastAction}`
        );
    }

    console.log(
        "Loop terminal state: PASS"
    );

    console.log("[H] Checking metrics...");

    const metrics =
        runtime.getMetrics();

    console.log(
        "Metrics:",
        metrics
    );

    if (metrics.failures !== 1) {
        throw new Error(
            `Expected failures=1, got ${metrics.failures}`
        );
    }

    console.log(
        "Failure metrics: PASS"
    );

    console.log("");
    console.log("============================================================");
    console.log("TRACE 30 FAILURE TERMINAL STATE: PASS");
    console.log("============================================================");
    console.log("");

}

main().catch(
    error => {

        console.error("");
        console.error(
            "TRACE 30 FAILED"
        );

        console.error(
            error
        );

        process.exit(1);
    }
);
