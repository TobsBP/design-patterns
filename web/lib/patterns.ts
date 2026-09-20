import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

export const REPO = path.join(process.cwd(), "..");

export type Category = "creational" | "structural" | "behavioral";

export type Pattern = {
  name: string;
  description: string;
  category: Category;
  /** slug da pasta, quando o padrão já foi implementado */
  slug: string | null;
};

export const CATEGORIES: Record<Category, { label: string; blurb: string }> = {
  creational: {
    label: "Criacionais",
    blurb: "Como os objetos nascem: criação flexível, sem acoplar quem usa a quem constrói.",
  },
  structural: {
    label: "Estruturais",
    blurb: "Como os objetos se encaixam: composição em estruturas maiores que continuam flexíveis.",
  },
  behavioral: {
    label: "Comportamentais",
    blurb: "Como os objetos conversam: responsabilidades e comunicação entre eles.",
  },
};

const SECTIONS: [Category, string][] = [
  ["creational", "Padrões Criacionais"],
  ["structural", "Padrões Estruturais"],
  ["behavioral", "Padrões Comportamentais"],
];

const LINE = /^- \[([ x])\] (?:\[([^\]]+)\]\(([^)]+)\)|([^—]+?))\s*—\s*(.+)$/;

/** Lê o catálogo do README da raiz — ele já é a fonte da ordem, dos nomes e do que falta. */
export async function getCatalog(): Promise<Pattern[]> {
  const readme = await readFile(path.join(/*turbopackIgnore: true*/ REPO, "README.md"), "utf8");
  const patterns: Pattern[] = [];

  for (const [category, heading] of SECTIONS) {
    const body = readme.split(`## ${heading}`)[1]?.split("\n---")[0] ?? "";
    for (const line of body.split("\n")) {
      const m = LINE.exec(line.trim());
      if (!m) continue;
      const [, done, linked, href, plain, description] = m;
      const slug =
        done === "x" && href
          ? (href
              .replace(/\/?(README)?\/?$/, "")
              .split("/")
              .pop() ?? null)
          : null;
      patterns.push({
        name: (linked ?? plain).trim(),
        description: description.trim(),
        category,
        slug,
      });
    }
  }
  return patterns;
}

export async function getPattern(category: Category, slug: string) {
  const dir = path.join(/*turbopackIgnore: true*/ REPO, category, slug);
  const readme = await readFile(path.join(/*turbopackIgnore: true*/ dir, "README.md"), "utf8");
  const files = await sourceFiles(dir);
  const catalog = await getCatalog();
  const meta = catalog.find((p) => p.slug === slug && p.category === category);
  return { readme, files, meta, catalog };
}

async function sourceFiles(dir: string) {
  const out: { name: string; code: string }[] = [];
  for (const sub of ["src", "lib"]) {
    let entries: string[];
    try {
      entries = await readdir(path.join(/*turbopackIgnore: true*/ dir, sub));
    } catch {
      continue;
    }
    for (const file of entries.filter((f) => f.endsWith(".ts")).sort(byRole)) {
      out.push({
        name: `${sub}/${file}`,
        code: await readFile(path.join(/*turbopackIgnore: true*/ dir, sub, file), "utf8"),
      });
    }
  }
  return out;
}

/** interface primeiro, exemplo de uso e testes por último — a ordem em que se lê o padrão. */
function byRole(a: string, b: string) {
  const rank = (f: string) =>
    /^I[A-Z]/.test(f) ? 0 : f.endsWith(".test.ts") ? 3 : f === "index.ts" ? 2 : 1;
  return rank(a) - rank(b) || a.localeCompare(b);
}
