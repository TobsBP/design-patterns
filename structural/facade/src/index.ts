import { OrderFacade } from './OrderFacade';

const orders = new OrderFacade();

// O cliente faz uma chamada só — não conhece estoque, pagamento, envio nem notificação.
const trackingCode = orders.placeOrder({
  customerId: 'cliente-42',
  sku: 'livro-ddd',
  quantity: 1,
  amountInCents: 12900,
  address: 'Rua das Flores, 100 — São Paulo/SP',
});

console.log(`Rastreio do pedido: ${trackingCode}\n`);

// Produto sem estoque: a facade barra antes de cobrar qualquer coisa.
try {
  orders.placeOrder({
    customerId: 'cliente-42',
    sku: 'teclado-hhkb',
    quantity: 1,
    amountInCents: 89900,
    address: 'Rua das Flores, 100 — São Paulo/SP',
  });
} catch (error) {
  console.log(`Pedido recusado: ${(error as Error).message}`);
}
