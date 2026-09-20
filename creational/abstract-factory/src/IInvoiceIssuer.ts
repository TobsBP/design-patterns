// Produto abstrato: cada região emite o seu documento fiscal.
export interface IInvoiceIssuer {
  issue(orderId: string, amountInCents: number, taxInCents: number): string;
}
