import {
  PermissionRequest,
  PermissionResult,
} from "./permission";

import {
  ToolRegistry,
} from "../tools";

/*
 * ------------------------------------------------------------
 * AEGISORA ZERO-TRUST CAPABILITY POLICY
 * ------------------------------------------------------------
 *
 * Tools and providers are separate capability classes.
 *
 * Tool:
 *   tool.execute
 *
 * Provider:
 *   provider.generate
 *
 * Unknown capabilities remain DENY by default.
 */

const RESTRICTED_TOOLS = new Set([
  "shell",
  "exec",
  "powershell",
  "cmd",
  "terminal",
  "process.spawn",
]);

const KNOWN_TOOLS = new Set([
  "echo",
]);

const KNOWN_PROVIDERS = new Set([
  "openai",
  "anthropic",
  "gemini",
]);

const PROVIDER_ACTION = "provider.generate";
const TOOL_ACTION = "tool.execute";

function extractProvider(tool: string): string | undefined {

  const prefix = "provider:";

  if (!tool.startsWith(prefix)) {
    return undefined;
  }

  const provider = tool.slice(prefix.length).trim();

  return provider.length > 0
    ? provider
    : undefined;
}

export class PermissionEngine {

  private readonly toolRegistry?: ToolRegistry;

  /**
   * Runtime capability authority.
   *
   * When supplied, the registry is the canonical source of truth
   * for registered runtime tools.
   *
   * The optional form preserves backward compatibility for callers
   * that construct PermissionEngine directly outside a Runtime.
   */
  constructor(
    toolRegistry?: ToolRegistry,
  ) {
    this.toolRegistry = toolRegistry;
  }

  check(
    request: PermissionRequest,
  ): PermissionResult {

    if (!request.agentId) {
      return {
        action: "deny",
        reason: "Missing agent identity",
        confidence: 1,
      };
    }

    const tool = String(
      request.tool ?? "",
    ).toLowerCase();

    const action = String(
      request.action ?? "",
    ).toLowerCase();

    /*
     * ----------------------------------------------------------
     * Explicit human-review boundary
     * ----------------------------------------------------------
     */

    const requiresReview =
      request.metadata?.requiresReview === true;

    if (requiresReview) {
      return {
        action: "review",
        reason:
          `Permission review required for tool: ${request.tool}`,
        confidence: 0.5,
      };
    }

    /*
     * ----------------------------------------------------------
     * PROVIDER CAPABILITY
     * ----------------------------------------------------------
     */

    if (action === PROVIDER_ACTION) {

      const provider =
        extractProvider(tool);

      if (!provider) {
        return {
          action: "deny",
          reason:
            `Invalid provider capability: ${request.tool}`,
          confidence: 1,
        };
      }

      if (!KNOWN_PROVIDERS.has(provider)) {
        return {
          action: "deny",
          reason:
            `Access denied for unknown provider: ${provider}`,
          confidence: 1,
        };
      }

      return {
        action: "allow",
        reason:
          `Provider capability granted: ${provider}`,
        confidence: 0.99,
      };
    }

    /*
     * ----------------------------------------------------------
     * TOOL CAPABILITY
     * ----------------------------------------------------------
     */

    if (action === TOOL_ACTION) {

      if (RESTRICTED_TOOLS.has(tool)) {
        return {
          action: "deny",
          reason:
            `Access denied for restricted tool: ${tool}`,
          confidence: 1,
        };
      }

      /*
       * ----------------------------------------------------------
       * Canonical runtime capability authority
       * ----------------------------------------------------------
       *
       * A runtime-created PermissionEngine MUST consult the
       * Runtime ToolRegistry rather than a duplicated static list.
       *
       * This prevents the following split-brain state:
       *
       *   ToolRegistry -> tool exists
       *   PermissionEngine -> tool unknown
       *
       * The optional fallback preserves compatibility for standalone
       * PermissionEngine consumers outside AgentRuntime.
       */
      const toolRegistered = this.toolRegistry
        ? this.toolRegistry.has(tool)
        : KNOWN_TOOLS.has(tool);

      if (!toolRegistered) {
        return {
          action: "deny",
          reason:
            `Access denied for unknown tool: ${tool}`,
          confidence: 1,
        };
      }

      return {
        action: "allow",
        reason:
          `Tool capability granted: ${tool}`,
        confidence: 0.99,
      };
    }

    /*
     * ----------------------------------------------------------
     * ZERO-TRUST DEFAULT
     * ----------------------------------------------------------
     */

    return {
      action: "deny",
      reason:
        `Access denied for unsupported permission action: ${request.action}`,
      confidence: 1,
    };
  }
}
