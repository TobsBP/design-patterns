export interface OrderConfirmedEvent {
  orderId: string;
  customerId: string;
  amountInCents: number;
}

export interface IOrderObserver {
  readonly name: string;
  onOrderConfirmed(event: OrderConfirmedEvent): void;
}
