import { CheckoutMediator } from './CheckoutMediator';
import { CouponField } from './CouponField';
import { PlaceOrderButton } from './PlaceOrderButton';
import { ShippingSelect } from './ShippingSelect';
import { TotalLabel } from './TotalLabel';

const form = new CheckoutMediator(
  25800,
  new CouponField(),
  new ShippingSelect(),
  new TotalLabel(),
  new PlaceOrderButton(),
);

console.log('\n--- cupom válido ---');
form.coupon.type('BEMVINDO');

console.log('\n--- troca o frete ---');
form.shipping.choose('sedex');

console.log('\n--- cupom de frete grátis ---');
form.coupon.type('FRETEGRATIS');

console.log('\n--- cupom inexistente ---');
form.coupon.type('NAOEXISTE');
form.button.click();

console.log('\n--- volta para um cupom válido e finaliza ---');
form.coupon.type('BLACK');
form.button.click();

// Nenhum componente importou outro componente: o cupom não sabe que existe frete,
// e o botão não sabe por que está desabilitado além do motivo que recebeu.
