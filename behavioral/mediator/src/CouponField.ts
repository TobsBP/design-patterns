import { FormComponent } from './FormComponent';

const COUPONS: Record<string, number> = { BEMVINDO: 10, FRETEGRATIS: 0, BLACK: 25 };

export class CouponField extends FormComponent {
  code = '';
  percent = 0;
  error?: string;

  type(code: string): void {
    this.code = code.toUpperCase();
    const percent = COUPONS[this.code];

    if (percent === undefined && this.code !== '') {
      this.percent = 0;
      this.error = `cupom ${this.code} não existe`;
    } else {
      this.percent = percent ?? 0;
      this.error = undefined;
    }

    console.log(`[CouponField] digitou "${this.code}"`);
    this.notify('coupon-changed');
  }
}
