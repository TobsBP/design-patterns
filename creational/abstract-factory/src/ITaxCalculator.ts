// Produto abstrato: cada região calcula o imposto do seu jeito.
export interface ITaxCalculator {
  readonly label: string;
  taxFor(amountInCents: number): number;
}
