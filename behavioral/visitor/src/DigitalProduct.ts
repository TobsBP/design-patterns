import { IOrderItem } from './IOrderItem';
import { IOrderItemVisitor } from './IOrderItemVisitor';

export class DigitalProduct implements IOrderItem {
  constructor(
    readonly name: string,
    readonly priceInCents: number,
    readonly downloadUrl: string,
  ) {}

  accept<T>(visitor: IOrderItemVisitor<T>): T {
    return visitor.visitDigital(this);
  }
}
