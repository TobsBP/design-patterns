import { Bundle } from './Bundle';
import { ProductItem } from './ProductItem';

const setupGamer = new Bundle('Kit Setup Gamer', 10)
  .add(new ProductItem('Teclado Mecânico', 35000))
  .add(new ProductItem('Mouse Gamer', 15000))
  .add(
    // Um kit dentro de outro kit: a árvore aceita qualquer profundidade.
    new Bundle('Combo Áudio', 5)
      .add(new ProductItem('Headset', 20000))
      .add(new ProductItem('Suporte de headset', 6000)),
  );

const cart = new Bundle('Carrinho')
  .add(setupGamer)
  .add(new ProductItem('Mousepad', 4000, 2));

cart.print();
console.log(`\nTotal: R$ ${(cart.totalInCents() / 100).toFixed(2)}`);

// O carrinho chamou totalInCents() e print() sem saber quem era produto e quem era kit.
// Adicionar um nível novo na árvore não muda nada deste arquivo.
