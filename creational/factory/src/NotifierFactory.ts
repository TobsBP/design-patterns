import { INotifier } from './INotifier';
import { EmailNotifier } from './EmailNotifier';
import { SMSNotifier } from './SMSNotifier';
import { PushNotifier } from './PushNotifier';

export type NotifierType = 'email' | 'sms' | 'push';

export class NotifierFactory {
  static create(type: NotifierType): INotifier {
    switch (type) {
      case 'email': return new EmailNotifier();
      case 'sms':   return new SMSNotifier();
      case 'push':  return new PushNotifier();
    }
  }
}
