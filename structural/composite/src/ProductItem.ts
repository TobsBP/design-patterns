import { ICartItem } from './ICartItem';

// Folha: não contém ninguém, só sabe o próprio preço.
export class ProductItem implements ICartItem {
  constructor(
    readonly name: string,
    private readonly unitPriceInCents: number,
    private readonly quantity = 1,
  ) {}

  totalInCents(): number {
    return this.unitPriceInCents * this.quantity;
  }

  print(depth = 0): void {
    const total = (this.totalInCents() / 100).toFixed(2);
    console.log(`${'  '.repeat(depth)}- ${this.quantity}x ${this.name} — R$ ${total}`);
  }
}
