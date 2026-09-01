import { IOrderObserver, OrderConfirmedEvent } from './IOrderObserver';

export class EmailObserver implements IOrderObserver {
  readonly name = 'email';

  onOrderConfirmed({ orderId, customerId }: OrderConfirmedEvent): void {
    console.log(`[Email] Confirmação do pedido ${orderId} enviada para ${customerId}`);
  }
}
