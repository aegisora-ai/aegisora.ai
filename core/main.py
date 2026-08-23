"""
Aegisora Python Data Plane reference service.

This is the FastAPI transport adapter around interceptor.py.

The interceptor itself remains independent from FastAPI.
"""

from __future__ import annotations

from typing import Any

from fastapi import FastAPI
from pydantic import BaseModel, Field

try:
    from interceptor import InterceptorEngine
except ImportError:
    from core.interceptor import InterceptorEngine


app = FastAPI(
    title="Aegisora Data Plane",
    version="0.1.0",
    description=(
        "Reference Python interception service for the future "
        "Go Data Plane / Sidecar."
    ),
)


interceptor_engine = InterceptorEngine()


class ToolCallRequest(BaseModel):
    """
    Transport schema for agent tool calls.

    This is deliberately small. The policy engine owns authorization;
    arbitrary tool arguments are passed through without execution.
    """

    tenant_id: str = Field(min_length=1, max_length=256)
    tool: str = Field(min_length=1, max_length=256)
    action: str = Field(min_length=1, max_length=128)

    request_id: str | None = Field(
        default=None,
        max_length=256,
    )

    arguments: dict[str, Any] = Field(
        default_factory=dict,
    )


@app.get("/health")
async def health() -> dict[str, str]:
    return {
        "status": "ok",
        "service": "aegisora-data-plane",
    }


@app.post("/intercept")
async def intercept_tool_call(
    request: ToolCallRequest,
) -> dict[str, Any]:

    payload = request.model_dump()

    decision = interceptor_engine.intercept(
        payload,
    )

    return decision.to_dict()