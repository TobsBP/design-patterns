export type PaymentMethod = 'credit_card' | 'pix' | 'boleto';

export class OrderItem {
  constructor(
    public readonly productId: string,
    public readonly name: string,
    public readonly quantity: number,
    public readonly unitPrice: number
  ) {}

  get total(): number {
    return this.quantity * this.unitPrice;
  }
}

export class ShippingAddress {
  constructor(
    public readonly street: string,
    public readonly city: string,
    public readonly state: string,
    public readonly zipCode: string
  ) {}
}

export class Order {
  customerId!: string;
  items: OrderItem[] = [];
  shippingAddress?: ShippingAddress;
  paymentMethod!: PaymentMethod;
  discountPercent: number = 0;
  giftWrapping: boolean = false;
  notes?: string;

  get subtotal(): number {
    return this.items.reduce((sum, item) => sum + item.total, 0);
  }

  get discount(): number {
    return this.subtotal * (this.discountPercent / 100);
  }

  get total(): number {
    return this.subtotal - this.discount;
  }
}
