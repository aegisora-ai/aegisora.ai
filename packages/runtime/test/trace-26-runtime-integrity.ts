import { AgentRuntime } from "../src/agent/runtime/agent-runtime";

async function main() {

    console.log("");
    console.log("============================================================");
    console.log("TRACE 26 — REAL FAILURE / STOP / EVENT ORDERING TEST");
    console.log("============================================================");

    const runtime = new AgentRuntime();

    // ==========================================================
    // SUCCESS PATH
    // ==========================================================

    const successId = "trace-26-success";

    console.log("");
    console.log("[A] Creating success-path agent...");

    runtime.create(
        successId,
        {
            trace: "26",
            path: "success"
        }
    );

    const successInitial =
        runtime.getAgent(successId);

    if (!successInitial) {
        throw new Error(
            "Success agent missing from registry."
        );
    }

    if (successInitial.status !== "idle") {
        throw new Error(
            `Expected success agent idle, got ${successInitial.status}`
        );
    }

    console.log(
        "Success initial state:",
        successInitial.status
    );

    console.log("");
    console.log("[B] Running real success execution...");

    const successResult =
        await runtime.runAgent(
            successId,
            "Create a simple autonomous task plan"
        );

    console.log(
        "Success result:",
        successResult
    );

    const successFinal =
        runtime.getAgent(successId);

    if (!successFinal) {
        throw new Error(
            "Success agent disappeared from registry."
        );
    }

    if (successFinal.status !== "completed") {
        throw new Error(
            `Expected completed, got ${successFinal.status}`
        );
    }

    console.log(
        "Success final state: completed"
    );

    console.log("");
    console.log("[C] Verifying success event ordering...");

    const successEvents =
        runtime
            .getEventStore()
            .getAll()
            .filter(
                event =>
                    event.agentId === successId
            );

    const successTypes =
        successEvents.map(
            event => event.type
        );

    console.log(
        "Success events:",
        successTypes
    );

    const createdIndex =
        successTypes.indexOf(
            "agent.created"
        );

    const startedIndex =
        successTypes.indexOf(
            "agent.started"
        );

    const completedIndex =
        successTypes.indexOf(
            "agent.completed"
        );

    if (
        createdIndex < 0 ||
        startedIndex < 0 ||
        completedIndex < 0
    ) {
        throw new Error(
            "Required success lifecycle events are missing."
        );
    }

    if (
        createdIndex >= startedIndex ||
        startedIndex >= completedIndex
    ) {
        throw new Error(
            "Success lifecycle event ordering is invalid."
        );
    }

    console.log(
        "Success event ordering: PASS"
    );

    // ==========================================================
    // FAILURE PATH
    // ==========================================================

    const failureId = "trace-26-failure";

    console.log("");
    console.log("[D] Creating failure-path agent...");

    runtime.create(
        failureId,
        {
            trace: "26",
            path: "failure"
        }
    );

    const failureInitial =
        runtime.getAgent(failureId);

    if (!failureInitial) {
        throw new Error(
            "Failure agent missing from registry."
        );
    }

    if (failureInitial.status !== "idle") {
        throw new Error(
            `Expected failure agent idle, got ${failureInitial.status}`
        );
    }

    console.log(
        "Failure initial state:",
        failureInitial.status
    );

    console.log("");
    console.log("[E] Starting failure-path agent before canonical failure transition...");

    runtime.getContext().lifecycle.start(
        failureId
    );

    const failureRunning =
        runtime.getAgent(failureId);

    if (!failureRunning) {
        throw new Error(
            "Failure agent disappeared after start."
        );
    }

    if (failureRunning.status !== "running") {
        throw new Error(
            `Expected failure agent running before fail, got ${failureRunning.status}`
        );
    }

    console.log(
        "Failure state before fail:",
        failureRunning.status
    );

    console.log("");
    console.log("[E] Executing canonical failure transition...");

    const failureResult =
        runtime.failAgent(
            failureId,
            new Error(
                "TRACE 26 intentional failure"
            )
        );

    console.log(
        "Failure result:",
        failureResult
    );

    const failureFinal =
        runtime.getAgent(failureId);

    if (!failureFinal) {
        throw new Error(
            "Failure agent disappeared from registry."
        );
    }

    if (failureFinal.status !== "failed") {
        throw new Error(
            `Expected failed, got ${failureFinal.status}`
        );
    }

    console.log(
        "Failure final state: failed"
    );

    console.log("");
    console.log("[F] Verifying agent.failed persistence...");

    const failureEvents =
        runtime
            .getEventStore()
            .getAll()
            .filter(
                event =>
                    event.agentId === failureId
            );

    const failureTypes =
        failureEvents.map(
            event => event.type
        );

    console.log(
        "Failure events:",
        failureTypes
    );

    if (
        !failureTypes.includes(
            "agent.created"
        )
    ) {
        throw new Error(
            "Failure agent.created missing."
        );
    }

    if (
        !failureTypes.includes(
            "agent.failed"
        )
    ) {
        throw new Error(
            "agent.failed was not persisted."
        );
    }

    console.log(
        "agent.failed persistence: PASS"
    );

    // ==========================================================
    // STOP PATH
    // ==========================================================

    const stopId = "trace-26-stop";

    console.log("");
    console.log("[G] Creating stop-path agent...");

    runtime.create(
        stopId,
        {
            trace: "26",
            path: "stop"
        }
    );

    console.log(
        "Starting stop-path agent before canonical stop transition..."
    );

    runtime.getContext().lifecycle.start(
        stopId
    );

    const stopRunning =
        runtime.getAgent(stopId);

    if (!stopRunning) {
        throw new Error(
            "Stop agent disappeared after start."
        );
    }

    if (stopRunning.status !== "running") {
        throw new Error(
            `Expected stop agent running before stop, got ${stopRunning.status}`
        );
    }

    console.log(
        "Stop state before stop:",
        stopRunning.status
    );

    console.log(
        "Executing canonical stop transition..."
    );

    const stopResult =
        runtime.stopAgent(
            stopId
        );

    console.log(
        "Stop result:",
        stopResult
    );

    const stopFinal =
        runtime.getAgent(stopId);

    if (!stopFinal) {
        throw new Error(
            "Stop agent missing from registry."
        );
    }

    if (stopFinal.status !== "stopped") {
        throw new Error(
            `Expected stopped, got ${stopFinal.status}`
        );
    }

    console.log(
        "Stop final state: stopped"
    );

    console.log("");
    console.log("[H] Verifying agent.stopped persistence...");

    const stopEvents =
        runtime
            .getEventStore()
            .getAll()
            .filter(
                event =>
                    event.agentId === stopId
            );

    const stopTypes =
        stopEvents.map(
            event => event.type
        );

    console.log(
        "Stop events:",
        stopTypes
    );

    if (
        !stopTypes.includes(
            "agent.created"
        )
    ) {
        throw new Error(
            "Stop agent.created missing."
        );
    }

    if (
        !stopTypes.includes(
            "agent.stopped"
        )
    ) {
        throw new Error(
            "agent.stopped was not persisted."
        );
    }

    console.log(
        "agent.stopped persistence: PASS"
    );

    // ==========================================================
    // DUPLICATION
    // ==========================================================

    console.log("");
    console.log("[I] Auditing lifecycle event duplication...");

    const lifecycleEvents =
        stopTypes.filter(
            type =>
                type === "agent.created" ||
                type === "agent.started" ||
                type === "agent.completed" ||
                type === "agent.failed" ||
                type === "agent.stopped"
        );

    const counts =
        new Map<string, number>();

    for (
        const type of lifecycleEvents
    ) {
        counts.set(
            type,
            (counts.get(type) ?? 0) + 1
        );
    }

    console.log(
        "Lifecycle event counts:",
        Object.fromEntries(counts)
    );

    if (
        (counts.get("agent.created") ?? 0) !== 1
    ) {
        throw new Error(
            "agent.created duplication detected."
        );
    }

    if (
        (counts.get("agent.stopped") ?? 0) !== 1
    ) {
        throw new Error(
            "agent.stopped duplication or absence detected."
        );
    }

    console.log(
        "Lifecycle duplication audit: PASS"
    );

    // ==========================================================
    // METRICS
    // ==========================================================

    console.log("");
    console.log("[J] Verifying observability metrics...");

    const metrics =
        runtime.getMetrics();

    console.log(
        "Metrics:",
        metrics
    );

    if (
        typeof metrics.total !== "number"
    ) {
        throw new Error(
            "Runtime metrics total missing."
        );
    }

    console.log(
        "Metrics surface: PASS"
    );

    console.log("");
    console.log("============================================================");
    console.log("TRACE 26 COMPLETE — REAL FAILURE / STOP INTEGRITY: PASS");
    console.log("============================================================");
    console.log("");

}

main().catch(
    error => {

        console.error("");
        console.error(
            "TRACE 26 FAILED"
        );

        console.error(
            error
        );

        process.exit(
            1
        );

    }
);
