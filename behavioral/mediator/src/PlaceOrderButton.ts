import { FormComponent } from './FormComponent';

export class PlaceOrderButton extends FormComponent {
  enabled = false;
  reason?: string;

  setEnabled(enabled: boolean, reason?: string): void {
    this.enabled = enabled;
    this.reason = enabled ? undefined : reason;
    console.log(`[PlaceOrderButton] ${enabled ? 'habilitado' : `desabilitado (${reason})`}`);
  }

  click(): void {
    if (!this.enabled) {
      console.log(`[PlaceOrderButton] clique ignorado: ${this.reason}`);
      return;
    }
    this.notify('place-order');
  }
}
