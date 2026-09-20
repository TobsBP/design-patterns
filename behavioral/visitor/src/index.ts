import { DigitalProduct } from './DigitalProduct';
import { GiftCard } from './GiftCard';
import { InvoiceLineVisitor } from './InvoiceLineVisitor';
import { Order } from './Order';
import { PhysicalProduct } from './PhysicalProduct';
import { ShippingCostVisitor } from './ShippingCostVisitor';
import { TaxVisitor } from './TaxVisitor';

const order = new Order([
  new PhysicalProduct('Livro DDD', 12900, 900),
  new DigitalProduct('Curso de TypeScript', 19900, 'https://loja.exemplo/curso'),
  new GiftCard('Vale-presente R$ 100', 10000, 'amigo@exemplo.com'),
]);

console.log('=== nota fiscal ===');
for (const line of order.accept(new InvoiceLineVisitor())) console.log(`  ${line}`);

const shipping = order.total(new ShippingCostVisitor());
const tax = order.total(new TaxVisitor());

console.log(`\nFrete:   R$ ${(shipping / 100).toFixed(2)}`);
console.log(`Imposto: R$ ${(tax / 100).toFixed(2)}`);

// Três operações bem diferentes sobre os mesmos três tipos de item,
// e nenhuma linha de PhysicalProduct, DigitalProduct ou GiftCard precisou mudar.
