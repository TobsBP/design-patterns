import { Cart, CartLine } from './Cart';
import { ICommand } from './ICommand';

export class RemoveItemCommand implements ICommand {
  readonly label: string;
  private removed?: CartLine;

  constructor(
    private readonly cart: Cart,
    private readonly sku: string,
    private readonly quantity = 1,
  ) {
    this.label = `remover ${quantity}x ${sku}`;
  }

  execute(): void {
    // Guarda o que foi tirado: sem isso não há como desfazer.
    const line = this.cart.find(this.sku);
    if (line) this.removed = { ...line, quantity: Math.min(this.quantity, line.quantity) };

    console.log(`[Command] ${this.label}`);
    this.cart.remove(this.sku, this.quantity);
  }

  undo(): void {
    if (!this.removed) return;

    console.log(`[Undo] ${this.label}`);
    this.cart.add(this.removed);
  }
}
