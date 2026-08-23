import assert from "node:assert/strict";

import {
  MemoryStore,
} from "../src/adapters/memory-store";

import {
  FileStore,
} from "../src/adapters/file-store";

import {
  AgentRepository,
} from "../src/repositories/agent-repository";

import {
  DecisionRepository,
} from "../src/repositories/decision-repository";

import {
  rm,
} from "node:fs/promises";

async function testMemory() {

  const storage =
    new MemoryStore();

  const agents =
    new AgentRepository(storage);

  const decisions =
    new DecisionRepository(storage);

  const now =
    new Date();

  await agents.create({
    id: "agent-record-1",
    agentId: "agent-1",
    name: "Agent One",
    metadata: {
      trace: "storage",
    },
    createdAt: now,
    updatedAt: now,
  });

  const byAgent =
    await agents.get("agent-1");

  assert.ok(
    byAgent,
    "AgentRepository.get(agentId) must resolve",
  );

  assert.equal(
    byAgent.agentId,
    "agent-1",
  );

  await decisions.create({
    id: "decision-1",
    requestId: "request-1",
    agentId: "agent-1",
    decision: "ALLOW",
    reason: "test",
    riskScore: 0,
    metadata: {},
    createdAt: now,
    updatedAt: now,
  });

  const byRequest =
    await decisions.get(
      "request-1",
    );

  assert.ok(
    byRequest,
    "DecisionRepository.get(requestId) must resolve",
  );

  assert.equal(
    byRequest.requestId,
    "request-1",
  );

  const byAgentDecisions =
    await decisions.findByAgent(
      "agent-1",
    );

  assert.equal(
    byAgentDecisions.length,
    1,
  );

  assert.equal(
    await agents.remove(
      "agent-record-1",
    ),
    true,
  );

  console.log(
    "PASS: MemoryStore repository contract",
  );
}

async function testFile() {

  const filePath =
    ".tmp/storage-contract.json";

  await rm(
    filePath,
    {
      force: true,
    },
  );

  const storage =
    new FileStore(filePath);

  const now =
    new Date();

  await storage.save({
    id: "file-record-1",
    createdAt: now,
    updatedAt: now,
    agentId: "file-agent",
  });

  const result =
    await storage.find({
      agentId: "file-agent",
    });

  assert.ok(
    result,
    "FileStore agentId lookup must resolve",
  );

  assert.equal(
    result.agentId,
    "file-agent",
  );

  const list =
    await storage.list();

  assert.equal(
    list.length,
    1,
  );

  assert.equal(
    await storage.delete(
      "file-record-1",
    ),
    true,
  );

  await rm(
    filePath,
    {
      force: true,
    },
  );

  console.log(
    "PASS: FileStore contract",
  );
}

async function main() {

  console.log("");
  console.log(
    "TRACE STORAGE-1 - STORAGE CONTRACT",
  );
  console.log(
    "============================================================",
  );

  await testMemory();
  await testFile();

  console.log("");
  console.log(
    "TRACE STORAGE-1 PASSED",
  );
  console.log(
    "STORAGE ADAPTER + REPOSITORY CONTRACT CLOSED",
  );
  console.log(
    "============================================================",
  );
}

main().catch(
  (error) => {
    console.error(
      "TRACE STORAGE-1 FAILED",
    );
    console.error(error);
    process.exitCode = 1;
  },
);