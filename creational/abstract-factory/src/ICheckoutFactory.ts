import { IInvoiceIssuer } from './IInvoiceIssuer';
import { ITaxCalculator } from './ITaxCalculator';

// Fábrica abstrata: quem a usa recebe uma família inteira e consistente.
// Não há como pedir o imposto brasileiro e a nota fiscal americana.
export interface ICheckoutFactory {
  readonly region: string;
  readonly currency: string;
  createTaxCalculator(): ITaxCalculator;
  createInvoiceIssuer(): IInvoiceIssuer;
}
