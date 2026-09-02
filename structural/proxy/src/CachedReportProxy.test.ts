import assert from 'node:assert';
import { CachedReportProxy } from './CachedReportProxy';

let calls = 0;
const proxy = new CachedReportProxy(() => {
  calls++;
  return { generate: (month: string) => `rel-${month}` };
});

assert.strictEqual(calls, 0, 'serviço real não deve ser criado antes do primeiro uso');

assert.strictEqual(proxy.generate('2026-01'), 'rel-2026-01');
assert.strictEqual(proxy.generate('2026-01'), 'rel-2026-01');
assert.strictEqual(proxy.generate('2026-02'), 'rel-2026-02');
assert.strictEqual(calls, 1, 'serviço real deve ser criado uma única vez');

console.log('OK: proxy adia a criação do serviço e reaproveita o cache por mês');
