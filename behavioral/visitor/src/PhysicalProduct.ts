import { IOrderItem } from './IOrderItem';
import { IOrderItemVisitor } from './IOrderItemVisitor';

export class PhysicalProduct implements IOrderItem {
  constructor(
    readonly name: string,
    readonly priceInCents: number,
    readonly weightInGrams: number,
  ) {}

  // O item escolhe o método; o visitante escolhe o que fazer.
  accept<T>(visitor: IOrderItemVisitor<T>): T {
    return visitor.visitPhysical(this);
  }
}
