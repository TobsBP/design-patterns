import { CatalogProduct } from './CatalogProduct';
import { IIterator } from './IIterator';
import { PagedCatalog } from './PagedCatalog';

// Percorre tudo, na ordem, buscando a página seguinte só quando a atual acaba.
export class PageIterator implements IIterator<CatalogProduct> {
  private page: CatalogProduct[] = [];
  private pageIndex = -1;
  private cursor = 0;

  constructor(private readonly catalog: PagedCatalog) {}

  hasNext(): boolean {
    if (this.cursor < this.page.length) return true;

    const next = this.catalog.fetchPage(this.pageIndex + 1);
    if (!next) return false;

    this.pageIndex += 1;
    this.page = next;
    this.cursor = 0;
    return this.page.length > 0;
  }

  next(): CatalogProduct {
    if (!this.hasNext()) throw new Error('Fim do catálogo');
    return this.page[this.cursor++];
  }
}
