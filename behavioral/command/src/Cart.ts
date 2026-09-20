export interface CartLine {
  sku: string;
  name: string;
  quantity: number;
  unitPriceInCents: number;
}

// Receptor: sabe fazer o trabalho, mas não sabe nada sobre comandos nem undo.
export class Cart {
  readonly lines: CartLine[] = [];
  couponPercent = 0;

  add(line: CartLine): void {
    const existing = this.lines.find((item) => item.sku === line.sku);
    if (existing) existing.quantity += line.quantity;
    else this.lines.push({ ...line });
  }

  remove(sku: string, quantity: number): void {
    const index = this.lines.findIndex((item) => item.sku === sku);
    if (index === -1) return;

    const line = this.lines[index];
    line.quantity -= quantity;
    if (line.quantity <= 0) this.lines.splice(index, 1);
  }

  find(sku: string): CartLine | undefined {
    return this.lines.find((item) => item.sku === sku);
  }

  get subtotalInCents(): number {
    return this.lines.reduce((total, line) => total + line.quantity * line.unitPriceInCents, 0);
  }

  get totalInCents(): number {
    return Math.round(this.subtotalInCents * (1 - this.couponPercent / 100));
  }

  describe(): string {
    const items = this.lines.map((line) => `${line.quantity}x ${line.name}`).join(', ') || 'vazio';
    const coupon = this.couponPercent ? ` (-${this.couponPercent}%)` : '';
    return `${items}${coupon} — R$ ${(this.totalInCents / 100).toFixed(2)}`;
  }
}
