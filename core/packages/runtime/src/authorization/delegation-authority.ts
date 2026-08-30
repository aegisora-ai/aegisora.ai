export type DelegationAction =
  | "agent.run"
  | "tool.execute"
  | "provider.generate";

export interface DelegationScope {
  readonly actions: readonly DelegationAction[];
  readonly tools?: readonly string[];
  readonly providers?: readonly string[];
}

export interface DelegationCapability {
  readonly id: string;
  readonly parentAgentId: string;
  readonly childAgentId: string;
  readonly scope: DelegationScope;
  readonly issuedAt: Date;
  readonly expiresAt: Date;
}

interface StoredCapability {
  readonly capability: DelegationCapability;
  consumed: boolean;
}

export class DelegationAuthority {
  private readonly capabilities =
    new Map<string, StoredCapability>();

  issue(
    parentAgentId: string,
    childAgentId: string,
    scope: DelegationScope,
    ttlMs: number,
    isRegistered: (agentId: string) => boolean,
  ): DelegationCapability {
    if (!isRegistered(parentAgentId)) {
      throw new Error(
        "Unknown parent agent: " + parentAgentId,
      );
    }

    if (!isRegistered(childAgentId)) {
      throw new Error(
        "Unknown child agent: " + childAgentId,
      );
    }

    if (parentAgentId === childAgentId) {
      throw new Error(
        "Delegation parent and child must be distinct.",
      );
    }

    if (!Number.isFinite(ttlMs) || ttlMs <= 0) {
      throw new Error(
        "Delegation TTL must be positive.",
      );
    }

    if (!scope.actions.length) {
      throw new Error(
        "Delegation scope must contain at least one action.",
      );
    }

    const issuedAt = new Date();

    const expiresAt = new Date(
      issuedAt.getTime() + ttlMs,
    );

    const capability: DelegationCapability = {
      id: crypto.randomUUID(),
      parentAgentId,
      childAgentId,
      scope: {
        actions: [...scope.actions],
        tools: scope.tools
          ? [...scope.tools]
          : undefined,
        providers: scope.providers
          ? [...scope.providers]
          : undefined,
      },
      issuedAt,
      expiresAt,
    };

    this.capabilities.set(
      capability.id,
      {
        capability,
        consumed: false,
      },
    );

    return capability;
  }

  consume(
    capabilityId: string,
    parentAgentId: string,
    childAgentId: string,
    action: DelegationAction,
    resource?: string,
  ): DelegationCapability {
    const stored =
      this.capabilities.get(capabilityId);

    if (!stored) {
      throw new Error(
        "Unknown delegation capability.",
      );
    }

    const capability =
      stored.capability;

    if (stored.consumed) {
      throw new Error(
        "Delegation capability already consumed.",
      );
    }

    if (
      capability.parentAgentId !==
      parentAgentId
    ) {
      throw new Error(
        "Delegation parent identity mismatch.",
      );
    }

    if (
      capability.childAgentId !==
      childAgentId
    ) {
      throw new Error(
        "Delegation child identity mismatch.",
      );
    }

    if (
      Date.now() >=
      capability.expiresAt.getTime()
    ) {
      throw new Error(
        "Delegation capability expired.",
      );
    }

    if (
      !capability.scope.actions.includes(action)
    ) {
      throw new Error(
        "Delegated action not permitted: " + action,
      );
    }

    if (
      action === "tool.execute" &&
      capability.scope.tools
    ) {
      if (!resource) {
        throw new Error(
          "Delegated tool resource is required.",
        );
      }

      if (
        !capability.scope.tools.includes(resource)
      ) {
        throw new Error(
          "Delegated tool not permitted: " + resource,
        );
      }
    }

    if (
      action === "provider.generate" &&
      capability.scope.providers
    ) {
      if (!resource) {
        throw new Error(
          "Delegated provider resource is required.",
        );
      }

      if (
        !capability.scope.providers.includes(resource)
      ) {
        throw new Error(
          "Delegated provider not permitted: " + resource,
        );
      }
    }

    stored.consumed = true;

    return capability;
  }

  revoke(
    capabilityId: string,
  ): boolean {
    return this.capabilities.delete(
      capabilityId,
    );
  }

  has(
    capabilityId: string,
  ): boolean {
    return this.capabilities.has(
      capabilityId,
    );
  }
}

