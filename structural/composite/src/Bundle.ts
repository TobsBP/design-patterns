import { ICartItem } from './ICartItem';

// Composto: contém outros itens, que podem ser folhas ou outros compostos.
// Ele delega o cálculo para os filhos sem perguntar o que cada um é.
export class Bundle implements ICartItem {
  private readonly items: ICartItem[] = [];

  constructor(
    readonly name: string,
    private readonly discountPercent = 0,
  ) {}

  add(item: ICartItem): this {
    this.items.push(item);
    return this;
  }

  remove(item: ICartItem): this {
    const index = this.items.indexOf(item);
    if (index !== -1) this.items.splice(index, 1);
    return this;
  }

  totalInCents(): number {
    const sum = this.items.reduce((total, item) => total + item.totalInCents(), 0);
    return Math.round(sum * (1 - this.discountPercent / 100));
  }

  print(depth = 0): void {
    const total = (this.totalInCents() / 100).toFixed(2);
    const discount = this.discountPercent ? ` (-${this.discountPercent}%)` : '';
    console.log(`${'  '.repeat(depth)}+ ${this.name}${discount} — R$ ${total}`);

    for (const item of this.items) {
      item.print(depth + 1);
    }
  }
}
