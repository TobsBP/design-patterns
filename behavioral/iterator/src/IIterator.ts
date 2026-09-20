import { CatalogProduct } from './CatalogProduct';

// Iterador: sabe onde parou e como chegar ao próximo.
// Quem percorre não precisa saber se por baixo tem array, página de API ou árvore.
export interface IIterator<T> {
  hasNext(): boolean;
  next(): T;
}

// Coleção: sabe criar iteradores para si mesma.
export interface IProductCollection {
  createIterator(): IIterator<CatalogProduct>;
  createInStockIterator(): IIterator<CatalogProduct>;
}
