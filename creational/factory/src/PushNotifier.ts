import { INotifier } from './INotifier';

export class PushNotifier implements INotifier {
  send(to: string, message: string): void {
    console.log(`[Push] Para: ${to} | Mensagem: ${message}`);
  }
}
