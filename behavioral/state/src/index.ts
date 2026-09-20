import { Order } from './Order';

const order = new Order('ord-901');

console.log('=== caminho feliz ===');
order.pay();
order.ship();
order.deliver();
console.log(`status: ${order.status}\n`);

console.log('=== tentando o que não dá ===');
order.cancel(); // já entregue
order.pay();    // já pago há tempos
console.log(`status continua: ${order.status}\n`);

console.log('=== cancelando depois de pago ===');
const other = new Order('ord-902');
other.pay();
other.cancel();
console.log(`status: ${other.status}`);
console.log(`histórico: ${other.history.join(' → ')}`);

// Nenhum if sobre status: quem decide o que pode acontecer é o objeto do estado atual.
