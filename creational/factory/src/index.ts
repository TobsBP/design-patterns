import { NotifierFactory, NotifierType } from './NotifierFactory';

const channels: NotifierType[] = ['email', 'sms', 'push'];

for (const channel of channels) {
  const notifier = NotifierFactory.create(channel);
  notifier.send('usuario@exemplo.com', 'Seu pedido foi confirmado!');
}

// O cliente depende apenas de INotifier — não conhece EmailNotifier, SMSNotifier etc.
// Trocar ou adicionar um canal não altera nenhum código que usa a factory.
