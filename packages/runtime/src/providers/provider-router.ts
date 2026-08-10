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

export type ProviderName = "openai" | "anthropic" | "gemini";

export class ProviderRouter {
  private providers: Map<ProviderName, BaseProvider>;

  constructor() {
    this.providers = new Map();

    this.register("openai", new OpenAIProvider());

    this.register("anthropic", new AnthropicProvider());

    this.register("gemini", new GeminiProvider());
  }

  register(name: ProviderName, provider: BaseProvider): void {
    this.providers.set(name, provider);
  }

  resolve(name?: ProviderName): BaseProvider {
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
