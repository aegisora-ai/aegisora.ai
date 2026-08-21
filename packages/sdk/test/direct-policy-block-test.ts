import { RuntimePolicyEngine } from '@aegisora/runtime';

async function main(){

  const policy = new RuntimePolicyEngine();

  const result = policy.evaluate({
    id: crypto.randomUUID(),
    type: "tool.called",
    agentId: "policy-test-agent",
    timestamp: new Date(),
    payload: {
      tool: "shell",
      action: "tool.execute",
      input: "execute shell command"
    }
  });

  console.log(JSON.stringify(result,null,2));

}

main();
