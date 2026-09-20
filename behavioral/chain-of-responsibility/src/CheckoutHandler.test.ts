import assert from 'node:assert';
import { CartHandler } from './CartHandler';
import { CreditHandler } from './CreditHandler';
import { FraudHandler } from './FraudHandler';
import { CheckoutRequest } from './ICheckoutHandler';
import { StockHandler } from './StockHandler';

function buildChain() {
  const first = new CartHandler();
  first.setNext(new StockHandler()).setNext(new FraudHandler()).setNext(new CreditHandler());
  return first;
}

const base: CheckoutRequest = {
  customerId: 'cus-42',
  items: [{ sku: 'livro-ddd', quantity: 1 }],
  amountInCents: 24900,
  riskScore: 12,
  creditLimitInCents: 500000,
};

// Passando por todos, quem aprova é o último elo.
assert.deepStrictEqual(buildChain().handle(base), { approved: true, by: 'CreditHandler' });

// Cada elo barra o seu caso e a cadeia para ali.
assert.strictEqual(buildChain().handle({ ...base, items: [] }).by, 'CartHandler');
assert.strictEqual(
  buildChain().handle({ ...base, items: [{ sku: 'teclado-hhkb', quantity: 1 }] }).by,
  'StockHandler',
);
assert.strictEqual(buildChain().handle({ ...base, riskScore: 95 }).by, 'FraudHandler');
assert.strictEqual(buildChain().handle({ ...base, amountInCents: 900000 }).by, 'CreditHandler');

// O primeiro que barra interrompe: com carrinho vazio, o estoque nem é consultado.
const reachedStock: string[] = [];
class SpyStock extends StockHandler {
  handle(request: CheckoutRequest) {
    reachedStock.push(request.customerId);
    return super.handle(request);
  }
}
const spied = new CartHandler();
spied.setNext(new SpyStock()).setNext(new CreditHandler());
spied.handle({ ...base, items: [] });
assert.deepStrictEqual(reachedStock, [], 'o StockHandler não deveria ter sido chamado');

// A ordem é configuração: sem o elo de fraude, o risco alto passa.
const semFraude = new CartHandler();
semFraude.setNext(new StockHandler()).setNext(new CreditHandler());
assert.strictEqual(semFraude.handle({ ...base, riskScore: 95 }).approved, true);

console.log('OK: o primeiro elo que barra interrompe a cadeia, e a ordem é configuração');
