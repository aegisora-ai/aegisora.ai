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

    fail(
      `Illegal transition was accepted: ${label}`,
    );
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : String(error);

    if (
      !message.includes(
        "Illegal agent lifecycle transition",
      )
    ) {
      fail(
        `Unexpected error for ${label}: ${message}`,
      );
    }

    pass(
      `Illegal transition blocked: ${label}`,
    );
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
  "TRACE 73K-R8-B2 - COMPLETE LIFECYCLE TRANSITION MATRIX",
);
console.log(
  "============================================================",
);
console.log("");

console.log("--- INVALID IDLE TRANSITIONS ---");

const idle = new Agent({
  id: "trace-73k-r8-b2-idle",
  name: "trace-73k-r8-b2-idle",
});

expectStatus(
  idle,
  "idle",
  "Initial state",
);

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

console.log("");
console.log("--- INVALID RUNNING TRANSITION ---");

const running = new Agent({
  id: "trace-73k-r8-b2-running",
  name: "trace-73k-r8-b2-running",
});

running.start();

expectStatus(
  running,
  "running",
  "Initial running state",
);

expectBlocked(
  "running -> running",
  () => running.start(),
);

expectStatus(
  running,
  "running",
  "Running state preserved",
);

console.log("");
console.log("--- VALID TERMINAL TRANSITIONS ---");

const completed = new Agent({
  id: "trace-73k-r8-b2-completed",
  name: "trace-73k-r8-b2-completed",
});

completed.start();
completed.complete();

expectStatus(
  completed,
  "completed",
  "running -> completed",
);

const failed = new Agent({
  id: "trace-73k-r8-b2-failed",
  name: "trace-73k-r8-b2-failed",
});

failed.start();
failed.fail();

expectStatus(
  failed,
  "failed",
  "running -> failed",
);

const stopped = new Agent({
  id: "trace-73k-r8-b2-stopped",
  name: "trace-73k-r8-b2-stopped",
});

stopped.start();
stopped.stop();

expectStatus(
  stopped,
  "stopped",
  "running -> stopped",
);

console.log("");
console.log(
  "============================================================",
);
console.log(
  " TRACE 73K-R8-B2 PASSED",
);
console.log(
  " COMPLETE TRANSITION MATRIX CONFIRMED",
);
console.log(
  "============================================================",
);
console.log("");
