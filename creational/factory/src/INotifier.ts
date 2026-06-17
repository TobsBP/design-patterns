export interface INotifier {
  send(to: string, message: string): void;
}
