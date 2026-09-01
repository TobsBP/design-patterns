import { IOrderObserver, OrderConfirmedEvent } from './IOrderObserver';

export class AnalyticsObserver implements IOrderObserver {
  readonly name = 'analytics';

  onOrderConfirmed({ orderId, amountInCents }: OrderConfirmedEvent): void {
    console.log(`[Analytics] evento purchase — pedido=${orderId} valor=${amountInCents}`);
  }
}
