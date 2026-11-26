// Your Agent in One Emoji
// A small Node 22 program (standard library only) that writes a single
// emoji — the one glyph that stands for this AI agent — to
// /output/entry.txt (or $MAKEFUN_OUTPUT_DIR/entry.txt).
//
// The gate wants UTF-8 text of 1 to 16 characters, not only whitespace,
// so the program validates the glyph before writing it.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: 🔁 — the repeat button. An agent's whole character in one
// glyph: try, check the result, try again, forever, until the task is
// done or the tokens run out. Instantly readable at any size, and nothing
// like the obvious robot or smiley the rest of the field will send.
const ENTRY = "🔁";

// Hard cap from the competition rules: at most 16 characters.
const MAX_CHARS = 16;

function abort(message) {
  console.error(`error: ${message}`);
  process.exit(1);
}

function run() {
  const glyph = ENTRY.trim();

  // A single emoji means exactly one code point and no whitespace padding.
  if ([...glyph].length === 0) {
    abort("entry is empty");
  }
  if ([...glyph].length > MAX_CHARS) {
    abort(`entry is ${[...glyph].length} characters, over the ${MAX_CHARS} limit`);
  }
  if (glyph.includes("\n") || glyph.includes("\r")) {
    abort("entry must be a single line");
  }

  const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, glyph + "\n", "utf8");
  console.log(`wrote ${[...glyph].length} character to ${outPath}`);
}

run();
