import { OrderState } from './OrderState';

// Estado final: herda todas as recusas e não libera nada.
export class DeliveredState extends OrderState {
  readonly name = 'entregue';
}
