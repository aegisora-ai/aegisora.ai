import { spawnSync } from "node:child_process";
import { createRequire } from "node:module";
import { readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const testDir = dirname(__filename);

const tests = readdirSync(testDir)
    .filter(
        (file) =>
            file.endsWith(".ts") &&
            file !== "run-all.ts"
    )
    .sort();

const failed: string[] = [];

for (const test of tests) {
    console.log("");
    console.log("============================================");
    console.log(`RUNNING: ${test}`);
    console.log("============================================");

    const testPath = join(testDir, test);

    const require = createRequire(import.meta.url);
const tsxCli = require.resolve("tsx/cli");

const result = spawnSync(
    process.execPath,
    [tsxCli, testPath],
    {
        stdio: "inherit",
        shell: false
    }
);

    if (result.status !== 0) {
        failed.push(test);
        console.error(`FAILED: ${test}`);
    } else {
        console.log(`PASSED: ${test}`);
    }
}

console.log("");
console.log("============================================");
console.log("RUNTIME TEST SUITE RESULT");
console.log("============================================");

if (failed.length > 0) {
    console.error("");
    console.error("FAILED TESTS:");

    for (const test of failed) {
        console.error(`- ${test}`);
    }

    process.exit(1);
}

console.log("");
console.log(`ALL ${tests.length} RUNTIME TESTS PASSED.`);
