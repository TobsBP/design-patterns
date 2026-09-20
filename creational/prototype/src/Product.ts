import { IPrototype } from './IPrototype';

export interface ProductOptions {
  name: string;
  priceInCents: number;
  specs?: Map<string, string>;
  tags?: string[];
}

export class Product implements IPrototype<Product> {
  name: string;
  priceInCents: number;
  readonly specs: Map<string, string>;
  readonly tags: string[];

  constructor({ name, priceInCents, specs, tags }: ProductOptions) {
    this.name = name;
    this.priceInCents = priceInCents;
    this.specs = new Map(specs);
    this.tags = [...(tags ?? [])];
  }

  // Cópia profunda: o Map e o array são recriados.
  // Uma cópia rasa faria o clone compartilhar essas referências com o original —
  // mexer em um mudaria o outro.
  clone(): Product {
    return new Product({
      name: this.name,
      priceInCents: this.priceInCents,
      specs: this.specs,
      tags: this.tags,
    });
  }

  describe(): string {
    const specs = [...this.specs].map(([key, value]) => `${key}: ${value}`).join(', ');
    return `${this.name} — R$ ${(this.priceInCents / 100).toFixed(2)} [${specs}] #${this.tags.join(' #')}`;
  }
}
