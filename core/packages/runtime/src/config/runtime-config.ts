export interface RuntimeConfig {
  providers: {
    openai?: {
      apiKey: string;
      model?: string;
    };

    anthropic?: {
      apiKey: string;
      model?: string;
    };

    gemini?: {
      apiKey: string;
      model?: string;
    };
  };
}
