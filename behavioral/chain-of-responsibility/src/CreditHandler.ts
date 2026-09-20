import { CheckoutHandler } from './CheckoutHandler';
import { CheckoutRequest, CheckoutResult } from './ICheckoutHandler';

export class CreditHandler extends CheckoutHandler {
  handle(request: CheckoutRequest): CheckoutResult {
    if (request.amountInCents > request.creditLimitInCents) {
      return this.reject('valor acima do limite de crédito');
    }

    console.log('[CreditHandler] ok, aprovado');
    return { approved: true, by: 'CreditHandler' };
  }
}
