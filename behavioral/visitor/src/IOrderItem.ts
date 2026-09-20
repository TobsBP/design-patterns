import { IOrderItemVisitor } from './IOrderItemVisitor';

// Elemento: a única coisa que ele sabe fazer por um visitante é se entregar
// ao método certo. Isso é o double dispatch.
export interface IOrderItem {
  readonly name: string;
  readonly priceInCents: number;
  accept<T>(visitor: IOrderItemVisitor<T>): T;
}
