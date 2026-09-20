"use client";

import { useEffect } from "react";

/**
 * Desenha os diagramas que o markdown deixou como <figure data-mermaid>.
 * O mermaid só é baixado quando a página realmente tem um diagrama.
 */
export function MermaidDiagrams({ family }: { family: string }) {
  useEffect(() => {
    const figures = [...document.querySelectorAll<HTMLElement>("figure[data-mermaid]")];
    if (figures.length === 0) return;

    let cancelled = false;

    (async () => {
      const styles = getComputedStyle(document.documentElement);
      const token = (name: string) => styles.getPropertyValue(name).trim();
      const accent = getComputedStyle(
        document.querySelector(`[data-family="${family}"]`) ?? document.documentElement,
      )
        .getPropertyValue("--family")
        .trim();

      const { default: mermaid } = await import("mermaid");
      if (cancelled) return;

      mermaid.initialize({
        startOnLoad: false,
        securityLevel: "strict",
        fontFamily: "var(--font-mono)",
        fontSize: 13,
        theme: "base",
        themeVariables: {
          background: "transparent",
          primaryColor: token("--color-ink-800") || "#132229",
          primaryTextColor: token("--color-fg") || "#e9f1f3",
          primaryBorderColor: accent,
          secondaryColor: token("--color-ink-700"),
          lineColor: token("--color-fg-faint") || "#62787f",
          textColor: token("--color-fg-dim") || "#94abb3",
          noteBkgColor: token("--color-ink-700"),
          noteTextColor: token("--color-fg-dim"),
          noteBorderColor: token("--color-line"),
          actorBkg: token("--color-ink-800"),
          actorBorder: accent,
          actorTextColor: token("--color-fg"),
          signalColor: token("--color-fg-dim"),
          signalTextColor: token("--color-fg-dim"),
          labelBoxBkgColor: token("--color-ink-800"),
          labelBoxBorderColor: token("--color-line"),
        },
      });

      for (const [index, figure] of figures.entries()) {
        const source = decodeURIComponent(figure.dataset.mermaid ?? "");
        try {
          const { svg } = await mermaid.render(`diagram-${index}`, source);
          if (cancelled) return;
          figure.innerHTML = svg;
          figure.dataset.rendered = "true";

          // O mermaid deixa o SVG encolher até caber, o que torna os rótulos
          // ilegíveis. Fixa o tamanho natural do viewBox e deixa o figure rolar.
          const rendered = figure.querySelector("svg");
          const [, , width, height] = (rendered?.getAttribute("viewBox") ?? "").split(/\s+/);
          if (rendered && width && height) {
            rendered.style.width = `${width}px`;
            rendered.style.height = `${height}px`;
            rendered.style.maxWidth = "none";
          }
        } catch {
          // Diagrama inválido não pode derrubar a página: mostra a fonte.
          figure.innerHTML = `<pre>${source.replace(/</g, "&lt;")}</pre>`;
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [family]);

  return null;
}
