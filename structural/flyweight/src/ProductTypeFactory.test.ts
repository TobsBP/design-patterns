import assert from 'node:assert';
import { ProductTypeFactory } from './ProductTypeFactory';
import { Shipment } from './Shipment';

const factory = new ProductTypeFactory();
const book = () => factory.get('livro-ddd', 'Domain-Driven Design', 900, '23x16x4cm');

// Pedir o mesmo sku duas vezes devolve o MESMO objeto, não uma cópia igual.
assert.strictEqual(book(), book());

for (let i = 0; i < 5000; i += 1) {
  factory.get(i % 2 ? 'livro-ddd' : 'mousepad', 'Produto', 100, '1x1x1cm');
}

assert.strictEqual(factory.size, 2, 'só deveriam existir dois flyweights');
assert.strictEqual(factory.instancesCreated, 2, 'nenhuma instância a mais deveria ter sido criada');

// O estado extrínseco continua por envio: o flyweight compartilhado não o guarda.
const a = new Shipment(book(), 'ord-1', 2, 'Rua A').printLabel();
const b = new Shipment(book(), 'ord-2', 5, 'Rua B').printLabel();

assert.ok(a.includes('ord-1') && a.includes('2x') && a.includes('Rua A'));
assert.ok(b.includes('ord-2') && b.includes('5x') && b.includes('Rua B'));
assert.notStrictEqual(a, b);

console.log('OK: um flyweight por sku, com o estado que varia ficando fora dele');
