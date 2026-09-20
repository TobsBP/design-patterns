import { IInvoiceIssuer } from './IInvoiceIssuer';

export class UsaInvoiceIssuer implements IInvoiceIssuer {
  issue(orderId: string, amountInCents: number, taxInCents: number): string {
    const number = `INV-${orderId.toUpperCase()}`;
    console.log(`[Invoice] ${number} — total US$ ${(amountInCents / 100).toFixed(2)}, sales tax US$ ${(taxInCents / 100).toFixed(2)}`);
    return number;
  }
}
