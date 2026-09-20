"use client";

import { DEMOS } from "./demos";

const DEFAULT_NOTE =
  "Os controles abaixo executam as classes deste diretório, aqui no navegador. A saída é o que o código escreve no console.";

const NOTES: Record<string, string> = {
  singleton:
    "A conexão Supabase do código real não abre no navegador, então esta demonstração usa uma cópia da mesma mecânica: construtor privado e getInstance com cache estático.",
};

export function PatternDemo({ slug }: { slug: string }) {
  const Demo = DEMOS[slug];
  if (!Demo) return null;

  return (
    <section className="mt-12">
      <h2 className="mb-4 font-display text-2xl font-semibold tracking-[-0.02em]">
        Rodando o padrão
      </h2>
      <p className="mb-5 max-w-[60ch] text-[0.9375rem] leading-relaxed text-fg-dim">
        {NOTES[slug] ?? DEFAULT_NOTE}
      </p>
      <Demo />
    </section>
  );
}
