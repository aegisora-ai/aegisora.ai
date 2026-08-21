import { AgentRuntime,
  GovernanceEngine,
  createExecutionIntent,
  OpenAIProvider,
  AnthropicProvider,
  GeminiProvider,
  ProviderRouter,
  ProviderManager,
  ProviderExecutionGateway,
  RuntimeAPI,
} from "../src";

import type {
  ExecutionIntent,
  ExecutionActor,
  ExecutionTarget,
  ExecutionActorType,
  ExecutionTargetType,
  ProviderRequest,
  ProviderResponse,
  ProviderName,
  ProviderExecutionRequest,
} from "../src";

const actor: ExecutionActor = {
  type: "agent" as ExecutionActorType,
  id: "public-api-test-agent",
};

const target: ExecutionTarget = {
  type: "provider" as ExecutionTargetType,
  name: "openai",
};

const intent: ExecutionIntent = createExecutionIntent({
  agentId: "public-api-test-agent",
  actor,
  target,
  action: "provider.generate",
  input: { prompt: "public-api-test" },
  metadata: {},
});

const request: ProviderRequest = {
  model: "test-model",
  prompt: "public-api-test",
};

const response: ProviderResponse = {
  provider: "openai",
  model: "test-model",
  output: "public-api-test",
};

const providerName: ProviderName = "openai";
const executionRequest = {} as ProviderExecutionRequest;

const governance = new GovernanceEngine();
const runtimeApi = new RuntimeAPI(new AgentRuntime());
const openai = new OpenAIProvider();
const anthropic = new AnthropicProvider();
const gemini = new GeminiProvider();

void intent;
void request;
void response;
void providerName;
void executionRequest;
void governance;
void runtimeApi;
void openai;
void anthropic;
void gemini;
void ProviderRouter;
void ProviderManager;
void ProviderExecutionGateway;
