import { AegisoraClient } from "@aegisora/sdk";

const client = new AegisoraClient();

const runtime = client.runtimeInstance();

console.log("===== SDK RUNTIME DIAGNOSTIC =====");

console.log(
  "Tools:",
  runtime.getToolRegistry().list()
);

console.log(
  "Tool count:",
  runtime.getToolRegistry().list().length
);

console.log(
  "Has echo:",
  runtime.getToolRegistry().has("echo")
);

console.log("==================================");
