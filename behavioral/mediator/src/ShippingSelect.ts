import { FormComponent } from './FormComponent';

export type ShippingMethod = 'pac' | 'sedex' | 'retirada';

const COSTS: Record<ShippingMethod, number> = { pac: 1900, sedex: 3900, retirada: 0 };

export class ShippingSelect extends FormComponent {
  method: ShippingMethod = 'pac';
  costInCents = COSTS.pac;
  free = false;

  choose(method: ShippingMethod): void {
    this.method = method;
    this.applyCost();

    console.log(`[ShippingSelect] escolheu ${method}`);
    this.notify('shipping-changed');
  }

  /** O mediador usa isto quando o cupom é de frete grátis. */
  setFree(free: boolean): void {
    this.free = free;
    this.applyCost();
  }

  private applyCost(): void {
    this.costInCents = this.free ? 0 : COSTS[this.method];
  }
}
