import { DigitalProduct } from './DigitalProduct';
import { GiftCard } from './GiftCard';
import { IOrderItemVisitor } from './IOrderItemVisitor';
import { PhysicalProduct } from './PhysicalProduct';

// Operação 1: quanto cada item custa de frete.
export class ShippingCostVisitor implements IOrderItemVisitor<number> {
  visitPhysical(item: PhysicalProduct): number {
    return 1500 + Math.round(item.weightInGrams * 1.2);
  }

  visitDigital(_item: DigitalProduct): number {
    return 0; // download não tem frete
  }

  visitGiftCard(_item: GiftCard): number {
    return 0; // vai por e-mail
  }
}
