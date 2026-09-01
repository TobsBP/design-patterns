import { IPaymentProcessor } from './IPaymentProcessor';
import { StripeProcessor } from './StripeProcessor';
import { PaypalAdapter } from './PaypalAdapter';

// O checkout só conhece IPaymentProcessor — não sabe (nem precisa saber)
// que o PayPal tem uma API totalmente diferente por trás.
function checkout(processor: IPaymentProcessor, amountInCents: number) {
  console.log('Finalizando pedido...');
  processor.pay(amountInCents, 'BRL');
  console.log('Pedido pago!\n');
}

// Cliente escolheu cartão -> Stripe (já fala a nossa interface)
checkout(new StripeProcessor(), 19990);

// Cliente escolheu PayPal -> adapter traduz para o gateway legado
checkout(new PaypalAdapter(), 19990);

// Saída:
// [Stripe] Cobrando 19990 centavos em BRL
// [PayPal legado] Valor: 199.90 | Código da moeda: 986
//
// Mesma chamada `pay(19990, 'BRL')` nos dois casos: o adapter converte
// centavos -> "199.90" e a sigla 'BRL' -> código ISO 986.
