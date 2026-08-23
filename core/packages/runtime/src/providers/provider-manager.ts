import { ProviderRouter, ProviderName } from "./provider-router";

import { providerConfigs } from "./provider-config";

export class ProviderManager {
  private router: ProviderRouter;

  constructor(router: ProviderRouter) {
    this.router = router;
  }

  getDefaultModel(provider: ProviderName): string {
    const config = providerConfigs.find((x) => x.provider === provider);

    if (!config) {
      throw new Error(`Provider config missing: ${provider}`);
    }

    return config.defaultModel;
  }

  available(): ProviderName[] {
    return providerConfigs

      .filter((x) => x.apiKey)

      .map((x) => x.provider) as ProviderName[];
  }
}
