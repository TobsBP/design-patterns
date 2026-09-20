// Comando: a operação virou objeto. Sabe se executar e se desfazer.
export interface ICommand {
  readonly label: string;
  execute(): void;
  undo(): void;
}
