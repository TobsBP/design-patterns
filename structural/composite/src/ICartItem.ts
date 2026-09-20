// Componente: o contrato que folha e composto implementam igual.
// É por isso que o cliente pode tratar um produto e um kit da mesma forma.
export interface ICartItem {
  readonly name: string;
  totalInCents(): number;
  print(depth?: number): void;
}
