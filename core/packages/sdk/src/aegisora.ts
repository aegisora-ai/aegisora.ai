import type {
  AgentInput,
  AgentResponse,
  ProtectedAgent,
  ProtectableAgent,
} from "./types";

export class Aegisora {
  static protect(agent: ProtectableAgent): ProtectedAgent {
    return {
      async run(input: AgentInput): Promise<AgentResponse> {
        const result = await agent.run(input.input);

        return {
          output:
            typeof result === "string"
              ? result
              : JSON.stringify(result),
          timestamp: new Date(),
        };
      },
    };
  }
}
