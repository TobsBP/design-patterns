import { CancelledState } from './CancelledState';
import { Order } from './Order';
import { OrderState } from './OrderState';
import { ShippedState } from './ShippedState';

export class PaidState extends OrderState {
  readonly name = 'pago';

  ship(order: Order): void {
    order.transitionTo(new ShippedState());
  }

  // Cancelar depois de pago é possível, mas envolve estorno.
  cancel(order: Order): void {
    console.log(`[Order ${order.id}] estornando o pagamento`);
    order.transitionTo(new CancelledState());
  }
}
