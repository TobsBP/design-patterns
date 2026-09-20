import { Product } from './Product';

// Registro de protótipos: guarda modelos já configurados e entrega cópias.
// O original nunca sai daqui, então ninguém consegue corrompê-lo.
export class ProductRegistry {
  private readonly prototypes = new Map<string, Product>();

  register(key: string, prototype: Product): void {
    this.prototypes.set(key, prototype);
  }

  spawn(key: string): Product {
    const prototype = this.prototypes.get(key);
    if (!prototype) throw new Error(`Protótipo não registrado: ${key}`);

    return prototype.clone();
  }

  get keys(): string[] {
    return [...this.prototypes.keys()];
  }
}
