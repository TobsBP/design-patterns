import { TextEditor } from './TextEditor';
import { History } from './History';

const editor = new TextEditor();
const history = new History(editor);

history.backup();
editor.type('Padrões de projeto');
console.log(`Digitou: "${editor.read()}"`);

history.backup();
editor.type(' são chatos');
console.log(`Digitou: "${editor.read()}"`);

history.backup();
editor.backspace(11);
editor.type(' são úteis');
console.log(`Corrigiu: "${editor.read()}"`);

// Arrependeu-se das duas últimas edições.
history.undo();
console.log(`Undo:    "${editor.read()}"`);

history.undo();
console.log(`Undo:    "${editor.read()}"`);

// O histórico segurou os snapshots o tempo todo sem nunca ler o conteúdo do editor:
// `content` e `cursor` continuam privados dentro do TextEditor.
