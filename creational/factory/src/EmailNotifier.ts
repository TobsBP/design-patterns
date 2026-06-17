import { INotifier } from './INotifier';

export class EmailNotifier implements INotifier {
  send(to: string, message: string): void {
    console.log(`[Email] Para: ${to} | Mensagem: ${message}`);
  }
}
