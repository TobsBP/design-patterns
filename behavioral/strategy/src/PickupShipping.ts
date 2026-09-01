import { IShippingStrategy } from './IShippingStrategy';

export class PickupShipping implements IShippingStrategy {
  readonly name = 'Retirada na loja';

  calculate(): number {
    return 0;
  }

  estimatedDays(): number {
    return 0;
  }
}
