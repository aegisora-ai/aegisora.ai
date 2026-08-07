import type { RuntimeContext } from "./context";

export interface ExecutionRequest {
  input: string;
}

export interface ExecutionResult {
  output: string;
}

export class Executor {
  async execute(
    request: ExecutionRequest,
    context: RuntimeContext,
  ): Promise<ExecutionResult> {
    return {
      output: `Executed: ${request.input}`,
    };
  }
}
