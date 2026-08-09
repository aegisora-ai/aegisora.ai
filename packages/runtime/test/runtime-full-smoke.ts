import {
  AgentRuntime
} from "../src";

async function main() {

  const runtime =
    new AgentRuntime();

  const agent =
    runtime.create(
      "autonomous-agent",
      {
        role: "planner"
      }
    );

  console.log(
    "AGENT CREATED:",
    agent.id
  );

  const result =
    await runtime.execute({
      agentId: "autonomous-agent",
      goal:
        "Analyze a problem and create execution steps"
    });

  console.log(
    "EXECUTION RESULT:"
  );

  console.log(result);

  console.log(
    "RUNTIME STATE:"
  );

  console.log(
    JSON.stringify(
      runtime.getState(),
      null,
      2
    )
  );

}

main();
