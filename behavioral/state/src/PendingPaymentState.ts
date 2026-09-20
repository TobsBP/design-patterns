import { CancelledState } from './CancelledState';
import { Order } from './Order';
import { OrderState } from './OrderState';
import { PaidState } from './PaidState';

export class PendingPaymentState extends OrderState {
  readonly name = 'aguardando pagamento';

  pay(order: Order): void {
    order.transitionTo(new PaidState());
  }

  cancel(order: Order): void {
    order.transitionTo(new CancelledState());
  }
}
