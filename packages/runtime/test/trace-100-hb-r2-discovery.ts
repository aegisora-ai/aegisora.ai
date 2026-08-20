import { AgentRuntime } from "../src/agent/runtime/agent-runtime";

async function main() {
    console.log("");
    console.log("============================================================");
    console.log(" TRACE 100-HB-R2 :: IDENTITY LIFECYCLE DISCOVERY");
    console.log("============================================================");

    const runtime = new AgentRuntime();

    console.log("");
    console.log("[1] AgentRuntime methods");
    console.log("");

    const runtimeProto = Object.getPrototypeOf(runtime);

    for (const name of Object.getOwnPropertyNames(runtimeProto).sort()) {
        if (name !== "constructor") {
            console.log("  runtime.", name);
        }
    }

    console.log("");
    console.log("[2] AgentRuntime own properties");
    console.log("");

    for (const name of Object.keys(runtime as any).sort()) {
        const value = (runtime as any)[name];

        console.log(
            "  runtime.",
            name,
            "=>",
            value?.constructor?.name ?? typeof value
        );
    }

    console.log("");
    console.log("[3] ProviderExecutionGateway");
    console.log("");

    const runtimeAny = runtime as any;

    const gateway =
        runtimeAny.getProviderGateway?.() ??
        runtimeAny.providerGateway;

    console.log(
        "Gateway:",
        gateway?.constructor?.name ?? "NOT FOUND"
    );

    if (gateway) {
        const gatewayProto =
            Object.getPrototypeOf(gateway);

        for (
            const name of Object.getOwnPropertyNames(gatewayProto).sort()
        ) {
            if (name !== "constructor") {
                console.log("  gateway.", name);
            }
        }

        console.log("");
        console.log("Gateway own properties:");

        for (const name of Object.keys(gateway).sort()) {
            const value = gateway[name];

            console.log(
                "  gateway.",
                name,
                "=>",
                value?.constructor?.name ?? typeof value
            );
        }
    }

    console.log("");
    console.log("[4] RuntimeContext");
    console.log("");

    const context =
        runtimeAny.getContext?.() ??
        runtimeAny.context;

    console.log(
        "Context:",
        context?.constructor?.name ?? "NOT FOUND"
    );

    if (context) {
        const contextProto =
            Object.getPrototypeOf(context);

        for (
            const name of Object.getOwnPropertyNames(contextProto).sort()
        ) {
            if (name !== "constructor") {
                console.log("  context.", name);
            }
        }

        console.log("");
        console.log("Context own properties:");

        for (const name of Object.keys(context).sort()) {
            const value = context[name];

            console.log(
                "  context.",
                name,
                "=>",
                value?.constructor?.name ?? typeof value
            );
        }
    }

    console.log("");
    console.log("[5] Agent registry discovery");
    console.log("");

    const candidates = [
        ["runtime.agentRegistry", runtimeAny.agentRegistry],
        ["runtime.registry", runtimeAny.registry],
        ["context.agentRegistry", context?.agentRegistry],
        ["context.registry", context?.registry],
    ];

    for (const [label, value] of candidates) {
        if (!value) continue;

        console.log(
            label,
            "=>",
            value.constructor?.name ?? typeof value
        );

        const proto =
            Object.getPrototypeOf(value);

        for (
            const name of Object.getOwnPropertyNames(proto).sort()
        ) {
            if (name !== "constructor") {
                console.log(
                    "  ",
                    label,
                    ".",
                    name
                );
            }
        }
    }

    console.log("");
    console.log("============================================================");
    console.log(" TRACE 100-HB-R2 DISCOVERY COMPLETE");
    console.log("============================================================");
}

main().catch((error) => {
    console.error("");
    console.error("TRACE 100-HB-R2 DISCOVERY FAILED");
    console.error(
        error instanceof Error
            ? error.stack ?? error.message
            : error
    );

    process.exitCode = 1;
});
