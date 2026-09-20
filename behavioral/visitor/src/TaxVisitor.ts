import { DigitalProduct } from './DigitalProduct';
import { GiftCard } from './GiftCard';
import { IOrderItemVisitor } from './IOrderItemVisitor';
import { PhysicalProduct } from './PhysicalProduct';

// Operação 2: quanto cada item paga de imposto. Regras completamente diferentes
// das de frete, e ainda assim nenhum item precisou mudar.
export class TaxVisitor implements IOrderItemVisitor<number> {
  visitPhysical(item: PhysicalProduct): number {
    return Math.round(item.priceInCents * 0.18); // ICMS
  }

  visitDigital(item: DigitalProduct): number {
    return Math.round(item.priceInCents * 0.05); // ISS sobre serviço digital
  }

  visitGiftCard(_item: GiftCard): number {
    return 0; // o imposto sai quando o vale for usado
  }
}
