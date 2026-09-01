import assert from 'node:assert';
import { OrderFacade } from './OrderFacade';
import { InventoryService } from './InventoryService';
import { PaymentService } from './PaymentService';

// Pagamento falhando deve devolver o item ao estoque (compensação da facade).
const inventory = new InventoryService();
const payment = new PaymentService();
payment.charge = () => { throw new Error('cartão recusado'); };

const orders = new OrderFacade(inventory, payment);
const order = { customerId: 'c1', sku: 'livro-ddd', quantity: 1, amountInCents: 100, address: 'x' };

assert.throws(() => orders.placeOrder(order), /cartão recusado/);
assert.ok(inventory.isAvailable('livro-ddd', 3), 'estoque deveria ter voltado ao valor original');
assert.throws(() => orders.placeOrder({ ...order, sku: 'teclado-hhkb' }), /Sem estoque/);

console.log('OK: facade desfaz a reserva quando o pagamento falha');
