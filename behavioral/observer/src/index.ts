import { OrderService } from './OrderService';
import { EmailObserver } from './EmailObserver';
import { InvoiceObserver } from './InvoiceObserver';
import { AnalyticsObserver } from './AnalyticsObserver';

const orders = new OrderService();

// Quem se interessa pelo evento se inscreve — o OrderService não conhece nenhum deles.
orders.subscribe(new EmailObserver());
orders.subscribe(new InvoiceObserver());

const analytics = new AnalyticsObserver();
orders.subscribe(analytics);

orders.confirm({ orderId: 'ped-001', customerId: 'cliente-42', amountInCents: 12900 });

// Cliente pediu para não ser rastreado: basta remover o observer.
orders.unsubscribe(analytics);

console.log('');
orders.confirm({ orderId: 'ped-002', customerId: 'cliente-42', amountInCents: 8900 });

// Sem Observer, cada novo efeito colateral (antifraude, cashback, ERP...)
// exigiria abrir e editar o método confirm().
