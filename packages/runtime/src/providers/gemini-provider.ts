import {
  BaseProvider,
  ProviderRequest,
  ProviderResponse,
} from "./base-provider";

import type { ProviderRuntimeContext } from "../types/context";

import { ProviderClient } from "./provider-client";

import type {
  GeminiGenerateContentResponse,
} from "./provider-responses";

export class GeminiProvider extends BaseProvider {
  readonly name = "gemini";

  private client = new ProviderClient();

  async generate(
    request: ProviderRequest,
    context: ProviderRuntimeContext,
  ): Promise<ProviderResponse> {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return this.buildResponse(
        this.name,
        request.model,
        "Gemini API key missing",
      );
    }

    const url =
      `https://generativelanguage.googleapis.com/v1beta/models/` +
      `${request.model}:generateContent?key=${apiKey}`;

    const result =
      await this.client.post<GeminiGenerateContentResponse>(
        url,
        {
          contents: [
            {
              parts: [
                {
                  text: request.prompt,
                },
              ],
            },
          ],
        },
        {},
      );

    return this.buildResponse(
      this.name,
      request.model,
      result.candidates?.[0]?.content?.parts?.[0]?.text ?? "",
    );
  }
}
