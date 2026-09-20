import { ProductType } from './ProductType';

// Contexto: guarda só o estado extrínseco (o que muda a cada envio) e uma
// referência ao flyweight compartilhado.
export class Shipment {
  constructor(
    private readonly type: ProductType,
    private readonly orderId: string,
    private readonly quantity: number,
    private readonly address: string,
  ) {}

  printLabel(): string {
    return this.type.label(this.orderId, this.quantity, this.address);
  }
}
