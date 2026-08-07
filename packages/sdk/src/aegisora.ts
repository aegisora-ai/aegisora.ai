import type { AgentInput, AgentResponse, ProtectedAgent } from "./types";

export class Aegisora {
  static protect(agent: any): ProtectedAgent {
    return {
      async run(input: AgentInput): Promise<AgentResponse> {
        const result = await agent.run(input.input);

        return {
          output: result,

          timestamp: new Date(),
        };
      },
    };
  }
}
