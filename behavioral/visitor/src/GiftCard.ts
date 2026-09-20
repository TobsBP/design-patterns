import { IOrderItem } from './IOrderItem';
import { IOrderItemVisitor } from './IOrderItemVisitor';

export class GiftCard implements IOrderItem {
  constructor(
    readonly name: string,
    readonly priceInCents: number,
    readonly recipientEmail: string,
  ) {}

  accept<T>(visitor: IOrderItemVisitor<T>): T {
    return visitor.visitGiftCard(this);
  }
}
