import { CouponField } from './CouponField';
import { IMediator } from './IMediator';
import { PlaceOrderButton } from './PlaceOrderButton';
import { ShippingSelect } from './ShippingSelect';
import { TotalLabel } from './TotalLabel';

// Mediador concreto: aqui mora toda a regra de "quando X muda, Y e Z reagem".
// Os componentes não se conhecem, então essa regra existe num lugar só.
export class CheckoutMediator implements IMediator {
  constructor(
    private readonly subtotalInCents: number,
    readonly coupon: CouponField,
    readonly shipping: ShippingSelect,
    readonly total: TotalLabel,
    readonly button: PlaceOrderButton,
  ) {
    for (const component of [coupon, shipping, total, button]) {
      component.setMediator(this);
    }
    this.refresh();
  }

  notify(sender: string, event: string): void {
    console.log(`[Mediator] ${sender} → ${event}`);

    if (event === 'place-order') {
      console.log(`[Mediator] pedido enviado — R$ ${(this.total.totalInCents / 100).toFixed(2)}`);
      return;
    }

    this.refresh();
  }

  private refresh(): void {
    // Um cupom de frete grátis muda o frete; o frete muda o total;
    // o cupom inválido desabilita o botão. Tudo decidido aqui.
    this.shipping.setFree(this.coupon.code === 'FRETEGRATIS');
    this.total.render(this.subtotalInCents, this.coupon.percent, this.shipping.costInCents);
    this.button.setEnabled(!this.coupon.error, this.coupon.error);
  }
}
