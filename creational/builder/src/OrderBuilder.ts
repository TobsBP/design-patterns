import { IOrderBuilder } from './IOrderBuilder';
import { Order, OrderItem, ShippingAddress, PaymentMethod } from './Order';

export class OrderBuilder implements IOrderBuilder {
  private order: Order = new Order();

  reset(): this {
    this.order = new Order();
    return this;
  }

  setCustomer(customerId: string): this {
    this.order.customerId = customerId;
    return this;
  }

  addItem(productId: string, name: string, quantity: number, unitPrice: number): this {
    this.order.items.push(new OrderItem(productId, name, quantity, unitPrice));
    return this;
  }

  setShippingAddress(street: string, city: string, state: string, zipCode: string): this {
    this.order.shippingAddress = new ShippingAddress(street, city, state, zipCode);
    return this;
  }

  setPaymentMethod(method: PaymentMethod): this {
    this.order.paymentMethod = method;
    return this;
  }

  applyDiscount(percent: number): this {
    this.order.discountPercent = percent;
    return this;
  }

  addGiftWrapping(): this {
    this.order.giftWrapping = true;
    return this;
  }

  addNotes(notes: string): this {
    this.order.notes = notes;
    return this;
  }

  build(): Order {
    const result = this.order;
    this.reset();
    return result;
  }
}
