import assert from 'node:assert';
import { OrderService } from './OrderService';
import { IOrderObserver } from './IOrderObserver';

const calls: string[] = [];
const spy = (name: string): IOrderObserver => ({ name, onOrderConfirmed: () => calls.push(name) });

const broken: IOrderObserver = {
  name: 'quebrado',
  onOrderConfirmed: () => { throw new Error('serviço fora do ar'); },
};

const orders = new OrderService();
const analytics = spy('analytics');
orders.subscribe(spy('email'));
orders.subscribe(broken);
orders.subscribe(analytics);

const order = { orderId: 'ped-001', customerId: 'c1', amountInCents: 100 };
orders.confirm(order);
// Observer quebrado no meio não impede os seguintes de rodar.
assert.deepStrictEqual(calls, ['email', 'analytics']);

orders.unsubscribe(analytics);
orders.confirm(order);
assert.deepStrictEqual(calls, ['email', 'analytics', 'email']);

console.log('OK: notifica todos, sobrevive a observer quebrado e respeita unsubscribe');
