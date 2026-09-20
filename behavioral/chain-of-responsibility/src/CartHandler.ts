import { CheckoutHandler } from './CheckoutHandler';
import { CheckoutRequest, CheckoutResult } from './ICheckoutHandler';

export class CartHandler extends CheckoutHandler {
  handle(request: CheckoutRequest): CheckoutResult {
    if (request.items.length === 0) return this.reject('carrinho vazio');
    if (request.items.some((item) => item.quantity <= 0)) {
      return this.reject('quantidade inválida');
    }

    console.log('[CartHandler] ok, passa adiante');
    return super.handle(request);
  }
}
