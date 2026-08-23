import { BaseProvider, ProviderRequest, ProviderResponse } from "./base-provider";
import type { ProviderRuntimeContext } from "../types/context";
import { ProviderClient } from "./provider-client";

interface GroqResponse {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
}

export class GroqProvider extends BaseProvider {
  readonly name = "groq";
  private client = new ProviderClient();

  async generate(
    request: ProviderRequest,
    context: ProviderRuntimeContext,
  ): Promise<ProviderResponse> {
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return this.buildResponse(
        this.name,
        request.model,
        "Groq API key missing",
      );
    }

    const result = await this.client.post<GroqResponse>(
      "https://api.groq.com/openai/v1/chat/completions",
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
