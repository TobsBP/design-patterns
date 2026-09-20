import { AuditChannel } from './AuditChannel';
import { EmailChannel } from './EmailChannel';
import { INotificationChannel } from './INotificationChannel';
import { RetryChannel } from './RetryChannel';
import { SignedChannel } from './SignedChannel';

// Canal cru: só envia.
const plain: INotificationChannel = new EmailChannel();
plain.send('cliente@exemplo.com', 'Pedido confirmado.');

console.log('\n--- com assinatura, retry e auditoria ---\n');

// As camadas se empilham de fora para dentro:
// assinatura( auditoria( retry( email ) ) )
// A ordem importa: a auditoria está por dentro da assinatura, então registra a
// mensagem que realmente saiu. Invertê-la faria o log medir o texto sem assinar.
const decorated = new SignedChannel(
  new AuditChannel(new RetryChannel(new EmailChannel(2))),
);

decorated.send('cliente@exemplo.com', 'Pedido confirmado.');

// O cliente continua chamando send(to, message). Ele não sabe quantas camadas existem
// nem em que ordem — e trocar a ordem muda o comportamento sem alterar classe nenhuma.
