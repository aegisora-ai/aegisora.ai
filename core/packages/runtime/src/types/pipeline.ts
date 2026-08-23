import { ProviderRuntimeContext } from "./context";

export interface Middleware {
  execute(context: ProviderRuntimeContext): Promise<void>;
}
