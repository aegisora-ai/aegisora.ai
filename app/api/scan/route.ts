import { NextResponse } from "next/server";
import { createHash, timingSafeEqual } from "node:crypto";
import { createClient } from "@supabase/supabase-js";

interface ScanPayload {
agentId?: unknown;
workspaceId?: unknown;
prompt?: unknown;
}

type Decision = "ALLOW" | "BLOCK" | "ESCALATE";

interface ScanResult {
decision: Decision;
threatType: string | null;
severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
}

const MAX_PROMPT_LENGTH = 20_000;
const MAX_ID_LENGTH = 128;

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const configuredApiKey = process.env.AEGISORA_API_KEY;

const supabase =
supabaseUrl && supabaseServiceRoleKey
? createClient(supabaseUrl, supabaseServiceRoleKey, {
auth: {
autoRefreshToken: false,
persistSession: false,
},
})
: null;

function unauthorizedResponse() {
return NextResponse.json(
{ error: "Unauthorized" },
{ status: 401 },
);
}

function serverConfigurationError() {
return NextResponse.json(
{ error: "Aegisora security service is not configured correctly" },
{ status: 500 },
);
}

function isValidString(value: unknown, maxLength: number): value is string {
return (
typeof value === "string" &&
value.length > 0 &&
value.length <= maxLength
);
}

function safeApiKeyEqual(provided: string, expected: string): boolean {
const providedBuffer = Buffer.from(provided, "utf8");
const expectedBuffer = Buffer.from(expected, "utf8");

if (providedBuffer.length !== expectedBuffer.length) {
return false;
}

return timingSafeEqual(providedBuffer, expectedBuffer);
}

function extractBearerToken(
authorizationHeader: string | null,
): string | null {
if (!authorizationHeader) {
return null;
}

const match = authorizationHeader.match(/^Bearer\s+(.+)$/i);

return match?.[1] ?? null;
}

function createPayloadFingerprint(prompt: string): string {
return createHash("sha256").update(prompt, "utf8").digest("hex");
}

function classifyPrompt(prompt: string): ScanResult {
const normalized = prompt.trim().toLowerCase();

const promptInjectionPatterns = [
/ignore\s+(all\s+)?previous\s+instructions?/i,
/ignore\s+(all\s+)?prior\s+instructions?/i,
/disregard\s+(all\s+)?previous\s+instructions?/i,
/disregard\s+(all\s+)?prior\s+instructions?/i,
/forget\s+(all\s+)?previous\s+instructions?/i,
/system\s+message\s+override/i,
/reveal\s+(the\s+)?system\s+prompt/i,
];

const credentialPatterns = [
/\bpassword\b/i,
/\bapi[*\s-]?key\b/i,
/\baccess[*\s-]?token\b/i,
/\bsecret[*\s-]?key\b/i,
/\bprivate[*\s-]?key\b/i,
];

const piiPatterns = [
/\b\d{3}-\d{2}-\d{4}\b/,
/\b\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}\b/,
];

const dangerousExecutionPatterns = [
/\bdrop\s+table\b/i,
/\bdelete\s+from\b/i,
/\btruncate\s+table\b/i,
/\bexec\s*(/i,
/\beval\s*(/i,
/\bchmod\s+777\b/i,
/\brm\s+-rf\b/i,
];

const systemPromptExtractionPatterns = [
/\bsystem\s+prompt\b/i,
/\bdeveloper\s+message\b/i,
/\breveal\s+hidden\s+instructions?\b/i,
];

if (dangerousExecutionPatterns.some((pattern) => pattern.test(normalized))) {
return {
decision: "BLOCK",
threatType: "Dangerous Execution Pattern",
severity: "CRITICAL",
};
}

if (credentialPatterns.some((pattern) => pattern.test(normalized))) {
return {
decision: "BLOCK",
threatType: "Credential Exposure",
severity: "CRITICAL",
};
}

if (piiPatterns.some((pattern) => pattern.test(normalized))) {
return {
decision: "BLOCK",
threatType: "PII Exposure",
severity: "CRITICAL",
};
}

if (
systemPromptExtractionPatterns.some((pattern) =>
pattern.test(normalized),
)
) {
return {
decision: "ESCALATE",
threatType: "System Prompt Extraction",
severity: "HIGH",
};
}

if (
promptInjectionPatterns.some((pattern) => pattern.test(normalized))
) {
return {
decision: "BLOCK",
threatType: "Prompt Injection",
severity: "HIGH",
};
}

return {
decision: "ALLOW",
threatType: null,
severity: "LOW",
};
}

export async function POST(req: Request) {
try {
if (!configuredApiKey || !supabase) {
return serverConfigurationError();
}

```
const providedApiKey = extractBearerToken(
  req.headers.get("authorization"),
);

if (
  !providedApiKey ||
  !safeApiKeyEqual(providedApiKey, configuredApiKey)
) {
  return unauthorizedResponse();
}

const contentType = req.headers.get("content-type") ?? "";

if (!contentType.toLowerCase().includes("application/json")) {
  return NextResponse.json(
    { error: "Content-Type must be application/json" },
    { status: 415 },
  );
}

const body = (await req.json()) as ScanPayload;

const { agentId, workspaceId, prompt } = body;

if (!isValidString(agentId, MAX_ID_LENGTH)) {
  return NextResponse.json(
    { error: "Invalid agentId" },
    { status: 400 },
  );
}

if (!isValidString(workspaceId, MAX_ID_LENGTH)) {
  return NextResponse.json(
    { error: "Invalid workspaceId" },
    { status: 400 },
  );
}

if (!isValidString(prompt, MAX_PROMPT_LENGTH)) {
  return NextResponse.json(
    {
      error: `Invalid prompt. Maximum length is ${MAX_PROMPT_LENGTH} characters.`,
    },
    { status: 400 },
  );
}

const result = classifyPrompt(prompt);
const payloadFingerprint = createPayloadFingerprint(prompt);

if (result.decision !== "ALLOW") {
  const incidentId = `INC-${crypto.randomUUID()}`;

  const { error: incidentError } = await supabase
    .from("incidents")
    .insert({
      id: incidentId,
      workspace_id: workspaceId,
      threat_type: result.threatType,
      agent_name: agentId,
      severity: result.severity,
      status:
        result.decision === "ESCALATE"
          ? "Escalated"
          : "Blocked",
      payload: `sha256:${payloadFingerprint}`,
    });

  if (incidentError) {
    console.error("Aegisora incident persistence failed:", {
      code: incidentError.code,
      message: incidentError.message,
    });

    return NextResponse.json(
      {
        error:
          "Security decision could not be durably recorded",
      },
      { status: 503 },
    );
  }

  return NextResponse.json(
    {
      success: false,
      decision: result.decision,
      reason: result.threatType,
      severity: result.severity,
      incident_id: incidentId,
    },
    {
      status: result.decision === "ESCALATE" ? 202 : 403,
    },
  );
}

return NextResponse.json(
  {
    success: true,
    decision: "ALLOW",
    threat_type: null,
    severity: "LOW",
    payload_fingerprint: payloadFingerprint,
  },
  { status: 200 },
);
```

} catch (error: unknown) {
console.error("Aegisora Scan Route Error:", error);

```
return NextResponse.json(
  { error: "Internal server error" },
  { status: 500 },
);
```

}
}
