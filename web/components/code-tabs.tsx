"use client";

import { useState } from "react";

export type CodeFile = { name: string; html: string };

export function CodeTabs({ files }: { files: CodeFile[] }) {
  const [current, setCurrent] = useState(0);
  const file = files[current];

  return (
    <div>
      <div
        role="tablist"
        aria-label="Arquivos do padrão"
        className="-mx-1 flex gap-1 overflow-x-auto pb-3"
      >
        {files.map((item, index) => {
          const active = index === current;
          return (
            <button
              key={item.name}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setCurrent(index)}
              className={`shrink-0 rounded-md border px-3 py-1.5 font-mono text-xs transition-[color,background-color,border-color,transform] duration-150 ease-[var(--ease-out)] active:scale-[0.97] ${
                active
                  ? "border-[var(--family)] bg-[color-mix(in_oklab,var(--family)_14%,transparent)] text-fg"
                  : "border-transparent text-fg-faint hover:bg-ink-850 hover:text-fg-dim"
              }`}
            >
              {item.name.replace(/^(src|lib)\//, "")}
            </button>
          );
        })}
      </div>

      <div
        key={file.name}
        role="tabpanel"
        className="code-block animate-panel"
        dangerouslySetInnerHTML={{ __html: file.html }}
      />
    </div>
  );
}
