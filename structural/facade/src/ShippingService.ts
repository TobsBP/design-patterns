export class ShippingService {
  schedule(sku: string, quantity: number, address: string): string {
    const trackingCode = `BR${Math.floor(Math.random() * 1e9)}`;
    console.log(`[Envio] ${quantity}x ${sku} para ${address} — rastreio ${trackingCode}`);
    return trackingCode;
  }
}
