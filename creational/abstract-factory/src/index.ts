import { BrazilCheckoutFactory } from './BrazilCheckoutFactory';
import { Checkout } from './Checkout';
import { ICheckoutFactory } from './ICheckoutFactory';
import { UsaCheckoutFactory } from './UsaCheckoutFactory';

// A região é decidida uma vez, na borda da aplicação.
const factories: Record<string, ICheckoutFactory> = {
  BR: new BrazilCheckoutFactory(),
  US: new UsaCheckoutFactory(),
};

for (const country of ['BR', 'US']) {
  const checkout = new Checkout(factories[country]);
  const summary = checkout.finish('ord-901', 24900);

  console.log(`${summary.region}: ${summary.currency} ${(summary.totalInCents / 100).toFixed(2)} (nota ${summary.invoiceNumber})\n`);
}

// O Checkout é o mesmo nos dois casos. Trocar a fábrica troca a família inteira —
// imposto e documento fiscal sempre combinam.
