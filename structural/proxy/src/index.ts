import { CachedReportProxy } from './CachedReportProxy';

// O cliente conhece só IReportService — não sabe se fala com o serviço ou com o proxy.
const reports = new CachedReportProxy();

console.log('Nada foi instanciado ainda: o serviço real só nasce na primeira chamada.\n');

console.log(reports.generate('2026-01'));
console.log(reports.generate('2026-01')); // vem do cache
console.log(reports.generate('2026-02'));

// Saída:
// [ReportService] Processando o relatório de 2026-01... (caro)
// Relatório de vendas — 2026-01
// [Proxy] Cache hit para 2026-01
// Relatório de vendas — 2026-01
// [ReportService] Processando o relatório de 2026-02... (caro)
// Relatório de vendas — 2026-02
