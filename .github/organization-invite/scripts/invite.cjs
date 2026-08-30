const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const ROOT = path.resolve(".github/organization-invite");
const DATA = path.join(ROOT, "data");

const ORG = "aegisora-ai";

const TEAMS = {
  contributors: {
    slug: "contributors",
    id: 19011233,
    maxPerRun: 500
  },
  securityResearchers: {
    slug: "security-researchers",
    id: 19011222,
    maxPerRun: 500
  },
  coreMaintainers: {
    slug: "core-maintainers",
    id: 19011155,
    maxPerRun: 25
  }
};

const DRY_RUN =
  String(process.env.AEGISORA_INVITE_DRY_RUN ?? "true")
    .toLowerCase() !== "false";

function runGh(args, input = undefined) {
  return execFileSync("gh", args, {
    encoding: "utf8",
    maxBuffer: 20 * 1024 * 1024,
    input
  }).trim();
}

function ghApi(endpoint, method = "GET", body = null) {
  const args = [
    "api",
    endpoint,
    "--header", "Accept: application/vnd.github+json",
    "--header", "X-GitHub-Api-Version: 2022-11-28"
  ];

  if (method !== "GET") {
    args.push("--method", method);
  }

  if (body) {
    args.push(
      "--header", "Content-Type: application/json",
      "--input", "-"
    );
  }

  const output = runGh(
    args,
    body ? JSON.stringify(body) : undefined
  );

  return output ? JSON.parse(output) : null;
}

function readUsers(filename) {
  const file = path.join(DATA, filename);

  if (!fs.existsSync(file)) {
    return [];
  }

  return fs.readFileSync(file, "utf8")
    .replace(/^\uFEFF/, "")
    .split(/\r?\n/)
    .map(x => x.trim())
    .filter(Boolean)
    .filter(x => !x.startsWith("#"))
    .filter((x, i, a) => a.indexOf(x) === i);
}

function log(status, username, team, reason = "") {
  const suffix = reason ? ` :: ${reason}` : "";
  console.log(
    `${status.padEnd(10)} ${username.padEnd(25)} -> ${team}${suffix}`
  );
}

async function main() {
  console.log("");
  console.log("============================================================");
  console.log(" AEGISORA ORGANIZATION INVITE ENGINE");
  console.log("============================================================");
  console.log(`Organization : ${ORG}`);
  console.log(`Mode         : ${DRY_RUN ? "DRY RUN" : "PRODUCTION"}`);
  console.log("");

  console.log("Checking GitHub authentication...");
  runGh(["auth", "status"]);

  console.log("");
  console.log("Loading organization members...");

  const members = new Set();
  let page = 1;

  while (true) {
    const batch = ghApi(
      `/orgs/${ORG}/members?per_page=100&page=${page}`
    );

    if (!Array.isArray(batch) || batch.length === 0) break;

    for (const user of batch) {
      if (user?.login) {
        members.add(user.login.toLowerCase());
      }
    }

    if (batch.length < 100) break;
    page++;
  }

  console.log(`Members loaded : ${members.size}`);

  console.log("");
  console.log("Loading pending invitations...");

  const pending = new Set();
  page = 1;

  while (true) {
    const batch = ghApi(
      `/orgs/${ORG}/invitations?per_page=100&page=${page}`
    );

    if (!Array.isArray(batch) || batch.length === 0) break;

    for (const invite of batch) {
      if (invite?.login) {
        pending.add(invite.login.toLowerCase());
      }
    }

    if (batch.length < 100) break;
    page++;
  }

  console.log(`Pending invites : ${pending.size}`);

  const sources = [
    ["contributors", "contributors.txt", TEAMS.contributors],
    ["security-researchers", "security-researchers.txt", TEAMS.securityResearchers],
    ["core-maintainers", "core-maintainers.txt", TEAMS.coreMaintainers]
  ];

  const results = [];

  for (const [teamName, filename, team] of sources) {
    const users = readUsers(filename);

    if (users.length > team.maxPerRun) {
      throw new Error(
        `${teamName}: ${users.length} candidates exceeds maxPerRun=${team.maxPerRun}`
      );
    }

    console.log("");
    console.log(`TEAM: ${teamName}`);
    console.log(`Candidates: ${users.length}`);
    console.log("");

    for (const username of users) {
      const result = {
        timestamp: new Date().toISOString(),
        username,
        team: teamName,
        teamSlug: team.slug,
        teamId: team.id,
        status: null,
        reason: null
      };

      try {
        const normalized = username.toLowerCase();

        if (members.has(normalized)) {
          result.status = "SKIPPED";
          result.reason = "already_member";
          log("SKIPPED", username, teamName, "already member");
          results.push(result);
          continue;
        }

        if (pending.has(normalized)) {
          result.status = "SKIPPED";
          result.reason = "pending_invitation";
          log("SKIPPED", username, teamName, "pending invitation");
          results.push(result);
          continue;
        }

        let user;

        try {
          user = ghApi(`/users/${encodeURIComponent(username)}`);
        } catch {
          user = null;
        }

        if (!user || user.type !== "User") {
          result.status = "FAILED";
          result.reason = "github_user_not_found";
          log("FAILED", username, teamName, "user not found");
          results.push(result);
          continue;
        }

        result.userId = user.id;
        result.profile = user.html_url;

        if (DRY_RUN) {
          result.status = "WOULD_INVITE";
          result.reason = "dry_run";
          log("WOULD_INVITE", username, teamName);
          results.push(result);
          continue;
        }

        ghApi(
          `/orgs/${ORG}/invitations`,
          "POST",
          {
            invitee_id: user.id,
            role: "direct_member",
            team_ids: [team.id]
          }
        );

        result.status = "INVITED";
        result.reason = "github_invitation_created";

        // Prevent duplicate invite attempts within this same run.
        pending.add(normalized);

        log("INVITED", username, teamName);
      } catch (error) {
        result.status = "FAILED";
        result.reason =
          error?.message ||
          "unknown_error";

        log("FAILED", username, teamName, result.reason);
      }

      results.push(result);

      // Conservative pacing between invitation attempts.
      if (!DRY_RUN) {
        await new Promise(resolve => setTimeout(resolve, 1500));
      }
    }
  }

  const summary = {
    generatedAt: new Date().toISOString(),
    organization: ORG,
    dryRun: DRY_RUN,
    total: results.length,
    wouldInvite: results.filter(x => x.status === "WOULD_INVITE").length,
    invited: results.filter(x => x.status === "INVITED").length,
    skipped: results.filter(x => x.status === "SKIPPED").length,
    failed: results.filter(x => x.status === "FAILED").length
  };

  const output = path.join(
    DATA,
    `invite-run-${new Date().toISOString().replace(/[:.]/g, "-")}.json`
  );

  fs.writeFileSync(
    output,
    JSON.stringify({ summary, results }, null, 2),
    "utf8"
  );

  console.log("");
  console.log("============================================================");
  console.log(" INVITE RUN COMPLETE");
  console.log("============================================================");
  console.log(JSON.stringify(summary, null, 2));
  console.log("");
  console.log(`Audit file: ${output}`);

  if (DRY_RUN) {
    console.log("");
    console.log("NO INVITATIONS WERE SENT.");
  }
}

main().catch(error => {
  console.error("");
  console.error("INVITE ENGINE FAILED");
  console.error(error);
  process.exit(1);
});