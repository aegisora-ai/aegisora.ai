/**
 * Aegisora SDK Types
 *
 * Public developer SDK contracts.
 */

export interface AgentInput {
  input: string;
}

export interface AgentResponse {
  output: string;

  /**
   * Runtime execution timestamp
   */
  timestamp?: Date;
}

export interface ProtectableAgent {
  run(input: string): Promise<unknown>;
}

export interface ProtectedAgent {
  run(input: AgentInput): Promise<AgentResponse>;
}
