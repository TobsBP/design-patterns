import { ImportedProduct, ImportReport } from './ImportedProduct';

// A superclasse é dona do algoritmo; as subclasses preenchem os buracos.
export abstract class CatalogImporter {
  /**
   * Template method: a ordem dos passos é fixa e não pode ser sobrescrita.
   * Quem herda muda os passos, nunca a sequência.
   */
  run(raw: string): ImportReport {
    console.log(`[${this.source}] iniciando importação`);

    const rows = this.parse(raw);
    const products: ImportedProduct[] = [];
    let skipped = 0;

    for (const row of rows) {
      if (!this.isValid(row)) {
        skipped += 1;
        console.log(`[${this.source}] linha descartada: ${JSON.stringify(row)}`);
        continue;
      }
      products.push(this.normalize(row));
    }

    const report = { source: this.source, imported: products.length, skipped, products };

    this.afterImport(report); // hook opcional
    console.log(`[${this.source}] ${report.imported} importados, ${report.skipped} descartados`);
    return report;
  }

  /** Passos obrigatórios: cada formato sabe o seu. */
  protected abstract get source(): string;
  protected abstract parse(raw: string): Record<string, string>[];

  /** Passo com implementação padrão — dá para sobrescrever, mas raramente precisa. */
  protected isValid(row: Record<string, string>): boolean {
    return Boolean(row.sku && row.name && Number(row.price) > 0);
  }

  protected normalize(row: Record<string, string>): ImportedProduct {
    return {
      sku: row.sku.trim().toLowerCase(),
      name: row.name.trim(),
      priceInCents: Math.round(Number(row.price) * 100),
    };
  }

  /** Hook: existe vazio para quem quiser plugar algo no fim. */
  protected afterImport(_report: ImportReport): void {}
}
