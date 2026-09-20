import { IOrderItem } from './IOrderItem';
import { IOrderItemVisitor } from './IOrderItemVisitor';

// A coleção só sabe passar o visitante por cada item.
// Ela não conhece nenhuma das operações.
export class Order {
  constructor(readonly items: IOrderItem[]) {}

  accept<T>(visitor: IOrderItemVisitor<T>): T[] {
    return this.items.map((item) => item.accept(visitor));
  }

  total<T extends number>(visitor: IOrderItemVisitor<T>): number {
    return this.accept(visitor).reduce((sum, value) => sum + value, 0);
  }
}
