import {
  RuntimeEvent,
} from "../events";

export interface PolicyRule {
  name: string;
  tool?: string;
  action: "allow" | "block";
}

export interface PolicyDecision {
  allowed: boolean;
  reason: string;
}

interface ToolEventPayload {
  tool?: string;
}

function isToolEventPayload(
  payload: unknown,
): payload is ToolEventPayload {
  if (typeof payload !== "object" || payload === null) {
    return false;
  }

  const value = (payload as Record<string, unknown>).tool;

  return (
    typeof value === "undefined" ||
    typeof value === "string"
  );
}

export class RuntimePolicyEngine {
  private rules: PolicyRule[] = [
    {
      name: "block-dangerous-tools",
      tool: "shell",
      action: "block",
    },
  ];

  evaluate(event: RuntimeEvent): PolicyDecision {
    const payloadTool = isToolEventPayload(event.payload)
      ? event.payload.tool
      : undefined;

    const metadata =
      typeof event.payload === "object" &&
      event.payload !== null &&
      "metadata" in event.payload &&
      typeof (event.payload as Record<string, unknown>).metadata === "object" &&
      (event.payload as Record<string, unknown>).metadata !== null
        ? ((event.payload as Record<string, unknown>).metadata as Record<string, unknown>)
        : undefined;

    const metadataTool =
      typeof metadata?.tool === "string"
        ? metadata.tool
        : undefined;

    for (const rule of this.rules) {
      if (
        (rule.tool === payloadTool || rule.tool === metadataTool) &&
        rule.action === "block"
      ) {
        return {
          allowed: false,
          reason: "Policy blocked tool: " + (payloadTool ?? metadataTool ?? "unknown"),
        };
      }
    }

    return {
      allowed: true,
      reason: "Policy approved",
    };
  }
}
