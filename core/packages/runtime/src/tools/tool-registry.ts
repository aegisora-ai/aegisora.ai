import {
  RuntimeTool,
  ToolContext,
} from "./tool";

import {
  EnforcementGate,
  type EnforcementResult,
} from "../enforcement";

const TOOL_AUTHORIZATION_MARKER =
  Symbol("aegisora.tool.authorization");

export interface ToolAuthorizationReceipt {
  readonly authorizationId: string;
  readonly agentId: string;
  readonly tool: string;
  readonly action: "tool.execute";
  readonly enforcement: EnforcementResult;
  readonly marker: symbol;
}

export class ToolRegistry {

  constructor(
    executionToken: symbol,
  ) {
    this.#executionToken = executionToken;
  }

  #executionToken: symbol;

  private enforcement?: EnforcementGate;

  private tools =
    new Map<string, RuntimeTool>();

  private readonly consumedAuthorizations =
    new Set<string>();

  setEnforcementGate(
    gate: EnforcementGate,
  ) {
    this.enforcement = gate;
  }

  register(
    tool: RuntimeTool,
  ) {
    if (this.tools.has(tool.name)) {
      throw new Error(
        `Tool already registered: ${tool.name}`,
      );
    }

    this.tools.set(
      tool.name,
      tool,
    );

    return tool;
  }

  remove(
    name: string,
  ) {
    return this.tools.delete(name);
  }

  private resolve(
    name: string,
  ) {
    const tool =
      this.tools.get(name);

    if (!tool) {
      throw new Error(
        `Tool not found: ${name}`,
      );
    }

    return tool;
  }

  get(
    name: string,
  ) {
    const tool =
      this.resolve(name);

    return {
      name: tool.name,
      description: tool.description,
    };
  }

  has(
    name: string,
  ) {
    return this.tools.has(name);
  }

  async authorize(
    agentId: string,
    name: string,
    input: unknown,
    metadata?: Record<string, unknown>,
  ): Promise<ToolAuthorizationReceipt> {

    if (!this.enforcement) {
      throw new Error(
        "ToolRegistry execution boundary is not configured.",
      );
    }

    const enforcement =
      await this.enforcement.enforce({
        agentId,
        resourceType: "tool",
        tool: name,
        action: "tool.execute",
        input,
        metadata,
      });

    if (enforcement.decision !== "ALLOW") {
      throw new Error(
        `[ENFORCEMENT:${enforcement.decision}] ${enforcement.reason}`,
      );
    }

    return Object.freeze({
      authorizationId: crypto.randomUUID(),
      agentId,
      tool: name,
      action: "tool.execute" as const,
      enforcement,
      marker: TOOL_AUTHORIZATION_MARKER,
    });
  }

  private validateAuthorization(
    receipt: ToolAuthorizationReceipt,
    name: string,
    context: ToolContext,
  ) {

    if (
      !receipt ||
      receipt.marker !== TOOL_AUTHORIZATION_MARKER
    ) {
      throw new Error(
        "[ENFORCEMENT:BLOCK] Invalid tool authorization receipt.",
      );
    }

    if (
      receipt.agentId !== context.agentId ||
      receipt.tool !== name ||
      receipt.action !== "tool.execute"
    ) {
      throw new Error(
        "[ENFORCEMENT:BLOCK] Tool authorization scope mismatch.",
      );
    }

    if (
      receipt.enforcement.decision !== "ALLOW"
    ) {
      throw new Error(
        "[ENFORCEMENT:BLOCK] Tool authorization is not ALLOW.",
      );
    }

    if (
      this.consumedAuthorizations.has(
        receipt.authorizationId,
      )
    ) {
      throw new Error(
        "[ENFORCEMENT:BLOCK] Tool authorization has already been consumed.",
      );
    }

    this.consumedAuthorizations.add(
      receipt.authorizationId,
    );
  }

  async execute(
    name: string,
    input: unknown,
    context: ToolContext,
    authorization?: symbol,
    receipt?: ToolAuthorizationReceipt,
  ): Promise<unknown> {

    if (authorization !== this.#executionToken) {
      throw new Error(
        "[ENFORCEMENT:BLOCK] Direct ToolRegistry execution is not authorized.",
      );
    }

    if (receipt) {
      this.validateAuthorization(
        receipt,
        name,
        context,
      );
    } else {
      const generated =
        await this.authorize(
          context.agentId,
          name,
          input,
          context.metadata,
        );

      this.validateAuthorization(
        generated,
        name,
        context,
      );
    }

    const tool =
      this.resolve(name);

    return tool.execute(
      input,
      context,
    );
  }

  list() {
    return Array.from(
      this.tools.values(),
    ).map(
      (tool) => ({
        name: tool.name,
        description: tool.description,
      }),
    );
  }
}
