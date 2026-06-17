import { Order, PaymentMethod } from './Order';

export interface IOrderBuilder {
  setCustomer(customerId: string): this;
  addItem(productId: string, name: string, quantity: number, unitPrice: number): this;
  setShippingAddress(street: string, city: string, state: string, zipCode: string): this;
  setPaymentMethod(method: PaymentMethod): this;
  applyDiscount(percent: number): this;
  addGiftWrapping(): this;
  addNotes(notes: string): this;
  reset(): this;
  build(): Order;
}
