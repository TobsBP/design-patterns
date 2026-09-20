import { IInvoiceIssuer } from './IInvoiceIssuer';

export class BrazilInvoiceIssuer implements IInvoiceIssuer {
  issue(orderId: string, amountInCents: number, taxInCents: number): string {
    const number = `NFe-${orderId.toUpperCase()}`;
    console.log(`[NF-e] ${number} — total R$ ${(amountInCents / 100).toFixed(2)}, ICMS R$ ${(taxInCents / 100).toFixed(2)}`);
    return number;
  }
}
