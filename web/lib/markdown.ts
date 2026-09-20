import { Marked } from "marked";
import { codeToHtml } from "shiki";

const THEME = "vesper";

export async function highlight(code: string, lang = "ts") {
  return codeToHtml(code, { lang, theme: THEME });
}

/**
 * Os READMEs usam blocos sem linguagem para diagramas ASCII — esses saem como
 * <figure class="diagram">, não como código colorido.
 */
export async function renderMarkdown(md: string) {
  const marked = new Marked({ async: true, gfm: true });

  marked.use({
    async walkTokens(token) {
      if (token.type !== "code") return;
      const lang = token.lang?.trim();
      let html: string;

      if (lang === "mermaid") {
        // O desenho acontece no cliente; aqui só vai a fonte do diagrama.
        html = `<figure class="diagram" data-mermaid="${encodeURIComponent(token.text)}"><div class="diagram-canvas"></div></figure>`;
      } else if (lang) {
        html = await highlight(token.text, lang === "typescript" ? "ts" : lang);
      } else {
        html = `<figure class="diagram"><pre>${escapeHtml(token.text)}</pre></figure>`;
      }

      Object.assign(token, { type: "html", text: html, block: true });
    },
  });

  const html = (await marked.parse(md)) as string;
  return linkPatterns(html);
}

/** Os READMEs se referenciam por caminho de pasta; aqui isso vira rota do app. */
function linkPatterns(html: string) {
  return html.replace(
    /href="[^"]*?(creational|structural|behavioral)\/([a-z-]+)\/?(?:README)?\/?"/g,
    (_match, category, slug) => `href="/${category}/${slug}"`,
  );
}

function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
