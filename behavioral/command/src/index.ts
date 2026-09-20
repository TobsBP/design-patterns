import { AddItemCommand } from './AddItemCommand';
import { ApplyCouponCommand } from './ApplyCouponCommand';
import { Cart } from './Cart';
import { CommandBus } from './CommandBus';
import { RemoveItemCommand } from './RemoveItemCommand';

const cart = new Cart();
const bus = new CommandBus();

bus.run(new AddItemCommand(cart, { sku: 'livro-ddd', name: 'Livro DDD', quantity: 2, unitPriceInCents: 12900 }));
bus.run(new AddItemCommand(cart, { sku: 'mousepad', name: 'Mousepad XL', quantity: 1, unitPriceInCents: 4000 }));
bus.run(new ApplyCouponCommand(cart, 10));
bus.run(new RemoveItemCommand(cart, 'livro-ddd', 1));

console.log(`\nCarrinho: ${cart.describe()}`);
console.log(`Histórico: ${bus.log.join(' → ')}\n`);

bus.undo(); // volta o livro
bus.undo(); // tira o cupom

console.log(`\nDepois de dois undo: ${cart.describe()}`);

// O CommandBus não sabe o que é cupom nem item: ele só empilha objetos que
// sabem se executar e se desfazer. Um comando novo não muda uma linha dele.
