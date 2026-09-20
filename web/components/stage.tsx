"use client";

import { type ReactNode, useState } from "react";

export type LogLine = { kind: "log" | "error"; text: string };
export type Run = { logs: LogLine[]; result?: string; failed?: string };

/** Roda o código real do repositório e recolhe o que ele escreve no console. */
// biome-ignore lint/suspicious/noConfusingVoidType: a demo pode devolver um resumo ou nada
export function capture(fn: () => string | void): Run {
  const logs: LogLine[] = [];
  const original = { log: console.log, error: console.error };
  const push =
    (kind: LogLine["kind"]) =>
    (...args: unknown[]) =>
      logs.push({ kind, text: args.map(String).join(" ") });

  console.log = push("log");
  console.error = push("error");
  try {
    const result = fn();
    return { logs, result: result ?? undefined };
  } catch (error) {
    return { logs, failed: (error as Error).message };
  } finally {
    console.log = original.log;
    console.error = original.error;
  }
}

export function Stage({ controls, run }: { controls: ReactNode; run: Run | null }) {
  return (
    <div className="overflow-hidden rounded-lg border border-line bg-ink-850">
      <div className="flex flex-wrap items-end gap-x-6 gap-y-4 border-b border-line-soft p-5">
        {controls}
      </div>
      <Output run={run} />
    </div>
  );
}

function Output({ run }: { run: Run | null }) {
  if (!run) {
    return (
      <p className="p-5 font-display text-sm text-fg-faint">
        Use os controles acima para executar o padrão.
      </p>
    );
  }

  return (
    <div
      role="log"
      aria-live="polite"
      className="space-y-1.5 p-5 font-mono text-[0.8125rem] leading-relaxed"
    >
      {run.logs.map((line, i) => (
        <p
          // biome-ignore lint/suspicious/noArrayIndexKey: a saída de uma execução não reordena
          key={i}
          className={`animate-line whitespace-pre-wrap ${line.kind === "error" ? "text-[#f0806c]" : "text-fg-dim"}`}
          style={{ animationDelay: `${Math.min(i, 8) * 45}ms` }}
        >
          <span aria-hidden className="mr-2 text-[var(--family)]">
            ›
          </span>
          {line.text}
        </p>
      ))}
      {run.failed && (
        <p className="animate-line pt-2 text-[#f0806c]">
          <span aria-hidden className="mr-2">
            ✕
          </span>
          {run.failed}
        </p>
      )}
      {run.result && (
        <p className="animate-line whitespace-pre-wrap pt-3 text-fg">
          <span aria-hidden className="mr-2 text-[var(--family)]">
            =
          </span>
          {run.result}
        </p>
      )}
      {!run.logs.length && !run.result && !run.failed && (
        <p className="text-fg-faint">Sem saída.</p>
      )}
    </div>
  );
}

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="font-display text-xs font-medium text-fg-faint">{label}</span>
      {children}
    </div>
  );
}

/** Grupo de opções exclusivas — o indicador ativo é a cor da família. */
export function Choice<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <Field label={label}>
      <div className="flex flex-wrap gap-1.5">
        {options.map((option) => {
          const active = option.value === value;
          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(option.value)}
              className={`rounded-md border px-3 py-1.5 font-display text-sm transition-[color,background-color,border-color,transform] duration-150 ease-[var(--ease-out)] active:scale-[0.97] ${
                active
                  ? "border-[var(--family)] bg-[color-mix(in_oklab,var(--family)_16%,transparent)] text-fg"
                  : "border-line text-fg-dim hover:border-fg-faint hover:text-fg"
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </Field>
  );
}

export function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer select-none items-center gap-2.5 font-display text-sm text-fg-dim transition-colors hover:text-fg">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="peer sr-only"
      />
      <span
        aria-hidden
        className="grid h-4 w-4 place-items-center rounded border border-line text-[10px] text-ink-900 transition-[background-color,border-color] duration-150 peer-checked:border-[var(--family)] peer-checked:bg-[var(--family)]"
      >
        <span className="opacity-0 peer-checked:opacity-100">✓</span>
      </span>
      {label}
    </label>
  );
}

export function Action({
  children,
  onClick,
  tone = "primary",
}: {
  children: ReactNode;
  onClick: () => void;
  tone?: "primary" | "ghost";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-md px-4 py-2 font-display text-sm font-medium transition-[transform,background-color,border-color,color] duration-150 ease-[var(--ease-out)] active:scale-[0.97] ${
        tone === "primary"
          ? "bg-[var(--family)] text-ink-900 hover:brightness-110"
          : "border border-line text-fg-dim hover:border-fg-faint hover:text-fg"
      }`}
    >
      {children}
    </button>
  );
}

export function useRun() {
  return useState<Run | null>(null);
}
