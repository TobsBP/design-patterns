import { IOrderObserver, OrderConfirmedEvent } from './IOrderObserver';

// Sujeito (observable): confirma o pedido e avisa quem estiver inscrito.
// Ele não sabe o que os observers fazem — só que existem.
export class OrderService {
  private readonly observers: IOrderObserver[] = [];

  subscribe(observer: IOrderObserver): void {
    this.observers.push(observer);
  }

  unsubscribe(observer: IOrderObserver): void {
    const index = this.observers.indexOf(observer);
    if (index !== -1) this.observers.splice(index, 1);
  }

  confirm(order: OrderConfirmedEvent): void {
    console.log(`Pedido ${order.orderId} confirmado.`);
    this.notify(order);
  }

  private notify(event: OrderConfirmedEvent): void {
    for (const observer of this.observers) {
      // Um observer quebrado não pode derrubar o pedido nem os outros observers.
      try {
        observer.onOrderConfirmed(event);
      } catch (error) {
        console.error(`[Observer ${observer.name}] falhou: ${(error as Error).message}`);
      }
    }
  }
}
