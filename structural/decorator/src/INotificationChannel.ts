// Componente: o mesmo contrato para o canal real e para os decoradores.
// É isso que permite empilhar comportamentos sem o cliente perceber.
export interface INotificationChannel {
  send(to: string, message: string): void;
}
