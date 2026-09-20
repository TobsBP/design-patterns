import { OrderState } from './OrderState';

// Estado final.
export class CancelledState extends OrderState {
  readonly name = 'cancelado';
}
