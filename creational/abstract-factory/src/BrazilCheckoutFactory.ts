import { BrazilInvoiceIssuer } from './BrazilInvoiceIssuer';
import { BrazilTaxCalculator } from './BrazilTaxCalculator';
import { ICheckoutFactory } from './ICheckoutFactory';
import { IInvoiceIssuer } from './IInvoiceIssuer';
import { ITaxCalculator } from './ITaxCalculator';

export class BrazilCheckoutFactory implements ICheckoutFactory {
  readonly region = 'Brasil';
  readonly currency = 'BRL';

  createTaxCalculator(): ITaxCalculator {
    return new BrazilTaxCalculator();
  }

  createInvoiceIssuer(): IInvoiceIssuer {
    return new BrazilInvoiceIssuer();
  }
}
