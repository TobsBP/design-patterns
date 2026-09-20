import assert from 'node:assert';
import { CsvRenderer } from './CsvRenderer';
import { InventoryReport } from './InventoryReport';
import { JsonRenderer } from './JsonRenderer';
import { SalesReport } from './SalesReport';

const sales = [{ month: '2025-01', orders: 128, revenueInCents: 4820000 }];
const stock = [{ sku: 'livro-ddd', available: 3, reserved: 1 }];

// O mesmo relatório em dois formatos: só o renderer mudou.
const csv = new SalesReport(new CsvRenderer(), sales);
const json = new SalesReport(new JsonRenderer(), sales);

assert.strictEqual(csv.export(), 'mês,pedidos,receita\n2025-01,128,48200.00');
assert.deepStrictEqual(JSON.parse(json.export()), {
  title: 'Vendas por mês',
  records: [{ 'mês': '2025-01', pedidos: 128, receita: '48200.00' }],
});

// E o mesmo renderer serve para outro relatório: os dois eixos são independentes.
const inventory = new InventoryReport(new CsvRenderer(), stock);
assert.strictEqual(inventory.export(), 'sku,disponível,reservado\nlivro-ddd,3,1');
assert.strictEqual(inventory.format, 'csv');

console.log('OK: relatório e formato variam em hierarquias separadas');
