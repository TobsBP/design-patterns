export interface CheckoutRequest {
  customerId: string;
  items: { sku: string; quantity: number }[];
  amountInCents: number;
  riskScore: number; // 0 a 100
  creditLimitInCents: number;
}

export interface CheckoutResult {
  approved: boolean;
  by: string;
  reason?: string;
}

export interface ICheckoutHandler {
  /** Devolve o próximo para permitir encadear: a.setNext(b).setNext(c) */
  setNext(handler: ICheckoutHandler): ICheckoutHandler;
  handle(request: CheckoutRequest): CheckoutResult;
}
