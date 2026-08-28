export interface ToolContext {

  agentId: string;

  /**
   * Canonical governance correlation.
   *
   * These identifiers originate from EnforcementGate and are
   * propagated into real tool execution.
   */
  traceId?: string;
  decisionId?: string;
  executionId?: string;
  evidenceId?: string;

  metadata?: Record<string, unknown>;
}


export interface RuntimeTool {


name:string;


description:string;


execute(
input:unknown,
context:ToolContext
):Promise<unknown>;


}
