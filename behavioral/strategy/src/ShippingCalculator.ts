import { IShippingStrategy, Package } from './IShippingStrategy';

// Contexto: sabe QUANDO calcular o frete, nunca COMO — isso é da strategy.
export class ShippingCalculator {
  constructor(private strategy: IShippingStrategy) {}

  setStrategy(strategy: IShippingStrategy): void {
    this.strategy = strategy;
  }

  quote(pkg: Package): { method: string; costInCents: number; days: number } {
    return {
      method: this.strategy.name,
      costInCents: this.strategy.calculate(pkg),
      days: this.strategy.estimatedDays(pkg),
    };
  }
}
