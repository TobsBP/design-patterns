export interface Package {
  weightInGrams: number;
  distanceInKm: number;
}

export interface IShippingStrategy {
  readonly name: string;
  calculate(pkg: Package): number; // custo em centavos
  estimatedDays(pkg: Package): number;
}
