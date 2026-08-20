import {
  BaseProvider,
  ProviderRequest,
  ProviderResponse,
} from "./base-provider";

import type { ProviderRuntimeContext } from "../types/context";

import { ProviderClient } from "./provider-client";

import type {
  AnthropicMessagesResponse,
} from "./provider-responses";

export class AnthropicProvider extends BaseProvider {
  readonly name = "anthropic";

  private client = new ProviderClient();

  async generate(
    request: ProviderRequest,
    context: ProviderRuntimeContext,
  ): Promise<ProviderResponse> {
    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (!apiKey) {
      return this.buildResponse(
        this.name,
        request.model,
        "Anthropic API key missing",
      );
    }

    const result =
      await this.client.post<AnthropicMessagesResponse>(
        "https://api.anthropic.com/v1/messages",
        {
          model: request.model,
          max_tokens: request.maxTokens ?? 1000,
          temperature: request.temperature ?? 0.7,
          messages: [
            {
              role: "user",
              content: request.prompt,
            },
          ],
        },
        {
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
        },
      );

    return this.buildResponse(
      this.name,
      request.model,
      result.content?.[0]?.text ?? "",
    );
  }
}
