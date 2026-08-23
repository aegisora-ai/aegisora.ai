export class ProviderError extends Error {
  provider: string;

  constructor(provider: string, message: string) {
    super(message);

    this.provider = provider;

    this.name = "ProviderError";
  }
}
