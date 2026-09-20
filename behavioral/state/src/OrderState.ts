import { IOrderState } from './IOrderState';
import { Order } from './Order';

// Base: por padrão tudo é recusado. Cada estado libera só o que faz sentido nele,
// então uma transição nova nunca fica permitida por esquecimento.
export abstract class OrderState implements IOrderState {
  abstract readonly name: string;

  pay(order: Order): void {
    this.refuse(order, 'pagar');
  }

  ship(order: Order): void {
    this.refuse(order, 'enviar');
  }

  deliver(order: Order): void {
    this.refuse(order, 'entregar');
  }

  cancel(order: Order): void {
    this.refuse(order, 'cancelar');
  }

  protected refuse(order: Order, action: string): void {
    console.log(`[Order ${order.id}] não dá para ${action}: o pedido está ${this.name}`);
  }
}
