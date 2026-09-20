import assert from 'node:assert';
import { AuditChannel } from './AuditChannel';
import { EmailChannel } from './EmailChannel';
import { RetryChannel } from './RetryChannel';
import { SignedChannel } from './SignedChannel';

// O retry engole duas falhas e o envio acontece na terceira tentativa.
const audit = new AuditChannel(new RetryChannel(new EmailChannel(2)));
const signed = new SignedChannel(audit);
signed.send('cliente@exemplo.com', 'Pedido confirmado.');

assert.strictEqual(audit.entries.length, 1, 'o envio deveria ter acontecido uma vez');
assert.ok(
  audit.entries[0].includes('cliente@exemplo.com'),
  'a auditoria deveria registrar o destinatário',
);

// A auditoria está por dentro da assinatura, então mediu a mensagem já assinada.
const original = 'Pedido confirmado.';
const audited = Number(audit.entries[0].match(/(\d+) caracteres/)?.[1]);
assert.ok(audited > original.length, 'a assinatura deveria ter sido acrescentada');

// Estourado o limite de tentativas, o erro sobe para o cliente.
const failing = new RetryChannel(new EmailChannel(5), 2);
assert.throws(() => failing.send('cliente@exemplo.com', 'oi'), /SMTP indisponível/);

// Sem decoradores, o canal continua funcionando igual — a interface é a mesma.
const plain = new EmailChannel();
assert.doesNotThrow(() => plain.send('cliente@exemplo.com', 'oi'));

console.log('OK: as camadas se empilham sem que o cliente mude a forma de chamar');
