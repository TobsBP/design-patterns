export class PaymentService {
  charge(customerId: string, amountInCents: number): string {
    if (amountInCents <= 0) throw new Error('Valor inválido');
    const chargeId = `ch_${Math.random().toString(36).slice(2, 8)}`;
    console.log(`[Pagamento] Cobrando ${amountInCents} centavos de ${customerId} (${chargeId})`);
    return chargeId;
  }

  refund(chargeId: string): void {
    console.log(`[Pagamento] Estorno da cobrança ${chargeId}`);
  }
}
