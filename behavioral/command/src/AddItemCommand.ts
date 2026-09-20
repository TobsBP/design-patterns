import { Cart, CartLine } from './Cart';
import { ICommand } from './ICommand';

export class AddItemCommand implements ICommand {
  readonly label: string;

  constructor(
    private readonly cart: Cart,
    private readonly line: CartLine,
  ) {
    this.label = `adicionar ${line.quantity}x ${line.name}`;
  }

  execute(): void {
    console.log(`[Command] ${this.label}`);
    this.cart.add(this.line);
  }

  // O inverso de adicionar é remover a mesma quantidade.
  undo(): void {
    console.log(`[Undo] ${this.label}`);
    this.cart.remove(this.line.sku, this.line.quantity);
  }
}
