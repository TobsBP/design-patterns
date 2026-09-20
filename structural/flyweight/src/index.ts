import { ProductTypeFactory } from './ProductTypeFactory';
import { Shipment } from './Shipment';

const catalog = [
  { sku: 'livro-ddd', name: 'Domain-Driven Design', weight: 900, dimensions: '23x16x4cm' },
  { sku: 'teclado-hhkb', name: 'Teclado HHKB', weight: 540, dimensions: '30x11x4cm' },
  { sku: 'mousepad', name: 'Mousepad XL', weight: 320, dimensions: '90x40x0.4cm' },
];

const factory = new ProductTypeFactory();
const shipments: Shipment[] = [];

// 30 mil envios, mas as fichas de produto são sempre as mesmas três.
for (let i = 0; i < 30000; i += 1) {
  const item = catalog[i % catalog.length];
  const type = factory.get(item.sku, item.name, item.weight, item.dimensions);
  shipments.push(new Shipment(type, `ord-${i}`, (i % 3) + 1, 'Av. Paulista, 1000'));
}

console.log(shipments[0].printLabel());
console.log(shipments[1].printLabel());
console.log(`\nEnvios: ${shipments.length}`);
console.log(`Fichas de produto em memória: ${factory.size}`);
console.log(`Instâncias criadas: ${factory.instancesCreated}`);

// Sem o flyweight seriam 30.000 cópias de nome, peso e dimensões.
// O que varia de verdade — pedido, quantidade, endereço — continua em cada Shipment.
