import assert from 'node:assert';
import { DigitalProduct } from './DigitalProduct';
import { GiftCard } from './GiftCard';
import { InvoiceLineVisitor } from './InvoiceLineVisitor';
import { Order } from './Order';
import { PhysicalProduct } from './PhysicalProduct';
import { ShippingCostVisitor } from './ShippingCostVisitor';
import { TaxVisitor } from './TaxVisitor';

const book = new PhysicalProduct('Livro DDD', 12900, 900);
const course = new DigitalProduct('Curso de TS', 19900, 'https://loja.exemplo/curso');
const card = new GiftCard('Vale R$ 100', 10000, 'amigo@exemplo.com');
const order = new Order([book, course, card]);

// O double dispatch leva cada item ao método certo do visitante.
const shipping = new ShippingCostVisitor();
assert.strictEqual(book.accept(shipping), 1500 + 1080);
assert.strictEqual(course.accept(shipping), 0);
assert.strictEqual(card.accept(shipping), 0);

// Outro visitante, mesmos itens, regras totalmente diferentes.
const tax = new TaxVisitor();
assert.strictEqual(book.accept(tax), 2322);
assert.strictEqual(course.accept(tax), 995);
assert.strictEqual(card.accept(tax), 0);

// O visitante define o tipo de retorno: aqui texto, não número.
const lines = order.accept(new InvoiceLineVisitor());
assert.strictEqual(lines.length, 3);
assert.match(lines[1], /download: https:\/\/loja\.exemplo\/curso/);

// A coleção soma sem saber o que está sendo somado.
assert.strictEqual(order.total(shipping), 2580);
assert.strictEqual(order.total(tax), 3317);

console.log('OK: cada visitante é uma operação nova sem tocar nas classes dos itens');
