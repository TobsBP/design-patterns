import { CheckoutHandler } from './CheckoutHandler';
import { CheckoutRequest, CheckoutResult } from './ICheckoutHandler';

export class FraudHandler extends CheckoutHandler {
  constructor(private readonly maxRiskScore = 70) {
    super();
  }

  handle(request: CheckoutRequest): CheckoutResult {
    if (request.riskScore > this.maxRiskScore) {
      return this.reject(`risco ${request.riskScore} acima do limite ${this.maxRiskScore}`);
    }

    console.log('[FraudHandler] ok, passa adiante');
    return super.handle(request);
  }
}
