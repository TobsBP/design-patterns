import { CheckoutRequest, CheckoutResult, ICheckoutHandler } from './ICheckoutHandler';

// Elo base: guarda o próximo da fila e sabe repassar.
// Cada handler concreto só decide entre barrar e chamar super.handle().
export abstract class CheckoutHandler implements ICheckoutHandler {
  private next?: ICheckoutHandler;

  /** Devolve o próximo para permitir encadear: a.setNext(b).setNext(c) */
  setNext(handler: ICheckoutHandler): ICheckoutHandler {
    this.next = handler;
    return handler;
  }

  handle(request: CheckoutRequest): CheckoutResult {
    if (this.next) return this.next.handle(request);

    // Ninguém barrou e a fila acabou.
    return { approved: true, by: this.constructor.name };
  }

  protected reject(reason: string): CheckoutResult {
    console.log(`[${this.constructor.name}] barrou: ${reason}`);
    return { approved: false, by: this.constructor.name, reason };
  }
}
