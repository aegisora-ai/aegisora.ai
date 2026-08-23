export interface ProviderConfig {
  provider: "openai" | "anthropic" | "gemini" | "groq";

  apiKey?: string;

  defaultModel: string;
}

export const providerConfigs: ProviderConfig[] = [
  {
    provider: "openai",
    apiKey: process.env.OPENAI_API_KEY,
    defaultModel: "gpt-4.1-mini",
  },

  {
    provider: "anthropic",
    apiKey: process.env.ANTHROPIC_API_KEY,
    defaultModel: "claude-3-5-sonnet",
  },

  {
    provider: "gemini",
    apiKey: process.env.GEMINI_API_KEY,
    defaultModel: "gemini-2.5-flash",
  },

  {
    provider: "groq",
    apiKey: process.env.GROQ_API_KEY,
    defaultModel: "openai/gpt-oss-20b",
  },
];
