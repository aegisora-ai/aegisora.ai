import { AgentRuntime } from "../src/agent/runtime/agent-runtime";

async function main() {

    console.log("");
    console.log("============================================================");
    console.log("TRACE 31 — STOP TERMINAL STATE / EVENT INTEGRITY");
    console.log("============================================================");
    console.log("");

    const runtime =
        new AgentRuntime();

    const agentId =
        "trace-31-stop-terminal";

    console.log("[A] Creating agent...");

    runtime.create(
        agentId,
        {
            trace: "31",
            path: "stop-terminal"
        }
    );

    const initial =
        runtime.getAgent(agentId);

    if (!initial) {
        throw new Error(
            "Agent disappeared after creation."
        );
    }

    if (initial.status !== "idle") {
        throw new Error(
            `Expected idle, got ${initial.status}`
        );
    }

    console.log(
        "Initial state: idle"
    );

    console.log("[B] Starting agent lifecycle before canonical stop transition...");

    runtime.getContext().lifecycle.start(
        agentId
    );

    const runningAgent =
        runtime.getAgent(agentId);

    if (!runningAgent) {
        throw new Error(
            "Agent disappeared after lifecycle start."
        );
    }

    if (runningAgent.status !== "running") {
        throw new Error(
            `Expected running before stop, got ${runningAgent.status}`
        );
    }

    console.log(
        "State before stop:",
        runningAgent.status
    );

    console.log("[B] Executing canonical stop transition...");

    const result =
        runtime.stopAgent(
            agentId
        );

    console.log(
        "Stop result:",
        result
    );

    console.log("[C] Checking terminal agent state...");

    const agent =
        runtime.getAgent(agentId);

    if (!agent) {
        throw new Error(
            "Agent disappeared after stop."
        );
    }

    console.log(
        "Final agent status:",
        agent.status
    );

    if (agent.status !== "stopped") {
        throw new Error(
            `Expected stopped, got ${agent.status}`
        );
    }

    console.log(
        "Stopped terminal state: PASS"
    );

    console.log("[D] Inspecting lifecycle events...");

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

    const stoppedIndex =
        types.indexOf(
            "agent.stopped"
        );

    const completedIndex =
        types.indexOf(
            "agent.completed"
        );

    const failedIndex =
        types.indexOf(
            "agent.failed"
        );

    if (createdIndex < 0) {
        throw new Error(
            "agent.created missing."
        );
    }

    if (stoppedIndex < 0) {
        throw new Error(
            "agent.stopped missing."
        );
    }

    console.log(
        "Required stop events: PASS"
    );

    if (createdIndex >= stoppedIndex) {
        throw new Error(
            "Stop event ordering is invalid."
        );
    }

    console.log(
        "Stop event ordering: PASS"
    );

    console.log("[E] Checking forbidden terminal transitions...");

    if (completedIndex >= 0) {
        throw new Error(
            "agent.completed exists on stopped agent."
        );
    }

    if (failedIndex >= 0) {
        throw new Error(
            "agent.failed exists on stopped agent."
        );
    }

    console.log(
        "No completed/failed event after stop: PASS"
    );

    console.log("[F] Checking stop uniqueness...");

    const stoppedCount =
        types.filter(
            type =>
                type === "agent.stopped"
        ).length;

    if (stoppedCount !== 1) {
        throw new Error(
            `Expected exactly one agent.stopped, got ${stoppedCount}`
        );
    }

    console.log(
        "Single agent.stopped event: PASS"
    );

    console.log("[G] Checking stop event payload...");

    const stoppedEvent =
        events.find(
            event =>
                event.type === "agent.stopped"
        );

    if (!stoppedEvent) {
        throw new Error(
            "agent.stopped event not found."
        );
    }

    if (!stoppedEvent.id) {
        throw new Error(
            "agent.stopped event id missing."
        );
    }

    if (!stoppedEvent.timestamp) {
        throw new Error(
            "agent.stopped timestamp missing."
        );
    }

    if (stoppedEvent.agentId !== agentId) {
        throw new Error(
            "agent.stopped agentId mismatch."
        );
    }

    console.log(
        "Stop event payload: PASS"
    );

    console.log("[H] Checking metrics...");

    const metrics =
        runtime.getMetrics();

    console.log(
        "Metrics:",
        metrics
    );

    if (metrics.failures !== 0) {
        throw new Error(
            `Expected failures=0, got ${metrics.failures}`
        );
    }

    if (metrics.total !== 3) {
        throw new Error(
            `Expected exactly 3 lifecycle events, got ${metrics.total}`
        );
    }

    console.log(
        "Stop metrics: PASS"
    );

    console.log("");
    console.log("============================================================");
    console.log("TRACE 31 STOP TERMINAL STATE: PASS");
    console.log("============================================================");
    console.log("");

}

main().catch(
    error => {

        console.error("");
        console.error(
            "TRACE 31 FAILED"
        );

        console.error(
            error
        );

        process.exit(1);
    }
);
