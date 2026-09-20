import { ICommand } from './ICommand';

// Invocador: dispara comandos e guarda o histórico.
// Não sabe o que cada comando faz — só que sabe executar e desfazer.
export class CommandBus {
  private readonly history: ICommand[] = [];

  run(command: ICommand): void {
    command.execute();
    this.history.push(command);
  }

  undo(): boolean {
    const command = this.history.pop();
    if (!command) return false;

    command.undo();
    return true;
  }

  get log(): string[] {
    return this.history.map((command) => command.label);
  }

  get size(): number {
    return this.history.length;
  }
}
