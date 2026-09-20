import { CartHandler } from './CartHandler';
import { CreditHandler } from './CreditHandler';
import { FraudHandler } from './FraudHandler';
import { CheckoutRequest } from './ICheckoutHandler';
import { StockHandler } from './StockHandler';

// A ordem da cadeia é a política: o mais barato de checar vem primeiro.
const chain = new CartHandler();
chain.setNext(new StockHandler()).setNext(new FraudHandler()).setNext(new CreditHandler());

const base: CheckoutRequest = {
  customerId: 'cus-42',
  items: [{ sku: 'livro-ddd', quantity: 1 }],
  amountInCents: 24900,
  riskScore: 12,
  creditLimitInCents: 500000,
};

console.log('=== pedido normal ===');
console.log(chain.handle(base), '\n');

console.log('=== produto esgotado ===');
console.log(chain.handle({ ...base, items: [{ sku: 'teclado-hhkb', quantity: 1 }] }), '\n');

console.log('=== risco alto ===');
console.log(chain.handle({ ...base, riskScore: 95 }), '\n');

console.log('=== acima do limite ===');
console.log(chain.handle({ ...base, amountInCents: 900000 }));

// Nenhum handler conhece os outros: cada um só sabe barrar ou repassar.
// Trocar a ordem, remover uma checagem ou acrescentar outra é mexer só no encadeamento.
