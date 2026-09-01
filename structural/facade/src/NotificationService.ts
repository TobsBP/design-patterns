export class NotificationService {
  send(customerId: string, message: string): void {
    console.log(`[Notificação] Para ${customerId}: ${message}`);
  }
}
