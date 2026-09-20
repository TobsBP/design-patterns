import assert from 'node:assert';
import { Bundle } from './Bundle';
import { ICartItem } from './ICartItem';
import { ProductItem } from './ProductItem';

const headset = new ProductItem('Headset', 20000);
const combo = new Bundle('Combo Áudio', 50).add(headset).add(new ProductItem('Suporte', 6000));
const cart = new Bundle('Carrinho').add(combo).add(new ProductItem('Mousepad', 4000, 2));

// O total sobe pela árvore: 50% de 26000 = 13000, mais 2x 4000.
assert.strictEqual(combo.totalInCents(), 13000);
assert.strictEqual(cart.totalInCents(), 21000);

// Folha e composto respondem à mesma chamada — é o que o cliente usa.
const items: ICartItem[] = [headset, combo, cart];
for (const item of items) {
  assert.strictEqual(typeof item.totalInCents(), 'number');
}

// Tirar um item de dentro do kit recalcula o pai inteiro.
combo.remove(headset);
assert.strictEqual(combo.totalInCents(), 3000);
assert.strictEqual(cart.totalInCents(), 11000);

console.log('OK: o total percorre a árvore e o cliente trata folha e kit igual');
