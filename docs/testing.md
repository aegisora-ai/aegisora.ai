# Aegisora Testing

Aegisora separates deterministic OSS validation from live provider validation.

## Default

```bash
pnpm build
pnpm typecheck
pnpm test
```

No provider secret is required.

## Live provider

```bash
pnpm test:live
```

Requires GROQ_API_KEY.

Verifies real provider execution for ALLOW and zero provider execution for BLOCK and ESCALATE.

## Security coverage

- direct ToolRegistry bypass
- direct provider resolution
- provider generation bypass
- identity immutability
- lifecycle integrity
- provider/model identity integrity
- cross-provider resolution authority
- protected-agent boundaries

## CI

CI runs install, build, typecheck, deterministic tests, and the example smoke test.

Live provider validation is explicit and requires the GitHub GROQ_API_KEY secret.
