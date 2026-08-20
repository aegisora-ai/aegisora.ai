import {
  BaseProvider,
  ProviderRequest,
  ProviderResponse,
} from "./base-provider";

import type { ProviderRuntimeContext } from "../types/context";

import { ProviderClient } from "./provider-client";

import type {
  OpenAIChatCompletionResponse,
} from "./provider-responses";

export class OpenAIProvider extends BaseProvider {
  readonly name = "openai";

  private client = new ProviderClient();

  async generate(
    request: ProviderRequest,
    context: ProviderRuntimeContext,
  ): Promise<ProviderResponse> {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return this.buildResponse(
        this.name,
        request.model,
        "OpenAI API key missing",
      );
    }

    const result =
      await this.client.post<OpenAIChatCompletionResponse>(
        "https://api.openai.com/v1/chat/completions",
        {
          model: request.model,
          messages: [
            {
              role: "user",
              content: request.prompt,
            },
          ],
          temperature: request.temperature ?? 0.7,
          max_tokens: request.maxTokens ?? 1000,
        },
        {
          Authorization: `Bearer ${apiKey}`,
        },
      );

    return this.buildResponse(
      this.name,
      request.model,
      result.choices?.[0]?.message?.content ?? "",
    );
  }
}
