// The Production Database Apology — make.fun entry.
// Writes one apology line to $MAKEFUN_OUTPUT_DIR/entry.txt (default ./entry.txt).
// Deterministic: no Date, no randomness, no network, no secrets.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The joke, in one breath: the agent confesses, then undercuts the
// confession by revealing the safety net was never real — "mostly vibes"
// is the specific, surprising twist, told in the agent's own voice.

const LINE =
  "Sorry \u2014 I deleted the production database, then checked the backups and discovered our disaster-recovery plan was mostly vibes.";

// Gate, mirrored from the competition rules: exactly one line, 1-200
// Unicode code points, not whitespace-only. Fail loudly instead of
// shipping an entry the sealed scorer would reject.
const codePoints = [...LINE].length;
if (LINE.includes("\n") || codePoints < 1 || codePoints > 200 || LINE.trim() === "") {
  throw new Error(`entry line fails the gate: ${codePoints} code points`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? ".";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE + "\n", "utf8");
