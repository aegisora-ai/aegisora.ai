import { AgentRuntime } from "../src/agent/runtime/agent-runtime";

const failingTool = {
    name: "trace-29-failing-tool",

    description:
        "Always throws for TRACE 29 loop-state testing.",

    execute: async () => {
        throw new Error(
            "TRACE 29 intentional loop failure"
        );
    }
};

async function main() {

    console.log("");
    console.log("============================================================");
    console.log("TRACE 29 — AGENT LOOP FAILURE STATE INTEGRITY");
    console.log("============================================================");
    console.log("");

    const runtime =
        new AgentRuntime();

    runtime.registerTool(
        failingTool
    );

    const agentId =
        "trace-29-loop-failure";

    console.log(
        "[A] Creating agent..."
    );

    runtime.create(
        agentId,
        {
            trace: "29",
            path: "loop-failure"
        }
    );

    console.log(
        "[B] Executing expected failure..."
    );

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
            "Expected execution failure was not propagated."
        );

    }

    console.log(
        "[C] Checking agent state..."
    );

    const agent =
        runtime.getAgent(
            agentId
        );

    if (!agent) {

        throw new Error(
            "Agent disappeared from registry."
        );

    }

    console.log(
        "Agent status:",
        agent.status
    );

    if (
        agent.status !==
        "failed"
    ) {

        throw new Error(
            `Expected agent status failed, got ${agent.status}`
        );

    }

    console.log(
        "Agent failure state: PASS"
    );

    console.log(
        "[D] Checking AgentLoop state..."
    );

    const loopState =
        runtime
            .getState()
            .loop;

    console.log(
        "Loop state:",
        loopState
    );

    if (
        loopState.status !==
        "failed"
    ) {

        throw new Error(
            `Expected loop status failed, got ${loopState.status}`
        );

    }

    if (
        loopState.lastAction !==
        "execution-failed"
    ) {

        throw new Error(
            `Expected lastAction execution-failed, got ${loopState.lastAction}`
        );

    }

    if (
        typeof loopState.completedAt !==
        "object"
    ) {

        throw new Error(
            "Loop completedAt was not recorded."
        );

    }

    console.log(
        "Loop failure state: PASS"
    );

    console.log(
        "[E] Checking persisted lifecycle events..."
    );

    const events =
        runtime
            .getEventStore()
            .getAll()
            .filter(
                event =>
                    event.agentId ===
                    agentId
            );

    const types =
        events.map(
            event =>
                event.type
        );

    console.log(
        "Events:",
        types
    );

    const failedCount =
        types.filter(
            type =>
                type ===
                "agent.failed"
        ).length;

    if (
        failedCount !== 1
    ) {

        throw new Error(
            `Expected exactly one agent.failed event, got ${failedCount}`
        );

    }

    console.log(
        "agent.failed uniqueness: PASS"
    );

    console.log(
        "[F] Checking failure metrics..."
    );

    const metrics =
        runtime.getMetrics();

    console.log(
        "Metrics:",
        metrics
    );

    if (
        metrics.failures !== 1
    ) {

        throw new Error(
            `Expected failures=1, got ${metrics.failures}`
        );

    }

    console.log(
        "Failure metrics: PASS"
    );

    console.log("");
    console.log("============================================================");
    console.log("TRACE 29 LOOP FAILURE STATE: PASS");
    console.log("============================================================");
    console.log("");

}

main().catch(
    error => {

        console.error("");
        console.error(
            "TRACE 29 FAILED"
        );

        console.error(
            error
        );

        process.exit(1);
    }
);
