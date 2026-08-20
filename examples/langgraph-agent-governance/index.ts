import { StateGraph, END } from "@langchain/langgraph";
import { Aegisora } from "@aegisora/core";

// 1. Initialize Aegisora Zero-Trust Proxy
const aegisora = new Aegisora({
    apiKey: process.env.AEGISORA_API_KEY
});

// 2. Define the Tool Execution Node in LangGraph
async function executeToolNode(state: any) {
    const toolCall = state.currentToolCall;
    console.log(`[LangGraph] Intercepting tool call: ${toolCall.name}...`);

    // 🛡️ Aegisora Enforcement Layer
    const governance = await aegisora.enforce({
        agentId: "finance-agent-prod",
        action: toolCall.name,
        payload: toolCall.arguments,
    });

    // Handle the 3-State Governance Decision
    switch (governance.state) {
        case "BLOCK":
            console.error(`[Aegisora] 🛑 Blocked: ${governance.reason}`);
            return { status: "FAILED", result: "Action blocked by security policy." };

        case "ESCALATE":
            console.warn(`[Aegisora] ⏳ Escalated: Routing to Human Review (Ticket: ${governance.ticketId})`);
            return { status: "PAUSED_FOR_HUMAN_REVIEW", ticketId: governance.ticketId };

        case "ALLOW":
            console.log(`[Aegisora] ✅ Allowed. Executing tool...`);
            return { status: "SUCCESS", result: "Mock execution successful" };

        default:
            throw new Error("Unknown governance state");
    }
}

// 3. Build the standard LangGraph Workflow
const workflow = new StateGraph({ channels: {} })
    .addNode("tools", executeToolNode)
    .addEdge("tools", END);

export const app = workflow.compile();
