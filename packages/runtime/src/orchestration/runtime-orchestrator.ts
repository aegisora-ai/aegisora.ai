/**
 * Aegisora Runtime Orchestrator
 *
 * Coordinates runtime execution between
 * security, policy and audit layers.
 */

import type { AgentRequest } from "@aegisora/core";

import { ExecutionPipeline } from "../pipeline";

export class RuntimeOrchestrator {
  private readonly pipeline: ExecutionPipeline;

  constructor() {
    this.pipeline = new ExecutionPipeline();
  }

  async execute(request: AgentRequest) {
    return this.pipeline.execute(request);
  }
}
