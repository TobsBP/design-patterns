import { EditorSnapshot } from './EditorSnapshot';

// Originador: dono do estado. Sabe tirar uma foto dele e voltar para uma foto antiga.
export class TextEditor {
  private content = '';
  private cursor = 0;

  type(text: string): void {
    this.content = this.content.slice(0, this.cursor) + text + this.content.slice(this.cursor);
    this.cursor += text.length;
  }

  backspace(count: number): void {
    const from = Math.max(0, this.cursor - count);
    this.content = this.content.slice(0, from) + this.content.slice(this.cursor);
    this.cursor = from;
  }

  read(): string {
    return this.content;
  }

  save(): EditorSnapshot {
    return new EditorSnapshot(this.content, this.cursor);
  }

  restore(snapshot: EditorSnapshot): void {
    const { content, cursor } = snapshot.getState();
    this.content = content;
    this.cursor = cursor;
  }
}
