import { INotifier } from './INotifier';

export class SMSNotifier implements INotifier {
  send(to: string, message: string): void {
    console.log(`[SMS] Para: ${to} | Mensagem: ${message}`);
  }
}
