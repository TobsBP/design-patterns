import { Product } from './Product';
import { ProductRegistry } from './ProductRegistry';

const registry = new ProductRegistry();

// Montar a camiseta base custa caro (specs vindas do ERP, tags do marketing).
// Isso acontece uma vez; as variações saem de cópias.
registry.register(
  'camiseta',
  new Product({
    name: 'Camiseta básica',
    priceInCents: 7900,
    specs: new Map([['tecido', 'algodão penteado'], ['gramatura', '180g']]),
    tags: ['vestuario', 'basico'],
  }),
);

const preta = registry.spawn('camiseta');
preta.name = 'Camiseta básica preta';
preta.specs.set('cor', 'preta');

const estampada = registry.spawn('camiseta');
estampada.name = 'Camiseta estampada';
estampada.priceInCents = 9900;
estampada.specs.set('cor', 'branca');
estampada.tags.push('estampa');

console.log(preta.describe());
console.log(estampada.describe());
console.log(registry.spawn('camiseta').describe());

// O protótipo do registro continua intacto: as variações mexeram só nas cópias.
