// Mediador: recebe o aviso de um colega e decide o que fazer com os outros.
// É o único que conhece todo mundo.
export interface IMediator {
  notify(sender: string, event: string): void;
}
