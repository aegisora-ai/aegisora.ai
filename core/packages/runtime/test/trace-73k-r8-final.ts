import { Agent } from "../src/agent/core/agent";
import { AgentRegistry } from "../src/agents/agent-registry";

function pass(message: string) {
  console.log(`PASS: ${message}`);
}

function fail(message: string): never {
  console.error(`FAIL: ${message}`);
  process.exit(1);
}

function expectBlocked(
  label: string,
  action: () => void,
) {
  try {
    action();

    fail(
      `Illegal operation was accepted: ${label}`,
    );
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : String(error);

    if (
      !message.includes(
        "Illegal agent lifecycle transition",
      ) &&
      !message.includes(
        "already registered",
      )
    ) {
      fail(
        `Unexpected error for ${label}: ${message}`,
      );
    }

    pass(`Blocked: ${label}`);
  }
}

function expectStatus(
  agent: Agent,
  expected: string,
  label: string,
) {
  const actual =
    agent.getState().status;

  if (actual !== expected) {
    fail(
      `${label}: expected ${expected}, observed ${actual}`,
    );
  }

  pass(`${label}: ${actual}`);
}

console.log("");
console.log(
  "TRACE 73K-R8-FINAL - LIFECYCLE SECURITY CLOSURE",
);
console.log(
  "============================================================",
);
console.log("");

/* ------------------------------------------------------------
 * R8-F1: IDENTITY IMMUTABILITY
 * ------------------------------------------------------------ */

console.log("--- R8-F1: IDENTITY IMMUTABILITY ---");

const agent = new Agent({
  id: "trace-73k-r8-final-agent",
  name: "trace-73k-r8-final-agent",
});

const originalId = agent.id;

const idDescriptor =
  Object.getOwnPropertyDescriptor(
    agent,
    "id",
  );

if (!idDescriptor) {
  fail("Agent id descriptor missing.");
}

if (
  idDescriptor.writable !== false ||
  idDescriptor.configurable !== false
) {
  fail(
    "Agent identity is not runtime immutable.",
  );
}

pass("Agent identity is runtime immutable.");

let mutationThrew = false;

try {
  (
    agent as unknown as {
      id: string;
    }
  ).id = "FORGED";
} catch {
  mutationThrew = true;
}

if (agent.id !== originalId) {
  fail(
    "Agent identity changed after mutation attempt.",
  );
}

if (mutationThrew) {
  pass(
    "Agent identity mutation threw and identity remained unchanged.",
  );
} else {
  pass(
    "Agent identity mutation was ignored and identity remained unchanged.",
  );
}

/* ------------------------------------------------------------
 * R8-F2: REGISTRY UNIQUENESS
 * ------------------------------------------------------------ */

console.log("");
console.log("--- R8-F2: REGISTRY UNIQUENESS ---");

const registry =
  new AgentRegistry();

registry.register(agent);

pass("Canonical agent registered.");

const duplicate =
  new Agent({
    id: originalId,
    name: "duplicate",
  });

expectBlocked(
  "duplicate identity registration",
  () => registry.register(duplicate),
);

const entries =
  registry
    .getAll()
    .filter(
      entry => entry.id === originalId,
    );

if (entries.length !== 1) {
  fail(
    `Registry uniqueness violated: ${entries.length} entries.`,
  );
}

pass("Registry identity uniqueness preserved.");

/* ------------------------------------------------------------
 * R8-F3: STATE ISOLATION
 * ------------------------------------------------------------ */

console.log("");
console.log("--- R8-F3: STATE ISOLATION ---");

agent.start();

expectStatus(
  agent,
  "running",
  "Canonical start",
);

const exposedState =
  agent.getState();

try {
  (
    exposedState as unknown as {
      status: string;
    }
  ).status = "completed";
} catch {
  // Expected on a hardened implementation.
}

if (
  agent.getState().status !==
  "running"
) {
  fail(
    "External state mutation reached internal lifecycle state.",
  );
}

pass(
  "External state mutation cannot alter internal lifecycle state.",
);

/* ------------------------------------------------------------
 * R8-F4: VALID TRANSITION
 * ------------------------------------------------------------ */

console.log("");
console.log("--- R8-F4: VALID TRANSITION ---");

agent.complete();

expectStatus(
  agent,
  "completed",
  "running -> completed",
);

/* ------------------------------------------------------------
 * R8-F5: TERMINAL LOCK
 * ------------------------------------------------------------ */

console.log("");
console.log("--- R8-F5: TERMINAL STATE LOCK ---");

expectBlocked(
  "completed -> running",
  () => agent.start(),
);

expectBlocked(
  "completed -> failed",
  () => agent.fail(),
);

expectBlocked(
  "completed -> stopped",
  () => agent.stop(),
);

expectStatus(
  agent,
  "completed",
  "Completed terminal state",
);

/* ------------------------------------------------------------
 * R8-F6: INVALID IDLE TRANSITIONS
 * ------------------------------------------------------------ */

console.log("");
console.log("--- R8-F6: INVALID IDLE TRANSITIONS ---");

const idle =
  new Agent({
    id: "trace-73k-r8-final-idle",
    name: "trace-73k-r8-final-idle",
  });

expectBlocked(
  "idle -> completed",
  () => idle.complete(),
);

expectBlocked(
  "idle -> failed",
  () => idle.fail(),
);

expectBlocked(
  "idle -> stopped",
  () => idle.stop(),
);

expectStatus(
  idle,
  "idle",
  "Idle state preserved",
);

/* ------------------------------------------------------------
 * R8-F7: FAILED TERMINAL STATE
 * ------------------------------------------------------------ */

console.log("");
console.log("--- R8-F7: FAILED TERMINAL STATE ---");

const failed =
  new Agent({
    id: "trace-73k-r8-final-failed",
    name: "trace-73k-r8-final-failed",
  });

failed.start();
failed.fail();

expectStatus(
  failed,
  "failed",
  "running -> failed",
);

expectBlocked(
  "failed -> running",
  () => failed.start(),
);

expectBlocked(
  "failed -> completed",
  () => failed.complete(),
);

expectBlocked(
  "failed -> stopped",
  () => failed.stop(),
);

/* ------------------------------------------------------------
 * R8-F8: STOPPED TERMINAL STATE
 * ------------------------------------------------------------ */

console.log("");
console.log("--- R8-F8: STOPPED TERMINAL STATE ---");

const stopped =
  new Agent({
    id: "trace-73k-r8-final-stopped",
    name: "trace-73k-r8-final-stopped",
  });

stopped.start();
stopped.stop();

expectStatus(
  stopped,
  "stopped",
  "running -> stopped",
);

expectBlocked(
  "stopped -> running",
  () => stopped.start(),
);

expectBlocked(
  "stopped -> completed",
  () => stopped.complete(),
);

expectBlocked(
  "stopped -> failed",
  () => stopped.fail(),
);

console.log("");
console.log(
  "============================================================",
);
console.log(
  " TRACE 73K-R8-FINAL PASSED",
);
console.log(
  " LIFECYCLE SECURITY CONTRACT CLOSED",
);
console.log(
  "============================================================",
);
console.log("");
