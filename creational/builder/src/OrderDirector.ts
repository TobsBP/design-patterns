import { IOrderBuilder } from './IOrderBuilder';
import { Order } from './Order';

export class OrderDirector {
  constructor(private builder: IOrderBuilder) {}

  buildPremiumOrder(customerId: string): Order {
    return this.builder
      .setCustomer(customerId)
      .addItem('prod-001', 'Teclado Mecânico', 1, 350)
      .addItem('prod-002', 'Mouse Gamer', 2, 150)
      .setShippingAddress('Av. Paulista, 1000', 'São Paulo', 'SP', '01310-100')
      .setPaymentMethod('pix')
      .applyDiscount(10)
      .build();
  }

  buildGiftOrder(customerId: string): Order {
    return this.builder
      .setCustomer(customerId)
      .addItem('prod-003', 'Headset', 1, 200)
      .setShippingAddress('Rua das Flores, 42', 'Curitiba', 'PR', '80010-000')
      .setPaymentMethod('credit_card')
      .addGiftWrapping()
      .addNotes('Parabéns pelo aniversário!')
      .build();
  }
}
