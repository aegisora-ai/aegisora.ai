import { ProviderRouter } from "./provider-router";
import type { ProviderName } from "./provider-router";

import { ProviderManager } from "./provider-manager";

import type {
  ProviderRequest,
  ProviderResponse,
} from "./base-provider";

import { EnforcementGate } from "../enforcement";

import { RuntimeContext } from "../context/runtime-context";

import type {
  ProviderRuntimeContext,
} from "../types/context";

export interface ProviderExecutionRequest {
  agentId: string;

  provider?: ProviderName;

  request: Partial<ProviderRequest> & {
    prompt: string;
  };

  metadata?: Record<string, unknown>;

  context?: ProviderRuntimeContext;
}

export class ProviderExecutionGateway {

  private readonly enforcement: EnforcementGate;

  constructor(
    private readonly context: RuntimeContext,
    private readonly router: ProviderRouter = new ProviderRouter(),
    private readonly manager: ProviderManager = new ProviderManager(
      router
    ),
  ) {
    this.enforcement = new EnforcementGate(
      context
    );
  }

  /**
   * Canonical provider execution boundary.
   *
   * Every provider generation request must pass through
   * enforcement before the provider is invoked.
   */
  async generate(
    input: ProviderExecutionRequest,
  ): Promise<ProviderResponse> {

    const providerName: ProviderName =
      input.provider ?? "openai";

    const model =
      input.request.model ??
      this.manager.getDefaultModel(
        providerName
      );

    const enforcement =
      await this.enforcement.enforce({
        agentId: input.agentId,

        tool:
          `provider:${providerName}`,

        action:
          "provider.generate",

        input: {
          model,
          prompt: input.request.prompt,
        },

        metadata: {
          ...(input.metadata ?? {}),
          provider: providerName,
          model,
        },
      });

    if (
      enforcement.decision !== "ALLOW"
    ) {
      throw new Error(
        `[ENFORCEMENT:${enforcement.decision}] ${enforcement.reason}`
      );
    }

    const providerContext:
      ProviderRuntimeContext = {

      ...(input.context ?? {}),

      requestId:
        input.context?.requestId ??
        crypto.randomUUID(),

      prompt:
        input.request.prompt,

      agentId:
        input.agentId,

      action:
        "provider.generate",

      metadata: {
        ...(input.context?.metadata ?? {}),
        ...(input.metadata ?? {}),
        provider: providerName,
        model,
      },

      riskScore:
        enforcement.riskScore,

      riskLevel:
        enforcement.riskScore >= 90
          ? "CRITICAL"
          : enforcement.riskScore >= 70
            ? "HIGH"
            : enforcement.riskScore >= 40
              ? "MEDIUM"
              : "LOW",

      suspicious:
        enforcement.threats.length > 0,

      signals:
        enforcement.threats.map(
          (threat) =>
            `${threat.type}:${threat.severity}`
        ),

      blocked:
        false,

      provider:
        providerName,

      startedAt:
        input.context?.startedAt ??
        new Date(),

      finishedAt:
        undefined,
    };

    const provider =
      this.router.resolve(
        providerName
      );

    const providerRequest:
      ProviderRequest = {
      ...input.request,
      model,
      prompt:
        input.request.prompt,
    };

    try {

      const response =
        await provider.generate(
          providerRequest,
          providerContext
        );

      providerContext.response =
        response.output;

      providerContext.finishedAt =
        new Date();

      return response;

    } catch (error) {

      providerContext.finishedAt =
        new Date();

      throw error;
    }
  }

  getDefaultModel(
    provider: ProviderName
  ): string {
    return this.manager.getDefaultModel(
      provider
    );
  }

  list(): ProviderName[] {
    return this.router.list();
  }

  has(
    provider: ProviderName
  ): boolean {
    return this.router.has(
      provider
    );
  }
}