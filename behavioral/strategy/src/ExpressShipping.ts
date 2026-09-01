import { IShippingStrategy, Package } from './IShippingStrategy';

export class ExpressShipping implements IShippingStrategy {
  readonly name = 'Sedex';

  calculate({ weightInGrams, distanceInKm }: Package): number {
    return Math.round(2900 + weightInGrams * 1.6 + distanceInKm * 25);
  }

  estimatedDays({ distanceInKm }: Package): number {
    return 1 + Math.ceil(distanceInKm / 1500);
  }
}
