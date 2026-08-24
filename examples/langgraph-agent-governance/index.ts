import { Annotation, END, START, StateGraph } from "@langchain/langgraph";
import { Aegisora } from "@aegisora/sdk";

const State = Annotation.Root({
  goal: Annotation<string>(),
  status: Annotation<string>(),
  output: Annotation<string>(),
});

const protectedAgent = Aegisora.protect({
  async run(input: string) {
    if (!input.trim()) {
      throw new Error("Goal is required.");
    }

    return {
      message: `Aegisora protected execution completed for: ${input}`,
    };
  },
});

async function executeAgentNode(state: typeof State.State) {
  const result = await protectedAgent.run({ input: state.goal });

  return {
    status: "SUCCESS",
    output: result.output,
  };
}

const workflow = new StateGraph(State)
  .addNode("execute", executeAgentNode)
  .addEdge(START, "execute")
  .addEdge("execute", END);

export const app = workflow.compile();

async function main() {
  const goal = process.env.AEGISORA_EXAMPLE_GOAL ??
    "Run a protected LangGraph agent action.";

  const result = await app.invoke({
    goal,
    status: "",
    output: "",
  });

  if (result.status !== "SUCCESS") {
    throw new Error(`Example failed with status: ${result.status}`);
  }

  console.log("============================================================");
  console.log("AEGISORA LANGGRAPH EXAMPLE");
  console.log("============================================================");
  console.log(`STATUS=${result.status}`);
  console.log(`OUTPUT=${result.output}`);
  console.log("EXAMPLE_RESULT=PASS");
}

main().catch((error) => {
  console.error("EXAMPLE_RESULT=FAIL");
  console.error(error instanceof Error ? error.stack : String(error));
  process.exitCode = 1;
});
