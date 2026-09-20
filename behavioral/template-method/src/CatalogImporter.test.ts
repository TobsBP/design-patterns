import assert from 'node:assert';
import { CsvCatalogImporter } from './CsvCatalogImporter';
import { JsonCatalogImporter } from './JsonCatalogImporter';

const csv = `sku,name,price
LIVRO-DDD, Livro DDD , 129.00
, Sem sku, 10.00
MOUSEPAD, Mousepad XL, 0`;

const csvReport = new CsvCatalogImporter().run(csv);

// A validação padrão da superclasse descartou as duas linhas ruins.
assert.strictEqual(csvReport.imported, 1);
assert.strictEqual(csvReport.skipped, 2);
assert.deepStrictEqual(csvReport.products[0], {
  sku: 'livro-ddd',
  name: 'Livro DDD',
  priceInCents: 12900,
});

// O importador JSON sobrescreveu a normalização: o preço já vem em centavos.
const jsonImporter = new JsonCatalogImporter();
const jsonReport = jsonImporter.run(
  JSON.stringify({ items: [{ sku: 'HEADSET', name: 'Headset', price: '20000' }] }),
);

assert.strictEqual(jsonReport.products[0].priceInCents, 20000);
assert.strictEqual(jsonReport.products[0].sku, 'headset');

// E usou o hook que a superclasse deixou vazio.
assert.deepStrictEqual(jsonImporter.notified, ['catálogo JSON atualizado: 1 produtos']);

// Os dois relatórios têm a mesma forma: a sequência de passos é a mesma.
assert.deepStrictEqual(Object.keys(csvReport), Object.keys(jsonReport));

console.log('OK: a superclasse manda na sequência e as subclasses mudam só os passos');
