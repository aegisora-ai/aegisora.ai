import assert from "node:assert/strict";

import { AgentExecutor } from "../src/execution/executor";
import { RuntimeContext } from "../src/context/runtime-context";
import { PermissionEngine } from "../src/permissions";
import { EnforcementGate } from "../src/enforcement";

import {
  ProviderExecutionGateway
} from "../src/providers/provider-execution-gateway";

import {
  ProviderRouter
} from "../src/providers/provider-router";

import {
  BaseProvider
} from "../src/providers/base-provider";

import type {
  ProviderRequest,
  ProviderResponse,
} from "../src/providers/base-provider";

import {
  TaskManager
} from "../src/tasks";

import {
  ToolRegistry,
  ToolSelector,
  EchoTool,
} from "../src/tools";

import {
  PlannerEngine
} from "../src/planner";

import {
  GoalManager
} from "../src/goal";

import {
  Agent
} from "../src/agent";


class CountingProvider extends BaseProvider {

  public readonly name = "test";

  public calls = 0;

  async generate(
    request: ProviderRequest,
    _context?: unknown
  ): Promise<ProviderResponse> {

    this.calls++;

    console.log(
      "COUNTING PROVIDER CALLED:",
      this.calls
    );

    return this.buildResponse(
      "test",
      request.model ?? "test-model",
      `TEST:${request.prompt}`
    );
  }
}


async function main() {

  console.log("");
  console.log("==================================================");
  console.log(" TRACE 54 - REAL EXECUTOR PROVIDER BOUNDARY");
  console.log("==================================================");

  const context =
    new RuntimeContext();

  const permissions =
    new PermissionEngine();

  const provider =
    new CountingProvider();

  const router =
    new ProviderRouter();

  router.register(
    "openai",
    provider
  );

  const gateway =
    new ProviderExecutionGateway(
      context,
      router,
      undefined,
      permissions
    );

  const goals =
    new GoalManager();

  const planner =
    new PlannerEngine(
      goals
    );

  const tasks =
    new TaskManager();

  const toolExecutionToken =
    Symbol("trace54.tool.execution");

  const tools =
    new ToolRegistry(
      toolExecutionToken
    );

  tools.register(
    new EchoTool()
  );

  const enforcement =
    new EnforcementGate(
      context,
      permissions
    );

  tools.setEnforcementGate(
    enforcement
  );

  const selector =
    new ToolSelector(
      tools
    );

  const executor =
    new AgentExecutor(
      tasks,
      selector,
      planner,
      context,
      permissions,
      tools,
      toolExecutionToken,
      gateway
    );

  const agentId =
    "trace54-agent";

  const agent =
    new Agent({
      id: agentId,
      name: agentId,
    });

  context.agentRegistry.register(
    agent
  );


  console.log("");
  console.log("=== 54A - VERIFY PROVIDER REGISTRATION ===");

  assert.equal(
    gateway.has("openai"),
    true,
    "OpenAI provider must be registered"
  );

  console.log(
    "Providers:",
    gateway.list()
  );

  console.log(
    "PASS: provider registered"
  );


  console.log("");
  console.log("=== 54B - CREATE REAL GOAL ===");

  const goal =
    goals.create(
      agent.id,
      "Use the echo tool to execute a real provider-backed step"
    );

  console.log(
    "Goal ID:",
    goal.id
  );

  assert.equal(
    goal.agentId,
    agent.id
  );

  console.log(
    "PASS: real goal created"
  );


  console.log("");
  console.log("=== 54C - BUILD REAL EXECUTION PLAN ===");

  const plan =
    planner.createFromGoal(
      goal.id
    );

  console.log(
    "Plan ID:",
    plan.id
  );

  console.log(
    "Plan steps:",
    plan.steps.length
  );

  assert.ok(
    plan.steps.length > 0,
    "Planner must create at least one step"
  );

  console.log(
    "PASS: real execution plan created"
  );


  console.log("");
  console.log("=== 54D - REAL AGENT EXECUTOR ===");

  const result =
    await executor.execute(
      agent,
      plan
    );

  console.log("");
  console.log(
    "Execution result:"
  );

  console.log(
    JSON.stringify(
      result,
      null,
      2
    )
  );

  console.log("");
  console.log(
    "Provider calls:",
    provider.calls
  );

  assert.equal(
    provider.calls,
    plan.steps.length,
    "Every executed plan step must pass through provider gateway"
  );

  assert.equal(
    result.success,
    true
  );

  assert.equal(
    result.steps,
    plan.steps.length
  );

  console.log(
    "PASS: real AgentExecutor reached provider gateway"
  );


  console.log("");
  console.log("=== 54E - EVENT STORE ===");

  const events =
    (context as any)
      .eventStore
      ?.events ?? [];

  console.log(
    "Event count:",
    events.length
  );

  const toolEvents =
    events.filter(
      (event: any) =>
        event.type === "tool.called" &&
        event.metadata?.resourceType !== "provider"
    );

  console.log(
    "tool.called events:",
    toolEvents.length
  );

  assert.ok(
    toolEvents.length >= plan.steps.length,
    "Every executed plan step must produce observable tool evidence"
  );

  const toolEventsWithCorrelation =
    toolEvents.filter(
      (event: any) =>
        Boolean(event.metadata?.correlationId)
    );

  assert.equal(
    toolEventsWithCorrelation.length,
    toolEvents.length,
    "Every tool execution event must carry correlationId"
  );

  console.log(
    "PASS: canonical tool execution evidence persisted with correlation."
  );


  console.log("");
  console.log("=== 54F - PROVIDER BOUNDARY CONFIRMATION ===");

  console.log(
    "Provider calls:",
    provider.calls
  );

  console.log(
    "Executed steps:",
    result.steps
  );

  assert.equal(
    provider.calls,
    result.steps
  );

  console.log(
    "PASS: provider calls == executed steps"
  );


  console.log("");
  console.log("==================================================");
  console.log(" TRACE 54 COMPLETE - ALL ASSERTIONS PASSED");
  console.log("==================================================");
}


main().catch(error => {

  console.error("");
  console.error("==================================================");
  console.error(" TRACE 54 FAILED");
  console.error("==================================================");

  console.error(
    error instanceof Error
      ? error.stack
      : error
  );

  process.exitCode = 1;
});
