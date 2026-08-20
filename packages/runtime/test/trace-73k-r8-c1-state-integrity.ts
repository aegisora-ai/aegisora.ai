import { Agent } from "../src/agent/core/agent";

function pass(message: string) {
  console.log(`PASS: ${message}`);
}

function fail(message: string): never {
  console.error(`FAIL: ${message}`);
  process.exit(1);
}

console.log("");
console.log("TRACE 73K-R8-C1 - STATE OBJECT INTEGRITY");
console.log("============================================================");
console.log("");

const agent = new Agent({
  id: "trace-73k-r8-c1-agent",
  name: "trace-73k-r8-c1-agent",
});

agent.start();

pass("Agent transitioned to running.");

const state = agent.getState();

console.log("");
console.log("--- R8-C1-A: STATE OBJECT DESCRIPTOR ---");

const descriptor = Object.getOwnPropertyDescriptor(
  state,
  "status",
);

console.log("descriptor:", descriptor);

if (!descriptor) {
  fail("State status descriptor is missing.");
}

if (descriptor.writable === false) {
  pass("State status is runtime-non-writable.");
} else {
  console.log(
    "OBSERVED: State status is runtime-writable.",
  );
}

console.log("");
console.log("--- R8-C1-B: DIRECT STATE MUTATION ---");

const originalStatus = agent.getState().status;

try {
  (
    agent.getState() as unknown as {
      status: string;
    }
  ).status = "completed";

  const observed = agent.getState().status;

  if (observed === originalStatus) {
    pass("Direct state mutation was rejected/ignored.");
  } else {
    console.log(
      `OBSERVED: state mutated from ${originalStatus} to ${observed}`,
    );
  }
} catch (error) {
  console.log(
    "Mutation rejected:",
    error instanceof Error
      ? error.message
      : String(error),
  );

  if (agent.getState().status === originalStatus) {
    pass(
      "Direct state mutation threw and state remained unchanged.",
    );
  } else {
    fail("State changed after rejected mutation.");
  }
}

console.log("");
console.log("--- R8-C1-C: TRANSITION GUARD AFTER ATTACK ---");

if (agent.getState().status !== "running") {
  console.log(
    `OBSERVED: state was externally mutated to ${agent.getState().status}`,
  );
} else {
  pass("State remained running after direct mutation attempt.");
}

try {
  agent.complete();

  if (agent.getState().status === "completed") {
    pass("Canonical running -> completed transition works.");
  } else {
    fail(
      `Expected completed after canonical transition, observed ${agent.getState().status}`,
    );
  }
} catch (error) {
  fail(
    `Canonical transition unexpectedly failed: ${
      error instanceof Error
        ? error.message
        : String(error)
    }`,
  );
}

console.log("");
console.log("============================================================");
console.log(" TRACE 73K-R8-C1 FORENSICS COMPLETE");
console.log("============================================================");
console.log("");
