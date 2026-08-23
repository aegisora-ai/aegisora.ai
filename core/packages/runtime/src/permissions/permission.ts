export type PermissionAction =
  | "allow"
  | "deny"
  | "review";

export type PermissionResourceType =
  | "tool"
  | "provider"
  | "agent";

export interface PermissionRequest {
  agentId: string;
  resourceType: PermissionResourceType;
  tool: string;
  action: string;
  metadata?: Record<string, unknown>;
}

export interface PermissionResult {
  action: PermissionAction;
  reason: string;
  confidence: number;
}
