import Link from "next/link";
import { CATEGORIES, type Category, getCatalog, type Pattern } from "@/lib/patterns";

export default async function Home() {
  const catalog = await getCatalog();
  const ready = catalog.filter((p) => p.slug).length;

  return (
    <main className="mx-auto w-full max-w-5xl px-6 pb-32 pt-20 sm:px-10 lg:pt-28">
      <header className="mb-20 max-w-3xl">
        <h1 className="font-display text-[clamp(2.75rem,7vw,5rem)] font-extrabold leading-[0.95] tracking-[-0.045em]">
          Padrões de projeto,
          <br />
          com o código do lado.
        </h1>
        <p className="mt-7 max-w-[60ch] text-lg leading-relaxed text-fg-dim">
          Vinte e dois padrões do catálogo do Refactoring Guru, implementados em TypeScript neste
          repositório. Cada um traz a explicação, os arquivos que o compõem e uma demonstração que
          roda aqui no navegador, usando as mesmas classes do código.
        </p>
        <p className="mt-6 font-display text-sm text-fg-faint">
          {ready} de {catalog.length} implementados
        </p>
      </header>

      <div className="space-y-24">
        {(Object.keys(CATEGORIES) as Category[]).map((category) => (
          <Family
            key={category}
            category={category}
            patterns={catalog.filter((p) => p.category === category)}
          />
        ))}
      </div>
    </main>
  );
}

function Family({ category, patterns }: { category: Category; patterns: Pattern[] }) {
  const { label, blurb } = CATEGORIES[category];

  return (
    <section data-family={category}>
      <div className="mb-8 flex flex-col gap-2 border-b border-line pb-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
        <h2 className="font-display text-2xl font-semibold tracking-[-0.02em] text-[var(--family)]">
          {label}
        </h2>
        <p className="max-w-[52ch] text-[0.9375rem] leading-snug text-fg-dim sm:text-right">
          {blurb}
        </p>
      </div>

      <ul className="stagger">
        {patterns.map((pattern) => (
          <li key={pattern.name}>
            <Row pattern={pattern} />
          </li>
        ))}
      </ul>
    </section>
  );
}

function Row({ pattern }: { pattern: Pattern }) {
  const body = (
    <>
      <span className="font-display text-xl font-semibold tracking-[-0.02em] sm:w-56 sm:shrink-0">
        {pattern.name}
      </span>
      <span className="text-[0.9375rem] leading-snug text-fg-dim">{pattern.description}</span>
    </>
  );

  if (!pattern.slug) {
    return (
      <div className="flex flex-col gap-1.5 border-b border-line-soft py-4 text-fg-faint sm:flex-row sm:items-baseline sm:gap-8">
        <span className="font-display text-xl font-medium tracking-[-0.02em] sm:w-56 sm:shrink-0">
          {pattern.name}
        </span>
        <span className="text-[0.9375rem] leading-snug">{pattern.description}</span>
        <span className="font-display text-xs text-fg-faint sm:ml-auto sm:shrink-0">
          a implementar
        </span>
      </div>
    );
  }

  return (
    <Link
      href={`/${pattern.category}/${pattern.slug}`}
      className="group relative flex flex-col gap-1.5 border-b border-line-soft py-4 transition-[padding,background-color] duration-200 ease-[var(--ease-out)] hover:bg-ink-850 sm:flex-row sm:items-baseline sm:gap-8 sm:hover:pl-4 active:scale-[0.995]"
    >
      <span
        aria-hidden
        className="absolute left-0 top-0 h-full w-px scale-y-0 bg-[var(--family)] transition-transform duration-200 ease-[var(--ease-out)] group-hover:scale-y-100"
      />
      {body}
      <svg
        aria-hidden
        viewBox="0 0 14 14"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-3.5 w-3.5 shrink-0 text-[var(--family)] opacity-0 transition-[opacity,transform] duration-200 ease-[var(--ease-out)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100 sm:ml-auto"
      >
        <path d="M4 10 10 4M4.75 4H10v5.25" />
      </svg>
    </Link>
  );
}
