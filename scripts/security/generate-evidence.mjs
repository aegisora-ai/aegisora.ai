import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const outputDir = path.join(root, "security-evidence");

fs.mkdirSync(outputDir, { recursive: true });

const packageNames = [
  "audit",
  "core",
  "observability",
  "plugins",
  "policy-engine",
  "runtime",
  "sdk",
  "security-engine",
  "storage"
];

function readJson(relativePath) {
  const absolutePath = path.join(root, relativePath);
  return JSON.parse(fs.readFileSync(absolutePath, "utf8"));
}

function getOutcome(name) {
  return process.env[name] || "unknown";
}

const checks = {
  toolchain: getOutcome("EV_TOOLCHAIN"),
  install: getOutcome("EV_INSTALL"),
  artifacts: getOutcome("EV_ARTIFACTS"),
  claims: getOutcome("EV_CLAIMS"),
  build: getOutcome("EV_BUILD"),
  typecheck: getOutcome("EV_TYPECHECK"),
  test: getOutcome("EV_TEST"),
  tarballs: getOutcome("EV_TARBALLS"),
  secrets: getOutcome("EV_SECRETS"),
  codeowners: getOutcome("EV_CODEOWNERS"),
  git_diff: getOutcome("EV_GIT_DIFF")
};

const allChecksPassed = Object.values(checks).every(
  (value) => value === "success"
);

const packages = packageNames.map((name) => {
  const file = `core/packages/${name}/package.json`;
  const pkg = readJson(file);

  return {
    name: pkg.name,
    version: pkg.version,
    license: pkg.license ?? null,
    repository: pkg.repository ?? null,
    homepage: pkg.homepage ?? null,
    has_exports: Boolean(pkg.exports),
    has_types: Boolean(pkg.types),
    files_count: Array.isArray(pkg.files) ? pkg.files.length : 0
  };
});

const riskText = fs.readFileSync(
  path.join(root, "docs/security/SECURITY_RISK_REGISTER.md"),
  "utf8"
);

const controlText = fs.readFileSync(
  path.join(root, "docs/security/SECURITY_CONTROLS.md"),
  "utf8"
);

const risks = [
  ...new Set(riskText.match(/RISK-\d{3}/g) || [])
];

const controls = [
  ...new Set(controlText.match(/SEC-\d{3}/g) || [])
];

const manifest = {
  schema_version: "1.0",
  evidence_type: "security-readiness",
  evidence_level: "L3",
  overall_status: allChecksPassed ? "PASS" : "FAIL",
  generated_at: new Date().toISOString(),
  repository: process.env.GITHUB_REPOSITORY || "aegisora-ai/aegisora",
  workflow: process.env.GITHUB_WORKFLOW || "local",
  run_id: process.env.GITHUB_RUN_ID || null,
  run_attempt: process.env.GITHUB_RUN_ATTEMPT || null,
  ref: process.env.GITHUB_REF || null,
  ref_name: process.env.GITHUB_REF_NAME || null,
  commit_sha: process.env.GITHUB_SHA || null,
  checks,
  evidence_files: [
    "manifest.json",
    "summary.json",
    "controls.json",
    "packages.json",
    "tests.json",
    "risks.json",
    "git.json"
  ]
};

const controlEvidence = {
  evidence_level: "L3",
  controls: [
    "SEC-001",
    "SEC-002",
    "SEC-003",
    "SEC-004",
    "SEC-006",
    "SEC-007",
    "SEC-008",
    "SEC-009",
    "SEC-010",
    "SEC-011",
    "SEC-015",
    "SEC-016",
    "SEC-017"
  ].map((controlId) => ({
    control_id: controlId,
    status: "MEASURED",
    evidence: ["manifest.json", "tests.json"]
  })),
  repository_control_count: controls.length
};

const tests = {
  evidence_level: "L3",
  build: checks.build,
  typecheck: checks.typecheck,
  test: checks.test,
  tarball_audit: checks.tarballs,
  secret_scan: checks.secrets,
  codeowners: checks.codeowners,
  runtime_test_suite: {
    package: "@aegisora/runtime",
    source: "core/packages/runtime/test/run-all.ts",
    outcome: checks.test
  }
};

const riskEvidence = {
  evidence_level: "L3",
  risk_count: risks.length,
  risk_ids: risks,
  source: "docs/security/SECURITY_RISK_REGISTER.md"
};

const gitEvidence = {
  repository: process.env.GITHUB_REPOSITORY || "aegisora-ai/aegisora",
  branch: process.env.GITHUB_REF_NAME || null,
  commit: process.env.GITHUB_SHA || null,
  workflow_run: process.env.GITHUB_RUN_ID || null
};

const summary = {
  evidence_level: "L3",
  overall_status: manifest.overall_status,
  generated_at: manifest.generated_at,
  package_count: packages.length,
  risk_count: risks.length,
  checks
};

function writeJson(fileName, data) {
  const file = path.join(outputDir, fileName);
  fs.writeFileSync(
    file,
    JSON.stringify(data, null, 2) + "\n",
    "utf8"
  );
}

writeJson("manifest.json", manifest);
writeJson("summary.json", summary);
writeJson("controls.json", controlEvidence);
writeJson("packages.json", packages);
writeJson("tests.json", tests);
writeJson("risks.json", riskEvidence);
writeJson("git.json", gitEvidence);

if (!allChecksPassed) {
  console.error("SECURITY EVIDENCE GATE: FAIL");

  for (const [name, value] of Object.entries(checks)) {
    if (value !== "success") {
      console.error(`  ${name}: ${value}`);
    }
  }

  process.exit(1);
}

console.log("SECURITY EVIDENCE GATE: PASS");
console.log("Evidence level: L3");
console.log(`Packages measured: ${packages.length}`);
console.log(`Risks tracked: ${risks.length}`);