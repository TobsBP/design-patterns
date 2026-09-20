import { Cart } from './Cart';
import { ICommand } from './ICommand';

export class ApplyCouponCommand implements ICommand {
  readonly label: string;
  private previousPercent = 0;

  constructor(
    private readonly cart: Cart,
    private readonly percent: number,
  ) {
    this.label = `aplicar cupom de ${percent}%`;
  }

  execute(): void {
    this.previousPercent = this.cart.couponPercent;
    console.log(`[Command] ${this.label}`);
    this.cart.couponPercent = this.percent;
  }

  undo(): void {
    console.log(`[Undo] ${this.label}`);
    this.cart.couponPercent = this.previousPercent;
  }
}
