import { INotificationChannel } from './INotificationChannel';

// Componente concreto: faz o trabalho de verdade.
// `failures` simula um serviço instável para o RetryChannel ter o que tratar.
export class EmailChannel implements INotificationChannel {
  private attempts = 0;

  constructor(private readonly failures = 0) {}

  send(to: string, message: string): void {
    this.attempts += 1;
    if (this.attempts <= this.failures) {
      throw new Error(`SMTP indisponível (tentativa ${this.attempts})`);
    }

    console.log(`[Email] Para: ${to} | ${message}`);
  }
}
