import fs from "node:fs";
import path from "node:path";
import type { Case, Empresa, Proposta } from "./types";

const PROPOSTAS_DIR = path.join(process.cwd(), "data", "propostas");
const CASES_DIR = path.join(process.cwd(), "content", "cases");
const EMPRESA_PATH = path.join(process.cwd(), "content", "empresa.json");

export function listarSlugs(): string[] {
  if (!fs.existsSync(PROPOSTAS_DIR)) return [];
  return fs
    .readdirSync(PROPOSTAS_DIR)
    .filter((file) => file.endsWith(".json"))
    .map((file) => file.replace(/\.json$/, ""));
}

export function lerProposta(slug: string): Proposta | null {
  const file = path.join(PROPOSTAS_DIR, `${slug}.json`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf-8");
  return JSON.parse(raw) as Proposta;
}

export function lerCase(slug: string): Case | null {
  const file = path.join(CASES_DIR, `${slug}.json`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf-8");
  return JSON.parse(raw) as Case;
}

export function lerEmpresa(): Empresa {
  const raw = fs.readFileSync(EMPRESA_PATH, "utf-8");
  return JSON.parse(raw) as Empresa;
}
