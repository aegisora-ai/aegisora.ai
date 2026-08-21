import { AgentRuntime } from "../src/agent/runtime/agent-runtime";

async function main() {

    console.log("");
    console.log("============================================================");
    console.log("TRACE 32 — TERMINAL STATE IMMUTABILITY");
    console.log("============================================================");
    console.log("");

    const runtime =
        new AgentRuntime();

    // ==========================================================
    // STOP → COMPLETE
    // ==========================================================

    const stoppedId =
        "trace-32-stopped";

    console.log("[A] Testing stopped → completed protection...");

    runtime.create(
        stoppedId,
        {
            trace: "32",
            path: "stopped-to-completed"
        }
    );

    runtime.getContext().lifecycle.start(
        stoppedId
    );

    runtime.stopAgent(
        stoppedId
    );

    const stoppedAgent =
        runtime.getAgent(
            stoppedId
        );

    if (!stoppedAgent) {
        throw new Error(
            "Stopped agent disappeared."
        );
    }

    if (stoppedAgent.status !== "stopped") {
        throw new Error(
            `Expected stopped, got ${stoppedAgent.status}`
        );
    }

    let completeBlocked =
        false;

    try {

        runtime.completeAgent(
            stoppedId
        );

    } catch (error) {

        completeBlocked = true;

        console.log(
            "Stopped → completed blocked:",
            error instanceof Error
                ? error.message
                : error
        );

    }

    const stoppedAfterCompleteAttempt =
        runtime.getAgent(
            stoppedId
        );

    if (!stoppedAfterCompleteAttempt) {
        throw new Error(
            "Stopped agent disappeared after complete attempt."
        );
    }

    if (
        stoppedAfterCompleteAttempt.status !==
        "stopped"
    ) {
        throw new Error(
            `Terminal state mutated: ${stoppedAfterCompleteAttempt.status}`
        );
    }

    if (!completeBlocked) {
        console.log(
            "WARNING: completeAgent() did not throw, but state remained stopped."
        );
    }

    console.log(
        "Stopped terminal immutability: PASS"
    );

    // ==========================================================
    // STOP → FAIL
    // ==========================================================

    const stoppedFailureId =
        "trace-32-stopped-failure";

    console.log("");
    console.log("[B] Testing stopped → failed protection...");

    runtime.create(
        stoppedFailureId,
        {
            trace: "32",
            path: "stopped-to-failed"
        }
    );

    runtime.getContext().lifecycle.start(
        stoppedFailureId
    );

    runtime.stopAgent(
        stoppedFailureId
    );

    let failBlocked =
        false;

    try {

        runtime.failAgent(
            stoppedFailureId,
            new Error(
                "TRACE 32 forbidden failure"
            )
        );

    } catch (error) {

        failBlocked = true;

        console.log(
            "Stopped → failed blocked:",
            error instanceof Error
                ? error.message
                : error
        );

    }

    const stoppedAfterFailAttempt =
        runtime.getAgent(
            stoppedFailureId
        );

    if (!stoppedAfterFailAttempt) {
        throw new Error(
            "Stopped agent disappeared after fail attempt."
        );
    }

    if (
        stoppedAfterFailAttempt.status !==
        "stopped"
    ) {
        throw new Error(
            `Terminal state mutated to ${stoppedAfterFailAttempt.status}`
        );
    }

    if (!failBlocked) {
        console.log(
            "WARNING: failAgent() did not throw, but state remained stopped."
        );
    }

    console.log(
        "Stopped → failed protection: PASS"
    );

    // ==========================================================
    // COMPLETE → FAIL
    // ==========================================================

    const completedId =
        "trace-32-completed";

    console.log("");
    console.log("[C] Testing completed → failed protection...");

    runtime.create(
        completedId,
        {
            trace: "32",
            path: "completed-to-failed"
        }
    );

    runtime.getContext().lifecycle.start(
        completedId
    );

    runtime.completeAgent(
        completedId
    );

    let completedFailBlocked =
        false;

    try {

        runtime.failAgent(
            completedId,
            new Error(
                "TRACE 32 forbidden post-completion failure"
            )
        );

    } catch (error) {

        completedFailBlocked = true;

        console.log(
            "Completed → failed blocked:",
            error instanceof Error
                ? error.message
                : error
        );

    }

    const completedAgent =
        runtime.getAgent(
            completedId
        );

    if (!completedAgent) {
        throw new Error(
            "Completed agent disappeared."
        );
    }

    if (
        completedAgent.status !==
        "completed"
    ) {
        throw new Error(
            `Completed terminal state mutated to ${completedAgent.status}`
        );
    }

    if (!completedFailBlocked) {
        console.log(
            "WARNING: failAgent() did not throw, but state remained completed."
        );
    }

    console.log(
        "Completed terminal immutability: PASS"
    );

    // ==========================================================
    // FAIL → COMPLETE
    // ==========================================================

    const failedId =
        "trace-32-failed";

    console.log("");
    console.log("[D] Testing failed → completed protection...");

    runtime.create(
        failedId,
        {
            trace: "32",
            path: "failed-to-completed"
        }
    );

    runtime.getContext().lifecycle.start(
        failedId
    );

    runtime.failAgent(
        failedId,
        new Error(
            "TRACE 32 intentional failure"
        )
    );

    let failedCompleteBlocked =
        false;

    try {

        runtime.completeAgent(
            failedId
        );

    } catch (error) {

        failedCompleteBlocked = true;

        console.log(
            "Failed → completed blocked:",
            error instanceof Error
                ? error.message
                : error
        );

    }

    const failedAgent =
        runtime.getAgent(
            failedId
        );

    if (!failedAgent) {
        throw new Error(
            "Failed agent disappeared."
        );
    }

    if (
        failedAgent.status !==
        "failed"
    ) {
        throw new Error(
            `Failed terminal state mutated to ${failedAgent.status}`
        );
    }

    if (!failedCompleteBlocked) {
        console.log(
            "WARNING: completeAgent() did not throw, but state remained failed."
        );
    }

    console.log(
        "Failed terminal immutability: PASS"
    );

    // ==========================================================
    // EVENT AUDIT
    // ==========================================================

    console.log("");
    console.log("[E] Auditing lifecycle events...");

    const events =
        runtime
            .getEventStore()
            .getAll();

    const stoppedEvents =
        events.filter(
            event =>
                event.agentId === stoppedId
        );

    const stoppedTypes =
        stoppedEvents.map(
            event => event.type
        );

    console.log(
        "Stopped agent events:",
        stoppedTypes
    );

    if (
        stoppedTypes.filter(
            type =>
                type === "agent.stopped"
        ).length !== 1
    ) {
        throw new Error(
            "Stopped agent must have exactly one agent.stopped event."
        );
    }

    if (
        stoppedTypes.includes(
            "agent.completed"
        ) ||
        stoppedTypes.includes(
            "agent.failed"
        )
    ) {
        throw new Error(
            "Stopped agent received forbidden terminal lifecycle event."
        );
    }

    console.log(
        "Stopped lifecycle integrity: PASS"
    );

    console.log("");
    console.log("============================================================");
    console.log("TRACE 32 TERMINAL STATE IMMUTABILITY: PASS");
    console.log("============================================================");
    console.log("");

}

main().catch(
    error => {

        console.error("");
        console.error(
            "TRACE 32 FAILED"
        );

        console.error(
            error
        );

        process.exit(1);
    }
);
