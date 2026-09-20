import { ChannelDecorator } from './ChannelDecorator';
import { INotificationChannel } from './INotificationChannel';

// Altera o que passa: acrescenta a assinatura antes de repassar.
export class SignedChannel extends ChannelDecorator {
  constructor(
    wrapped: INotificationChannel,
    private readonly signature = '— Equipe da Loja',
  ) {
    super(wrapped);
  }

  send(to: string, message: string): void {
    super.send(to, `${message}\n${this.signature}`);
  }
}
