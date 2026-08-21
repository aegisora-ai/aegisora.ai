import { Agent } from "../src/agent/core/agent";
import { AgentRegistry } from "../src/agents/agent-registry";

function pass(message: string) {
  console.log(`PASS: ${message}`);
}

function fail(message: string): never {
  console.error(`FAIL: ${message}`);
  process.exit(1);
}

console.log("");
console.log("TRACE 73K-R7 - IDENTITY IMMUTABILITY + UNIQUENESS");
console.log("============================================================");
console.log("");

const registry = new AgentRegistry();

const agent = new Agent({
  id: "trace-73k-r7-agent",
  name: "trace-73k-r7-agent",
});

registry.register(agent);

pass("Agent created.");
pass("Agent registered.");

console.log("");
console.log("--- R7-A: ID PROPERTY DESCRIPTOR ---");

const descriptor = Object.getOwnPropertyDescriptor(agent, "id");

console.log("descriptor:", descriptor);

if (!descriptor) {
  fail("Agent id property descriptor is missing.");
}

if (descriptor.writable === false) {
  pass("Agent id is runtime-non-writable.");
} else {
  console.log("OBSERVED: Agent id is runtime-writable.");
}

console.log("");
console.log("--- R7-A: MUTATION ATTEMPT ---");

const originalId = agent.id;

try {
  (agent as unknown as { id: string }).id =
    "trace-73k-r7-FORGED";

  if (agent.id === originalId) {
    pass("Identity mutation was rejected/ignored.");
  } else {
    console.error(
      `OBSERVED: identity mutated from ${originalId} to ${agent.id}`,
    );
  }
} catch (error) {
  console.log(
    "Mutation rejected:",
    error instanceof Error ? error.message : String(error),
  );

  if (agent.id === originalId) {
    pass("Identity mutation threw and identity remained unchanged.");
  } else {
    fail("Identity changed after rejected mutation.");
  }
}

console.log("");
console.log("--- R7-B: DUPLICATE REGISTRATION ---");

const duplicate = new Agent({
  id: originalId,
  name: "duplicate-agent",
});

try {
  registry.register(duplicate);

  const entries = registry
    .getAll()
    .filter(entry => entry.id === originalId);

  if (entries.length === 1) {
    pass("Duplicate identity rejected.");
  } else {
    console.log(
      `OBSERVED: duplicate identity accepted; registry contains ${entries.length} entries.`,
    );
  }
} catch (error) {
  console.log(
    "Duplicate registration rejected:",
    error instanceof Error ? error.message : String(error),
  );

  const entries = registry
    .getAll()
    .filter(entry => entry.id === originalId);

  if (entries.length === 1) {
    pass("Duplicate identity rejected and registry remained unique.");
  } else {
    fail("Duplicate registration corrupted registry uniqueness.");
  }
}

console.log("");
console.log("--- R7-C: CANONICAL LOOKUP ---");

const resolved = registry.getById(originalId);

if (!resolved) {
  fail("Canonical registry lookup failed.");
}

if (resolved.agent !== agent) {
  fail("Canonical registry lookup returned unexpected agent.");
}

pass("Canonical registry resolves original identity.");

console.log("");
console.log("============================================================");
console.log(" TRACE 73K-R7 FORENSICS COMPLETE");
console.log("============================================================");
console.log("");
