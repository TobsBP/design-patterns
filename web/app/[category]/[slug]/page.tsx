import Link from "next/link";
import { notFound } from "next/navigation";
import { CodeTabs } from "@/components/code-tabs";
import { MermaidDiagrams } from "@/components/mermaid";
import { PatternDemo } from "@/components/pattern-demo";
import { highlight, renderMarkdown } from "@/lib/markdown";
import { CATEGORIES, type Category, getCatalog, getPattern } from "@/lib/patterns";

export async function generateStaticParams() {
  const catalog = await getCatalog();
  return catalog
    .filter((p) => p.slug)
    .map((p) => ({ category: p.category, slug: p.slug as string }));
}

export async function generateMetadata({ params }: PageProps<"/[category]/[slug]">) {
  const { slug } = await params;
  const catalog = await getCatalog();
  const pattern = catalog.find((p) => p.slug === slug);
  return {
    title: pattern ? `${pattern.name} — padrões de projeto` : "Padrão não encontrado",
    description: pattern?.description,
  };
}

export default async function PatternPage({ params }: PageProps<"/[category]/[slug]">) {
  const { category, slug } = await params;
  if (!(category in CATEGORIES)) notFound();

  const data = await getPattern(category as Category, slug).catch(() => null);
  if (!data) notFound();

  const [doc, files] = await Promise.all([
    renderMarkdown(data.readme),
    Promise.all(
      data.files.map(async (file) => ({ name: file.name, html: await highlight(file.code) })),
    ),
  ]);

  const siblings = data.catalog.filter((p) => p.slug);
  const index = siblings.findIndex((p) => p.slug === slug);

  return (
    <div data-family={category} className="mx-auto w-full max-w-6xl px-6 pb-32 sm:px-10">
      <nav className="py-7">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-display text-sm text-fg-dim transition-colors hover:text-fg"
        >
          <span aria-hidden>←</span> Catálogo
        </Link>
        <span aria-hidden className="mx-2 text-fg-faint">
          /
        </span>
        <span className="font-display text-sm text-[var(--family)]">
          {CATEGORIES[category as Category].label}
        </span>
      </nav>

      <div className="grid gap-14 lg:grid-cols-[1fr_15rem] lg:gap-16">
        <main className="min-w-0 lg:order-1">
          <header className="border-b border-line pb-9">
            <h1 className="font-display text-[clamp(2.25rem,5vw,3.5rem)] font-extrabold leading-[1] tracking-[-0.04em]">
              {data.meta?.name ?? slug}
            </h1>
            {data.meta && (
              <p className="mt-5 max-w-[60ch] text-lg leading-relaxed text-fg-dim">
                {data.meta.description}
              </p>
            )}
          </header>

          <PatternDemo slug={slug} />

          <article className="doc mt-16" dangerouslySetInnerHTML={{ __html: doc }} />
          <MermaidDiagrams family={category} />

          {files.length > 0 && (
            <section className="mt-20">
              <h2 className="mb-5 font-display text-2xl font-semibold tracking-[-0.02em]">
                O código
              </h2>
              <CodeTabs files={files} />
            </section>
          )}

          <Neighbours previous={siblings[index - 1]} next={siblings[index + 1]} />
        </main>

        <aside className="lg:order-2">
          <nav className="lg:sticky lg:top-10">
            <h2 className="mb-4 font-display text-xs font-medium text-fg-faint">Outros padrões</h2>
            <ul className="space-y-0.5">
              {siblings.map((pattern) => {
                const active = pattern.slug === slug;
                return (
                  <li key={pattern.name} data-family={pattern.category}>
                    <Link
                      href={`/${pattern.category}/${pattern.slug}`}
                      aria-current={active ? "page" : undefined}
                      className={`flex items-center gap-2.5 rounded py-1.5 font-display text-sm transition-colors duration-150 ${
                        active ? "text-fg" : "text-fg-dim hover:text-fg"
                      }`}
                    >
                      <span
                        aria-hidden
                        className={`h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--family)] transition-opacity ${
                          active ? "opacity-100" : "opacity-45"
                        }`}
                      />
                      {pattern.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>
      </div>
    </div>
  );
}

function Neighbours({
  previous,
  next,
}: {
  previous?: { name: string; category: Category; slug: string | null };
  next?: { name: string; category: Category; slug: string | null };
}) {
  if (!previous && !next) return null;

  return (
    <nav className="mt-20 flex items-stretch justify-between gap-4 border-t border-line pt-6">
      {previous ? (
        <Link
          href={`/${previous.category}/${previous.slug}`}
          className="font-display text-fg-dim transition-colors hover:text-fg"
        >
          <span className="block text-xs text-fg-faint">Anterior</span>
          <span className="text-lg font-semibold tracking-[-0.02em]">{previous.name}</span>
        </Link>
      ) : (
        <span />
      )}
      {next && (
        <Link
          href={`/${next.category}/${next.slug}`}
          className="text-right font-display text-fg-dim transition-colors hover:text-fg"
        >
          <span className="block text-xs text-fg-faint">Próximo</span>
          <span className="text-lg font-semibold tracking-[-0.02em]">{next.name}</span>
        </Link>
      )}
    </nav>
  );
}
