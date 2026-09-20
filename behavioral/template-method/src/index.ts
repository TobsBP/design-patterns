import { CsvCatalogImporter } from './CsvCatalogImporter';
import { JsonCatalogImporter } from './JsonCatalogImporter';

const csv = `sku,name,price
LIVRO-DDD, Livro DDD , 129.00
TECLADO-HHKB, Teclado HHKB, 2450.00
, Sem sku, 10.00
MOUSEPAD, Mousepad XL, 0`;

const json = JSON.stringify({
  items: [
    { sku: 'HEADSET', name: 'Headset', price: '20000' },
    { sku: 'MONITOR-4K', name: 'Monitor 4K', price: '180000' },
  ],
});

console.log(new CsvCatalogImporter().run(csv).products, '\n');

const jsonImporter = new JsonCatalogImporter();
console.log(jsonImporter.run(json).products);
console.log(jsonImporter.notified);

// Os dois seguiram exatamente a mesma sequência de passos — parse, validar,
// normalizar, relatar. O que mudou foi o conteúdo de cada passo.
