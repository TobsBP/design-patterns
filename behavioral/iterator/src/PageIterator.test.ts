import assert from 'node:assert';
import { CatalogProduct } from './CatalogProduct';
import { PagedCatalog } from './PagedCatalog';

const products: CatalogProduct[] = [
  { sku: 'a', name: 'A', priceInCents: 100, inStock: true },
  { sku: 'b', name: 'B', priceInCents: 200, inStock: false },
  { sku: 'c', name: 'C', priceInCents: 300, inStock: true },
  { sku: 'd', name: 'D', priceInCents: 400, inStock: false },
  { sku: 'e', name: 'E', priceInCents: 500, inStock: true },
];

const catalog = new PagedCatalog(products);

// O percurso completo atravessa as páginas sem que quem chama saiba delas.
const all: string[] = [];
const iterator = catalog.createIterator();
while (iterator.hasNext()) all.push(iterator.next().sku);
assert.deepStrictEqual(all, ['a', 'b', 'c', 'd', 'e']);

// Outro iterador, mesma coleção, outro caminho.
const available: string[] = [];
const inStock = catalog.createInStockIterator();
while (inStock.hasNext()) available.push(inStock.next().sku);
assert.deepStrictEqual(available, ['a', 'c', 'e']);

// Dois iteradores caminham independentes: cada um tem a sua posição.
const first = catalog.createIterator();
const second = catalog.createIterator();
first.next();
first.next();
assert.strictEqual(second.next().sku, 'a', 'o segundo iterador deveria começar do zero');

// A busca é preguiçosa: ler dois itens não carrega o catálogo inteiro.
const lazy = new PagedCatalog(products);
const lazyIterator = lazy.createIterator();
lazyIterator.next();
lazyIterator.next();
assert.strictEqual(lazy.pageRequests, 1, 'só a primeira página deveria ter sido buscada');

// E o protocolo nativo percorre a mesma coisa.
assert.deepStrictEqual([...catalog].map((p) => p.sku), ['a', 'b', 'c', 'd', 'e']);

assert.throws(() => {
  const done = new PagedCatalog([]).createIterator();
  done.next();
}, /Fim do catálogo/);

console.log('OK: o percurso esconde a paginação e cada iterador guarda a própria posição');
