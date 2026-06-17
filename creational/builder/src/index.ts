import { OrderBuilder } from './OrderBuilder';
import { OrderDirector } from './OrderDirector';

const builder = new OrderBuilder();
const director = new OrderDirector(builder);

const premiumOrder = director.buildPremiumOrder('customer-123');
console.log('=== Pedido Premium ===');
console.log(`Subtotal:           R$ ${premiumOrder.subtotal}`);
console.log(`Desconto (${premiumOrder.discountPercent}%):        R$ ${premiumOrder.discount}`);
console.log(`Total:              R$ ${premiumOrder.total}`);
console.log(`Pagamento:          ${premiumOrder.paymentMethod}`);

const giftOrder = director.buildGiftOrder('customer-456');
console.log('\n=== Pedido Presente ===');
console.log(`Total:              R$ ${giftOrder.total}`);
console.log(`Embalagem presente: ${giftOrder.giftWrapping}`);
console.log(`Observação:         ${giftOrder.notes}`);

// Without Director — manual configuration for a one-off order
const customOrder = builder
  .setCustomer('customer-789')
  .addItem('prod-004', 'Monitor 4K', 1, 1200)
  .setShippingAddress('Rua XV, 200', 'Florianópolis', 'SC', '88010-000')
  .setPaymentMethod('boleto')
  .applyDiscount(5)
  .addNotes('Entregar após 18h')
  .build();

console.log('\n=== Pedido Personalizado ===');
console.log(`Total:    R$ ${customOrder.total}`);
console.log(`Endereço: ${customOrder.shippingAddress?.street}, ${customOrder.shippingAddress?.city}`);
console.log(`Obs:      ${customOrder.notes}`);
