import { ITaxCalculator } from './ITaxCalculator';

export class BrazilTaxCalculator implements ITaxCalculator {
  readonly label = 'ICMS (18%)';

  taxFor(amountInCents: number): number {
    return Math.round(amountInCents * 0.18);
  }
}
