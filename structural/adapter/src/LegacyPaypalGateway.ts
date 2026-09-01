// Serviço externo (não podemos alterar): assinatura incompatível com IPaymentProcessor.
export class LegacyPaypalGateway {
  sendPayment(value: string, currencyCode: number): void {
    console.log(`[PayPal legado] Valor: ${value} | Código da moeda: ${currencyCode}`);
  }
}
