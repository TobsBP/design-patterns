import { IPaymentProcessor } from './IPaymentProcessor';

export class StripeProcessor implements IPaymentProcessor {
  pay(amountInCents: number, currency: string): void {
    console.log(`[Stripe] Cobrando ${amountInCents} centavos em ${currency}`);
  }
}
