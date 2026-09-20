import { Order } from './Order';

// Estado: sabe o que é possível fazer enquanto o pedido está nele.
// Cada método decide entre agir (e trocar o estado do pedido) ou recusar.
export interface IOrderState {
  readonly name: string;
  pay(order: Order): void;
  ship(order: Order): void;
  deliver(order: Order): void;
  cancel(order: Order): void;
}
