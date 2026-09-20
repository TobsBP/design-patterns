import { ITaxCalculator } from './ITaxCalculator';

export class UsaTaxCalculator implements ITaxCalculator {
  readonly label = 'Sales tax (7%)';

  taxFor(amountInCents: number): number {
    return Math.round(amountInCents * 0.07);
  }
}
