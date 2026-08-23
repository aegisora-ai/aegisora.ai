/* AEGISORA_TRACE94_ENV_LOADER */
import * as fs from "node:fs";
import * as path from "node:path";

(function loadTrace94GroqKey(): void {
    if (!process.env.GROQ_API_KEY) {
        const envPath = path.resolve(__dirname, "../../../../.env.local");

        if (fs.existsSync(envPath)) {
            const envText = fs.readFileSync(envPath, "utf8");

            const match = envText.match(
                /^\s*GROQ_API_KEY\s*=\s*(.+?)\s*$/m
            );

            if (match && match[1]) {
                let value = match[1].trim();

                if (
                    (value.startsWith('"') && value.endsWith('"')) ||
                    (value.startsWith("'") && value.endsWith("'"))
                ) {
                    value = value.slice(1, -1);
                }

                if (value) {
                    process.env.GROQ_API_KEY = value;
                }
            }
        }
    }
})();
import assert from "node:assert/strict";

import { RuntimeContext } from "../src/context/runtime-context";
import { ProviderExecutionGateway } from "../src/providers/provider-execution-gateway";

async function main() {
  if (!process.env.GROQ_API_KEY) {
    throw new Error("GROQ_API_KEY is missing.");
  }

  const originalFetch = globalThis.fetch;

  let groqCalls = 0;
  let lastGroqUrl = "";

  globalThis.fetch = async (
    input: Parameters<typeof fetch>[0],
    init?: Parameters<typeof fetch>[1],
  ): Promise<Response> => {
    const url =
      typeof input === "string"
        ? input
        : input instanceof URL
          ? input.toString()
          : input.url;

    if (
      url ===
      "https://api.groq.com/openai/v1/chat/completions"
    ) {
      groqCalls++;
      lastGroqUrl = url;
    }

    return originalFetch(input, init);
  };

  try {
    const context = new RuntimeContext();
    const agentId = "trace94-groq-agent";

    context.agentRegistry.register({
      id: agentId,
      name: agentId,
    });

    const gateway = new ProviderExecutionGateway(context);

    console.log("TRACE94_START");

    // ----------------------------------------------------------
    // 94A - ALLOW
    // ----------------------------------------------------------

    const allowBefore = groqCalls;

    const allowed = await gateway.generate({
      agentId,
      provider: "groq",
      request: {
        model: "openai/gpt-oss-20b",
        prompt:
          "Reply with exactly: TRACE94 GROQ LIVE PASS",
      },
      metadata: {
        trace: "94A",
      },
    });

    const allowCalls = groqCalls - allowBefore;

    console.log("ALLOW_DECISION=ALLOW");
    console.log(`ALLOW_PROVIDER=${allowed.provider}`);
    console.log(`ALLOW_MODEL=${allowed.model}`);
    console.log(`ALLOW_HTTP_CALLS=${allowCalls}`);
    console.log(
      `ALLOW_OUTPUT_PRESENT=${allowed.output.trim().length > 0}`,
    );

    assert.equal(allowed.provider, "groq");
    assert.equal(allowed.model, "openai/gpt-oss-20b");
    assert.equal(allowCalls, 1);
    assert.ok(allowed.output.trim().length > 0);

    // ----------------------------------------------------------
    // 94B - BLOCK
    // ----------------------------------------------------------

    const blockBefore = groqCalls;
    let blockDecision = false;

    try {
      await gateway.generate({
        agentId,
        provider: "groq",
        request: {
          model: "openai/gpt-oss-20b",
          prompt: "BLOCK TRACE94",
        },
        metadata: {
          trace: "94B",
          tool: "shell",
        },
      });
    } catch (error) {
      blockDecision = true;
      console.log(
        "BLOCK_ERROR=" +
          (error instanceof Error ? error.message : String(error)),
      );
    }

    const blockCalls = groqCalls - blockBefore;

    console.log(
      `BLOCK_DECISION_REJECTED=${blockDecision}`,
    );
    console.log(`BLOCK_HTTP_CALLS=${blockCalls}`);

    assert.equal(blockDecision, true);
    assert.equal(blockCalls, 0);

    // ----------------------------------------------------------
    // 94C - ESCALATE
    // ----------------------------------------------------------

    const escalateBefore = groqCalls;
    let escalateDecision = false;

    try {
      await gateway.generate({
        agentId,
        provider: "groq",
        request: {
          model: "openai/gpt-oss-20b",
          prompt: "ESCALATE TRACE94",
        },
        metadata: {
          trace: "94C",
          requiresReview: true,
        },
      });
    } catch (error) {
      escalateDecision = true;
      console.log(
        "ESCALATE_ERROR=" +
          (error instanceof Error ? error.message : String(error)),
      );
    }

    const escalateCalls =
      groqCalls - escalateBefore;

    console.log(
      `ESCALATE_DECISION_REJECTED=${escalateDecision}`,
    );
    console.log(
      `ESCALATE_HTTP_CALLS=${escalateCalls}`,
    );

    assert.equal(escalateDecision, true);
    assert.equal(escalateCalls, 0);

    // ----------------------------------------------------------
    // FINAL INVARIANTS
    // ----------------------------------------------------------

    const records = context.decisionStore.getAll();

    console.log(`TOTAL_GROQ_HTTP_CALLS=${groqCalls}`);
    console.log(`DECISION_RECORDS=${records.length}`);
    console.log(`GROQ_URL_OBSERVED=${lastGroqUrl.length > 0}`);

    assert.equal(groqCalls, 1);
    assert.equal(records.length, 3);

    assert.equal(records[0].decision, "allow");
    assert.equal(records[0].metadata.tool, "provider:groq");

    assert.equal(records[1].decision, "block");
    assert.equal(records[2].decision, "escalate");

    console.log("TRACE94_RESULT=PASS");
  } finally {
    globalThis.fetch = originalFetch;
  }
}

main().catch((error) => {
  console.error(
    "TRACE94_RESULT=FAIL",
  );

  console.error(
    error instanceof Error
      ? error.stack
      : String(error),
  );

  process.exitCode = 1;
});
