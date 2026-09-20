import { CatalogProduct } from './CatalogProduct';
import { IIterator } from './IIterator';
import { PagedCatalog } from './PagedCatalog';
import { PageIterator } from './PageIterator';

// Outro percurso sobre a MESMA coleção: pula o que está esgotado.
// A coleção não muda; o que muda é a regra de caminhada.
export class InStockIterator implements IIterator<CatalogProduct> {
  private readonly inner: PageIterator;
  private pending?: CatalogProduct;

  constructor(catalog: PagedCatalog) {
    this.inner = new PageIterator(catalog);
  }

  hasNext(): boolean {
    if (this.pending) return true;

    while (this.inner.hasNext()) {
      const candidate = this.inner.next();
      if (candidate.inStock) {
        this.pending = candidate;
        return true;
      }
    }
    return false;
  }

  next(): CatalogProduct {
    if (!this.hasNext()) throw new Error('Fim do catálogo');

    const product = this.pending as CatalogProduct;
    this.pending = undefined;
    return product;
  }
}
