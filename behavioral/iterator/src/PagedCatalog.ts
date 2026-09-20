import { CatalogProduct } from './CatalogProduct';
import { IIterator, IProductCollection } from './IIterator';
import { InStockIterator } from './InStockIterator';
import { PageIterator } from './PageIterator';

const PAGE_SIZE = 2;

// Coleção concreta: os produtos vivem em páginas, como numa API paginada.
// Essa estrutura é detalhe interno — os iteradores escondem isso de quem percorre.
export class PagedCatalog implements IProductCollection {
  private readonly pages: CatalogProduct[][] = [];
  private requests = 0;

  constructor(products: CatalogProduct[]) {
    for (let i = 0; i < products.length; i += PAGE_SIZE) {
      this.pages.push(products.slice(i, i + PAGE_SIZE));
    }
  }

  /** @internal usado pelos iteradores; a página só é "buscada" quando pedida */
  fetchPage(index: number): CatalogProduct[] | undefined {
    if (index >= this.pages.length) return undefined;

    this.requests += 1;
    console.log(`[Catálogo] buscando página ${index + 1} de ${this.pages.length}`);
    return this.pages[index];
  }

  get pageRequests(): number {
    return this.requests;
  }

  createIterator(): IIterator<CatalogProduct> {
    return new PageIterator(this);
  }

  createInStockIterator(): IIterator<CatalogProduct> {
    return new InStockIterator(this);
  }

  // O protocolo nativo do JavaScript é a mesma ideia com outro nome:
  // com isso o catálogo funciona direto num for...of.
  *[Symbol.iterator](): Iterator<CatalogProduct> {
    const iterator = this.createIterator();
    while (iterator.hasNext()) yield iterator.next();
  }
}
