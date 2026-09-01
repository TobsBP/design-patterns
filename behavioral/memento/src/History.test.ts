import assert from 'node:assert';
import { TextEditor } from './TextEditor';
import { History } from './History';

const editor = new TextEditor();
const history = new History(editor, 2); // limite baixo de propósito

history.backup();
editor.type('abc');
history.backup();
editor.type('def');

assert.strictEqual(editor.read(), 'abcdef');
assert.strictEqual(history.undo(), true);
assert.strictEqual(editor.read(), 'abc');
assert.strictEqual(history.undo(), true);
assert.strictEqual(editor.read(), '');

// Sem nada guardado, undo não quebra nem apaga o estado atual.
editor.type('xyz');
assert.strictEqual(history.undo(), false);
assert.strictEqual(editor.read(), 'xyz');

// O limite descarta o snapshot mais antigo em vez de crescer sem parar.
const limited = new History(editor, 2);
limited.backup();
limited.backup();
limited.backup();
assert.strictEqual(limited.size, 2);

console.log('OK: undo restaura, falha silenciosa sem histórico e o limite é respeitado');
