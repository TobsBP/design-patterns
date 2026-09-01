import { IPaymentProcessor } from './IPaymentProcessor';
import { LegacyPaypalGateway } from './LegacyPaypalGateway';

const CURRENCY_CODES: Record<string, number> = { BRL: 986, USD: 840, EUR: 978 };

export class PaypalAdapter implements IPaymentProcessor {
  constructor(private readonly gateway = new LegacyPaypalGateway()) {}

  pay(amountInCents: number, currency: string): void {
    const code = CURRENCY_CODES[currency];
    if (code === undefined) throw new Error(`Moeda não suportada pelo PayPal: ${currency}`);

    // Traduz a chamada: centavos (number) -> string decimal, sigla -> código ISO numérico
    const value = (amountInCents / 100).toFixed(2);
    this.gateway.sendPayment(value, code);
  }
}
