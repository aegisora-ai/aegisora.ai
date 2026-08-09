import {
  PermissionRequest,
  PermissionResult,
} from "./permission";

const RESTRICTED_TOOLS = new Set([
  "shell",
  "exec",
  "powershell",
  "cmd",
  "terminal",
  "filesystem.write",
  "process.spawn",
]);

export class PermissionEngine {

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

    const tool = String(request.tool ?? "").toLowerCase();

    if (RESTRICTED_TOOLS.has(tool)) {
      return {
        action: "deny",
        reason: `Access denied for restricted tool: ${tool}`,
        confidence: 1,
      };
    }

    if (!request.action) {
      return {
        action: "deny",
        reason: "Missing permission action",
        confidence: 1,
      };
    }

    return {
      action: "allow",
      reason: `Permission granted for ${request.tool}`,
      confidence: 0.99,
    };
  }
}
