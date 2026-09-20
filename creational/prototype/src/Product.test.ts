import assert from 'node:assert';
import { Product } from './Product';
import { ProductRegistry } from './ProductRegistry';

const registry = new ProductRegistry();
const original = new Product({
  name: 'Camiseta básica',
  priceInCents: 7900,
  specs: new Map([['tecido', 'algodão penteado']]),
  tags: ['vestuario'],
});
registry.register('camiseta', original);

const copy = registry.spawn('camiseta');
copy.name = 'Camiseta preta';
copy.priceInCents = 8900;
copy.specs.set('cor', 'preta');
copy.tags.push('promocao');

// A cópia é independente: mexer nela não vaza para o protótipo.
assert.strictEqual(original.name, 'Camiseta básica');
assert.strictEqual(original.priceInCents, 7900);
assert.strictEqual(original.specs.has('cor'), false, 'o Map do original foi compartilhado');
assert.deepStrictEqual(original.tags, ['vestuario'], 'o array do original foi compartilhado');

// E o clone realmente copiou o conteúdo, não só a casca.
assert.strictEqual(copy.specs.get('tecido'), 'algodão penteado');

assert.throws(() => registry.spawn('caneca'), /Protótipo não registrado/);

console.log('OK: o clone é independente do protótipo, inclusive nos campos aninhados');
