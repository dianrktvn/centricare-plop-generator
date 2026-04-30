#!/usr/bin/env node
import { execSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const plopfile = join(__dirname, "../plopfile.js");
const args = process.argv.slice(2).join(" ");

try {
  execSync(`npx plop --plopfile "${plopfile}" --dest "${process.cwd()}" ${args}`, { stdio: "inherit" });
} catch (error) {
  process.exit(1);
}
