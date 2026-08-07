/**
 * Agent execution request contract.
 *
 * Represents an action requested by an AI agent.
 */

export interface AgentRequest {
  /**
   * Unique request identifier
   */
  id: string;

  /**
   * Agent identity
   */
  agentId: string;

  /**
   * Requested action name
   *
   * Example:
   * "database.query"
   * "send.email"
   * "api.call"
   */
  action: string;

  /**
   * Target resource
   */
  resource?: string;

  /**
   * Input payload
   */
  payload?: Record<string, unknown>;

  /**
   * Request metadata
   */
  metadata?: Record<string, unknown>;

  /**
   * Timestamp
   */
  timestamp: Date;
}
