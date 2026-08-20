import assert from "node:assert/strict";

import { AgentRuntime } from "../src/agent/runtime/agent-runtime";
import type { Provider } from "../src/providers/provider";
import type { ProviderName } from "../src/providers/provider-router";

class CountingProvider implements Provider {
    public calls = 0;

    constructor(
        public readonly name: ProviderName = "openai"
    ) {}

    async generate(input: any): Promise<any> {
        this.calls++;

        console.log(
            `[COUNTING PROVIDER] generate() call #${this.calls}`
        );

        return {
            text: "PROVIDER_EXECUTED",
            model: input?.model ?? "test-model",
        };
    }
}

function banner(name: string) {
    console.log("");
    console.log("------------------------------------------------------------");
    console.log(name);
    console.log("------------------------------------------------------------");
}

async function main() {
    console.log("");
    console.log("============================================================");
    console.log(" TRACE 100-HB-R3 :: IDENTITY REVOCATION / RE-REGISTRATION");
    console.log("============================================================");

    const runtime = new AgentRuntime();
    const runtimeAny = runtime as any;

    const provider = new CountingProvider("openai");

    // ------------------------------------------------------------
    // DISCOVER REAL CONTRACT
    // ------------------------------------------------------------

    banner("STEP 1 :: DISCOVER REAL RUNTIME CONTRACT");

    const registry =
        runtime.getAgentRegistry?.() ??
        runtimeAny.context?.agentRegistry;

    assert.ok(
        registry,
        "AgentRegistry must be reachable from AgentRuntime."
    );

    assert.equal(
        typeof registry.getById,
        "function",
        "AgentRegistry.getById() must exist."
    );

    assert.equal(
        typeof registry.remove,
        "function",
        "AgentRegistry.remove() must exist."
    );

    assert.equal(
        typeof registry.register,
        "function",
        "AgentRegistry.register() must exist."
    );

    console.log("[OK] AgentRegistry discovered.");
    console.log("[OK] getById() discovered.");
    console.log("[OK] remove() discovered.");
    console.log("[OK] register() discovered.");

    const gateway =
        runtime.getProviderGateway?.() ??
        runtimeAny.providerGateway;

    assert.ok(
        gateway,
        "ProviderExecutionGateway must be reachable."
    );

    const router =
        gateway.router;

    assert.ok(
        router,
        "ProviderRouter must be reachable."
    );

    assert.equal(
        typeof router.register,
        "function",
        "ProviderRouter.register() must exist."
    );

    router.register(
        "openai",
        provider
    );

    console.log("[OK] CountingProvider registered as openai.");

    // ------------------------------------------------------------
    // STEP 2 — CREATE / REGISTER IDENTITY
    // ------------------------------------------------------------

    banner(
        "STEP 2 :: CREATE IDENTITY -> REGISTRY MUST CONTAIN IT"
    );

    const agentId =
        "trace-100-lifecycle-agent";

    const agent =
        await runtime.createAgent(
            agentId,
            {
                name: "TRACE 100 Lifecycle Agent",
            }
        );

    assert.ok(
        agent,
        "Agent must be created."
    );

    assert.equal(
        agent.id,
        agentId,
        "Runtime must preserve canonical agent ID."
    );

    const registered =
        registry.getById(agentId);

    console.log(
        "Registry lookup after creation:",
        registered
    );

    assert.ok(
        registered,
        "Created agent must be registered."
    );

    assert.equal(
        registered.id,
        agentId,
        "Registered identity must match canonical ID."
    );

    console.log(
        "[PASS] CREATE -> REGISTERED IDENTITY PRESENT"
    );

    // ------------------------------------------------------------
    // STEP 3 — REGISTERED IDENTITY MUST ALLOW
    // ------------------------------------------------------------

    banner(
        "STEP 3 :: REGISTERED IDENTITY -> ALLOW -> PROVIDER +1"
    );

    const beforeAllow =
        provider.calls;

    const allowResult =
        await gateway.generate({
            agentId,
            provider: "openai",
            request: {
                prompt:
                    "TRACE 100 lifecycle initial execution",
                model: "test-model",
            },
        });

    const allowDelta =
        provider.calls -
        beforeAllow;

    console.log(
        "Provider call delta:",
        allowDelta
    );

    console.log(
        "Execution result:",
        JSON.stringify(
            allowResult,
            null,
            2
        )
    );

    assert.equal(
        allowDelta,
        1,
        "Registered identity must reach provider exactly once."
    );

    console.log(
        "[PASS] REGISTERED -> ALLOW -> provider +1"
    );

    // ------------------------------------------------------------
    // STEP 4 — REMOVE / REVOKE IDENTITY
    // ------------------------------------------------------------

    banner(
        "STEP 4 :: REMOVE IDENTITY -> REGISTRY MUST NO LONGER CONTAIN IT"
    );

    const removeResult =
        registry.remove(agentId);

    console.log(
        "registry.remove() result:",
        removeResult
    );

    const afterRemove =
        registry.getById(agentId);

    console.log(
        "Registry lookup after removal:",
        afterRemove
    );

    assert.ok(
        !afterRemove,
        "Removed agent must no longer exist in registry."
    );

    console.log(
        "[PASS] REMOVE -> IDENTITY REVOKED FROM REGISTRY"
    );

    // ------------------------------------------------------------
    // STEP 5 — REVOKED IDENTITY MUST NOT REACH PROVIDER
    // ------------------------------------------------------------

    banner(
        "STEP 5 :: REVOKED IDENTITY -> BLOCK -> PROVIDER +0"
    );

    const beforeRevoked =
        provider.calls;

    let revokedBlocked =
        false;

    try {
        await gateway.generate({
            agentId,
            provider: "openai",
            request: {
                prompt:
                    "TRACE 100 revoked identity execution",
                model: "test-model",
            },
        });
    } catch (error) {
        revokedBlocked = true;

        console.log(
            "Revoked identity rejected:",
            error instanceof Error
                ? error.message
                : error
        );
    }

    const revokedDelta =
        provider.calls -
        beforeRevoked;

    console.log(
        "Provider call delta:",
        revokedDelta
    );

    assert.equal(
        revokedDelta,
        0,
        "Revoked identity must never reach provider."
    );

    assert.ok(
        revokedBlocked,
        "Revoked identity must be rejected."
    );

    console.log(
        "[PASS] REVOKED -> BLOCK -> provider +0"
    );

    // ------------------------------------------------------------
    // STEP 6 — RE-REGISTER SAME IDENTITY
    // ------------------------------------------------------------

    banner(
        "STEP 6 :: RE-REGISTER SAME IDENTITY -> REGISTRY PRESENT"
    );

    const recreated =
        await runtime.createAgent(
            agentId,
            {
                name: "TRACE 100 Lifecycle Agent Recreated",
            }
        );

    assert.ok(
        recreated,
        "Identity must be re-creatable after removal."
    );

    assert.equal(
        recreated.id,
        agentId,
        "Recreated agent must preserve canonical ID."
    );

    const reRegistered =
        registry.getById(agentId);

    console.log(
        "Registry lookup after re-registration:",
        reRegistered
    );

    assert.ok(
        reRegistered,
        "Re-registered identity must exist in registry."
    );

    assert.equal(
        reRegistered.id,
        agentId,
        "Re-registered identity must match canonical ID."
    );

    console.log(
        "[PASS] REMOVE -> RE-REGISTER -> IDENTITY PRESENT"
    );

    // ------------------------------------------------------------
    // STEP 7 — RE-REGISTERED IDENTITY MUST ALLOW AGAIN
    // ------------------------------------------------------------

    banner(
        "STEP 7 :: RE-REGISTERED IDENTITY -> ALLOW -> PROVIDER +1"
    );

    const beforeReAllow =
        provider.calls;

    const reAllowResult =
        await gateway.generate({
            agentId,
            provider: "openai",
            request: {
                prompt:
                    "TRACE 100 re-registered identity execution",
                model: "test-model",
            },
        });

    const reAllowDelta =
        provider.calls -
        beforeReAllow;

    console.log(
        "Provider call delta:",
        reAllowDelta
    );

    console.log(
        "Execution result:",
        JSON.stringify(
            reAllowResult,
            null,
            2
        )
    );

    assert.equal(
        reAllowDelta,
        1,
        "Re-registered identity must reach provider exactly once."
    );

    console.log(
        "[PASS] RE-REGISTERED -> ALLOW -> provider +1"
    );

    // ------------------------------------------------------------
    // STEP 8 — FINAL REGISTRY STATE
    // ------------------------------------------------------------

    banner(
        "STEP 8 :: FINAL REGISTRY STATE"
    );

    const finalAgent =
        registry.getById(agentId);

    assert.ok(
        finalAgent,
        "Final identity must remain registered."
    );

    console.log(
        "Final registry identity:",
        finalAgent
    );

    // ------------------------------------------------------------
    // STEP 9 — AUDIT EVIDENCE
    // ------------------------------------------------------------

    banner(
        "STEP 9 :: LIFECYCLE DECISIONS -> AUDIT EVIDENCE"
    );

    const traces =
        runtime.getDecisionTraces();

    console.log(
        "Decision trace count:",
        traces.length
    );

    assert.ok(
        traces.length >= 2,
        "Lifecycle boundary decisions must produce audit evidence."
    );

    const revokedAudit =
        traces.find(
            (trace: any) =>
                trace.agentId === agentId &&
                trace.decision === "BLOCK"
        );

    if (revokedAudit) {
        console.log(
            "Revoked identity audit:",
            JSON.stringify(
                revokedAudit,
                null,
                2
            )
        );

        console.log(
            "[PASS] REVOKED identity BLOCK has audit evidence."
        );
    } else {
        console.log(
            "[INFO] No exact BLOCK trace match found; inspect decision traces above."
        );
    }

    // ------------------------------------------------------------
    // FINAL
    // ------------------------------------------------------------

    console.log("");
    console.log("============================================================");
    console.log(" TRACE 100-HB-R3 RESULT");
    console.log("============================================================");

    console.log(
        "Total provider calls:",
        provider.calls
    );

    console.log("");
    console.log("CORE LIFECYCLE ASSERTIONS:");

    console.log(
        "  CREATE             -> REGISTERED"
    );

    console.log(
        "  REGISTERED         -> ALLOW -> CALL +1"
    );

    console.log(
        "  REMOVE             -> REVOKED"
    );

    console.log(
        "  REVOKED            -> BLOCK -> CALL +0"
    );

    console.log(
        "  RE-REGISTER        -> REGISTERED"
    );

    console.log(
        "  RE-REGISTERED      -> ALLOW -> CALL +1"
    );

    console.log(
        "  DECISIONS          -> AUDIT EVIDENCE"
    );

    console.log("");
    console.log(
        "TRACE 100-HB-R3 COMPLETE"
    );
}

main().catch((error) => {
    console.error("");
    console.error(
        "============================================================"
    );
    console.error(
        " TRACE 100-HB-R3 FAILED"
    );
    console.error(
        "============================================================"
    );

    console.error(
        error instanceof Error
            ? error.stack ?? error.message
            : error
    );

    process.exitCode = 1;
});
