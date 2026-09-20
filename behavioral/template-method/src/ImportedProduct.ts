export interface ImportedProduct {
  sku: string;
  name: string;
  priceInCents: number;
}

export interface ImportReport {
  source: string;
  imported: number;
  skipped: number;
  products: ImportedProduct[];
}
