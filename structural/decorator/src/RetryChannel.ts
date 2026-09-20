import { ChannelDecorator } from './ChannelDecorator';
import { INotificationChannel } from './INotificationChannel';

// Altera o quando: repete a chamada embrulhada até dar certo.
export class RetryChannel extends ChannelDecorator {
  constructor(wrapped: INotificationChannel, private readonly maxAttempts = 3) {
    super(wrapped);
  }

  send(to: string, message: string): void {
    for (let attempt = 1; attempt <= this.maxAttempts; attempt += 1) {
      try {
        super.send(to, message);
        return;
      } catch (error) {
        console.log(`[Retry] Tentativa ${attempt} falhou: ${(error as Error).message}`);
        if (attempt === this.maxAttempts) throw error;
      }
    }
  }
}
