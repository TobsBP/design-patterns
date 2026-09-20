import { PagedCatalog } from './PagedCatalog';

const catalog = new PagedCatalog([
  { sku: 'livro-ddd', name: 'Livro DDD', priceInCents: 12900, inStock: true },
  { sku: 'teclado-hhkb', name: 'Teclado HHKB', priceInCents: 245000, inStock: false },
  { sku: 'mousepad', name: 'Mousepad XL', priceInCents: 4000, inStock: true },
  { sku: 'headset', name: 'Headset', priceInCents: 20000, inStock: false },
  { sku: 'monitor-4k', name: 'Monitor 4K', priceInCents: 180000, inStock: true },
]);

console.log('=== tudo, na ordem ===');
const all = catalog.createIterator();
while (all.hasNext()) console.log(`  ${all.next().name}`);

console.log('\n=== só o que tem em estoque ===');
const available = catalog.createInStockIterator();
while (available.hasNext()) console.log(`  ${available.next().name}`);

console.log('\n=== o mesmo catálogo num for...of ===');
for (const product of catalog) console.log(`  ${product.name}`);

console.log(`\nPáginas buscadas ao todo: ${catalog.pageRequests}`);

// Em nenhum momento o código acima soube que o catálogo é paginado.
