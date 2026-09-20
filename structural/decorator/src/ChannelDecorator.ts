import { INotificationChannel } from './INotificationChannel';

// Decorador base: implementa a interface e guarda o objeto embrulhado.
// Sozinho não faz nada — só repassa. As subclasses acrescentam o comportamento.
export abstract class ChannelDecorator implements INotificationChannel {
  constructor(protected readonly wrapped: INotificationChannel) {}

  send(to: string, message: string): void {
    this.wrapped.send(to, message);
  }
}
