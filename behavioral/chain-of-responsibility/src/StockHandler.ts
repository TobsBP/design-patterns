import { CheckoutHandler } from './CheckoutHandler';
import { CheckoutRequest, CheckoutResult } from './ICheckoutHandler';

export class StockHandler extends CheckoutHandler {
  constructor(private readonly stock = new Map([['livro-ddd', 3], ['teclado-hhkb', 0]])) {
    super();
  }

  handle(request: CheckoutRequest): CheckoutResult {
    for (const item of request.items) {
      const available = this.stock.get(item.sku) ?? 0;
      if (available < item.quantity) return this.reject(`sem estoque para ${item.sku}`);
    }

    console.log('[StockHandler] ok, passa adiante');
    return super.handle(request);
  }
}
