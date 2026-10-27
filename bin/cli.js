#!/usr/bin/env node
import { mkdir, copyFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SKILL_NAME = "reglas-generales";

const skillSource = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "skills.md");

const targets = [
  path.join(process.cwd(), ".claude", "skills", SKILL_NAME, "SKILL.md"),
  path.join(process.cwd(), "skills", SKILL_NAME, "SKILL.md"),
];

for (const target of targets) {
  await mkdir(path.dirname(target), { recursive: true });
  await copyFile(skillSource, target);
  console.log(`✓ Instalado: ${path.relative(process.cwd(), target)}`);
}

console.log("\nSkill 'reglas-generales' instalada. Sugerencia: referencia el archivo en tu AGENTS.md si tu agente no la detecta automáticamente.");
