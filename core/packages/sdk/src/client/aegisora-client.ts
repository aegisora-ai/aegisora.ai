import { AgentRuntime } from "@aegisora/runtime";

import { SDKAgent } from "../agent/sdk-agent";

export interface AgentConfig {
  name: string;
}

export class AegisoraClient {
  private runtime: AgentRuntime;

  constructor() {
    this.runtime = new AgentRuntime();
  }

  agent(config: AgentConfig) {
    return new SDKAgent(this.runtime, config);
  }

  runtimeInstance() {
    return this.runtime;
  }
}
