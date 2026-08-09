import { spawnSync } from "node:child_process";
import { readdirSync } from "node:fs";
import { join } from "node:path";

const testDir =
    join(
        process.cwd(),
        "packages",
        "runtime",
        "test"
    );

const tests = readdirSync(testDir)
    .filter(
        file =>
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

    const result = spawnSync(
        "pnpm",
        ["exec", "tsx", join(testDir, test)],
        {
            stdio: "inherit",
            shell: true
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
