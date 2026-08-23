import { AgentRuntime } from "@aegisora/runtime";

export interface SDKAgentConfig {
  name: string;
}

export class SDKAgent {
  private runtime: AgentRuntime;

  private name: string;

  constructor(runtime: AgentRuntime, config: SDKAgentConfig) {
    this.runtime = runtime;

    this.name = config.name;

    this.runtime.createAgent(this.name);
  }

  async run(goal: string) {
    return this.runtime.runAgent(this.name, goal);
  }
}
