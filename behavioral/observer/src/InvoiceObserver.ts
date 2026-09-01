import { IOrderObserver, OrderConfirmedEvent } from './IOrderObserver';

export class InvoiceObserver implements IOrderObserver {
  readonly name = 'nota-fiscal';

  onOrderConfirmed({ orderId, amountInCents }: OrderConfirmedEvent): void {
    console.log(`[Nota fiscal] Emitida para o pedido ${orderId} — R$ ${(amountInCents / 100).toFixed(2)}`);
  }
}
