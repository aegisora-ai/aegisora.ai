import type { ProviderRuntimeContext } from "../types/context";

export interface ProviderRequest {
  model: string;

  prompt: string;

  systemPrompt?: string;

  temperature?: number;

  maxTokens?: number;
}

export interface ProviderResponse {
  provider: string;

  model: string;

  output: string;

  usage?: {
    promptTokens: number;

    completionTokens: number;

    totalTokens: number;
  };
}

export abstract class BaseProvider {
  abstract readonly name: string;

  abstract generate(
    request: ProviderRequest,
    context: ProviderRuntimeContext,
  ): Promise<ProviderResponse>;

  protected buildResponse(
    provider: string,
    model: string,
    output: string,
  ): ProviderResponse {
    return {
      provider,

      model,

      output,
    };
  }
}
