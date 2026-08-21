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
    console.log(" TRACE 100-HB-R2 :: POLICY / RISK / EXECUTION BOUNDARY");
    console.log("============================================================");

    const runtime = new AgentRuntime();

    const agent = await runtime.createAgent(
        "trace-100-r2-agent",
        {
            name: "TRACE 100 R2 Agent",
        }
    );

    assert.ok(agent);

    const agentId = agent.id;

    console.log("");
    console.log("[1] REGISTERED AGENT");
    console.log("Agent:", agentId);

    const runtimeAny = runtime as any;

    const gateway =
        runtimeAny.getProviderGateway?.() ??
        runtimeAny.providerGateway;

    assert.ok(
        gateway,
        "ProviderExecutionGateway must exist."
    );

    const router =
        gateway.router ??
        runtimeAny.providerRouter;

    assert.ok(
        router,
        "ProviderRouter must exist."
    );

    const provider =
        new CountingProvider("openai");

    router.register(
        "openai",
        provider
    );

    console.log(
        "[OK] CountingProvider registered."
    );

    // ============================================================
    // CASE 1 — BASELINE ALLOW
    // ============================================================

    banner(
        "CASE 1 :: BASELINE ALLOW -> PROVIDER = 1"
    );

    const beforeAllow =
        provider.calls;

    const allowResult =
        await gateway.generate({
            agentId,
            provider: "openai",
            request: {
                prompt:
                    "TRACE 100 R2 normal request",
                model: "test-model",
            },
        });

    const allowDelta =
        provider.calls -
        beforeAllow;

    console.log(
        "Decision result:",
        JSON.stringify(
            allowResult,
            null,
            2
        )
    );

    console.log(
        "Provider delta:",
        allowDelta
    );

    assert.equal(
        allowDelta,
        1,
        "Baseline ALLOW must execute exactly once."
    );

    console.log(
        "[PASS] ALLOW -> provider +1"
    );

    // ============================================================
    // CASE 2 — POLICY VIOLATION
    // ============================================================

    banner(
        "CASE 2 :: POLICY VIOLATION -> BLOCK -> PROVIDER = 0"
    );

    const beforePolicy =
        provider.calls;

    let policyBlocked =
        false;

    let policyResult:
        | unknown
        | undefined;

    try {
        policyResult =
            await gateway.generate({
                agentId,
                provider: "openai",
                request: {
                    prompt:
                        "TRACE 100 R2 policy violation",
                    model: "test-model",
                },
                metadata: {
                    tool: "shell",
                },
            } as any);
    } catch (error) {
        policyBlocked = true;

        policyResult = error;

        console.log(
            "Policy rejection:",
            error instanceof Error
                ? error.message
                : error
        );
    }

    const policyDelta =
        provider.calls -
        beforePolicy;

    console.log(
        "Provider delta:",
        policyDelta
    );

    assert.equal(
        policyDelta,
        0,
        "Policy violation must never call provider."
    );

    console.log(
        "[PASS] POLICY VIOLATION -> provider +0"
    );

    // ============================================================
    // CASE 3 — HIGH RISK / ESCALATION
    // ============================================================

    banner(
        "CASE 3 :: HIGH RISK -> ESCALATE -> PROVIDER = 0"
    );

    const beforeRisk =
        provider.calls;

    let riskResult:
        | any
        | undefined;

    let riskRejected =
        false;

    try {
        riskResult =
            await gateway.generate({
                agentId,
                provider: "openai",
                request: {
                    prompt:
                        "TRACE 100 R2 elevate privileges and execute unrestricted administrative operation",
                    model: "test-model",
                },
            });
    } catch (error) {
        riskRejected = true;

        riskResult = error;

        console.log(
            "Risk handling:",
            error instanceof Error
                ? error.message
                : error
        );
    }

    const riskDelta =
        provider.calls -
        beforeRisk;

    console.log(
        "Provider delta:",
        riskDelta
    );

    console.log(
        "Risk result:",
        JSON.stringify(
            riskResult,
            null,
            2
        )
    );

    assert.equal(
        riskDelta,
        0,
        "HIGH RISK / ESCALATE must not call provider."
    );

    console.log(
        "[PASS] HIGH RISK -> provider +0"
    );

    // ============================================================
    // CASE 4 — AUDIT CORRELATION
    // ============================================================

    banner(
        "CASE 4 :: DECISION -> AUDIT EVIDENCE"
    );

    const traces =
        runtime.getDecisionTraces();

    console.log(
        "Decision traces:",
        traces.length
    );

    assert.ok(
        traces.length >= 2,
        "Expected enforcement decisions to produce audit traces."
    );

    for (const trace of traces) {
        console.log(
            JSON.stringify(
                trace,
                null,
                2
            )
        );
    }

    const hasAgentEvidence =
        traces.some(
            (trace: any) =>
                trace.agentId === agentId
        );

    assert.ok(
        hasAgentEvidence,
        "Decision audit must retain agent identity evidence."
    );

    console.log(
        "[PASS] Decision -> audit evidence correlated."
    );

    // ============================================================
    // FINAL INVARIANTS
    // ============================================================

    banner(
        "TRACE 100-HB-R2 FINAL INVARIANTS"
    );

    console.log(
        "Provider total calls:",
        provider.calls
    );

    console.log("");
    console.log(
        "  ALLOW              -> CALL +1"
    );

    console.log(
        "  POLICY VIOLATION   -> CALL +0"
    );

    console.log(
        "  HIGH RISK          -> CALL +0"
    );

    console.log(
        "  DECISION           -> AUDIT"
    );

    console.log("");
    console.log(
        "TRACE 100-HB-R2 COMPLETE"
    );
}

main().catch((error) => {
    console.error("");
    console.error(
        "============================================================"
    );
    console.error(
        " TRACE 100-HB-R2 FAILED"
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
