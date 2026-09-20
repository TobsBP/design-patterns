import { ICheckoutFactory } from './ICheckoutFactory';

export interface CheckoutSummary {
  region: string;
  currency: string;
  amountInCents: number;
  taxInCents: number;
  totalInCents: number;
  invoiceNumber: string;
}

// Cliente: trabalha só com a fábrica abstrata.
// Não sabe em que região está rodando nem quais classes concretas está usando.
export class Checkout {
  constructor(private readonly factory: ICheckoutFactory) {}

  finish(orderId: string, amountInCents: number): CheckoutSummary {
    const taxCalculator = this.factory.createTaxCalculator();
    const invoiceIssuer = this.factory.createInvoiceIssuer();

    const taxInCents = taxCalculator.taxFor(amountInCents);
    const totalInCents = amountInCents + taxInCents;
    const invoiceNumber = invoiceIssuer.issue(orderId, totalInCents, taxInCents);

    return {
      region: this.factory.region,
      currency: this.factory.currency,
      amountInCents,
      taxInCents,
      totalInCents,
      invoiceNumber,
    };
  }
}
