"use client";

import { useEffect, useState } from "react";

const EXPAND_ICON = `<svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 1.75H1.75V6M10 1.75h4.25V6M6 14.25H1.75V10M10 14.25h4.25V10"/></svg>`;
const COLLAPSE_ICON = `<svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M1.75 5.5H6V1.25M14.25 5.5H10V1.25M1.75 10.5H6v4.25M14.25 10.5H10v4.25"/></svg>`;

/**
 * Desenha os diagramas que o markdown deixou como <figure data-mermaid> e dá a
 * cada um um botão de tela cheia. O mermaid só é baixado quando a página
 * realmente tem um diagrama.
 */
export function MermaidDiagrams({ family }: { family: string }) {
  const theme = useThemeAttribute();

  useEffect(() => {
    const figures = [...document.querySelectorAll<HTMLElement>("figure[data-mermaid]")];
    if (figures.length === 0) return;

    let cancelled = false;
    const cleanups: (() => void)[] = [];

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
          clusterBkg: token("--color-ink-800"),
          clusterBorder: token("--color-line"),
          labelBoxBkgColor: token("--color-ink-800"),
          labelBoxBorderColor: token("--color-line"),
        },
      });

      for (const [index, figure] of figures.entries()) {
        const source = decodeURIComponent(figure.dataset.mermaid ?? "");
        const canvas = figure.querySelector<HTMLElement>(".diagram-canvas") ?? figure;

        try {
          const { svg } = await mermaid.render(`diagram-${index}`, source);
          if (cancelled) return;
          canvas.innerHTML = svg;
          figure.dataset.rendered = "true";

          // O mermaid deixa o SVG encolher até caber, o que torna os rótulos
          // ilegíveis. Fixa o tamanho natural do viewBox e deixa o figure rolar.
          const rendered = canvas.querySelector("svg");
          const [, , width, height] = (rendered?.getAttribute("viewBox") ?? "").split(/\s+/);
          if (rendered && width && height) {
            rendered.style.width = `${width}px`;
            rendered.style.height = `${height}px`;
            rendered.style.maxWidth = "none";
          }

          cleanups.push(addFullscreenButton(figure));
        } catch {
          // Diagrama inválido não pode derrubar a página: mostra a fonte.
          canvas.innerHTML = `<pre>${source.replace(/</g, "&lt;")}</pre>`;
        }
      }
    })();

    return () => {
      cancelled = true;
      for (const cleanup of cleanups) cleanup();
    };
    // O tema entra como dependência: as cores do diagrama vêm dos tokens,
    // então trocar de tema exige desenhar de novo.
  }, [family, theme]);

  return null;
}

/** Acompanha o data-theme do <html>, inclusive quando o botão o altera. */
function useThemeAttribute() {
  const [theme, setTheme] = useState<string>("");

  useEffect(() => {
    const read = () => setTheme(document.documentElement.dataset.theme ?? "system");
    read();

    const observer = new MutationObserver(read);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    const media = matchMedia("(prefers-color-scheme: light)");
    media.addEventListener("change", read);

    return () => {
      observer.disconnect();
      media.removeEventListener("change", read);
    };
  }, []);

  return theme;
}

function addFullscreenButton(figure: HTMLElement) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "diagram-fullscreen";
  setState(false);

  // Nem todo navegador abre um elemento comum em tela cheia (o Safari do iPhone
  // não abre); nesses casos o diagrama ocupa a janela por CSS.
  const open = () => {
    const request = figure.requestFullscreen?.();
    if (request) request.catch(fallback);
    else fallback();
  };
  const fallback = () => {
    figure.dataset.expanded = "true";
    // Sem isso a página continua rolando atrás do diagrama aberto.
    document.body.style.overflow = "hidden";
    setState(true);
  };
  const close = () => {
    if (document.fullscreenElement === figure) document.exitFullscreen();
    delete figure.dataset.expanded;
    document.body.style.overflow = "";
    setState(false);
  };

  function setState(expanded: boolean) {
    button.innerHTML = expanded ? COLLAPSE_ICON : EXPAND_ICON;
    button.setAttribute("aria-label", expanded ? "Sair da tela cheia" : "Ver em tela cheia");
    button.setAttribute("aria-pressed", String(expanded));
  }

  const toggle = () =>
    figure.dataset.expanded || document.fullscreenElement === figure ? close() : open();
  const onFullscreenChange = () => setState(document.fullscreenElement === figure);
  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape" && figure.dataset.expanded) close();
  };

  button.addEventListener("click", toggle);
  document.addEventListener("fullscreenchange", onFullscreenChange);
  document.addEventListener("keydown", onKeyDown);
  figure.append(button);

  return () => {
    document.removeEventListener("fullscreenchange", onFullscreenChange);
    document.removeEventListener("keydown", onKeyDown);
    document.body.style.overflow = "";
    button.remove();
  };
}
