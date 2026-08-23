"""
Aegisora Data Plane Interceptor.

This module is the transport-neutral reference implementation of the
Aegisora interception contract.

Flow:

    Agent
      |
      | tool call
      v
    InterceptorEngine
      |
      +--> validate request
      |
      +--> resolve tenant policy
      |
      +--> authorize tool
      |
      +--> produce decision
      |
      +---- ALLOW ---> route/upstream
      |
      +---- BLOCK ---> deny

The engine NEVER executes a tool.

The engine is intentionally independent from FastAPI so that the same
contract can later be implemented by the Go Data Plane / Sidecar.
"""

from __future__ import annotations

from dataclasses import asdict, dataclass
from typing import Any, Mapping, Protocol
from uuid import uuid4


ALLOW = "ALLOW"
BLOCK = "BLOCK"


@dataclass(frozen=True)
class TenantPolicy:
    """
    Policy record.

    This is intentionally shaped like a future database record.
    The in-memory implementation below is only the reference/mock store.
    """

    tenant_id: str
    enabled: bool
    allowed_tools: frozenset[str]
    route: str = "upstream"
    policy_version: str = "mock-v1"


class PolicyStore(Protocol):
    """
    Storage contract for tenant policy.

    A production implementation can replace this with PostgreSQL,
    Supabase, Redis, etc. without changing InterceptorEngine.
    """

    def get_tenant_policy(self, tenant_id: str) -> TenantPolicy | None:
        ...


class InMemoryPolicyStore:
    """
    Reference policy store.

    This is deliberately small and deterministic so contributors can
    immediately understand the interception contract.
    """

    def __init__(
        self,
        policies: Mapping[str, TenantPolicy] | None = None,
    ) -> None:

        self._policies = dict(
            policies
            or {
                "tenant-demo": TenantPolicy(
                    tenant_id="tenant-demo",
                    enabled=True,
                    allowed_tools=frozenset(
                        {
                            "search",
                            "http.get",
                            "database.read",
                            "llm.generate",
                        }
                    ),
                ),
                "tenant-restricted": TenantPolicy(
                    tenant_id="tenant-restricted",
                    enabled=True,
                    allowed_tools=frozenset(
                        {
                            "search",
                            "database.read",
                        }
                    ),
                ),
            }
        )

    def get_tenant_policy(
        self,
        tenant_id: str,
    ) -> TenantPolicy | None:

        return self._policies.get(tenant_id)


@dataclass(frozen=True)
class InterceptionDecision:
    """
    Stable decision envelope.

    This is the important future Sidecar contract.

    A Go implementation should be able to emit the same fields.
    """

    decision: str
    allowed: bool

    tenant_id: str | None
    tool: str | None
    action: str | None

    route: str | None

    reason: str
    correlation_id: str
    request_id: str | None

    policy_version: str | None

    def to_dict(self) -> dict[str, Any]:
        return asdict(self)


class InterceptorEngine:
    """
    Aegisora policy interception boundary.

    Responsibilities
    ----------------
    1. Validate tool-call identity.
    2. Resolve tenant policy.
    3. Verify that the tenant is enabled.
    4. Verify that the requested tool is authorized.
    5. Return a deterministic ALLOW or BLOCK decision.

    Non-responsibilities
    -------------------
    - executing tools
    - calling providers
    - mutating tenant policy
    - authenticating users
    - performing network routing

    Those belong to surrounding infrastructure.
    """

    MAX_ID_LENGTH = 256
    MAX_TOOL_LENGTH = 256
    MAX_ACTION_LENGTH = 128
    MAX_REQUEST_ID_LENGTH = 256

    def __init__(
        self,
        policy_store: PolicyStore | None = None,
    ) -> None:

        self.policy_store = policy_store or InMemoryPolicyStore()

    def intercept(
        self,
        payload: Mapping[str, Any],
    ) -> InterceptionDecision:

        correlation_id = str(uuid4())

        tenant_id = self._normalize_string(
            payload.get("tenant_id"),
            self.MAX_ID_LENGTH,
        )

        tool = self._normalize_string(
            payload.get("tool"),
            self.MAX_TOOL_LENGTH,
        )

        action = self._normalize_string(
            payload.get("action"),
            self.MAX_ACTION_LENGTH,
        )

        request_id = self._normalize_string(
            payload.get("request_id"),
            self.MAX_REQUEST_ID_LENGTH,
        )

        validation_error = self._validate(
            tenant_id=tenant_id,
            tool=tool,
            action=action,
        )

        if validation_error is not None:

            return self._block(
                tenant_id=tenant_id,
                tool=tool,
                action=action,
                request_id=request_id,
                reason=validation_error,
                correlation_id=correlation_id,
            )

        assert tenant_id is not None
        assert tool is not None
        assert action is not None

        policy = self.policy_store.get_tenant_policy(
            tenant_id
        )

        if policy is None:

            return self._block(
                tenant_id=tenant_id,
                tool=tool,
                action=action,
                request_id=request_id,
                reason="Tenant is not registered in the policy store.",
                correlation_id=correlation_id,
            )

        if not policy.enabled:

            return self._block(
                tenant_id=tenant_id,
                tool=tool,
                action=action,
                request_id=request_id,
                reason="Tenant policy is disabled.",
                correlation_id=correlation_id,
            )

        if tool not in policy.allowed_tools:

            return self._block(
                tenant_id=tenant_id,
                tool=tool,
                action=action,
                request_id=request_id,
                reason=(
                    f"Tool '{tool}' is not allowed for "
                    f"tenant '{tenant_id}'."
                ),
                correlation_id=correlation_id,
                policy_version=policy.policy_version,
            )

        return InterceptionDecision(
            decision=ALLOW,
            allowed=True,
            tenant_id=tenant_id,
            tool=tool,
            action=action,
            route=policy.route,
            reason="Tenant policy allows the requested tool.",
            correlation_id=correlation_id,
            request_id=request_id,
            policy_version=policy.policy_version,
        )

    @classmethod
    def _normalize_string(
        cls,
        value: Any,
        max_length: int,
    ) -> str | None:

        if not isinstance(value, str):
            return None

        value = value.strip()

        if not value:
            return None

        if len(value) > max_length:
            return None

        return value

    @staticmethod
    def _validate(
        tenant_id: str | None,
        tool: str | None,
        action: str | None,
    ) -> str | None:

        if tenant_id is None:
            return "Missing or invalid 'tenant_id'."

        if tool is None:
            return "Missing or invalid 'tool'."

        if action is None:
            return "Missing or invalid 'action'."

        return None

    @staticmethod
    def _block(
        tenant_id: str | None,
        tool: str | None,
        action: str | None,
        request_id: str | None,
        reason: str,
        correlation_id: str,
        policy_version: str | None = None,
    ) -> InterceptionDecision:

        return InterceptionDecision(
            decision=BLOCK,
            allowed=False,
            tenant_id=tenant_id,
            tool=tool,
            action=action,
            route=None,
            reason=reason,
            correlation_id=correlation_id,
            request_id=request_id,
            policy_version=policy_version,
        )


__all__ = [
    "ALLOW",
    "BLOCK",
    "InMemoryPolicyStore",
    "InterceptorEngine",
    "InterceptionDecision",
    "PolicyStore",
    "TenantPolicy",
]