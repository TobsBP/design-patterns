// Flyweight: guarda só o estado INTRÍNSECO — o que é igual para todo mundo que
// usa este produto. É imutável e compartilhado por milhares de contextos.
export class ProductType {
  constructor(
    readonly sku: string,
    readonly name: string,
    readonly weightInGrams: number,
    readonly dimensions: string,
  ) {}

  // O estado EXTRÍNSECO chega por parâmetro; o flyweight nunca o guarda.
  label(orderId: string, quantity: number, address: string): string {
    const weight = (this.weightInGrams * quantity) / 1000;
    return `[${orderId}] ${quantity}x ${this.name} (${this.dimensions}, ${weight.toFixed(2)}kg) → ${address}`;
  }
}
