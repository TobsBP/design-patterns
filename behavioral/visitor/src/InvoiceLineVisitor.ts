import { DigitalProduct } from './DigitalProduct';
import { GiftCard } from './GiftCard';
import { IOrderItemVisitor } from './IOrderItemVisitor';
import { PhysicalProduct } from './PhysicalProduct';

const money = (cents: number) => `R$ ${(cents / 100).toFixed(2)}`;

// Operação 3: a linha da nota fiscal. Devolve texto, não número —
// o tipo de retorno do visitante é genérico.
export class InvoiceLineVisitor implements IOrderItemVisitor<string> {
  visitPhysical(item: PhysicalProduct): string {
    return `${item.name} — ${money(item.priceInCents)} (${item.weightInGrams}g, entrega física)`;
  }

  visitDigital(item: DigitalProduct): string {
    return `${item.name} — ${money(item.priceInCents)} (download: ${item.downloadUrl})`;
  }

  visitGiftCard(item: GiftCard): string {
    return `${item.name} — ${money(item.priceInCents)} (enviado para ${item.recipientEmail})`;
  }
}
