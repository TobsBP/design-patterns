import { IOrderState } from './IOrderState';
import { PendingPaymentState } from './PendingPaymentState';

// Contexto: guarda o estado atual e delega tudo para ele.
// Não existe um único switch sobre "status" em lugar nenhum.
export class Order {
  private state: IOrderState;
  readonly history: string[] = [];

  constructor(
    readonly id: string,
    state: IOrderState = new PendingPaymentState(),
  ) {
    this.state = state;
    this.history.push(state.name);
  }

  get status(): string {
    return this.state.name;
  }

  /** Usado pelos próprios estados para passar a bola adiante. */
  transitionTo(state: IOrderState): void {
    console.log(`[Order ${this.id}] ${this.state.name} → ${state.name}`);
    this.state = state;
    this.history.push(state.name);
  }

  pay(): void {
    this.state.pay(this);
  }

  ship(): void {
    this.state.ship(this);
  }

  deliver(): void {
    this.state.deliver(this);
  }

  cancel(): void {
    this.state.cancel(this);
  }
}
