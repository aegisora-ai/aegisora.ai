/**
 * Aegisora Runtime Engine
 *
 * Main execution entry point for
 * autonomous agent governance.
 */

import type { AgentRequest } from "@aegisora/core";

import { type ProviderName } from "../providers";

import { ExecutionPipeline } from "../pipeline/execution-pipeline";

import {
  MiddlewareManager,
  SecurityMiddleware,
  PolicyMiddleware,
  AuditMiddleware,
  PluginsMiddleware,
} from "../middleware";

import { AgentRuntime } from "../agent";
import { PluginLoader, PluginRegistry, type AegisoraPlugin } from "@aegisora/plugins";

import type {
  ProviderRequest,
} from "../providers/base-provider";

import type { ProviderRuntimeContext } from "../types/context";

import type { RuntimeMiddlewareContext } from "../types/middleware";


export class AegisoraRuntime {

  private pipeline: ExecutionPipeline;

  private middleware: MiddlewareManager;

  private agentRuntime: AgentRuntime;
  private readonly pluginRegistry: PluginRegistry;
  private readonly pluginLoader: PluginLoader;

  constructor() {

    this.pipeline = new ExecutionPipeline();

    this.middleware = new MiddlewareManager();    this.agentRuntime = new AgentRuntime();

    this.pluginRegistry = new PluginRegistry();
    this.pluginLoader = new PluginLoader(this.pluginRegistry);


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


    if (!context.agentId?.trim()) {
      throw new Error(
        "Provider generation requires a registered agent identity"
      );
    }

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


    return this.agentRuntime.getProviderGateway().generate({

  agentId:
    context.agentId,

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

    return this.agentRuntime.getProviderGateway().list();

  }



  /**
   * Register custom middleware
   */
  registerMiddleware(
    middleware: import("../types/middleware").RuntimeMiddleware
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
