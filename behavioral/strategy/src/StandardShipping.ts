import { IShippingStrategy, Package } from './IShippingStrategy';

export class StandardShipping implements IShippingStrategy {
  readonly name = 'PAC';

  calculate({ weightInGrams, distanceInKm }: Package): number {
    return Math.round(1500 + weightInGrams * 0.8 + distanceInKm * 12);
  }

  estimatedDays({ distanceInKm }: Package): number {
    return 5 + Math.ceil(distanceInKm / 500);
  }
}
