/**
 * AI Agent contracts.
 */

export interface AgentIdentity {
  /**
   * Unique agent id
   */
  id: string;

  /**
   * Agent name
   */
  name: string;

  /**
   * Agent version
   */
  version?: string;
}

export interface Agent {
  /**
   * Agent identity
   */
  identity: AgentIdentity;

  /**
   * Agent capabilities
   */
  capabilities?: string[];
}
