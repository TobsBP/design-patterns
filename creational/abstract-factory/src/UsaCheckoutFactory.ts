import { ICheckoutFactory } from './ICheckoutFactory';
import { IInvoiceIssuer } from './IInvoiceIssuer';
import { ITaxCalculator } from './ITaxCalculator';
import { UsaInvoiceIssuer } from './UsaInvoiceIssuer';
import { UsaTaxCalculator } from './UsaTaxCalculator';

export class UsaCheckoutFactory implements ICheckoutFactory {
  readonly region = 'Estados Unidos';
  readonly currency = 'USD';

  createTaxCalculator(): ITaxCalculator {
    return new UsaTaxCalculator();
  }

  createInvoiceIssuer(): IInvoiceIssuer {
    return new UsaInvoiceIssuer();
  }
}
