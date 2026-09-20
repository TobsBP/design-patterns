import { DeliveredState } from './DeliveredState';
import { Order } from './Order';
import { OrderState } from './OrderState';

export class ShippedState extends OrderState {
  readonly name = 'enviado';

  deliver(order: Order): void {
    order.transitionTo(new DeliveredState());
  }

  // Depois de despachado não dá para cancelar: o caminho é a devolução.
}
