import { ProductType } from './ProductType';

// Fábrica de flyweights: devolve a instância existente em vez de criar outra.
// É ela que garante o compartilhamento — sem isso, o padrão não existe.
export class ProductTypeFactory {
  private readonly pool = new Map<string, ProductType>();
  private created = 0;

  get(sku: string, name: string, weightInGrams: number, dimensions: string): ProductType {
    const cached = this.pool.get(sku);
    if (cached) return cached;

    const type = new ProductType(sku, name, weightInGrams, dimensions);
    this.pool.set(sku, type);
    this.created += 1;
    return type;
  }

  /** Quantos objetos realmente existem na memória. */
  get size(): number {
    return this.pool.size;
  }

  get instancesCreated(): number {
    return this.created;
  }
}
