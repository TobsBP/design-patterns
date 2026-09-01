import assert from 'node:assert';
import { PaypalAdapter } from './PaypalAdapter';

let captured: [string, number] | null = null;
const fakeGateway = { sendPayment: (value: string, code: number) => { captured = [value, code]; } };

new PaypalAdapter(fakeGateway as any).pay(19990, 'BRL');
assert.deepStrictEqual(captured, ['199.90', 986]);
assert.throws(() => new PaypalAdapter(fakeGateway as any).pay(100, 'JPY'));

console.log('OK: adapter traduz centavos -> decimal e sigla -> código ISO');
