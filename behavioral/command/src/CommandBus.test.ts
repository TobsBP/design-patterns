import assert from 'node:assert';
import { AddItemCommand } from './AddItemCommand';
import { ApplyCouponCommand } from './ApplyCouponCommand';
import { Cart } from './Cart';
import { CommandBus } from './CommandBus';
import { RemoveItemCommand } from './RemoveItemCommand';

const cart = new Cart();
const bus = new CommandBus();
const livro = { sku: 'livro-ddd', name: 'Livro DDD', quantity: 2, unitPriceInCents: 12900 };

bus.run(new AddItemCommand(cart, livro));
bus.run(new ApplyCouponCommand(cart, 10));
assert.strictEqual(cart.totalInCents, 23220); // 25800 - 10%

// Desfazer o cupom devolve o desconto anterior, não zera por acaso.
bus.run(new ApplyCouponCommand(cart, 50));
assert.strictEqual(cart.couponPercent, 50);
bus.undo();
assert.strictEqual(cart.couponPercent, 10, 'o cupom deveria voltar para o valor anterior');

// Remover guarda o que saiu para conseguir recolocar.
bus.run(new RemoveItemCommand(cart, 'livro-ddd', 2));
assert.strictEqual(cart.lines.length, 0);
bus.undo();
assert.strictEqual(cart.find('livro-ddd')?.quantity, 2, 'o item removido deveria voltar');

// O histórico desfaz na ordem inversa até esvaziar.
while (bus.undo());
assert.strictEqual(cart.lines.length, 0);
assert.strictEqual(cart.couponPercent, 0);
assert.strictEqual(bus.size, 0);
assert.strictEqual(bus.undo(), false, 'desfazer com histórico vazio deveria devolver false');

console.log('OK: cada comando sabe se desfazer e o bus não precisa saber o que eles fazem');
