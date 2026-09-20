import assert from 'node:assert';
import { BrazilCheckoutFactory } from './BrazilCheckoutFactory';
import { Checkout } from './Checkout';
import { UsaCheckoutFactory } from './UsaCheckoutFactory';

const brazil = new Checkout(new BrazilCheckoutFactory()).finish('ord-1', 10000);
const usa = new Checkout(new UsaCheckoutFactory()).finish('ord-1', 10000);

// Cada fábrica entrega uma família coerente: imposto e documento da mesma região.
assert.strictEqual(brazil.taxInCents, 1800);
assert.ok(brazil.invoiceNumber.startsWith('NFe-'), 'o Brasil deveria emitir NF-e');
assert.strictEqual(brazil.currency, 'BRL');

assert.strictEqual(usa.taxInCents, 700);
assert.ok(usa.invoiceNumber.startsWith('INV-'), 'os EUA deveriam emitir invoice');
assert.strictEqual(usa.currency, 'USD');

// O cliente é o mesmo nos dois casos — só a fábrica mudou.
assert.strictEqual(brazil.amountInCents, usa.amountInCents);

console.log('OK: trocar a fábrica troca imposto e nota fiscal juntos, sem tocar no Checkout');
