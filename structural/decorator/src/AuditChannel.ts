import { ChannelDecorator } from './ChannelDecorator';

// Acrescenta um efeito em volta: registra o envio sem mudar a mensagem.
export class AuditChannel extends ChannelDecorator {
  readonly entries: string[] = [];

  send(to: string, message: string): void {
    super.send(to, message);
    const entry = `${to} recebeu ${message.length} caracteres`;
    this.entries.push(entry);
    console.log(`[Auditoria] ${entry}`);
  }
}
