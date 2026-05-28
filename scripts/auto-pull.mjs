#!/usr/bin/env node
/**
 * Polls the remote git origin every 5s. If the remote `main` branch is ahead
 * of local, runs `git pull`. Use this in dev to auto-sync content saved
 * through the Outstatic dashboard back to the local filesystem.
 */
import { execSync } from "node:child_process";

const INTERVAL_MS = 5000;
const BRANCH = "main";

function run(cmd) {
  return execSync(cmd, { encoding: "utf-8" }).trim();
}

function safeRun(cmd) {
  try {
    return run(cmd);
  } catch {
    return null;
  }
}

async function tick() {
  // Fetch quietly so we know the remote state
  safeRun(`git fetch origin ${BRANCH} --quiet`);

  const local = safeRun(`git rev-parse ${BRANCH}`);
  const remote = safeRun(`git rev-parse origin/${BRANCH}`);

  if (!local || !remote) return;
  if (local === remote) return;

  // Check if we have local uncommitted changes - if so, skip
  const status = safeRun("git status --porcelain");
  if (status && status.length > 0) {
    console.log(
      `[auto-pull] Remote has new commits but local has uncommitted changes. Skipping pull.`
    );
    return;
  }

  // Check if local is ahead - if so, skip (would need to push first)
  const ahead = safeRun(`git rev-list --count origin/${BRANCH}..${BRANCH}`);
  if (ahead && parseInt(ahead, 10) > 0) {
    console.log(
      `[auto-pull] Local is ahead of remote by ${ahead} commit(s). Skipping pull.`
    );
    return;
  }

  console.log(`[auto-pull] New commits on origin/${BRANCH}, pulling…`);
  try {
    const out = run(`git pull --ff-only origin ${BRANCH}`);
    console.log(`[auto-pull] ${out.split("\n").pop()}`);
  } catch (err) {
    console.error(`[auto-pull] Pull failed:`, err.message);
  }
}

console.log(`[auto-pull] Watching origin/${BRANCH} every ${INTERVAL_MS / 1000}s…`);
setInterval(tick, INTERVAL_MS);
tick();
