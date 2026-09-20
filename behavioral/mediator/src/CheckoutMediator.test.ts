import assert from 'node:assert';
import { CheckoutMediator } from './CheckoutMediator';
import { CouponField } from './CouponField';
import { PlaceOrderButton } from './PlaceOrderButton';
import { ShippingSelect } from './ShippingSelect';
import { TotalLabel } from './TotalLabel';

function buildForm() {
  return new CheckoutMediator(
    25800,
    new CouponField(),
    new ShippingSelect(),
    new TotalLabel(),
    new PlaceOrderButton(),
  );
}

// Estado inicial: sem cupom, PAC, botão liberado.
const form = buildForm();
assert.strictEqual(form.total.totalInCents, 25800 + 1900);
assert.strictEqual(form.button.enabled, true);

// Um cupom de desconto mexe no total sem o campo conhecer o TotalLabel.
form.coupon.type('BEMVINDO');
assert.strictEqual(form.total.totalInCents, 25800 - 2580 + 1900);

// O cupom de frete grátis alcança outro componente — via mediador.
form.coupon.type('FRETEGRATIS');
assert.strictEqual(form.shipping.costInCents, 0, 'o frete deveria ter zerado');
assert.strictEqual(form.total.totalInCents, 25800);

// Trocar o frete com o cupom de frete grátis ativo continua custando zero.
form.shipping.choose('sedex');
assert.strictEqual(form.shipping.costInCents, 0);

// Cupom inválido desabilita o botão e o clique não passa.
form.coupon.type('NAOEXISTE');
assert.strictEqual(form.button.enabled, false);
assert.match(form.button.reason ?? '', /não existe/);

// E volta a funcionar quando o cupom é corrigido — inclusive devolvendo o frete.
form.coupon.type('BLACK');
assert.strictEqual(form.button.enabled, true);
assert.strictEqual(form.shipping.costInCents, 3900, 'o frete deveria voltar a ser cobrado');
assert.strictEqual(form.total.totalInCents, 25800 - 6450 + 3900);

console.log('OK: os componentes reagem uns aos outros sem se conhecerem');
