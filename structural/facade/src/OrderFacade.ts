import { InventoryService } from './InventoryService';
import { PaymentService } from './PaymentService';
import { ShippingService } from './ShippingService';
import { NotificationService } from './NotificationService';

export interface OrderRequest {
  customerId: string;
  sku: string;
  quantity: number;
  amountInCents: number;
  address: string;
}

export class OrderFacade {
  constructor(
    private readonly inventory = new InventoryService(),
    private readonly payment = new PaymentService(),
    private readonly shipping = new ShippingService(),
    private readonly notification = new NotificationService(),
  ) {}

  // Uma única chamada esconde os quatro subsistemas e a ordem correta entre eles.
  placeOrder(order: OrderRequest): string {
    const { customerId, sku, quantity, amountInCents, address } = order;

    if (!this.inventory.isAvailable(sku, quantity)) {
      throw new Error(`Sem estoque para ${sku}`);
    }
    this.inventory.reserve(sku, quantity);

    let chargeId: string;
    try {
      chargeId = this.payment.charge(customerId, amountInCents);
    } catch (error) {
      this.inventory.release(sku, quantity); // pagamento falhou: desfaz a reserva
      throw error;
    }

    try {
      const trackingCode = this.shipping.schedule(sku, quantity, address);
      this.notification.send(customerId, `Pedido confirmado! Rastreio: ${trackingCode}`);
      return trackingCode;
    } catch (error) {
      this.payment.refund(chargeId);
      this.inventory.release(sku, quantity);
      throw error;
    }
  }
}
