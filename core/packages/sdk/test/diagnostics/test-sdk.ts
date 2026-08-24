import { AegisoraClient } from "@aegisora/sdk";

async function main() {
  const client = new AegisoraClient();

  const agent = client.agent({
    name: "test-agent",
  });

  console.log("===== AEGISORA SDK TEST =====");
  console.log("Agent created.");

  const result = await agent.run(
    "Test Aegisora runtime execution"
  );

  console.log("Result:");
  console.dir(result, { depth: null });

  console.log("=============================");
}

main().catch((error) => {
  console.error("SDK TEST FAILED");
  console.error(error);
  process.exit(1);
});
