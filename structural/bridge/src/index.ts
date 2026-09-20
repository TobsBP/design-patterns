import { CsvRenderer } from './CsvRenderer';
import { InventoryReport } from './InventoryReport';
import { JsonRenderer } from './JsonRenderer';
import { SalesReport } from './SalesReport';
import { TableRenderer } from './TableRenderer';

const sales = [
  { month: '2025-01', orders: 128, revenueInCents: 4820000 },
  { month: '2025-02', orders: 96, revenueInCents: 3610000 },
];

const stock = [
  { sku: 'livro-ddd', available: 3, reserved: 1 },
  { sku: 'teclado-hhkb', available: 0, reserved: 0 },
];

// Os dois eixos se combinam livremente: 2 relatórios x 3 formatos, 5 classes.
console.log(new SalesReport(new TableRenderer(), sales).export());
console.log('\n---\n');
console.log(new SalesReport(new CsvRenderer(), sales).export());
console.log('\n---\n');
console.log(new InventoryReport(new JsonRenderer(), stock).export());

// Um formato novo é uma classe nova de renderer; um relatório novo é uma classe nova
// de Report. Nenhum dos dois lados precisa conhecer as classes do outro.
