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
    console.log(" TRACE 100-HB-R1 :: REAL CONTRACT HARD BOUNDARY PROOF");
    console.log("============================================================");

    const provider = new CountingProvider("openai");

    // ------------------------------------------------------------
    // REAL RUNTIME
    // ------------------------------------------------------------

    const runtime = new AgentRuntime();

    console.log("");
    console.log("[1] RUNTIME CREATED");

    // IMPORTANT:
    // Real contract is createAgent(id, config?)
    const agent = await runtime.createAgent(
        "trace-100-real-agent",
        {
            name: "TRACE 100 Real Agent",
        }
    );

    assert.ok(agent, "Real agent must be created.");

    const registeredId = agent.id;

    assert.equal(
        typeof registeredId,
        "string",
        "Registered agent identity must be a string."
    );

    assert.equal(
        registeredId,
        "trace-100-real-agent",
        "Runtime must preserve canonical agent ID."
    );

    console.log(
        "Registered agent:",
        registeredId
    );

    // ------------------------------------------------------------
    // PROVIDER GATEWAY
    // ------------------------------------------------------------

    const runtimeAny = runtime as any;

    const gateway =
        runtimeAny.getProviderGateway?.() ??
        runtimeAny.providerGateway;

    assert.ok(
        gateway,
        "AgentRuntime must expose ProviderExecutionGateway."
    );

    console.log(
        "[OK] ProviderExecutionGateway discovered."
    );

    // ------------------------------------------------------------
    // REAL PROVIDER ROUTER
    // ------------------------------------------------------------

    /*
     * ProviderManager is NOT the registration surface.
     *
     * ProviderExecutionGateway owns:
     *
     *   router
     *   manager
     *   enforcement
     *
     * ProviderRouter owns provider registration.
     *
     * We intentionally access the existing router through the
     * runtime object for this proof only.
     *
     * NO SOURCE MODIFICATION.
     */

    const router =
        runtimeAny
            .getProviderGateway?.()
            ?.router ??
        gateway.router;

    assert.ok(
        router,
        "ProviderRouter must be reachable from ProviderExecutionGateway."
    );

    assert.equal(
        typeof router.register,
        "function",
        "ProviderRouter.register() must exist."
    );

    console.log(
        "[OK] ProviderRouter discovered."
    );

    router.register(
        "openai",
        provider
    );

    console.log(
        "[OK] CountingProvider registered as openai."
    );

    console.log(
        "Router providers:",
        router.list()
    );

    // ============================================================
    // CASE 1 — REGISTERED IDENTITY
    // ============================================================

    banner(
        "CASE 1 :: REGISTERED IDENTITY -> ALLOW -> PROVIDER = 1"
    );

    const beforeRegistered =
        provider.calls;

    let registeredResult: any;

    try {
        registeredResult =
            await gateway.generate({
                agentId: registeredId,
                provider: "openai",
                request: {
                    prompt:
                        "TRACE 100 registered identity",
                    model: "test-model",
                },
            });
    } catch (error) {
        console.log(
            "[REGISTERED] Runtime threw:",
            error instanceof Error
                ? error.stack ?? error.message
                : error
        );

        throw error;
    }

    const registeredDelta =
        provider.calls -
        beforeRegistered;

    console.log(
        "Provider calls:",
        provider.calls
    );

    console.log(
        "Provider call delta:",
        registeredDelta
    );

    console.log(
        "Result:",
        JSON.stringify(
            registeredResult,
            null,
            2
        )
    );

    assert.equal(
        registeredDelta,
        1,
        "REGISTERED identity must produce exactly one provider call."
    );

    console.log(
        "[PASS] REGISTERED IDENTITY -> ALLOW -> provider +1"
    );

    // ============================================================
    // CASE 2 — FORGED IDENTITY
    // ============================================================

    banner(
        "CASE 2 :: FORGED IDENTITY -> BLOCK -> PROVIDER = 0"
    );

    const beforeForged =
        provider.calls;

    let forgedBlocked = false;

    try {
        await gateway.generate({
            agentId:
                "trace-100-FORGED-ID",
            provider: "openai",
            request: {
                prompt:
                    "TRACE 100 forged identity",
                model: "test-model",
            },
        });
    } catch (error) {
        forgedBlocked = true;

        console.log(
            "Forged identity rejected:",
            error instanceof Error
                ? error.message
                : error
        );
    }

    const forgedDelta =
        provider.calls -
        beforeForged;

    console.log(
        "Provider call delta:",
        forgedDelta
    );

    assert.equal(
        forgedDelta,
        0,
        "FORGED identity must never reach provider.generate()."
    );

    assert.ok(
        forgedBlocked,
        "FORGED identity must be rejected by the runtime boundary."
    );

    console.log(
        "[PASS] FORGED IDENTITY -> BLOCK -> provider +0"
    );

    // ============================================================
    // CASE 3 — UNKNOWN CAPABILITY
    // ============================================================

    banner(
        "CASE 3 :: UNKNOWN CAPABILITY -> BLOCK -> PROVIDER = 0"
    );

    /*
     * IMPORTANT:
     *
     * ProviderExecutionGateway canonicalizes the enforced tool as:
     *
     *     provider:${providerName}
     *
     * Therefore merely placing `metadata.tool` here cannot change
     * the capability being enforced.
     *
     * We therefore use a restricted/unknown capability through the
     * real EnforcementGate for this specific assertion while still
     * proving the provider call counter remains zero.
     */

    const beforeUnknown =
        provider.calls;

    const enforcement =
        runtimeAny
            .getContext?.();

    assert.ok(
        enforcement,
        "RuntimeContext must be reachable."
    );

    console.log(
        "[OK] RuntimeContext discovered."
    );

    const EnforcementGate =
        (await import("../src/enforcement"))
            .EnforcementGate;

    const gate =
        new EnforcementGate(
            enforcement
        );

    const unknownResult =
        await gate.enforce({
            agentId: registeredId,
            tool: "trace-100-UNKNOWN-CAPABILITY",
            action: "unknown.execute",
            input: {
                prompt:
                    "TRACE 100 unknown capability",
            },
            metadata: {
                capability:
                    "trace-100-UNKNOWN-CAPABILITY",
            },
        } as any);

    console.log(
        "Unknown capability decision:",
        unknownResult.decision
    );

    console.log(
        "Unknown capability reason:",
        unknownResult.reason
    );

    const unknownDelta =
        provider.calls -
        beforeUnknown;

    console.log(
        "Provider call delta:",
        unknownDelta
    );

    assert.equal(
        unknownDelta,
        0,
        "Unknown capability must never reach provider.generate()."
    );

    assert.notEqual(
        unknownResult.decision,
        "ALLOW",
        "Unknown capability must not be ALLOW."
    );

    console.log(
        "[PASS] UNKNOWN CAPABILITY -> no provider call"
    );

    // ============================================================
    // CASE 4 — UNAUTHORIZED / UNSUPPORTED PROVIDER
    // ============================================================

    banner(
        "CASE 4 :: UNSUPPORTED PROVIDER -> NO PROVIDER CALL"
    );

    const beforeUnauthorized =
        provider.calls;

    let unauthorizedRejected =
        false;

    try {
        await gateway.generate({
            agentId: registeredId,
            provider:
                "trace-100-UNAUTHORIZED" as ProviderName,
            request: {
                prompt:
                    "TRACE 100 unauthorized provider",
                model: "test-model",
            },
        });
    } catch (error) {
        unauthorizedRejected = true;

        console.log(
            "Unauthorized provider rejected:",
            error instanceof Error
                ? error.message
                : error
        );
    }

    const unauthorizedDelta =
        provider.calls -
        beforeUnauthorized;

    console.log(
        "Registered provider call delta:",
        unauthorizedDelta
    );

    assert.equal(
        unauthorizedDelta,
        0,
        "Unsupported provider must not call the registered provider."
    );

    assert.ok(
        unauthorizedRejected,
        "Unsupported provider must be rejected."
    );

    console.log(
        "[PASS] UNSUPPORTED PROVIDER -> provider +0"
    );

    // ============================================================
    // AUDIT EVIDENCE
    // ============================================================

    banner(
        "CASE 5 :: DECISION -> AUDIT EVIDENCE"
    );

    const traces =
        runtime.getDecisionTraces();

    console.log(
        "Decision trace count:",
        traces.length
    );

    assert.ok(
        traces.length >= 3,
        "Boundary decisions must produce audit evidence."
    );

    const forgedAudit =
        traces.find(
            (trace: any) =>
                trace.agentId ===
                "trace-100-FORGED-ID"
        );

    assert.ok(
        forgedAudit,
        "Forged identity decision must be present in audit evidence."
    );

    console.log(
        "[PASS] BLOCK decision correlated with audit evidence."
    );

    // ============================================================
    // FINAL
    // ============================================================

    console.log("");
    console.log("============================================================");
    console.log(" TRACE 100-HB-R1 RESULT");
    console.log("============================================================");

    console.log(
        "Provider calls total:",
        provider.calls
    );

    console.log("");
    console.log(
        "CORE BOUNDARY ASSERTIONS:"
    );

    console.log(
        "  REGISTERED IDENTITY  -> ALLOW -> CALL +1"
    );

    console.log(
        "  FORGED IDENTITY      -> BLOCK -> CALL +0"
    );

    console.log(
        "  UNKNOWN CAPABILITY   -> NON-ALLOW -> CALL +0"
    );

    console.log(
        "  UNSUPPORTED PROVIDER -> REJECT -> CALL +0"
    );

    console.log(
        "  DECISION             -> AUDIT EVIDENCE"
    );

    console.log("");
    console.log(
        "TRACE 100-HB-R1 COMPLETE"
    );
}

main().catch((error) => {
    console.error("");
    console.error(
        "============================================================"
    );
    console.error(
        " TRACE 100-HB-R1 FAILED"
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
