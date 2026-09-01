export class InventoryService {
  private readonly stock = new Map<string, number>([['livro-ddd', 3], ['teclado-hhkb', 0]]);

  isAvailable(sku: string, quantity: number): boolean {
    return (this.stock.get(sku) ?? 0) >= quantity;
  }

  reserve(sku: string, quantity: number): void {
    this.stock.set(sku, (this.stock.get(sku) ?? 0) - quantity);
    console.log(`[Estoque] ${quantity}x ${sku} reservado(s)`);
  }

  release(sku: string, quantity: number): void {
    this.stock.set(sku, (this.stock.get(sku) ?? 0) + quantity);
    console.log(`[Estoque] ${quantity}x ${sku} devolvido(s) ao estoque`);
  }
}
