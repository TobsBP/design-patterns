export interface IPaymentProcessor {
  pay(amountInCents: number, currency: string): void;
}
