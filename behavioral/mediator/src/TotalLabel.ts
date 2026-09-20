import { FormComponent } from './FormComponent';

// Componente passivo: só mostra o que o mediador manda.
export class TotalLabel extends FormComponent {
  text = '';
  totalInCents = 0;

  render(subtotalInCents: number, discountPercent: number, shippingInCents: number): void {
    const discount = Math.round(subtotalInCents * (discountPercent / 100));
    this.totalInCents = subtotalInCents - discount + shippingInCents;
    this.text = `subtotal R$ ${(subtotalInCents / 100).toFixed(2)} − desconto R$ ${(discount / 100).toFixed(2)} + frete R$ ${(shippingInCents / 100).toFixed(2)} = R$ ${(this.totalInCents / 100).toFixed(2)}`;

    console.log(`[TotalLabel] ${this.text}`);
  }
}
