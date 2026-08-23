import asyncio

import httpx

from core.main import app


async def run_tests() -> None:
    transport = httpx.ASGITransport(app=app)

    async with httpx.AsyncClient(
        transport=transport,
        base_url="http://testserver",
    ) as client:

        # ----------------------------------------------------
        # HEALTH
        # ----------------------------------------------------

        health = await client.get("/health")

        assert health.status_code == 200, health.text

        health_body = health.json()

        assert health_body["status"] == "ok"
        assert health_body["service"] == "aegisora-data-plane"

        print("PASS: GET /health")

        # ----------------------------------------------------
        # ALLOW
        # ----------------------------------------------------

        allow = await client.post(
            "/intercept",
            json={
                "tenant_id": "tenant-demo",
                "tool": "search",
                "action": "execute",
                "request_id": "http-allow-001",
            },
        )

        assert allow.status_code == 200, allow.text

        allow_body = allow.json()

        assert allow_body["decision"] == "ALLOW"
        assert allow_body["allowed"] is True
        assert allow_body["route"] == "upstream"
        assert allow_body["tenant_id"] == "tenant-demo"
        assert allow_body["tool"] == "search"
        assert allow_body["request_id"] == "http-allow-001"

        print("PASS: POST /intercept -> ALLOW")

        # ----------------------------------------------------
        # BLOCK
        # ----------------------------------------------------

        block = await client.post(
            "/intercept",
            json={
                "tenant_id": "tenant-restricted",
                "tool": "shell.exec",
                "action": "execute",
                "request_id": "http-block-001",
            },
        )

        assert block.status_code == 200, block.text

        block_body = block.json()

        assert block_body["decision"] == "BLOCK"
        assert block_body["allowed"] is False
        assert block_body["route"] is None
        assert block_body["tenant_id"] == "tenant-restricted"
        assert block_body["tool"] == "shell.exec"

        print("PASS: POST /intercept -> BLOCK")

        # ----------------------------------------------------
        # UNKNOWN TENANT
        # ----------------------------------------------------

        unknown = await client.post(
            "/intercept",
            json={
                "tenant_id": "tenant-unknown",
                "tool": "search",
                "action": "execute",
            },
        )

        assert unknown.status_code == 200, unknown.text

        unknown_body = unknown.json()

        assert unknown_body["decision"] == "BLOCK"
        assert unknown_body["allowed"] is False
        assert unknown_body["route"] is None

        print("PASS: unknown tenant -> BLOCK")

        # ----------------------------------------------------
        # INVALID PAYLOAD
        # ----------------------------------------------------

        invalid = await client.post(
            "/intercept",
            json={
                "tenant_id": "tenant-demo",
                "action": "execute",
            },
        )

        assert invalid.status_code == 422, invalid.text

        print("PASS: invalid payload -> 422")


if __name__ == "__main__":
    asyncio.run(run_tests())