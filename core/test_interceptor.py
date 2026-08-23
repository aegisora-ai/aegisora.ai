from interceptor import ALLOW, BLOCK, InterceptorEngine


def test_allowed_tool() -> None:

    engine = InterceptorEngine()

    result = engine.intercept(
        {
            "tenant_id": "tenant-demo",
            "tool": "search",
            "action": "execute",
            "request_id": "smoke-allow",
        }
    )

    assert result.decision == ALLOW
    assert result.allowed is True
    assert result.route == "upstream"
    assert result.tenant_id == "tenant-demo"
    assert result.tool == "search"
    assert result.request_id == "smoke-allow"
    assert result.correlation_id


def test_unauthorized_tool() -> None:

    engine = InterceptorEngine()

    result = engine.intercept(
        {
            "tenant_id": "tenant-restricted",
            "tool": "shell.exec",
            "action": "execute",
            "request_id": "smoke-block-tool",
        }
    )

    assert result.decision == BLOCK
    assert result.allowed is False
    assert result.route is None
    assert "not allowed" in result.reason


def test_unknown_tenant() -> None:

    engine = InterceptorEngine()

    result = engine.intercept(
        {
            "tenant_id": "tenant-unknown",
            "tool": "search",
            "action": "execute",
            "request_id": "smoke-block-tenant",
        }
    )

    assert result.decision == BLOCK
    assert result.allowed is False
    assert result.route is None


def test_missing_identity() -> None:

    engine = InterceptorEngine()

    result = engine.intercept(
        {
            "tool": "search",
            "action": "execute",
        }
    )

    assert result.decision == BLOCK
    assert result.allowed is False
    assert result.route is None
    assert "tenant_id" in result.reason


if __name__ == "__main__":
    test_allowed_tool()
    test_unauthorized_tool()
    test_unknown_tenant()
    test_missing_identity()

    print("INTERCEPTOR SMOKE TESTS: PASS")