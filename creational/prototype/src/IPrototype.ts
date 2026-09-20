// Contrato do Prototype: o próprio objeto sabe se copiar.
// Quem clona não precisa conhecer os campos nem a classe concreta.
export interface IPrototype<T> {
  clone(): T;
}
