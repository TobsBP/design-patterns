// Memento: guarda o estado do editor num pacote fechado.
// O histórico consegue segurar e devolver o snapshot, mas não consegue ler
// nem alterar o que tem dentro — só o TextEditor sabe abrir.
export class EditorSnapshot {
  constructor(
    private readonly content: string,
    private readonly cursor: number,
    readonly createdAt = new Date(),
  ) {}

  /** @internal usado só pelo TextEditor ao restaurar */
  getState(): { content: string; cursor: number } {
    return { content: this.content, cursor: this.cursor };
  }
}
