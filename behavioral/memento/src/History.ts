import { EditorSnapshot } from './EditorSnapshot';
import { TextEditor } from './TextEditor';

// Caretaker: guarda os snapshots e decide QUANDO restaurar.
// Não sabe (nem precisa saber) o que tem dentro de cada um.
export class History {
  private readonly snapshots: EditorSnapshot[] = [];

  constructor(private readonly editor: TextEditor, private readonly limit = 50) {}

  backup(): void {
    this.snapshots.push(this.editor.save());
    if (this.snapshots.length > this.limit) this.snapshots.shift();
  }

  undo(): boolean {
    const snapshot = this.snapshots.pop();
    if (!snapshot) return false;

    this.editor.restore(snapshot);
    return true;
  }

  get size(): number {
    return this.snapshots.length;
  }
}
