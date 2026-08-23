import { Agent } from "../src/agent/core/agent";

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

    console.error(`OBSERVED: illegal transition was accepted: ${label}`);
  } catch (error) {
    console.log(
      `Blocked: ${label}:`,
      error instanceof Error ? error.message : String(error),
    );

    pass(`Illegal transition blocked: ${label}`);
  }
}

function expectStatus(
  agent: Agent,
  expected: string,
  label: string,
) {
  const actual = agent.getState().status;

  if (actual !== expected) {
    fail(
      `${label}: expected ${expected}, observed ${actual}`,
    );
  }

  pass(`${label}: ${actual}`);
}

console.log("");
console.log("TRACE 73K-R8 - LIFECYCLE STATE INTEGRITY");
console.log("============================================================");
console.log("");

const agent = new Agent({
  id: "trace-73k-r8-agent",
  name: "trace-73k-r8-agent",
});

pass("Agent created.");

expectStatus(
  agent,
  "idle",
  "Initial lifecycle state",
);

console.log("");
console.log("--- R8-A: VALID TRANSITIONS ---");

agent.start();

expectStatus(
  agent,
  "running",
  "idle -> running",
);

agent.complete();

expectStatus(
  agent,
  "completed",
  "running -> completed",
);

console.log("");
console.log("--- R8-B: TERMINAL STATE LOCK ---");

expectBlocked(
  "completed -> running",
  () => agent.start(),
);

expectStatus(
  agent,
  "completed",
  "completed state preserved",
);

expectBlocked(
  "completed -> failed",
  () => agent.fail(),
);

expectStatus(
  agent,
  "completed",
  "completed state preserved after fail attempt",
);

expectBlocked(
  "completed -> stopped",
  () => agent.stop(),
);

expectStatus(
  agent,
  "completed",
  "completed state preserved after stop attempt",
);

console.log("");
console.log("--- R8-C: FAILED TERMINAL STATE ---");

const failed = new Agent({
  id: "trace-73k-r8-failed-agent",
  name: "trace-73k-r8-failed-agent",
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

expectStatus(
  failed,
  "failed",
  "failed terminal state preserved",
);

console.log("");
console.log("--- R8-D: STOPPED TERMINAL STATE ---");

const stopped = new Agent({
  id: "trace-73k-r8-stopped-agent",
  name: "trace-73k-r8-stopped-agent",
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

expectStatus(
  stopped,
  "stopped",
  "stopped terminal state preserved",
);

console.log("");
console.log("============================================================");
console.log(" TRACE 73K-R8 FORENSICS COMPLETE");
console.log("============================================================");
console.log("");
