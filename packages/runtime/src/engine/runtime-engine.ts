/**
 * Aegisora Runtime Engine
 *
 * Main execution entry point for
 * autonomous agent governance.
 */

import type { AgentRequest } from "@aegisora/core";

import {
  ProviderExecutionGateway,
  type ProviderName,
} from "../providers";

import { ExecutionPipeline } from "../pipeline/execution-pipeline";

import {
  MiddlewareManager,
  SecurityMiddleware,
  PolicyMiddleware,
  AuditMiddleware,
  PluginsMiddleware,
} from "../middleware";

import { AgentRuntime } from "../agent";

import type {
  ProviderRequest,
} from "../providers/base-provider";

import type { ProviderRuntimeContext } from "../types/context";

import type { RuntimeMiddlewareContext } from "../types/middleware";


export class AegisoraRuntime {

  private pipeline: ExecutionPipeline;

  private middleware: MiddlewareManager;

  private agentRuntime: AgentRuntime;

private providerGateway: ProviderExecutionGateway;constructor() {

    this.pipeline = new ExecutionPipeline();

    this.middleware = new MiddlewareManager();

    this.agentRuntime = new AgentRuntime();

this.providerGateway =
  new ProviderExecutionGateway(
    this.agentRuntime.getContext()
  );


    /**
     * Default governance middleware
     */

    this.middleware.register(
      new SecurityMiddleware()
    );

    this.middleware.register(
      new PolicyMiddleware()
    );

    this.middleware.register(
      new AuditMiddleware()
    );

    this.middleware.register(
      new PluginsMiddleware()
    );

  }


  /**
   * Execute governance pipeline
   */
  async execute(
    request: AgentRequest
  ) {

    const result =
      await this.pipeline.execute(
        request
      );

    return result;

  }



  /**
   * AI generation execution
   */
  async generate(
    provider: ProviderName,
    request: ProviderRequest,
    context: ProviderRuntimeContext,
  ) {


    const runtimeContext: RuntimeMiddlewareContext = {

      request:
        request as unknown as AgentRequest,

      requestId:
        context.requestId,

      metadata:
        context.metadata ?? {},

      blocked:
        false,

      riskScore:
        context.riskScore ?? 0,

      signals: [],

    };


    const checked =
      await this.middleware.execute(
        runtimeContext
      );


    if (checked.blocked) {

      return {

        provider,

        model:
          request.model,

        output:
          "Request blocked by runtime middleware",

      };

    }


    return this.providerGateway.generate({

  agentId:
    context.agentId ?? "runtime",

  provider,

  request,

  metadata:
    context.metadata,

  context,

});

  }



  /**
   * Available providers
   */
  providers(): ProviderName[] {

    return this.providerGateway.list();

  }



  /**
   * Register custom middleware
   */
  registerMiddleware(
    middleware: any
  ) {

    this.middleware.register(
      middleware
    );

  }



  /**
   * Create autonomous agent
   */
  createAgent(
    name: string,
    config?: unknown
  ) {

    return this.agentRuntime.create(
      name,
      config
    );

  }



  /**
   * Run autonomous agent
   */
  async runAgent(
    name: string,
    goal: string
  ) {

    return this.agentRuntime.execute({

      agentId:
        name,

      goal,

    });

  }

}
