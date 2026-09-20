import { DigitalProduct } from './DigitalProduct';
import { GiftCard } from './GiftCard';
import { PhysicalProduct } from './PhysicalProduct';

// Visitante: um método por tipo de item. Cada operação nova sobre o pedido
// é uma implementação desta interface — nenhum item precisa mudar.
export interface IOrderItemVisitor<T> {
  visitPhysical(item: PhysicalProduct): T;
  visitDigital(item: DigitalProduct): T;
  visitGiftCard(item: GiftCard): T;
}
