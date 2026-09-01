import { Package } from './IShippingStrategy';
import { ShippingCalculator } from './ShippingCalculator';
import { StandardShipping } from './StandardShipping';
import { ExpressShipping } from './ExpressShipping';
import { PickupShipping } from './PickupShipping';

const pkg: Package = { weightInGrams: 800, distanceInKm: 420 };
const format = (cents: number) => `R$ ${(cents / 100).toFixed(2)}`;

// O checkout mostra as opções de frete: mesma chamada, algoritmos diferentes.
const calculator = new ShippingCalculator(new StandardShipping());

for (const strategy of [new StandardShipping(), new ExpressShipping(), new PickupShipping()]) {
  calculator.setStrategy(strategy);
  const { method, costInCents, days } = calculator.quote(pkg);
  console.log(`${method}: ${format(costInCents)} — ${days === 0 ? 'hoje' : `${days} dia(s)`}`);
}

// O cliente escolheu Sedex: o resto do sistema não muda em nada.
calculator.setStrategy(new ExpressShipping());
const chosen = calculator.quote(pkg);
console.log(`\nFrete escolhido: ${chosen.method} por ${format(chosen.costInCents)}`);

// Sem Strategy, isso seria um switch dentro do calculador — e cada novo
// método de envio exigiria abrir e editar essa mesma função.
