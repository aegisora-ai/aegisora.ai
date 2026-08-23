import { ProviderRuntimeContext } from "./context";

export interface AIProvider {
  generate(context: ProviderRuntimeContext): Promise<string>;
}
