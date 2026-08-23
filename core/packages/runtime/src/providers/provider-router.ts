import { GroqProvider } from "./groq-provider";
import {
  BaseProvider,
} from "./base-provider";

import {
  OpenAIProvider,
} from "./openai-provider";

import {
  AnthropicProvider,
} from "./anthropic-provider";

import {
  GeminiProvider,
} from "./gemini-provider";

export type ProviderName = "openai" | "anthropic" | "gemini" | "groq";

export class ProviderRouter {

  #executionToken: symbol;

  private providers: Map<ProviderName, BaseProvider>;

  constructor(executionToken: symbol) {
    this.#executionToken = executionToken;
    this.providers = new Map();

    this.register("openai", new OpenAIProvider());

    this.register("anthropic", new AnthropicProvider());

    this.register("gemini", new GeminiProvider());

    this.register("groq", new GroqProvider());
  }

  register(name: ProviderName, provider: BaseProvider): void {
    this.providers.set(name, provider);
  }

  resolve(
    name?: ProviderName,
    authorization?: symbol,
  ): BaseProvider {

    if (authorization !== this.#executionToken) {
      throw new Error(
        "[ENFORCEMENT:BLOCK] Direct provider resolution is not authorized."
      );
    }

    const selected = name ?? "openai";

    const provider = this.providers.get(selected);

    if (!provider) {
      throw new Error(`Unsupported provider: ${selected}`);
    }

    return provider;
  }

  has(name: ProviderName): boolean {
    return this.providers.has(name);
  }

  list(): ProviderName[] {
    return Array.from(this.providers.keys());
  }
}
