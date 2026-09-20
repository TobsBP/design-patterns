import assert from 'node:assert';
import { Order } from './Order';

// O caminho feliz atravessa os quatro estados.
const order = new Order('ord-1');
assert.strictEqual(order.status, 'aguardando pagamento');
order.pay();
assert.strictEqual(order.status, 'pago');
order.ship();
assert.strictEqual(order.status, 'enviado');
order.deliver();
assert.strictEqual(order.status, 'entregue');

// O que não faz sentido é recusado sem lançar e sem mudar nada.
order.pay();
order.cancel();
assert.strictEqual(order.status, 'entregue');
assert.deepStrictEqual(order.history, ['aguardando pagamento', 'pago', 'enviado', 'entregue']);

// Enviar sem pagar não passa: o estado inicial não libera ship.
const unpaid = new Order('ord-2');
unpaid.ship();
assert.strictEqual(unpaid.status, 'aguardando pagamento');

// Cancelar é permitido antes do pagamento e depois dele, mas não após o envio.
const cancelled = new Order('ord-3');
cancelled.cancel();
assert.strictEqual(cancelled.status, 'cancelado');

const refunded = new Order('ord-4');
refunded.pay();
refunded.cancel();
assert.strictEqual(refunded.status, 'cancelado');

const shipped = new Order('ord-5');
shipped.pay();
shipped.ship();
shipped.cancel();
assert.strictEqual(shipped.status, 'enviado', 'não deveria cancelar um pedido já despachado');

console.log('OK: cada estado libera só as transições que fazem sentido nele');
